/**
 * Comprehensive error handling utilities for the audio system
 * Provides graceful degradation, error recovery, and fallback strategies
 */

export interface AudioError {
    type: AudioErrorType;
    code: string;
    message: string;
    soundId?: string;
    timestamp: number;
    context?: Record<string, any>;
    recoverable: boolean;
}

export type AudioErrorType =
    | 'CONTEXT_CREATION_FAILED'
    | 'CONTEXT_SUSPENDED'
    | 'CONTEXT_INTERRUPTED'
    | 'CONTEXT_CLOSED'
    | 'BUFFER_LOAD_FAILED'
    | 'BUFFER_DECODE_FAILED'
    | 'BUFFER_INVALID'
    | 'PLAYBACK_FAILED'
    | 'AUTOPLAY_BLOCKED'
    | 'FORMAT_UNSUPPORTED'
    | 'NETWORK_ERROR'
    | 'PERMISSION_DENIED'
    | 'RESOURCE_EXHAUSTED'
    | 'BROWSER_INCOMPATIBLE'
    | 'UNKNOWN_ERROR';

export interface ErrorRecoveryStrategy {
    type: AudioErrorType;
    handler: (error: AudioError) => Promise<boolean>;
    maxRetries: number;
    retryDelay: number;
}

export interface FallbackChain {
    primary: 'WebAudio';
    fallbacks: Array<'HTML5Audio' | 'Silent'>;
    currentLevel: number;
}

/**
 * Central error handling and recovery system for audio
 */
export class AudioErrorHandler {
    private errorHistory: AudioError[] = [];
    private recoveryStrategies: Map<AudioErrorType, ErrorRecoveryStrategy> = new Map();
    private fallbackChain: FallbackChain;
    private maxErrorHistory = 100;
    private errorListeners: Set<(error: AudioError) => void> = new Set();

    constructor() {
        this.fallbackChain = {
            primary: 'WebAudio',
            fallbacks: ['HTML5Audio', 'Silent'],
            currentLevel: 0
        };

        this.initializeRecoveryStrategies();
    }

    /**
     * Initialize error recovery strategies
     */
    private initializeRecoveryStrategies(): void {
        // Context creation failure recovery
        this.recoveryStrategies.set('CONTEXT_CREATION_FAILED', {
            type: 'CONTEXT_CREATION_FAILED',
            handler: this.handleContextCreationFailure.bind(this),
            maxRetries: 3,
            retryDelay: 1000
        });

        // Context suspension recovery
        this.recoveryStrategies.set('CONTEXT_SUSPENDED', {
            type: 'CONTEXT_SUSPENDED',
            handler: this.handleContextSuspension.bind(this),
            maxRetries: 1,
            retryDelay: 0
        });

        // Buffer loading failure recovery
        this.recoveryStrategies.set('BUFFER_LOAD_FAILED', {
            type: 'BUFFER_LOAD_FAILED',
            handler: this.handleBufferLoadFailure.bind(this),
            maxRetries: 3,
            retryDelay: 1000
        });

        // Autoplay blocked recovery
        this.recoveryStrategies.set('AUTOPLAY_BLOCKED', {
            type: 'AUTOPLAY_BLOCKED',
            handler: this.handleAutoplayBlocked.bind(this),
            maxRetries: 1,
            retryDelay: 0
        });

        // Format unsupported recovery
        this.recoveryStrategies.set('FORMAT_UNSUPPORTED', {
            type: 'FORMAT_UNSUPPORTED',
            handler: this.handleFormatUnsupported.bind(this),
            maxRetries: 1,
            retryDelay: 0
        });

        // Network error recovery
        this.recoveryStrategies.set('NETWORK_ERROR', {
            type: 'NETWORK_ERROR',
            handler: this.handleNetworkError.bind(this),
            maxRetries: 5,
            retryDelay: 2000
        });
    }

    /**
     * Handle an audio error with appropriate recovery strategy
     */
    async handleError(error: AudioError): Promise<boolean> {
        // Add to error history
        this.addToErrorHistory(error);

        // Notify listeners
        this.notifyErrorListeners(error);

        // Log error
        this.logError(error);

        // Attempt recovery if error is recoverable
        if (error.recoverable) {
            const strategy = this.recoveryStrategies.get(error.type);
            if (strategy) {
                return await this.executeRecoveryStrategy(strategy, error);
            }
        }

        // If not recoverable or no strategy available, initiate fallback
        return this.initiateFallback(error);
    }

