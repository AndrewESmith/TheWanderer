import type { SoundAsset } from '../../Interfaces/ISoundAsset';

export interface LoadingState {
    isLoading: boolean;
    loadedCount: number;
    totalCount: number;
    failedSounds: string[];
    errors: Map<string, Error>;
}

export interface LoadingProgress {
    soundId: string;
    progress: number; // 0-1
    status: 'pending' | 'loading' | 'loaded' | 'failed';
    error?: Error;
}

export interface AssetLoaderOptions {
    maxRetries: number;
    retryDelay: number;
    timeout: number;
    enableCompression: boolean;
    preferredFormats: string[];
}

/**
 * Enhanced asset loader with progress tracking, error recovery, and format optimization
 */
export class AssetLoader {
    private loadingState: LoadingState;
    private progressCallbacks: Set<(progress: LoadingProgress) => void> = new Set();
    private options: AssetLoaderOptions;

    constructor(options: Partial<AssetLoaderOptions> = {}) {
        this.loadingState = {
            isLoading: false,
            loadedCount: 0,
            totalCount: 0,
            failedSounds: [],
            errors: new Map()
        };

        this.options = {
            maxRetries: 3,
            retryDelay: 1000,
            timeout: 10000,
            enableCompression: true,
            preferredFormats: ['mp3', 'ogg', 'wav'],
            ...options
        };
    }

    /**
     * Get current loading state
     */
    getLoadingState(): LoadingState {
        return { ...this.loadingState };
    }

    /**
     * Subscribe to loading progress updates
     */
    onProgress(callback: (progress: LoadingProgress) => void): () => void {
        this.progressCallbacks.add(callback);
        return () => this.progressCallbacks.delete(callback);
    }

    /**
     * Emit progress update to all subscribers
     */
    private emitProgress(progress: LoadingProgress): void {
        this.progressCallbacks.forEach(callback => {
            try {
                callback(progress);
            } catch (error) {
                console.error('Error in progress callback:', error);
            }
        });
    }

    /**
     * Optimize source URLs based on browser capabilities and preferences
     */
    private optimizeSourceUrls(sources: string[]): string[] {
        const optimized = [...sources];

        // Sort by preferred formats
        optimized.sort((a, b) => {
            const aExt = this.getFileExtension(a);
            const bExt = this.getFileExtension(b);
            const aIndex = this.options.preferredFormats.indexOf(aExt);
            const bIndex = this.options.preferredFormats.indexOf(bExt);

            // Prefer formats that appear earlier in preferredFormats
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            }
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return 0;
        });

