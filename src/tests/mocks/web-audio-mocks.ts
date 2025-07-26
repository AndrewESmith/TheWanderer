import { vi } from 'vitest';

/**
 * Comprehensive Web Audio API Mock Implementations
 * 
 * This file provides detailed mock implementations for Web Audio API components
 * to enable thorough testing of the sound system without requiring actual audio hardware.
 */

// Mock AudioBuffer implementation
export class MockAudioBuffer {
    numberOfChannels: number;
    length: number;
    sampleRate: number;
    duration: number;

    private channelData: Map<number, Float32Array> = new Map();

    constructor(numberOfChannels: number, length: number, sampleRate: number) {
        this.numberOfChannels = numberOfChannels;
        this.length = length;
        this.sampleRate = sampleRate;
        this.duration = length / sampleRate;

        // Initialize channel data
        for (let i = 0; i < numberOfChannels; i++) {
            this.channelData.set(i, new Float32Array(length));
        }
    }

    getChannelData(channel: number): Float32Array {
        const data = this.channelData.get(channel);
        if (!data) {
            throw new Error(`Invalid channel number: ${channel}`);
        }
        return data;
    }

    copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel?: number): void {
        const sourceData = this.getChannelData(channelNumber);
        const start = startInChannel || 0;
        const length = Math.min(destination.length, sourceData.length - start);

        for (let i = 0; i < length; i++) {
            destination[i] = sourceData[start + i]!;
        }
    }

    copyToChannel(source: Float32Array, channelNumber: number, startInChannel?: number): void {
        const targetData = this.getChannelData(channelNumber);
        const start = startInChannel || 0;
        const length = Math.min(source.length, targetData.length - start);

        for (let i = 0; i < length; i++) {
            targetData[start + i] = source[i]!;
        }
    }
}

// Mock AudioBufferSourceNode implementation
export class MockAudioBufferSourceNode {
    buffer: MockAudioBuffer | null = null;
    loop = false;
    loopStart = 0;
    loopEnd = 0;
    playbackRate = { value: 1 };

    private connections: MockAudioNode[] = [];
    private started = false;
    private stopped = false;
    private eventListeners: Map<string, Function[]> = new Map();

    onended: (() => void) | null = null;

    connect(destination: MockAudioNode): void {
        this.connections.push(destination);
    }

    disconnect(destination?: MockAudioNode): void {
        if (destination) {
            const index = this.connections.indexOf(destination);
            if (index > -1) {
                this.connections.splice(index, 1);
            }
        } else {
            this.connections.length = 0;
        }
    }

    start(when?: number): void {
        if (this.started) {
            throw new Error('Cannot start AudioBufferSourceNode more than once');
        }
        this.started = true;

        // Simulate playback completion
        if (this.buffer && !this.loop) {
            const duration = this.buffer.duration / this.playbackRate.value;
            setTimeout(() => {
                if (!this.stopped) {
                    this.stop();
                }
            }, duration * 1000);
        }
    }

    stop(when?: number): void {
        if (!this.started || this.stopped) {
            return;
        }

        this.stopped = true;

        // Trigger ended event
        setTimeout(() => {
            if (this.onended) {
                this.onended();
            }
            this.dispatchEvent('ended');
        }, 0);
    }

    addEventListener(type: string, listener: Function): void {
        if (!this.eventListeners.has(type)) {
            this.eventListeners.set(type, []);
        }
        this.eventListeners.get(type)!.push(listener);

        if (type === 'ended') {
            this.onended = listener as () => void;
        }
    }

    removeEventListener(type: string, listener: Function): void {
        const listeners = this.eventListeners.get(type);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }

        if (type === 'ended' && this.onended === listener) {
            this.onended = null;
        }
    }

    private dispatchEvent(type: string): void {
        const listeners = this.eventListeners.get(type);
        if (listeners) {
            listeners.forEach(listener => listener());
        }
    }

    // Test utilities
    isStarted(): boolean {
        return this.started;
    }

    isStopped(): boolean {
        return this.stopped;
    }

    getConnections(): MockAudioNode[] {
        return [...this.connections];
    }
}

// Mock GainNode implementation
export class MockGainNode {
    gain = {
        value: 1,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        setTargetAtTime: vi.fn(),
        cancelScheduledValues: vi.fn()
    };

    private connections: MockAudioNode[] = [];

    connect(destination: MockAudioNode): void {
        this.connections.push(destination);
    }

    disconnect(destination?: MockAudioNode): void {
        if (destination) {
            const index = this.connections.indexOf(destination);
            if (index > -1) {
                this.connections.splice(index, 1);
            }
        } else {
            this.connections.length = 0;
        }
    }

    // Test utilities
    getConnections(): MockAudioNode[] {
        return [...this.connections];
    }

    getCurrentGainValue(): number {
        return this.gain.value;
    }
}

// Mock AudioDestinationNode implementation
export class MockAudioDestinationNode {
    maxChannelCount = 2;

    connect(): void {
        // Destination node doesn't connect to anything
    }

    disconnect(): void {
        // Destination node doesn't disconnect from anything
    }
}

