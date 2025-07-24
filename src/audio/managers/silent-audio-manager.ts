import type { AudioManager } from '../../Interfaces/IAudioManager';
import type { PlaySoundOptions } from '../../Interfaces/ISoundEvent';
import type { LoadingState, LoadingProgress } from './asset-loader';

/**
 * Silent implementation of the AudioManager interface
 * Used as a fallback when audio is not supported or disabled
 */
export class SilentAudioManager implements AudioManager {
    private muted: boolean = false;
    private loadingState: LoadingState = { status: 'idle', progress: 0, total: 0, loaded: 0 };
    private progressCallbacks: Array<(progress: LoadingProgress) => void> = [];

    constructor() {
        console.info('Silent Audio Manager initialized - no audio will be played');
    }

    /**
     * No-op implementation of playSound
     */
    playSound(_soundId: string, _options?: PlaySoundOptions): void {
        // Intentionally empty - silent mode
    }

    /**
     * Simulates preloading sounds but returns immediately
     */
    async preloadSounds(): Promise<void> {
        // Update loading state to simulate normal flow
        this.loadingState = { status: 'loading', progress: 0, total: 1, loaded: 0 };
        this.notifyProgressCallbacks({ progress: 0, loaded: 0, total: 1 });

        // Simulate immediate completion
        this.loadingState = { status: 'complete', progress: 1, total: 1, loaded: 1 };
        this.notifyProgressCallbacks({ progress: 1, loaded: 1, total: 1 });

        return Promise.resolve();
    }

    /**
     * Set muted state (no actual effect in silent mode)
     */
    setMuted(muted: boolean): void {
        this.muted = muted;
    }

    /**
     * Get current muted state
     */
    isMuted(): boolean {
        return this.muted;
    }

    /**
     * Always returns false as this manager indicates no audio support
     */
    isSupported(): boolean {
        return false;
    }

    /**
     * No-op implementation of stopAllSounds
     */
    stopAllSounds(): void {
        // Intentionally empty - silent mode
    }

    /**
     * No-op implementation of cleanup
     */
    cleanup(): void {
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
     * Returns empty optimization report
     */
    getOptimizationReport(): any {
        return {
            optimized: 0,
            skipped: 0,
            totalSavings: 0,
            details: []
        };
    }

    /**
     * No-op implementation of setGlobalVolume
     */
    setGlobalVolume(_volume: number): void {
        // Intentionally empty - silent mode
    }

    /**
     * Always returns 0 as volume is not applicable in silent mode
     */
    getGlobalVolume(): number {
        return 0;
    }

    /**
     * No-op implementation of setCategoryVolume
     */
    setCategoryVolume(_category: string, _volume: number): void {
        // Intentionally empty - silent mode
    }

    /**
     * Always returns 0 as volume is not applicable in silent mode
     */
    getCategoryVolume(_category: string): number {
        return 0;
    }

    /**
     * Returns empty category volumes
     */
    getAllCategoryVolumes(): Record<string, number> {
        return {};
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