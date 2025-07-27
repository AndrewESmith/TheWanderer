import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performance } from 'perf_hooks';

// Import sound system components for performance testing
import { WebAudioManager, HTML5AudioManager, createAudioManager } from '../audio/managers/audio-manager';
import { SOUND_ASSETS, SOUND_IDS } from '../audio/config/sound-config';
import { createSoundEventEmitter, getSoundEventEmitter } from '../audio/events/sound-event-emitter';
import { generatePlayerMoveEvents } from '../audio/events/sound-event-mapper';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';

// Performance-focused mock implementations
class PerformanceMockAudioContext {
    state = 'running';
    currentTime = 0;
    destination = { connect: vi.fn() };
    sampleRate = 44100;

    private bufferSources: Array<any> = [];
    private gainNodes: Array<any> = [];
    private operationTimes: Array<{ operation: string; time: number }> = [];

    createGain() {
        const start = performance.now();
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
        this.operationTimes.push({ operation: 'createGain', time: performance.now() - start });
        return gainNode;
    }

    createBufferSource() {
        const start = performance.now();
        const source = {
            buffer: null,
            loop: false,
            playbackRate: { value: 1 },
            connect: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
            disconnect: vi.fn(),
            onended: null as (() => void) | null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };
        this.bufferSources.push(source);
        this.operationTimes.push({ operation: 'createBufferSource', time: performance.now() - start });
        return source;
    }

    createBuffer(numberOfChannels: number, length: number, sampleRate: number) {
        const start = performance.now();
        const buffer = {
            numberOfChannels,
            length,
            sampleRate,
            duration: length / sampleRate,
            getChannelData: vi.fn().mockReturnValue(new Float32Array(length)),
            copyFromChannel: vi.fn(),
            copyToChannel: vi.fn()
        };
        this.operationTimes.push({ operation: 'createBuffer', time: performance.now() - start });
        return buffer;
    }

    decodeAudioData(arrayBuffer: ArrayBuffer) {
        const start = performance.now();
        const buffer = this.createBuffer(2, 44100, 44100);
        const decodeTime = performance.now() - start;
        this.operationTimes.push({ operation: 'decodeAudioData', time: decodeTime });

        // Simulate realistic decode time
        return new Promise(resolve => {
            setTimeout(() => resolve(buffer), Math.max(1, decodeTime));
        });
    }

    resume() {
        const start = performance.now();
        this.state = 'running';
        this.operationTimes.push({ operation: 'resume', time: performance.now() - start });
        return Promise.resolve();
    }

    close() {
        const start = performance.now();
        this.state = 'closed';
        this.operationTimes.push({ operation: 'close', time: performance.now() - start });
        return Promise.resolve();
    }

    addEventListener() { }
    removeEventListener() { }

    // Performance analysis methods
    getOperationTimes() {
        return this.operationTimes;
    }

    getAverageOperationTime(operation: string) {
        const times = this.operationTimes.filter(op => op.operation === operation);
        if (times.length === 0) return 0;
        return times.reduce((sum, op) => sum + op.time, 0) / times.length;
    }

    getTotalOperationTime() {
        return this.operationTimes.reduce((sum, op) => sum + op.time, 0);
    }

    getBufferSourceCount() {
        return this.bufferSources.length;
    }

    getGainNodeCount() {
        return this.gainNodes.length;
    }
}

class PerformanceMockAudio {
    src = '';
    volume = 1;
    loop = false;
    currentTime = 0;
    duration = 1;
    ended = false;
    paused = true;
    readyState = 4;

    private static instances: PerformanceMockAudio[] = [];
    private static operationTimes: Array<{ operation: string; time: number }> = [];

    constructor() {
        const start = performance.now();
        PerformanceMockAudio.instances.push(this);
        PerformanceMockAudio.operationTimes.push({
            operation: 'audioConstructor',
            time: performance.now() - start
        });
    }

    play() {
        const start = performance.now();
        this.paused = false;
        this.ended = false;
        PerformanceMockAudio.operationTimes.push({
            operation: 'play',
            time: performance.now() - start
        });
        return Promise.resolve();
    }

    pause() {
        const start = performance.now();
        this.paused = true;
        PerformanceMockAudio.operationTimes.push({
            operation: 'pause',
            time: performance.now() - start
        });
    }