// Base mock audio node type
export type MockAudioNode = MockAudioBufferSourceNode | MockGainNode | MockAudioDestinationNode;

// Mock AudioContext implementation
export class MockAudioContext {
    state: 'suspended' | 'running' | 'closed' = 'running';
    currentTime = 0;
    sampleRate = 44100;
    destination = new MockAudioDestinationNode();

    private stateChangeListeners: Function[] = [];
    private createdNodes: MockAudioNode[] = [];
    private decodingPromises: Promise<MockAudioBuffer>[] = [];

    createGain(): MockGainNode {
        const gainNode = new MockGainNode();
        this.createdNodes.push(gainNode);
        return gainNode;
    }

    createBufferSource(): MockAudioBufferSourceNode {
        const sourceNode = new MockAudioBufferSourceNode();
        this.createdNodes.push(sourceNode);
        return sourceNode;
    }

    createBuffer(numberOfChannels: number, length: number, sampleRate: number): MockAudioBuffer {
        return new MockAudioBuffer(numberOfChannels, length, sampleRate);
    }

    decodeAudioData(audioData: ArrayBuffer): Promise<MockAudioBuffer> {
        const promise = new Promise<MockAudioBuffer>((resolve, reject) => {
            // Simulate realistic decode time
            setTimeout(() => {
                if (audioData.byteLength === 0) {
                    reject(new Error('Invalid audio data'));
                } else {
                    // Create a mock buffer with realistic properties
                    const buffer = new MockAudioBuffer(2, 44100, 44100); // 1 second stereo buffer
                    resolve(buffer);
                }
            }, Math.random() * 10 + 5); // 5-15ms decode time
        });

        this.decodingPromises.push(promise);
        return promise;
    }

    resume(): Promise<void> {
        return new Promise(resolve => {
            if (this.state === 'suspended') {
                this.state = 'running';
                this.notifyStateChange();
            }
            resolve();
        });
    }

    suspend(): Promise<void> {
        return new Promise(resolve => {
            if (this.state === 'running') {
                this.state = 'suspended';
                this.notifyStateChange();
            }
            resolve();
        });
    }

    close(): Promise<void> {
        return new Promise(resolve => {
            this.state = 'closed';
            this.notifyStateChange();

            // Cleanup all created nodes
            this.createdNodes.forEach(node => {
                if ('disconnect' in node) {
                    node.disconnect();
                }
            });
            this.createdNodes.length = 0;

            resolve();
        });
    }

    addEventListener(type: string, listener: Function): void {
        if (type === 'statechange') {
            this.stateChangeListeners.push(listener);
        }
    }

    removeEventListener(type: string, listener: Function): void {
        if (type === 'statechange') {
            const index = this.stateChangeListeners.indexOf(listener);
            if (index > -1) {
                this.stateChangeListeners.splice(index, 1);
            }
        }
    }

    private notifyStateChange(): void {
        this.stateChangeListeners.forEach(listener => {
            try {
                listener();
            } catch (error) {
                console.warn('Error in state change listener:', error);
            }
        });
    }

    // Test utilities
    getCreatedNodes(): MockAudioNode[] {
        return [...this.createdNodes];
    }

    getCreatedNodesOfType<T extends MockAudioNode>(type: new (...args: any[]) => T): T[] {
        return this.createdNodes.filter(node => node instanceof type) as T[];
    }

    simulateStateChange(newState: 'suspended' | 'running' | 'closed'): void {
        this.state = newState;
        this.notifyStateChange();
    }

    waitForAllDecoding(): Promise<MockAudioBuffer[]> {
        return Promise.all(this.decodingPromises);
    }

    getDecodingPromiseCount(): number {
        return this.decodingPromises.length;
    }
}

// Mock HTML5 Audio implementation
export class MockHTMLAudioElement {
    src = '';
    volume = 1;
    loop = false;
    muted = false;
    currentTime = 0;
    duration = NaN;
    ended = false;
    paused = true;
    readyState = 0;
    preload = 'none';

    private eventListeners: Map<string, Function[]> = new Map();
    private loadPromise: Promise<void> | null = null;

    constructor() {
        // Simulate loading states
        setTimeout(() => {
            this.readyState = 1; // HAVE_METADATA
            this.duration = 1.5; // 1.5 seconds
            this.dispatchEvent('loadedmetadata');

            setTimeout(() => {
                this.readyState = 4; // HAVE_ENOUGH_DATA
                this.dispatchEvent('canplaythrough');
            }, 10);
        }, 5);
    }

    play(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.readyState < 4) {
                reject(new Error('Not enough data to play'));
                return;
            }

            this.paused = false;
            this.ended = false;
            this.dispatchEvent('play');

            // Simulate playback completion
            if (!this.loop) {
                setTimeout(() => {
                    this.ended = true;
                    this.paused = true;
                    this.currentTime = this.duration;
                    this.dispatchEvent('ended');
                }, this.duration * 1000);
            }

