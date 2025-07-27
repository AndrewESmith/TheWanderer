# Chat 28 Step 12 fix tests 7

## User Request
How do I fix the following problem in the above code?: Property 'bufferSources' is private and only accessible within class 'E2EMockAudioContext'.

## Assistant Response
The issue is that `bufferSources` is a private property in the `E2EMockAudioContext` class. You need to make it accessible for testing purposes. Here's the fix:

```typescript
// E2E test utilities
getPlayedSounds() {
    return this.bufferSources.filter(source => (source as any)._started === true);
}

getGainNodes() {
    return this.gainNodes;
}

clearBufferSources() {
    this.bufferSources = [];
}
```

The fix adds a public `clearBufferSources()` method to the `E2EMockAudioContext` class that provides controlled access to clear the private `bufferSources` array. This maintains encapsulation while giving your test the functionality it needs.

The changes:
1. Added `clearBufferSources()` method to the mock class
2. Updated the test to use this public method instead of directly accessing the private property

This approach is cleaner than making the property public, as it maintains the class's encapsulation while providing the specific testing functionality you need.

## Next Issue - Mock Fetch Type Error#
# User Request 2
How do I fix the following problem in the above code?: Type 'Mock<(url: string) => Promise<unknown>>' is not assignable to type '{ (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>; (input: string | Request | URL, init?: RequestInit | undefined): Promise<...>; }'.

## Assistant Response 2
The issue is that the mock fetch function has a more restrictive type signature than the real fetch API. The real fetch accepts `RequestInfo | URL` but your mock only accepts `string`. Here's the fix:

```typescript
// Mock fetch with realistic network simulation
const createE2EMockFetch = (networkDelay = 10, failureRate = 0) => {
    return vi.fn((input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < failureRate) {
                    reject(new Error('Network error'));
                } else if (typeof url === 'string' && url.includes('.ogg')) {
                    resolve({
                        ok: false,
                        status: 404,
                        statusText: 'Not Found'
                    } as Response);
                } else {
                    resolve({
                        ok: true,
                        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1000))
                    } as Response);
                }
            }, networkDelay);
        });
    });
};
```

The fix updates the mock fetch function to:
1. Accept the correct parameter types: `input: RequestInfo | URL, init?: RequestInit` to match the real fetch API signature
2. Extract the URL string from different input types (string, URL object, or Request object)
3. Cast the resolved values as `Response` type to satisfy TypeScript's type checking

I also notice there's a structural issue with the code - the `createE2EMockLocalStorage` function and the test describe block are nested inside the `createE2EMockFetch` function. Let me fix that:

The fixes address two issues:
1. **Type annotation**: Added explicit return type `: Promise<Response>` to the mock fetch function so TypeScript knows it returns the correct type
2. **Code structure**: Fixed the nesting issue where `createE2EMockLocalStorage` and the test describe block were incorrectly nested inside the `createE2EMockFetch` function

Now the mock fetch function properly matches the expected fetch API signature and returns the correct Promise type.

## Next Issue - Performance Type Error## User R
equest 3
How do I fix the following problem in the above code?: Type 'Performance' is missing the following properties from type 'Performance': eventCounts, navigation, onresourcetimingbufferfull, timing, and 3 more.

## Assistant Response 3
The issue is that the Node.js `performance` object from `perf_hooks` doesn't have all the properties that the browser's `Performance` interface expects. We need to create a mock or cast it properly. Here's the fix:

```typescript
global.performance = {
    now: performance.now.bind(performance),
    mark: vi.fn(),
    measure: vi.fn(),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
    getEntries: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => [])
} as any;
```

The second approach is better because it:
1. **Provides the essential `now()` method** that your tests actually use
2. **Mocks other performance methods** that might be called but aren't critical for your tests
3. **Avoids type conflicts** by providing a more complete mock object
4. **Is more explicit** about what performance features are available in the test environment

This ensures your tests have access to `performance.now()` for timing measurements while avoiding TypeScript type mismatches between Node.js and browser Performance APIs.

## Next Issue - AudioBufferSource onended Property

## User Request 4
How do I fix the following problem in the above code?: Property 'onended' does not exist on type 'E2EMockAudioContext'.

## Assistant Response 4
The issue is that the `addEventListener` callback is trying to set `this.onended` but `this` refers to the `E2EMockAudioContext` class, not the buffer source being created. The `onended` property should be on the buffer source object. Here's the fix:

```typescript
addEventListener: vi.fn((event: string, callback: () => void) => {
    if (event === 'ended') {
        source.onended = callback;
    }
}),
```

