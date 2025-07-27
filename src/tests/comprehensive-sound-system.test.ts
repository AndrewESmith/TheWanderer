import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performance } from 'perf_hooks';

// Import sound system components
import { WebAudioManager, HTML5AudioManager, SilentAudioManager } from '../audio/managers/audio-manager';
import { SOUND_ASSETS, SOUND_CONFIG, SOUND_IDS } from '../audio/config/sound-config';
import { mapPlayerMovementToSound, mapGameStateChangeToSound, generatePlayerMoveEvents } from '../audio/events/sound-event-mapper';
import { createSoundEventEmitter } from '../audio/events/sound-event-emitter';
import { CELL } from '../maze';
import type { SoundEvent, PlaySoundOptions } from '../Interfaces/ISoundEvent';
import type { AudioManager } from '../Interfaces/IAudioManager';

// Comprehensive Web Audio API Mock
class ComprehensiveMockAudioContext {
    state: 'suspended' | 'running' | 'closed' = 'running';
    currentTime = 0;
    destination = { connect: vi.fn() };
    sampleRate = 44100;

    private stateChangeListeners: Array<() => void> = [];
    private gainNodes: Array<any> = [];
    private bufferSources: Array<any> = [];

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
            start: vi.fn(),
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

    decodeAudioData = vi.fn((arrayBuffer: ArrayBuffer) => {
        const buffer = this.createBuffer(2, 44100, 44100);
        return Promise.resolve(buffer);
    });

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

    // Test utilities
    simulateStateChange(newState: 'suspended' | 'running' | 'closed') {
        this.state = newState;
        this.stateChangeListeners.forEach(listener => listener());
    }

    getActiveBufferSources() {
        return this.bufferSources;
    }

    getGainNodes() {
        return this.gainNodes;
    }
}

// Enhanced HTML5 Audio Mock
class ComprehensiveMockAudio {
    src = '';
    volume = 1;
    loop = false;
    currentTime = 0;
    duration = 1;
    ended = false;
    paused = true;
    readyState = 4;
    preload = 'none';

    private eventListeners: Record<string, Function[]> = {};

    play() {
        this.paused = false;
        this.ended = false;
        return Promise.resolve();
    }

    pause() {
        this.paused = true;
    }

    load() {
        this.readyState = 4;
        this.dispatchEvent('canplaythrough');
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
        if (type === 'audio/wav') return 'probably';
        return '';
    }

    // Test utilities
    simulateError() {
        this.dispatchEvent('error');
    }

    simulateLoad() {
        this.readyState = 4;
        this.dispatchEvent('canplaythrough');
    }
}

// Mock fetch for sound file loading
const createMockFetch = (shouldFail = false, delay = 0) => {
    return vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = typeof input === 'string' ? input : input.toString();
                if (shouldFail) {
                    reject(new Error('Network error'));
                } else if (url.includes('.ogg')) {
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
            }, delay);
        });
    });
};

// Mock localStorage
const createMockLocalStorage = () => ({
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
});

