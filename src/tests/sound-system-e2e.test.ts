import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performance } from 'perf_hooks';

// Import all sound system components for end-to-end testing
import { WebAudioManager, HTML5AudioManager, SilentAudioManager, createAudioManager } from '../audio/managers/audio-manager';
import { SOUND_ASSETS, SOUND_CONFIG, SOUND_IDS } from '../audio/config/sound-config';
import {
    mapPlayerMovementToSound,
    mapGameStateChangeToSound,
    generatePlayerMoveEvents,
    mapSoundEventToId
} from '../audio/events/sound-event-mapper';
import {
    createSoundEventEmitter,
    getSoundEventEmitter,
    emitSoundEvent,
    emitSoundEvents
} from '../audio/events/sound-event-emitter';
import { CELL } from '../maze';
import type { SoundEvent, PlaySoundOptions } from '../Interfaces/ISoundEvent';
import type { AudioManager } from '../Interfaces/IAudioManager';

// Comprehensive mock setup for E2E tests
class E2EMockAudioContext {
    state: 'suspended' | 'running' | 'closed' = 'running';
    currentTime = 0;
    destination = { connect: vi.fn() };
    sampleRate = 44100;

    private stateChangeListeners: Array<() => void> = [];
    private gainNodes: Array<any> = [];
    private bufferSources: Array<any> = [];
    private buffers: Map<string, any> = new Map();

    createGain() {
        const gainNode = {
            gain: {
                value: 1,
                setValueAtTime: vi.fn(),
                linearRampToValueAtTime: vi.fn(),
                exponentialRampToValueAtTime: vi.fn()
            },
            connect: vi.fn(),
            disconnect: vi.fn()
        };
        this.gainNodes.push(gainNode);
        return gainNode;
    }

    createBufferSource() {
        const source = {
            buffer: null,
            loop: false,
            playbackRate: { value: 1 },
            connect: vi.fn(),
            start: vi.fn().mockImplementation(() => {
                // Mark this source as started when start() is called
                (source as any)._started = true;
            }),
            stop: vi.fn(),
            disconnect: vi.fn(),
            onended: null as (() => void) | null,
            addEventListener: vi.fn((event: string, callback: () => void) => {
                if (event === 'ended') {
                    this.onended = callback;
                }
            }),
            removeEventListener: vi.fn()
        };
        this.bufferSources.push(source);
        return source;
    }

    createBuffer(numberOfChannels: number, length: number, sampleRate: number) {
        const buffer = {
            numberOfChannels,
            length,
            sampleRate,
            duration: length / sampleRate,
            getChannelData: vi.fn().mockReturnValue(new Float32Array(length)),
            copyFromChannel: vi.fn(),
            copyToChannel: vi.fn()
        };
        return buffer;
    }

    decodeAudioData(arrayBuffer: ArrayBuffer) {
        const buffer = this.createBuffer(2, 44100, 44100);
        return Promise.resolve(buffer);
    }

    resume() {
        this.state = 'running';
        this.stateChangeListeners.forEach(listener => listener());
        return Promise.resolve();
    }

    suspend() {
        this.state = 'suspended';
        this.stateChangeListeners.forEach(listener => listener());
        return Promise.resolve();
    }

    close() {
        this.state = 'closed';
        this.stateChangeListeners.forEach(listener => listener());
        return Promise.resolve();
    }

    addEventListener(event: string, callback: () => void) {
        if (event === 'statechange') {
            this.stateChangeListeners.push(callback);
        }
    }

    removeEventListener(event: string, callback: () => void) {
        if (event === 'statechange') {
            const index = this.stateChangeListeners.indexOf(callback);
            if (index > -1) {
                this.stateChangeListeners.splice(index, 1);
            }
        }
    }

    // E2E test utilities
    getPlayedSounds() {
        return this.bufferSources.filter(source => (source as any)._started === true);
    }

    getGainNodes() {
        return this.gainNodes;
    }

    simulateAudioContextSuspension() {
        this.state = 'suspended';
        this.stateChangeListeners.forEach(listener => listener());
    }

    simulateUserGesture() {
        if (this.state === 'suspended') {
            this.resume();
        }
    }
}

class E2EMockAudio {
    src = '';
    volume = 1;
    loop = false;
    currentTime = 0;
    duration = 1;
    ended = false;
    paused = true;
    readyState = 4;

    private eventListeners: Record<string, Function[]> = {};
    private static instances: E2EMockAudio[] = [];

