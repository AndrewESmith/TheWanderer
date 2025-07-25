# Chat 25 Step 10 fix tests 12

## Initial Problem
User reported a failing test in the audio error handling system:

```
FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error Event Emission > should emit error events for external handlingAssertionError: expected "spy" to be called with arguments: [ ObjectContaining{…} ]
```

## Analysis
I examined the failing test and found that it expected the `playSound` method to emit error events when trying to play a nonexistent sound, but the current implementation was only logging a warning and returning without emitting any events.

The test was calling:
```typescript
manager.playSound('NONEXISTENT_SOUND');
```

And expecting:
```typescript
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
```

## Root Cause
The `playSound` method in `WebAudioManager` was handling missing sound buffers by simply logging a warning and returning, without:
1. Attempting to load the sound on-demand
2. Emitting error events for external handling

## Solution Implemented

### 1. Modified playSound Method
Changed the behavior when a sound buffer is not found:

**Before:**
```typescript
const buffer = this.state.soundBuffers.get(soundId);
if (!buffer) {
    console.warn(`Sound buffer not found for ${soundId}`);
    return;
}
```

**After:**
```typescript
const buffer = this.state.soundBuffers.get(soundId);
if (!buffer) {
    console.log(`Attempting on-demand load for ${soundId}`);
    this.attemptOnDemandLoad(soundId, options);
    return;
}

// Validate buffer before playback
if (!this.isValidBuffer(buffer)) {
    console.warn(`Invalid buffer for ${soundId}`, soundId);
    return;
}
```

### 2. Added On-demand Loading Method
Created `attemptOnDemandLoad` method to handle loading sounds that weren't preloaded:

```typescript
/**
 * Attempt to load a sound on-demand when it's not found in the buffer
 */
private async attemptOnDemandLoad(soundId: string, options: PlaySoundOptions = {}): Promise<void> {
    if (!this.state.audioContext) {
        const error = new Error(`Cannot load sound ${soundId}: Audio context not available`);
        this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
        return;
    }

    const asset = SOUND_ASSETS[soundId];
    if (!asset) {
        const error = new Error(`Sound asset not found: ${soundId}`);
        this.emitErrorEvent('SOUND_LOAD_ERROR', error, soundId);
        return;
    }

    try {
        const buffer = await this.assetLoader.loadAudioBuffer(soundId, asset, this.state.audioContext);
        if (buffer) {
            this.state.soundBuffers.set(soundId, buffer);
            this.state.loadedSounds.add(soundId);
            // Now try to play the sound again
            this.playSound(soundId, options);
        } else {
            throw new Error(`Failed to load audio buffer for ${soundId}`);
        }
    } catch (error) {
        this.emitErrorEvent('SOUND_LOAD_ERROR', error as Error, soundId);
    }
}
```

### 3. Added Buffer Validation
Created `isValidBuffer` method to validate audio buffers before playback:

```typescript
/**
 * Validate if an audio buffer is valid for playback
 */
private isValidBuffer(buffer: AudioBuffer): boolean {
    return buffer && 
           buffer.length > 0 && 
           buffer.numberOfChannels > 0 && 
           buffer.sampleRate > 0 && 
           buffer.duration > 0;
}
```

## Test Results

### Before Fix
```
FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error Event Emission > should emit error events for external handling
AssertionError: expected "spy" to be called with arguments: [ ObjectContaining{…} ]
```

### After Fix
```
✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit error events for external handling 7ms
✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should attempt on-demand loading when buffer not found 6ms
✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should validate audio buffers before playback 5ms
```

## Additional Tests Fixed
The implementation also fixed several related tests:
- ✅ "should attempt on-demand loading when buffer not found"
- ✅ "should validate audio buffers before playback" 
- ✅ "should emit error events for external handling"
- ✅ "should emit fallback events when switching audio managers"
- ✅ "should handle audio context interruption on iOS Safari"

## Summary
The fix successfully implemented:

1. **Error Event Emission**: The system now properly emits error events when sounds cannot be played or loaded
2. **On-demand Loading**: Sounds that weren't preloaded are now attempted to be loaded when requested
3. **Buffer Validation**: Audio buffers are validated before playback to catch invalid data
4. **Robust Error Handling**: Better error handling throughout the audio playback pipeline

The main failing test now passes, and the audio system has more comprehensive error handling with proper event emission for external error handlers.