    /**
     * Execute a recovery strategy with retry logic
     */
    private async executeRecoveryStrategy(
        strategy: ErrorRecoveryStrategy,
        error: AudioError
    ): Promise<boolean> {
        for (let attempt = 1; attempt <= strategy.maxRetries; attempt++) {
            try {
                console.log(`Attempting recovery for ${error.type} (attempt ${attempt}/${strategy.maxRetries})`);

                const success = await strategy.handler(error);
                if (success) {
                    console.log(`Recovery successful for ${error.type}`);
                    return true;
                }

                // Wait before retry
                if (attempt < strategy.maxRetries && strategy.retryDelay > 0) {
                    await this.delay(strategy.retryDelay);
                }

            } catch (recoveryError) {
                console.warn(`Recovery attempt ${attempt} failed for ${error.type}:`, recoveryError);
            }
        }

        console.error(`All recovery attempts failed for ${error.type}`);
        return false;
    }

    /**
     * Handle audio context creation failure
     */
    private async handleContextCreationFailure(_error: AudioError): Promise<boolean> {
        // Try different AudioContext constructors
        const constructors = [
            () => new AudioContext(),
            () => new (window as any).webkitAudioContext(),
            () => new AudioContext({ sampleRate: 44100 }),
            () => new AudioContext({ sampleRate: 22050 })
        ];

        for (const constructor of constructors) {
            try {
                const context = constructor();
                if (context && context.state !== 'closed') {
                    console.log('Successfully created AudioContext with alternative constructor');
                    return true;
                }
            } catch (constructorError) {
                console.debug('AudioContext constructor failed:', constructorError);
            }
        }

        return false;
    }

    /**
     * Handle audio context suspension
     */
    private async handleContextSuspension(_error: AudioError): Promise<boolean> {
        // Set up user interaction handlers to resume context
        return new Promise((resolve) => {
            const resumeHandlers = {
                click: () => this.attemptContextResume(resolve),
                keydown: () => this.attemptContextResume(resolve),
                touchstart: () => this.attemptContextResume(resolve),
                pointerdown: () => this.attemptContextResume(resolve)
            };

            // Add event listeners
            Object.entries(resumeHandlers).forEach(([event, handler]) => {
                document.addEventListener(event, handler, { once: true, passive: true });
            });

            // Set timeout to avoid hanging forever
            setTimeout(() => {
                Object.entries(resumeHandlers).forEach(([event, handler]) => {
                    document.removeEventListener(event, handler);
                });
                resolve(false);
            }, 30000); // 30 second timeout
        });
    }

    /**
     * Attempt to resume audio context
     */
    private attemptContextResume(resolve: (success: boolean) => void): void {
        // This would need access to the actual audio context
        // In practice, this would be called by the audio manager
        console.log('User interaction detected, attempting to resume audio context');
        resolve(true);
    }

    /**
     * Handle buffer loading failure
     */
    private async handleBufferLoadFailure(error: AudioError): Promise<boolean> {
        if (!error.soundId) {
            return false;
        }

        // Try alternative sources or formats
        const soundId = error.soundId;
        console.log(`Attempting to reload buffer for ${soundId} with alternative sources`);

        // This would need to be implemented by the audio manager
        // For now, we'll just indicate that retry is possible
        return true;
    }

    /**
     * Handle autoplay blocked error
     */
    private async handleAutoplayBlocked(error: AudioError): Promise<boolean> {
        console.log('Autoplay blocked, setting up user interaction recovery');

        // Create user notification
        this.createAutoplayNotification();

        // Set up interaction handlers
        return this.handleContextSuspension(error);
    }

    /**
     * Handle unsupported format error
     */
    private async handleFormatUnsupported(error: AudioError): Promise<boolean> {
        if (!error.soundId) {
            return false;
        }

        console.log(`Format unsupported for ${error.soundId}, trying alternative formats`);

        // This would be handled by trying different source URLs
        // The audio manager would need to implement this
        return false; // Indicate fallback needed
    }

    /**
     * Handle network error
     */
    private async handleNetworkError(_error: AudioError): Promise<boolean> {
        console.log('Network error detected, checking connectivity and retrying');

        // Check if we're online
        if (!navigator.onLine) {
            console.log('Device is offline, waiting for connectivity');
            return this.waitForConnectivity();
        }

        // Try with exponential backoff
        await this.delay(Math.random() * 1000); // Add jitter
        return true; // Indicate retry should be attempted
    }

