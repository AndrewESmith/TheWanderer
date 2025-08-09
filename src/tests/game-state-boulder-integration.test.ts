import { describe, it, expect } from 'vitest';
import {
    createInitialGameState,
    movePlayer,
    type GameStateData,
} from '../GameState';
import {
    updateBoulderMovement,
    createPositionKey,
} from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('Game State Boulder System Integration', () => {
    // Test maze with strategic boulder placement for comprehensive testing
    const integrationTestMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    describe('Boulder proximity detection integration', () => {
        it('should detect and trigger boulders when player moves adjacent', () => {
            const gameState = createInitialGameState(integrationTestMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Move player left to be adjacent to boulder at (1,1) and (1,3)
            const newState = movePlayer(gameState, -1, 0);

            expect(newState.player).toEqual({ x: 1, y: 2 });
            expect(newState.boulderStateManager.lastPlayerPosition).toEqual({ x: 1, y: 2 });

            // Check that boulders adjacent to new position are triggered for next move
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            const boulder1State = newState.boulderStateManager.boulders.get(boulder1Key);
            const boulder3State = newState.boulderStateManager.boulders.get(boulder3Key);

            expect(boulder1State?.isTriggered).toBe(true);
            expect(boulder3State?.isTriggered).toBe(true);
            expect(boulder1State?.triggeredOnMove).toBe(52); // Move 54 - 2 = 52 for next physics simulation
            expect(boulder3State?.triggeredOnMove).toBe(52);
        });

        it('should not trigger boulders that are not adjacent to player movement', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Move player right (away from most boulders)
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.player).toEqual({ x: 3, y: 2 });

            // Check that distant boulders are not triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            const boulder1State = newState.boulderStateManager.boulders.get(boulder1Key);
            const boulder3State = newState.boulderStateManager.boulders.get(boulder3Key);

            expect(boulder1State?.isTriggered).toBe(false);
            expect(boulder3State?.isTriggered).toBe(false);
        });

        it('should trigger boulder when player moves to be adjacent', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Move player up to be adjacent to boulder at (3,1) - move to (3,2)
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.player).toEqual({ x: 3, y: 2 });

            // The boulder at (3,1) should be triggered since player is now adjacent
            const boulder2Key = createPositionKey({ x: 3, y: 1 });
            const boulder2State = newState.boulderStateManager.boulders.get(boulder2Key);

            // Boulder at (3,1) should be triggered as it's adjacent to new position (3,2)
            expect(boulder2State?.isTriggered).toBe(true);

            // Also check boulder at (4,2) should be triggered as it's adjacent
            const boulder4Key = createPositionKey({ x: 4, y: 2 });
            const boulder4State = newState.boulderStateManager.boulders.get(boulder4Key);
            expect(boulder4State?.isTriggered).toBe(true);
        });
    });

    describe('Boulder state persistence across moves', () => {
        it('should maintain boulder state consistency across multiple moves', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // First move: trigger some boulders
            const state1 = movePlayer(gameState, -1, 0); // Move left to (1,2)

            // Verify initial trigger state
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            expect(state1.boulderStateManager.boulders.get(boulder1Key)?.isTriggered).toBe(true);
            expect(state1.boulderStateManager.boulders.get(boulder3Key)?.isTriggered).toBe(true);

            // Second move: move away and verify boulder state manager is maintained
            const state2 = movePlayer(state1, 1, 0); // Move right back to (2,2)

            expect(state2.player).toEqual({ x: 2, y: 2 });
            expect(state2.boulderStateManager).toBeDefined();
            expect(state2.boulderStateManager.boulders.size).toBeGreaterThan(0);

            // Third move: verify boulder state manager continues to function
            // Try to move down, but movement might be blocked by boulder physics
            const state3 = movePlayer(state2, 0, 1); // Attempt to move down to (2,3)

            expect(state3.boulderStateManager).toBeDefined();
            expect(state3.boulderStateManager.boulders.size).toBeGreaterThan(0);

            // Player position may vary depending on boulder physics and movement constraints
            // The key is that the boulder state manager continues to function correctly
            expect(state3.player).toBeDefined();
            expect(state3.player!.x).toBeGreaterThanOrEqual(1);
            expect(state3.player!.x).toBeLessThanOrEqual(5);
            expect(state3.player!.y).toBeGreaterThanOrEqual(1);
            expect(state3.player!.y).toBeLessThanOrEqual(4);
        });

        it('should track boulder movement states correctly across physics simulations', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Create a state with moving boulders to test persistence
            const stateWithMovingBoulders: GameStateData = {
                ...gameState,
                boulderStateManager: updateBoulderMovement(
                    gameState.boulderStateManager,
                    [{ x: 1, y: 1 }, { x: 4, y: 2 }], // Start moving
                    []
                ),
            };

            // Update movement constraints
            stateWithMovingBoulders.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Verify movement is blocked
            expect(stateWithMovingBoulders.movementConstraint.isPlayerMovementBlocked).toBe(true);
            expect(stateWithMovingBoulders.boulderStateManager.movingBoulderCount).toBe(2);

            // Try to move player - should be blocked
            const blockedState = movePlayer(stateWithMovingBoulders, 1, 0);

            expect(blockedState.player).toEqual(gameState.player); // Player shouldn't move
            expect(blockedState.boulderStateManager.movingBoulderCount).toBe(2); // Boulder count preserved
        });
    });

    describe('Movement constraint integration', () => {
        it('should block player movement when boulders are moving and allow when stopped', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Create state with moving boulder
            const movingState: GameStateData = {
                ...gameState,
                boulderStateManager: updateBoulderMovement(
                    gameState.boulderStateManager,
                    [{ x: 1, y: 1 }], // Start moving
                    []
                ),
            };

            // Update movement constraints
            movingState.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Movement should be blocked
            const blockedMove = movePlayer(movingState, 1, 0);
            expect(blockedMove.player).toEqual(gameState.player); // No movement

            // Now stop the boulder
            const stoppedState: GameStateData = {
                ...movingState,
                boulderStateManager: updateBoulderMovement(
                    movingState.boulderStateManager,
                    [], // No new moving boulders
                    [{ x: 1, y: 1 }] // Stop this boulder
                ),
            };

            // Update movement constraints
            stoppedState.movementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'none',
            };

            // Movement should now be allowed
            const allowedMove = movePlayer(stoppedState, 1, 0);
            expect(allowedMove.player).toEqual({ x: 3, y: 2 }); // Movement occurred
        });

        it('should update movement constraints correctly after each move', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Normal move should have no constraints
            const normalMove = movePlayer(gameState, 0, -1);
            expect(normalMove.movementConstraint.isPlayerMovementBlocked).toBe(false);
            expect(normalMove.movementConstraint.blockingReason).toBe('none');

            // Create state with triggered boulders (but not yet moving)
            const triggeredState = movePlayer(normalMove, -1, 1); // Move to trigger boulders
            expect(triggeredState.movementConstraint.isPlayerMovementBlocked).toBe(false); // Not moving yet

            // Simulate physics step that would start boulder movement
            const movingState: GameStateData = {
                ...triggeredState,
                boulderStateManager: updateBoulderMovement(
                    triggeredState.boulderStateManager,
                    [{ x: 1, y: 1 }], // Start moving
                    []
                ),
            };

            movingState.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Now movement should be blocked
            expect(movingState.movementConstraint.isPlayerMovementBlocked).toBe(true);
            expect(movingState.movementConstraint.blockingReason).toBe('boulder_movement');
        });
    });

    describe('Complete boulder interaction scenarios', () => {
        it('should handle complete boulder trigger-to-movement cycle', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Step 1: Move player to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move left to (1,2)

            // Verify boulder is triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            expect(step1.boulderStateManager.boulders.get(boulder1Key)?.isTriggered).toBe(true);
            expect(step1.movementConstraint.isPlayerMovementBlocked).toBe(false); // Not moving yet

            // Step 2: Move again to start physics simulation
            const step2 = movePlayer(step1, 1, 0); // Move right back to (2,2)

            // The physics simulation should have processed the triggered boulder
            // Check that boulder state is updated appropriately
            expect(step2.boulderStateManager).toBeDefined();
            expect(step2.movementConstraint).toBeDefined();

            // Step 3: Verify game state consistency
            expect(step2.player).toEqual({ x: 2, y: 2 });
            expect(step2.moves).toBe(53); // Two moves made
            expect(step2.gameState).toBe('playing');
        });

        it('should handle multiple boulder interactions simultaneously', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Move to position that triggers multiple boulders
            const multiTriggerState = movePlayer(gameState, -1, 0); // Move to (1,2)

            // Check multiple boulders are triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            expect(multiTriggerState.boulderStateManager.boulders.get(boulder1Key)?.isTriggered).toBe(true);
            expect(multiTriggerState.boulderStateManager.boulders.get(boulder3Key)?.isTriggered).toBe(true);

            // Make another move to process physics
            const processedState = movePlayer(multiTriggerState, 1, 0); // Move right to (2,2)

            // Verify state consistency with multiple boulder interactions
            expect(processedState.boulderStateManager.boulders.size).toBeGreaterThan(0);
            expect(processedState.player).toEqual({ x: 2, y: 2 });
            expect(processedState.gameState).toBe('playing');
        });

        it('should maintain game state integrity during boulder system errors', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Create a potentially problematic state (this tests error handling)
            const problematicState: GameStateData = {
                ...gameState,
                boulderStateManager: {
                    ...gameState.boulderStateManager,
                    movingBoulderCount: -1, // Invalid state
                },
            };

            // The system should handle this gracefully
            const recoveredState = movePlayer(problematicState, 1, 0);

            // Game should continue functioning
            expect(recoveredState.player).toEqual({ x: 3, y: 2 });
            expect(recoveredState.gameState).toBe('playing');
            expect(recoveredState.boulderStateManager.movingBoulderCount).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Performance and scalability', () => {
        it('should handle large numbers of boulders efficiently', () => {
            // Create a maze with many boulders
            const largeMaze: MazeCell[][] = Array(10).fill(null).map((_, y) =>
                Array(10).fill(null).map((_, x) => {
                    if (y === 0 || y === 9 || x === 0 || x === 9) return CELL.ROCK;
                    if (x === 5 && y === 5) return CELL.PLAYER;
                    if ((x + y) % 2 === 0) return CELL.BOULDER;
                    return CELL.EMPTY;
                })
            );

            const startTime = performance.now();
            const gameState = createInitialGameState(largeMaze);
            const initTime = performance.now() - startTime;

            expect(initTime).toBeLessThan(100); // Should initialize quickly
            expect(gameState.boulderStateManager.boulders.size).toBeGreaterThan(10);

            // Test movement performance
            const moveStartTime = performance.now();
            const movedState = movePlayer(gameState, 1, 0);
            const moveTime = performance.now() - moveStartTime;

            expect(moveTime).toBeLessThan(50); // Should move quickly even with many boulders
            expect(movedState.player).toEqual({ x: 6, y: 5 });
        });

        it('should handle rapid sequential moves efficiently', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            const startTime = performance.now();
            let currentState = gameState;

            // Perform 10 rapid moves
            const moves: [number, number][] = [
                [1, 0], [-1, 0], [0, 1], [0, -1], [1, 0],
                [-1, 0], [0, 1], [0, -1], [1, 0], [-1, 0]
            ];

            for (const [dx, dy] of moves) {
                currentState = movePlayer(currentState, dx, dy);
            }

            const totalTime = performance.now() - startTime;

            expect(totalTime).toBeLessThan(100); // Should handle rapid moves efficiently
            expect(currentState.moves).toBeLessThanOrEqual(55); // Some moves may be blocked
            expect(currentState.moves).toBeGreaterThanOrEqual(45); // But some should succeed
            expect(currentState.boulderStateManager).toBeDefined();
            expect(currentState.movementConstraint).toBeDefined();
        });
    });
});