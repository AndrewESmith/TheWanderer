/**
 * Audio optimization utilities for web delivery
 */

export interface AudioOptimizationOptions {
    targetSampleRate: number;
    targetBitRate: number;
    enableNormalization: boolean;
    enableCompression: boolean;
    maxFileSize: number; // in bytes
}

export interface AudioMetrics {
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
    sampleRate: number;
    bitRate: number;
    duration: number;
    channels: number;
}

/**
 * Audio format detection and validation utilities
 */
export class AudioFormatUtils {
    private static readonly SUPPORTED_FORMATS = ['mp3', 'ogg', 'wav', 'm4a', 'aac'];

    private static readonly MIME_TYPES: Record<string, string> = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        m4a: 'audio/mp4',
        aac: 'audio/aac'
    };

    /**
     * Check if a format is supported by the current browser
     */
    static isFormatSupported(format: string): boolean {
        const audio = new Audio();
        const mimeType = this.MIME_TYPES[format.toLowerCase()];

        if (!mimeType) return false;

        const canPlay = audio.canPlayType(mimeType);
        return canPlay === 'probably' || canPlay === 'maybe';
    }

    /**
     * Get the best supported format from a list of options
     */
    static getBestSupportedFormat(formats: string[]): string | null {
        // Priority order: mp3 (universal) > ogg (open source) > others
        const priorityOrder = ['mp3', 'ogg', 'wav', 'm4a', 'aac'];

        for (const format of priorityOrder) {
            if (formats.includes(format) && this.isFormatSupported(format)) {
                return format;
            }
        }

        return null;
    }

    /**
     * Extract format from file URL
     */
    static getFormatFromUrl(url: string): string {
        const match = url.match(/\.([^.?]+)(?:\?|$)/);
        return match ? match[1]!.toLowerCase() : '';
    }

    /**
     * Validate audio file header to ensure it's a valid audio file
     */
    static async validateAudioHeader(arrayBuffer: ArrayBuffer): Promise<{
        isValid: boolean;
        format: string;
        error?: string;
    }> {
        const view = new DataView(arrayBuffer);

        try {
            // Check MP3 header
            if (this.isMp3Header(view)) {
                return { isValid: true, format: 'mp3' };
            }

            // Check OGG header
            if (this.isOggHeader(view)) {
                return { isValid: true, format: 'ogg' };
            }

            // Check WAV header
            if (this.isWavHeader(view)) {
                return { isValid: true, format: 'wav' };
            }

            return {
                isValid: false,
                format: 'unknown',
                error: 'Unrecognized audio format'
            };
        } catch (error) {
            return {
                isValid: false,
                format: 'unknown',
                error: `Header validation error: ${error}`
            };
        }
    }

    private static isMp3Header(view: DataView): boolean {
        // Check for ID3 tag or MP3 frame sync
        const firstBytes = view.getUint32(0);

        // ID3v2 header starts with "ID3"
        if ((firstBytes & 0xFFFFFF00) === 0x49443300) {
            return true;
        }

        // MP3 frame sync (11 bits set) - use unsigned comparison
        if ((firstBytes >>> 0) === 0xFFE00000) {
            return true;
        }

        return false;
    }

    private static isOggHeader(view: DataView): boolean {
        // OGG files start with "OggS"
        const header = view.getUint32(0);
        return header === 0x4F676753; // "OggS" in big-endian
    }

    private static isWavHeader(view: DataView): boolean {
        // WAV files start with "RIFF" and contain "WAVE"
        const riff = view.getUint32(0);
        const wave = view.getUint32(8);
        return riff === 0x52494646 && wave === 0x57415645; // "RIFF" and "WAVE"
    }
}

/**
 * Audio compression and optimization utilities
 */
export class AudioOptimizer {
    private options: AudioOptimizationOptions;

    constructor(options: Partial<AudioOptimizationOptions> = {}) {
        this.options = {
            targetSampleRate: 22050, // Good for game sounds
            targetBitRate: 128, // kbps
            enableNormalization: true,
            enableCompression: true,
            maxFileSize: 100 * 1024, // 100KB
            ...options
        };
    }

    /**
     * Analyze audio buffer and provide optimization recommendations
     */
    analyzeAudioBuffer(buffer: AudioBuffer): {
        currentMetrics: AudioMetrics;
        recommendations: string[];
        estimatedOptimizedSize: number;
    } {
        const currentMetrics: AudioMetrics = {
            originalSize: this.estimateBufferSize(buffer),
            optimizedSize: 0,
            compressionRatio: 1,
            sampleRate: buffer.sampleRate,
            bitRate: this.estimateBitRate(buffer),
            duration: buffer.duration,
            channels: buffer.numberOfChannels
        };

        const recommendations: string[] = [];

        // Sample rate recommendations
        if (buffer.sampleRate > this.options.targetSampleRate) {
            recommendations.push(
                `Consider reducing sample rate from ${buffer.sampleRate}Hz to ${this.options.targetSampleRate}Hz for better performance`
            );
        }

        // Channel recommendations
        if (buffer.numberOfChannels > 1) {
            recommendations.push('Convert to mono for game sound effects to reduce file size');
        }

        // Duration recommendations
        if (buffer.duration > 5) {
            recommendations.push('Consider shortening audio clips longer than 5 seconds');
        }

        // File size recommendations
        const estimatedSize = this.estimateOptimizedSize(buffer);
        if (currentMetrics.originalSize > this.options.maxFileSize) {
            recommendations.push(
                `File size (${Math.round(currentMetrics.originalSize / 1024)}KB) exceeds recommended maximum (${Math.round(this.options.maxFileSize / 1024)}KB)`
            );
        }

        return {
            currentMetrics,
            recommendations,
            estimatedOptimizedSize: estimatedSize
        };
    }

