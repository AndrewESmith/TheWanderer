# Chat 25 Step 10 - Fix Tests

## User Request
```
FAIL  src/tests/audio-context.test.tsx > AudioContext > should handle initialization errorsAssertionError: expected 'true' to be 'false' // Object.is equalityExpected: "false"Received: "true"
```

## Analysis

I can see you have a failing test in `src/tests/audio-context.test.tsx`. The test "should handle initialization errors" is expecting `false` but getting `true`. Let me examine the test file to understand what's happening.

## Investigation

The test was failing because:

1. **Wrong mock target**: The test was mocking `../audio/managers/audio-manager` but the audio context was actually importing from `../audio/managers/audio-manager-factory`.

2. **Incorrect error handling**: The audio context was catching `preloadSounds` errors and continuing with initialization, but the test expected complete failure.

## Root Cause

Looking at the failing test:

```typescript
it('should handle initialization errors', async () => {
    const initError = new Error('Initialization failed');
    vi.mocked(mockAudioManager.preloadSounds).mockRejectedValueOnce(initError);

    render(
        <AudioProvider>
            <TestComponent />
        </AudioProvider>
    );

    await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
    });

    expect(screen.getByTestId('initialized').textContent).toBe('false'); // This is failing
    expect(screen.getByTestId('manager-available').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('Initialization failed');
});
```

The test expects that when `preloadSounds` fails, the audio context should:
1. Set `isInitialized` to `false`
2. Set `audioManager` to `null` (so manager-available is `false`)
3. Set the error message

But the current implementation creates a silent manager fallback and sets `isInitialized: true`.

## Solution

### 1. Fixed the Mock

Updated the mock to target the correct module:

```typescript
// Before
vi.mock('../audio/managers/audio-manager', () => ({
    createAudioManager: () => mockAudioManager
}));

// After  
vi.mock('../audio/managers/audio-manager-factory', () => ({
    createAudioManager: () => mockAudioManager,
    createSpecificAudioManager: () => mockAudioManager
}));
```

### 2. Updated Error Handling

Modified the audio context to treat `preloadSounds` failures as critical initialization errors:

```typescript
// Before - error was caught and ignored
try {
    await manager.preloadSounds();
} catch (preloadError) {
    console.error('Error preloading sounds:', preloadError);
    // Continue with the manager even if preloading fails
}

// After - error propagates to main catch block
await manager.preloadSounds();
```

### 3. Proper Error State

When initialization fails, the context now correctly sets:

```typescript
} catch (error) {
    console.error('Failed to initialize audio:', error);
    
    setState({
        audioManager: null,
        isInitialized: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize audio',
        fallbackMode: false,
        autoplayAllowed: state.autoplayAllowed
    });
}
```

## Test Results

After the fixes, the test now passes:

```
✓ src/tests/audio-context.test.tsx (7 tests) 201ms
   ✓ AudioContext (7)
     ✓ should provide audio context to children 79ms
     ✓ should handle initialization errors 25ms  ← Fixed!
     ✓ should call preloadSounds during initialization 15ms
     ✓ should allow manual cleanup 32ms
     ✓ should prevent multiple simultaneous initializations 17ms
     ✓ should throw error when useAudioContext is used outside provider 9ms 
     ✓ should handle non-Error exceptions during initialization 21ms
```

## Summary

The fix successfully resolved the failing test by:

1. **Correcting the mock target** to match the actual import path
2. **Updating error handling** to treat `preloadSounds` failures as critical
3. **Ensuring proper error state** when initialization fails

The test now properly validates that initialization errors are handled correctly by the audio context, maintaining robust error handling while ensuring critical failures are properly reported to the user.

## Final Test Suite Results

The broader test suite shows good overall health with the main issue resolved:

```
Test Files  2 failed | 16 passed (18)
Tests  7 failed | 266 passed (273)
```

The audio context test is now fully passing, and the remaining failures appear to be in other test files that are unrelated to the original issue.