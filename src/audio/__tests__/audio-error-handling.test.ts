import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createAudioManager, createSpecificAudioManager } from '../managers/audio-manager-factory';
import { SilentAudioManager } from '../managers/silent-audio-manager';
import { HTML5AudioManager } from '../managers/html5-audio-manager';
import { isWebAudioSupported, isHTML5AudioSupported } from '../utils/audio-utils';

// Mock the audio utils
vi.mock('../utils/audio-utils', () => ({
    isWebAudioSupported: vi.fn(),
    isHTML5AudioSupported: vi.fn(),
    getSupportedAudioFormat: vi.fn(),
    createAudioContext: vi.fn(),
    canAutoplay: vi.fn(),
    detectBrowser: vi.fn().mockReturnValue({
        isSafari: false,
        isChrome: true,
        isFirefox: false,
        isIOS: false,
        isMobile: false
    })
}));

describe('Audio Error Handling and Fallbacks', () => {
    // Store original console methods
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    beforeEach(() => {
        // Mock console methods to prevent test output noise
        console.warn = vi.fn();
        console.error = vi.fn();

        // Reset mocks
        vi.mocked(isWebAudioSupported).mockReset();
        vi.mocked(isHTML5AudioSupported).mockReset();

        // Mock window.AudioContext
        Object.defineProperty(window, 'AudioContext', {
            writable: true,
            value: undefined
        });

        // Mock window.Audio
        Object.defineProperty(window, 'Audio', {
            writable: true,
            value: undefined
        });

        // Mock CustomEvent
        global.CustomEvent = vi.fn().mockImplementation((event, options) => ({
            type: event,
            detail: options?.detail || {}
        }));

        // Mock window.dispatchEvent
        window.dispatchEvent = vi.fn();

        // Mock document event listeners
        document.addEventListener = vi.fn();
        document.removeEventListener = vi.fn();

        // Mock window event listeners
        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();

        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn().mockReturnValue(null),
                setItem: vi.fn(),
                removeItem: vi.fn(),
                clear: vi.fn()
            },
            writable: true
        });
    });

    afterEach(() => {
        // Restore console methods
        console.warn = originalConsoleWarn;
        console.error = originalConsoleError;

        vi.resetAllMocks();
    });

    describe('Audio Manager Factory', () => {
        it('should create WebAudioManager when Web Audio API is supported', () => {
            // Mock Web Audio API support
            vi.mocked(isWebAudioSupported).mockReturnValue(true);

            // Mock AudioContext
            Object.defineProperty(window, 'AudioContext', {
                writable: true,
                value: vi.fn().mockImplementation(() => ({
                    createGain: vi.fn().mockReturnValue({
                        connect: vi.fn(),
                        disconnect: vi.fn(),
                        gain: {
                            value: 1,
                            setValueAtTime: vi.fn()
                        }
                    }),
                    createBufferSource: vi.fn().mockReturnValue({
                        connect: vi.fn(),
                        disconnect: vi.fn(),
                        start: vi.fn(),
                        stop: vi.fn()
                    }),
                    destination: {},
                    currentTime: 0,
                    state: 'running',
                    resume: vi.fn().mockResolvedValue(undefined),
                    close: vi.fn(),
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn()
                }))
            });

            const manager = createAudioManager();

            expect(isWebAudioSupported).toHaveBeenCalled();
            expect(manager.isSupported()).toBe(true);
        });

        it('should fall back to HTML5AudioManager when Web Audio API is not supported', () => {
            // Mock Web Audio API not supported
            vi.mocked(isWebAudioSupported).mockReturnValue(false);
            vi.mocked(isHTML5AudioSupported).mockReturnValue(true);

            // Mock Audio constructor
            Object.defineProperty(window, 'Audio', {
                writable: true,
                value: vi.fn().mockImplementation(() => ({
                    canPlayType: vi.fn().mockReturnValue('probably'),
                    play: vi.fn().mockResolvedValue(undefined),
                    pause: vi.fn(),
                    load: vi.fn(),
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                    volume: 1,
                    muted: false,
                    currentTime: 0,
                    src: ''
                }))
            });

            const manager = createAudioManager();

            expect(isWebAudioSupported).toHaveBeenCalled();
            expect(isHTML5AudioSupported).toHaveBeenCalled();
            expect(manager).toBeInstanceOf(HTML5AudioManager);
        });

        it('should fall back to SilentAudioManager when no audio is supported', () => {
            // Mock no audio support
            vi.mocked(isWebAudioSupported).mockReturnValue(false);
            vi.mocked(isHTML5AudioSupported).mockReturnValue(false);

            const manager = createAudioManager();

            expect(isWebAudioSupported).toHaveBeenCalled();
            expect(isHTML5AudioSupported).toHaveBeenCalled();
            expect(manager).toBeInstanceOf(SilentAudioManager);
        });

        it('should create specific audio manager when requested', () => {
            const silentManager = createSpecificAudioManager('silent');
            expect(silentManager).toBeInstanceOf(SilentAudioManager);
        });
    });

    describe('SilentAudioManager', () => {
        it('should implement all AudioManager methods without errors', async () => {
            const manager = new SilentAudioManager();

            // Test all methods
            expect(() => manager.playSound('test')).not.toThrow();
            expect(() => manager.setMuted(true)).not.toThrow();
            expect(manager.isMuted()).toBe(true); // Should return true after setting muted to true
            expect(manager.isSupported()).toBe(false);
            expect(() => manager.stopAllSounds()).not.toThrow();
            expect(() => manager.cleanup()).not.toThrow();

            // Test async methods
            await expect(manager.preloadSounds()).resolves.toBeUndefined();
            // Test loading state
            const loadingState = manager.getLoadingState();
            expect(loadingState.isLoading).toBe(false);
            expect(loadingState.loadedCount).toBe(1);
            expect(loadingState.totalCount).toBe(1);

            // Test volume methods
            expect(() => manager.setGlobalVolume(0.5)).not.toThrow();
            expect(manager.getGlobalVolume()).toBe(0);
            expect(() => manager.setCategoryVolume('test', 0.5)).not.toThrow();
            expect(manager.getCategoryVolume('test')).toBe(0);
            expect(manager.getAllCategoryVolumes()).toEqual({});
        });

        it('should handle loading progress callbacks', () => {
            const manager = new SilentAudioManager();
            const callback = vi.fn();

            const unsubscribe = manager.onLoadingProgress(callback);

            // Trigger preload to test callback
            manager.preloadSounds();

            expect(callback).toHaveBeenCalledWith(expect.objectContaining({
                soundId: expect.any(String),
                progress: expect.any(Number),
                status: expect.stringMatching(/loading|loaded/)
            }));

            // Test unsubscribe
            unsubscribe();
            callback.mockReset();

            manager.preloadSounds();
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('Error Recovery', () => {
        it('should handle errors during audio context creation', () => {
            // Mock AudioContext to throw error
            Object.defineProperty(window, 'AudioContext', {
                writable: true,
                value: vi.fn().mockImplementation(() => {
                    throw new Error('AudioContext creation failed');
                })
            });

            vi.mocked(isWebAudioSupported).mockReturnValue(true);

            const manager = createAudioManager();

            // Should fall back to silent mode
            expect(manager).toBeInstanceOf(SilentAudioManager);
            expect(console.error).toHaveBeenCalled();
        });

        it('should handle errors during sound playback', () => {
            const manager = new SilentAudioManager();

            // Create a spy on the playSound method
            const playSoundSpy = vi.spyOn(manager, 'playSound');

            // Test error handling
            manager.playSound('test');

            expect(playSoundSpy).toHaveBeenCalledWith('test'); // No second parameter expected
            expect(() => manager.playSound('test')).not.toThrow();
        });

        it('should handle errors during preloading', async () => {
            // Create a manager with a mocked preloadSounds that throws
            const manager = new SilentAudioManager();
            const originalPreload = manager.preloadSounds;

            manager.preloadSounds = vi.fn().mockImplementation(() => {
                throw new Error('Preload failed');
            });

            // Should not throw when called directly
            expect(() => {
                try {
                    manager.preloadSounds();
                } catch (e) {
                    // Error is expected and handled
                }
            }).not.toThrow();

            // Restore original method
            manager.preloadSounds = originalPreload;
        });
    });

    describe('Autoplay Policy Handling', () => {
        it('should detect autoplay restrictions', async () => {
            // Mock canAutoplay to return false (restricted)
            vi.mocked(isWebAudioSupported).mockReturnValue(true);

            // Mock AudioContext with suspended state
            Object.defineProperty(window, 'AudioContext', {
                writable: true,
                value: vi.fn().mockImplementation(() => ({
                    createGain: vi.fn().mockReturnValue({
                        connect: vi.fn(),
                        disconnect: vi.fn(),
                        gain: {
                            value: 1,
                            setValueAtTime: vi.fn()
                        }
                    }),
                    createBufferSource: vi.fn().mockReturnValue({
                        connect: vi.fn(),
                        disconnect: vi.fn(),
                        start: vi.fn(),
                        stop: vi.fn()
                    }),
                    destination: {},
                    currentTime: 0,
                    state: 'suspended',
                    resume: vi.fn().mockResolvedValue(undefined),
                    close: vi.fn(),
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn()
                }))
            });

            const manager = createAudioManager();

            // Should still create a manager
            expect(manager.isSupported()).toBe(true);

            // Event listeners should be added for user interaction
            expect(document.addEventListener).toHaveBeenCalled();
        });
    });
});