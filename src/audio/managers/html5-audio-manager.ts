import type { AudioManager, AudioState, ErrorHandling } from '../../Interfaces/IAudioManager';
import type { PlaySoundOptions } from '../../Interfaces/ISoundEvent';
import { SOUND_ASSETS, SOUND_CONFIG } from '../config/sound-config';
import type { LoadingState, LoadingProgress } from './asset-loader';

/**
 * HTML5 Audio implementation of the AudioManager interface
 * Used as a fallback when Web Audio API is not supported
 */
export class HTML5AudioManager implements AudioManager {
    private state: AudioState;
    private errorHandling: ErrorHandling;
    private audioElements: Map<string, HTMLAudioElement> = new Map();
    private activeAudio: Set<HTMLAudioElement> = new Set();
    private loadingState: LoadingState = {
        isLoading: false,
        loadedCount: 0,
        totalCount: 0,
        failedSounds: [],
        errors: new Map()
    };
    private progressCallbacks: Array<(progress: LoadingProgress) => void> = [];
    private globalVolume: number = SOUND_CONFIG.globalVolume;
    private categoryVolumes: Map<string, number> = new Map();

    constructor() {
        this.state = {
            isInitialized: false,
            isMuted: this.loadMutedPreference(),
            loadedSounds: new Set(),
            audioContext: null, // Not used in HTML5 Audio
            soundBuffers: new Map() // Not used in HTML5 Audio
        };

        this.errorHandling = {
            onLoadError: this.handleLoadError.bind(this),
            onPlayError: this.handlePlayError.bind(this),
            fallbackMode: false,
            retryAttempts: 2
        };

        // Initialize category volumes
        Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
            this.categoryVolumes.set(key, category.volume);
        });

        this.initialize();
    }

    /**
     * Initialize HTML5 Audio
     */
    private initialize(): void {
        try {
            if (typeof Audio === 'undefined') {
                throw new Error('HTML5 Audio not supported');
            }

            // Test HTML5 Audio functionality
            const testAudio = new Audio();
            if (!testAudio.canPlayType) {
                throw new Error('HTML5 Audio canPlayType not supported');
            }

            this.state.isInitialized = true;
            console.log('HTML5 Audio initialized successfully');
        } catch (error) {
            console.error('HTML5 Audio initialization failed:', error);
            this.errorHandling.fallbackMode = true;
            this.state.isInitialized = false;
            this.emitErrorEvent('HTML5_AUDIO_INIT_FAILED', error as Error);
        }
    }

    /**
     * Play a sound using HTML5 Audio
     */
    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        if (!this.state.isInitialized || this.state.isMuted || this.errorHandling.fallbackMode) {
            return;
        }

        try {
            const asset = SOUND_ASSETS[soundId];
            if (!asset) {
                console.warn(`Sound asset not found for ID: ${soundId}`);
                return;
            }

            // Try to get existing audio element or create a new one
            let audio = this.audioElements.get(soundId);

            if (!audio || audio.error) {
                audio = this.createAudioElement(soundId, asset.src);
                if (!audio) {
                    this.errorHandling.onPlayError(soundId, new Error('Failed to create audio element'));
                    return;
                }
            }

            // Reset audio if it's already playing
            if (!audio.paused) {
                audio.currentTime = 0;
            }

            // Apply volume settings
            const categoryKey = this.getCategoryForSound(soundId);
            const categoryVolume = categoryKey ? this.categoryVolumes.get(categoryKey) || 1 : 1;
            const baseVolume = asset.volume || 1;
            const optionVolume = options.volume || 1;

            audio.volume = Math.max(0, Math.min(1, baseVolume * optionVolume * categoryVolume * this.globalVolume));
            audio.loop = Boolean(options.loop);

            // Apply delay if specified
            if (options.delay && options.delay > 0) {
                setTimeout(() => this.startPlayback(audio!, soundId), options.delay * 1000);
            } else {
                this.startPlayback(audio, soundId);
            }
        } catch (error) {
            this.errorHandling.onPlayError(soundId, error as Error);
        }
    }

    /**
     * Start audio playback with error handling
     */
    private startPlayback(audio: HTMLAudioElement, soundId: string): void {
        try {
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Handle autoplay restrictions
                    if (error.name === 'NotAllowedError') {
                        console.warn(`Autoplay prevented for ${soundId} - user interaction required`);
                        this.handleAutoplayRestriction(audio, soundId);
                    } else {
                        console.error(`Playback error for ${soundId}:`, error);
                        this.errorHandling.onPlayError(soundId, error);
                    }
                });
            }

            this.activeAudio.add(audio);

            // Set up cleanup when audio finishes
            const onEnded = () => {
                this.activeAudio.delete(audio);
                audio.removeEventListener('ended', onEnded);
            };

            audio.addEventListener('ended', onEnded);
        } catch (error) {
            console.error(`Error starting playback for ${soundId}:`, error);
            this.errorHandling.onPlayError(soundId, error as Error);
        }
    }

    /**
     * Handle autoplay restrictions by setting up event listeners
     */
    private handleAutoplayRestriction(audio: HTMLAudioElement, soundId: string): void {
        const resumePlayback = () => {
            try {
                audio.play().catch(error => {
                    console.warn(`Still unable to play ${soundId} after user interaction:`, error);
                });
            } catch (error) {
                console.warn(`Error in resumePlayback for ${soundId}:`, error);
            }
        };

        const userInteractionEvents = ['click', 'touchstart', 'keydown'];

        const handleUserInteraction = () => {
            resumePlayback();
            userInteractionEvents.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
            });
        };

        userInteractionEvents.forEach(event => {
            document.addEventListener(event, handleUserInteraction, { once: true });
        });
    }

    /**
     * Create an audio element for a sound with format fallbacks
     */
    private createAudioElement(soundId: string, sources: string[]): HTMLAudioElement | null {
        try {
            const audio = new Audio();

            // Find a supported source
            const supportedSource = sources.find(src => {
                const format = src.split('.').pop()?.toLowerCase();
                return this.supportsFormat(format || '');
            });

            if (!supportedSource) {
                console.warn(`No supported audio format found for ${soundId}`);
                return null;
            }

            audio.src = supportedSource;
            audio.preload = 'auto';

            // Set up error handling
            audio.onerror = () => {
                console.error(`Error loading audio for ${soundId}:`, audio.error);
                this.errorHandling.onLoadError(soundId, new Error(`HTML5 Audio error: ${audio.error?.message || 'Unknown error'}`));
            };

            this.audioElements.set(soundId, audio);
            return audio;
        } catch (error) {
            console.error(`Failed to create audio element for ${soundId}:`, error);
            return null;
        }
    }

    /**
     * Check if the browser supports a specific audio format
     */
    private supportsFormat(format: string): boolean {
        try {
            const audio = new Audio();
            const mimeTypes: Record<string, string> = {
                mp3: 'audio/mpeg',
                ogg: 'audio/ogg',
                wav: 'audio/wav',
                m4a: 'audio/mp4',
                aac: 'audio/aac'
            };

            const mimeType = mimeTypes[format];
            if (!mimeType) return false;

            const canPlay = audio.canPlayType(mimeType);
            return canPlay === 'probably' || canPlay === 'maybe';
        } catch {
            return false;
        }
    }

    /**
     * Preload all sound assets
     */
    async preloadSounds(): Promise<void> {
        if (!this.state.isInitialized || this.errorHandling.fallbackMode) {
            return Promise.resolve();
        }

        const soundsToLoad = Object.values(SOUND_ASSETS).filter(asset => asset.preload);

        if (soundsToLoad.length === 0) {
            this.loadingState = {
                isLoading: false,
                loadedCount: 0,
                totalCount: 0,
                failedSounds: [],
                errors: new Map()
            };
            this.notifyProgressCallbacks({ progress: 1, loaded: 0, total: 0 });
            return Promise.resolve();
        }

        this.loadingState = {
            isLoading: true,
            loadedCount: 0,
            totalCount: soundsToLoad.length,
            failedSounds: [],
            errors: new Map()
        };

        this.notifyProgressCallbacks({
            progress: 0,
            loaded: 0,
            total: soundsToLoad.length
        });

        let loadedCount = 0;
        const loadPromises = soundsToLoad.map(asset => {
            return new Promise<void>((resolve) => {
                try {
                    const audio = this.createAudioElement(asset.id, asset.src);

                    if (!audio) {
                        console.warn(`Failed to create audio element for ${asset.id}`);
                        resolve();
                        return;
                    }

                    const onLoaded = () => {
                        this.state.loadedSounds.add(asset.id);
                        loadedCount++;

                        const progress = loadedCount / soundsToLoad.length;
                        this.loadingState = {
                            isLoading: true,
                            loadedCount: loadedCount,
                            totalCount: soundsToLoad.length,
                            failedSounds: this.loadingState.failedSounds,
                            errors: this.loadingState.errors
                        };

                        this.notifyProgressCallbacks({
                            progress,
                            loaded: loadedCount,
                            total: soundsToLoad.length
                        });

                        audio.removeEventListener('canplaythrough', onLoaded);
                        resolve();
                    };

                    const onError = () => {
                        console.warn(`Failed to preload ${asset.id}`);
                        const error = new Error(`Failed to preload ${asset.id}`);
                        this.loadingState.failedSounds.push(asset.id);
                        this.loadingState.errors.set(asset.id, error);
                        this.errorHandling.onLoadError(asset.id, error);
                        audio.removeEventListener('error', onError);
                        resolve();
                    };

                    // If the audio is already loaded
                    if (audio.readyState >= 4) {
                        onLoaded();
                    } else {
                        audio.addEventListener('canplaythrough', onLoaded, { once: true });
                        audio.addEventListener('error', onError, { once: true });

                        // Set a timeout to prevent hanging on load
                        setTimeout(() => {
                            if (!this.state.loadedSounds.has(asset.id)) {
                                console.warn(`Timeout preloading ${asset.id}`);
                                const error = new Error(`Timeout preloading ${asset.id}`);
                                this.loadingState.failedSounds.push(asset.id);
                                this.loadingState.errors.set(asset.id, error);
                                audio.removeEventListener('canplaythrough', onLoaded);
                                audio.removeEventListener('error', onError);
                                resolve();
                            }
                        }, 10000);
                    }
                } catch (error) {
                    console.error(`Error preloading ${asset.id}:`, error);
                    this.loadingState.failedSounds.push(asset.id);
                    this.loadingState.errors.set(asset.id, error as Error);
                    this.errorHandling.onLoadError(asset.id, error as Error);
                    resolve();
                }
            });
        });

        await Promise.all(loadPromises);

        this.loadingState = {
            isLoading: false,
            loadedCount: loadedCount,
            totalCount: soundsToLoad.length,
            failedSounds: this.loadingState.failedSounds,
            errors: this.loadingState.errors
        };

        this.notifyProgressCallbacks({
            progress: 1,
            loaded: loadedCount,
            total: soundsToLoad.length
        });

        console.log(`HTML5 Audio preloaded ${loadedCount}/${soundsToLoad.length} sounds`);
    }

    /**
     * Set muted state
     */
    setMuted(muted: boolean): void {
        this.state.isMuted = muted;
        this.saveMutedPreference(muted);

        // Update all active audio elements
        this.activeAudio.forEach(audio => {
            audio.muted = muted;
        });
    }

    /**
     * Get current muted state
     */
    isMuted(): boolean {
        return this.state.isMuted;
    }

    /**
     * Check if HTML5 Audio is supported
     */
    isSupported(): boolean {
        return this.state.isInitialized && !this.errorHandling.fallbackMode;
    }

    /**
     * Stop all currently playing sounds
     */
    stopAllSounds(): void {
        this.activeAudio.forEach(audio => {
            try {
                audio.pause();
                audio.currentTime = 0;
            } catch (error) {
                console.warn('Error stopping audio:', error);
            }
        });

        this.activeAudio.clear();
    }

    /**
     * Clean up resources
     */
    cleanup(): void {
        this.stopAllSounds();

        this.audioElements.forEach(audio => {
            try {
                audio.pause();
                audio.src = '';
                audio.load();
            } catch (error) {
                console.warn('Error cleaning up audio element:', error);
            }
        });

        this.audioElements.clear();
        this.progressCallbacks = [];
    }

    /**
     * Get current loading state
     */
    getLoadingState(): LoadingState {
        return this.loadingState;
    }

    /**
     * Register a callback for loading progress updates
     */
    onLoadingProgress(callback: (progress: LoadingProgress) => void): () => void {
        this.progressCallbacks.push(callback);
        return () => {
            this.progressCallbacks = this.progressCallbacks.filter(cb => cb !== callback);
        };
    }

    /**
     * Returns empty optimization report (not applicable for HTML5 Audio)
     */
    getOptimizationReport(): any {
        return {
            optimized: 0,
            skipped: 0,
            totalSavings: 0,
            details: [],
            globalRecommendations: [
                'Consider using Web Audio API for better performance',
                'HTML5 Audio has limited optimization capabilities'
            ]
        };
    }

    /**
     * Set global volume
     */
    setGlobalVolume(volume: number): void {
        this.globalVolume = Math.max(0, Math.min(1, volume));

        // Update all active audio elements
        this.updateAllAudioVolumes();
    }

    /**
     * Get current global volume
     */
    getGlobalVolume(): number {
        return this.globalVolume;
    }

    /**
     * Set volume for a specific category
     */
    setCategoryVolume(category: string, volume: number): void {
        this.categoryVolumes.set(category, Math.max(0, Math.min(1, volume)));

        // Update all active audio elements in this category
        this.updateAllAudioVolumes();
    }

    /**
     * Get volume for a specific category
     */
    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) || 1;
    }

    /**
     * Get all category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        const result: Record<string, number> = {};
        this.categoryVolumes.forEach((volume, category) => {
            result[category] = volume;
        });
        return result;
    }

    /**
     * Update volumes for all active audio elements
     */
    private updateAllAudioVolumes(): void {
        this.audioElements.forEach((audio, soundId) => {
            if (this.activeAudio.has(audio)) {
                const asset = SOUND_ASSETS[soundId];
                if (asset) {
                    const categoryKey = this.getCategoryForSound(soundId);
                    const categoryVolume = categoryKey ? this.categoryVolumes.get(categoryKey) || 1 : 1;
                    audio.volume = Math.max(0, Math.min(1, asset.volume * categoryVolume * this.globalVolume));
                }
            }
        });
    }

    /**
     * Get the category for a specific sound
     */
    private getCategoryForSound(soundId: string): string | null {
        for (const [category, config] of Object.entries(SOUND_CONFIG.categories)) {
            if (Object.keys(config.sounds).some(key => config.sounds[key].id === soundId)) {
                return category;
            }
        }
        return null;
    }

    /**
     * Handle sound loading errors
     */
    private handleLoadError(soundId: string, error: Error): void {
        console.error(`Error loading sound ${soundId}:`, error);
        this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
    }

    /**
     * Handle sound playback errors
     */
    private handlePlayError(soundId: string, error: Error): void {
        console.error(`Error playing sound ${soundId}:`, error);
        this.emitErrorEvent('SOUND_PLAY_ERROR', error, soundId);
    }

    /**
     * Emit error events for external error handling
     */
    private emitErrorEvent(type: string, error: Error, details?: string): void {
        const errorEvent = new CustomEvent('audioError', {
            detail: { type, error, details, timestamp: Date.now() }
        });
        window.dispatchEvent(errorEvent);
    }

    /**
     * Load muted preference from local storage
     */
    private loadMutedPreference(): boolean {
        try {
            const stored = localStorage.getItem('wanderer-audio-muted');
            return stored === 'true';
        } catch {
            return false;
        }
    }

    /**
     * Save muted preference to local storage
     */
    private saveMutedPreference(muted: boolean): void {
        try {
            localStorage.setItem('wanderer-audio-muted', muted.toString());
        } catch (error) {
            console.warn('Failed to save muted preference:', error);
        }
    }

    /**
     * Helper method to notify all progress callbacks
     */
    private notifyProgressCallbacks(progress: LoadingProgress): void {
        this.progressCallbacks.forEach(callback => {
            try {
                callback(progress);
            } catch (error) {
                console.error('Error in loading progress callback:', error);
            }
        });
    }
}