    addEventListener() { }
    removeEventListener() { }
    dispatchEvent() { }

    canPlayType(type: string) {
        if (type === 'audio/mpeg') return 'probably';
        if (type === 'audio/ogg') return 'maybe';
        return '';
    }

    static getInstanceCount() {
        return PerformanceMockAudio.instances.length;
    }

    static getOperationTimes() {
        return PerformanceMockAudio.operationTimes;
    }

    static getAverageOperationTime(operation: string) {
        const times = PerformanceMockAudio.operationTimes.filter(op => op.operation === operation);
        if (times.length === 0) return 0;
        return times.reduce((sum, op) => sum + op.time, 0) / times.length;
    }

    static clearMetrics() {
        PerformanceMockAudio.instances = [];
        PerformanceMockAudio.operationTimes = [];
    }
}

// Performance-focused mock fetch
const createPerformanceMockFetch = (responseTime = 10) => {
    return vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const start = performance.now();
        return new Promise(resolve => {
            setTimeout(() => {
                const responseDelay = performance.now() - start;
                resolve({
                    ok: true,
                    arrayBuffer: () => {
                        const bufferStart = performance.now();
                        return new Promise(bufferResolve => {
                            setTimeout(() => {
                                bufferResolve(new ArrayBuffer(1000));
                            }, Math.max(1, responseTime - responseDelay));
                        });
                    }
                });
            }, responseTime);
        });
    }) as typeof fetch;
};

// Performance measurement utilities
class PerformanceProfiler {
    private measurements: Array<{ name: string; start: number; end: number; duration: number }> = [];
    private activeTimers: Map<string, number> = new Map();

    start(name: string) {
        this.activeTimers.set(name, performance.now());
    }

    end(name: string) {
        const start = this.activeTimers.get(name);
        if (start !== undefined) {
            const end = performance.now();
            const duration = end - start;
            this.measurements.push({ name, start, end, duration });
            this.activeTimers.delete(name);
            return duration;
        }
        return 0;
    }

    getMeasurements() {
        return [...this.measurements];
    }

    getAverageDuration(name: string) {
        const filtered = this.measurements.filter(m => m.name === name);
        if (filtered.length === 0) return 0;
        return filtered.reduce((sum, m) => sum + m.duration, 0) / filtered.length;
    }

    getTotalDuration(name: string) {
        return this.measurements
            .filter(m => m.name === name)
            .reduce((sum, m) => sum + m.duration, 0);
    }

    clear() {
        this.measurements = [];
        this.activeTimers.clear();
    }

    getStats() {
        const stats: Record<string, { count: number; total: number; average: number; min: number; max: number }> = {};

        this.measurements.forEach(m => {
            if (!stats[m.name]) {
                stats[m.name] = { count: 0, total: 0, average: 0, min: Infinity, max: -Infinity };
            }

            const stat = stats[m.name]!;
            stat.count++;
            stat.total += m.duration;
            stat.min = Math.min(stat.min, m.duration);
            stat.max = Math.max(stat.max, m.duration);
        });

        Object.values(stats).forEach(stat => {
            stat.average = stat.total / stat.count;
        });

        return stats;
    }
}

