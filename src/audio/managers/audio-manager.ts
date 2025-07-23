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
     * Handle audio context errors with appropriate fallback strategies
     */
    private handleAudioContextError(error: Error, errorType: string): void {
        console.error(`Audio context error (${errorType}):`, error);

        this.errorHandling.fallbackMode = true;
        this.state.isInitialized = false;

        // Clean up any partially created resources
        if (this.gainNode) {
            try {
                this.gainNode.disconnect();
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
                case 'interrupted':
                    console.warn('Audio context interrupted - will attempt recovery');
                    this.handleAudioContextInterruption();
                    break;
                case 'closed':
                    console.warn('Audio context closed unexpectedly');
                    this.handleAudioContextClosure();
                    break;
            }
        };

        this.state.audioContext.addEventListener('statechange', handleStateChange);
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
            if (this.state.audioContext?.state === 'interrupted') {
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
     * Handle audio context suspension due to browser autoplay policies with enhanced recovery
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

                // If resume fails, try alternative approaches
                this.handleResumeFailure(error as Error, source);
            }
        };

        // Enhanced resume handlers with more interaction types and better detection
        const resumeHandlers = {
            click: () => attemptResume('click'),
            keydown: (event: KeyboardEvent) => {
                // Only resume on meaningful key presses (not modifier keys)
                if (!['Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock'].includes(event.key)) {
                    attemptResume('keydown');
                }
            },
            touchstart: () => attemptResume('touchstart'),
            pointerdown: () => attemptResume('pointerdown'),
            mousedown: () => attemptResume('mousedown'),
            // Additional interaction types for better coverage
            touchend: () => attemptResume('touchend'),
            focus: () => attemptResume('focus'),
            // Game-specific interactions
            gamepadconnected: () => attemptResume('gamepad'),
            wheel: (event: WheelEvent) => {
                // Only resume on significant wheel movements
                if (Math.abs(event.deltaY) > 10) {
                    attemptResume('wheel');
                }
            }
        };

        // Store handlers for cleanup
        this.resumeHandlers = resumeHandlers;

        // Add event listeners with passive option for better performance
        Object.entries(resumeHandlers).forEach(([event, handler]) => {
            const options = {
                passive: true,
                once: false, // Don't use once in case first attempt fails
                capture: false
            };

            try {
                document.addEventListener(event, handler as EventListener, options);
                // Also add to window for better coverage
                if (['focus', 'gamepadconnected'].includes(event)) {
                    window.addEventListener(event, handler as EventListener, options);
                }
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

        // 60 second critical warning
        this.suspensionTimeouts.push(setTimeout(() => {
            if (this.state.audioContext?.state === 'suspended') {
                console.error('Audio context suspended for 1 minute. Consider showing user notification.');
                this.emitErrorEvent('AUDIO_CONTEXT_SUSPENDED_CRITICAL',
                    new Error('Audio context suspended for critical period'),
                    'AUTOPLAY_POLICY_60S'
                );
            }
        }, 60000));
    }

    private suspensionTimeouts: number[] = [];

    /**
     * Clear all suspension timeout warnings
     */
    private clearSuspensionTimeouts(): void {
        this.suspensionTimeouts.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
        this.suspensionTimeouts = [];
    }

    private resumeHandlers: Record<string, EventListener> = {};

    /**
     * Remove all resume event listeners
     */
    private removeResumeListeners(): void {
        Object.entries(this.resumeHandlers).forEach(([event, handler]) => {
            try {
                document.removeEventListener(event, handler);
                // Also remove from window if it was added there
                if (['focus', 'gamepadconnected'].includes(event)) {
                    window.removeEventListener(event, handler);
                }
            } catch (error) {
                console.warn(`Error removing ${event} listener:`, error);
            }
        });
        this.resumeHandlers = {};

        // Clear all suspension timeouts
        this.clearSuspensionTimeouts();
    }

    /**
     * Handle resume failure with alternative strategies
     */
    private handleResumeFailure(error: Error, source: string): void {
        console.error(`Resume attempt from ${source} failed:`, error);

        // Increment failure count for this source
        this.resumeFailureCount = (this.resumeFailureCount || 0) + 1;

        // Try different recovery strategies based on failure count
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

    private resumeFailureCount: number = 0;

    /**
     * Try alternative resume strategies when standard resume fails
     */
    private tryAlternativeResumeStrategies(error: Error, source: string): void {
        if (!this.state.audioContext) return;

        const strategies = [
            // Strategy 1: Force resume with user gesture simulation
            async () => {
                console.log('Trying strategy 1: Force resume with gesture simulation');
                // Create a temporary silent buffer and play it to trigger resume
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
            },

            // Strategy 3: Check and handle specific browser quirks
            async () => {
                console.log('Trying strategy 3: Browser-specific resume');
                if (this.isSafari()) {
                    // Safari-specific resume handling
                    await this.handleSafariResume();
                } else if (this.isChrome()) {
                    // Chrome-specific resume handling
                    await this.handleChromeResume();
                } else {
                    // Generic fallback
                    await this.state.audioContext!.resume();
                }
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
     * Detect Safari browser
     */
    private isSafari(): boolean {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    /**
     * Detect Chrome browser
     */
    private isChrome(): boolean {
        return /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);
    }

    /**
     * Handle Safari-specific resume issues
     */
    private async handleSafariResume(): Promise<void> {
        if (!this.state.audioContext) return;

        // Safari sometimes needs multiple resume attempts
        for (let i = 0; i < 3; i++) {
            try {
                await this.state.audioContext.resume();
                if (this.state.audioContext.state === 'running') {
                    return;
                }
            } catch (error) {
                if (i === 2) throw error;
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }

    /**
     * Handle Chrome-specific resume issues
     */
    private async handleChromeResume(): Promise<void> {
        if (!this.state.audioContext) return;

        // Chrome sometimes needs a dummy sound to properly resume
        try {
            const oscillator = this.state.audioContext.createOscillator();
            const gainNode = this.state.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.state.audioContext.destination);

            gainNode.gain.setValueAtTime(0, this.state.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(440, this.state.audioContext.currentTime);

            oscillator.start();
            oscillator.stop(this.state.audioContext.currentTime + 0.01);

            await this.state.audioContext.resume();
        } catch (error) {
            // Fallback to standard resume
            await this.state.audioContext.resume();
        }
    }

    /**
     * Initiate graceful degradation when Web Audio API fails completely
     */
    private initiateGracefulDegradation(error: Error, reason: string): void {
        console.warn(`Initiating graceful degradation due to: ${reason}`);

        // Emit degradation event
        this.emitErrorEvent('AUDIO_DEGRADATION_INITIATED', error, reason);

        // Try to fall back to HTML5 Audio
        this.attemptHTML5Fallback(error, reason);
    }

    /**
     * Attempt to fall back to HTML5 Audio when Web Audio API fails
     */
    private attemptHTML5Fallback(error: Error, reason: string): void {
        console.log('Attempting fallback to HTML5 Audio');

        try {
            // Check if HTML5 Audio is available
            if (typeof Audio === 'undefined') {
                throw new Error('HTML5 Audio not available');
            }

            // Test HTML5 Audio functionality
            const testAudio = new Audio();
            if (!testAudio.canPlayType) {
                throw new Error('HTML5 Audio canPlayType not supported');
            }

            // If HTML5 Audio seems viable, switch to it
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
        // This would ideally notify the parent context to switch managers
        // For now, we'll enable fallback mode and emit an event
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

        // Stop all current audio activity
        this.stopAllSounds();
        this.cleanup();
    }

    /**
     * Get sound buffer with comprehensive fallback handling
     */
    private getSoundBufferWithFallback(soundId: string): AudioBuffer | null {
        const buffer = this.state.soundBuffers.get(soundId);

        if (!buffer) {
            // Try to load the sound on-demand if it wasn't preloaded
            this.attemptOnDemandLoad(soundId);
            return null;
        }

        return buffer;
    }

    private useHTML5Backup: string | null = null;

    /**
     * Attempt to load a sound on-demand when buffer is not found
     */
    private attemptOnDemandLoad(soundId: string): void {
        const asset = SOUND_ASSETS[soundId];
        if (!asset) {
            console.warn(`Sound asset not found for ID: ${soundId}`);
            return;
        }

        console.log(`Attempting on-demand load for ${soundId}`);

        // Set flag to use HTML5 backup for this sound
        this.useHTML5Backup = soundId;

        // Attempt to load the buffer asynchronously
        if (this.state.audioContext) {
            this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext)
                .then(buffer => {
                    if (buffer) {
                        this.state.soundBuffers.set(soundId, buffer);
                        console.log(`Successfully loaded ${soundId} on-demand`);
                    }
                })
                .catch(error => {
                    console.warn(`On-demand load failed for ${soundId}:`, error);
                });
        }
    }

    /**
     * Play sound using HTML5 Audio as backup when Web Audio fails
     */
    private playHTML5Backup(soundId: string, options: PlaySoundOptions = {}): void {
        const asset = SOUND_ASSETS[soundId];
        if (!asset) {
            console.warn(`Cannot play HTML5 backup - asset not found for ${soundId}`);
            return;
        }

        try {
            const audio = new Audio();

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
            audio.volume = Math.max(0, Math.min(1, (options.volume ?? 1.0) * this.globalVolume));
            audio.loop = Boolean(options.loop);

            const playPromise = audio.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.warn(`HTML5 backup playback failed for ${soundId}:`, error);
                });
            }

            console.debug(`Playing ${soundId} using HTML5 backup`);

        } catch (error) {
            console.error(`HTML5 backup setup failed for ${soundId}:`, error);
        }
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
     * Validate audio buffer integrity
     */
    private validateAudioBuffer(buffer: AudioBuffer, soundId: string): boolean {
        try {
            // Check basic buffer properties
            if (!buffer || buffer.length === 0) {
                console.warn(`Invalid buffer for ${soundId}: empty or null`);
                this.handlePlaybackError(soundId, new Error('Invalid audio buffer'), 'INVALID_BUFFER');
                return false;
            }

            if (buffer.numberOfChannels === 0) {
                console.warn(`Invalid buffer for ${soundId}: no audio channels`);
                this.handlePlaybackError(soundId, new Error('Audio buffer has no channels'), 'NO_CHANNELS');
                return false;
            }

            if (buffer.sampleRate === 0) {
                console.warn(`Invalid buffer for ${soundId}: invalid sample rate`);
                this.handlePlaybackError(soundId, new Error('Invalid sample rate'), 'INVALID_SAMPLE_RATE');
                return false;
            }

            if (buffer.duration === 0) {
                console.warn(`Invalid buffer for ${soundId}: zero duration`);
                this.handlePlaybackError(soundId, new Error('Audio buffer has zero duration'), 'ZERO_DURATION');
                return false;
            }

            return true;
        } catch (error) {
            console.error(`Error validating buffer for ${soundId}:`, error);
            this.handlePlaybackError(soundId, error as Error, 'VALIDATION_ERROR');
            return false;
        }
    }

    /**
     * Handle playback errors with recovery strategies
     */
    private handlePlaybackError(soundId: string, error: Error, errorType: string): void {
        console.error(`Playback error for ${soundId} (${errorType}):`, error);

        // Emit error event
        this.emitErrorEvent('PLAYBACK_ERROR', error, JSON.stringify({ soundId, errorType }));

        // Attempt recovery based on error type
        switch (errorType) {
            case 'BUFFER_NOT_FOUND':
                this.attemptOnDemandLoad(soundId);
                break;
            case 'CONTEXT_SUSPENDED':
                // Context suspension is handled elsewhere
                break;
            case 'INVALID_BUFFER':
            case 'NO_CHANNELS':
            case 'INVALID_SAMPLE_RATE':
            case 'ZERO_DURATION':
                // Try to reload the buffer
                this.reloadSoundBuffer(soundId);
                break;
            case 'SOURCE_NODE_ERROR':
                // Try HTML5 backup for this sound
                this.playHTML5Backup(soundId);
                break;
            case 'GAIN_NODE_ERROR':
                // Attempt to recreate gain node
                this.recreateGainNode();
                break;
            default:
                console.warn(`Unknown playback error type: ${errorType}`);
        }
    }

    /**
     * Attempt to reload a sound buffer that failed validation
     */
    private async reloadSoundBuffer(soundId: string): Promise<void> {
        const asset = SOUND_ASSETS[soundId];
        if (!asset || !this.state.audioContext) {
            return;
        }

        console.log(`Attempting to reload buffer for ${soundId}`);

        try {
            // Remove the invalid buffer
            this.state.soundBuffers.delete(soundId);
            this.state.loadedSounds.delete(soundId);

            // Attempt to reload
            const buffer = await this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext);
            if (buffer && this.validateAudioBuffer(buffer, soundId)) {
                this.state.soundBuffers.set(soundId, buffer);
                this.state.loadedSounds.add(soundId);
                console.log(`Successfully reloaded buffer for ${soundId}`);
            } else {
                throw new Error('Reloaded buffer is still invalid');
            }
        } catch (error) {
            console.error(`Failed to reload buffer for ${soundId}:`, error);
            // Fall back to HTML5 audio for this sound
            this.playHTML5Backup(soundId);
        }
    }

    /**
     * Attempt to recreate the gain node if it becomes corrupted
     */
    private recreateGainNode(): void {
        if (!this.state.audioContext) {
            return;
        }

        try {
            // Disconnect old gain node
            if (this.gainNode) {
                this.gainNode.disconnect();
            }

            // Create new gain node
            this.gainNode = this.state.audioContext.createGain();
            this.gainNode.connect(this.state.audioContext.destination);
            this.updateGainNodeVolume();

            console.log('Successfully recreated gain node');
        } catch (error) {
            console.error('Failed to recreate gain node:', error);
            this.initiateGracefulDegradation(error as Error, 'GAIN_NODE_RECREATION_FAILED');
        }
    }

    /**
     * Reinitialize the entire audio context when recovery fails
     */
    private reinitializeAudioContext(): void {
        console.log('Attempting to reinitialize audio context');

        // Clean up current context
        this.cleanup();

        // Reset state
        this.state = {
            isInitialized: false,
            isMuted: this.loadMutedPreference(),
            loadedSounds: new Set(),
            audioContext: null,
            soundBuffers: new Map()
        };

        // Reset error handling
        this.errorHandling.fallbackMode = false;
        this.resumeFailureCount = 0;

        // Attempt reinitialization
        setTimeout(() => {
            this.initializeAudioContext();
            if (this.state.isInitialized) {
                // Reload sounds
                this.preloadSounds().catch(error => {
                    console.error('Failed to reload sounds after context reinitialization:', error);
                });
            }
        }, 1000);
    }
                // Try to reload the sound
                this.attemptSoundReload(soundId);
break;
            default:
// For unknown errors, try HTML5 backup
this.useHTML5Backup = soundId;
break;
        }
    }

    /**
     * Attempt to reload a corrupted sound
     */
    private attemptSoundReload(soundId: string): void {
    const asset = SOUND_ASSETS[soundId];
    if(!asset || !this.state.audioContext) {
    return;
}

console.log(`Attempting to reload corrupted sound: ${soundId}`);

// Remove the corrupted buffer
this.state.soundBuffers.delete(soundId);

// Attempt to reload
this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext)
    .then(buffer => {
        if (buffer) {
            this.state.soundBuffers.set(soundId, buffer);
            console.log(`Successfully reloaded ${soundId}`);
        } else {
            console.warn(`Failed to reload ${soundId} - no buffer returned`);
        }
    })
    .catch(error => {
        console.error(`Failed to reload ${soundId}:`, error);
        // Mark for HTML5 backup on next play attempt
        this.useHTML5Backup = soundId;
    });
    }

    /**
     * Reinitialize audio context completely
     */
    private reinitializeAudioContext(): void {
    // Clean up existing context
    this.cleanup();

    // Reset state
    this.state.isInitialized = false;
    this.errorHandling.fallbackMode = false;
    this.errorHandling.retryAttempts = 3; // Reset retry count

    // Reinitialize
    this.initializeAudioContext();
}

    /**
     * Enhanced error recovery for failed sound file loads
     */
    private async recoverFromLoadFailure(soundId: string, error: Error): Promise < void> {
    console.log(`Attempting recovery for failed sound load: ${soundId}`);

    const asset = SOUND_ASSETS[soundId];
    if(!asset) {
        console.warn(`Cannot recover ${soundId} - asset not found`);
        return;
    }

        // Try alternative formats
        const alternativeFormats = this.getAlternativeFormats(asset.src);
    for(const altSrc of alternativeFormats) {
        try {
            console.log(`Trying alternative format for ${soundId}: ${altSrc}`);
            const buffer = await this.loadSingleAudioFile(soundId, altSrc);
            if (buffer) {
                this.state.soundBuffers.set(soundId, buffer);
                console.log(`Successfully recovered ${soundId} using alternative format`);
                return;
            }
        } catch (altError) {
            console.warn(`Alternative format failed for ${soundId}:`, altError);
        }
    }

        // Try loading from CDN or alternative source
        await this.tryAlternativeSource(soundId, asset);
}

    /**
     * Get alternative audio formats for fallback
     */
    private getAlternativeFormats(sources: string[]): string[] {
    const alternatives: string[] = [];

    // For each source, try different quality/compression variants
    sources.forEach(src => {
        const baseName = src.replace(/\.[^.]+$/, '');
        const ext = src.split('.').pop()?.toLowerCase();

        // Try compressed versions
        if (ext === 'wav') {
            alternatives.push(`${baseName}.mp3`);
            alternatives.push(`${baseName}.ogg`);
        } else if (ext === 'mp3') {
            alternatives.push(`${baseName}.ogg`);
            alternatives.push(`${baseName}.wav`);
        } else if (ext === 'ogg') {
            alternatives.push(`${baseName}.mp3`);
            alternatives.push(`${baseName}.wav`);
        }

        // Try different quality variants
        alternatives.push(`${baseName}_low.${ext}`);
        alternatives.push(`${baseName}_compressed.${ext}`);
    });

    return alternatives;
}

    /**
     * Try loading from alternative sources (CDN, backup servers)
     */
    private async tryAlternativeSource(soundId: string, asset: any): Promise < void> {
    const alternativeSources = [
        // Try from different base paths
        ...asset.src.map((src: string) => src.replace('/sounds/', '/audio/')),
        ...asset.src.map((src: string) => src.replace('/sounds/', '/assets/sounds/')),
        // Try from CDN (if configured)
        ...asset.src.map((src: string) => `https://cdn.example.com${src}`),
    ];

    for(const altSrc of alternativeSources) {
        try {
            console.log(`Trying alternative source for ${soundId}: ${altSrc}`);
            const buffer = await this.loadSingleAudioFile(soundId, altSrc);
            if (buffer) {
                this.state.soundBuffers.set(soundId, buffer);
                console.log(`Successfully loaded ${soundId} from alternative source`);
                return;
            }
        } catch (error) {
            console.warn(`Alternative source failed for ${soundId}:`, error);
        }
    }

        console.error(`All recovery attempts failed for ${soundId}`);
}

    /**
     * Load a single audio file with enhanced error handling
     */
    private async loadSingleAudioFile(soundId: string, url: string): Promise < AudioBuffer | null > {
    if(!this.state.audioContext) {
    throw new Error('Audio context not available');
}

try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'audio/*',
        },
        signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Validate the array buffer
    if (arrayBuffer.byteLength === 0) {
        throw new Error('Empty audio file');
    }

    const audioBuffer = await this.state.audioContext.decodeAudioData(arrayBuffer);

    // Validate the decoded buffer
    if (!this.validateAudioBuffer(audioBuffer, soundId)) {
        throw new Error('Invalid decoded audio buffer');
    }

    return audioBuffer;
} catch (error) {
    console.error(`Failed to load ${soundId} from ${url}:`, error);
    throw error;
}
    }

    /**
     * Enhanced autoplay policy handling with progressive recovery
     */
    private setupEnhancedAutoplayRecovery(): void {
    if(!this.state.audioContext) return;

    const recoveryStrategies = [
        // Strategy 1: Basic user interaction
        () => this.setupBasicUserInteractionRecovery(),
        // Strategy 2: Game-specific interactions
        () => this.setupGameInteractionRecovery(),
        // Strategy 3: Progressive enhancement
        () => this.setupProgressiveEnhancementRecovery(),
    ];

    recoveryStrategies.forEach((strategy, index) => {
        setTimeout(() => {
            if (this.state.audioContext?.state === 'suspended') {
                console.log(`Applying autoplay recovery strategy ${index + 1}`);
                strategy();
            }
        }, index * 2000); // Stagger strategies
    });
}

    /**
     * Set up basic user interaction recovery
     */
    private setupBasicUserInteractionRecovery(): void {
    const events = ['click', 'keydown', 'touchstart', 'pointerdown'];

    const resumeHandler = async (event: Event) => {
        if (this.state.audioContext?.state === 'suspended') {
            try {
                await this.state.audioContext.resume();
                console.log(`Audio context resumed via ${event.type}`);
                this.removeAutoplayRecoveryListeners();
            } catch (error) {
                console.warn(`Failed to resume via ${event.type}:`, error);
            }
        }
    };

    events.forEach(eventType => {
        document.addEventListener(eventType, resumeHandler, {
            once: true,
            passive: true,
            capture: true
        });
    });
}

    /**
     * Set up game-specific interaction recovery
     */
    private setupGameInteractionRecovery(): void {
    // Listen for game-specific events that indicate user engagement
    const gameEvents = [
        'gamestart',
        'playermove',
        'keypress',
        'gamepadconnected'
    ];

    const gameResumeHandler = async () => {
        if (this.state.audioContext?.state === 'suspended') {
            try {
                await this.state.audioContext.resume();
                console.log('Audio context resumed via game interaction');
            } catch (error) {
                console.warn('Failed to resume via game interaction:', error);
            }
        }
    };

    gameEvents.forEach(eventType => {
        window.addEventListener(eventType, gameResumeHandler, { once: true });
    });
}

    /**
     * Set up progressive enhancement recovery
     */
    private setupProgressiveEnhancementRecovery(): void {
    // Create a user-friendly notification for audio enablement
    if(this.state.audioContext?.state === 'suspended') {
    this.showAudioEnablementPrompt();
}

// Set up visibility change recovery
document.addEventListener('visibilitychange', async () => {
    if (!document.hidden && this.state.audioContext?.state === 'suspended') {
        try {
            await this.state.audioContext.resume();
            console.log('Audio context resumed on visibility change');
        } catch (error) {
            console.warn('Failed to resume on visibility change:', error);
        }
    }
});
    }

    /**
     * Show user-friendly audio enablement prompt
     */
    private showAudioEnablementPrompt(): void {
    const event = new CustomEvent('audioEnablementRequired', {
        detail: {
            message: 'Click anywhere to enable game audio',
            action: async () => {
                if (this.state.audioContext?.state === 'suspended') {
                    await this.state.audioContext.resume();
                }
            }
        }
    });
    window.dispatchEvent(event);
}

    /**
     * Remove all autoplay recovery listeners
     */
    private removeAutoplayRecoveryListeners(): void {
    // This would be called when audio context is successfully resumed
    // Implementation would track and remove all added listeners
    console.log('Removing autoplay recovery listeners');
}

    /**
     * Update gain node volume based on mute state and global volume
     */
    private updateGainNodeVolume(): void {
    if(!this.gainNode) return;

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
    } catch(error) {
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
     * Create and configure an audio source for playback with comprehensive error handling
     */
    private createAudioSource(buffer: AudioBuffer, soundId: string, options: PlaySoundOptions = {}): AudioBufferSourceNode | null {
    if (!this.state.audioContext || !this.gainNode) {
        console.warn(`Cannot create audio source for ${soundId} - context or gain node unavailable`);
        return null;
    }

    try {
        // Validate audio context state
        if (this.state.audioContext.state === 'closed') {
            console.warn(`Cannot create audio source for ${soundId} - context is closed`);
            this.handlePlaybackError(soundId, new Error('Audio context closed'), 'CONTEXT_CLOSED');
            return null;
        }

        // Create buffer source with error handling
        let source: AudioBufferSourceNode;
        try {
            source = this.state.audioContext.createBufferSource();
        } catch (sourceError) {
            console.error(`Failed to create buffer source for ${soundId}:`, sourceError);
            this.handlePlaybackError(soundId, sourceError as Error, 'SOURCE_CREATION_FAILED');
            return null;
        }

        // Set buffer with validation
        try {
            source.buffer = buffer;
        } catch (bufferError) {
            console.error(`Failed to set buffer for ${soundId}:`, bufferError);
            this.handlePlaybackError(soundId, bufferError as Error, 'BUFFER_ASSIGNMENT_FAILED');
            return null;
        }

        // Create volume control for this specific sound
        let volumeGain: GainNode;
        try {
            volumeGain = this.state.audioContext.createGain();
        } catch (gainError) {
            console.error(`Failed to create gain node for ${soundId}:`, gainError);
            this.handlePlaybackError(soundId, gainError as Error, 'GAIN_CREATION_FAILED');
            return null;
        }

        // Calculate final volume with bounds checking
        const category = this.findSoundCategory(soundId);
        const categoryVolume = category ? (this.categoryVolumes.get(category) ?? 1.0) : 1.0;
        const baseVolume = Math.max(0, Math.min(1, options.volume ?? 1.0));
        const finalVolume = Math.max(0, Math.min(1, baseVolume * categoryVolume));

        // Set volume with error handling
        try {
            volumeGain.gain.setValueAtTime(finalVolume, this.state.audioContext.currentTime);
        } catch (volumeError) {
            console.warn(`Failed to set volume for ${soundId}:`, volumeError);
            // Continue with default volume
            try {
                volumeGain.gain.value = finalVolume;
            } catch (fallbackVolumeError) {
                console.error(`Failed to set fallback volume for ${soundId}:`, fallbackVolumeError);
                // Continue anyway
            }
        }

        // Connect nodes with error handling
        try {
            source.connect(volumeGain);
            volumeGain.connect(this.gainNode);
        } catch (connectionError) {
            console.error(`Failed to connect audio nodes for ${soundId}:`, connectionError);
            this.handlePlaybackError(soundId, connectionError as Error, 'NODE_CONNECTION_FAILED');
            return null;
        }

        // Configure looping with error handling
        try {
            source.loop = Boolean(options.loop);
        } catch (loopError) {
            console.warn(`Failed to set loop property for ${soundId}:`, loopError);
            // Continue without looping
        }

        // Set up error handling for the source
        source.addEventListener('error', (event) => {
            console.error(`Audio source error for ${soundId}:`, event);
            this.activeSources.delete(source);
            this.handlePlaybackError(soundId, new Error('Audio source error'), 'SOURCE_ERROR');
        });

        // Track active sources for cleanup
        this.activeSources.add(source);
        source.addEventListener('ended', () => {
            this.activeSources.delete(source);
        });

        return source;
    } catch (error) {
        console.error(`Unexpected error creating audio source for ${soundId}:`, error);
        this.handlePlaybackError(soundId, error as Error, 'UNEXPECTED_SOURCE_ERROR');
        return null;
    }
}

/**
 * Play a sound by its ID with comprehensive error handling and recovery
 */
playSound(soundId: string, options: PlaySoundOptions = {}): void {
    // Early returns for known states
    if(this.errorHandling.fallbackMode) {
    console.debug(`Skipping sound ${soundId} - in fallback mode`);
    return;
}

if (this.state.isMuted) {
    console.debug(`Skipping sound ${soundId} - audio is muted`);
    return;
}

// Validate audio context state
if (!this.state.audioContext) {
    console.warn(`Cannot play ${soundId} - audio context not available`);
    this.handlePlaybackError(soundId, new Error('Audio context not available'), 'NO_CONTEXT');
    return;
}

if (this.state.audioContext.state === 'closed') {
    console.warn(`Cannot play ${soundId} - audio context is closed`);
    this.handlePlaybackError(soundId, new Error('Audio context closed'), 'CONTEXT_CLOSED');
    return;
}

if (this.state.audioContext.state === 'suspended') {
    console.debug(`Audio context suspended, sound ${soundId} may not play until resumed`);
    // Don't return here - the sound might still work when context resumes
}

try {
    // Get sound buffer with fallback handling
    const buffer = this.getSoundBufferWithFallback(soundId);

    // Check if we should use HTML5 backup instead
    if (!buffer && this.useHTML5Backup === soundId) {
        this.useHTML5Backup = null; // Reset flag
        this.playHTML5Backup(soundId, options);
        return;
    }

    if (!buffer) {
        console.warn(`Sound buffer not found for ID: ${soundId}`);
        this.handlePlaybackError(soundId, new Error('Sound buffer not found'), 'BUFFER_NOT_FOUND');
        return;
    }

    // Validate buffer integrity
    if (!this.validateAudioBuffer(buffer, soundId)) {
        return;
    }

    // Create audio source with error handling
    const source = this.createAudioSource(buffer, soundId, options);
    if (!source) {
        return;
    }

    // Calculate playback timing with validation
    const delay = Math.max(0, options.delay ?? 0);
    const currentTime = this.state.audioContext.currentTime;
    const when = currentTime + delay;

    // Start playback with error handling
    try {
        // Validate timing
        if (when < currentTime || !isFinite(when)) {
            console.warn(`Invalid playback time for ${soundId}, playing immediately`);
            source.start();
        } else {
            source.start(when);
        }

        console.debug(`Playing sound ${soundId} with delay ${delay}s`);
    } catch (startError) {
        console.error(`Failed to start playback for ${soundId}:`, startError);
        this.handlePlaybackError(soundId, startError as Error, 'START_FAILED');

        // Clean up the source
        this.activeSources.delete(source);
        try {
            source.disconnect();
        } catch (disconnectError) {
            // Ignore disconnect errors
        }
    }

} catch (error) {
    this.handlePlaybackError(soundId, error as Error, 'PLAYBACK_FAILED');
}
    }

    /**
     * Get sound buffer with comprehensive fallback strategies
     */
    private getSoundBufferWithFallback(soundId: string): AudioBuffer | null {
    // Try to get the requested sound
    let buffer = this.state.soundBuffers.get(soundId);
    if (buffer) {
        return buffer;
    }

    // Try alternative sound IDs (e.g., if specific variant not found, try base sound)
    const alternativeIds = this.getAlternativeSoundIds(soundId);
    for (const altId of alternativeIds) {
        buffer = this.state.soundBuffers.get(altId);
        if (buffer) {
            console.debug(`Using alternative sound ${altId} for ${soundId}`);
            return buffer;
        }
    }

    // If no buffer found, attempt on-demand loading
    this.attemptOnDemandLoad(soundId);
    return null;
}

    /**
     * Get alternative sound IDs for fallback
     */
    private getAlternativeSoundIds(soundId: string): string[] {
    const alternatives: string[] = [];

    // If looking for a specific variant, try the base sound
    if (soundId.includes('_')) {
        const baseSoundId = soundId.split('_')[0];
        if (baseSoundId) {
            alternatives.push(baseSoundId);
        }
    }

    // Add common fallback sounds
    const fallbackMap: Record<string, string[]> = {
        'player_walk': ['footstep', 'step'],
        'boulder_move': ['whoosh', 'move'],
        'arrow_move': ['twang', 'shoot'],
        'collision': ['thud', 'hit'],
        'death': ['whaaa', 'die'],
        'victory': ['door_slam', 'exit']
    };

    const fallbacks = fallbackMap[soundId];
    if (fallbacks) {
        alternatives.push(...fallbacks);
    }

    return alternatives;
}

    private systemicErrorCount: number = 0;

    /**
     * Handle systemic playback errors that might require fallback mode
     */
    private handleSystemicPlaybackError(error: Error, errorType: string): void {
    // Increment error count
    this.systemicErrorCount = (this.systemicErrorCount || 0) + 1;

    // If we have too many systemic errors, consider fallback mode
    if(this.systemicErrorCount >= 5) {
    console.warn(`Too many systemic errors (${this.systemicErrorCount}), considering fallback`);
    this.initiateGracefulDegradation(error, `SYSTEMIC_ERRORS_${errorType}`);
} else if (this.systemicErrorCount >= 3) {
    console.warn(`Multiple systemic errors detected (${this.systemicErrorCount}), monitoring closely`);
    // Try to reinitialize audio context
    setTimeout(() => {
        if (!this.errorHandling.fallbackMode) {
            this.reinitializeAudioContext();
        }
    }, 1000);
}
    }

    /**
     * Determine if a playback error indicates a systemic problem
     */
    private isSystemicPlaybackError(errorType: string): boolean {
    const systemicErrors = [
        'NO_CONTEXT',
        'CONTEXT_CLOSED',
        'SOURCE_CREATION_FAILED',
        'GAIN_CREATION_FAILED',
        'NODE_CONNECTION_FAILED'
    ];
    return systemicErrors.includes(errorType);
}
if (this.html5Backups.has(soundId)) {
    console.debug(`Web Audio buffer not found for ${soundId}, will use HTML5 backup`);
    // Return null here but set a flag to use HTML5 backup
    this.useHTML5Backup = soundId;
    return null;
}

// Try to load the sound on-demand if it wasn't preloaded
if (SOUND_ASSETS[soundId] && !this.state.loadedSounds.has(soundId)) {
    console.log(`Attempting on-demand load for ${soundId}`);
    this.loadSoundOnDemand(soundId);
}

return null;
    }

    private useHTML5Backup: string | null = null;

    /**
     * Get alternative sound IDs for fallback
     */
    private getAlternativeSoundIds(soundId: string): string[] {
    const alternatives: Record<string, string[]> = {
        'PLAYER_WALK_GRASS': ['PLAYER_WALK', 'PLAYER_STEP'],
        'PLAYER_WALK_STONE': ['PLAYER_WALK', 'PLAYER_STEP'],
        'BOULDER_ROLL_FAST': ['BOULDER_ROLL', 'BOULDER_MOVE'],
        'ARROW_WHOOSH_FAST': ['ARROW_WHOOSH', 'ARROW_MOVE']
    };

    return alternatives[soundId] || [];
}

    /**
     * Validate audio buffer integrity
     */
    private validateAudioBuffer(buffer: AudioBuffer, soundId: string): boolean {
    try {
        if (!buffer) {
            throw new Error('Buffer is null or undefined');
        }

        if (buffer.length === 0) {
            throw new Error('Buffer has zero length');
        }

        if (buffer.numberOfChannels === 0) {
            throw new Error('Buffer has no channels');
        }

        if (buffer.sampleRate <= 0) {
            throw new Error('Buffer has invalid sample rate');
        }

        return true;
    } catch (error) {
        console.error(`Invalid audio buffer for ${soundId}:`, error);
        this.handlePlaybackError(soundId, error as Error, 'INVALID_BUFFER');
        return false;
    }
}

    /**
     * Create audio source with comprehensive error handling
     */
    private createAudioSourceWithErrorHandling(
    buffer: AudioBuffer,
    soundId: string,
    options: PlaySoundOptions
): AudioBufferSourceNode | null {
    if (!this.state.audioContext || !this.gainNode) {
        return null;
    }

    try {
        const source = this.state.audioContext.createBufferSource();
        source.buffer = buffer;

        // Create volume control for this specific sound with error handling
        let volumeGain: GainNode;
        try {
            volumeGain = this.state.audioContext.createGain();
        } catch (error) {
            console.error(`Failed to create gain node for ${soundId}:`, error);
            return null;
        }

        // Calculate final volume with bounds checking
        const category = this.findSoundCategory(soundId);
        const categoryVolume = category ? (this.categoryVolumes.get(category) ?? 1.0) : 1.0;
        const baseVolume = Math.max(0, Math.min(1, options.volume ?? 1.0));
        const finalVolume = Math.max(0, Math.min(1, baseVolume * categoryVolume));

        try {
            volumeGain.gain.setValueAtTime(finalVolume, this.state.audioContext.currentTime);
        } catch (error) {
            console.warn(`Failed to set volume for ${soundId}, using default:`, error);
            volumeGain.gain.value = finalVolume;
        }

        // Connect audio nodes with error handling
        try {
            source.connect(volumeGain);
            volumeGain.connect(this.gainNode);
        } catch (error) {
            console.error(`Failed to connect audio nodes for ${soundId}:`, error);
            return null;
        }

        // Configure looping with validation
        source.loop = Boolean(options.loop);

        // Set up cleanup and error handling
        const cleanup = () => {
            this.activeSources.delete(source);
            try {
                source.disconnect();
                volumeGain.disconnect();
            } catch (disconnectError) {
                // Ignore disconnect errors - nodes may already be disconnected
            }
        };

        source.addEventListener('ended', cleanup);
        source.addEventListener('error', (event) => {
            console.error(`Audio source error for ${soundId}:`, event);
            cleanup();
            this.handlePlaybackError(soundId, new Error('Audio source error'), 'SOURCE_ERROR');
        });

        // Track active sources for cleanup
        this.activeSources.add(source);

        return source;
    } catch (error) {
        console.error(`Failed to create audio source for ${soundId}:`, error);
        this.handlePlaybackError(soundId, error as Error, 'SOURCE_CREATION_FAILED');
        return null;
    }
}

    /**
     * Handle playback errors with appropriate recovery strategies
     */
    private handlePlaybackError(soundId: string, error: Error, errorType: string): void {
    console.error(`Playback error for ${soundId} (${errorType}):`, error);

    // Call the configured error handler
    this.errorHandling.onPlayError(soundId, error);

    // Emit error event for external handling
    this.emitErrorEvent('SOUND_PLAYBACK_ERROR', error, JSON.stringify({ soundId, errorType }));

    // Check if this indicates a systemic problem
    if(this.isSystemicPlaybackError(errorType)) {
    console.warn(`Systemic playback error detected: ${errorType}`);
    this.handleSystemicPlaybackError(error, errorType);
}
    }

    /**
     * Determine if a playback error indicates a systemic problem
     */
    private isSystemicPlaybackError(errorType: string): boolean {
    const systemicErrors = [
        'NO_CONTEXT',
        'CONTEXT_CLOSED',
        'SOURCE_CREATION_FAILED'
    ];
    return systemicErrors.includes(errorType);
}

    /**
     * Handle systemic playback errors that might require fallback mode
     */
    private handleSystemicPlaybackError(error: Error, errorType: string): void {
    // Increment error count
    this.systemicErrorCount = (this.systemicErrorCount || 0) + 1;

    // If we have too many systemic errors, consider fallback mode
    if(this.systemicErrorCount >= 5) {
    console.error(`Too many systemic playback errors (${this.systemicErrorCount}), enabling fallback mode`);
    this.errorHandling.fallbackMode = true;
    this.emitErrorEvent('SYSTEMIC_PLAYBACK_FAILURE', error, errorType);
}
    }

    private systemicErrorCount: number = 0;

    /**
     * Attempt to load a sound on-demand with comprehensive error handling
     */
    private async loadSoundOnDemand(soundId: string): Promise < void> {
    if(!this.state.audioContext || this.errorHandling.fallbackMode) {
    console.debug(`Skipping on-demand load for ${soundId} - context unavailable or in fallback mode`);
    return;
}

const asset = SOUND_ASSETS[soundId];
if (!asset) {
    console.warn(`No asset configuration found for ${soundId}`);
    this.handleSoundLoadError(soundId, new Error('Asset configuration not found'));
    return;
}

// Check if we're already loading this sound
if (this.onDemandLoadingSet.has(soundId)) {
    console.debug(`Already loading ${soundId} on-demand, skipping duplicate request`);
    return;
}

this.onDemandLoadingSet.add(soundId);

try {
    console.log(`Loading sound on-demand: ${soundId}`);

    // Add timeout for on-demand loading
    const loadPromise = this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext);
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('On-demand load timeout')), 15000);
    });

    const buffer = await Promise.race([loadPromise, timeoutPromise]);

    if (buffer) {
        await this.processLoadedBuffer(soundId, buffer);
        console.log(`Successfully loaded ${soundId} on-demand`);

        // Emit success event
        this.emitErrorEvent('SOUND_LOADED_ON_DEMAND', new Error('Sound loaded successfully'), soundId);
    } else {
        throw new Error('Buffer is null after loading');
    }
} catch (error) {
    console.error(`Failed to load ${soundId} on-demand:`, error);
    this.handleSoundLoadError(soundId, error as Error);

    // Try alternative loading strategies
    await this.tryAlternativeLoadingStrategies(soundId, asset);
} finally {
    this.onDemandLoadingSet.delete(soundId);
}
    }

    private onDemandLoadingSet: Set<string> = new Set();

    /**
     * Try alternative loading strategies when standard loading fails
     */
    private async tryAlternativeLoadingStrategies(soundId: string, asset: any): Promise < void> {
    if(this.errorHandling.fallbackMode) return;

    console.log(`Trying alternative loading strategies for ${soundId}`);

    const strategies = [
        // Strategy 1: Try with different audio context
        async () => {
            console.log(`Trying alternative loading strategy 1 for ${soundId}: Different audio context`);
            const tempContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            try {
                const buffer = await this.assetLoader.loadAudioBuffer(soundId, asset, tempContext);
                if (buffer && this.state.audioContext) {
                    // Transfer buffer to main context (this is complex, so we'll just use it directly)
                    await this.processLoadedBuffer(soundId, buffer);
                    return true;
                }
            } finally {
                tempContext.close();
            }
            return false;
        },

        // Strategy 2: Try with reduced quality/different format
        async () => {
            console.log(`Trying alternative loading strategy 2 for ${soundId}: Reduced quality`);
            const modifiedAsset = {
                ...asset,
                src: asset.src.filter((src: string) => src.includes('.mp3')) // Prefer MP3 for compatibility
            };

            if (modifiedAsset.src.length > 0 && this.state.audioContext) {
                const buffer = await this.assetLoader.loadAudioBuffer(soundId, modifiedAsset, this.state.audioContext);
                if (buffer) {
                    await this.processLoadedBuffer(soundId, buffer);
                    return true;
                }
            }
            return false;
        },

        // Strategy 3: Try with HTML5 Audio as backup
        async () => {
            console.log(`Trying alternative loading strategy 3 for ${soundId}: HTML5 Audio backup`);
            return await this.loadAsHTML5Backup(soundId, asset);
        }
    ];

    for(let i = 0; i <strategies.length; i++) {
    try {
        const success = await strategies[i]!();
        if (success) {
            console.log(`Alternative loading strategy ${i + 1} succeeded for ${soundId}`);
            return;
        }
    } catch (strategyError) {
        console.warn(`Alternative loading strategy ${i + 1} failed for ${soundId}:`, strategyError);
    }
}

console.error(`All alternative loading strategies failed for ${soundId}`);
    }

    /**
     * Load sound as HTML5 Audio backup when Web Audio fails
     */
    private async loadAsHTML5Backup(soundId: string, asset: any): Promise < boolean > {
    try {
        if(typeof Audio === 'undefined') {
    return false;
}

const audio = new Audio();
const supportedSrc = asset.src.find((src: string) => {
    const format = src.split('.').pop()?.toLowerCase();
    const mimeType = this.getMimeTypeFromExtension(format || '');
    return mimeType && audio.canPlayType(mimeType);
});

if (!supportedSrc) {
    return false;
}

return new Promise<boolean>((resolve) => {
    const timeout = setTimeout(() => {
        resolve(false);
    }, 10000);

    audio.addEventListener('canplaythrough', () => {
        clearTimeout(timeout);
        // Store as HTML5 backup
        this.html5Backups.set(soundId, audio);
        console.log(`Loaded ${soundId} as HTML5 backup`);
        resolve(true);
    }, { once: true });

    audio.addEventListener('error', () => {
        clearTimeout(timeout);
        resolve(false);
    }, { once: true });

    audio.src = supportedSrc;
    audio.preload = 'auto';
});
        } catch (error) {
    console.warn(`HTML5 backup loading failed for ${soundId}:`, error);
    return false;
}
    }

    private html5Backups: Map<string, HTMLAudioElement> = new Map();

    /**
     * Get MIME type from file extension
     */
    private getMimeTypeFromExtension(extension: string): string | null {
    const mimeTypes: Record<string, string> = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        m4a: 'audio/mp4',
        aac: 'audio/aac'
    };
    return mimeTypes[extension] || null;
}

    /**
     * Enhanced sound load error handling
     */
    private handleSoundLoadError(soundId: string, error: Error): void {
    console.error(`Sound load error for ${soundId}:`, error);

    // Track load failures
    this.loadFailureCount = (this.loadFailureCount || 0) + 1;
    this.failedSounds.add(soundId);

    // Call configured error handler
    this.errorHandling.onLoadError(soundId, error);

    // Emit error event
    this.emitErrorEvent('SOUND_LOAD_ERROR', error, JSON.stringify({ soundId, failureCount: this.loadFailureCount }));

    // Check if we have too many load failures
    if(this.loadFailureCount >= 5) {
    console.warn(`High number of sound load failures (${this.loadFailureCount}), checking system health`);
    this.checkAudioSystemHealth();
}
    }

    private loadFailureCount: number = 0;
    private failedSounds: Set<string> = new Set();

    /**
     * Check overall audio system health and take corrective action
     */
    private checkAudioSystemHealth(): void {
    const totalSounds = Object.keys(SOUND_ASSETS).length;
    const loadedSounds = this.state.soundBuffers.size;
    const failedSounds = this.failedSounds.size;
    const successRate = totalSounds > 0 ? loadedSounds / totalSounds : 0;

    console.log(`Audio system health check: ${loadedSounds}/${totalSounds} loaded (${Math.round(successRate * 100)}% success rate)`);

    if(successRate < 0.5) {
        console.error('Audio system health critical - less than 50% of sounds loaded');
        this.emitErrorEvent('AUDIO_SYSTEM_HEALTH_CRITICAL',
            new Error(`Only ${Math.round(successRate * 100)}% of sounds loaded`),
            'SYSTEM_HEALTH_CHECK'
        );

        // Consider switching to fallback mode
        if (successRate < 0.25) {
            console.error('Audio system health extremely poor - enabling fallback mode');
            this.errorHandling.fallbackMode = true;
        }
    } else if(successRate < 0.8) {
        console.warn('Audio system health degraded - some sounds failed to load');
        this.emitErrorEvent('AUDIO_SYSTEM_HEALTH_DEGRADED',
            new Error(`${Math.round(successRate * 100)}% of sounds loaded`),
            'SYSTEM_HEALTH_CHECK'
        );
    }
}

    /**
     * Preload all configured sounds with comprehensive error handling and recovery
     */
    async preloadSounds(): Promise < void> {
    if(this.errorHandling.fallbackMode) {
    console.warn('Audio manager in fallback mode, skipping preload');
    return;
}

if (!this.state.audioContext) {
    console.warn('Audio context not available, attempting to initialize');
    this.initializeAudioContext();

    if (!this.state.audioContext) {
        console.error('Failed to initialize audio context for preloading');
        this.errorHandling.fallbackMode = true;
        return;
    }
}

// Check if audio context is in a usable state
if (this.state.audioContext.state === 'closed') {
    console.error('Audio context is closed, cannot preload sounds');
    this.handleAudioContextError(new Error('AudioContext is closed'), 'CONTEXT_CLOSED');
    return;
}

const startTime = performance.now();
let progressUnsubscribe: (() => void) | null = null;

try {
    // Set up comprehensive progress tracking
    progressUnsubscribe = this.assetLoader.onProgress((progress: LoadingProgress) => {
        console.log(`Loading ${progress.soundId}: ${Math.round(progress.progress * 100)}% (${progress.status})`);

        if (progress.status === 'failed' && progress.error) {
            this.handleSoundLoadError(progress.soundId, progress.error);
        }
    });

    // Validate audio context state before loading
    if (this.state.audioContext.state === 'suspended') {
        console.warn('Audio context is suspended, sounds will be preloaded but may not play until resumed');
    }

    // Load all assets with timeout protection
    const loadingPromise = this.assetLoader.loadAssets(SOUND_ASSETS, this.state.audioContext);
    const timeoutPromise = new Promise<Map<string, AudioBuffer>>((_, reject) => {
        setTimeout(() => reject(new Error('Preloading timeout after 30 seconds')), 30000);
    });

    const loadedBuffers = await Promise.race([loadingPromise, timeoutPromise]);

    // Process loaded buffers with individual error handling
    const processingErrors: Array<{ soundId: string; error: Error }> = [];

    for (const [soundId, buffer] of loadedBuffers.entries()) {
        try {
            await this.processLoadedBuffer(soundId, buffer);
        } catch (error) {
            processingErrors.push({ soundId, error: error as Error });
            console.error(`Failed to process sound ${soundId}:`, error);

            // Still try to add the original buffer as fallback
            try {
                this.state.soundBuffers.set(soundId, buffer);
                this.state.loadedSounds.add(soundId);
                console.log(`Added unprocessed buffer for ${soundId} as fallback`);
            } catch (fallbackError) {
                console.error(`Failed to add fallback buffer for ${soundId}:`, fallbackError);
            }
        }
    }

    // Clean up progress tracking
    if (progressUnsubscribe) {
        progressUnsubscribe();
        progressUnsubscribe = null;
    }

    // Generate comprehensive loading report
    const loadingState = this.assetLoader.getLoadingState();
    const loadTime = performance.now() - startTime;

    console.log(
        `Preloading complete in ${Math.round(loadTime)}ms: ` +
        `${loadingState.loadedCount}/${loadingState.totalCount} sounds loaded`
    );

    if (loadingState.failedSounds.length > 0) {
        console.warn('Failed to load sounds:', loadingState.failedSounds);
        this.emitErrorEvent('SOUND_LOADING_PARTIAL_FAILURE',
            new Error(`${loadingState.failedSounds.length} sounds failed to load`),
            JSON.stringify(loadingState.failedSounds)
        );
    }

    if (processingErrors.length > 0) {
        console.warn('Sound processing errors:', processingErrors);
        this.emitErrorEvent('SOUND_PROCESSING_ERRORS',
            new Error(`${processingErrors.length} sounds had processing errors`),
            JSON.stringify(processingErrors.map(e => ({ soundId: e.soundId, error: e.error.message })))
        );
    }

    // Check if we have enough sounds to continue
    const criticalSounds = this.getCriticalSounds();
    const loadedCriticalSounds = criticalSounds.filter(soundId => this.state.loadedSounds.has(soundId));

    if (loadedCriticalSounds.length === 0 && criticalSounds.length > 0) {
        console.error('No critical sounds loaded, audio experience will be severely degraded');
        this.emitErrorEvent('CRITICAL_SOUNDS_MISSING',
            new Error('No critical sounds could be loaded'),
            JSON.stringify(criticalSounds)
        );
    }

} catch (error) {
    console.error('Critical error during sound preloading:', error);

    // Clean up progress tracking
    if (progressUnsubscribe) {
        progressUnsubscribe();
    }

    // Determine if this is a critical error that should trigger fallback mode
    if (this.isCriticalPreloadError(error as Error)) {
        console.error('Critical preload error, enabling fallback mode');
        this.errorHandling.fallbackMode = true;
        this.emitErrorEvent('PRELOAD_CRITICAL_FAILURE', error as Error, 'FALLBACK_ENABLED');
    } else {
        console.warn('Non-critical preload error, continuing with partial functionality');
        this.emitErrorEvent('PRELOAD_NON_CRITICAL_FAILURE', error as Error, 'PARTIAL_FUNCTIONALITY');
    }
}
    }

    /**
     * Process a loaded audio buffer with optimization and error handling
     */
    private async processLoadedBuffer(soundId: string, buffer: AudioBuffer): Promise < void> {
    try {
        // Validate buffer
        if(!buffer || buffer.length === 0) {
    throw new Error(`Invalid audio buffer for ${soundId}`);
}

// Analyze and potentially optimize the buffer
const analysis = this.optimizer.analyzeAudioBuffer(buffer);

if (analysis.recommendations.length > 0) {
    console.log(`Optimization recommendations for ${soundId}:`, analysis.recommendations);
}

// Apply optimization with error handling
let optimizedBuffer = buffer;

try {
    optimizedBuffer = this.optimizer.normalizeAudioBuffer(buffer);
} catch (normalizationError) {
    console.warn(`Failed to normalize ${soundId}, using original:`, normalizationError);
}

try {
    optimizedBuffer = this.optimizer.applyFadeInOut(optimizedBuffer);
} catch (fadeError) {
    console.warn(`Failed to apply fade to ${soundId}, using current buffer:`, fadeError);
}

// Store the processed buffer
this.state.soundBuffers.set(soundId, optimizedBuffer);
this.state.loadedSounds.add(soundId);

        } catch (error) {
    console.error(`Failed to process buffer for ${soundId}:`, error);
    throw error; // Re-throw to be handled by caller
}
    }

    /**
     * Handle individual sound loading errors with recovery strategies
     */
    private handleSoundLoadError(soundId: string, error: Error): void {
    console.error(`Sound loading error for ${soundId}:`, error);

    // Check if this is a critical sound
    const criticalSounds = this.getCriticalSounds();
    const isCritical = criticalSounds.includes(soundId);

    if(isCritical) {
        console.warn(`Critical sound ${soundId} failed to load, attempting recovery`);
        this.attemptSoundRecovery(soundId, error);
    }

        // Store error for reporting
        this.errorHandling.onLoadError(soundId, error);

    // Emit specific error event
    this.emitErrorEvent('SOUND_LOAD_ERROR', error, JSON.stringify({ soundId, isCritical }));
}

    /**
     * Attempt to recover from sound loading failure
     */
    private async attemptSoundRecovery(soundId: string, originalError: Error): Promise < void> {
    console.log(`Attempting recovery for critical sound: ${soundId}`);

    try {
        // Try to load with reduced quality or alternative format
        const asset = SOUND_ASSETS[soundId];
        if(asset && asset.src.length > 1) {
    // Try alternative formats
    const alternativeAsset = {
        ...asset,
        src: asset.src.slice(1) // Skip the first (failed) format
    };

    if (this.state.audioContext) {
        const buffer = await this.assetLoader.loadAudioBuffer(soundId + '_recovery', alternativeAsset, this.state.audioContext);
        if (buffer) {
            this.state.soundBuffers.set(soundId, buffer);
            this.state.loadedSounds.add(soundId);
            console.log(`Successfully recovered sound: ${soundId}`);
            return;
        }
    }
}

// If recovery fails, create a silent placeholder
this.createSilentPlaceholder(soundId);

        } catch (recoveryError) {
    console.error(`Recovery failed for ${soundId}:`, recoveryError);
    this.createSilentPlaceholder(soundId);
}
    }

    /**
     * Create a silent audio buffer as placeholder for failed sounds
     */
    private createSilentPlaceholder(soundId: string): void {
    if(!this.state.audioContext) return;

    try {
        // Create a short silent buffer (0.1 seconds)
        const sampleRate = this.state.audioContext.sampleRate;
        const length = Math.floor(sampleRate * 0.1);
        const buffer = this.state.audioContext.createBuffer(1, length, sampleRate);

        // Buffer is already silent (filled with zeros)
        this.state.soundBuffers.set(soundId, buffer);
        this.state.loadedSounds.add(soundId);

        console.log(`Created silent placeholder for ${soundId}`);
    } catch(error) {
        console.error(`Failed to create silent placeholder for ${soundId}:`, error);
    }
}

    /**
     * Get list of critical sounds that are essential for gameplay
     */
    private getCriticalSounds(): string[] {
    // Define sounds that are critical for gameplay feedback
    return [
        'PLAYER_WALK',
        'PLAYER_DIG',
        'DEATH_SOUND',
        'VICTORY_SOUND'
    ];
}

    /**
     * Determine if a preload error is critical enough to trigger fallback mode
     */
    private isCriticalPreloadError(error: Error): boolean {
    const criticalErrorPatterns = [
        'AudioContext',
        'decodeAudioData',
        'createBuffer',
        'timeout',
        'Network error'
    ];

    const errorMessage = error.message.toLowerCase();
    return criticalErrorPatterns.some(pattern =>
        errorMessage.includes(pattern.toLowerCase())
    );
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
getAllCategoryVolumes(): Record < string, number > {
    return Object.fromEntries(this.categoryVolumes.entries());
}

/**
 * Get optimization report for all loaded sounds
 */
getOptimizationReport(): ReturnType < AudioOptimizer['getOptimizationReport'] > {
    const audioFiles = Array.from(this.state.soundBuffers.entries()).map(([name, buffer]) => ({
        name,
        buffer
    }));

    return this.optimizer.getOptimizationReport(audioFiles);
}

/**
 * Clean up audio resources with comprehensive error handling
 */
cleanup(): void {
    console.log('Cleaning up audio resources');

    try {
        // Stop all active sounds with error handling
        this.stopAllSounds();
    } catch(error) {
        console.warn('Error stopping sounds during cleanup:', error);
    }

        try {
        // Remove resume listeners
        this.removeResumeListeners();
    } catch(error) {
        console.warn('Error removing resume listeners:', error);
    }

        try {
        // Clean up asset loader
        this.assetLoader.cleanup();
    } catch(error) {
        console.warn('Error cleaning up asset loader:', error);
    }

        try {
        // Clear sound buffers
        this.state.soundBuffers.clear();
        this.state.loadedSounds.clear();
    } catch(error) {
        console.warn('Error clearing sound buffers:', error);
    }

        try {
        // Disconnect and clean up gain node
        if(this.gainNode) {
    this.gainNode.disconnect();
    this.gainNode = null;
}
        } catch (error) {
    console.warn('Error disconnecting gain node:', error);
}

try {
    // Close audio context with proper error handling
    if (this.state.audioContext && this.state.audioContext.state !== 'closed') {
        // Remove any event listeners first
        this.state.audioContext.removeEventListener?.('statechange', () => { });

        // Close the context
        const closePromise = this.state.audioContext.close();
        if (closePromise) {
            closePromise.catch(error => {
                console.warn('Error closing audio context:', error);
            });
        }
    }
} catch (error) {
    console.warn('Error during audio context cleanup:', error);
}

try {
    // Clear timeouts
    if (this.suspensionTimeoutId) {
        clearTimeout(this.suspensionTimeoutId);
        this.suspensionTimeoutId = null;
    }
} catch (error) {
    console.warn('Error clearing timeouts:', error);
}

// Reset state
this.state.audioContext = null;
this.gainNode = null;
this.state.isInitialized = false;
this.errorHandling.fallbackMode = false;
this.systemicErrorCount = 0;

console.log('Audio cleanup completed');
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
        if (this.muted) {
            console.debug(`Skipping sound ${soundId} - audio is muted`);
            return;
        }

        const audio = this.audioElements.get(soundId);
        if (!audio) {
            console.warn(`Audio element not found for ID: ${soundId}`);
            this.handleHtml5PlaybackError(soundId, new Error('Audio element not found'), 'ELEMENT_NOT_FOUND');
            return;
        }

        try {
            // Check if audio element is in a valid state
            if (audio.error) {
                console.error(`Audio element has error for ${soundId}:`, audio.error);
                this.handleHtml5PlaybackError(soundId, new Error(`Audio element error: ${audio.error.message}`), 'ELEMENT_ERROR');
                return;
            }

            // Reset playback position with error handling
            try {
                audio.currentTime = 0;
            } catch (timeError) {
                console.warn(`Failed to reset currentTime for ${soundId}:`, timeError);
                // Continue anyway - this is not critical
            }

            // Calculate and set volume with bounds checking
            const category = this.findSoundCategory(soundId);
            const categoryVolume = category ? (this.categoryVolumes.get(category) ?? 1.0) : 1.0;
            const baseVolume = Math.max(0, Math.min(1, options.volume ?? 1.0));
            const finalVolume = Math.max(0, Math.min(1, baseVolume * categoryVolume * this.globalVolume));

            try {
                audio.volume = finalVolume;
            } catch (volumeError) {
                console.warn(`Failed to set volume for ${soundId}:`, volumeError);
                // Continue with default volume
            }

            // Set loop property with error handling
            try {
                audio.loop = Boolean(options.loop);
            } catch (loopError) {
                console.warn(`Failed to set loop for ${soundId}:`, loopError);
                // Continue without looping
            }

            // Attempt to play with comprehensive error handling
            const playPromise = audio.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(error => {
                    this.handleHtml5PlaybackError(soundId, error, 'PLAY_PROMISE_REJECTED');
                });
            }

            console.debug(`Playing HTML5 sound ${soundId} with volume ${finalVolume}`);

        } catch (error) {
            this.handleHtml5PlaybackError(soundId, error as Error, 'PLAYBACK_EXCEPTION');
        }
    }

    /**
     * Handle HTML5 audio playback errors
     */
    private handleHtml5PlaybackError(soundId: string, error: Error, errorType: string): void {
        console.error(`HTML5 audio playback error for ${soundId} (${errorType}):`, error);

        // Emit error event for external handling
        const errorEvent = new CustomEvent('audioError', {
            detail: {
                type: 'HTML5_PLAYBACK_ERROR',
                error,
                details: JSON.stringify({ soundId, errorType }),
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(errorEvent);

        // Attempt recovery for certain error types
        if (errorType === 'PLAY_PROMISE_REJECTED' && error.name === 'NotAllowedError') {
            console.log(`Autoplay blocked for ${soundId}, will retry on next user interaction`);
            this.setupAutoplayRecovery(soundId);
        }
    }

    /**
     * Set up recovery for autoplay-blocked sounds
     */
    private setupAutoplayRecovery(soundId: string): void {
        const audio = this.audioElements.get(soundId);
        if (!audio) return;

        const retryPlay = () => {
            if (!this.muted) {
                audio.play().catch(retryError => {
                    console.warn(`Autoplay recovery failed for ${soundId}:`, retryError);
                });
            }
            // Remove listeners after first attempt
            document.removeEventListener('click', retryPlay);
            document.removeEventListener('keydown', retryPlay);
            document.removeEventListener('touchstart', retryPlay);
        };

        document.addEventListener('click', retryPlay, { once: true });
        document.addEventListener('keydown', retryPlay, { once: true });
        document.addEventListener('touchstart', retryPlay, { once: true });
    }

    async preloadSounds(): Promise<void> {
        const startTime = performance.now();
        const loadPromises: Promise<void>[] = [];
        const failedSounds: string[] = [];

        console.log('Starting HTML5 audio preloading');

        for (const [soundId, asset] of Object.entries(SOUND_ASSETS)) {
            if (!asset.preload) continue;

            const loadPromise = this.loadHtml5Audio(soundId, asset)
                .catch(error => {
                    console.error(`Failed to preload HTML5 sound ${soundId}:`, error);
                    failedSounds.push(soundId);
                    // Don't re-throw - we want to continue with other sounds
                });

            loadPromises.push(loadPromise);
        }

        // Wait for all loading attempts to complete
        await Promise.allSettled(loadPromises);

        const loadTime = performance.now() - startTime;
        const successCount = this.audioElements.size;
        const totalCount = Object.values(SOUND_ASSETS).filter(asset => asset.preload).length;

        console.log(
            `HTML5 Audio preloading complete in ${Math.round(loadTime)}ms: ` +
            `${successCount}/${totalCount} sounds loaded`
        );

        if (failedSounds.length > 0) {
            console.warn('Failed to preload HTML5 sounds:', failedSounds);

            // Emit error event for failed sounds
            const errorEvent = new CustomEvent('audioError', {
                detail: {
                    type: 'HTML5_PRELOAD_PARTIAL_FAILURE',
                    error: new Error(`${failedSounds.length} sounds failed to preload`),
                    details: JSON.stringify(failedSounds),
                    timestamp: Date.now()
                }
            });
            window.dispatchEvent(errorEvent);
        }

        // Check if we have any sounds loaded
        if (successCount === 0 && totalCount > 0) {
            console.error('No HTML5 sounds could be preloaded');
            const errorEvent = new CustomEvent('audioError', {
                detail: {
                    type: 'HTML5_PRELOAD_TOTAL_FAILURE',
                    error: new Error('No sounds could be preloaded'),
                    details: 'HTML5_FALLBACK_FAILED',
                    timestamp: Date.now()
                }
            });
            window.dispatchEvent(errorEvent);
        }
    }

    private async loadHtml5Audio(soundId: string, asset: any): Promise<void> {
        try {
            // Filter sources to only supported formats
            const optimizedSources = asset.src.filter((src: string) => {
                const format = src.split('.').pop()?.toLowerCase();
                return this.supportsFormat(format || '');
            });

            if (optimizedSources.length === 0) {
                throw new Error(`No supported formats for ${soundId}`);
            }

            const audio = new Audio();

            // Set up audio element with error handling
            try {
                audio.preload = 'auto';
                audio.volume = Math.max(0, Math.min(1, asset.volume || 1.0));
            } catch (setupError) {
                console.warn(`Error setting up audio element for ${soundId}:`, setupError);
                // Continue with defaults
            }

            // Try each source URL until one works
            return new Promise<void>((resolve, reject) => {
                let currentIndex = 0;
                let lastError: Error | null = null;

                const tryNextSource = () => {
                    if (currentIndex >= optimizedSources.length) {
                        const error = lastError || new Error(`Failed to load all sources for ${soundId}`);
                        reject(error);
                        return;
                    }

                    const currentSource = optimizedSources[currentIndex]!;
                    console.debug(`Trying source ${currentIndex + 1}/${optimizedSources.length} for ${soundId}: ${currentSource}`);

                    audio.src = currentSource;
                    currentIndex++;
                };

                const onCanPlayThrough = () => {
                    console.debug(`Successfully loaded HTML5 audio for ${soundId}`);
                    this.audioElements.set(soundId, audio);
                    cleanup();
                    resolve();
                };

                const onError = (event: Event) => {
                    const error = audio.error;
                    lastError = new Error(
                        `Failed to load ${soundId} from source ${currentIndex}: ` +
                        `${error?.message || 'Unknown error'} (code: ${error?.code || 'unknown'})`
                    );

                    console.warn(lastError.message);

                    // Try next source after a short delay
                    setTimeout(tryNextSource, 100);
                };

                const onLoadStart = () => {
                    console.debug(`Started loading ${soundId} from source ${currentIndex}`);
                };

                const onProgress = () => {
                    if (audio.buffered.length > 0) {
                        const loaded = audio.buffered.end(0);
                        const total = audio.duration || 1;
                        const progress = Math.round((loaded / total) * 100);
                        console.debug(`Loading progress for ${soundId}: ${progress}%`);
                    }
                };

                const cleanup = () => {
                    audio.removeEventListener('canplaythrough', onCanPlayThrough);
                    audio.removeEventListener('error', onError);
                    audio.removeEventListener('loadstart', onLoadStart);
                    audio.removeEventListener('progress', onProgress);
                };

                // Set up event listeners
                audio.addEventListener('canplaythrough', onCanPlayThrough);
                audio.addEventListener('error', onError);
                audio.addEventListener('loadstart', onLoadStart);
                audio.addEventListener('progress', onProgress);

                // Set up timeout to prevent hanging
                const timeoutId = setTimeout(() => {
                    cleanup();
                    reject(new Error(`Timeout loading ${soundId} after 10 seconds`));
                }, 10000);

                // Clear timeout on success or error
                const originalResolve = resolve;
                const originalReject = reject;

                resolve = (...args) => {
                    clearTimeout(timeoutId);
                    originalResolve(...args);
                };

                reject = (...args) => {
                    clearTimeout(timeoutId);
                    originalReject(...args);
                };

                // Start loading first source
                tryNextSource();
            });

        } catch (error) {
            console.error(`Error setting up HTML5 audio loading for ${soundId}:`, error);
            throw error;
        }
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

/**
  * Play sound with comprehensive error handling and fallback strategies
  */
playSound(soundId: string, options: PlaySoundOptions = {}): void {
    if(this.errorHandling.fallbackMode) {
    this.playHTML5Backup(soundId, options);
    return;
}

if (!this.state.audioContext || !this.state.isInitialized) {
    console.warn('Audio context not initialized, attempting HTML5 fallback');
    this.playHTML5Backup(soundId, options);
    return;
}

if (this.state.audioContext.state === 'suspended') {
    console.warn('Audio context suspended, sound will play after user interaction');
    // Store the sound to play after resume
    this.pendingSounds.push({ soundId, options });
    return;
}

try {
    const buffer = this.getSoundBufferWithFallback(soundId);
    if (!buffer) {
        console.warn(`Buffer not found for ${soundId}, using HTML5 fallback`);
        this.playHTML5Backup(soundId, options);
        return;
    }

    if (!this.validateAudioBuffer(buffer, soundId)) {
        return; // Error handling is done in validateAudioBuffer
    }

    // Create and configure source node
    const source = this.createSourceNode(buffer, soundId, options);
    if (!source) {
        this.playHTML5Backup(soundId, options);
        return;
    }

    // Start playback
    const startTime = this.state.audioContext.currentTime + (options.delay || 0);
    source.start(startTime);

    // Track active source
    this.activeSources.add(source);

    // Clean up when sound ends
    source.addEventListener('ended', () => {
        this.activeSources.delete(source);
        source.disconnect();
    });

} catch (error) {
    this.handlePlaybackError(soundId, error as Error, 'PLAYBACK_FAILED');
}
    }

    private pendingSounds: Array<{ soundId: string; options: PlaySoundOptions }> = [];

    /**
     * Create and configure audio source node with error handling
     */
    private createSourceNode(
    buffer: AudioBuffer,
    soundId: string,
    options: PlaySoundOptions
): AudioBufferSourceNode | null {
    if (!this.state.audioContext || !this.gainNode) {
        return null;
    }

    try {
        const source = this.state.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = Boolean(options.loop);

        // Connect to gain node
        source.connect(this.gainNode);

        // Apply volume settings
        const asset = SOUND_ASSETS[soundId];
        const category = this.getCategoryForSound(soundId);
        const categoryVolume = this.categoryVolumes.get(category) || 1.0;
        const assetVolume = asset?.volume || 1.0;
        const optionsVolume = options.volume || 1.0;

        const finalVolume = this.globalVolume * categoryVolume * assetVolume * optionsVolume;

        // Create individual gain node for this sound if volume adjustment needed
        if (finalVolume !== 1.0) {
            const soundGain = this.state.audioContext.createGain();
            soundGain.gain.setValueAtTime(finalVolume, this.state.audioContext.currentTime);
            source.disconnect();
            source.connect(soundGain);
            soundGain.connect(this.gainNode);
        }

        return source;
    } catch (error) {
        this.handlePlaybackError(soundId, error as Error, 'SOURCE_NODE_ERROR');
        return null;
    }
}

    /**
     * Get the category for a sound ID
     */
    private getCategoryForSound(soundId: string): string {
    for (const [categoryName, category] of Object.entries(SOUND_CONFIG.categories)) {
        if (category.sounds[soundId]) {
            return categoryName;
        }
    }
    return 'default';
}

    /**
     * Preload all sounds with comprehensive error handling
     */
    async preloadSounds(): Promise < void> {
    if(!this.state.audioContext) {
    console.warn('Cannot preload sounds: audio context not available');
    return;
}

try {
    const buffers = await this.assetLoader.loadAssets(SOUND_ASSETS, this.state.audioContext);

    // Store successfully loaded buffers
    buffers.forEach((buffer, soundId) => {
        if (this.validateAudioBuffer(buffer, soundId)) {
            this.state.soundBuffers.set(soundId, buffer);
            this.state.loadedSounds.add(soundId);
        }
    });

    console.log(`Preloaded ${this.state.loadedSounds.size} sounds successfully`);

    // Play any pending sounds that were waiting for context resume
    this.playPendingSounds();

} catch (error) {
    console.error('Error during sound preloading:', error);
    // Don't throw - allow the game to continue without sound
}
    }

    /**
     * Play sounds that were queued while context was suspended
     */
    private playPendingSounds(): void {
    if(this.pendingSounds.length === 0) {
    return;
}

console.log(`Playing ${this.pendingSounds.length} pending sounds`);

const soundsToPlay = [...this.pendingSounds];
this.pendingSounds = [];

soundsToPlay.forEach(({ soundId, options }) => {
    this.playSound(soundId, options);
});
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

    // Clear pending sounds
    this.pendingSounds = [];
}

/**
 * Check if Web Audio API is supported
 */
isSupported(): boolean {
    return this.state.isInitialized && !this.errorHandling.fallbackMode;
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
    } catch(error) {
        console.warn('Failed to save muted preference:', error);
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
     * Update gain node volume based on mute state and global volume
     */
    private updateGainNodeVolume(): void {
    if(!this.gainNode) return;

    try {
        const volume = this.state.isMuted ? 0 : this.globalVolume;
        this.gainNode.gain.setValueAtTime(volume, this.state.audioContext?.currentTime || 0);
    } catch(error) {
        console.warn('Error updating gain node volume:', error);
        this.handlePlaybackError('GAIN_NODE', error as Error, 'GAIN_NODE_ERROR');
    }
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
getAllCategoryVolumes(): Record < string, number > {
    return Object.fromEntries(this.categoryVolumes.entries());
}

/**
 * Get optimization report
 */
getOptimizationReport(): any {
    return this.optimizer.generateReport();
}

/**
 * Clean up all resources
 */
cleanup(): void {
    // Stop all sounds
    this.stopAllSounds();

    // Remove event listeners
    this.removeResumeListeners();

    // Clean up asset loader
    this.assetLoader.cleanup();

    // Close audio context
    if(this.state.audioContext) {
    try {
        if (this.state.audioContext.state !== 'closed') {
            this.state.audioContext.close();
        }
    } catch (error) {
        console.warn('Error closing audio context:', error);
    }
}

// Clear state
this.state = {
    isInitialized: false,
    isMuted: false,
    loadedSounds: new Set(),
    audioContext: null,
    soundBuffers: new Map()
};

this.gainNode = null;
this.activeSources.clear();
this.pendingSounds = [];
    }
}

/**
 * HTML5 Audio fallback manager for when Web Audio API is unavailable
 */
export class HTML5AudioManager implements AudioManager {
    private audioElements: Map<string, HTMLAudioElement> = new Map();
    private muted: boolean = false;
    private globalVolume: number = SOUND_CONFIG.globalVolume;
    private categoryVolumes: Map<string, number> = new Map();
    private assetLoader: AssetLoader;
    private loadingState: LoadingState;

    constructor() {
        // Initialize category volumes
        Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
            this.categoryVolumes.set(key, category.volume);
        });

        this.assetLoader = new AssetLoader({
            maxRetries: 2,
            retryDelay: 500,
            timeout: 5000,
            enableCompression: false,
            preferredFormats: ['mp3', 'ogg', 'wav']
        });

        this.loadingState = {
            isLoading: false,
            loadedCount: 0,
            totalCount: 0,
            failedSounds: [],
            errors: new Map()
        };

        this.muted = this.loadMutedPreference();
    }

    /**
     * Play sound using HTML5 Audio with error handling
     */
    playSound(soundId: string, options: PlaySoundOptions = {}): void {
        try {
            let audio = this.audioElements.get(soundId);

            if (!audio) {
                // Create audio element on-demand
                audio = this.createAudioElement(soundId);
                if (!audio) {
                    console.warn(`Failed to create audio element for ${soundId}`);
                    return;
                }
            }

            // Configure audio element
            this.configureAudioElement(audio, soundId, options);

            // Attempt to play
            const playPromise = audio.play();
            if (playPromise) {
                playPromise.catch(error => {
                    this.handleHTML5PlaybackError(soundId, error, audio!);
                });
            }

        } catch (error) {
            console.error(`HTML5 audio playback error for ${soundId}:`, error);
        }
    }

    /**
     * Create HTML5 audio element for a sound
     */
    private createAudioElement(soundId: string): HTMLAudioElement | null {
        const asset = SOUND_ASSETS[soundId];
        if (!asset) {
            console.warn(`Sound asset not found for ${soundId}`);
            return null;
        }

        try {
            const audio = new Audio();

            // Find supported source
            const supportedSource = this.findSupportedSource(asset.src);
            if (!supportedSource) {
                console.error(`No supported format found for ${soundId}`);
                return null;
            }

            audio.src = supportedSource;
            audio.preload = asset.preload ? 'auto' : 'none';

            // Set up error handling
            audio.addEventListener('error', (event) => {
                this.handleHTML5LoadError(soundId, audio.error, audio);
            });

            // Set up loading events
            audio.addEventListener('canplaythrough', () => {
                console.debug(`HTML5 audio loaded: ${soundId}`);
            });

            this.audioElements.set(soundId, audio);
            return audio;

        } catch (error) {
            console.error(`Failed to create HTML5 audio element for ${soundId}:`, error);
            return null;
        }
    }

    /**
     * Find the first supported audio source from the list
     */
    private findSupportedSource(sources: string[]): string | null {
        if (typeof Audio === 'undefined') {
            return null;
        }

        const audio = new Audio();

        for (const src of sources) {
            const format = src.split('.').pop()?.toLowerCase();
            if (format && this.supportsHTML5Format(format)) {
                return src;
            }
        }

        return null;
    }

    /**
     * Configure HTML5 audio element for playback
     */
    private configureAudioElement(
        audio: HTMLAudioElement,
        soundId: string,
        options: PlaySoundOptions
    ): void {
        const asset = SOUND_ASSETS[soundId];
        const category = this.getCategoryForSound(soundId);
        const categoryVolume = this.categoryVolumes.get(category) || 1.0;
        const assetVolume = asset?.volume || 1.0;
        const optionsVolume = options.volume || 1.0;

        const finalVolume = this.muted ? 0 : this.globalVolume * categoryVolume * assetVolume * optionsVolume;

        audio.volume = Math.max(0, Math.min(1, finalVolume));
        audio.loop = Boolean(options.loop);
        audio.currentTime = 0; // Reset to beginning
    }

    /**
     * Handle HTML5 audio playback errors
     */
    private handleHTML5PlaybackError(
        soundId: string,
        error: any,
        audio: HTMLAudioElement
    ): void {
        console.error(`HTML5 audio playback error for ${soundId}:`, error);

        // Handle specific error types
        if (error.name === 'NotAllowedError') {
            console.warn('Autoplay blocked, setting up user interaction handler');
            this.setupAutoplayRecovery(soundId, audio);
        } else if (error.name === 'NotSupportedError') {
            console.error(`Audio format not supported for ${soundId}`);
            this.loadingState.failedSounds.push(soundId);
        } else {
            // Generic error handling
            console.warn(`Retrying playback for ${soundId} after error`);
            setTimeout(() => {
                if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
                    audio.play().catch(retryError => {
                        console.error(`Retry failed for ${soundId}:`, retryError);
                    });
                }
            }, 100);
        }
    }

    /**
     * Handle HTML5 audio loading errors
     */
    private handleHTML5LoadError(
        soundId: string,
        error: MediaError | null,
        audio: HTMLAudioElement
    ): void {
        if (!error) return;

        const errorMessages = {
            1: 'MEDIA_ERR_ABORTED: Audio loading was aborted',
            2: 'MEDIA_ERR_NETWORK: Network error occurred while loading audio',
            3: 'MEDIA_ERR_DECODE: Audio decoding failed',
            4: 'MEDIA_ERR_SRC_NOT_SUPPORTED: Audio format not supported'
        };

        const message = errorMessages[error.code as keyof typeof errorMessages] || `Unknown error (code: ${error.code})`;
        console.error(`HTML5 audio load error for ${soundId}: ${message}`);

        this.loadingState.failedSounds.push(soundId);
        this.loadingState.errors.set(soundId, new Error(message));

        // Try alternative source if available
        this.tryAlternativeSource(soundId, audio);
    }

    /**
     * Try alternative audio source when primary source fails
     */
    private tryAlternativeSource(soundId: string, audio: HTMLAudioElement): void {
        const asset = SOUND_ASSETS[soundId];
        if (!asset || asset.src.length <= 1) {
            return;
        }

        const currentSrc = audio.src;
        const remainingSources = asset.src.filter(src => !currentSrc.includes(src));

        if (remainingSources.length > 0) {
            const nextSource = this.findSupportedSource(remainingSources);
            if (nextSource) {
                console.log(`Trying alternative source for ${soundId}: ${nextSource}`);
                audio.src = nextSource;
                audio.load();
            }
        }
    }

    /**
     * Set up autoplay recovery for blocked audio
     */
    private setupAutoplayRecovery(soundId: string, audio: HTMLAudioElement): void {
        const playOnInteraction = () => {
            audio.play().catch(error => {
                console.warn(`Autoplay recovery failed for ${soundId}:`, error);
            });

            // Remove listeners after successful play
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };

        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    }

    /**
     * Get the category for a sound ID
     */
    private getCategoryForSound(soundId: string): string {
        for (const [categoryName, category] of Object.entries(SOUND_CONFIG.categories)) {
            if (category.sounds[soundId]) {
                return categoryName;
            }
        }
        return 'default';
    }

    /**
     * Preload sounds using HTML5 Audio
     */
    async preloadSounds(): Promise<void> {
        const preloadAssets = Object.entries(SOUND_ASSETS).filter(([, asset]) => asset.preload);

        this.loadingState = {
            isLoading: true,
            loadedCount: 0,
            totalCount: preloadAssets.length,
            failedSounds: [],
            errors: new Map()
        };

        const loadPromises = preloadAssets.map(([soundId, asset]) => {
            return new Promise<void>((resolve) => {
                try {
                    const audio = this.createAudioElement(soundId);
                    if (!audio) {
                        this.loadingState.failedSounds.push(soundId);
                        resolve();
                        return;
                    }

                    const onLoad = () => {
                        this.loadingState.loadedCount++;
                        audio.removeEventListener('canplaythrough', onLoad);
                        audio.removeEventListener('error', onError);
                        resolve();
                    };

                    const onError = () => {
                        this.loadingState.failedSounds.push(soundId);
                        audio.removeEventListener('canplaythrough', onLoad);
                        audio.removeEventListener('error', onError);
                        resolve();
                    };

                    audio.addEventListener('canplaythrough', onLoad, { once: true });
                    audio.addEventListener('error', onError, { once: true });

                    // Start loading
                    audio.load();

                } catch (error) {
                    console.error(`Failed to preload HTML5 sound ${soundId}:`, error);
                    this.loadingState.failedSounds.push(soundId);
                    this.loadingState.errors.set(soundId, error as Error);
                    resolve();
                }
            });
        });

        await Promise.all(loadPromises);
        this.loadingState.isLoading = false;

        console.log(
            `HTML5 audio preloading complete: ${this.loadingState.loadedCount}/${this.loadingState.totalCount} loaded`
        );
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