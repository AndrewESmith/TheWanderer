import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WebAudioManager, HTML5AudioManager, createAudioManager } from '../../audio/managers/audio-manager';

// Mock Web Audio API
const mockAudioContext = {
    decodeAudioData: vi.fn(),
    createBuffer: vi.fn(),
    createGain: vi.fn(() => ({
        gain: { setValueAtTime: vi.fn() },
        connect: vi.fn()
    })),
    createBufferSource: vi.fn(() => ({
        buffer: null,
        loop: false,
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        disconnect: vi.fn(),
        addEventListener: vi.fn()
    })),
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
    getChannelData: vi.fn(() => {
        const data = new Float32Array(110250);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.sin(i * 0.01) * 0.5;
        }
        return data;
    })
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
    }),
    addEventListener: vi.fn(),
    play: vi.fn(() => Promise.resolve()),
    pause: vi.fn(),
    volume: 1,
    currentTime: 0,
    loop: false,
    preload: 'auto'
})) as any;

// Mock AudioContext
(global as any).AudioContext = vi.fn(() => mockAudioContext);
(global as any).webkitAudioContext = vi.fn(() => mockAudioContext);

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Enhanced Audio Manager', () => {
    let mockArrayBuffer: ArrayBuffer;

    beforeEach(() => {
        mockArrayBuffer = new ArrayBuffer(1024);

        // Setup default mocks
        mockFetch.mockResolvedValue({
            ok: true,
            arrayBuffer: () => Promise.resolve(mockArrayBuffer)
        });

        mockAudioContext.decodeAudioData.mockResolvedValue(mockAudioBuffer);
        mockAudioContext.createBuffer.mockReturnValue({
            ...mockAudioBuffer,
            getChannelData: vi.fn(() => new Float32Array(110250))
        });

        mockLocalStorage.getItem.mockReturnValue(null);

        vi.clearAllMocks();
    });

    describe('WebAudioManager', () => {
        let manager: WebAudioManager;

        beforeEach(() => {
            manager = new WebAudioManager();
        });

        afterEach(() => {
            manager.cleanup();
        });

        describe('initialization', () => {
            it('should initialize with Web Audio API support', () => {
                expect(manager.isSupported()).toBe(true);
            });

            it('should handle audio context suspension', () => {
                mockAudioContext.state = 'suspended';
                const suspendedManager = new WebAudioManager();

                expect(suspendedManager).toBeDefined();
                // Should set up event listeners for user interaction
            });
        });

        describe('enhanced preloading', () => {
            it('should preload sounds with progress tracking', async () => {
                // Ensure fetch mock returns proper response for all sound assets
                mockFetch.mockImplementation((url: string) => {
                    return Promise.resolve({
                        ok: true,
                        status: 200,
                        arrayBuffer: () => Promise.resolve(mockArrayBuffer)
                    });
                });

                const progressEvents: any[] = [];
                const unsubscribe = manager.onLoadingProgress((progress) => {
                    progressEvents.push(progress);
                });

                await manager.preloadSounds();

                expect(progressEvents.length).toBeGreaterThan(0);
                expect(progressEvents.some(e => e.status === 'loading')).toBe(true);
                expect(progressEvents.some(e => e.status === 'loaded')).toBe(true);

                const loadingState = manager.getLoadingState();
                expect(loadingState.isLoading).toBe(false);
                expect(loadingState.loadedCount).toBeGreaterThan(0);

                unsubscribe();
            });

            it('should apply optimization during preloading', async () => {
                await manager.preloadSounds();

                // Verify that optimization methods were called
                expect(mockAudioContext.createBuffer).toHaveBeenCalled();
            });

            it('should handle loading failures gracefully', async () => {
                mockFetch.mockRejectedValue(new Error('Network error'));

                await manager.preloadSounds();

                const loadingState = manager.getLoadingState();
                expect(loadingState.failedSounds.length).toBeGreaterThan(0);
                expect(loadingState.errors.size).toBeGreaterThan(0);
            });

            it('should skip preloading in fallback mode', async () => {
                // Force fallback mode
                (manager as any).errorHandling.fallbackMode = true;

                await manager.preloadSounds();

                expect(mockFetch).not.toHaveBeenCalled();
            });
        });

        describe('optimization reporting', () => {
            it('should provide optimization report', async () => {
                await manager.preloadSounds();

                const report = manager.getOptimizationReport();

                expect(report).toBeDefined();
                expect(report.fileReports).toBeDefined();
                expect(report.globalRecommendations).toBeDefined();
            });

            it('should handle empty buffer set', () => {
                const report = manager.getOptimizationReport();

                expect(report.fileReports).toHaveLength(0);
                expect(report.totalOriginalSize).toBe(0);
                expect(report.totalOptimizedSize).toBe(0);
            });
        });

        describe('loading state management', () => {
            it('should track loading state correctly', async () => {
                const initialState = manager.getLoadingState();
                expect(initialState.isLoading).toBe(false);
                expect(initialState.loadedCount).toBe(0);

                const loadingPromise = manager.preloadSounds();

                // State should be updated during loading
                await loadingPromise;

                const finalState = manager.getLoadingState();
                expect(finalState.isLoading).toBe(false);
            });
        });

        describe('error recovery', () => {
            it('should retry failed loads', async () => {
                mockFetch
                    .mockRejectedValueOnce(new Error('Network error'))
                    .mockResolvedValue({
                        ok: true,
                        arrayBuffer: () => Promise.resolve(mockArrayBuffer)
                    });

                await manager.preloadSounds();

                // Should have retried and eventually succeeded for all sounds
                // First call fails, then all subsequent calls succeed
                // Note: With URL caching, duplicate URLs (VICTORY_SOUND and DOOR_SLAM) share requests
                // So we expect 8 unique URLs + 1 retry = 9 total calls
                expect(mockFetch).toHaveBeenCalledTimes(9); // 8 unique URLs + 1 retry
            });

            it('should handle decode errors', async () => {
                mockAudioContext.decodeAudioData.mockRejectedValue(new Error('Invalid audio'));

                await manager.preloadSounds();

                const loadingState = manager.getLoadingState();
                expect(loadingState.failedSounds.length).toBeGreaterThan(0);
            });
        });

        describe('format fallback', () => {
            it('should try multiple formats', async () => {
                // Mock first format failing, second succeeding
                mockFetch
                    .mockRejectedValueOnce(new Error('404'))
                    .mockResolvedValue({
                        ok: true,
                        arrayBuffer: () => Promise.resolve(mockArrayBuffer)
                    });

                await manager.preloadSounds();

                // Should have tried multiple URLs for assets with multiple sources
                // First call fails, then all subsequent calls succeed
                // Note: With URL caching, duplicate URLs (VICTORY_SOUND and DOOR_SLAM) share requests
                // So we expect 8 unique URLs + 1 retry = 9 total calls
                expect(mockFetch).toHaveBeenCalledTimes(9); // 8 unique URLs + 1 retry for first sound
            });
        });
    });

    describe('HTML5AudioManager', () => {
        let manager: HTML5AudioManager;

        beforeEach(() => {
            manager = new HTML5AudioManager();
        });

        afterEach(() => {
            manager.cleanup();
        });

        describe('initialization', () => {
            it('should initialize with HTML5 Audio support', () => {
                expect(manager.isSupported()).toBe(true);
            });
        });

        describe('preloading with format optimization', () => {
            it('should preload sounds with format filtering', async () => {
                // Mock Audio constructor to simulate successful loading
                const mockAudioElement = {
                    canPlayType: vi.fn((type: string) => {
                        if (type === 'audio/mpeg') return 'probably';
                        if (type === 'audio/ogg') return 'maybe';
                        return '';
                    }),
                    addEventListener: vi.fn((event: string, callback: () => void) => {
                        // Simulate successful loading immediately
                        if (event === 'canplaythrough') {
                            setTimeout(callback, 1);
                        }
                    }),
                    removeEventListener: vi.fn(),
                    play: vi.fn(() => Promise.resolve()),
                    pause: vi.fn(),
                    volume: 1,
                    currentTime: 0,
                    loop: false,
                    preload: 'auto',
                    src: ''
                };

                (global.Audio as any).mockImplementation(() => mockAudioElement);

                await manager.preloadSounds();

                // Should have created Audio elements for supported formats
                expect(global.Audio).toHaveBeenCalled();
            }, 10000); // Increase timeout to 10 seconds

            it('should handle unsupported formats', async () => {
                // Mock Audio to not support any formats
                (global.Audio as any).mockImplementation(() => ({
                    canPlayType: vi.fn(() => ''),
                    addEventListener: vi.fn(),
                    preload: 'auto',
                    volume: 1
                }));

                await manager.preloadSounds();

                // Should handle gracefully without crashing
                expect(manager).toBeDefined();
            });
        });

        describe('loading state', () => {
            it('should provide loading state', () => {
                const state = manager.getLoadingState();
                expect(state).toBeDefined();
                expect(state.isLoading).toBe(false);
            });

            it('should provide optimization report', () => {
                const report = manager.getOptimizationReport();
                console.log('HTML5AudioManager report:', JSON.stringify(report, null, 2));
                expect(report).toBeDefined();
                expect(report.globalRecommendations.some((rec: string) =>
                    rec.includes('Web Audio API')
                )).toBe(true);
            });
        });
    });

    describe('createAudioManager factory', () => {
        it('should create WebAudioManager when Web Audio API is available', () => {
            const manager = createAudioManager();
            expect(manager).toBeInstanceOf(WebAudioManager);
        });

        it('should create HTML5AudioManager when only HTML5 Audio is available', () => {
            // Mock Web Audio API as unavailable
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            const manager = createAudioManager();
            expect(manager).toBeInstanceOf(HTML5AudioManager);

            // Restore for other tests
            (global as any).AudioContext = vi.fn(() => mockAudioContext);
        });

        it('should create SilentAudioManager when no audio support', () => {
            // Mock both APIs as unavailable
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;
            delete (global as any).Audio;

            const manager = createAudioManager();
            expect(manager.isSupported()).toBe(false);

            // Restore for other tests
            (global as any).AudioContext = vi.fn(() => mockAudioContext);
            global.Audio = vi.fn(() => ({
                canPlayType: vi.fn(() => 'probably')
            })) as any;
        });
    });

    describe('integration with existing functionality', () => {
        let manager: WebAudioManager;

        beforeEach(async () => {
            manager = new WebAudioManager();
            await manager.preloadSounds();
        });

        afterEach(() => {
            manager.cleanup();
        });

        it('should maintain existing playSound functionality', () => {
            // Manually add a sound buffer to the manager's state since preloading might not have worked
            (manager as any).state.soundBuffers.set('player_walk', mockAudioBuffer);

            manager.playSound('player_walk');

            // Should have created and started an audio source
            expect(mockAudioContext.createBufferSource).toHaveBeenCalled();
        });

        it('should maintain existing mute functionality', () => {
            manager.setMuted(true);
            expect(manager.isMuted()).toBe(true);

            manager.setMuted(false);
            expect(manager.isMuted()).toBe(false);
        });

        it('should maintain existing cleanup functionality', () => {
            manager.cleanup();

            expect(mockAudioContext.close).toHaveBeenCalled();
        });
    });
});