    constructor() {
        E2EMockAudio.instances.push(this);
    }

    play() {
        this.paused = false;
        this.ended = false;
        return Promise.resolve();
    }

    pause() {
        this.paused = true;
    }

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

    static getAllInstances() {
        return E2EMockAudio.instances;
    }

    static clearInstances() {
        E2EMockAudio.instances = [];
    }
}

// Mock fetch with realistic network simulation
const createE2EMockFetch = (networkDelay = 10, failureRate = 0) => {
    return vi.fn((url: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < failureRate) {
                    reject(new Error('Network error'));
                } else if (typeof url === 'string' && url.includes('.ogg')) {
                    resolve({
                        ok: false,
                        status: 404,
                        statusText: 'Not Found'
                    });
                } else {
                    resolve({
                        ok: true,
                        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000))
                    });
                }
            }, networkDelay);
        });
    });
};

// Mock localStorage with realistic behavior
const createE2EMockLocalStorage = () => {
    const storage: Record<string, string> = {};

    return {
        getItem: vi.fn((key: string) => storage[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            storage[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete storage[key];
        }),
        clear: vi.fn(() => {
            Object.keys(storage).forEach(key => delete storage[key]);
        }),
        getStorage: () => ({ ...storage })
    };
};

describe('4. End-to-End Tests for Complete Sound Workflows', () => {
    let mockAudioContext: E2EMockAudioContext;
    let mockLocalStorage: ReturnType<typeof createE2EMockLocalStorage>;
    let mockFetch: ReturnType<typeof createE2EMockFetch>;

    beforeEach(() => {
        vi.clearAllMocks();

        mockAudioContext = new E2EMockAudioContext();
        mockLocalStorage = createE2EMockLocalStorage();
        mockFetch = createE2EMockFetch();

        global.AudioContext = vi.fn(() => mockAudioContext) as any;
        (global as any).webkitAudioContext = global.AudioContext;
        global.Audio = vi.fn(() => new E2EMockAudio()) as any;
        global.fetch = mockFetch;

        Object.defineProperty(global, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });

        global.performance = performance;
        E2EMockAudio.clearInstances();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Complete Game Sound Workflow', () => {
        it('should handle complete player movement workflow', async () => {
            // 1. Initialize audio system
            const audioManager = createAudioManager();
            expect(audioManager).toBeInstanceOf(WebAudioManager);

            // 2. Preload sounds
            await audioManager.preloadSounds();
            expect(mockFetch).toHaveBeenCalled();

            // 3. Set up sound event system
            const emitter = getSoundEventEmitter();
            const playedSounds: Array<{ id: string; event: SoundEvent }> = [];

            emitter.setCallback((soundId: string, event: SoundEvent) => {
                playedSounds.push({ id: soundId, event });
                audioManager.playSound(soundId, { volume: event.volume });
            });

            // 4. Simulate player movement sequence
            const movementSequence = [
                { from: CELL.EMPTY, to: CELL.EMPTY }, // Walk
                { from: CELL.EMPTY, to: CELL.SOIL },  // Dig
                { from: CELL.SOIL, to: CELL.DIAMOND }, // Walk and collect
                { from: CELL.DIAMOND, to: CELL.EXIT }  // Walk to exit
            ];

            movementSequence.forEach(({ from, to }) => {
                const events = generatePlayerMoveEvents(from, to, 'playing', 'playing', 5);
                emitter.emitMultiple(events);
            });

            // 5. Verify complete workflow
            expect(playedSounds.length).toBeGreaterThan(movementSequence.length);
            expect(playedSounds.some(s => s.id === SOUND_IDS.PLAYER_WALK)).toBe(true);
            expect(playedSounds.some(s => s.id === SOUND_IDS.PLAYER_DIG)).toBe(true);
            expect(playedSounds.some(s => s.id === SOUND_IDS.DIAMOND_COLLECT)).toBe(true);

            // 6. Cleanup
            audioManager.cleanup();
        });

        it('should handle complete game state transition workflow', async () => {
            const audioManager = createAudioManager();
            await audioManager.preloadSounds();

            const emitter = getSoundEventEmitter();
            const gameEvents: string[] = [];

            emitter.setCallback((soundId: string) => {
                gameEvents.push(soundId);
                audioManager.playSound(soundId);
            });

            // Simulate complete game: start -> play -> collect diamonds -> win
            const gameStates = [
                { from: 'playing', to: 'playing', cell: CELL.EMPTY },
                { from: 'playing', to: 'playing', cell: CELL.DIAMOND },
                { from: 'playing', to: 'won', cell: CELL.EXIT }
            ];

            gameStates.forEach(({ from, to, cell }) => {
                const events = generatePlayerMoveEvents(CELL.EMPTY, cell, to as any, from as any, 0);
                emitter.emitMultiple(events);
            });

            expect(gameEvents).toContain(SOUND_IDS.DIAMOND_COLLECT);
            expect(gameEvents).toContain(SOUND_IDS.DOOR_SLAM);
            expect(gameEvents).toContain(SOUND_IDS.VICTORY_SOUND);

            audioManager.cleanup();
        });

        it('should handle death scenario workflow', async () => {
            const audioManager = createAudioManager();
            await audioManager.preloadSounds();

            const emitter = getSoundEventEmitter();
            const deathSequence: string[] = [];

            emitter.setCallback((soundId: string) => {
                deathSequence.push(soundId);
                audioManager.playSound(soundId);
            });

            // Simulate player death
            const deathEvents = generatePlayerMoveEvents(CELL.EMPTY, CELL.BOMB, 'dead', 'playing', 3);
            emitter.emitMultiple(deathEvents);

            expect(deathSequence).toContain(SOUND_IDS.PLAYER_WALK);
            expect(deathSequence).toContain(SOUND_IDS.DEATH_SOUND);

            // Should stop all sounds after death
            audioManager.stopAllSounds();

            audioManager.cleanup();
        });
    });

    describe('Audio Manager Fallback Workflow', () => {
        it('should gracefully fallback from WebAudio to HTML5 to Silent', async () => {
            // Test WebAudio failure -> HTML5 fallback
            // Completely remove WebAudio support
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            let manager = createAudioManager();
            expect(manager).toBeInstanceOf(HTML5AudioManager);
            expect(manager.isSupported()).toBe(true);

            // Test HTML5 failure -> Silent fallback
            delete (global as any).Audio;

            manager = createAudioManager();
            expect(manager).toBeInstanceOf(SilentAudioManager);
            expect(manager.isSupported()).toBe(false);

            // Silent manager should handle all operations gracefully
            await expect(manager.preloadSounds()).resolves.toBeUndefined();
            expect(() => manager.playSound('test')).not.toThrow();
            expect(() => manager.setMuted(true)).not.toThrow();
            expect(() => manager.cleanup()).not.toThrow();
        });

        it('should handle audio context suspension and recovery workflow', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Simulate autoplay policy suspension
            mockAudioContext.simulateAudioContextSuspension();
            expect(mockAudioContext.state).toBe('suspended');

            // Simulate user gesture to resume
            mockAudioContext.simulateUserGesture();
            expect(mockAudioContext.state).toBe('running');

            // Should be able to play sounds after resume
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set('test_sound', mockBuffer);

            expect(() => manager.playSound('test_sound')).not.toThrow();

            manager.cleanup();
        });
    });

    describe('Settings Persistence Workflow', () => {
        it('should persist and restore audio settings across sessions', async () => {
            // Session 1: Set preferences
            let manager = new WebAudioManager();
            manager.setMuted(true);

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wanderer-audio-muted', 'true');
            expect(mockLocalStorage.getStorage()['wanderer-audio-muted']).toBe('true');

            manager.cleanup();

            // Session 2: Restore preferences
            manager = new WebAudioManager();
            expect(manager.isMuted()).toBe(true);

            manager.cleanup();
        });

        it('should handle settings corruption gracefully', async () => {
            // Corrupt localStorage data
            mockLocalStorage.getItem.mockImplementation((key: string) => {
                if (key === 'wanderer-audio-muted') {
                    return 'invalid-json-data';
                }
                return null;
            });

            const manager = new WebAudioManager();

            // Should use default values for corrupted data
            expect(manager.isMuted()).toBe(false);

            manager.cleanup();
        });
    });

    describe('Performance Under Load Workflow', () => {
        it('should handle intensive sound event workflow efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock all sounds as loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const emitter = getSoundEventEmitter();
            const performanceMetrics: number[] = [];

            emitter.setCallback((soundId: string) => {
                const start = performance.now();
                manager.playSound(soundId);
                const end = performance.now();
                performanceMetrics.push(end - start);
            });

            // Generate intensive sound event sequence
            const startTime = performance.now();

            for (let i = 0; i < 100; i++) {
                const events = generatePlayerMoveEvents(
                    CELL.EMPTY,
                    CELL.DIAMOND,
                    'playing',
                    'playing',
                    5
                );
                emitter.emitMultiple(events);
            }

            const totalTime = performance.now() - startTime;

            // Should handle intensive workflow efficiently
            expect(totalTime).toBeLessThan(500); // Less than 500ms for 100 sequences

            const avgPlayTime = performanceMetrics.reduce((a, b) => a + b, 0) / performanceMetrics.length;
            expect(avgPlayTime).toBeLessThan(5); // Less than 5ms per sound

            manager.cleanup();
        });

        it('should maintain performance during concurrent operations', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock sounds as loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const startTime = performance.now();

            // Simulate concurrent operations
            const operations = [];
            for (let i = 0; i < 50; i++) {
                operations.push(new Promise<void>(resolve => {
                    setTimeout(() => {
                        manager.playSound(SOUND_IDS.PLAYER_WALK);
                        manager.setMuted(i % 2 === 0);
                        resolve();
                    }, Math.random() * 10);
                }));
            }

            await Promise.all(operations);

            const concurrentTime = performance.now() - startTime;
            expect(concurrentTime).toBeLessThan(200);

            manager.cleanup();
        });
    });

    describe('Error Recovery Workflow', () => {
        it('should recover from network failures during preloading', async () => {
            // Set up intermittent network failures
            mockFetch = createE2EMockFetch(10, 0.3); // 30% failure rate
            global.fetch = mockFetch;

            const manager = new WebAudioManager();

            // Should handle network failures gracefully
            await expect(manager.preloadSounds()).resolves.toBeUndefined();

            // Should still be functional despite some failed loads
            expect(manager.isSupported()).toBe(true);
            expect(() => manager.playSound('test_sound')).not.toThrow();

            manager.cleanup();
        });

        it('should handle audio decoding failures and continue operation', async () => {
            const manager = new WebAudioManager();

            // Mock decoding to fail for some sounds
            let decodeCallCount = 0;
            mockAudioContext.decodeAudioData = vi.fn().mockImplementation(() => {
                decodeCallCount++;
                if (decodeCallCount % 3 === 0) {
                    return Promise.reject(new Error('Decode failed'));
                }
                return Promise.resolve(mockAudioContext.createBuffer(2, 44100, 44100));
            });

            // Should handle decode failures gracefully
            await expect(manager.preloadSounds()).resolves.toBeUndefined();

            // Should still be functional
            expect(manager.isSupported()).toBe(true);

            manager.cleanup();
        });

        it('should handle localStorage failures and continue operation', async () => {
            // Mock localStorage to fail intermittently
            let setItemCallCount = 0;
            mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
                setItemCallCount++;
                if (setItemCallCount % 2 === 0) {
                    throw new Error('Storage quota exceeded');
                }
                // Otherwise succeed silently
            });

            const manager = new WebAudioManager();

            // Should handle storage failures gracefully
            expect(() => manager.setMuted(true)).not.toThrow();
            expect(() => manager.setMuted(false)).not.toThrow();
            expect(() => manager.setMuted(true)).not.toThrow();

            // Should still function normally
            expect(manager.isSupported()).toBe(true);

            manager.cleanup();
        });
    });

    describe('Memory Management Workflow', () => {
        it('should properly cleanup resources in complete workflow', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Ensure we have a valid sound buffer to work with
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);

            // Mock the sound as loaded in the manager's internal state
            // The WebAudioManager stores buffers in state.soundBuffers
            if ((manager as any).state && (manager as any).state.soundBuffers) {
                (manager as any).state.soundBuffers.set(SOUND_IDS.PLAYER_WALK, mockBuffer);
            }

            // Also ensure the sound is marked as loaded
            if ((manager as any).state && (manager as any).state.loadedSounds) {
                (manager as any).state.loadedSounds.add(SOUND_IDS.PLAYER_WALK);
            }

            // Clear any existing buffer sources to get accurate count
            mockAudioContext.bufferSources = [];

            // Play multiple sounds
            for (let i = 0; i < 10; i++) {
                manager.playSound(SOUND_IDS.PLAYER_WALK);
            }

            const playedSounds = mockAudioContext.getPlayedSounds();
            expect(playedSounds.length).toBe(10);

            // Simulate sound completion
            playedSounds.forEach(source => {
                if (source.onended) {
                    source.onended();
                }
            });

            // Cleanup should disconnect all nodes
            manager.cleanup();

            const gainNodes = mockAudioContext.getGainNodes();
            gainNodes.forEach(node => {
                expect(node.disconnect).toHaveBeenCalled();
            });
        });

        it('should handle memory pressure gracefully', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Simulate memory pressure by creating many audio sources
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set('test_sound', mockBuffer);

            // Create many concurrent sounds
            for (let i = 0; i < 100; i++) {
                manager.playSound('test_sound');
            }

            // Should handle high memory usage without crashing
            expect(mockAudioContext.getPlayedSounds().length).toBe(100);

            // Cleanup should handle all sources
            expect(() => manager.cleanup()).not.toThrow();
        });
    });

    describe('Cross-Browser Compatibility Workflow', () => {
        it('should handle webkit prefixed AudioContext', async () => {
            delete (global as any).AudioContext;
            (global as any).webkitAudioContext = vi.fn(() => mockAudioContext);

            const manager = new WebAudioManager();
            expect(manager.isSupported()).toBe(true);

            await expect(manager.preloadSounds()).resolves.toBeUndefined();

            manager.cleanup();
        });

        it('should handle different audio format support', async () => {
            // Mock Audio with limited format support
            global.Audio = vi.fn(() => {
                const audio = new E2EMockAudio();
                audio.canPlayType = vi.fn((type: string) => {
                    if (type === 'audio/mpeg') return 'probably';
                    return ''; // No support for other formats
                });
                return audio;
            }) as any;

            // Remove WebAudio support to force HTML5 fallback
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            const manager = createAudioManager();
            expect(manager).toBeInstanceOf(HTML5AudioManager);

            await expect(manager.preloadSounds()).resolves.toBeUndefined();

            manager.cleanup();
        });
    });

    describe('Integration with Game Events Workflow', () => {
        it('should integrate with complete game event sequence', async () => {
            const audioManager = createAudioManager();
            await audioManager.preloadSounds();

            const emitter = getSoundEventEmitter();
            const gameEventLog: Array<{ event: string; soundId: string; timestamp: number }> = [];

            emitter.setCallback((soundId: string, event: SoundEvent) => {
                gameEventLog.push({
                    event: event.type,
                    soundId,
                    timestamp: performance.now()
                });
                audioManager.playSound(soundId, { volume: event.volume });
            });

            // Simulate complete game sequence
            const gameSequence = [
                // Game start - player moves
                () => {
                    const events = generatePlayerMoveEvents(CELL.EMPTY, CELL.EMPTY, 'playing', 'playing', 10);
                    emitter.emitMultiple(events);
                },
                // Collect diamonds
                () => {
                    const events = generatePlayerMoveEvents(CELL.EMPTY, CELL.DIAMOND, 'playing', 'playing', 5);
                    emitter.emitMultiple(events);
                },
                // More movement
                () => {
                    const events = generatePlayerMoveEvents(CELL.EMPTY, CELL.SOIL, 'playing', 'playing', 3);
                    emitter.emitMultiple(events);
                },
                // Win the game
                () => {
                    const events = generatePlayerMoveEvents(CELL.EMPTY, CELL.EXIT, 'won', 'playing', 0);
                    emitter.emitMultiple(events);
                }
            ];

            // Execute game sequence with timing
            for (const step of gameSequence) {
                step();
                await new Promise(resolve => setTimeout(resolve, 10));
            }

            // Verify complete game event integration
            expect(gameEventLog.length).toBeGreaterThan(5);
            expect(gameEventLog.some(e => e.event === 'movement')).toBe(true);
            expect(gameEventLog.some(e => e.event === 'collection')).toBe(true);
            expect(gameEventLog.some(e => e.event === 'victory')).toBe(true);
            expect(gameEventLog.some(e => e.soundId === SOUND_IDS.PLAYER_WALK)).toBe(true);
            expect(gameEventLog.some(e => e.soundId === SOUND_IDS.DIAMOND_COLLECT)).toBe(true);
            expect(gameEventLog.some(e => e.soundId === SOUND_IDS.VICTORY_SOUND)).toBe(true);

            // Events should be properly timed
            const timestamps = gameEventLog.map(e => e.timestamp);
            for (let i = 1; i < timestamps.length; i++) {
                expect(timestamps[i]!).toBeGreaterThanOrEqual(timestamps[i - 1]!);
            }

            audioManager.cleanup();
        });
    });
});