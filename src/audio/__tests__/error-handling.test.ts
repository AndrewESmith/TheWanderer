import { WebAudioManager, HTML5AudioManager, SilentAudioManager, createAudioManager } from '../managers/audio-manager';
import { SOUND_ASSETS } from '../config/sound-config';

// Mock Web Audio API
const mockAudioContext = {
    createGain: vi.fn(() => ({
        connect: vi.fn(),
        disconnect: vi.fn(),
        gain: {
            setValueAtTime: vi.fn(),
            value: 1
        }
    })),
    createBufferSource: vi.fn(() => ({
        connect: vi.fn(),
        disconnect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        buffer: null
    })),
    decodeAudioData: vi.fn(),
    resume: vi.fn(),
    close: vi.fn(),
    state: 'running',
    currentTime: 0,
    destination: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
};

// Mock HTML5 Audio
const mockAudio = {
    play: vi.fn(),
    pause: vi.fn(),
    load: vi.fn(),
    canPlayType: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    currentTime: 0,
    volume: 1,
    loop: false,
    src: '',
    error: null,
    buffered: {
        length: 0,
        start: vi.fn(),
        end: vi.fn()
    },
    duration: 0
};

// Mock fetch for audio file loading
const mockFetch = vi.fn();

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn()
};

describe('Audio Error Handling and Fallbacks', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Reset global mocks
        global.fetch = mockFetch;
        global.localStorage = mockLocalStorage;

        // Mock window.Audio
        global.Audio = vi.fn(() => mockAudio) as any;

        // Mock AudioContext
        global.AudioContext = vi.fn(() => mockAudioContext) as any;
        (global as any).webkitAudioContext = vi.fn(() => mockAudioContext);

        // Mock performance.now
        global.performance = { now: vi.fn(() => 1000) } as any;

        // Mock console methods to reduce test noise
        vi.spyOn(console, 'log').mockImplementation(() => { });
        vi.spyOn(console, 'warn').mockImplementation(() => { });
        vi.spyOn(console, 'error').mockImplementation(() => { });
        vi.spyOn(console, 'debug').mockImplementation(() => { });

        // Mock window.dispatchEvent
        global.window.dispatchEvent = vi.fn();
        global.document.addEventListener = vi.fn();
        global.document.removeEventListener = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Web Audio API Unavailable', () => {
        it('should gracefully degrade when Web Audio API is not supported', () => {
            // Remove Web Audio API support
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            const manager = createAudioManager();

            // Should fall back to HTML5AudioManager
            expect(manager).toBeInstanceOf(HTML5AudioManager);
            expect(console.warn).toHaveBeenCalledWith(
                'Web Audio API not supported, using HTML5 Audio fallback'
            );
        });

        it('should fall back to silent mode when no audio support exists', () => {
            // Remove all audio support
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;
            delete global.Audio;

            const manager = createAudioManager();

            // Should fall back to SilentAudioManager
            expect(manager).toBeInstanceOf(SilentAudioManager);
            expect(console.warn).toHaveBeenCalledWith(
                'No audio support detected, using silent mode'
            );
        });

        it('should handle AudioContext creation failure', () => {
            // Mock AudioContext constructor to throw
            global.AudioContext = vi.fn(() => {
                throw new Error('AudioContext creation failed');
            }) as any;

            const manager = new WebAudioManager();

            // Should handle the error gracefully
            expect(manager.isSupported()).toBe(false);
            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('Audio context error'),
                expect.any(Error)
            );
        });
    });

    describe('Audio Context Suspension Handling', () => {
        it('should handle suspended audio context due to autoplay policies', async () => {
            const suspendedContext = {
                ...mockAudioContext,
                state: 'suspended',
                resume: vi.fn().mockResolvedValue(undefined)
            };

            global.AudioContext = vi.fn(() => suspendedContext) as any;

            // Spy on document.addEventListener to verify event listeners are added
            const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

            const manager = new WebAudioManager();

            // Verify that event listeners were added
            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'click',
                expect.any(Function),
                expect.any(Object)
            );

            // Get the click handler that was added
            const clickHandler = addEventListenerSpy.mock.calls
                .find(call => call[0] === 'click')?.[1] as EventListener;

            expect(clickHandler).toBeDefined();

            // Manually call the click handler to simulate the event
            if (clickHandler) {
                const clickEvent = new Event('click');
                clickHandler(clickEvent);
            }

            // Wait for the async resume operation
            await new Promise(resolve => setTimeout(resolve, 10));

            // Should attempt to resume the context
            expect(suspendedContext.resume).toHaveBeenCalled();
        });

        it('should handle audio context resume failure', async () => {
            const suspendedContext = {
                ...mockAudioContext,
                state: 'suspended',
                resume: vi.fn().mockRejectedValue(new Error('Resume failed'))
            };

            global.AudioContext = vi.fn(() => suspendedContext) as any;

            // Spy on document.addEventListener to capture the actual event handlers
            const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

            const manager = new WebAudioManager();

            // Get the click handler that was added by the WebAudioManager
            const clickHandler = addEventListenerSpy.mock.calls
                .find(call => call[0] === 'click')?.[1] as EventListener;

            expect(clickHandler).toBeDefined();

            // Manually call the click handler to simulate the event
            if (clickHandler) {
                const clickEvent = new Event('click');
                clickHandler(clickEvent);
            }

            // Wait for the async resume operation to complete
            await new Promise(resolve => setTimeout(resolve, 10));

            // Should handle resume failure gracefully
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('Failed to resume'),
                expect.any(Error)
            );
        });

        it('should set up multiple event listeners for context resume', () => {
            const suspendedContext = {
                ...mockAudioContext,
                state: 'suspended'
            };

            global.AudioContext = vi.fn(() => suspendedContext) as any;

            new WebAudioManager();

            // Should add multiple event listeners for resume
            expect(document.addEventListener).toHaveBeenCalledWith(
                'click',
                expect.any(Function),
                expect.any(Object)
            );
            expect(document.addEventListener).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function),
                expect.any(Object)
            );
            expect(document.addEventListener).toHaveBeenCalledWith(
                'touchstart',
                expect.any(Function),
                expect.any(Object)
            );
        });
    });

    describe('Sound File Loading Errors', () => {
        it('should handle failed sound file loads gracefully', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            const manager = new WebAudioManager();

            // Should not throw when preloading fails
            await expect(manager.preloadSounds()).resolves.not.toThrow();

            // Should log the error
            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('Load error for'),
                expect.any(Error)
            );
        });

        it('should retry failed sound loads', async () => {
            // First call fails, second succeeds
            mockFetch
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({
                    ok: true,
                    arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024))
                });

            mockAudioContext.decodeAudioData.mockResolvedValue({
                duration: 1,
                numberOfChannels: 1,
                sampleRate: 44100,
                length: 44100
            });

            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Should have retried the failed request
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });

        it('should fall back to HTML5 audio when Web Audio loading fails completely', async () => {
            // Mock all Web Audio loading to fail
            mockFetch.mockRejectedValue(new Error('All sources failed'));

            const manager = new WebAudioManager();

            // Should emit fallback event
            manager.playSound('PLAYER_WALK');

            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'audioManagerFallback'
                })
            );
        });
    });

    describe('HTML5 Audio Fallback', () => {
        it('should handle HTML5 audio playback errors', () => {
            const manager = new HTML5AudioManager();

            // Mock audio element with error
            const audioWithError = {
                ...mockAudio,
                error: { message: 'Decode error', code: 4 }
            };

            // Manually set up audio element
            (manager as any).audioElements.set('TEST_SOUND', audioWithError);

            manager.playSound('TEST_SOUND');

            // Should handle the error gracefully
            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('HTML5 audio playback error'),
                expect.any(Error)
            );
        });

        it('should handle autoplay blocked errors', () => {
            const manager = new HTML5AudioManager();

            const audioElement = {
                ...mockAudio,
                play: vi.fn().mockRejectedValue(
                    Object.assign(new Error('NotAllowedError'), { name: 'NotAllowedError' })
                )
            };

            (manager as any).audioElements.set('TEST_SOUND', audioElement);

            manager.playSound('TEST_SOUND');

            // Should set up autoplay recovery
            expect(document.addEventListener).toHaveBeenCalledWith(
                'click',
                expect.any(Function),
                expect.objectContaining({ once: true })
            );
        });

        it('should handle unsupported audio formats', async () => {
            mockAudio.canPlayType.mockReturnValue('');

            const manager = new HTML5AudioManager();

            // Should handle gracefully when no formats are supported
            await expect(manager.preloadSounds()).resolves.not.toThrow();

            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('Failed to preload HTML5 sound'),
                expect.any(Error)
            );
        });
    });

    describe('Silent Mode Fallback', () => {
        it('should provide silent implementations for all methods', () => {
            const manager = new SilentAudioManager();

            // All methods should work without throwing
            expect(() => {
                manager.playSound('TEST_SOUND');
                manager.stopAllSounds();
                manager.setMuted(true);
                manager.setGlobalVolume(0.5);
                manager.setCategoryVolume('movement', 0.8);
            }).not.toThrow();

            // Should report as not supported
            expect(manager.isSupported()).toBe(false);
        });

        it('should return empty loading state', () => {
            const manager = new SilentAudioManager();
            const loadingState = manager.getLoadingState();

            expect(loadingState).toEqual({
                isLoading: false,
                loadedCount: 0,
                totalCount: 0,
                failedSounds: [],
                errors: new Map()
            });
        });
    });

    describe('Error Recovery Mechanisms', () => {
        it('should attempt on-demand loading when buffer not found', () => {
            const manager = new WebAudioManager();

            // Try to play a sound that hasn't been loaded
            manager.playSound('NONEXISTENT_SOUND');

            // Should attempt to load the sound on-demand
            expect(console.log).toHaveBeenCalledWith(
                expect.stringContaining('Attempting on-demand load')
            );
        });

        it('should validate audio buffers before playback', () => {
            const manager = new WebAudioManager();

            // Mock invalid buffer
            const invalidBuffer = {
                length: 0,
                numberOfChannels: 0,
                sampleRate: 0,
                duration: 0
            };

            (manager as any).state.soundBuffers.set('INVALID_SOUND', invalidBuffer);

            manager.playSound('INVALID_SOUND');

            // Should detect and handle invalid buffer
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('Invalid buffer'),
                expect.any(String)
            );
        });

        it('should handle audio context interruption on iOS Safari', () => {
            const interruptedContext = {
                ...mockAudioContext,
                state: 'interrupted'
            };

            global.AudioContext = vi.fn(() => interruptedContext) as any;

            const manager = new WebAudioManager();

            // Simulate state change to interrupted
            const stateChangeHandler = mockAudioContext.addEventListener.mock.calls
                .find(call => call[0] === 'statechange')?.[1];

            if (stateChangeHandler) {
                stateChangeHandler();
            }

            // Should handle interruption gracefully
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('Audio context interrupted')
            );
        });
    });

    describe('Browser-Specific Error Handling', () => {
        it('should handle Safari-specific audio context issues', async () => {
            // Mock Safari user agent
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
                configurable: true
            });

            const safariContext = {
                ...mockAudioContext,
                state: 'suspended',
                resume: vi.fn()
                    .mockRejectedValueOnce(new Error('First attempt failed'))
                    .mockRejectedValueOnce(new Error('Second attempt failed'))
                    .mockResolvedValueOnce(undefined)
            };

            global.AudioContext = vi.fn(() => safariContext) as any;

            const manager = new WebAudioManager();

            // Should handle Safari-specific resume logic
            expect(safariContext.resume).toHaveBeenCalled();
        });

        it('should handle Chrome-specific audio context issues', async () => {
            // Mock Chrome user agent
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                configurable: true
            });

            const chromeContext = {
                ...mockAudioContext,
                state: 'suspended',
                createOscillator: vi.fn(() => ({
                    connect: vi.fn(),
                    start: vi.fn(),
                    stop: vi.fn(),
                    frequency: { setValueAtTime: vi.fn() }
                })),
                resume: vi.fn().mockResolvedValue(undefined)
            };

            global.AudioContext = vi.fn(() => chromeContext) as any;

            const manager = new WebAudioManager();

            // Should handle Chrome-specific resume logic
            expect(chromeContext.createOscillator).toHaveBeenCalled();
        });
    });

    describe('Error Event Emission', () => {
        it('should emit error events for external handling', () => {
            const manager = new WebAudioManager();

            // Trigger an error condition
            manager.playSound('NONEXISTENT_SOUND');

            // Should emit error event
            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'audioError',
                    detail: expect.objectContaining({
                        type: expect.any(String),
                        error: expect.any(Error),
                        timestamp: expect.any(Number)
                    })
                })
            );
        });

        it('should emit fallback events when switching audio managers', () => {
            // Remove Web Audio API support
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            createAudioManager();

            // Should emit fallback event
            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'audioManagerFallback'
                })
            );
        });
    });

    describe('Memory Management and Cleanup', () => {
        it('should clean up resources on audio manager cleanup', () => {
            const manager = new WebAudioManager();

            manager.cleanup();

            // Should clean up audio context and resources
            expect(mockAudioContext.close).toHaveBeenCalled();
        });

        it('should handle cleanup errors gracefully', () => {
            const manager = new WebAudioManager();

            // Mock cleanup to throw
            mockAudioContext.close.mockRejectedValue(new Error('Cleanup failed'));

            // Should not throw during cleanup
            expect(() => manager.cleanup()).not.toThrow();
        });
    });
});
