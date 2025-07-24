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
    private suspensionTimeouts: number[] = [];
    private resumeHandlers: Record<string, EventListener> = {};
    private resumeFailureCount: number = 0;
    private useHTML5Backup: string | null = null;

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
     * Initialize Web Audio API context with comprehensive error handling
     */
    private initializeAudioContext(): void {
        try {
            // Check for Web Audio API support
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

            if (!AudioContextClass) {
                this.handleAudioContextError(new Error('Web Audio API not supported'), 'UNSUPPORTED_API');
                return;
            }

            // Attempt to create audio context
            this.state.audioContext = new AudioContextClass();

            // Check if context creation was successful
            if (!this.state.audioContext) {
                this.handleAudioContextError(new Error('Failed to create AudioContext'), 'CONTEXT_CREATION_FAILED');
                return;
            }

            // Create gain node with error handling
            try {
                this.gainNode = this.state.audioContext.createGain();
                this.gainNode.connect(this.state.audioContext.destination);
            } catch (error) {
                this.handleAudioContextError(error as Error, 'GAIN_NODE_CREATION_FAILED');
                return;
            }

            // Set initial volume based on mute state
            this.updateGainNodeVolume();

            // Handle audio context suspension (autoplay policy)
            this.handleAudioContextSuspension();

            // Monitor audio context state changes
            this.monitorAudioContextState();

            this.state.isInitialized = true;
            console.log('Web Audio API initialized successfully');
        } catch (error) {
            this.handleAudioContextError(error as Error, 'INITIALIZATION_FAILED');
        }
    }

    /**
     * Update gain node volume based on mute state and global volume
     */
    private updateGainNodeVolume(): void {
        if (this.gainNode) {
            const volume = this.state.isMuted ? 0 : this.globalVolume;
            this.gainNode.gain.setValueAtTime(volume, this.state.audioContext?.currentTime || 0);
        }
    }

    /**
     * Handle audio context errors with appropriate fallback strategies
     */
    private handleAudioContextError(error: Error, errorType: string): void {
        console.error(`Audio context error (${errorType}):`, error);

        this.errorHandling.fallbackMode = true;
        this.state.isInitialized = false;

        // Clean up any partially created resources
        if (this.gainNode) {
            try {
                // Check if disconnect method exists (may not in test environment)
                if (typeof this.gainNode.disconnect === 'function') {
                    this.gainNode.disconnect();
                }
            } catch (disconnectError) {
                console.warn('Error disconnecting gain node:', disconnectError);
            }
            this.gainNode = null;
        }

        if (this.state.audioContext) {
            try {
                if (this.state.audioContext.state !== 'closed') {
                    this.state.audioContext.close();
                }
            } catch (closeError) {
                console.warn('Error closing audio context:', closeError);
            }
            this.state.audioContext = null;
        }

        // Emit error event for external handling
        this.emitErrorEvent('AUDIO_CONTEXT_ERROR', error, errorType);
    }

    /**
     * Monitor audio context state changes and handle interruptions
     */
    private monitorAudioContextState(): void {
        if (!this.state.audioContext) return;

        const handleStateChange = () => {
            if (!this.state.audioContext) return;

            console.log(`Audio context state changed to: ${this.state.audioContext.state}`);

            switch (this.state.audioContext.state) {
                case 'suspended':
                    console.warn('Audio context suspended - attempting to resume on next user interaction');
                    this.handleAudioContextSuspension();
                    break;
                case 'closed':
                    console.warn('Audio context closed unexpectedly');
                    this.handleAudioContextClosure();
                    break;
                case 'running':
                    // Context is running normally, no action needed
                    break;
                default:
                    // Handle any non-standard states (like 'interrupted' on older iOS)
                    console.warn(`Audio context in unexpected state: ${this.state.audioContext.state}`);
                    if ((this.state.audioContext.state as any) === 'interrupted') {
                        console.warn('Audio context interrupted - will attempt recovery');
                        this.handleAudioContextInterruption();
                    }
                    break;
            }
        };

        // Check if addEventListener exists (may not in test environment)
        if (typeof this.state.audioContext.addEventListener === 'function') {
            this.state.audioContext.addEventListener('statechange', handleStateChange);
        }
    }

    /**
     * Handle audio context interruption (iOS Safari specific)
     */
    private handleAudioContextInterruption(): void {
        if (!this.state.audioContext) return;

        // Stop all active sounds during interruption
        this.stopAllSounds();

        // Set up recovery on next user interaction
        const resumeAfterInterruption = () => {
            if ((this.state.audioContext?.state as any) === 'interrupted') {
                this.state.audioContext.resume().catch(error => {
                    console.warn('Failed to resume after interruption:', error);
                });
            }
            document.removeEventListener('touchstart', resumeAfterInterruption);
            document.removeEventListener('click', resumeAfterInterruption);
        };

        document.addEventListener('touchstart', resumeAfterInterruption, { once: true });
        document.addEventListener('click', resumeAfterInterruption, { once: true });
    }

    /**
     * Handle unexpected audio context closure
     */
    private handleAudioContextClosure(): void {
        console.warn('Audio context closed unexpectedly, attempting to reinitialize');

        // Clean up current state
        this.gainNode = null;
        this.state.audioContext = null;
        this.state.isInitialized = false;
        this.stopAllSounds();

        // Attempt to reinitialize after a delay
        setTimeout(() => {
            if (!this.state.isInitialized && !this.errorHandling.fallbackMode) {
                console.log('Attempting to reinitialize audio context');
                this.initializeAudioContext();
            }
        }, 1000);
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
     * Handle audio context suspension due to browser autoplay policies
     */
    private handleAudioContextSuspension(): void {
        if (!this.state.audioContext) return;

        const attemptResume = async (source: string) => {
            if (!this.state.audioContext || this.state.audioContext.state !== 'suspended') {
                return;
            }

            try {
                console.log(`Attempting to resume audio context from ${source}`);
                await this.state.audioContext.resume();
                console.log('Audio context resumed successfully');

                // Remove all listeners after successful resume
                this.removeResumeListeners();

                // Emit success event
                this.emitErrorEvent('AUDIO_CONTEXT_RESUMED', new Error('Context resumed'), source);
            } catch (error) {
                console.warn(`Failed to resume audio context from ${source}:`, error);
                this.handleResumeFailure(error as Error, source);
            }
        };

        // Enhanced resume handlers
        const resumeHandlers = {
            click: () => attemptResume('click'),
            keydown: (event: KeyboardEvent) => {
                if (!['Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock'].includes(event.key)) {
                    attemptResume('keydown');
                }
            },
            touchstart: () => attemptResume('touchstart'),
            pointerdown: () => attemptResume('pointerdown'),
            mousedown: () => attemptResume('mousedown')
        };

        // Store handlers for cleanup
        this.resumeHandlers = resumeHandlers;

        // Add event listeners
        Object.entries(resumeHandlers).forEach(([event, handler]) => {
            const options = { passive: true, once: false, capture: false };
            try {
                document.addEventListener(event, handler as EventListener, options);
            } catch (listenerError) {
                console.warn(`Failed to add ${event} listener for audio context resume:`, listenerError);
            }
        });

        // Set up progressive timeout warnings
        this.setupSuspensionTimeouts();
    }

    /**
     * Set up progressive timeout warnings for suspended audio context
     */
    private setupSuspensionTimeouts(): void {
        // Clear any existing timeouts
        this.clearSuspensionTimeouts();

        // 5 second warning
        this.suspensionTimeouts.push(setTimeout(() => {
            if (this.state.audioContext?.state === 'suspended') {
                console.info('Audio context suspended for 5 seconds. Click anywhere to enable audio.');
                this.emitErrorEvent('AUDIO_CONTEXT_SUSPENDED_WARNING',
                    new Error('Audio context suspended - user interaction needed'),
                    'AUTOPLAY_POLICY_5S'
                );
            }
        }, 5000));

        // 15 second warning
        this.suspensionTimeouts.push(setTimeout(() => {
            if (this.state.audioContext?.state === 'suspended') {
                console.warn('Audio context has been suspended for 15 seconds. User interaction required.');
                this.emitErrorEvent('AUDIO_CONTEXT_SUSPENDED_TIMEOUT',
                    new Error('Audio context suspended for extended period'),
                    'AUTOPLAY_POLICY_15S'
                );
            }
        }, 15000));
    }

    /**
     * Clear all suspension timeout warnings
     */
    private clearSuspensionTimeouts(): void {
        this.suspensionTimeouts.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
        this.suspensionTimeouts = [];
    }

    /**
     * Remove all resume event listeners
     */
    private removeResumeListeners(): void {
        Object.entries(this.resumeHandlers).forEach(([event, handler]) => {
            try {
                document.removeEventListener(event, handler);
            } catch (error) {
                console.warn(`Error removing ${event} listener:`, error);
            }
        });
        this.resumeHandlers = {};
        this.clearSuspensionTimeouts();
    }

    /**
     * Handle resume failure with alternative strategies
     */
    private handleResumeFailure(error: Error, source: string): void {
        console.error(`Resume attempt from ${source} failed:`, error);
        this.resumeFailureCount = (this.resumeFailureCount || 0) + 1;

        if (this.resumeFailureCount <= 3) {
            console.log(`Attempting alternative resume strategy (attempt ${this.resumeFailureCount}/3)`);
            this.tryAlternativeResumeStrategies(error, source);
        } else if (this.errorHandling.retryAttempts > 0) {
            this.errorHandling.retryAttempts--;
            console.log(`Attempting to recreate audio context (${this.errorHandling.retryAttempts} retries left)`);
            setTimeout(() => {
                this.reinitializeAudioContext();
            }, 2000);
        } else {
            console.error('All resume attempts failed, initiating graceful degradation');
            this.initiateGracefulDegradation(error, 'RESUME_FAILED');
        }
    }

    /**
     * Try alternative resume strategies when standard resume fails
     */
    private tryAlternativeResumeStrategies(error: Error, source: string): void {
        if (!this.state.audioContext) return;

        const strategies = [
            // Strategy 1: Force resume with user gesture simulation
            async () => {
                console.log('Trying strategy 1: Force resume with gesture simulation');
                const buffer = this.state.audioContext!.createBuffer(1, 1, 22050);
                const source = this.state.audioContext!.createBufferSource();
                source.buffer = buffer;
                source.connect(this.state.audioContext!.destination);
                source.start();
                await this.state.audioContext!.resume();
            },

            // Strategy 2: Resume with delay and retry
            async () => {
                console.log('Trying strategy 2: Delayed resume');
                await new Promise(resolve => setTimeout(resolve, 1000));
                await this.state.audioContext!.resume();
            }
        ];

        // Try strategies sequentially
        const tryNextStrategy = async (index: number) => {
            if (index >= strategies.length) {
                throw new Error('All alternative resume strategies failed');
            }

            try {
                await strategies[index]!();
                console.log(`Alternative resume strategy ${index + 1} succeeded`);
                this.removeResumeListeners();
                this.emitErrorEvent('AUDIO_CONTEXT_RESUMED', new Error('Context resumed via alternative strategy'), `strategy_${index + 1}`);
            } catch (strategyError) {
                console.warn(`Alternative resume strategy ${index + 1} failed:`, strategyError);
                setTimeout(() => tryNextStrategy(index + 1), 500);
            }
        };

        tryNextStrategy(0).catch(finalError => {
            console.error('All alternative resume strategies failed:', finalError);
            this.handleResumeFailure(finalError as Error, `${source}_alternatives`);
        });
    }

    /**
     * Initiate graceful degradation when Web Audio API fails completely
     */
    private initiateGracefulDegradation(error: Error, reason: string): void {
        console.warn(`Initiating graceful degradation due to: ${reason}`);
        this.emitErrorEvent('AUDIO_DEGRADATION_INITIATED', error, reason);
        this.attemptHTML5Fallback(error, reason);
    }

    /**
     * Attempt to fall back to HTML5 Audio when Web Audio API fails
     */
    private attemptHTML5Fallback(error: Error, reason: string): void {
        console.log('Attempting fallback to HTML5 Audio');

        try {
            if (typeof Audio === 'undefined') {
                throw new Error('HTML5 Audio not available');
            }

            const testAudio = new Audio();
            if (!testAudio.canPlayType) {
                throw new Error('HTML5 Audio canPlayType not supported');
            }

            console.log('HTML5 Audio fallback appears viable, switching audio manager');
            this.switchToHTML5Fallback();
        } catch (fallbackError) {
            console.error('HTML5 Audio fallback failed:', fallbackError);
            this.switchToSilentMode(error, reason);
        }
    }

    /**
     * Switch to HTML5 Audio fallback
     */
    private switchToHTML5Fallback(): void {
        this.errorHandling.fallbackMode = true;

        const fallbackEvent = new CustomEvent('audioManagerFallback', {
            detail: {
                from: 'WebAudio',
                to: 'HTML5Audio',
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(fallbackEvent);

        console.log('Switched to HTML5 Audio fallback mode');
    }

    /**
     * Switch to silent mode as final fallback
     */
    private switchToSilentMode(error: Error, reason: string): void {
        console.warn('Switching to silent mode - no audio will be played');

        this.errorHandling.fallbackMode = true;

        const silentEvent = new CustomEvent('audioManagerFallback', {
            detail: {
                from: 'WebAudio',
                to: 'Silent',
                reason,
                error: error.message,
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(silentEvent);

        this.stopAllSounds();
        this.cleanup();
    }

    /**
     * Reinitialize the entire audio context when recovery fails
     */
    private reinitializeAudioContext(): void {
        console.log('Attempting to reinitialize audio context');

        // Clean up existing context
        this.cleanup();

        // Reset state
        this.state.isInitialized = false;
        this.state.audioContext = null;
        this.gainNode = null;
        this.resumeFailureCount = 0;

        // Clear any existing handlers
        this.removeResumeListeners();

        // Attempt to initialize again
        setTimeout(() => {
            this.initializeAudioContext();
        }, 1000);
    }

    /**
     * Handle load errors
     */
    private handleLoadError(soundId: string, error: Error): void {
        console.error(`Load error for ${soundId}:`, error);
        this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
    }

    /**
     * Handle play errors
     */
    private handlePlayError(soundId: string, error: Error): void {
        console.error(`Play error for ${soundId}:`, error);
        this.emitErrorEvent('SOUND_PLAY_ERROR', error, soundId);
    }

    /**
     * Load muted preference from localStorage
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
     * Save muted preference to localStorage
     */
    private saveMutedPreference(muted: boolean): void {
        try {
            localStorage.setItem('wanderer-audio-muted', String(muted));
        } catch (error) {
            console.warn('Failed to save muted preference:', error);
        }
    }

    // Public AudioManager interface methods

    /**
     * Play a sound with the given options
     */
    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        if (this.errorHandling.fallbackMode) {
            console.warn('Audio manager in fallback mode, sound playback disabled');
            return;
        }

        if (!this.state.isInitialized || !this.state.audioContext || !this.gainNode) {
            console.warn('Audio context not initialized, cannot play sound');
            return;
        }

        const buffer = this.state.soundBuffers.get(soundId);
        if (!buffer) {
            console.warn(`Sound buffer not found for ${soundId}`);
            return;
        }

        try {
            const source = this.state.audioContext.createBufferSource();
            source.buffer = buffer;

            // Apply volume settings
            const gainNode = this.state.audioContext.createGain();
            const volume = (options.volume ?? 1.0) * this.globalVolume;
            const categoryVolume = this.getCategoryVolumeForSound(soundId);
            const finalVolume = this.state.isMuted ? 0 : volume * categoryVolume;

            gainNode.gain.setValueAtTime(finalVolume, this.state.audioContext.currentTime);

            // Connect nodes
            source.connect(gainNode);
            gainNode.connect(this.gainNode);

            // Configure playback options
            if (options.loop) {
                source.loop = true;
            }

            // Track active source
            this.activeSources.add(source);

            // Clean up when finished
            source.onended = () => {
                this.activeSources.delete(source);
                try {
                    source.disconnect();
                    gainNode.disconnect();
                } catch (error) {
                    console.warn('Error cleaning up audio source:', error);
                }
            };

            // Start playback
            source.start(0);

        } catch (error) {
            this.handlePlayError(soundId, error as Error);
        }
    }

    /**
     * Get category volume for a specific sound
     */
    private getCategoryVolumeForSound(soundId: string): number {
        const asset = SOUND_ASSETS[soundId];
        if (asset && asset.category) {
            return this.categoryVolumes.get(asset.category) ?? 1.0;
        }
        return 1.0;
    }

    /**
     * Preload all sounds
     */
    async preloadSounds(): Promise<void> {
        if (!this.state.audioContext) {
            console.warn('Audio context not available for preloading');
            return;
        }

        const loadPromises = Object.entries(SOUND_ASSETS).map(async ([soundId, asset]) => {
            try {
                const buffer = await this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext!);
                if (buffer) {
                    this.state.soundBuffers.set(soundId, buffer);
                    this.state.loadedSounds.add(soundId);
                }
            } catch (error) {
                this.handleLoadError(soundId, error as Error);
            }
        });

        await Promise.allSettled(loadPromises);
        console.log(`Preloaded ${this.state.loadedSounds.size} sounds`);
    }

    /**
     * Set muted state
     */
    setMuted(muted: boolean): void {
        this.state.isMuted = muted;
        this.saveMutedPreference(muted);
        this.updateGainNodeVolume();
    }

    /**
     * Get muted state
     */
    isMuted(): boolean {
        return this.state.isMuted;
    }

    /**
     * Check if Web Audio API is supported
     */
    isSupported(): boolean {
        return !!(window.AudioContext || (window as any).webkitAudioContext);
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
                console.warn('Error stopping audio source:', error);
            }
        });
        this.activeSources.clear();
    }

    /**
     * Clean up resources
     */
    cleanup(): void {
        this.stopAllSounds();
        this.removeResumeListeners();

        if (this.gainNode) {
            try {
                // Check if disconnect method exists (may not in test environment)
                if (typeof this.gainNode.disconnect === 'function') {
                    this.gainNode.disconnect();
                }
            } catch (error) {
                console.warn('Error disconnecting gain node:', error);
            }
            this.gainNode = null;
        }

        if (this.state.audioContext && this.state.audioContext.state !== 'closed') {
            try {
                // Check if close method exists (may not in test environment)
                if (typeof this.state.audioContext.close === 'function') {
                    this.state.audioContext.close();
                }
            } catch (error) {
                console.warn('Error closing audio context:', error);
            }
        }

        this.state.audioContext = null;
        this.state.isInitialized = false;
        this.state.soundBuffers.clear();
        this.state.loadedSounds.clear();
    }

    /**
     * Get current loading state
     */
    getLoadingState(): LoadingState {
        return this.assetLoader.getLoadingState();
    }

    /**
     * Subscribe to loading progress
     */
    onLoadingProgress(callback: (progress: LoadingProgress) => void): () => void {
        return this.assetLoader.onLoadingProgress(callback);
    }

    /**
     * Get optimization report
     */
    getOptimizationReport(): any {
        return this.optimizer.getOptimizationReport();
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
     * Set category volume
     */
    setCategoryVolume(category: string, volume: number): void {
        this.categoryVolumes.set(category, Math.max(0, Math.min(1, volume)));
    }

    /**
     * Get category volume
     */
    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) ?? 1.0;
    }

    /**
     * Get all category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        const volumes: Record<string, number> = {};
        this.categoryVolumes.forEach((volume, category) => {
            volumes[category] = volume;
        });
        return volumes;
    }
}
/*
*
 * HTML5 Audio implementation of the AudioManager interface
 * Fallback for when Web Audio API is not available
 */
export class HTML5AudioManager implements AudioManager {
    private muted: boolean = false;
    private globalVolume: number = SOUND_CONFIG.globalVolume;
    private categoryVolumes: Map<string, number> = new Map();
    private audioElements: Map<string, HTMLAudioElement> = new Map();
    private loadingState: LoadingState = {
        isLoading: false,
        loadedCount: 0,
        totalCount: 0,
        failedSounds: [],
        currentSound: null
    };

    constructor() {
        this.muted = this.loadMutedPreference();

        // Initialize category volumes
        Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
            this.categoryVolumes.set(key, category.volume);
        });
    }

    /**
     * Play a sound using HTML5 Audio
     */
    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        if (this.muted) return;

        const asset = SOUND_ASSETS[soundId];
        if (!asset) {
            console.warn(`Sound asset not found for ID: ${soundId}`);
            return;
        }

        try {
            let audio = this.audioElements.get(soundId);

            if (!audio) {
                audio = new Audio();

                // Find a supported source
                const supportedSource = asset.src.find((src: string) => {
                    const format = src.split('.').pop()?.toLowerCase();
                    return this.supportsHTML5Format(format || '');
                });

                if (!supportedSource) {
                    console.warn(`No supported HTML5 format found for ${soundId}`);
                    return;
                }

                audio.src = supportedSource;
                this.audioElements.set(soundId, audio);
            }

            // Configure audio element
            this.configureAudioElement(audio, soundId, options);

            // Play the audio
            const playPromise = audio.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.warn(`HTML5 audio playback failed for ${soundId}:`, error);
                });
            }

        } catch (error) {
            console.error(`HTML5 audio setup failed for ${soundId}:`, error);
        }
    }

    /**
     * Configure HTML5 audio element with options
     */
    private configureAudioElement(audio: HTMLAudioElement, soundId: string, options: PlaySoundOptions): void {
        const volume = (options.volume ?? 1.0) * this.globalVolume;
        const categoryVolume = this.getCategoryVolumeForSound(soundId);
        const finalVolume = this.muted ? 0 : volume * categoryVolume;

        audio.volume = Math.max(0, Math.min(1, finalVolume));
        audio.loop = Boolean(options.loop);
    }

    /**
     * Get category volume for a specific sound
     */
    private getCategoryVolumeForSound(soundId: string): number {
        const asset = SOUND_ASSETS[soundId];
        if (asset && asset.category) {
            return this.categoryVolumes.get(asset.category) ?? 1.0;
        }
        return 1.0;
    }

    /**
     * Check if HTML5 Audio supports a specific format
     */
    private supportsHTML5Format(format: string): boolean {
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
     * Preload sounds using HTML5 Audio
     */
    async preloadSounds(): Promise<void> {
        this.loadingState.isLoading = true;
        this.loadingState.totalCount = Object.keys(SOUND_ASSETS).length;
        this.loadingState.loadedCount = 0;
        this.loadingState.failedSounds = [];

        const loadPromises = Object.entries(SOUND_ASSETS).map(async ([soundId, asset]) => {
            try {
                this.loadingState.currentSound = soundId;

                const audio = new Audio();

                // Find a supported source
                const supportedSource = asset.src.find((src: string) => {
                    const format = src.split('.').pop()?.toLowerCase();
                    return this.supportsHTML5Format(format || '');
                });

                if (!supportedSource) {
                    throw new Error(`No supported format found for ${soundId}`);
                }

                await new Promise<void>((resolve, reject) => {
                    audio.addEventListener('canplaythrough', () => resolve(), { once: true });
                    audio.addEventListener('error', () => reject(new Error(`Failed to load ${soundId}`)), { once: true });
                    audio.src = supportedSource;
                    audio.load();
                });

                this.audioElements.set(soundId, audio);
                this.loadingState.loadedCount++;
            } catch (error) {
                console.warn(`Failed to preload ${soundId}:`, error);
                this.loadingState.failedSounds.push(soundId);
            }
        });

        await Promise.allSettled(loadPromises);

        this.loadingState.isLoading = false;
        this.loadingState.currentSound = null;

        console.log(`HTML5 Audio preloaded ${this.loadingState.loadedCount} sounds`);
    }

    /**
     * Stop all currently playing sounds
     */
    stopAllSounds(): void {
        this.audioElements.forEach(audio => {
            try {
                audio.pause();
                audio.currentTime = 0;
            } catch (error) {
                console.warn('Error stopping HTML5 audio:', error);
            }
        });
    }

    /**
     * Clean up resources
     */
    cleanup(): void {
        this.stopAllSounds();
        this.audioElements.clear();
    }

    /**
     * Check if HTML5 Audio is supported
     */
    isSupported(): boolean {
        return typeof Audio !== 'undefined';
    }

    /**
     * Get current loading state
     */
    getLoadingState(): LoadingState {
        return { ...this.loadingState };
    }

    /**
     * Subscribe to loading progress (HTML5 Audio has limited progress info)
     */
    onLoadingProgress(callback: (progress: LoadingProgress) => void): () => void {
        // HTML5 Audio doesn't provide detailed progress, so we return a no-op
        return () => { };
    }

    /**
     * Get optimization report (simplified for HTML5 Audio)
     */
    getOptimizationReport(): any {
        return {
            totalSounds: this.audioElements.size,
            loadedSounds: this.loadingState.loadedCount,
            failedSounds: this.loadingState.failedSounds.length,
            globalRecommendations: [
                'Consider using Web Audio API for better performance',
                'HTML5 Audio has limited optimization capabilities'
            ]
        };
    }

    /**
     * Load muted preference from localStorage
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
     * Save muted preference to localStorage
     */
    private saveMutedPreference(muted: boolean): void {
        try {
            localStorage.setItem('wanderer-audio-muted', String(muted));
        } catch (error) {
            console.warn('Failed to save muted preference:', error);
        }
    }

    /**
     * Set muted state
     */
    setMuted(muted: boolean): void {
        this.muted = muted;
        this.saveMutedPreference(muted);

        // Update volume of all audio elements
        this.audioElements.forEach((audio, soundId) => {
            this.configureAudioElement(audio, soundId, {});
        });
    }

    /**
     * Get muted state
     */
    isMuted(): boolean {
        return this.muted;
    }

    /**
     * Set global volume
     */
    setGlobalVolume(volume: number): void {
        this.globalVolume = Math.max(0, Math.min(1, volume));

        // Update volume of all audio elements
        this.audioElements.forEach((audio, soundId) => {
            this.configureAudioElement(audio, soundId, {});
        });
    }

    /**
     * Get current global volume
     */
    getGlobalVolume(): number {
        return this.globalVolume;
    }

    /**
     * Set category volume
     */
    setCategoryVolume(category: string, volume: number): void {
        this.categoryVolumes.set(category, Math.max(0, Math.min(1, volume)));
    }

    /**
     * Get category volume
     */
    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) ?? 1.0;
    }

    /**
     * Get all category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        const volumes: Record<string, number> = {};
        this.categoryVolumes.forEach((volume, category) => {
            volumes[category] = volume;
        });
        return volumes;
    }
}

/**
 * Silent audio manager for when no audio support is available
 */