    /**
     * Estimate the size of an AudioBuffer in bytes
     */
    private estimateBufferSize(buffer: AudioBuffer): number {
        // Rough estimation: samples * channels * bytes per sample
        const samplesPerChannel = buffer.length;
        const channels = buffer.numberOfChannels;
        const bytesPerSample = 4; // 32-bit float

        return samplesPerChannel * channels * bytesPerSample;
    }

    /**
     * Estimate bit rate from audio buffer
     */
    private estimateBitRate(buffer: AudioBuffer): number {
        const sizeInBits = this.estimateBufferSize(buffer) * 8;
        const durationInSeconds = buffer.duration;

        return Math.round(sizeInBits / durationInSeconds / 1000); // kbps
    }

    /**
     * Estimate optimized file size based on target settings
     */
    private estimateOptimizedSize(buffer: AudioBuffer): number {
        const targetSampleRate = Math.min(buffer.sampleRate, this.options.targetSampleRate);
        const targetChannels = Math.min(buffer.numberOfChannels, 1); // Mono
        const compressionFactor = 0.1; // Typical MP3 compression

        const optimizedSamples = (buffer.length * targetSampleRate) / buffer.sampleRate;
        const rawSize = optimizedSamples * targetChannels * 4; // 32-bit float

        return Math.round(rawSize * compressionFactor);
    }

    /**
     * Normalize audio buffer to prevent clipping and optimize volume
     */
    normalizeAudioBuffer(buffer: AudioBuffer): AudioBuffer {
        if (!this.options.enableNormalization) {
            return buffer;
        }

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const normalizedBuffer = audioContext.createBuffer(
            buffer.numberOfChannels,
            buffer.length,
            buffer.sampleRate
        );

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const inputData = buffer.getChannelData(channel);
            const outputData = normalizedBuffer.getChannelData(channel);

            // Find peak amplitude
            let peak = 0;
            for (let i = 0; i < inputData.length; i++) {
                peak = Math.max(peak, Math.abs(inputData[i]!));
            }

            // Normalize to 0.95 to prevent clipping
            const normalizationFactor = peak > 0 ? 0.95 / peak : 1;

            for (let i = 0; i < inputData.length; i++) {
                outputData[i] = inputData[i]! * normalizationFactor;
            }
        }

        return normalizedBuffer;
    }

    /**
     * Apply fade in/out to prevent audio pops
     */
    applyFadeInOut(buffer: AudioBuffer, fadeInMs: number = 10, fadeOutMs: number = 10): AudioBuffer {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const fadedBuffer = audioContext.createBuffer(
            buffer.numberOfChannels,
            buffer.length,
            buffer.sampleRate
        );

        const fadeInSamples = Math.floor((fadeInMs / 1000) * buffer.sampleRate);
        const fadeOutSamples = Math.floor((fadeOutMs / 1000) * buffer.sampleRate);

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const inputData = buffer.getChannelData(channel);
            const outputData = fadedBuffer.getChannelData(channel);

            for (let i = 0; i < inputData.length; i++) {
                let sample = inputData[i]!;

                // Apply fade in
                if (i < fadeInSamples) {
                    sample *= i / fadeInSamples;
                }

                // Apply fade out
                if (i >= inputData.length - fadeOutSamples) {
                    const fadeOutProgress = (inputData.length - i) / fadeOutSamples;
                    sample *= fadeOutProgress;
                }

                outputData[i] = sample;
            }
        }

        return fadedBuffer;
    }

    /**
     * Get optimization recommendations for a set of audio files
     */
    getOptimizationReport(audioFiles: { name: string; buffer: AudioBuffer }[]): {
        totalOriginalSize: number;
        totalOptimizedSize: number;
        overallCompressionRatio: number;
        fileReports: Array<{
            name: string;
            analysis: ReturnType<AudioOptimizer['analyzeAudioBuffer']>;
        }>;
        globalRecommendations: string[];
    } {
        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;
        const fileReports = audioFiles.map(file => {
            const analysis = this.analyzeAudioBuffer(file.buffer);
            totalOriginalSize += analysis.currentMetrics.originalSize;
            totalOptimizedSize += analysis.estimatedOptimizedSize;

            return {
                name: file.name,
                analysis
            };
        });

        const overallCompressionRatio = totalOriginalSize > 0 ? totalOptimizedSize / totalOriginalSize : 1;

        const globalRecommendations: string[] = [];

        if (totalOriginalSize > 500 * 1024) { // 500KB
            globalRecommendations.push('Consider lazy loading for non-critical sounds');
        }

        if (overallCompressionRatio > 0.3) {
            globalRecommendations.push('Audio files could benefit from better compression');
        }

        const avgDuration = audioFiles.reduce((sum, file) => sum + file.buffer.duration, 0) / audioFiles.length;
        if (avgDuration > 3) {
            globalRecommendations.push('Consider shorter audio clips for better performance');
        }

        return {
            totalOriginalSize,
            totalOptimizedSize,
            overallCompressionRatio,
            fileReports,
            globalRecommendations
        };
    }
}

/**
 * Utility functions for audio file management
 */
export const AudioUtils = {
    /**
     * Convert file size to human readable format
     */
    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B';

        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    },

    /**
     * Format duration in seconds to human readable format
     */
    formatDuration(seconds: number): string {
        if (seconds < 60) {
            return `${seconds.toFixed(1)}s`;
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds.toFixed(1)}s`;
    },

    /**
     * Calculate compression ratio as percentage
     */
    formatCompressionRatio(ratio: number): string {
        const percentage = (1 - ratio) * 100;
        return `${percentage.toFixed(1)}%`;
    }
};