The fix changes `this.onended = callback` to `source.onended = callback` because:
1. **Correct scope**: The `addEventListener` method is being called on the buffer source object, not the AudioContext
2. **Proper property assignment**: The `onended` property belongs to the buffer source, which is what we're mocking
3. **Consistent with Web Audio API**: In the real Web Audio API, `onended` is a property of `AudioBufferSourceNode`, not `AudioContext`

This ensures that when the mock buffer source's `addEventListener` method is called with an 'ended' event, it properly assigns the callback to the source's `onended` property, which can then be triggered later in the test when simulating sound completion.

## React Integration Test Issues#
# User Request 5
How do I fix the following problem in the above code?: Type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; ... 4 more ...; setCategoryVolume: Mock<...>; }' is missing the following properties from type 'AudioManager': getLoadingState, onLoadingProgress, getOptimizationReport, getGlobalVolume, and 2 more.

## Assistant Response 5
The mock audio manager is missing some required properties from the `AudioManager` interface. Here's the fix to add the missing methods:

```typescript
// Mock audio manager for React tests
const createMockAudioManager = (): AudioManager => ({
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  stopAllSounds: vi.fn(),
  setGlobalVolume: vi.fn(),
  setCategoryVolume: vi.fn(),
  getLoadingState: vi.fn().mockReturnValue({ loaded: 0, total: 0, isComplete: true }),
  onLoadingProgress: vi.fn(),
  getOptimizationReport: vi.fn().mockReturnValue({ totalSounds: 0, loadedSounds: 0, failedSounds: 0, memoryUsage: 0 }),
  getGlobalVolume: vi.fn().mockReturnValue(0.8),
  getCategoryVolume: vi.fn().mockReturnValue(0.8),
});
```

The fix adds the missing methods to the mock audio manager:
1. **`getLoadingState`**: Returns a mock loading state indicating completion
2. **`onLoadingProgress`**: Mock function for loading progress callbacks
3. **`getOptimizationReport`**: Returns a mock optimization report with default values
4. **`getGlobalVolume`**: Returns a mock global volume value (0.8)
5. **`getCategoryVolume`**: Returns a mock category volume value (0.8)

These additions ensure the mock fully implements the `AudioManager` interface, preventing TypeScript compilation errors while providing sensible default values for testing.

## User Request 6
How do I fix the following problem in the above code?: Property 'getAllCategoryVolumes' is missing in type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; ... 9 more ...; getCategoryVolume: Mock<...>; }' but required in type 'AudioManager'.

## Assistant Response 6
The mock audio manager is missing the `getAllCategoryVolumes` method. Here's the fix:

```typescript
getGlobalVolume: vi.fn().mockReturnValue(0.8),
getCategoryVolume: vi.fn().mockReturnValue(0.8),
getAllCategoryVolumes: vi.fn().mockReturnValue({}),
```

The fix adds the missing `getAllCategoryVolumes` method to the mock audio manager, returning an empty object `{}` as a sensible default for testing. This method likely returns a record/map of all category names to their volume values, so an empty object indicates no custom category volumes are set.

## Final Performance Fix for React Tests## 
User Request 7
How do I fix the following problem in the above code?: Type 'Performance' is missing the following properties from type 'Performance': eventCounts, navigation, onresourcetimingbufferfull, timing, and 3 more.

## Assistant Response 7
The issue is the same as before - the Node.js `performance` object doesn't have all the properties that the browser's `Performance` interface expects. Here's the fix:

```typescript
// Mock performance for timing tests
global.performance = {
  now: performance.now.bind(performance),
  mark: vi.fn(),
  measure: vi.fn(),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn(),
  getEntries: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
  getEntriesByType: vi.fn(() => [])
} as any;
```

This fix creates a proper mock performance object that:

1. **Provides the essential `now()` method** from Node.js performance for timing measurements
2. **Mocks other performance methods** that might be called but aren't critical for the tests
3. **Avoids TypeScript type conflicts** by providing a more complete mock object
4. **Ensures consistency** with the same approach used in the E2E test file

This allows your React integration tests to use `performance.now()` for timing measurements while avoiding TypeScript type mismatches between Node.js and browser Performance APIs.

## Summary

This session focused on fixing various TypeScript compilation errors in test files:

1. **Private property access**: Fixed by adding public methods to access private properties
2. **Mock fetch type mismatch**: Fixed by properly typing the mock function parameters and return type
3. **Performance object type mismatch**: Fixed by creating comprehensive mock objects
4. **Missing AudioManager interface methods**: Fixed by adding all required mock methods
5. **Buffer source event handling**: Fixed by correcting the scope of property assignment

All fixes maintain proper encapsulation and provide realistic mock behavior for comprehensive testing.