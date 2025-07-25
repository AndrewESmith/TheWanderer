# Chat 25 Step 10 fix tests 9 - mute check passes

## User Request
FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error Event Emission > should emit fallback events when switching audio managersAssertionError: expected "spy" to be called with arguments: [ ObjectContaining{…} ]

## Analysis
I examined the failing test and found that the test expected fallback events to be emitted when `createAudioManager()` falls back to HTML5AudioManager or SilentAudioManager, but the original implementation only logged warnings without emitting events.

## Files Examined
- `src/audio/__tests__/error-handling.test.ts` - The failing test file
- `src/audio/managers/audio-manager.ts` - The audio manager implementation

## Issue Identified
The test "should emit fallback events when switching audio managers" was failing because:

1. The test expected a fallback event to be emitted when `createAudioManager()` is called and falls back to HTML5AudioManager
2. However, the `createAudioManager()` function only logged warnings but didn't emit any events
3. The fallback events were only emitted from within the `WebAudioManager` class when it switches to fallback mode

## Solution Implemented
Updated the `createAudioManager()` function to emit appropriate fallback events:

### Before:
```typescript
export function createAudioManager(): AudioManager {
    // Check for Web Audio API support
    if (window.AudioContext || (window as any).webkitAudioContext) {
        return new WebAudioManager();
    }

    // Check for HTML5 Audio support
    if (typeof Audio !== 'undefined') {
        console.warn('Web Audio API not supported, using HTML5 Audio fallback');
        return new HTML5AudioManager();
    }

    // No audio support available
    console.warn('No audio support detected, using silent mode');
    return new SilentAudioManager();
}
```

### After:
```typescript
export function createAudioManager(): AudioManager {
    // Check for Web Audio API support
    if (window.AudioContext || (window as any).webkitAudioContext) {
        return new WebAudioManager();
    }

    // Check for HTML5 Audio support
    if (typeof Audio !== 'undefined') {
        console.warn('Web Audio API not supported, using HTML5 Audio fallback');
        
        // Emit fallback event
        const fallbackEvent = new CustomEvent('audioManagerFallback', {
            detail: {
                from: 'WebAudio',
                to: 'HTML5Audio',
                reason: 'WEB_AUDIO_API_NOT_SUPPORTED',
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(fallbackEvent);
        
        return new HTML5AudioManager();
    }

    // No audio support available
    console.warn('No audio support detected, using silent mode');
    
    // Emit fallback event for silent mode
    const silentEvent = new CustomEvent('audioManagerFallback', {
        detail: {
            from: 'WebAudio',
            to: 'Silent',
            reason: 'NO_AUDIO_SUPPORT',
            timestamp: Date.now()
        }
    });
    window.dispatchEvent(silentEvent);
    
    return new SilentAudioManager();
}
```

## Test Results
After the fix, the specific failing test now passes consistently:

```
✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit fallback events when switching audio managers 7ms
```

## Event Details
The fallback events now include:
- `from`: The original intended audio manager type ('WebAudio')
- `to`: The fallback audio manager type ('HTML5Audio' or 'Silent')  
- `reason`: A descriptive reason for the fallback
- `timestamp`: When the fallback occurred

This ensures that external code can listen for these fallback events and handle them appropriately, which is exactly what the test was checking for.

## Status
✅ **FIXED** - The test "should emit fallback events when switching audio managers" now passes consistently.

Note: There are other failing tests in the error handling suite, but the specific test mentioned in the user request is now working correctly.