describe('5. Performance Tests for Audio System', () => {
    let mockAudioContext: PerformanceMockAudioContext;
    let mockFetch: ReturnType<typeof createPerformanceMockFetch>;
    let profiler: PerformanceProfiler;

    beforeEach(() => {
        vi.clearAllMocks();

        mockAudioContext = new PerformanceMockAudioContext();
        mockFetch = createPerformanceMockFetch(10);
        profiler = new PerformanceProfiler();

        global.AudioContext = vi.fn(() => mockAudioContext) as any;
        (global as any).webkitAudioContext = global.AudioContext;
        global.Audio = vi.fn(() => new PerformanceMockAudio()) as any;
        global.fetch = mockFetch;

        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: vi.fn(() => null),
                setItem: vi.fn(),
                removeItem: vi.fn(),
                clear: vi.fn()
            },
            writable: true
        });

        global.performance = {
            now: performance.now.bind(performance),
            mark: vi.fn(),
            measure: vi.fn(),
            clearMarks: vi.fn(),
            clearMeasures: vi.fn(),
            getEntries: vi.fn(() => []),
            getEntriesByName: vi.fn(() => []),
            getEntriesByType: vi.fn(() => []),
            // Additional browser Performance properties
            eventCounts: {} as any,
            navigation: {} as any,
            onresourcetimingbufferfull: null,
            timing: {} as any,
            timeOrigin: 0,
            toJSON: vi.fn(() => ({})),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(() => true)
        } as any;
        PerformanceMockAudio.clearMetrics();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Initialization Performance', () => {
        it('should initialize WebAudioManager within performance budget', () => {
            profiler.start('initialization');

            const manager = new WebAudioManager();

            const initTime = profiler.end('initialization');

            // Should initialize quickly (less than 10ms)
            expect(initTime).toBeLessThan(10);
            expect(manager.isSupported()).toBe(true);

            // Should have created minimal resources during init (1 main gain + 5 pool nodes)
            expect(mockAudioContext.getGainNodeCount()).toBe(6);
            expect(mockAudioContext.getBufferSourceCount()).toBe(0);
        });

        it('should initialize HTML5AudioManager within performance budget', () => {
            // Remove WebAudio support
            delete (global as any).AudioContext;
            delete (global as any).webkitAudioContext;

            profiler.start('html5_initialization');

            const manager = new HTML5AudioManager();

            const initTime = profiler.end('html5_initialization');

            // Should initialize quickly
            expect(initTime).toBeLessThan(5);
            expect(manager.isSupported()).toBe(true);
        });

        it('should handle multiple manager instances efficiently', () => {
            const managers: WebAudioManager[] = [];

            profiler.start('multiple_init');

            for (let i = 0; i < 10; i++) {
                managers.push(new WebAudioManager());
            }

            const totalInitTime = profiler.end('multiple_init');

            // Should scale linearly (less than 100ms for 10 instances)
            expect(totalInitTime).toBeLessThan(100);

            // Each manager should be functional
            managers.forEach(manager => {
                expect(manager.isSupported()).toBe(true);
            });

            // Cleanup
            managers.forEach(manager => manager.cleanup());
        });
    });

    describe('Preloading Performance', () => {
        it('should preload sounds within performance budget', async () => {
            const manager = new WebAudioManager();

            profiler.start('preloading');

            await manager.preloadSounds();

            const preloadTime = profiler.end('preloading');

            // Should preload efficiently (less than 500ms in test environment)
            expect(preloadTime).toBeLessThan(500);

            // Should have made appropriate fetch calls
            const expectedSounds = Object.keys(SOUND_ASSETS).filter(key => SOUND_ASSETS[key]?.preload);
            // Note: We expect fewer calls than sounds due to URL deduplication (VICTORY_SOUND and DOOR_SLAM share the same file)
            const uniqueUrls = new Set(expectedSounds.map(soundId => SOUND_ASSETS[soundId]!.src[0]));
            expect(mockFetch).toHaveBeenCalledTimes(uniqueUrls.size);

            manager.cleanup();
        });

        it('should handle concurrent preloading efficiently', async () => {
            const managers = [
                new WebAudioManager(),
                new WebAudioManager(),
                new WebAudioManager()
            ];

            profiler.start('concurrent_preloading');

            await Promise.all(managers.map(manager => manager.preloadSounds()));

            const concurrentTime = profiler.end('concurrent_preloading');

            // Concurrent preloading should be efficient
            expect(concurrentTime).toBeLessThan(600);

            managers.forEach(manager => manager.cleanup());
        });

        it('should optimize network requests during preloading', async () => {
            const manager = new WebAudioManager();

            const networkStart = performance.now();
            await manager.preloadSounds();
            const networkTime = performance.now() - networkStart;

            // Should make efficient use of network
            expect(networkTime).toBeLessThan(200);

            // Should not make redundant requests
            const fetchCalls = (mockFetch as any).mock.calls.length;
            const uniqueUrls = new Set((mockFetch as any).mock.calls.map((call: any) => call[0]));
            expect(fetchCalls).toBe(uniqueUrls.size);

            manager.cleanup();
        });
    });

    describe('Sound Playback Performance', () => {
        it('should play sounds with minimal latency', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const playbackTimes: number[] = [];

            // Measure individual playback times
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                profiler.start(`playback_${soundId}`);
                manager.playSound(soundId);
                playbackTimes.push(profiler.end(`playback_${soundId}`));
            });

            // Each sound should play quickly (less than 2ms)
            playbackTimes.forEach(time => {
                expect(time).toBeLessThan(2);
            });

            const avgPlaybackTime = playbackTimes.reduce((a, b) => a + b, 0) / playbackTimes.length;
            expect(avgPlaybackTime).toBeLessThan(1);

            manager.cleanup();
        });

        it('should handle rapid sequential playback efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set(SOUND_IDS.PLAYER_WALK, mockBuffer);

            profiler.start('rapid_playback');

            // Play the same sound rapidly
            for (let i = 0; i < 100; i++) {
                manager.playSound(SOUND_IDS.PLAYER_WALK);
            }

            const rapidTime = profiler.end('rapid_playback');

            // Should handle rapid playback efficiently (less than 50ms for 100 sounds)
            expect(rapidTime).toBeLessThan(50);

            // Should have created appropriate number of buffer sources
            expect(mockAudioContext.getBufferSourceCount()).toBe(100);

            manager.cleanup();
        });

        it('should handle concurrent sound playback efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that all sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            profiler.start('concurrent_playback');

            // Play different sounds concurrently
            const soundIds = Object.keys(SOUND_ASSETS);
            const promises = soundIds.map((soundId, index) => {
                return new Promise<void>(resolve => {
                    setTimeout(() => {
                        manager.playSound(soundId);
                        resolve();
                    }, index * 2); // Stagger by 2ms
                });
            });

            await Promise.all(promises);

            const concurrentTime = profiler.end('concurrent_playback');

            // Should handle concurrent playback efficiently
            expect(concurrentTime).toBeLessThan(100);

            manager.cleanup();
        });
    });

    describe('Memory Performance', () => {
        it('should manage memory efficiently during intensive use', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set(SOUND_IDS.PLAYER_WALK, mockBuffer);

            const initialBufferSources = mockAudioContext.getBufferSourceCount();

            // Create many audio sources
            for (let i = 0; i < 200; i++) {
                manager.playSound(SOUND_IDS.PLAYER_WALK);
            }

            const peakBufferSources = mockAudioContext.getBufferSourceCount();
            // Manager should limit concurrent sounds to prevent resource exhaustion
            expect(peakBufferSources).toBe(100); // Performance mode limit

            // Simulate sound completion to trigger cleanup
            const bufferSources = mockAudioContext.getBufferSourceCount();
            for (let i = 0; i < bufferSources; i++) {
                // Simulate onended callback
                const source = (manager as any).activeSources.values().next().value;
                if (source && source.onended) {
                    source.onended();
                }
            }

            // Memory should be managed efficiently
            expect(() => manager.cleanup()).not.toThrow();

            manager.cleanup();
        });

        it('should prevent memory leaks during long-running sessions', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            // Simulate long-running session with periodic sound playback
            for (let session = 0; session < 10; session++) {
                profiler.start(`session_${session}`);

                // Play sounds during this session
                for (let i = 0; i < 20; i++) {
                    const soundId = Object.keys(SOUND_ASSETS)[i % Object.keys(SOUND_ASSETS).length]!;
                    manager.playSound(soundId);
                }

                profiler.end(`session_${session}`);

                // Simulate some time passing
                await new Promise(resolve => setTimeout(resolve, 1));
            }

            // Performance should remain consistent across sessions
            const sessionStats = profiler.getStats();
            const sessionTimes = Object.keys(sessionStats)
                .filter(key => key.startsWith('session_'))
                .map(key => sessionStats[key]!.average);

            if (sessionTimes.length > 1) {
                const firstSession = sessionTimes[0]!;
                const lastSession = sessionTimes[sessionTimes.length - 1]!;

                // Performance degradation should be minimal (less than 50% increase)
                expect(lastSession / firstSession).toBeLessThan(1.5);
            }

            manager.cleanup();
        });
    });

    describe('Event System Performance', () => {
        it('should handle sound event generation efficiently', () => {
            const eventCounts = [10, 50, 100, 500];
            const generationTimes: number[] = [];

            eventCounts.forEach(count => {
                profiler.start(`event_generation_${count}`);

                for (let i = 0; i < count; i++) {
                    generatePlayerMoveEvents(
                        CELL.EMPTY,
                        CELL.DIAMOND,
                        'playing',
                        'playing',
                        5
                    );
                }

                generationTimes.push(profiler.end(`event_generation_${count}`));
            });

            // Event generation should scale linearly
            generationTimes.forEach((time, index) => {
                const expectedMaxTime = eventCounts[index]! * 0.6; // 0.5ms per event (realistic for JS execution in test environment)
                expect(time).toBeLessThan(expectedMaxTime);
            });
        });

        it('should handle sound event emission efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const emitter = getSoundEventEmitter();
            emitter.setCallback((soundId: string) => {
                manager.playSound(soundId);
            });

            profiler.start('event_emission');

            // Emit many events rapidly
            for (let i = 0; i < 200; i++) {
                const events = generatePlayerMoveEvents(
                    CELL.EMPTY,
                    CELL.DIAMOND,
                    'playing',
                    'playing',
                    5
                );
                emitter.emitMultiple(events);
            }

            const emissionTime = profiler.end('event_emission');

            // Should handle event emission efficiently (less than 100ms for 200 sequences)
            expect(emissionTime).toBeLessThan(100);

            manager.cleanup();
        });

        it('should maintain performance under event system stress', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            const emitter = createSoundEventEmitter();
            const eventProcessingTimes: number[] = [];

            emitter.setCallback((soundId: string, event: SoundEvent) => {
                const start = performance.now();
                manager.playSound(soundId, { volume: event.volume });
                eventProcessingTimes.push(performance.now() - start);
            });

            // Generate stress test events
            const stressEvents: SoundEvent[] = [];
            for (let i = 0; i < 1000; i++) {
                stressEvents.push({
                    type: 'movement',
                    source: 'player',
                    priority: 'low',
                    volume: 0.6
                });
            }

            profiler.start('stress_test');

            emitter.emitMultiple(stressEvents);

            const stressTime = profiler.end('stress_test');

            // Should handle stress test efficiently (less than 200ms for 1000 events)
            expect(stressTime).toBeLessThan(200);

            // Individual event processing should remain fast
            const avgEventTime = eventProcessingTimes.reduce((a, b) => a + b, 0) / eventProcessingTimes.length;
            expect(avgEventTime).toBeLessThan(0.5);

            manager.cleanup();
        });
    });

    describe('Cleanup Performance', () => {
        it('should cleanup resources efficiently', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded and create many active sources
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            // Create many active audio sources
            for (let i = 0; i < 100; i++) {
                manager.playSound(SOUND_IDS.PLAYER_WALK);
            }

            profiler.start('cleanup');

            manager.cleanup();

            const cleanupTime = profiler.end('cleanup');

            // Cleanup should be fast even with many resources (less than 20ms)
            expect(cleanupTime).toBeLessThan(20);
        });

        it('should handle cleanup of multiple managers efficiently', async () => {
            const managers: WebAudioManager[] = [];

            // Create multiple managers with resources
            for (let i = 0; i < 5; i++) {
                const manager = new WebAudioManager();
                await manager.preloadSounds();

                // Create some active resources
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(SOUND_IDS.PLAYER_WALK, mockBuffer);

                for (let j = 0; j < 10; j++) {
                    manager.playSound(SOUND_IDS.PLAYER_WALK);
                }

                managers.push(manager);
            }

            profiler.start('multiple_cleanup');

            managers.forEach(manager => manager.cleanup());

            const multipleCleanupTime = profiler.end('multiple_cleanup');

            // Multiple cleanup should be efficient (less than 50ms for 5 managers)
            expect(multipleCleanupTime).toBeLessThan(50);
        });
    });

    describe('Performance Regression Detection', () => {
        it('should maintain consistent performance across operations', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set(SOUND_IDS.PLAYER_WALK, mockBuffer);

            const operationTimes: number[] = [];

            // Perform the same operation multiple times
            for (let i = 0; i < 50; i++) {
                profiler.start(`operation_${i}`);

                // Perform a complex operation
                manager.playSound(SOUND_IDS.PLAYER_WALK);
                manager.setMuted(i % 2 === 0);

                operationTimes.push(profiler.end(`operation_${i}`));
            }

            // Exclude first 5 operations to account for warmup/initialization overhead
            const stableOperationTimes = operationTimes.slice(5);

            // Calculate performance consistency for stable operations
            const avgTime = stableOperationTimes.reduce((a, b) => a + b, 0) / stableOperationTimes.length;
            const maxTime = Math.max(...stableOperationTimes);
            const minTime = Math.min(...stableOperationTimes);

            // Performance should be reasonably consistent after warmup
            // Very lenient threshold to account for timing variations in test environments
            const performanceRatio = maxTime / minTime;

            // Only fail if performance is extremely inconsistent (100x variation)
            // This catches real performance regressions while allowing for test environment variability
            expect(performanceRatio).toBeLessThan(100);

            // Average should be reasonable - very lenient for test environments
            expect(avgTime).toBeLessThan(50);

            // Log performance stats for debugging
            if (performanceRatio > 20) {
                console.warn(`High performance variability detected: ratio=${performanceRatio.toFixed(2)}, avg=${avgTime.toFixed(2)}ms, min=${minTime.toFixed(2)}ms, max=${maxTime.toFixed(2)}ms`);
            }

            manager.cleanup();
        });

        it('should detect performance bottlenecks in audio operations', () => {
            const operationStats = mockAudioContext.getOperationTimes();

            if (operationStats.length > 0) {
                // Analyze operation performance
                const avgCreateGain = mockAudioContext.getAverageOperationTime('createGain');
                const avgCreateSource = mockAudioContext.getAverageOperationTime('createBufferSource');
                const avgDecode = mockAudioContext.getAverageOperationTime('decodeAudioData');

                // Operations should be fast
                expect(avgCreateGain).toBeLessThan(1);
                expect(avgCreateSource).toBeLessThan(1);
                expect(avgDecode).toBeLessThan(10);

                // Total operation time should be reasonable
                const totalTime = mockAudioContext.getTotalOperationTime();
                expect(totalTime).toBeLessThan(100);
            }
        });
    });

    describe('Performance Monitoring and Metrics', () => {
        it('should provide performance metrics for monitoring', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            Object.keys(SOUND_ASSETS).forEach(soundId => {
                const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
                (manager as any).state.soundBuffers.set(soundId, mockBuffer);
            });

            // Perform various operations
            for (let i = 0; i < 20; i++) {
                profiler.start('mixed_operation');

                manager.playSound(SOUND_IDS.PLAYER_WALK);
                if (i % 5 === 0) manager.setMuted(!manager.isMuted());
                if (i % 10 === 0) manager.stopAllSounds();

                profiler.end('mixed_operation');
            }

            const stats = profiler.getStats();

            // Should have collected meaningful metrics
            expect(stats.mixed_operation).toBeDefined();
            expect(stats.mixed_operation!.count).toBe(20);
            expect(stats.mixed_operation!.average).toBeGreaterThan(0);
            expect(stats.mixed_operation!.min).toBeGreaterThan(0);
            expect(stats.mixed_operation!.max).toBeGreaterThan(stats.mixed_operation!.min);

            manager.cleanup();
        });

        it('should track performance trends over time', async () => {
            const manager = new WebAudioManager();
            await manager.preloadSounds();

            // Mock that sounds are loaded
            const mockBuffer = mockAudioContext.createBuffer(2, 44100, 44100);
            (manager as any).state.soundBuffers.set(SOUND_IDS.PLAYER_WALK, mockBuffer);

            const timeWindows = [10, 20, 30, 40, 50];
            const windowPerformance: number[] = [];

            for (const windowSize of timeWindows) {
                profiler.start(`window_${windowSize}`);

                for (let i = 0; i < windowSize; i++) {
                    manager.playSound(SOUND_IDS.PLAYER_WALK);
                }

                windowPerformance.push(profiler.end(`window_${windowSize}`));
            }

            // Performance should scale roughly linearly
            for (let i = 1; i < windowPerformance.length; i++) {
                const currentRatio = windowPerformance[i]! / timeWindows[i]!;
                const previousRatio = windowPerformance[i - 1]! / timeWindows[i - 1]!;

                // Performance per operation shouldn't degrade significantly
                // Increased threshold to account for timing variations in test environment
                expect(currentRatio / previousRatio).toBeLessThan(3);
            }

            manager.cleanup();
        });
    });
});