    /**
     * Wait for network connectivity to be restored
     */
    private waitForConnectivity(): Promise<boolean> {
        return new Promise((resolve) => {
            const onOnline = () => {
                window.removeEventListener('online', onOnline);
                resolve(true);
            };

            window.addEventListener('online', onOnline);

            // Timeout after 30 seconds
            setTimeout(() => {
                window.removeEventListener('online', onOnline);
                resolve(false);
            }, 30000);
        });
    }

    /**
     * Initiate fallback to next level in the chain
     */
    private initiateFallback(error: AudioError): boolean {
        if (this.fallbackChain.currentLevel >= this.fallbackChain.fallbacks.length) {
            console.error('All fallback options exhausted, audio system will be disabled');
            return false;
        }

        const nextFallback = this.fallbackChain.fallbacks[this.fallbackChain.currentLevel];
        this.fallbackChain.currentLevel++;

        console.warn(`Initiating fallback to ${nextFallback} due to ${error.type}`);

        // Emit fallback event
        const fallbackEvent = new CustomEvent('audioFallback', {
            detail: {
                from: this.getCurrentAudioSystem(),
                to: nextFallback,
                reason: error.type,
                error: error.message
            }
        });
        window.dispatchEvent(fallbackEvent);

        return true;
    }

    /**
     * Get current audio system name
     */
    private getCurrentAudioSystem(): string {
        if (this.fallbackChain.currentLevel === 0) {
            return this.fallbackChain.primary;
        }
        return this.fallbackChain.fallbacks[this.fallbackChain.currentLevel - 1] || 'Unknown';
    }

    /**
     * Create user notification for autoplay issues
     */
    private createAutoplayNotification(): void {
        // Create a simple notification that can be styled by the application
        const notification = document.createElement('div');
        notification.id = 'audio-autoplay-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 16px;
            border-radius: 4px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        notification.textContent = 'Click to enable audio';

        const removeNotification = () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        };

        notification.addEventListener('click', removeNotification);
        document.body.appendChild(notification);

        // Auto-remove after 10 seconds
        setTimeout(removeNotification, 10000);
    }

    /**
     * Add error to history with size limit
     */
    private addToErrorHistory(error: AudioError): void {
        this.errorHistory.push(error);

        // Maintain size limit
        if (this.errorHistory.length > this.maxErrorHistory) {
            this.errorHistory.shift();
        }
    }

    /**
     * Log error with appropriate level
     */
    private logError(error: AudioError): void {
        const logMessage = `Audio Error [${error.type}]: ${error.message}`;
        const logContext = {
            soundId: error.soundId,
            timestamp: error.timestamp,
            context: error.context,
            recoverable: error.recoverable
        };

        if (error.recoverable) {
            console.warn(logMessage, logContext);
        } else {
            console.error(logMessage, logContext);
        }
    }

    /**
     * Notify error listeners
     */
    private notifyErrorListeners(error: AudioError): void {
        this.errorListeners.forEach(listener => {
            try {
                listener(error);
            } catch (listenerError) {
                console.error('Error in audio error listener:', listenerError);
            }
        });
    }

    /**
     * Add error listener
     */
    addErrorListener(listener: (error: AudioError) => void): () => void {
        this.errorListeners.add(listener);
        return () => this.errorListeners.delete(listener);
    }

    /**
     * Get error statistics
     */
    getErrorStatistics(): {
        totalErrors: number;
        errorsByType: Record<AudioErrorType, number>;
        recoverableErrors: number;
        recentErrors: AudioError[];
        currentFallbackLevel: number;
    } {
        const errorsByType = this.errorHistory.reduce((acc, error) => {
            acc[error.type] = (acc[error.type] || 0) + 1;
            return acc;
        }, {} as Record<AudioErrorType, number>);

        const recoverableErrors = this.errorHistory.filter(e => e.recoverable).length;
        const recentErrors = this.errorHistory.slice(-10); // Last 10 errors

        return {
            totalErrors: this.errorHistory.length,
            errorsByType,
            recoverableErrors,
            recentErrors,
            currentFallbackLevel: this.fallbackChain.currentLevel
        };
    }

    /**
     * Clear error history
     */
    clearErrorHistory(): void {
        this.errorHistory = [];
    }

    /**
     * Check if system is in degraded state
     */
    isInDegradedState(): boolean {
        return this.fallbackChain.currentLevel > 0;
    }

    /**
     * Get current fallback level
     */
    getCurrentFallbackLevel(): string {
        if (this.fallbackChain.currentLevel === 0) {
            return this.fallbackChain.primary;
        }
        return this.fallbackChain.fallbacks[this.fallbackChain.currentLevel - 1] || 'Unknown';
    }

    /**
     * Utility function to create delay
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Create an AudioError object
     */
    static createError(
        type: AudioErrorType,
        message: string,
        options: {
            soundId?: string;
            context?: Record<string, any>;
            recoverable?: boolean;
            code?: string;
        } = {}
    ): AudioError {
        return {
            type,
            code: options.code || type,
            message,
            soundId: options.soundId,
            timestamp: Date.now(),
            context: options.context,
            recoverable: options.recoverable ?? true
        };
    }
}