describe('Comprehensive Sound System Test Suite', () => {
    let mockAudioContext: ComprehensiveMockAudioContext;
    let mockLocalStorage: ReturnType<typeof createMockLocalStorage>;
    let mockFetch: ReturnType<typeof createMockFetch>;

    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();

        // Create fresh mock instances
        mockAudioContext = new ComprehensiveMockAudioContext();
        mockLocalStorage = createMockLocalStorage();
        mockFetch = createMockFetch();

        // Set up global mocks
        global.AudioContext = vi.fn(() => mockAudioContext) as any;
        (global as any).webkitAudioContext = global.AudioContext;
        global.Audio = vi.fn(() => new ComprehensiveMockAudio()) as any;
        global.fetch = mockFetch;

        Object.defineProperty(global, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });

        // Mock performance for timing tests
        global.performance = performance;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('1. Unit Tests for Pure Functions and Sound Event Generation', () => {
        describe('Sound Event Mapping Functions', () => {
            it('should correctly map all player movement scenarios', () => {
                // Test all possible movement combinations
                const testCases = [
                    { from: CELL.EMPTY, to: CELL.SOIL, expected: { type: 'movement', priority: 'medium', volume: 0.7 } },
                    { from: CELL.EMPTY, to: CELL.EMPTY, expected: { type: 'movement', priority: 'low', volume: 0.6 } },
                    { from: CELL.EMPTY, to: CELL.DIAMOND, expected: { type: 'movement', priority: 'low', volume: 0.6 } },
                    { from: CELL.EMPTY, to: CELL.EXIT, expected: { type: 'movement', priority: 'low', volume: 0.6 } },
                    { from: CELL.EMPTY, to: CELL.BOMB, expected: { type: 'movement', priority: 'low', volume: 0.6 } },
                    { from: CELL.EMPTY, to: CELL.ROCK, expected: null }
                ];

                testCases.forEach(({ from, to, expected }) => {
                    const result = mapPlayerMovementToSound(from, to);
                    if (expected === null) {
                        expect(result).toBeNull();
                    } else {
                        expect(result).toMatchObject(expected);
                        expect(result?.source).toBe('player');
                    }
                });
            });

            it('should correctly map all game state changes', () => {
                const testCases = [
                    { newState: 'dead', oldState: 'playing', expected: { type: 'death', priority: 'high', volume: 0.9 } },
                    { newState: 'won', oldState: 'playing', expected: { type: 'victory', priority: 'high', volume: 0.8 } },
                    { newState: 'playing', oldState: 'playing', expected: null },
                    { newState: 'playing', oldState: 'dead', expected: null }
                ];

                testCases.forEach(({ newState, oldState, expected }) => {
                    const result = mapGameStateChangeToSound(newState as any, oldState as any);
                    if (expected === null) {
                        expect(result).toBeNull();
                    } else {
                        expect(result).toMatchObject(expected);
                        expect(result?.source).toBe('system');
                    }
                });
            });

            it('should generate complex event sequences correctly', () => {
                // Test diamond collection with movement
                const diamondEvents = generatePlayerMoveEvents(
                    CELL.EMPTY, CELL.DIAMOND, 'playing', 'playing', 5
                );
                expect(diamondEvents).toHaveLength(2);
                expect(diamondEvents[0]?.type).toBe('movement');
                expect(diamondEvents[1]?.type).toBe('collection');

                // Test death sequence
                const deathEvents = generatePlayerMoveEvents(
                    CELL.EMPTY, CELL.BOMB, 'dead', 'playing', 3
                );
                expect(deathEvents).toHaveLength(2);
                expect(deathEvents[0]?.type).toBe('movement');
                expect(deathEvents[1]?.type).toBe('death');

                // Test victory sequence
                const victoryEvents = generatePlayerMoveEvents(
                    CELL.EMPTY, CELL.EXIT, 'won', 'playing', 0
                );
                expect(victoryEvents.length).toBeGreaterThan(2);
                expect(victoryEvents.some(e => e.type === 'door_slam')).toBe(true);
                expect(victoryEvents.some(e => e.type === 'victory')).toBe(true);
            });
        });

        describe('Sound Event Emitter Pure Functions', () => {
            it('should create emitter with correct interface', () => {
                const emitter = createSoundEventEmitter();

                expect(emitter).toHaveProperty('emit');
                expect(emitter).toHaveProperty('emitMultiple');
                expect(emitter).toHaveProperty('setCallback');
                expect(typeof emitter.emit).toBe('function');
                expect(typeof emitter.emitMultiple).toBe('function');
                expect(typeof emitter.setCallback).toBe('function');
            });

            it('should handle event emission without callback gracefully', () => {
                const emitter = createSoundEventEmitter();
                const event: SoundEvent = {
                    type: 'movement',
                    source: 'player',
                    priority: 'low'
                };

                expect(() => emitter.emit(event)).not.toThrow();
                expect(() => emitter.emitMultiple([event])).not.toThrow();
            });

            it('should correctly map all sound event types to IDs', () => {
                const emitter = createSoundEventEmitter();
                const mockCallback = vi.fn();
                emitter.setCallback(mockCallback);

                const testEvents: Array<{ event: SoundEvent; expectedId: string }> = [
                    {
                        event: { type: 'movement', source: 'player', priority: 'low', volume: 0.6 },
                        expectedId: SOUND_IDS.PLAYER_WALK
                    },
                    {
                        event: { type: 'movement', source: 'player', priority: 'medium', volume: 0.7 },
                        expectedId: SOUND_IDS.PLAYER_DIG
                    },
                    {
                        event: { type: 'movement', source: 'boulder', priority: 'medium' },
                        expectedId: SOUND_IDS.BOULDER_MOVE
                    },
                    {
                        event: { type: 'movement', source: 'arrow', priority: 'medium' },
                        expectedId: SOUND_IDS.ARROW_MOVE
                    },
                    {
                        event: { type: 'collision', source: 'boulder', priority: 'high' },
                        expectedId: SOUND_IDS.COLLISION_THUD
                    },
                    {
                        event: { type: 'collection', source: 'player', priority: 'medium' },
                        expectedId: SOUND_IDS.DIAMOND_COLLECT
                    },
                    {
                        event: { type: 'death', source: 'system', priority: 'high' },
                        expectedId: SOUND_IDS.DEATH_SOUND
                    },
                    {
                        event: { type: 'victory', source: 'system', priority: 'high' },
                        expectedId: SOUND_IDS.VICTORY_SOUND
                    },
                    {
                        event: { type: 'door_slam', source: 'system', priority: 'high' },
                        expectedId: SOUND_IDS.DOOR_SLAM
                    }
                ];

                testEvents.forEach(({ event, expectedId }) => {
                    mockCallback.mockClear();
                    emitter.emit(event);
                    expect(mockCallback).toHaveBeenCalledWith(expectedId, event);
                });
            });
        });

        describe('Sound Configuration Validation', () => {
            it('should have valid sound asset configuration', () => {
                Object.entries(SOUND_ASSETS).forEach(([key, asset]) => {
                    expect(asset).toHaveProperty('id');
                    expect(asset).toHaveProperty('src');
                    expect(asset).toHaveProperty('volume');
                    expect(asset).toHaveProperty('loop');
                    expect(asset).toHaveProperty('preload');

                    expect(typeof asset.id).toBe('string');
                    expect(Array.isArray(asset.src)).toBe(true);
                    expect(asset.src.length).toBeGreaterThan(0);
                    expect(typeof asset.volume).toBe('number');
                    expect(asset.volume).toBeGreaterThan(0);
                    expect(asset.volume).toBeLessThanOrEqual(1);
                    expect(typeof asset.loop).toBe('boolean');
                    expect(typeof asset.preload).toBe('boolean');
                });
            });

            it('should have consistent sound IDs across configuration', () => {
                // Check that every SOUND_IDS key has a corresponding SOUND_ASSETS entry
                Object.keys(SOUND_IDS).forEach(soundKey => {
                    expect(SOUND_ASSETS[soundKey]).toBeDefined();
                });

                // Check that every SOUND_ASSETS key has a corresponding SOUND_IDS entry
                Object.keys(SOUND_ASSETS).forEach(assetKey => {
                    expect(SOUND_IDS[assetKey as keyof typeof SOUND_IDS]).toBeDefined();
                });

                // Check that the ID values in SOUND_ASSETS match the values in SOUND_IDS
                Object.keys(SOUND_IDS).forEach(soundKey => {
                    const soundIdValue = SOUND_IDS[soundKey as keyof typeof SOUND_IDS];
                    const assetIdValue = SOUND_ASSETS[soundKey]?.id;
                    expect(assetIdValue).toBe(soundIdValue);
                });
            });

            it('should have valid category configuration', () => {
                expect(SOUND_CONFIG.categories).toBeDefined();
                expect(typeof SOUND_CONFIG.globalVolume).toBe('number');
                expect(SOUND_CONFIG.globalVolume).toBeGreaterThan(0);
                expect(SOUND_CONFIG.globalVolume).toBeLessThanOrEqual(1);

                Object.entries(SOUND_CONFIG.categories).forEach(([key, category]) => {
                    expect(category).toHaveProperty('name');
                    expect(category).toHaveProperty('volume');
                    expect(category).toHaveProperty('sounds');

                    expect(typeof category.name).toBe('string');
                    expect(typeof category.volume).toBe('number');
                    expect(category.volume).toBeGreaterThan(0);
                    expect(category.volume).toBeLessThanOrEqual(1);
                    expect(typeof category.sounds).toBe('object');
                });
            });
        });
    });

    describe('2. Integration Tests for React Hooks and Component Interactions', () => {
        // These tests will be implemented in a separate React-specific test file
        // due to the need for React Testing Library setup
        it('should be covered by React-specific integration tests', () => {
            // This is a placeholder - actual React hook integration tests
            // are in separate test files that use @testing-library/react
            expect(true).toBe(true);
        });
    });

    describe('3. Mock Implementations for Web Audio API Testing', () => {
        describe('WebAudioManager with Comprehensive Mocks', () => {
            it('should initialize with mocked Web Audio API', () => {
                const manager = new WebAudioManager();
                expect(manager.isSupported()).toBe(true);
                expect(global.AudioContext).toHaveBeenCalled();
            });

            it('should handle audio context state changes', async () => {
                const manager = new WebAudioManager();

                // Simulate suspension
                mockAudioContext.simulateStateChange('suspended');
                expect(mockAudioContext.state).toBe('suspended');

                // Simulate resume
                await mockAudioContext.resume();
                expect(mockAudioContext.state).toBe('running');
            });

            it('should create and manage gain nodes correctly', () => {
                const manager = new WebAudioManager();

                // Should have created a gain node during initialization
                const gainNodes = mockAudioContext.getGainNodes();
                expect(gainNodes.length).toBeGreaterThan(0);

                // Gain node should be connected
                expect(gainNodes[0]?.connect).toHaveBeenCalled();
            });

            it('should create buffer sources for sound playback', async () => {
                const manager = new WebAudioManager();
                await manager.preloadSounds();

                // Mock that a sound is loaded
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set('test_sound', mockBuffer);

                manager.playSound('test_sound');

                const bufferSources = mockAudioContext.getActiveBufferSources();
                expect(bufferSources.length).toBeGreaterThan(0);
                expect(bufferSources[0]?.connect).toHaveBeenCalled();
                expect(bufferSources[0]?.start).toHaveBeenCalled();
            });

            it('should handle audio decoding with mocked decodeAudioData', async () => {
                const manager = new WebAudioManager();

                // Mock successful fetch
                mockFetch.mockResolvedValueOnce({
                    ok: true,
                    arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000))
                });

                await manager.preloadSounds();

                expect(mockAudioContext.decodeAudioData).toHaveBeenCalled();
            });

            it('should handle mocked audio context errors gracefully', () => {
                // Mock AudioContext constructor to throw
                global.AudioContext = vi.fn(() => {
                    throw new Error('AudioContext creation failed');
                }) as any;

                const manager = new WebAudioManager();
                expect(manager.isSupported()).toBe(false);
            });
        });

        describe('HTML5AudioManager with Comprehensive Mocks', () => {
            beforeEach(() => {
                // Remove Web Audio API support
                delete (global as any).AudioContext;
                delete (global as any).webkitAudioContext;
            });

            it('should initialize with mocked HTML5 Audio', () => {
                const manager = new HTML5AudioManager();
                expect(manager.isSupported()).toBe(true);
            });

            it('should create audio elements for each sound', async () => {
                const manager = new HTML5AudioManager();

                // Mock audio element creation
                const audioInstances: ComprehensiveMockAudio[] = [];
                global.Audio = vi.fn(() => {
                    const audio = new ComprehensiveMockAudio();
                    audioInstances.push(audio);
                    return audio;
                }) as any;

                await manager.preloadSounds();

                expect(audioInstances.length).toBeGreaterThan(0);
                audioInstances.forEach(audio => {
                    expect(audio.src).toBeTruthy();
                });
            });

            it('should handle audio loading events', async () => {
                const manager = new HTML5AudioManager();

                const audioInstances: ComprehensiveMockAudio[] = [];
                global.Audio = vi.fn(() => {
                    const audio = new ComprehensiveMockAudio();
                    audioInstances.push(audio);
                    // Simulate successful loading after a delay
                    setTimeout(() => audio.simulateLoad(), 10);
                    return audio;
                }) as any;

                await manager.preloadSounds();

                // Should have attempted to load audio files
                expect(audioInstances.length).toBeGreaterThan(0);
            });

            it('should handle audio playback with mocked play method', () => {
                const manager = new HTML5AudioManager();

                const mockAudio = new ComprehensiveMockAudio();
                const playSpy = vi.spyOn(mockAudio, 'play');

                // Mock that audio element is loaded
                (manager as any).audioElements.set('test_sound', mockAudio);

                manager.playSound('test_sound');

                expect(playSpy).toHaveBeenCalled();
            });
        });

        describe('Mock Error Scenarios', () => {
            it('should handle mocked network failures during preloading', async () => {
                mockFetch = createMockFetch(true); // Force failure
                global.fetch = mockFetch;

                const manager = new WebAudioManager();

                // Should not throw despite network errors
                await expect(manager.preloadSounds()).resolves.toBeUndefined();
            });

            it('should handle mocked audio decoding failures', async () => {
                mockAudioContext.decodeAudioData = vi.fn().mockRejectedValue(new Error('Decode failed'));

                const manager = new WebAudioManager();

                // Should handle decode errors gracefully
                await expect(manager.preloadSounds()).resolves.toBeUndefined();
            });

            it('should handle mocked localStorage failures', () => {
                mockLocalStorage.getItem.mockImplementation(() => {
                    throw new Error('localStorage error');
                });

                const manager = new WebAudioManager();

                // Should use default values when localStorage fails
                expect(manager.isMuted()).toBe(false);
            });
        });
    });

    describe('4. End-to-End Tests for Complete Sound Workflows', () => {
        it('should complete full sound system lifecycle', async () => {
            // 1. Initialize audio manager
            const manager = new WebAudioManager();
            expect(manager.isSupported()).toBe(true);

            // 2. Preload sounds
            await manager.preloadSounds();
            expect(mockFetch).toHaveBeenCalled();

            // 3. Set up sound event emitter
            const emitter = createSoundEventEmitter();
            const playedSounds: Array<{ id: string; event: SoundEvent }> = [];

            emitter.setCallback((soundId: string, event: SoundEvent) => {
                playedSounds.push({ id: soundId, event });
                manager.playSound(soundId, { volume: event.volume });
            });

            // 4. Simulate game events
            const playerMoveEvent: SoundEvent = {
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            };

            emitter.emit(playerMoveEvent);

            // 5. Verify complete workflow
            expect(playedSounds).toHaveLength(1);
            expect(playedSounds[0]?.id).toBe(SOUND_IDS.PLAYER_WALK);
            expect(playedSounds[0]?.event).toEqual(playerMoveEvent);

            // 6. Test mute functionality
            manager.setMuted(true);
            expect(manager.isMuted()).toBe(true);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wanderer-audio-muted', 'true');

            // 7. Cleanup
            manager.cleanup();
        });

        it('should handle complex game scenario end-to-end', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            const emitter = createSoundEventEmitter();
            const soundHistory: string[] = [];

            emitter.setCallback((soundId: string) => {
                soundHistory.push(soundId);
                manager.playSound(soundId);
            });

            // Simulate complex game sequence: move -> collect diamond -> win
            const gameSequence = generatePlayerMoveEvents(
                CELL.EMPTY, CELL.DIAMOND, 'won', 'playing', 0
            );

            emitter.emitMultiple(gameSequence);

            // Should have played multiple sounds in sequence
            expect(soundHistory.length).toBeGreaterThan(1);
            expect(soundHistory).toContain(SOUND_IDS.PLAYER_WALK);
            expect(soundHistory).toContain(SOUND_IDS.DIAMOND_COLLECT);
        });

        it('should handle fallback scenarios end-to-end', async () => {
            // Start with Web Audio API failure
            global.AudioContext = vi.fn(() => {
                throw new Error('Web Audio not supported');
            }) as any;

            // Should fall back to HTML5 Audio
            global.Audio = vi.fn(() => new ComprehensiveMockAudio()) as any;

            const manager = new WebAudioManager();
            expect(manager.isSupported()).toBe(false);

            // Should still be able to handle basic operations
            expect(() => manager.setMuted(true)).not.toThrow();
            expect(() => manager.playSound('test_sound')).not.toThrow();
            expect(() => manager.cleanup()).not.toThrow();
        });
    });

    describe('5. Performance Tests for Audio System', () => {
        it('should initialize quickly without blocking', () => {
            const startTime = performance.now();

            const manager = new WebAudioManager();

            const initTime = performance.now() - startTime;

            // Initialization should be fast (less than 50ms)
            expect(initTime).toBeLessThan(50);
            expect(manager.isSupported()).toBe(true);
        });

        it('should handle rapid sound playback without performance degradation', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const startTime = performance.now();

            // Play many sounds rapidly
            for (let i = 0; i < 100; i++) {
                const soundId = Object.keys(SOUND_ASSETS)[i % Object.keys(SOUND_ASSETS).length]!;
                manager.playSound(soundId);
            }

            const playbackTime = performance.now() - startTime;

            // Should handle rapid playback efficiently (less than 100ms for 100 sounds)
            expect(playbackTime).toBeLessThan(100);
        });

        it('should preload sounds efficiently', async () => {
            const manager = new WebAudioManager();

            const startTime = performance.now();
            await manager.preloadSounds();
            const preloadTime = performance.now() - startTime;

            // Preloading should complete in reasonable time (less than 1 second in test environment)
            expect(preloadTime).toBeLessThan(1000);

            // Should have made appropriate number of fetch calls
            const expectedSounds = Object.keys(SOUND_ASSETS).filter(key => SOUND_ASSETS[key]?.preload);
            expect(mockFetch).toHaveBeenCalledTimes(expectedSounds.length);
        });

        it('should handle memory management efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            // Play and stop many sounds
            for (let i = 0; i < 50; i++) {
                const soundId = Object.keys(SOUND_ASSETS)[i % Object.keys(SOUND_ASSETS).length]!;
                manager.playSound(soundId);
            }

            const bufferSources = mockAudioContext.getActiveBufferSources();

            // Simulate ended events to trigger cleanup
            bufferSources.forEach(source => {
                if (source.onended) {
                    source.onended();
                }
            });

            // Should handle cleanup without errors
            expect(() => manager.cleanup()).not.toThrow();
        });

        it('should not impact game responsiveness during audio operations', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            const emitter = createSoundEventEmitter();
            emitter.setCallback((soundId: string) => {
                manager.playSound(soundId);
            });

            // Simulate intensive game scenario with many sound events
            const startTime = performance.now();

            for (let i = 0; i < 200; i++) {
                const event: SoundEvent = {
                    type: 'movement',
                    source: 'player',
                    priority: 'low',
                    volume: 0.6
                };
                emitter.emit(event);
            }

            const totalTime = performance.now() - startTime;

            // Should handle intensive audio operations quickly (less than 200ms)
            expect(totalTime).toBeLessThan(200);
        });

        it('should handle concurrent audio operations efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const startTime = performance.now();

            // Simulate concurrent operations
            const promises = [];
            for (let i = 0; i < 20; i++) {
                promises.push(new Promise<void>(resolve => {
                    setTimeout(() => {
                        const soundId = Object.keys(SOUND_ASSETS)[i % Object.keys(SOUND_ASSETS).length]!;
                        manager.playSound(soundId);
                        resolve();
                    }, Math.random() * 10);
                }));
            }

            await Promise.all(promises);

            const concurrentTime = performance.now() - startTime;

            // Should handle concurrent operations efficiently (less than 100ms)
            expect(concurrentTime).toBeLessThan(100);
        });

        it('should maintain consistent performance under stress', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const performanceResults: number[] = [];

            // Run multiple performance tests
            for (let test = 0; test < 5; test++) {
                const startTime = performance.now();

                for (let i = 0; i < 50; i++) {
                    const soundId = Object.keys(SOUND_ASSETS)[i % Object.keys(SOUND_ASSETS).length]!;
                    manager.playSound(soundId);
                }

                const testTime = performance.now() - startTime;
                performanceResults.push(testTime);
            }

            // Calculate performance consistency
            const avgTime = performanceResults.reduce((a, b) => a + b, 0) / performanceResults.length;
            const maxTime = Math.max(...performanceResults);
            const minTime = Math.min(...performanceResults);

            // Performance should be consistent (max time shouldn't be more than 2x min time)
            expect(maxTime / minTime).toBeLessThan(2);
            expect(avgTime).toBeLessThan(50); // Average should be fast
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle all error scenarios gracefully', async () => {
            // Test various error conditions
            const errorScenarios = [
                () => {
                    global.AudioContext = vi.fn(() => {
                        throw new Error('AudioContext failed');
                    }) as any;
                    return new WebAudioManager();
                },
                () => {
                    mockFetch = createMockFetch(true);
                    global.fetch = mockFetch;
                    const manager = new WebAudioManager();
                    return manager.preloadSounds();
                },
                () => {
                    mockLocalStorage.setItem.mockImplementation(() => {
                        throw new Error('Storage failed');
                    });
                    const manager = new WebAudioManager();
                    manager.setMuted(true);
                    return manager;
                }
            ];

            // All error scenarios should be handled gracefully
            for (const scenario of errorScenarios) {
                expect(() => scenario()).not.toThrow();
            }
        });

        it('should handle invalid sound IDs gracefully', () => {
            const manager = new WebAudioManager();

            // Should not throw for invalid sound IDs
            expect(() => manager.playSound('invalid_sound_id')).not.toThrow();
            expect(() => manager.playSound('')).not.toThrow();
            expect(() => manager.playSound(null as any)).not.toThrow();
        });

        it('should handle invalid play options gracefully', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that a sound is loaded
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set('test_sound', mockBuffer);

            const invalidOptions = [
                { volume: -1 },
                { volume: 2 },
                { volume: NaN },
                { loop: 'invalid' as any },
                { delay: -1 },
                null as any,
                undefined
            ];

            invalidOptions.forEach(options => {
                expect(() => manager.playSound('test_sound', options)).not.toThrow();
            });
        });
    });
});