            resolve();
        });
    }

    pause(): void {
        this.paused = true;
        this.dispatchEvent('pause');
    }

    load(): void {
        this.readyState = 0;
        this.currentTime = 0;
        this.ended = false;
        this.paused = true;

        this.loadPromise = new Promise(resolve => {
            setTimeout(() => {
                this.readyState = 4;
                this.dispatchEvent('canplaythrough');
                resolve();
            }, 20);
        });
    }

    addEventListener(type: string, listener: Function): void {
        if (!this.eventListeners.has(type)) {
            this.eventListeners.set(type, []);
        }
        this.eventListeners.get(type)!.push(listener);
    }

    removeEventListener(type: string, listener: Function): void {
        const listeners = this.eventListeners.get(type);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    canPlayType(type: string): string {
        const supportedTypes: Record<string, string> = {
            'audio/mpeg': 'probably',
            'audio/mp3': 'probably',
            'audio/ogg': 'maybe',
            'audio/wav': 'probably',
            'audio/webm': 'maybe'
        };

        return supportedTypes[type] || '';
    }

    private dispatchEvent(type: string): void {
        const listeners = this.eventListeners.get(type);
        if (listeners) {
            listeners.forEach(listener => {
                try {
                    listener();
                } catch (error) {
                    console.warn(`Error in ${type} listener:`, error);
                }
            });
        }
    }

    // Test utilities
    simulateError(): void {
        this.dispatchEvent('error');
    }

    simulateLoadSuccess(): void {
        this.readyState = 4;
        this.dispatchEvent('canplaythrough');
    }

    simulateLoadFailure(): void {
        this.dispatchEvent('error');
    }

    waitForLoad(): Promise<void> {
        return this.loadPromise || Promise.resolve();
    }

    getEventListenerCount(type: string): number {
        return this.eventListeners.get(type)?.length || 0;
    }
}

// Factory functions for creating mocks
export function createMockAudioContext(): MockAudioContext {
    return new MockAudioContext();
}

export function createMockHTMLAudioElement(): MockHTMLAudioElement {
    return new MockHTMLAudioElement();
}

// Global mock setup functions
export function setupWebAudioMocks(): void {
    global.AudioContext = vi.fn(() => createMockAudioContext()) as any;
    (global as any).webkitAudioContext = global.AudioContext;
}

export function setupHTML5AudioMocks(): void {
    global.Audio = vi.fn(() => createMockHTMLAudioElement()) as any;
}

export function setupAllAudioMocks(): void {
    setupWebAudioMocks();
    setupHTML5AudioMocks();
}

export function cleanupAudioMocks(): void {
    delete (global as any).AudioContext;
    delete (global as any).webkitAudioContext;
    delete (global as any).Audio;
}

// Mock fetch for audio file loading
export function createMockFetch(options: {
    delay?: number;
    failureRate?: number;
    responseSize?: number;
} = {}): ReturnType<typeof vi.fn> {
    const { delay = 10, failureRate = 0, responseSize = 1000 } = options;

    return vi.fn((url: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < failureRate) {
                    reject(new Error('Network error'));
                } else if (typeof url === 'string' && url.includes('.ogg')) {
                    // Simulate missing .ogg files
                    resolve({
                        ok: false,
                        status: 404,
                        statusText: 'Not Found'
                    });
                } else {
                    resolve({
                        ok: true,
                        status: 200,
                        arrayBuffer: () => Promise.resolve(new ArrayBuffer(responseSize))
                    });
                }
            }, delay);
        });
    });
}

// Mock localStorage for settings persistence
export function createMockLocalStorage(): Storage {
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
        key: vi.fn((index: number) => {
            const keys = Object.keys(storage);
            return keys[index] || null;
        }),
        get length() {
            return Object.keys(storage).length;
        }
    };
}

// Test utilities for mock validation
export function validateMockAudioContext(context: MockAudioContext): void {
    expect(context.state).toMatch(/^(suspended|running|closed)$/);
    expect(context.sampleRate).toBe(44100);
    expect(context.destination).toBeInstanceOf(MockAudioDestinationNode);
    expect(typeof context.createGain).toBe('function');
    expect(typeof context.createBufferSource).toBe('function');
    expect(typeof context.createBuffer).toBe('function');
    expect(typeof context.decodeAudioData).toBe('function');
}

export function validateMockHTMLAudioElement(audio: MockHTMLAudioElement): void {
    expect(typeof audio.play).toBe('function');
    expect(typeof audio.pause).toBe('function');
    expect(typeof audio.load).toBe('function');
    expect(typeof audio.addEventListener).toBe('function');
    expect(typeof audio.removeEventListener).toBe('function');
    expect(typeof audio.canPlayType).toBe('function');
    expect(audio.volume).toBeGreaterThanOrEqual(0);
    expect(audio.volume).toBeLessThanOrEqual(1);
}

// Performance testing utilities
export function measureMockPerformance<T>(
    operation: () => T,
    name: string
): { result: T; duration: number } {
    const start = performance.now();
    const result = operation();
    const duration = performance.now() - start;

    return { result, duration };
}

export async function measureAsyncMockPerformance<T>(
    operation: () => Promise<T>,
    name: string
): Promise<{ result: T; duration: number }> {
    const start = performance.now();
    const result = await operation();
    const duration = performance.now() - start;

    return { result, duration };
}