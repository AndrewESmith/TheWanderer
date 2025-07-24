import { describe, it, expect, beforeEach, afterEach, vi, type MockedFunction } from 'vitest';
import { WebAudioManager, HTML5AudioManager, SilentAudioManager, createAudioManager } from '../audio/managers/audio-manager';
import type { PlaySoundOptions } from '../Interfaces/ISoundEvent';

// Mock Web Audio API
class MockAudioContext {
    state = 'running';
    currentTime = 0;
    destination = {};

    createGain() {
        return {
            gain: {
                setValueAtTime: vi.fn()
            },
            connect: vi.fn()
        };
    }

    createBufferSource() {
        return {
            buffer: null,
            loop: false,
            connect: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
            disconnect: vi.fn(),
            addEventListener: vi.fn()
        };
    }

    createBuffer(numberOfChannels: number, length: number, sampleRate: number) {
        return {
            numberOfChannels,
            length,
            sampleRate,
            duration: length / sampleRate,
            getChannelData: vi.fn().mockReturnValue(new Float32Array(length)),
            copyFromChannel: vi.fn(),
            copyToChannel: vi.fn()
        };
    }

    decodeAudioData(arrayBuffer: ArrayBuffer) {
        return Promise.resolve({
            length: 1000,
            sampleRate: 44100,
            numberOfChannels: 2,
            duration: 1000 / 44100,
            getChannelData: vi.fn().mockReturnValue(new Float32Array(1000)),
            copyFromChannel: vi.fn(),
            copyToChannel: vi.fn()
        });
    }

    resume() {
        this.state = 'running';
        return Promise.resolve();
    }

    close() {
        this.state = 'closed';
        return Promise.resolve();
    }
}

// Mock HTML5 Audio
class MockAudio {
    src = '';
    volume = 1;
    loop = false;
    currentTime = 0;
    preload = 'none';

    private eventListeners: Record<string, Function[]> = {};

    play() {
        return Promise.resolve();
    }

    pause() { }

    addEventListener(event: string, callback: Function) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event]!.push(callback);
    }

    removeEventListener(event: string, callback: Function) {
        if (this.eventListeners[event]) {
            const index = this.eventListeners[event]!.indexOf(callback);
            if (index > -1) {
                this.eventListeners[event]!.splice(index, 1);
            }
        }
    }

    dispatchEvent(event: string) {
        if (this.eventListeners[event]) {
            this.eventListeners[event]!.forEach(callback => callback());
        }
    }

    canPlayType(type: string) {
        if (type === 'audio/mpeg') return 'probably';
        if (type === 'audio/ogg') return 'maybe';
        return '';
    }
}

// Mock fetch
const mockFetch = vi.fn();

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
};

