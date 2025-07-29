# Stop sound on player movement
_Exported on 7/29/2025 at 21:11:18 GMT+10 from Cursor (1.2.4)_

---

**User**

Is it possible to stop playing an active sound if the player moves before the sound finishes playing? 

---

**Cursor**

I'll search for the current sound system implementation to understand how sounds are played and if there's a way to stop them when the player moves.


Now let me search for how player movement is handled and where sounds are triggered:


Now let me look at the audio manager interfaces to see if there's a way to stop individual sounds:


Let me check if there are any methods to stop individual sounds in the audio managers:


I can see from the TODO.md file that there's already a planned feature to "Stop active sound if player presses a key." Let me check the current implementation to see what's available:


Now let me check how the current audio system works and see if there's a way to implement stopping individual sounds. Let me look at the audio manager implementations:


Now let me check how the HTML5 audio manager handles stopping sounds:


Based on my analysis of the codebase, here's what I found regarding stopping active sounds when the player moves:

## Current State

**Yes, it's possible to stop active sounds when the player moves**, but the current implementation only has `stopAllSounds()` functionality. Here's what exists:

### Current Capabilities:
1. **`stopAllSounds()`** - Stops ALL currently playing sounds
2. **Game end sound management** - Already stops movement sounds when the game ends (death/victory)
3. **Active sound tracking** - Both audio managers track active sounds:
   - WebAudio: `activeSources: Set<AudioBufferSourceNode>`
   - HTML5: `activeAudio: Set<HTMLAudioElement>`

### Current Implementation:
```typescript
// In GameState.ts - already stops sounds on game end
if (newGameState !== 'playing' && previousGameState === 'playing') {
    handleGameEndSounds(newGameState); // This calls stopAllSounds()
}
```

## Implementation Options

### Option 1: Stop All Sounds on Player Movement
Add `stopAllSounds()` call before playing new movement sounds:

```typescript
// In GameState.ts movePlayer function
const playerSoundEvents = generatePlayerMoveEvents(...);
if (playerSoundEvents.length > 0) {
    stopAllSounds(); // Stop any currently playing sounds
    emitSoundEvents(playerSoundEvents);
}
```

### Option 2: Stop Only Movement Sounds
Add a `stopMovementSounds()` method to audio managers that only stops walk/dig sounds:

```typescript
// Add to IAudioManager interface
stopMovementSounds(): void;

// Implementation in audio managers
stopMovementSounds(): void {
    // Stop only sounds with movement-related IDs
    const movementSoundIds = ['player_walk', 'player_dig', 'boulder_move', 'arrow_move'];
    // Filter and stop only these sounds
}
```

### Option 3: Individual Sound Stopping
Add `stopSound(soundId: string)` method to stop specific sounds:

```typescript
// Add to IAudioManager interface
stopSound(soundId: string): void;

// Implementation would stop specific sound instances
```

## Recommendation

**Option 1 is the simplest** and would give you the behavior you want. You'd just need to:

1. Add `stopAllSounds` to the `useSound` hook (already exists)
2. Call it before playing new movement sounds in `GameState.ts`

This would ensure that when a player moves, any currently playing sounds (like walk/dig sounds) are stopped before the new movement sound plays, preventing sound overlap.

Would you like me to implement this solution?

```typescript
// In GameState.ts - already stops sounds on game end
if (newGameState !== 'playing' && previousGameState === 'playing') {
    handleGameEndSounds(newGameState); // This calls stopAllSounds()
}
```

```typescript
// In GameState.ts movePlayer function
const playerSoundEvents = generatePlayerMoveEvents(...);
if (playerSoundEvents.length > 0) {
    stopAllSounds(); // Stop any currently playing sounds
    emitSoundEvents(playerSoundEvents);
}
```

```typescript
// Add to IAudioManager interface
stopMovementSounds(): void;

// Implementation in audio managers
stopMovementSounds(): void {
    // Stop only sounds with movement-related IDs
    const movementSoundIds = ['player_walk', 'player_dig', 'boulder_move', 'arrow_move'];
    // Filter and stop only these sounds
}
```

```typescript
// Add to IAudioManager interface
stopSound(soundId: string): void;

// Implementation would stop specific sound instances
```

---

**User**

yes please

---

**Cursor**

I'll implement Option 1 to stop all sounds when the player moves. Let me first check the current GameState implementation and then add the stopAllSounds call.


Now I need to check how the sound events are emitted to understand where to add the stopAllSounds call:


Now I need to understand how the sound system is integrated with the App component to see where I can add the stopAllSounds call. Let me check the App.tsx file:


Perfect! Now I can see the structure. The `movePlayer` function in App.tsx calls `gameState.movePlayer(dx, dy)`, which triggers the sound events. I need to modify the `movePlayer` function to stop all sounds before calling the game state's movePlayer method.

Let me implement this:


```typescriptreact
  const movePlayer = React.useCallback(
    (dx: number, dy: number) => {
      // Call the GameState method
      gameState.movePlayer(dx, dy);
      // Force re-render
      forceUpdate();
    },
    [gameState, forceUpdate]
  );

->

  const movePlayer = React.useCallback(
    (dx: number, dy: number) => {
      // Stop all currently playing sounds before the player moves
      stopAllSounds();
      // Call the GameState method
      gameState.movePlayer(dx, dy);
      // Force re-render
      forceUpdate();
    },
    [gameState, forceUpdate, stopAllSounds]
  );
```

Now let me run the tests to make sure this change doesn't break anything:


Great! The tests are passing. Now let me run a broader test to make sure I haven't broken anything else:


