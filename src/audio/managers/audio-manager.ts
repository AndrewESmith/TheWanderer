import type { AudioManager, AudioState, ErrorHandling } from '../../Interfaces/IAudioManager';
import type { PlaySoundOptions } from '../../Interfaces/ISoundEvent';
import { SOUND_ASSETS, SOUND_CONFIG } from '../config/sound-config';
import { AssetLoader, type LoadingState, type LoadingProgress } from './asset-loader';
import { AudioOptimizer } from '../utils/audio-optimization';

/**
 * Web Audio API implementation of the AudioManager interface
 * Provides high-performance audio playback with preloading and error handling
 */
export class WebAudioManager implements AudioManager {
    private state: AudioState;
    private errorHandling: ErrorHandling;
    private gainNode: GainNode | null = null;
    private activeSources: Set<AudioBufferSourceNode> = new Set();
    private assetLoader: AssetLoader;
    private optimizer: AudioOptimizer;
    private globalVolume: number = SOUND_CONFIG.globalVolume;
    private categoryVolumes: Map<string, number> = new Map();

    constructor() {
        this.state = {
            isInitialized: false,
            isMuted: this.loadMutedPreference(),
            loadedSounds: new Set(),
            audioContext: null,
            soundBuffers: new Map()
        };

        this.errorHandling = {
            onLoadError: this.handleLoadError.bind(this),
            onPlayError: this.handlePlayError.bind(this),
            fallbackMode: false,
            retryAttempts: 3
        };

        this.assetLoader = new AssetLoader({
            maxRetries: this.errorHandling.retryAttempts,
            retryDelay: 1000,
            timeout: 10000,
            enableCompression: true,
            preferredFormats: ['mp3', 'ogg', 'wav']
        });

        this.optimizer = new AudioOptimizer({
            targetSampleRate: 22050,
            targetBitRate: 128,
            enableNormalization: true,
            enableCompression: true,
            maxFileSize: 100 * 1024
        });

        // Initialize category volumes
        Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
            this.categoryVolumes.set(key, category.volume);
        });

        this.initializeAudioContext();
    }

    /**
     * Initialize Web Audio API context with error handling
     */
    private initializeAudioContext(): void {
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

            if (!AudioContextClass) {
                this.errorHandling.fallbackMode = true;
                console.warn('Web Audio API not supported, falling back to silent mode');
                return;
            }

            this.state.audioContext = new AudioContextClass();
            this.gainNode = this.state.audioContext.createGain();
            this.gainNode.connect(this.state.audioContext.destination);

            // Set initial volume based on mute state
            this.updateGainNodeVolume();

            // Handle audio context suspension (autoplay policy)
            this.handleAudioContextSuspension();

            this.state.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
            this.errorHandling.fallbackMode = true;
        }
    }

    /**
     * Handle audio context suspension due to browser autoplay policies
     */
    private handleAudioContextSuspension(): void {
        if (!this.state.audioContext) return;

        if (this.state.audioContext.state === 'suspended') {
            // Resume audio context on first user interaction
            const resumeAudio = () => {
                if (this.state.audioContext?.state === 'suspended') {
                    this.state.audioContext.resume().catch(error => {
                        console.warn('Failed to resume audio context:', error);
                    });
                }
                // Remove listeners after first interaction
                document.removeEventListener('click', resumeAudio);
                document.removeEventListener('keydown', resumeAudio);
                document.removeEventListener('touchstart', resumeAudio);
            };

            document.addEventListener('click', resumeAudio);
            document.addEventListener('keydown', resumeAudio);
            document.addEventListener('touchstart', resumeAudio);
        }
    }

    /**
     * Update gain node volume based on mute state and global volume
     */
    private updateGainNodeVolume(): void {
        if (!this.gainNode) return;

        const volume = this.state.isMuted ? 0 : this.globalVolume;
        this.gainNode.gain.setValueAtTime(volume, this.state.audioContext?.currentTime || 0);
    }

    /**
     * Load muted preference from localStorage
     */
    private loadMutedPreference(): boolean {
        try {
            const stored = localStorage.getItem('audio-muted');
            return stored ? JSON.parse(stored) : !SOUND_CONFIG.enabledByDefault;
        } catch {
            return !SOUND_CONFIG.enabledByDefault;
        }
    }

    /**
     * Save muted preference to localStorage
     */
    private saveMutedPreference(): void {
        try {
            localStorage.setItem('audio-muted', JSON.stringify(this.state.isMuted));
        } catch (error) {
            console.warn('Failed to save audio preference:', error);
        }
    }



    /**
     * Handle audio loading errors
     */
    private handleLoadError(soundId: string, error: Error): void {
        console.error(`Failed to load sound ${soundId}:`, error);
        // Mark as loaded even if failed to prevent infinite retry
        this.state.loadedSounds.add(soundId);
    }

    /**
     * Handle audio playback errors
     */
    private handlePlayError(soundId: string, error: Error): void {
        console.error(`Failed to play sound ${soundId}:`, error);
    }

    /**
     * Find the category for a given sound ID
     */
    private findSoundCategory(soundId: string): string | null {
        for (const [categoryKey, category] of Object.entries(SOUND_CONFIG.categories)) {
            if (Object.values(category.sounds).some(sound => sound.id === soundId)) {
                return categoryKey;
            }
        }
        return null;
    }

    /**
     * Create and configure an audio source for playback
     */
    private createAudioSource(buffer: AudioBuffer, soundId: string, options: PlaySoundOptions = {}): AudioBufferSourceNode | null {
        if (!this.state.audioContext || !this.gainNode) {
            return null;
        }

        try {
            const source = this.state.audioContext.createBufferSource();
            source.buffer = buffer;

            // Create volume control for this specific sound
            const volumeGain = this.state.audioContext.createGain();

            // Calculate final volume: base volume * category volume * global volume
            const category = this.findSoundCategory(soundId);
            const categoryVolume = category ? (this.categoryVolumes.get(category) ?? 1.0) : 1.0;
            const baseVolume = options.volume ?? 1.0;
            const finalVolume = baseVolume * categoryVolume;

            volumeGain.gain.setValueAtTime(finalVolume, this.state.audioContext.currentTime);

            // Connect: source -> volumeGain -> masterGain -> destination
            source.connect(volumeGain);
            volumeGain.connect(this.gainNode);

            // Configure looping
            source.loop = options.loop ?? false;

            // Track active sources for cleanup
            this.activeSources.add(source);
            source.addEventListener('ended', () => {
                this.activeSources.delete(source);
            });

            return source;
        } catch (error) {
            console.error('Failed to create audio source:', error);
            return null;
        }
    }

    /**
     * Play a sound by its ID with optional configuration
     */
    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        if (this.errorHandling.fallbackMode || this.state.isMuted) {
            return;
        }

        try {
            const buffer = this.state.soundBuffers.get(soundId);
            if (!buffer) {
                console.warn(`Sound buffer not found for ID: ${soundId}`);
                return;
            }

            const source = this.createAudioSource(buffer, soundId, options);
            if (!source) {
                return;
            }

            // Handle delayed playback
            const delay = options.delay ?? 0;
            const when = (this.state.audioContext?.currentTime ?? 0) + delay;

            source.start(when);
        } catch (error) {
            this.errorHandling.onPlayError(soundId, error as Error);
        }
    }

    /**
     * Preload all configured sounds using enhanced asset loader
     */
    async preloadSounds(): Promise<void> {
        if (this.errorHandling.fallbackMode || !this.state.audioContext) {
            console.warn('Audio context not available, skipping preload');
            return;
        }

        try {
            // Set up progress tracking
            const progressUnsubscribe = this.assetLoader.onProgress((progress: LoadingProgress) => {
                console.log(`Loading ${progress.soundId}: ${Math.round(progress.progress * 100)}% (${progress.status})`);

                if (progress.status === 'failed' && progress.error) {
                    this.errorHandling.onLoadError(progress.soundId, progress.error);
                }
            });

            // Load all assets - this should not throw even if individual sounds fail
            const loadedBuffers = await this.assetLoader.loadAssets(SOUND_ASSETS, this.state.audioContext);

            // Apply optimization to loaded buffers
            for (const [soundId, buffer] of loadedBuffers.entries()) {
                try {
                    // Analyze and potentially optimize the buffer
                    const analysis = this.optimizer.analyzeAudioBuffer(buffer);

                    if (analysis.recommendations.length > 0) {
                        console.log(`Optimization recommendations for ${soundId}:`, analysis.recommendations);
                    }

                    // Apply normalization and fade in/out
                    const optimizedBuffer = this.optimizer.applyFadeInOut(
                        this.optimizer.normalizeAudioBuffer(buffer)
                    );

                    this.state.soundBuffers.set(soundId, optimizedBuffer);
                    this.state.loadedSounds.add(soundId);
                } catch (error) {
                    console.error(`Failed to optimize sound ${soundId}:`, error);
                    // Still add the original buffer if optimization fails
                    this.state.soundBuffers.set(soundId, buffer);
                    this.state.loadedSounds.add(soundId);
                }
            }

            // Clean up progress tracking
            progressUnsubscribe();

            // Get loading statistics
            const loadingState = this.assetLoader.getLoadingState();
            console.log(
                `Preloading complete: ${loadingState.loadedCount}/${loadingState.totalCount} sounds loaded`
            );

            if (loadingState.failedSounds.length > 0) {
                console.warn('Failed to load sounds:', loadingState.failedSounds);
            }

        } catch (error) {
            console.error('Error during sound preloading:', error);
            // Don't set fallback mode for individual sound failures
            // Only set it for critical errors like audio context issues
            if (error instanceof Error && error.message.includes('AudioContext')) {
                this.errorHandling.fallbackMode = true;
            }
        }
    }

    /**
     * Set muted state and persist preference
     */
    setMuted(muted: boolean): void {
        this.state.isMuted = muted;
        this.updateGainNodeVolume();
        this.saveMutedPreference();
    }

    /**
     * Get current muted state
     */
    isMuted(): boolean {
        return this.state.isMuted;
    }

    /**
     * Check if Web Audio API is supported and initialized
     */
    isSupported(): boolean {
        return this.state.isInitialized && !this.errorHandling.fallbackMode;
    }

    /**
     * Stop all currently playing sounds
     */
    stopAllSounds(): void {
        this.activeSources.forEach(source => {
            try {
                source.stop();
                source.disconnect();
            } catch (error) {
                // Source may already be stopped
            }
        });
        this.activeSources.clear();
    }

    /**
     * Get current loading state
     */
    getLoadingState(): LoadingState {
        return this.assetLoader.getLoadingState();
    }

    /**
     * Subscribe to loading progress updates
     */
    onLoadingProgress(callback: (progress: LoadingProgress) => void): () => void {
        return this.assetLoader.onProgress(callback);
    }

    /**
     * Set global volume
     */
    setGlobalVolume(volume: number): void {
        this.globalVolume = Math.max(0, Math.min(1, volume));
        this.updateGainNodeVolume();
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
        const clampedVolume = Math.max(0, Math.min(1, volume));
        this.categoryVolumes.set(category, clampedVolume);
    }

    /**
     * Get volume for a specific category
     */
    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) ?? 1.0;
    }

    /**
     * Get all category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        return Object.fromEntries(this.categoryVolumes.entries());
    }

    /**
     * Get optimization report for all loaded sounds
     */
    getOptimizationReport(): ReturnType<AudioOptimizer['getOptimizationReport']> {
        const audioFiles = Array.from(this.state.soundBuffers.entries()).map(([name, buffer]) => ({
            name,
            buffer
        }));

        return this.optimizer.getOptimizationReport(audioFiles);
    }

    /**
     * Clean up audio resources
     */
    cleanup(): void {
        this.stopAllSounds();

        // Clean up asset loader
        this.assetLoader.cleanup();

        // Clear sound buffers
        this.state.soundBuffers.clear();
        this.state.loadedSounds.clear();

        // Close audio context
        if (this.state.audioContext && this.state.audioContext.state !== 'closed') {
            this.state.audioContext.close()?.catch?.(error => {
                console.warn('Error closing audio context:', error);
            });
        }

        // Reset state
        this.state.audioContext = null;
        this.gainNode = null;
        this.state.isInitialized = false;
    }
}