describe('Audio Manager', () => {
    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();

        // Mock global objects
        global.fetch = mockFetch;
        Object.defineProperty(global, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });

        // Mock successful fetch response for all sound files
        mockFetch.mockImplementation((url: string) => {
            // Simulate different responses based on URL
            if (typeof url === 'string' && url.includes('.ogg')) {
                // Simulate missing .ogg files
                return Promise.resolve({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found'
                });
            }

            // Default successful response for .mp3 files
            return Promise.resolve({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000))
            });
        });

        // Mock localStorage
        mockLocalStorage.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('WebAudioManager', () => {
        beforeEach(() => {
            // Mock Web Audio API
            (global as any).AudioContext = MockAudioContext;
            (global as any).webkitAudioContext = MockAudioContext;
        });

        it('should initialize with Web Audio API support', () => {
            const manager = new WebAudioManager();
            expect(manager.isSupported()).toBe(true);
        });

        it('should handle muted state correctly', () => {
            const manager = new WebAudioManager();

            expect(manager.isMuted()).toBe(false); // Default from config

            manager.setMuted(true);
            expect(manager.isMuted()).toBe(true);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wanderer-audio-muted', 'true');

            manager.setMuted(false);
            expect(manager.isMuted()).toBe(false);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wanderer-audio-muted', 'false');
        });

        it('should load muted preference from localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('true');
            const manager = new WebAudioManager();
            expect(manager.isMuted()).toBe(true);
        });

        it('should handle localStorage errors gracefully', () => {
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            const manager = new WebAudioManager();
            expect(manager.isMuted()).toBe(false); // Should use default
        });

        it('should preload sounds successfully', async () => {
            // Ensure Audio mock supports the formats used in sound config
            (global as any).Audio = class extends MockAudio {
                canPlayType(type: string) {
                    if (type === 'audio/mpeg') return 'probably';
                    if (type === 'audio/ogg') return 'maybe';
                    return '';
                }
            };

            const manager = new WebAudioManager();

            await manager.preloadSounds();

            // Should have made fetch requests for preloadable sounds
            expect(mockFetch).toHaveBeenCalled();
        });

        it('should handle preload errors gracefully', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            const manager = new WebAudioManager();

            // Should not throw
            await expect(manager.preloadSounds()).resolves.toBeUndefined();
        });

        it('should play sound with default options', () => {
            const manager = new WebAudioManager();

            // Mock that sound is loaded
            (manager as any).state.soundBuffers.set('test_sound', {
                length: 1000,
                sampleRate: 44100
            });

            // Should not throw
            expect(() => manager.playSound('test_sound')).not.toThrow();
        });

        it('should play sound with custom options', () => {
            const manager = new WebAudioManager();

            // Mock that sound is loaded
            (manager as any).state.soundBuffers.set('test_sound', {
                length: 1000,
                sampleRate: 44100
            });

            const options: PlaySoundOptions = {
                volume: 0.5,
                loop: true,
                delay: 0.1
            };

            // Should not throw
            expect(() => manager.playSound('test_sound', options)).not.toThrow();
        });

        it('should not play sound when muted', () => {
            const manager = new WebAudioManager();
            manager.setMuted(true);

            // Mock that sound is loaded
            (manager as any).state.soundBuffers.set('test_sound', {
                length: 1000,
                sampleRate: 44100
            });

            // Should not create audio source when muted
            expect(() => manager.playSound('test_sound')).not.toThrow();
        });

        it('should handle missing sound buffer gracefully', () => {
            const manager = new WebAudioManager();

            // Should not throw when sound buffer doesn't exist
            expect(() => manager.playSound('nonexistent_sound')).not.toThrow();
        });

        it('should cleanup resources properly', () => {
            const manager = new WebAudioManager();

            // Should not throw
            expect(() => manager.cleanup()).not.toThrow();
        });

        it('should handle audio context creation failure', () => {
            // Mock AudioContext constructor to throw
            (global as any).AudioContext = class {
                constructor() {
                    throw new Error('AudioContext creation failed');
                }
            };

            const manager = new WebAudioManager();
            expect(manager.isSupported()).toBe(false);
        });
    });

    describe('HTML5AudioManager', () => {
        beforeEach(() => {
            // Remove Web Audio API support
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            // Mock HTML5 Audio
            (global as any).Audio = MockAudio;
        });

        it('should initialize with HTML5 Audio support', () => {
            const manager = new HTML5AudioManager();
            expect(manager.isSupported()).toBe(true);
        });

        it('should handle muted state correctly', () => {
            const manager = new HTML5AudioManager();

            expect(manager.isMuted()).toBe(false);

            manager.setMuted(true);
            expect(manager.isMuted()).toBe(true);

            manager.setMuted(false);
            expect(manager.isMuted()).toBe(false);
        });

        it('should preload sounds using HTML5 Audio', async () => {
            const manager = new HTML5AudioManager();

            // Mock successful audio loading
            const originalAudio = (global as any).Audio;
            (global as any).Audio = class extends MockAudio {
                constructor() {
                    super();
                    // Simulate successful loading
                    setTimeout(() => this.dispatchEvent('canplaythrough'), 0);
                }
            };

            await manager.preloadSounds();

            // Restore original mock
            (global as any).Audio = originalAudio;
        });

        it('should play sound with HTML5 Audio', () => {
            const manager = new HTML5AudioManager();

            // Mock that audio element is loaded
            const mockAudio = new MockAudio();
            (manager as any).audioElements.set('test_sound', mockAudio);

            expect(() => manager.playSound('test_sound')).not.toThrow();
        });

        it('should not play sound when muted', () => {
            const manager = new HTML5AudioManager();
            manager.setMuted(true);

            const mockAudio = new MockAudio();
            const playSpy = vi.spyOn(mockAudio, 'play');
            (manager as any).audioElements.set('test_sound', mockAudio);

            manager.playSound('test_sound');
            expect(playSpy).not.toHaveBeenCalled();
        });

        it('should cleanup audio elements', () => {
            const manager = new HTML5AudioManager();

            const mockAudio = new MockAudio();
            const pauseSpy = vi.spyOn(mockAudio, 'pause');
            (manager as any).audioElements.set('test_sound', mockAudio);

            manager.cleanup();
            expect(pauseSpy).toHaveBeenCalled();
            expect(mockAudio.src).toBe('');
        });
    });

    describe('SilentAudioManager', () => {
        it('should initialize in silent mode', () => {
            const manager = new SilentAudioManager();
            expect(manager.isSupported()).toBe(false);
        });

        it('should handle all operations silently', async () => {
            const manager = new SilentAudioManager();

            // All operations should work without throwing
            expect(() => manager.playSound('test_sound')).not.toThrow();
            await expect(manager.preloadSounds()).resolves.toBeUndefined();
            expect(() => manager.setMuted(true)).not.toThrow();
            expect(manager.isMuted()).toBe(true);
            expect(() => manager.cleanup()).not.toThrow();
        });
    });

    describe('createAudioManager factory', () => {
        it('should create WebAudioManager when Web Audio API is supported', () => {
            (global as any).AudioContext = MockAudioContext;

            const manager = createAudioManager();
            expect(manager).toBeInstanceOf(WebAudioManager);
        });

        it('should create HTML5AudioManager when only HTML5 Audio is supported', () => {
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;
            (global as any).Audio = MockAudio;

            const manager = createAudioManager();
            expect(manager).toBeInstanceOf(HTML5AudioManager);
        });

        it('should create SilentAudioManager when no audio support is available', () => {
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;
            delete (global as any).Audio;

            const manager = createAudioManager();
            expect(manager).toBeInstanceOf(SilentAudioManager);
        });
    });

    describe('Error Handling', () => {
        beforeEach(() => {
            (global as any).AudioContext = MockAudioContext;
        });

        it('should handle fetch errors during preloading', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            const manager = new WebAudioManager();

            // Should not throw
            await expect(manager.preloadSounds()).resolves.toBeUndefined();
        });

        it('should handle HTTP errors during preloading', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });

            const manager = new WebAudioManager();

            // Should not throw
            await expect(manager.preloadSounds()).resolves.toBeUndefined();
        });

        it('should handle audio decoding errors', async () => {
            const mockContext = new MockAudioContext();
            mockContext.decodeAudioData = vi.fn().mockRejectedValue(new Error('Decode error'));

            (global as any).AudioContext = class {
                constructor() {
                    return mockContext;
                }
            };

            // Mock console.error to suppress error output during test
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            // Mock console.warn to suppress warning output during test
            const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

            // Mock console.log to suppress log output during test
            const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            const manager = new WebAudioManager();

            // Should not throw - errors should be caught and handled gracefully
            await expect(manager.preloadSounds()).resolves.toBeUndefined();

            // Verify that errors were logged (the asset loader will log errors for failed sounds)
            expect(consoleErrorSpy).toHaveBeenCalled();

            // Restore console methods
            consoleErrorSpy.mockRestore();
            consoleWarnSpy.mockRestore();
            consoleLogSpy.mockRestore();
        });

        it('should handle playback errors gracefully', () => {
            const manager = new WebAudioManager();

            // Mock console.error to suppress error output during test
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            // Mock audio context to throw during source creation
            const mockContext = (manager as any).state.audioContext;
            if (mockContext) {
                mockContext.createBufferSource = vi.fn().mockImplementation(() => {
                    throw new Error('Source creation failed');
                });
            }

            // Mock that sound is loaded
            (manager as any).state.soundBuffers.set('test_sound', {
                length: 1000,
                sampleRate: 44100
            });

            // Should not throw
            expect(() => manager.playSound('test_sound')).not.toThrow();

            // Verify that error was logged
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to create audio source:', expect.any(Error));

            // Restore console.error
            consoleErrorSpy.mockRestore();
        });
    });
});