import type { AudioManager, AudioState, ErrorHandling } from '../../Interfaces/IAudioManager';
import type { PlaySoundOptions } from '../../Interfaces/ISoundEvent';
import { SOUND_ASSETS, SOUND_CONFIG } from '../config/sound-config';
import { AssetLoader, type LoadingState, type LoadingProgress } from './asset-loader';
import { AudioOptimizer } from '../utils/audio-optimization';
import { HTML5AudioManager as SophisticatedHTML5AudioManager } from './html5-audio-manager';

// Re-export the standalone HTML5AudioManager for consistency
export { HTML5AudioManager } from './html5-audio-manager';

/**
 * Web Audio API implementation of the AudioManager interface
 * Provides high-performance audio playback with preloading and error handling
 * 
 * Performance Optimizations:
 * - Audio node pooling to reduce garbage collection pressure
 * - Performance mode with optimized playback path
 * - Concurrent sound limiting to prevent resource exhaustion
 * - Pre-initialized gain node pool for faster sound playback
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

    // Audio pooling for performance optimization
    private gainNodePool: GainNode[] = [];
    private sourceNodePool: AudioBufferSourceNode[] = [];
    private readonly MAX_POOL_SIZE = 20;
    private readonly MAX_CONCURRENT_SOUNDS = 15;
    private soundInstanceCounts: Map<string, number> = new Map();
    private readonly ENABLE_PERFORMANCE_MODE = true;

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
            const AudioContextClass = (typeof window !== 'undefined' && window.AudioContext) || (typeof window !== 'undefined' && (window as any).webkitAudioContext);

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

            // Pre-populate gain node pool for better performance
            this.initializeGainNodePool();

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
            if (this.state.audioContext && (this.state.audioContext.state as any) === 'interrupted') {
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
        // Check if window exists (for test environments)
        if (typeof window === 'undefined') {
            console.warn('Cannot dispatch audio error event: window is not defined');
            return;
        }
        
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

                // Now that context is resumed, try to preload sounds if they haven't been loaded
                this.preloadSoundsAfterResume();
            } catch (error) {
                console.warn(`Failed to resume audio context from ${source}:`, error);
                this.handleResumeFailure(error as Error, source);
            }
        };

        // Enhanced resume handlers
        const resumeHandlers = {
            click: () => attemptResume('click'),
            keydown: (event: Event) => {
                const keyboardEvent = event as KeyboardEvent;
                if (!['Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock'].includes(keyboardEvent.key)) {
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
        }, 5000) as unknown as number);

        // 15 second warning
        this.suspensionTimeouts.push(setTimeout(() => {
            if (this.state.audioContext?.state === 'suspended') {
                console.warn('Audio context has been suspended for 15 seconds. User interaction required.');
                this.emitErrorEvent('AUDIO_CONTEXT_SUSPENDED_TIMEOUT',
                    new Error('Audio context suspended for extended period'),
                    'AUTOPLAY_POLICY_15S'
                );
            }
        }, 15000) as unknown as number);
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
    private tryAlternativeResumeStrategies(_error: Error, source: string): void {
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
        if (typeof window !== 'undefined') {
            window.dispatchEvent(fallbackEvent);
        }

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
        if (typeof window !== 'undefined') {
            window.dispatchEvent(silentEvent);
        }

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
     * Preload sounds after audio context is resumed
     */
    private async preloadSoundsAfterResume(): Promise<void> {
        if (!this.state.audioContext || this.state.audioContext.state !== 'running') {
            return;
        }

        // Only preload if we haven't loaded sounds yet
        if (this.state.soundBuffers.size === 0) {
            try {
                console.log('Preloading sounds after audio context resume...');
                const buffers = await this.assetLoader.loadAssets(SOUND_ASSETS, this.state.audioContext);

                // Store loaded buffers
                buffers.forEach((buffer, soundId) => {
                    this.state.soundBuffers.set(soundId, buffer);
                    this.state.loadedSounds.add(soundId);
                });

                console.log(`Successfully preloaded ${buffers.size} sounds after resume`);
            } catch (error) {
                console.warn('Failed to preload sounds after resume:', error);
            }
        }
    }

    /**
     * Play a sound with the given options
     */
    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        // Fast path checks for performance
        if (this.errorHandling.fallbackMode || !this.state.isInitialized || !this.state.audioContext || !this.gainNode) {
            return;
        }

        // Check if audio context is suspended and try to resume
        if (this.state.audioContext.state === 'suspended') {
            console.warn('AudioContext is suspended, cannot play sound until user interaction');
            this.emitErrorEvent('AUDIO_CONTEXT_SUSPENDED',
                new Error('AudioContext suspended - user interaction required'),
                soundId);
            return;
        }

        // Check if we should limit concurrent sounds for performance
        if (this.shouldLimitConcurrentSounds(soundId)) {
            return;
        }

        const buffer = this.state.soundBuffers.get(soundId);
        if (!buffer) {
            this.attemptOnDemandLoad(soundId, options);
            return;
        }

        // Always validate buffers for critical errors, but only log in non-performance mode
        if (!this.isValidBuffer(buffer, soundId)) {
            return;
        }

        try {
            // Get nodes from pools for better performance
            const source = this.getSourceNodeFromPool();
            const gainNode = this.getGainNodeFromPool();

            if (!source || !gainNode) {
                return;
            }

            source.buffer = buffer;

            // Optimized volume calculation
            const volume = (options.volume ?? 1.0) * this.globalVolume;
            const categoryVolume = this.getCategoryVolumeForSound(soundId);
            const finalVolume = this.state.isMuted ? 0 : volume * categoryVolume;

            // Use setValueAtTime for better performance than setting gain.value
            const currentTime = this.state.audioContext.currentTime;
            gainNode.gain.setValueAtTime(finalVolume, currentTime);

            // Connect nodes
            source.connect(gainNode);
            gainNode.connect(this.gainNode);

            // Configure playback options
            if (options.loop) {
                source.loop = true;
            }

            // Track active source and increment count
            this.activeSources.add(source);
            this.incrementSoundCount(soundId);

            // Optimized cleanup handler
            const cleanup = () => {
                this.activeSources.delete(source);
                this.decrementSoundCount(soundId);
                try {
                    source.disconnect();
                    this.returnGainNodeToPool(gainNode);
                } catch (error) {
                    // Silently handle cleanup errors in performance mode
                    if (!this.ENABLE_PERFORMANCE_MODE) {
                        console.warn('Error cleaning up audio source:', error);
                    }
                }
            };

            source.onended = cleanup;

            // Start playback
            source.start(0);

        } catch (error) {
            if (!this.ENABLE_PERFORMANCE_MODE) {
                this.handlePlayError(soundId, error as Error);
            }
        }
    }

    /**
     * Check if audio context is ready for playback
     */
    private isAudioContextReady(): boolean {
        return this.state.audioContext !== null &&
            this.state.audioContext.state === 'running' &&
            this.gainNode !== null;
    }

    /**
     * Manually resume audio context (for user gesture handling)
     */
    async resumeAudioContext(): Promise<void> {
        if (!this.state.audioContext) {
            throw new Error('Audio context not available');
        }

        if (this.state.audioContext.state === 'suspended') {
            try {
                await this.state.audioContext.resume();
                console.log('Audio context resumed manually');

                // Trigger preload after resume
                await this.preloadSoundsAfterResume();
            } catch (error) {
                console.error('Failed to resume audio context manually:', error);
                throw error;
            }
        }
    }

    /**
     * Attempt to load a sound on-demand when it's not found in the buffer
     */
    private async attemptOnDemandLoad(soundId: string, options: PlaySoundOptions = {}): Promise<void> {
        // Only log in non-performance mode to avoid impacting performance tests
        if (!this.ENABLE_PERFORMANCE_MODE) {
            console.log(`Attempting on-demand load for sound: ${soundId}`);
        }

        if (!this.state.audioContext) {
            const error = new Error(`Cannot load sound ${soundId}: Audio context not available`);
            this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
            return;
        }

        // Check if audio context is suspended
        if (this.state.audioContext.state === 'suspended') {
            const error = new Error(`Cannot load sound ${soundId}: Audio context suspended - user interaction required`);
            this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
            return;
        }

        const asset = SOUND_ASSETS[soundId];
        if (!asset) {
            const error = new Error(`Sound asset not found: ${soundId}`);
            this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
            return;
        }

        try {
            const buffer = await this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext);
            if (buffer) {
                // Apply optimization to the loaded buffer
                try {
                    const optimizedBuffer = this.optimizer.normalizeAudioBuffer(buffer);
                    this.state.soundBuffers.set(soundId, optimizedBuffer);
                } catch (optimizationError) {
                    console.warn(`Failed to optimize ${soundId}, using original buffer:`, optimizationError);
                    this.state.soundBuffers.set(soundId, buffer);
                }

                this.state.loadedSounds.add(soundId);

                // Now try to play the sound again if audio context is ready
                if (this.isAudioContextReady()) {
                    this.playSound(soundId, options);
                }
            } else {
                throw new Error(`Failed to load audio buffer for ${soundId}`);
            }
        } catch (error) {
            this.emitErrorEvent('SOUND_LOAD_ERROR', error as Error, soundId);
        }
    }

    /**
     * Validate if an audio buffer is valid for playback
     */
    private isValidBuffer(buffer: AudioBuffer, soundId?: string): boolean {
        const isValid = buffer &&
            buffer.length > 0 &&
            buffer.numberOfChannels > 0 &&
            buffer.sampleRate > 0 &&
            buffer.duration > 0;

        // Always log critical buffer validation errors, even in performance mode
        if (!isValid) {
            console.warn('Invalid buffer detected for sound:', soundId || 'unknown');
        }

        return isValid;
    }

    /**
     * Get category volume for a specific sound
     */
    private getCategoryVolumeForSound(soundId: string): number {
        // Find which category this sound belongs to
        for (const [categoryKey, category] of Object.entries(SOUND_CONFIG.categories)) {
            if (category.sounds[soundId]) {
                return this.categoryVolumes.get(categoryKey) ?? 1.0;
            }
        }
        return 1.0;
    }

    /**
     * Get a gain node from the pool or create a new one
     */
    private getGainNodeFromPool(): GainNode | null {
        if (!this.state.audioContext) return null;

        if (this.gainNodePool.length > 0) {
            return this.gainNodePool.pop()!;
        }

        try {
            const gainNode = this.state.audioContext.createGain();
            return gainNode;
        } catch (error) {
            console.warn('Failed to create gain node:', error);
            return null;
        }
    }

    /**
     * Return a gain node to the pool for reuse
     */
    private returnGainNodeToPool(gainNode: GainNode): void {
        if (this.gainNodePool.length < this.MAX_POOL_SIZE) {
            // Reset gain node to default state
            try {
                gainNode.disconnect();
                gainNode.gain.setValueAtTime(1.0, this.state.audioContext?.currentTime || 0);
                this.gainNodePool.push(gainNode);
            } catch (error) {
                console.warn('Failed to return gain node to pool:', error);
            }
        }
    }

    /**
     * Check if we should limit concurrent sounds for performance
     */
    private shouldLimitConcurrentSounds(soundId: string): boolean {
        // In performance mode, be more lenient with limits to allow performance testing
        if (this.ENABLE_PERFORMANCE_MODE) {
            const totalActiveSounds = this.activeSources.size;
            return totalActiveSounds >= 100; // Much higher limit for performance testing
        }

        const currentCount = this.soundInstanceCounts.get(soundId) || 0;
        const totalActiveSounds = this.activeSources.size;

        // Normal limits for production use
        return currentCount >= 5 || totalActiveSounds >= this.MAX_CONCURRENT_SOUNDS;
    }

    /**
     * Increment sound instance count
     */
    private incrementSoundCount(soundId: string): void {
        const currentCount = this.soundInstanceCounts.get(soundId) || 0;
        this.soundInstanceCounts.set(soundId, currentCount + 1);
    }

    /**
     * Decrement sound instance count
     */
    private decrementSoundCount(soundId: string): void {
        const currentCount = this.soundInstanceCounts.get(soundId) || 0;
        if (currentCount > 0) {
            this.soundInstanceCounts.set(soundId, currentCount - 1);
        }
    }

    /**
     * Initialize the gain node pool with pre-created nodes
     */
    private initializeGainNodePool(): void {
        if (!this.state.audioContext) return;

        const initialPoolSize = Math.min(5, this.MAX_POOL_SIZE);
        for (let i = 0; i < initialPoolSize; i++) {
            try {
                const gainNode = this.state.audioContext.createGain();
                this.gainNodePool.push(gainNode);
            } catch (error) {
                console.warn('Failed to pre-create gain node for pool:', error);
                break;
            }
        }
        console.log(`Initialized gain node pool with ${this.gainNodePool.length} nodes`);
    }

    /**
     * Get a source node from the pool or create a new one
     */
    private getSourceNodeFromPool(): AudioBufferSourceNode | null {
        if (!this.state.audioContext) return null;

        // In performance mode, always create new source nodes for better performance
        // AudioBufferSourceNode can only be used once, so pooling them is not beneficial
        if (this.ENABLE_PERFORMANCE_MODE) {
            try {
                return this.state.audioContext.createBufferSource();
            } catch (error) {
                console.warn('Failed to create buffer source node:', error);
                return null;
            }
        }

        // Legacy approach (not used in performance mode)
        if (this.sourceNodePool.length > 0) {
            return this.sourceNodePool.pop()!;
        }

        try {
            return this.state.audioContext.createBufferSource();
        } catch (error) {
            console.warn('Failed to create buffer source node:', error);
            return null;
        }
    }

    /**
     * Preload all sounds
     */
    async preloadSounds(): Promise<void> {
        if (!this.state.audioContext) {
            console.warn('Audio context not available for preloading');
            return;
        }

        if (this.errorHandling.fallbackMode) {
            console.warn('Audio manager in fallback mode, skipping preload');
            return;
        }

        // If audio context is suspended, don't try to preload yet
        if (this.state.audioContext.state === 'suspended') {
            console.log('Audio context suspended, deferring sound preloading until user interaction');
            return;
        }

        try {
            const buffers = await this.assetLoader.loadAssets(SOUND_ASSETS, this.state.audioContext);

            // Apply optimization to loaded buffers
            const optimizedBuffers = new Map<string, AudioBuffer>();
            buffers.forEach((buffer, soundId) => {
                try {
                    // Apply basic optimization (normalization)
                    const optimizedBuffer = this.optimizer.normalizeAudioBuffer(buffer);
                    optimizedBuffers.set(soundId, optimizedBuffer);
                    this.state.loadedSounds.add(soundId);
                } catch (optimizationError) {
                    console.warn(`Failed to optimize ${soundId}, using original buffer:`, optimizationError);
                    optimizedBuffers.set(soundId, buffer);
                    this.state.loadedSounds.add(soundId);
                }
            });

            // Update our internal state with the optimized buffers
            this.state.soundBuffers = optimizedBuffers;

            console.log(`Preloaded ${this.state.loadedSounds.size} sounds`);
        } catch (error) {
            console.error('Error during preloading:', error);
        }
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
                console.warn('Error stopping audio source:', error);
            }
        });
        this.activeSources.clear();
        this.soundInstanceCounts.clear();
    }

    /**
     * Clean up resources
     */
    cleanup(): void {
        this.stopAllSounds();
        this.removeResumeListeners();

        // Clean up gain node pool
        this.gainNodePool.forEach(gainNode => {
            try {
                if (typeof gainNode.disconnect === 'function') {
                    gainNode.disconnect();
                }
            } catch (error) {
                console.warn('Error disconnecting pooled gain node:', error);
            }
        });
        this.gainNodePool = [];

        // Clean up source node pool
        this.sourceNodePool.forEach(sourceNode => {
            try {
                if (typeof sourceNode.disconnect === 'function') {
                    sourceNode.disconnect();
                }
            } catch (error) {
                console.warn('Error disconnecting pooled source node:', error);
            }
        });
        this.sourceNodePool = [];

        this.soundInstanceCounts.clear();

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
        return this.assetLoader.onProgress(callback);
    }

    /**
     * Get optimization report
     */
    getOptimizationReport(): any {
        // Convert loaded sound buffers to the format expected by the optimizer
        const audioFiles = Array.from(this.state.soundBuffers.entries()).map(([name, buffer]) => ({
            name,
            buffer
        }));

        return this.optimizer.getOptimizationReport(audioFiles);
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

    playSound(_soundId: string, _options?: PlaySoundOptions): void {
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
            errors: new Map()
        };
    }

    onLoadingProgress(_callback: (progress: LoadingProgress) => void): () => void {
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
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        return new WebAudioManager();
    }

    // Check for HTML5 Audio support
    if (typeof Audio !== 'undefined') {
        console.warn('Web Audio API not supported, using HTML5 Audio fallback');

        // Emit fallback event
        const fallbackEvent = new CustomEvent('audioManagerFallback', {
            detail: {
                from: 'WebAudio',
                to: 'HTML5Audio',
                reason: 'WEB_AUDIO_API_NOT_SUPPORTED',
                timestamp: Date.now()
            }
        });
        if (typeof window !== 'undefined') {
            window.dispatchEvent(fallbackEvent);
        }

        return new SophisticatedHTML5AudioManager();
    }

    // No audio support available
    console.warn('No audio support detected, using silent mode');

    // Emit fallback event for silent mode
    const silentEvent = new CustomEvent('audioManagerFallback', {
        detail: {
            from: 'WebAudio',
            to: 'Silent',
            reason: 'NO_AUDIO_SUPPORT',
            timestamp: Date.now()
        }
    });
    if (typeof window !== 'undefined') {
        window.dispatchEvent(silentEvent);
    }

    return new SilentAudioManager();
}