/**
 * HTML5 Audio fallback implementation for older browsers
 */
export class HTML5AudioManager implements AudioManager {
    private audioElements: Map<string, HTMLAudioElement> = new Map();
    private muted: boolean;
    private assetLoader: AssetLoader;
    private globalVolume: number = SOUND_CONFIG.globalVolume;
    private categoryVolumes: Map<string, number> = new Map();

    constructor() {
        this.muted = this.loadMutedPreference();
        this.assetLoader = new AssetLoader({
            maxRetries: 3,
            retryDelay: 1000,
            timeout: 10000,
            enableCompression: false, // HTML5 Audio doesn't support buffer optimization
            preferredFormats: ['mp3', 'ogg', 'wav']
        });

        // Initialize category volumes
        Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
            this.categoryVolumes.set(key, category.volume);
        });
    }

    private loadMutedPreference(): boolean {
        try {
            const stored = localStorage.getItem('audio-muted');
            return stored ? JSON.parse(stored) : !SOUND_CONFIG.enabledByDefault;
        } catch {
            return !SOUND_CONFIG.enabledByDefault;
        }
    }

    private saveMutedPreference(): void {
        try {
            localStorage.setItem('audio-muted', JSON.stringify(this.muted));
        } catch (error) {
            console.warn('Failed to save audio preference:', error);
        }
    }

    /**
     * Find the category for a given sound ID
     */
    private findSoundCategory(soundId: string): string | null {
        for (const [categoryKey, category] of Object.entries(SOUND_CONFIG.categories)) {
            if (Object.values(category.sounds).some(sound => sound.id === soundId)) {
                return categoryKey;
            }
        }
        return null;
    }

    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        if (this.muted) return;

        const audio = this.audioElements.get(soundId);
        if (!audio) {
            console.warn(`Audio element not found for ID: ${soundId}`);
            return;
        }

        try {
            audio.currentTime = 0;

            // Calculate final volume: base volume * category volume * global volume
            const category = this.findSoundCategory(soundId);
            const categoryVolume = category ? (this.categoryVolumes.get(category) ?? 1.0) : 1.0;
            const baseVolume = options.volume ?? 1.0;
            const finalVolume = baseVolume * categoryVolume * this.globalVolume;

            audio.volume = Math.max(0, Math.min(1, finalVolume));
            audio.loop = options.loop ?? false;

            const playPromise = audio.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.warn(`Failed to play sound ${soundId}:`, error);
                });
            }
        } catch (error) {
            console.warn(`Error playing sound ${soundId}:`, error);
        }
    }

    async preloadSounds(): Promise<void> {
        const loadPromises: Promise<void>[] = [];

        for (const [soundId, asset] of Object.entries(SOUND_ASSETS)) {
            if (!asset.preload) continue;

            const loadPromise = this.loadHtml5Audio(soundId, asset);
            loadPromises.push(loadPromise);
        }

        await Promise.allSettled(loadPromises);
        console.log(`HTML5 Audio: Preloaded ${this.audioElements.size} sounds`);
    }

    private async loadHtml5Audio(soundId: string, asset: any): Promise<void> {
        // Use asset loader to get optimized source list
        const optimizedSources = asset.src.filter((src: string) => {
            const format = src.split('.').pop()?.toLowerCase();
            return this.supportsFormat(format || '');
        });

        if (optimizedSources.length === 0) {
            console.warn(`No supported formats for ${soundId}`);
            return;
        }

        const audio = new Audio();
        audio.preload = 'auto';
        audio.volume = asset.volume;

        // Try each source URL until one works
        return new Promise<void>((resolve) => {
            let currentIndex = 0;

            const tryNextSource = () => {
                if (currentIndex >= optimizedSources.length) {
                    console.warn(`Failed to load all sources for ${soundId}`);
                    resolve();
                    return;
                }

                audio.src = optimizedSources[currentIndex]!;
                currentIndex++;
            };

            audio.addEventListener('canplaythrough', () => {
                this.audioElements.set(soundId, audio);
                resolve();
            }, { once: true });

            audio.addEventListener('error', tryNextSource, { once: true });

            tryNextSource();
        });
    }

    private supportsFormat(format: string): boolean {
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
    }

    setMuted(muted: boolean): void {
        this.muted = muted;
        this.saveMutedPreference();
    }

    isMuted(): boolean {
        return this.muted;
    }

    isSupported(): boolean {
        return typeof Audio !== 'undefined';
    }

    stopAllSounds(): void {
        this.audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    getLoadingState(): LoadingState {
        return this.assetLoader.getLoadingState();
    }

    onLoadingProgress(callback: (progress: LoadingProgress) => void): () => void {
        return this.assetLoader.onProgress(callback);
    }

    /**
     * Set global volume
     */
    setGlobalVolume(volume: number): void {
        this.globalVolume = Math.max(0, Math.min(1, volume));
        // Update volume for all existing audio elements
        this.audioElements.forEach(audio => {
            const currentVolume = audio.volume / this.globalVolume; // Get base volume
            audio.volume = Math.max(0, Math.min(1, currentVolume * this.globalVolume));
        });
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
        const clampedVolume = Math.max(0, Math.min(1, volume));
        this.categoryVolumes.set(category, clampedVolume);
    }

    /**
     * Get volume for a specific category
     */
    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) ?? 1.0;
    }

    /**
     * Get all category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        return Object.fromEntries(this.categoryVolumes.entries());
    }

    getOptimizationReport(): any {
        // HTML5 Audio doesn't provide buffer access for optimization analysis
        return {
            totalOriginalSize: 0,
            totalOptimizedSize: 0,
            overallCompressionRatio: 1,
            fileReports: [],
            globalRecommendations: ['Consider using Web Audio API for better optimization capabilities']
        };
    }

    cleanup(): void {
        this.assetLoader.cleanup();
        this.audioElements.forEach(audio => {
            audio.pause();
            audio.src = '';
        });
        this.audioElements.clear();
    }
}

/**
 * Silent audio manager for unsupported browsers
 */
