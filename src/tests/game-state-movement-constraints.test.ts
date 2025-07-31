import { describe, it, expect } from 'vitest';
import {
    createInitialGameState,
    movePlayer,
    type GameStateData,
} from '../GameState';
import { updateBoulderMovement } from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('GameState Movement Constraints Integration', () => {
    // Test maze with boulders for testing movement constraints
    const testMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    describe('Initial game state with movement constraints', () => {
        it('should create initial game state with boulder state manager and movement constraints', () => {
            const gameState = createInitialGameState(testMaze);

            expect(gameState.boulderStateManager).toBeDefined();
            expect(gameState.movementConstraint).toBeDefined();
            expect(gameState.boulderStateManager.boulders.size).toBe(3);
            expect(gameState.boulderStateManager.movingBoulderCount).toBe(0);
            expect(gameState.movementConstraint.isPlayerMovementBlocked).toBe(false);
            expect(gameState.movementConstraint.blockingReason).toBe('none');
        });

        it('should initialize boulder state manager with correct boulder positions', () => {
            const gameState = createInitialGameState(testMaze);

            const expectedPositions = [
                { x: 1, y: 1 },
                { x: 3, y: 1 },
                { x: 1, y: 3 },
            ];

            for (const pos of expectedPositions) {
                const key = `${pos.x},${pos.y}`;
                const boulderState = gameState.boulderStateManager.boulders.get(key);
                expect(boulderState).toBeDefined();
                expect(boulderState?.position).toEqual(pos);
                expect(boulderState?.isTriggered).toBe(false);
                expect(boulderState?.isMoving).toBe(false);
            }
        });
    });

    describe('Player movement with no boulder constraints', () => {
        it('should allow normal player movement when no boulders are moving', () => {
            const initialState = createInitialGameState(testMaze);
            expect(initialState.player).toEqual({ x: 2, y: 2 });

            // Move player right
            const newState = movePlayer(initialState, 1, 0);

            expect(newState.player).toEqual({ x: 3, y: 2 });
            expect(newState.moves).toBe(54); // Decremented from 55
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });

        it('should update player position in boulder state manager after movement', () => {
            const initialState = createInitialGameState(testMaze);

            // Move player left
            const newState = movePlayer(initialState, -1, 0);

            expect(newState.player).toEqual({ x: 1, y: 2 });
            expect(newState.boulderStateManager.lastPlayerPosition).toEqual({ x: 1, y: 2 });
        });

        it('should maintain boulder state consistency after normal movement', () => {
            const initialState = createInitialGameState(testMaze);

            // Move player up
            const newState = movePlayer(initialState, 0, -1);

            expect(newState.boulderStateManager.boulders.size).toBe(3);
            expect(newState.boulderStateManager.movingBoulderCount).toBe(0);
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });
    });

    describe('Player movement blocked by boulder constraints', () => {
        it('should block player movement when boulders are moving', () => {
            const initialState = createInitialGameState(testMaze);

            // Simulate a boulder starting to move
            const stateWithMovingBoulder: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 1 }],
                    []
                ),
            };

            // Update movement constraint to reflect the moving boulder
            stateWithMovingBoulder.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            const originalPlayerPos = stateWithMovingBoulder.player;

            // Attempt to move player - should be blocked
            const newState = movePlayer(stateWithMovingBoulder, 1, 0);

            expect(newState.player).toEqual(originalPlayerPos); // Player didn't move
            expect(newState.moves).toBe(55); // Moves not decremented
            expect(newState.score).toBe(0); // Score unchanged
        });

        it('should block movement in all directions when boulders are moving', () => {
            const initialState = createInitialGameState(testMaze);

            // Create state with multiple moving boulders
            const stateWithMovingBoulders: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                    []
                ),
            };

            stateWithMovingBoulders.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            const originalPlayerPos = stateWithMovingBoulders.player;
            const directions = [
                [0, -1], // Up
                [0, 1],  // Down
                [-1, 0], // Left
                [1, 0],  // Right
            ];

            for (const [dx, dy] of directions) {
                const newState = movePlayer(stateWithMovingBoulders, dx, dy);
                expect(newState.player).toEqual(originalPlayerPos);
                expect(newState.moves).toBe(55);
            }
        });

        it('should allow movement again after all boulders stop moving', () => {
            const initialState = createInitialGameState(testMaze);

            // Start with moving boulders
            let stateWithMovingBoulders: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 1 }],
                    []
                ),
            };

            stateWithMovingBoulders.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Verify movement is blocked
            let blockedState = movePlayer(stateWithMovingBoulders, 1, 0);
            expect(blockedState.player).toEqual(initialState.player);

            // Stop all boulders
            const stateWithStoppedBoulders: GameStateData = {
                ...stateWithMovingBoulders,
                boulderStateManager: updateBoulderMovement(
                    stateWithMovingBoulders.boulderStateManager,
                    [],
                    [{ x: 1, y: 1 }]
                ),
            };

            stateWithStoppedBoulders.movementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'none',
            };

            // Verify movement is now allowed
            const allowedState = movePlayer(stateWithStoppedBoulders, 1, 0);
            expect(allowedState.player).toEqual({ x: 3, y: 2 });
            expect(allowedState.moves).toBe(54);
        });
    });

    describe('Movement constraints with game state changes', () => {
        it('should not block movement when player dies', () => {
            // Create maze with bomb next to player
            const bombMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOMB, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const initialState = createInitialGameState(bombMaze);

            // Set boulder as moving
            const stateWithMovingBoulder: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 2 }],
                    []
                ),
            };

            stateWithMovingBoulder.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Move player into bomb - should be blocked by boulder constraint
            const newState = movePlayer(stateWithMovingBoulder, 1, 0);

            expect(newState.player).toEqual({ x: 1, y: 1 }); // Player didn't move
            expect(newState.gameState).toBe('playing'); // Game still playing
        });

        it('should not block movement when player wins', () => {
            // Create maze with exit next to player and no diamonds
            const exitMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EXIT, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            let initialState = createInitialGameState(exitMaze);
            initialState.diamonds = 0; // No diamonds to collect

            // Set boulder as moving
            const stateWithMovingBoulder: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 2 }],
                    []
                ),
            };

            stateWithMovingBoulder.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Move player to exit - should be blocked by boulder constraint
            const newState = movePlayer(stateWithMovingBoulder, 1, 0);

            expect(newState.player).toEqual({ x: 1, y: 1 }); // Player didn't move
            expect(newState.gameState).toBe('playing'); // Game still playing
        });
    });

    describe('Movement constraints with invalid moves', () => {
        it('should not affect constraint state when move is invalid due to boundaries', () => {
            const initialState = createInitialGameState(testMaze);

            // Try to move player out of bounds (up from position 2,2 to 2,1 is valid, but 2,0 would be rock)
            // Let's move to a corner first
            const cornerMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const cornerState = createInitialGameState(cornerMaze);

            // Try to move out of bounds
            const newState = movePlayer(cornerState, -1, 0);

            expect(newState.player).toEqual({ x: 0, y: 0 }); // Player didn't move
            expect(newState.boulderStateManager).toEqual(cornerState.boulderStateManager);
            expect(newState.movementConstraint).toEqual(cornerState.movementConstraint);
        });

        it('should not affect constraint state when move is blocked by rocks', () => {
            const initialState = createInitialGameState(testMaze);

            // Try to move into rock (up from center position)
            const newState = movePlayer(initialState, 0, -2); // This would hit the rock border

            expect(newState.player).toEqual(initialState.player); // Player didn't move
            expect(newState.boulderStateManager.lastPlayerPosition).toBeNull(); // Not updated
            expect(newState.movementConstraint).toEqual(initialState.movementConstraint);
        });

        it('should not affect constraint state when move is blocked by boulders', () => {
            // Create a specific maze where player can hit a boulder
            const boulderBlockMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const boulderBlockState = createInitialGameState(boulderBlockMaze);

            // Try to move into boulder (right from position 1,1 to boulder at 2,1)
            const newState = movePlayer(boulderBlockState, 1, 0);

            expect(newState.player).toEqual(boulderBlockState.player); // Player didn't move
            expect(newState.boulderStateManager.lastPlayerPosition).toBeNull(); // Not updated
            expect(newState.movementConstraint).toEqual(boulderBlockState.movementConstraint);
        });
    });

    describe('Edge cases and error handling', () => {
        it('should handle game state with null player', () => {
            const initialState = createInitialGameState(testMaze);
            const stateWithNullPlayer: GameStateData = {
                ...initialState,
                player: null,
            };

            const newState = movePlayer(stateWithNullPlayer, 1, 0);

            expect(newState).toEqual(stateWithNullPlayer); // State unchanged
        });

        it('should handle game state when game is not playing', () => {
            const initialState = createInitialGameState(testMaze);
            const deadGameState: GameStateData = {
                ...initialState,
                gameState: 'dead',
            };

            const newState = movePlayer(deadGameState, 1, 0);

            expect(newState).toEqual(deadGameState); // State unchanged
        });

        it('should maintain constraint consistency with empty boulder state', () => {
            const emptyMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const emptyState = createInitialGameState(emptyMaze);

            expect(emptyState.boulderStateManager.boulders.size).toBe(0);
            expect(emptyState.boulderStateManager.movingBoulderCount).toBe(0);
            expect(emptyState.movementConstraint.isPlayerMovementBlocked).toBe(false);

            // Movement should work normally
            const newState = movePlayer(emptyState, 0, 1); // This would be blocked by rock, but constraint logic should work
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });
    });

    describe('Performance considerations', () => {
        it('should handle large numbers of boulders efficiently', () => {
            // Create a maze with many boulders
            const largeMaze: MazeCell[][] = Array(20).fill(null).map((_, y) =>
                Array(20).fill(null).map((_, x) => {
                    if (y === 0 || y === 19 || x === 0 || x === 19) return CELL.ROCK;
                    if (x === 10 && y === 10) return CELL.PLAYER;
                    return Math.random() < 0.3 ? CELL.BOULDER : CELL.EMPTY;
                })
            );

            const largeState = createInitialGameState(largeMaze);

            // Should create state efficiently
            expect(largeState.boulderStateManager).toBeDefined();
            expect(largeState.movementConstraint).toBeDefined();
            expect(largeState.movementConstraint.isPlayerMovementBlocked).toBe(false);

            // Movement should work efficiently
            const newState = movePlayer(largeState, 1, 0);
            expect(newState.player).toEqual({ x: 11, y: 10 });
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });

        it('should handle rapid movement attempts efficiently', () => {
            const initialState = createInitialGameState(testMaze);
            let currentState = initialState;

            // Perform many movement operations
            const movements = [
                [1, 0], [-1, 0], [0, 1], [0, -1],
                [1, 0], [-1, 0], [0, 1], [0, -1],
            ];

            for (const [dx, dy] of movements) {
                currentState = movePlayer(currentState, dx, dy);
                expect(currentState.movementConstraint).toBeDefined();
                expect(currentState.boulderStateManager).toBeDefined();
            }

            // Final state should be consistent
            expect(currentState.movementConstraint.isPlayerMovementBlocked).toBe(false);
            expect(currentState.boulderStateManager.movingBoulderCount).toBe(0);
        });
    });
});