/**
 * Browser compatibility detection utilities
 */
export class BrowserCompatibility {
    /**
     * Check Web Audio API support
     */
    static hasWebAudioSupport(): boolean {
        return !!(window.AudioContext || (window as any).webkitAudioContext);
    }

    /**
     * Check HTML5 Audio support
     */
    static hasHTML5AudioSupport(): boolean {
        return typeof Audio !== 'undefined';
    }

    /**
     * Check specific audio format support
     */
    static supportsAudioFormat(format: string): boolean {
        if (!this.hasHTML5AudioSupport()) {
            return false;
        }

        const audio = new Audio();
        const mimeTypes: Record<string, string> = {
            mp3: 'audio/mpeg',
            ogg: 'audio/ogg',
            wav: 'audio/wav',
            m4a: 'audio/mp4',
            aac: 'audio/aac'
        };

        const mimeType = mimeTypes[format.toLowerCase()];
        if (!mimeType) {
            return false;
        }

        const canPlay = audio.canPlayType(mimeType);
        return canPlay === 'probably' || canPlay === 'maybe';
    }

    /**
     * Get supported audio formats
     */
    static getSupportedFormats(): string[] {
        const formats = ['mp3', 'ogg', 'wav', 'm4a', 'aac'];
        return formats.filter(format => this.supportsAudioFormat(format));
    }

    /**
     * Detect browser type
     */
    static getBrowserInfo(): {
        name: string;
        version: string;
        isMobile: boolean;
        isIOS: boolean;
        isAndroid: boolean;
        isSafari: boolean;
        isChrome: boolean;
        isFirefox: boolean;
    } {
        const ua = navigator.userAgent;

        return {
            name: this.getBrowserName(ua),
            version: this.getBrowserVersion(ua),
            isMobile: /Mobile|Android|iPhone|iPad/.test(ua),
            isIOS: /iPhone|iPad|iPod/.test(ua),
            isAndroid: /Android/.test(ua),
            isSafari: /Safari/.test(ua) && !/Chrome/.test(ua),
            isChrome: /Chrome/.test(ua) && !/Edge/.test(ua),
            isFirefox: /Firefox/.test(ua)
        };
    }

    private static getBrowserName(ua: string): string {
        if (ua.includes('Chrome') && !ua.includes('Edge')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        if (ua.includes('Opera')) return 'Opera';
        return 'Unknown';
    }

    private static getBrowserVersion(ua: string): string {
        const match = ua.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/);
        return match ? match[2] || 'Unknown' : 'Unknown';
    }

    /**
     * Check for known audio issues in specific browsers
     */
    static hasKnownAudioIssues(): {
        hasIssues: boolean;
        issues: string[];
        recommendations: string[];
    } {
        const browser = this.getBrowserInfo();
        const issues: string[] = [];
        const recommendations: string[] = [];

        // iOS Safari issues
        if (browser.isIOS && browser.isSafari) {
            issues.push('iOS Safari requires user interaction for audio playback');
            issues.push('iOS Safari may suspend audio context during app backgrounding');
            recommendations.push('Implement robust user interaction detection');
            recommendations.push('Handle audio context interruption events');
        }

        // Chrome autoplay policy
        if (browser.isChrome) {
            issues.push('Chrome has strict autoplay policies');
            recommendations.push('Ensure user interaction before playing audio');
        }

        // Firefox Web Audio API quirks
        if (browser.isFirefox) {
            issues.push('Firefox may have different Web Audio API behavior');
            recommendations.push('Test audio functionality thoroughly in Firefox');
        }

        // Mobile browser issues
        if (browser.isMobile) {
            issues.push('Mobile browsers may have limited concurrent audio streams');
            issues.push('Mobile browsers may pause audio when switching apps');
            recommendations.push('Implement audio pooling and cleanup');
            recommendations.push('Handle visibility change events');
        }

        return {
            hasIssues: issues.length > 0,
            issues,
            recommendations
        };
    }
}

/**
 * Global error handler instance
 */
export const audioErrorHandler = new AudioErrorHandler();