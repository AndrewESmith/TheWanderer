import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AssetLoader, type LoadingProgress } from '../../audio/managers/asset-loader';
import type { SoundAsset } from '../../Interfaces/ISoundAsset';

// Mock Web Audio API
const mockAudioContext = {
    decodeAudioData: vi.fn(),
    createBuffer: vi.fn(),
    createGain: vi.fn(),
    createBufferSource: vi.fn(),
    destination: {},
    currentTime: 0,
    state: 'running',
    close: vi.fn(),
    resume: vi.fn()
};

const mockAudioBuffer = {
    duration: 2.5,
    sampleRate: 44100,
    numberOfChannels: 2,
    length: 110250,
    getChannelData: vi.fn(() => new Float32Array(110250))
};

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock Audio constructor
global.Audio = vi.fn(() => ({
    canPlayType: vi.fn((type: string) => {
        if (type === 'audio/mpeg') return 'probably';
        if (type === 'audio/ogg') return 'maybe';
        return '';
    })
})) as any;

// Mock AudioContext
(global as any).AudioContext = vi.fn(() => mockAudioContext);
(global as any).webkitAudioContext = vi.fn(() => mockAudioContext);

describe('AssetLoader', () => {
    let assetLoader: AssetLoader;
    let mockArrayBuffer: ArrayBuffer;

    beforeEach(() => {
        assetLoader = new AssetLoader({
            maxRetries: 2,
            retryDelay: 100,
            timeout: 1000,
            enableCompression: true,
            preferredFormats: ['mp3', 'ogg']
        });

        // Create mock array buffer
        mockArrayBuffer = new ArrayBuffer(1024);

        // Reset mocks
        vi.clearAllMocks();
        mockAudioContext.decodeAudioData.mockResolvedValue(mockAudioBuffer);
    });

    afterEach(() => {
        assetLoader.cleanup();
    });

    describe('constructor', () => {
        it('should initialize with default options', () => {
            const loader = new AssetLoader();
            const state = loader.getLoadingState();

            expect(state.isLoading).toBe(false);
            expect(state.loadedCount).toBe(0);
            expect(state.totalCount).toBe(0);
            expect(state.failedSounds).toEqual([]);
        });

        it('should accept custom options', () => {
            const loader = new AssetLoader({
                maxRetries: 5,
                timeout: 5000
            });

            expect(loader).toBeDefined();
        });
    });

    describe('loadAudioBuffer', () => {
        const mockAsset: SoundAsset = {
            id: 'test_sound',
            src: ['sounds/test.mp3', 'sounds/test.ogg'],
            volume: 0.8,
            loop: false,
            preload: true
        };

        it('should successfully load audio buffer from first source', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Map([['content-type', 'audio/mpeg']]),
                arrayBuffer: () => Promise.resolve(mockArrayBuffer)
            });

            const buffer = await assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any);

            expect(buffer).toBe(mockAudioBuffer);
            expect(mockFetch).toHaveBeenCalledWith('sounds/test.mp3', expect.any(Object));
            expect(mockAudioContext.decodeAudioData).toHaveBeenCalledWith(mockArrayBuffer);
        });

        it('should fallback to second source if first fails', async () => {
            // Use loader with no retries to avoid retry interference
            const noRetryLoader = new AssetLoader({ maxRetries: 1 });

            mockFetch
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Map([['content-type', 'audio/ogg']]),
                    arrayBuffer: () => Promise.resolve(mockArrayBuffer)
                });

            const buffer = await noRetryLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any);

            expect(buffer).toBe(mockAudioBuffer);
            expect(mockFetch).toHaveBeenCalledTimes(2);
            expect(mockFetch).toHaveBeenNthCalledWith(1, 'sounds/test.mp3', expect.any(Object));
            expect(mockFetch).toHaveBeenNthCalledWith(2, 'sounds/test.ogg', expect.any(Object));
        });

        it('should retry failed requests', async () => {
            mockFetch
                .mockRejectedValueOnce(new Error('Network error'))
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({
                    ok: true,
                    arrayBuffer: () => Promise.resolve(mockArrayBuffer)
                });

            const buffer = await assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any);

            expect(buffer).toBe(mockAudioBuffer);
            expect(mockFetch).toHaveBeenCalledTimes(3);
        });

        it('should throw error if all sources fail', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            await expect(
                assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any)
            ).rejects.toThrow();
        });

        it('should handle HTTP errors', async () => {
            // Use loader with no retries to avoid retry interference
            const noRetryLoader = new AssetLoader({ maxRetries: 1 });

            // Create asset with single source to avoid fallback
            const singleSourceAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.mp3'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                headers: new Map([['content-type', 'text/html']])
            });

            await expect(
                noRetryLoader.loadAudioBuffer('test_sound', singleSourceAsset, mockAudioContext as any)
            ).rejects.toThrow('HTTP 404: Not Found');
        });

        it('should handle audio decoding errors', async () => {
            // Use loader with no retries to avoid retry interference
            const noRetryLoader = new AssetLoader({ maxRetries: 1 });

            // Create asset with single source to avoid fallback
            const singleSourceAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.mp3'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Map([['content-type', 'audio/mpeg']]),
                arrayBuffer: () => Promise.resolve(mockArrayBuffer)
            });
            mockAudioContext.decodeAudioData.mockRejectedValueOnce(new Error('Invalid audio data'));

            await expect(
                noRetryLoader.loadAudioBuffer('test_sound', singleSourceAsset, mockAudioContext as any)
            ).rejects.toThrow('Invalid audio data');
        });

        it('should respect timeout', async () => {
            const slowLoader = new AssetLoader({ timeout: 100 });

            // Create asset with single source to avoid fallback
            const singleSourceAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.mp3'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            // Mock fetch to never resolve (simulating a hanging request)
            mockFetch.mockImplementationOnce(() =>
                new Promise(() => { }) // Never resolves
            );

            await expect(
                slowLoader.loadAudioBuffer('test_sound', singleSourceAsset, mockAudioContext as any)
            ).rejects.toThrow(/Timeout loading.*after 100ms/);
        });
    });

    describe('loadAssets', () => {
        const mockAssets = {
            sound1: {
                id: 'sound1',
                src: ['sounds/sound1.mp3'],
                volume: 0.8,
                loop: false,
                preload: true
            },
            sound2: {
                id: 'sound2',
                src: ['sounds/sound2.mp3'],
                volume: 0.6,
                loop: false,
                preload: true
            },
            sound3: {
                id: 'sound3',
                src: ['sounds/sound3.mp3'],
                volume: 0.7,
                loop: false,
                preload: false // Should not be loaded
            }
        };

        it('should load all preload assets', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Map([['content-type', 'audio/mpeg']]),
                arrayBuffer: () => Promise.resolve(mockArrayBuffer)
            });

            const buffers = await assetLoader.loadAssets(mockAssets, mockAudioContext as any);

            expect(buffers.size).toBe(2);
            expect(buffers.has('sound1')).toBe(true);
            expect(buffers.has('sound2')).toBe(true);
            expect(buffers.has('sound3')).toBe(false);

            const state = assetLoader.getLoadingState();
            expect(state.loadedCount).toBe(2);
            expect(state.totalCount).toBe(2);
            expect(state.isLoading).toBe(false);
        });

        it('should handle partial failures', async () => {
            // Reset the mock to ensure clean state
            mockFetch.mockReset();

            // First call succeeds (sound1), second call fails (sound2)
            mockFetch
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Map([['content-type', 'audio/mpeg']]),
                    arrayBuffer: () => Promise.resolve(mockArrayBuffer)
                })
                .mockRejectedValueOnce(new Error('Network error'));

            const buffers = await assetLoader.loadAssets(mockAssets, mockAudioContext as any);

            expect(buffers.size).toBe(1);
            expect(buffers.has('sound1')).toBe(true);
            expect(buffers.has('sound2')).toBe(false);

            const state = assetLoader.getLoadingState();
            expect(state.loadedCount).toBe(1);
            expect(state.failedSounds).toContain('sound2');
        });
    });

    describe('progress tracking', () => {
        it('should emit progress events', async () => {
            const progressEvents: LoadingProgress[] = [];
            const unsubscribe = assetLoader.onProgress((progress) => {
                progressEvents.push(progress);
            });

            const mockAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.mp3'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Map([['content-type', 'audio/mpeg']]),
                arrayBuffer: () => Promise.resolve(mockArrayBuffer)
            });

            await assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any);

            expect(progressEvents.length).toBeGreaterThan(0);
            expect(progressEvents[0]?.status).toBe('loading');
            expect(progressEvents[progressEvents.length - 1]?.status).toBe('loaded');

            unsubscribe();
        });

        it('should emit error events on failure', async () => {
            const progressEvents: LoadingProgress[] = [];
            assetLoader.onProgress((progress) => {
                progressEvents.push(progress);
            });

            const mockAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.mp3'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            mockFetch.mockRejectedValue(new Error('Network error'));

            try {
                await assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any);
            } catch {
                // Expected to fail
            }

            const failedEvent = progressEvents.find(e => e.status === 'failed');
            expect(failedEvent).toBeDefined();
            expect(failedEvent?.error).toBeInstanceOf(Error);
        });
    });

    describe('format optimization', () => {
        it('should prefer supported formats', async () => {
            const mockAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.wav', 'sounds/test.mp3', 'sounds/test.ogg'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Map([['content-type', 'audio/mpeg']]),
                arrayBuffer: () => Promise.resolve(mockArrayBuffer)
            });

            await assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any);

            // Should try MP3 first (preferred format)
            expect(mockFetch).toHaveBeenCalledWith('sounds/test.mp3', expect.any(Object));
        });

        it('should filter unsupported formats', async () => {
            // Mock Audio to not support any formats
            (global.Audio as any).mockImplementation(() => ({
                canPlayType: vi.fn(() => '')
            }));

            const mockAsset: SoundAsset = {
                id: 'test_sound',
                src: ['sounds/test.unsupported'],
                volume: 0.8,
                loop: false,
                preload: true
            };

            await expect(
                assetLoader.loadAudioBuffer('test_sound', mockAsset, mockAudioContext as any)
            ).rejects.toThrow('No supported audio formats');
        });
    });

    describe('cleanup', () => {
        it('should clear all state and callbacks', () => {
            const callback = vi.fn();
            assetLoader.onProgress(callback);

            assetLoader.cleanup();

            const state = assetLoader.getLoadingState();
            expect(state.loadedCount).toBe(0);
            expect(state.totalCount).toBe(0);
            expect(state.failedSounds).toEqual([]);
            expect(state.errors.size).toBe(0);
        });
    });
});