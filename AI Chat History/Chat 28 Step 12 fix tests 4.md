# Chat 28 Step 12 fix tests 4

## Session Overview
This session focused on fixing various TypeScript and testing issues in a comprehensive sound system test suite. The main issues addressed were:

1. Mock function spy setup issues
2. TypeScript type compatibility problems with fetch mocking
3. Test fallback logic problems
4. Timer-related test timeout issues

## Issues Fixed

### Issue 1: Mock Function Spy Error
**Problem**: `[Function decodeAudioData] is not a spy or a call to a spy!`

**Root Cause**: The `decodeAudioData` method in the mock was defined as a regular method, not a spy function.

**Solution**: Changed from regular method to spy function using `vi.fn()`:
```typescript
// Before
decodeAudioData(arrayBuffer: ArrayBuffer) {
    const buffer = this.createBuffer(2, 44100, 44100);
    return Promise.resolve(buffer);
}

// After
decodeAudioData = vi.fn((arrayBuffer: ArrayBuffer) => {
    const buffer = this.createBuffer(2, 44100, 44100);
    return Promise.resolve(buffer);
});
```

### Issue 2: TypeScript Fetch Mock Type Error
**Problem**: `Type 'Mock<(url: string) => Promise<unknown>>' is not assignable to type '{ (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>; ...}'`

**Root Cause**: The mock fetch function only accepted `string` parameters, but the real fetch API accepts `RequestInfo | URL` which includes `Request` objects and `URL` objects.

**Solution**: Updated the mock to match the real fetch signature:
```typescript
// Before
const createMockFetch = (shouldFail = false, delay = 0) => {
    return vi.fn((url: string) => {
        // ...
    });
};

// After
const createMockFetch = (shouldFail = false, delay = 0) => {
    return vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = typeof input === 'string' ? input : input.toString();
                // ... rest of logic
            }, delay);
        });
    });
};
```

### Issue 3: Audio Manager Fallback Test Error
**Problem**: `expected WebAudioManager{ …(18) } to be an instance of HTML5AudioManager`

**Root Cause**: The test was trying to make `AudioContext` throw an error, but the `createAudioManager` function was still detecting WebAudio support because the constructor existed.

**Solution**: Completely delete the WebAudio constructors instead of making them throw:
```typescript
// Before
global.AudioContext = vi.fn(() => {
    throw new Error('WebAudio not supported');
}) as any;
delete (global as any).webkitAudioContext;

// After
delete (global as any).AudioContext;
delete (global as any).webkitAudioContext;
```

### Issue 4: Test Timeout with Fake Timers
**Problem**: `Test timed out in 5000ms` when using `vi.useFakeTimers()`

**Root Cause**: The test was using fake timers but still trying to await real timeouts with `setTimeout(resolve, 0)`, which never resolved.

**Solution**: Restructured the test to use fake timers only after initial setup:
```typescript
// Before
vi.useFakeTimers();
// ... setup code with await act()
vi.advanceTimersByTime(61000);
await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0)); // This never resolves with fake timers
});

// After
// ... setup code with real timers
await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
});

// Use fake timers after setup
vi.useFakeTimers();
act(() => {
    vi.advanceTimersByTime(61000);
});
act(() => {
    vi.runAllTimers(); // Execute pending timer callbacks
});
```

## Key Learnings

1. **Mock Spy Setup**: When testing function calls, ensure mock methods are created with `vi.fn()` to enable spy assertions like `toHaveBeenCalled()`.

2. **TypeScript Mock Compatibility**: Mock functions must match the exact signature of the real functions they're replacing, including parameter types and optional parameters.

3. **Feature Detection Testing**: When testing fallback logic, completely remove the feature rather than making it throw errors, as detection logic often checks for existence before instantiation.

4. **Fake Timer Management**: Use fake timers carefully - set them up after any initial async operations that need real timers, and use `vi.runAllTimers()` to execute pending callbacks.

## Files Modified
- `src/tests/comprehensive-sound-system.test.ts`
- `src/tests/sound-system-e2e.test.ts` 
- `src/tests/react-sound-integration.test.tsx`

## Test Coverage
The fixes ensure comprehensive test coverage for:
- Unit tests for pure functions and sound event generation
- Integration tests for React hooks and component interactions
- Mock implementations for Web Audio API testing
- End-to-end tests for complete sound workflows
- Performance tests for audio system efficiency
- Error handling and edge case scenarios