        return optimized;
    }

    /**
     * Get file extension from URL
     */
    private getFileExtension(url: string): string {
        const match = url.match(/\.([^.?]+)(?:\?|$)/);
        return match ? match[1]!.toLowerCase() : '';
    }

    /**
     * Check if browser supports a specific audio format
     */
    private supportsFormat(format: string): boolean {
        if (typeof Audio === 'undefined') {
            return true; // Assume support in test environment
        }
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

    /**
     * Filter sources to only include supported formats
     */
    private filterSupportedSources(sources: string[]): string[] {
        return sources.filter(src => {
            const ext = this.getFileExtension(src);
            return this.supportsFormat(ext);
        });
    }

    /**
     * Load a single audio file with retry logic and timeout
     */
    private async loadAudioFile(
        soundId: string,
        url: string,
        audioContext: AudioContext,
        attempt: number = 1
    ): Promise<AudioBuffer> {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
                reject(new Error(`Timeout loading ${url} after ${this.options.timeout}ms`));
            }, this.options.timeout);

            fetch(url, { signal: controller.signal })
                .then(response => {
                    clearTimeout(timeoutId);

                    if (!response || !response.ok) {
                        throw new Error(`HTTP ${response?.status || 'Unknown'}: ${response?.statusText || 'Network error'}`);
                    }

                    return response.arrayBuffer();
                })
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    this.emitProgress({
                        soundId,
                        progress: 1,
                        status: 'loaded'
                    });
                    resolve(audioBuffer);
                })
                .catch(async (error) => {
                    clearTimeout(timeoutId);

                    if (attempt < this.options.maxRetries) {
                        console.warn(`Retry ${attempt}/${this.options.maxRetries} for ${url}:`, error);

                        // Wait before retry
                        await new Promise(resolve => setTimeout(resolve, this.options.retryDelay));

                        try {
                            const result = await this.loadAudioFile(soundId, url, audioContext, attempt + 1);
                            resolve(result);
                        } catch (retryError) {
                            reject(retryError);
                        }
                    } else {
                        reject(error);
                    }
                });
        });
    }

    /**
     * Load audio buffer from multiple source URLs with fallback
     */
    async loadAudioBuffer(
        soundId: string,
        asset: SoundAsset,
        audioContext: AudioContext
    ): Promise<AudioBuffer | null> {
        this.emitProgress({
            soundId,
            progress: 0,
            status: 'loading'
        });

        // Optimize and filter sources
        let sources = this.optimizeSourceUrls(asset.src);
        sources = this.filterSupportedSources(sources);

        if (sources.length === 0) {
            const error = new Error(`No supported audio formats found for ${soundId}`);
            this.emitProgress({
                soundId,
                progress: 0,
                status: 'failed',
                error
            });
            throw error;
        }

        // Try each source URL until one succeeds
        for (let i = 0; i < sources.length; i++) {
            const url = sources[i]!;

            try {
                this.emitProgress({
                    soundId,
                    progress: i / sources.length,
                    status: 'loading'
                });

                const buffer = await this.loadAudioFile(soundId, url, audioContext);
                return buffer;
            } catch (error) {
                console.warn(`Failed to load ${soundId} from ${url}:`, error);

                // If this was the last source, record the error
                if (i === sources.length - 1) {
                    this.loadingState.errors.set(soundId, error as Error);
                    this.emitProgress({
                        soundId,
                        progress: 0,
                        status: 'failed',
                        error: error as Error
                    });
                    throw error;
                }
            }
        }

        return null;
    }

    /**
     * Load multiple audio assets with progress tracking
     */
    async loadAssets(
        assets: Record<string, SoundAsset>,
        audioContext: AudioContext
    ): Promise<Map<string, AudioBuffer>> {
        const preloadAssets = Object.entries(assets).filter(([, asset]) => asset.preload);

        this.loadingState = {
            isLoading: true,
            loadedCount: 0,
            totalCount: preloadAssets.length,
            failedSounds: [],
            errors: new Map()
        };

        const buffers = new Map<string, AudioBuffer>();
        const loadPromises = preloadAssets.map(async ([soundId, asset]) => {
            try {
                const buffer = await this.loadAudioBuffer(soundId, asset, audioContext);
                if (buffer) {
                    buffers.set(soundId, buffer);
                    this.loadingState.loadedCount++;
                }
            } catch (error) {
                this.loadingState.failedSounds.push(soundId);
                this.loadingState.errors.set(soundId, error as Error);
                console.error(`Failed to load sound ${soundId}:`, error);
                // Don't re-throw the error - just log it and continue
            }
        });

        // Wait for all promises to settle (not fail fast)
        await Promise.allSettled(loadPromises);

        this.loadingState.isLoading = false;

        console.log(
            `Asset loading complete: ${this.loadingState.loadedCount}/${this.loadingState.totalCount} loaded, ` +
            `${this.loadingState.failedSounds.length} failed`
        );

        return buffers;
    }

    /**
     * Validate audio file integrity and format
     */
    async validateAudioFile(url: string): Promise<{
        isValid: boolean;
        format: string;
        duration: number;
        sampleRate: number;
        channels: number;
        size: number;
    }> {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('content-type') || '';
            const contentLength = parseInt(response.headers.get('content-length') || '0');

            // For full validation, we'd need to load and decode the file
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const fullResponse = await fetch(url);
            const arrayBuffer = await fullResponse.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            return {
                isValid: true,
                format: this.getFileExtension(url),
                duration: audioBuffer.duration,
                sampleRate: audioBuffer.sampleRate,
                channels: audioBuffer.numberOfChannels,
                size: contentLength
            };
        } catch (error) {
            return {
                isValid: false,
                format: this.getFileExtension(url),
                duration: 0,
                sampleRate: 0,
                channels: 0,
                size: 0
            };
        }
    }

    /**
     * Get loading statistics
     */
    getLoadingStats(): {
        successRate: number;
        totalSize: number;
        averageLoadTime: number;
        formatDistribution: Record<string, number>;
    } {
        const total = this.loadingState.totalCount;
        const loaded = this.loadingState.loadedCount;

        return {
            successRate: total > 0 ? loaded / total : 0,
            totalSize: 0, // Would need to track during loading
            averageLoadTime: 0, // Would need to track during loading
            formatDistribution: {} // Would need to track during loading
        };
    }

    /**
     * Clear all loading state and callbacks
     */
    cleanup(): void {
        this.progressCallbacks.clear();
        this.loadingState = {
            isLoading: false,
            loadedCount: 0,
            totalCount: 0,
            failedSounds: [],
            errors: new Map()
        };
    }
}