export class SilentAudioManager implements AudioManager {
    private muted: boolean = false;
    private globalVolume: number = 1.0;
    private categoryVolumes: Map<string, number> = new Map();

    constructor() {
        console.warn('No audio support detected, using silent mode');
    }

    playSound(soundId: string, options?: PlaySoundOptions): void {
        // Silent implementation - do nothing
    }

    async preloadSounds(): Promise<void> {
        // Silent implementation - do nothing
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
        // Silent implementation - do nothing
    }

    cleanup(): void {
        // Silent implementation - do nothing
    }

    getLoadingState(): LoadingState {
        return {
            isLoading: false,
            loadedCount: 0,
            totalCount: 0,
            failedSounds: [],
            currentSound: null
        };
    }

    onLoadingProgress(callback: (progress: LoadingProgress) => void): () => void {
        return () => { };
    }

    getOptimizationReport(): any {
        return {
            totalSounds: 0,
            loadedSounds: 0,
            failedSounds: 0,
            globalRecommendations: ['No audio support available']
        };
    }

    setGlobalVolume(volume: number): void {
        this.globalVolume = Math.max(0, Math.min(1, volume));
    }

    getGlobalVolume(): number {
        return this.globalVolume;
    }

    setCategoryVolume(category: string, volume: number): void {
        this.categoryVolumes.set(category, Math.max(0, Math.min(1, volume)));
    }

    getCategoryVolume(category: string): number {
        return this.categoryVolumes.get(category) ?? 1.0;
    }

    getAllCategoryVolumes(): Record<string, number> {
        const volumes: Record<string, number> = {};
        this.categoryVolumes.forEach((volume, category) => {
            volumes[category] = volume;
        });
        return volumes;
    }
}

/**
 * Factory function to create the appropriate audio manager based on browser support
 */
export function createAudioManager(): AudioManager {
    // Check for Web Audio API support
    if (window.AudioContext || (window as any).webkitAudioContext) {
        return new WebAudioManager();
    }

    // Check for HTML5 Audio support
    if (typeof Audio !== 'undefined') {
        console.warn('Web Audio API not supported, using HTML5 Audio fallback');
        return new HTML5AudioManager();
    }

    // No audio support available
    console.warn('No audio support detected, using silent mode');
    return new SilentAudioManager();
}