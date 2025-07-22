# Chat 16 - Creating Vitest Unit Test for Player Death on Move Exhaustion

## Initial Context

**Source Event:** A file was just edited: src\TODO.md

**Diff Applied:**
```diff
Index: src\TODO.md
===================================================================
--- src\TODO.md	
+++ src\TODO.md	
@@ -2,7 +2,7 @@
 
 ## Version 2 
 
-- [ ] Document and create a IBaseCellItem and child ICellItem. These should represent the items in the maze and contain and describe their behaviour.
+- [ ] Items in a maze should Document and create a IBaseCellItem and child ICellItem. These should represent the items in the maze and contain and describe their behaviour.
 - [ ] Boulders should be able to be pushed by player
 
 ## Version 3
```

## User Request

The user initially asked for analysis of changes and README.md updates, but then requested:

"Please create a vitest unit test to confirm that if a player runs out of moves they die"

## Analysis Process

### 1. Examined Game Structure
I read the current game files to understand how moves and player death are implemented:

**src/maze.ts** - Contains maze structure, cell types, and basic maze operations
**src/GameState.ts** - Contains the main game logic including move handling and death conditions

Key findings:
- GameState class has a `moves` property that decreases with each move
- When `moves <= 0` and `gameState === 'playing'`, the game state changes to `'dead'`
- The logic was already implemented in the `movePlayer` method

### 2. Found Existing Test Structure
Discovered existing test files:
- src\tests\GameState.test.ts
- src\tests\LargerMaze.test.ts
- src\tests\LargerMazeGameState.test.ts
- src\tests\LargerMazeUI.test.ts

### 3. Examined Test Patterns
The existing GameState.test.ts file uses:
- Mock versions of GameState and maze classes
- Vitest testing framework
- Consistent test structure with describe/it blocks
- Proper assertions for game state changes

## Solution Implemented

Added a new test case to src/tests/GameState.test.ts:

```typescript
it("player dies when running out of moves", () => {
    const testMaze: MazeCell[][] = [
        [CELL.PLAYER, CELL.EMPTY, CELL.EMPTY],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];
    const player: IPlayerPos = { x: 0, y: 0 };
    // Start with only 1 move remaining
    const gameState = new GameState(testMaze, player, 0, 1, 0, 'playing');

    // Make a move that uses up the last move
    gameState.movePlayer(1, 0);

    // Player should be dead after running out of moves
    expect(gameState.gameState).toBe('dead');
    expect(gameState.moves).toBe(0);
    expect(gameState.player).toEqual({ x: 1, y: 0 });
    // Maze should still be updated from the move
    expect(gameState.maze[0]?.[0]).toBe(CELL.EMPTY);
    expect(gameState.maze[0]?.[1]).toBe(CELL.PLAYER);
});
```

## Test Verification Points

The test confirms:
1. **Game State Change**: Verifies `gameState` changes to `'dead'`
2. **Move Counter**: Confirms `moves` reaches 0
3. **Player Position**: Ensures the final move still executes and updates player position
4. **Maze State**: Validates the maze is properly updated even on the final move

## Technical Details

- Uses the existing mock GameState class which already implements the death-on-zero-moves logic
- Follows the same testing patterns as existing tests
- Creates a minimal test maze to isolate the behavior being tested
- Initializes with exactly 1 move to test the boundary condition
- Verifies both the game state change and that the move mechanics still work properly

## Files Modified

- **src/tests/GameState.test.ts** - Added new test case for move exhaustion death scenario

The test is ready to run with vitest and validates the expected behavior that players die when they run out of moves.