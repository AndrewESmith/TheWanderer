import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AudioFormatUtils, AudioOptimizer, AudioUtils } from '../../audio/utils/audio-optimization';

// Mock Web Audio API
const mockAudioContext = {
    createBuffer: vi.fn(),
    decodeAudioData: vi.fn()
};

const mockAudioBuffer = {
    duration: 2.5,
    sampleRate: 44100,
    numberOfChannels: 2,
    length: 110250,
    getChannelData: vi.fn(() => new Float32Array(110250))
};

// Mock Audio constructor
global.Audio = vi.fn(() => ({
    canPlayType: vi.fn((type: string) => {
        if (type === 'audio/mpeg') return 'probably';
        if (type === 'audio/ogg') return 'maybe';
        if (type === 'audio/wav') return 'probably';
        return '';
    })
})) as any;

// Mock AudioContext
(global as any).AudioContext = vi.fn(() => mockAudioContext);
(global as any).webkitAudioContext = vi.fn(() => mockAudioContext);

// Mock fetch for header validation
global.fetch = vi.fn();

describe('AudioFormatUtils', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('isFormatSupported', () => {
        it('should return true for supported formats', () => {
            expect(AudioFormatUtils.isFormatSupported('mp3')).toBe(true);
            expect(AudioFormatUtils.isFormatSupported('ogg')).toBe(true);
            expect(AudioFormatUtils.isFormatSupported('wav')).toBe(true);
        });

        it('should return false for unsupported formats', () => {
            expect(AudioFormatUtils.isFormatSupported('flac')).toBe(false);
            expect(AudioFormatUtils.isFormatSupported('unknown')).toBe(false);
        });

        it('should be case insensitive', () => {
            expect(AudioFormatUtils.isFormatSupported('MP3')).toBe(true);
            expect(AudioFormatUtils.isFormatSupported('OGG')).toBe(true);
        });
    });

    describe('getBestSupportedFormat', () => {
        it('should return mp3 as preferred format', () => {
            const formats = ['ogg', 'mp3', 'wav'];
            expect(AudioFormatUtils.getBestSupportedFormat(formats)).toBe('mp3');
        });

        it('should return ogg if mp3 not available', () => {
            const formats = ['ogg', 'wav'];
            expect(AudioFormatUtils.getBestSupportedFormat(formats)).toBe('ogg');
        });

        it('should return null if no formats supported', () => {
            const formats = ['flac', 'unknown'];
            expect(AudioFormatUtils.getBestSupportedFormat(formats)).toBe(null);
        });
    });

    describe('getFormatFromUrl', () => {
        it('should extract format from URL', () => {
            expect(AudioFormatUtils.getFormatFromUrl('sounds/test.mp3')).toBe('mp3');
            expect(AudioFormatUtils.getFormatFromUrl('sounds/test.ogg')).toBe('ogg');
            expect(AudioFormatUtils.getFormatFromUrl('sounds/test.wav')).toBe('wav');
        });

        it('should handle URLs with query parameters', () => {
            expect(AudioFormatUtils.getFormatFromUrl('sounds/test.mp3?v=1')).toBe('mp3');
        });

        it('should return empty string for URLs without extension', () => {
            expect(AudioFormatUtils.getFormatFromUrl('sounds/test')).toBe('');
        });
    });

    describe('validateAudioHeader', () => {
        it('should validate MP3 header with ID3 tag', async () => {
            const buffer = new ArrayBuffer(16);
            const view = new DataView(buffer);
            view.setUint32(0, 0x49443300); // "ID3" + version

            const result = await AudioFormatUtils.validateAudioHeader(buffer);
            expect(result.isValid).toBe(true);
            expect(result.format).toBe('mp3');
        });

        it('should validate MP3 header with frame sync', async () => {
            const buffer = new ArrayBuffer(16);
            const view = new DataView(buffer);
            view.setUint32(0, 0xFFE00000); // MP3 frame sync

            const result = await AudioFormatUtils.validateAudioHeader(buffer);
            expect(result.isValid).toBe(true);
            expect(result.format).toBe('mp3');
        });

        it('should validate OGG header', async () => {
            const buffer = new ArrayBuffer(16);
            const view = new DataView(buffer);
            view.setUint32(0, 0x4F676753); // "OggS"

            const result = await AudioFormatUtils.validateAudioHeader(buffer);
            expect(result.isValid).toBe(true);
            expect(result.format).toBe('ogg');
        });

        it('should validate WAV header', async () => {
            const buffer = new ArrayBuffer(16);
            const view = new DataView(buffer);
            view.setUint32(0, 0x52494646); // "RIFF"
            view.setUint32(8, 0x57415645); // "WAVE"

            const result = await AudioFormatUtils.validateAudioHeader(buffer);
            expect(result.isValid).toBe(true);
            expect(result.format).toBe('wav');
        });

        it('should reject invalid headers', async () => {
            const buffer = new ArrayBuffer(16);
            const view = new DataView(buffer);
            view.setUint32(0, 0x12345678); // Invalid header

            const result = await AudioFormatUtils.validateAudioHeader(buffer);
            expect(result.isValid).toBe(false);
            expect(result.format).toBe('unknown');
        });
    });
});

describe('AudioOptimizer', () => {
    let optimizer: AudioOptimizer;
    let mockBuffer: AudioBuffer;

    beforeEach(() => {
        optimizer = new AudioOptimizer({
            targetSampleRate: 22050,
            targetBitRate: 128,
            enableNormalization: true,
            enableCompression: true,
            maxFileSize: 100 * 1024
        });

        mockBuffer = {
            duration: 2.5,
            sampleRate: 44100,
            numberOfChannels: 2,
            length: 110250,
            getChannelData: vi.fn(() => {
                const data = new Float32Array(110250);
                // Fill with some test data
                for (let i = 0; i < data.length; i++) {
                    data[i] = Math.sin(i * 0.01) * 0.5;
                }
                return data;
            })
        } as any;

        mockAudioContext.createBuffer.mockReturnValue({
            ...mockBuffer,
            getChannelData: vi.fn(() => new Float32Array(110250))
        });

        vi.clearAllMocks();
    });

    describe('analyzeAudioBuffer', () => {
        it('should analyze audio buffer metrics', () => {
            const analysis = optimizer.analyzeAudioBuffer(mockBuffer);

            expect(analysis.currentMetrics.duration).toBe(2.5);
            expect(analysis.currentMetrics.sampleRate).toBe(44100);
            expect(analysis.currentMetrics.channels).toBe(2);
            expect(analysis.currentMetrics.originalSize).toBeGreaterThan(0);
        });

        it('should provide sample rate recommendations', () => {
            const analysis = optimizer.analyzeAudioBuffer(mockBuffer);

            const hasReducingSampleRateRecommendation = analysis.recommendations.some(
                rec => rec.includes('reducing sample rate')
            );
            expect(hasReducingSampleRateRecommendation).toBe(true);
        });

        it('should provide channel recommendations for stereo', () => {
            const analysis = optimizer.analyzeAudioBuffer(mockBuffer);

            const hasMonoRecommendation = analysis.recommendations.some(
                rec => rec.includes('Convert to mono')
            );
            expect(hasMonoRecommendation).toBe(true);
        });

        it('should provide duration recommendations for long clips', () => {
            const longBuffer = { ...mockBuffer, duration: 10 };
            const analysis = optimizer.analyzeAudioBuffer(longBuffer as AudioBuffer);

            const hasDurationRecommendation = analysis.recommendations.some(
                rec => rec.includes('shortening audio clips')
            );
            expect(hasDurationRecommendation).toBe(true);
        });

        it('should provide file size recommendations', () => {
            // Mock a large buffer
            const largeBuffer = { ...mockBuffer, length: 1000000 };
            const analysis = optimizer.analyzeAudioBuffer(largeBuffer as AudioBuffer);

            const hasFileSizeRecommendation = analysis.recommendations.some(
                rec => rec.includes('exceeds recommended maximum')
            );
            expect(hasFileSizeRecommendation).toBe(true);
        });
    });

    describe('normalizeAudioBuffer', () => {
        it('should normalize audio buffer', () => {
            const normalized = optimizer.normalizeAudioBuffer(mockBuffer);

            expect(mockAudioContext.createBuffer).toHaveBeenCalledWith(2, 110250, 44100);
            expect(normalized).toBeDefined();
        });

        it('should skip normalization when disabled', () => {
            const disabledOptimizer = new AudioOptimizer({ enableNormalization: false });
            const result = disabledOptimizer.normalizeAudioBuffer(mockBuffer);

            expect(result).toBe(mockBuffer);
        });
    });

    describe('applyFadeInOut', () => {
        it('should apply fade in and out', () => {
            const faded = optimizer.applyFadeInOut(mockBuffer, 100, 100);

            expect(mockAudioContext.createBuffer).toHaveBeenCalledWith(2, 110250, 44100);
            expect(faded).toBeDefined();
        });

        it('should use default fade times', () => {
            const faded = optimizer.applyFadeInOut(mockBuffer);

            expect(faded).toBeDefined();
        });
    });

    describe('getOptimizationReport', () => {
        it('should generate optimization report for multiple files', () => {
            const audioFiles = [
                { name: 'sound1', buffer: mockBuffer },
                { name: 'sound2', buffer: mockBuffer }
            ];

            const report = optimizer.getOptimizationReport(audioFiles);

            expect(report.fileReports).toHaveLength(2);
            expect(report.totalOriginalSize).toBeGreaterThan(0);
            expect(report.totalOptimizedSize).toBeGreaterThan(0);
            expect(report.overallCompressionRatio).toBeGreaterThan(0);
        });

        it('should provide global recommendations', () => {
            // Create files that would trigger recommendations
            const largeFiles = Array.from({ length: 10 }, (_, i) => ({
                name: `sound${i}`,
                buffer: { ...mockBuffer, length: 1000000 } as AudioBuffer
            }));

            const report = optimizer.getOptimizationReport(largeFiles);

            expect(report.globalRecommendations.length).toBeGreaterThan(0);
        });
    });
});

describe('AudioUtils', () => {
    describe('formatFileSize', () => {
        it('should format bytes correctly', () => {
            expect(AudioUtils.formatFileSize(0)).toBe('0 B');
            expect(AudioUtils.formatFileSize(1024)).toBe('1 KB');
            expect(AudioUtils.formatFileSize(1024 * 1024)).toBe('1 MB');
            expect(AudioUtils.formatFileSize(1536)).toBe('1.5 KB');
        });
    });

    describe('formatDuration', () => {
        it('should format seconds correctly', () => {
            expect(AudioUtils.formatDuration(30)).toBe('30.0s');
            expect(AudioUtils.formatDuration(90)).toBe('1m 30.0s');
            expect(AudioUtils.formatDuration(125.5)).toBe('2m 5.5s');
        });
    });

    describe('formatCompressionRatio', () => {
        it('should format compression ratio as percentage', () => {
            expect(AudioUtils.formatCompressionRatio(0.5)).toBe('50.0%');
            expect(AudioUtils.formatCompressionRatio(0.1)).toBe('90.0%');
            expect(AudioUtils.formatCompressionRatio(0.9)).toBe('10.0%');
        });
    });
});