export class SilentAudioManager implements AudioManager {
    private muted: boolean = false;
    private globalVolume: number = SOUND_CONFIG.globalVolume;
    private categoryVolumes: Map<string, number> = new Map();

    constructor() {
        // Initialize category volumes
        Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
            this.categoryVolumes.set(key, category.volume);
        });
    }

    playSound(): void {
        // Silent implementation
    }

    async preloadSounds(): Promise<void> {
        // Silent implementation
    }

    setMuted(muted: boolean): void {
        this.muted = muted;
    }

    isMuted(): boolean {
        return this.muted;
    }

    isSupported(): boolean {
        return false;
    }

    stopAllSounds(): void {
        // Silent implementation
    }

    getLoadingState(): LoadingState {
        return {
            isLoading: false,
            loadedCount: 0,
            totalCount: 0,
            failedSounds: [],
            errors: new Map()
        };
    }

    onLoadingProgress(): () => void {
        return () => { }; // No-op unsubscribe function
    }

    /**
     * Set global volume
     */
    setGlobalVolume(volume: number): void {
        this.globalVolume = Math.max(0, Math.min(1, volume));
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
        const clampedVolume = Math.max(0, Math.min(1, volume));
        this.categoryVolumes.set(category, clampedVolume);
    }

    /**
     * Get volume for a specific category
     */
    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) ?? 1.0;
    }

    /**
     * Get all category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        return Object.fromEntries(this.categoryVolumes.entries());
    }

    getOptimizationReport(): any {
        return {
            totalOriginalSize: 0,
            totalOptimizedSize: 0,
            overallCompressionRatio: 1,
            fileReports: [],
            globalRecommendations: []
        };
    }

    cleanup(): void {
        // Silent implementation
    }
}

/**
 * Factory function to create the appropriate audio manager based on browser capabilities
 */
export function createAudioManager(): AudioManager {
    // Check for Web Audio API support
    if (window.AudioContext || (window as any).webkitAudioContext) {
        return new WebAudioManager();
    }

    // Fallback to HTML5 Audio
    if (typeof Audio !== 'undefined') {
        console.warn('Web Audio API not supported, using HTML5 Audio fallback');
        return new HTML5AudioManager();
    }

    // Final fallback to silent mode
    console.warn('No audio support detected, using silent mode');
    return new SilentAudioManager();
}