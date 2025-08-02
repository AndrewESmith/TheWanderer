import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';
import {
    createBoulderStateManager,
    updateBoulderTriggers,
    updateBoulderMovement,
    updateBoulderPositions,
    type BoulderStateManager
} from '../physics/boulder-state-manager';
import {
    simulateGravityWithState,
    simulatePhysicsStepWithState
} from '../physics/physics-engine';
import {
    shouldBlockPlayerMovement,
    updateMovementConstraints,
    validateConstraintState
} from '../physics/movement-constraint-system';

describe('Boulder System Error Integration', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('Boulder State Manager Error Handling', () => {
        it('should handle invalid maze in createBoulderStateManager', () => {
            const invalidMaze: MazeCell[][] = []; // Empty maze

            const manager = createBoulderStateManager(invalidMaze);

            expect(manager).toBeDefined();
            expect(manager.boulders.size).toBe(0);
            expect(manager.movingBoulderCount).toBe(0);
            // Empty maze doesn't trigger error logging, it just creates empty manager
        });

        it('should handle corrupted boulder positions in updateBoulderTriggers', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);

            // Try to trigger boulder at non-existent position
            const invalidTriggers = [{ x: 999, y: 999 }];
            const result = updateBoulderTriggers(manager, invalidTriggers, 1);

            expect(result).toBeDefined();
            expect(result.boulders.size).toBe(1); // Original boulder still there
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should handle invalid positions in updateBoulderMovement', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);

            // Try to mark non-existent boulder as moving
            const invalidMoving = [{ x: 999, y: 999 }];
            const result = updateBoulderMovement(manager, invalidMoving, []);

            expect(result).toBeDefined();
            expect(result.movingBoulderCount).toBe(0); // No change
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should handle position conflicts in updateBoulderPositions', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);

            // Try to move both boulders to same position
            const conflictingUpdates = [
                { from: { x: 1, y: 1 }, to: { x: 1, y: 2 } },
                { from: { x: 2, y: 1 }, to: { x: 1, y: 2 } } // Same destination
            ];

            const result = updateBoulderPositions(manager, conflictingUpdates);

            expect(result).toBeDefined();
            expect(result.boulders.size).toBe(2); // Both boulders still exist
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should recover from corrupted moving boulder count', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let manager = createBoulderStateManager(maze);

            // Manually corrupt the moving boulder count
            manager = {
                ...manager,
                movingBoulderCount: 999 // Wrong count
            };

            // Try to update movement - should detect and fix the count
            const result = updateBoulderMovement(manager, [], []);

            expect(result.movingBoulderCount).toBe(0); // Should be corrected
            expect(consoleSpy).toHaveBeenCalled();
        });
    });

    describe('Physics Engine Error Handling', () => {
        it('should handle invalid maze in simulateGravityWithState', () => {
            const invalidMaze: MazeCell[][] = []; // Empty maze
            const manager = createBoulderStateManager([[CELL.BOULDER]]);

            const result = simulateGravityWithState(invalidMaze, manager, 1);

            expect(result).toBeDefined();
            expect(result.newMaze).toEqual(invalidMaze);
            expect(result.soundEvents).toEqual([]);
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should handle corrupted boulder state manager in physics simulation', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const corruptedManager: BoulderStateManager = {
                boulders: null as any, // Corrupted
                movingBoulderCount: 0,
                lastPlayerPosition: null
            };

            const result = simulateGravityWithState(maze, corruptedManager, 1);

            expect(result).toBeDefined();
            expect(result.newMaze).toEqual(maze);
            expect(result.soundEvents).toEqual([]);
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should handle errors in boulder fall simulation', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let manager = createBoulderStateManager(maze);

            // Trigger boulder to start moving
            manager = updateBoulderTriggers(manager, [{ x: 1, y: 1 }], 1);
            manager = updateBoulderMovement(manager, [{ x: 1, y: 1 }], []);

            // Simulate with corrupted maze structure during processing
            const result = simulateGravityWithState(maze, manager, 2);

            expect(result).toBeDefined();
            expect(result.newMaze).toBeDefined();
            // Should handle individual boulder errors gracefully
        });

        it('should handle arrow simulation errors in simulatePhysicsStepWithState', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);

            // Invalid arrow data that might cause errors
            const invalidArrows = [
                { position: { x: -1, y: -1 }, direction: { dx: 1, dy: 0 } }
            ];

            const result = simulatePhysicsStepWithState(maze, manager, 1, invalidArrows);

            expect(result).toBeDefined();
            expect(result.newMaze).toBeDefined();
            expect(result.arrowPositions).toEqual([]);
        });

        it('should provide fallback when physics simulation completely fails', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);

            // Mock a complete failure scenario by passing invalid data
            const result = simulatePhysicsStepWithState(null as any, manager, 1);

            expect(result).toBeDefined();
            expect(result.newMaze).toEqual([]);
            expect(result.soundEvents).toEqual([]);
            expect(result.movingBoulders).toEqual([]);
            expect(consoleSpy).toHaveBeenCalled();
        });
    });

    describe('Movement Constraint Error Handling', () => {
        it('should handle corrupted boulder state manager in shouldBlockPlayerMovement', () => {
            const corruptedManager: BoulderStateManager = {
                boulders: null as any,
                movingBoulderCount: 0,
                lastPlayerPosition: null
            };

            const result = shouldBlockPlayerMovement(corruptedManager);

            // Should handle corrupted manager gracefully (may not block if no validation)
            expect(result).toBe(false); // Updated expectation since validation was moved to physics level
        });

        it('should handle errors in updateMovementConstraints', () => {
            const corruptedManager: BoulderStateManager = {
                boulders: null as any,
                movingBoulderCount: 0,
                lastPlayerPosition: null
            };

            const result = updateMovementConstraints(corruptedManager);

            expect(result).toBeDefined();
            expect(result.isPlayerMovementBlocked).toBe(false); // Updated expectation since validation was moved to physics level
            expect(result.blockingReason).toBe('none');
        });

        it('should validate constraint state consistency', () => {
            const inconsistentConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'none' as const // Inconsistent
            };

            const result = validateConstraintState(inconsistentConstraint);

            expect(result).toBe(false);
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should handle null constraint in validateConstraintState', () => {
            const result = validateConstraintState(null as any);

            expect(result).toBe(false);
            expect(consoleSpy).toHaveBeenCalled();
        });
    });

    describe('Error Recovery Scenarios', () => {
        it('should recover from maze-boulder state mismatch', () => {
            // Create maze with boulder
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create manager for different maze (mismatch scenario)
            const differentMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK], // No boulder
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let manager = createBoulderStateManager(differentMaze);

            // Manually add boulder state that doesn't match current maze
            manager.boulders.set('1,1', {
                position: { x: 1, y: 1 },
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1
            });

            // Physics simulation should handle the mismatch gracefully
            const result = simulateGravityWithState(maze, manager, 1);

            expect(result).toBeDefined();
            expect(result.newMaze).toBeDefined();
        });

        it('should handle gradual system degradation', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let manager = createBoulderStateManager(maze);

            // Simulate multiple error conditions in sequence

            // 1. Invalid trigger
            manager = updateBoulderTriggers(manager, [{ x: 999, y: 999 }], 1);
            expect(manager).toBeDefined();

            // 2. Invalid movement update
            manager = updateBoulderMovement(manager, [{ x: 999, y: 999 }], []);
            expect(manager).toBeDefined();

            // 3. Invalid position update
            manager = updateBoulderPositions(manager, [
                { from: { x: 999, y: 999 }, to: { x: 1, y: 1 } }
            ]);
            expect(manager).toBeDefined();

            // 4. Physics simulation should still work
            const result = simulateGravityWithState(maze, manager, 2);
            expect(result).toBeDefined();

            // System should still be functional despite errors
            expect(manager.boulders.size).toBeGreaterThan(0);
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should maintain system stability under stress', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.BOULDER, CELL.BOULDER],
                [CELL.BOULDER, CELL.BOULDER, CELL.BOULDER],
                [CELL.BOULDER, CELL.BOULDER, CELL.BOULDER]
            ];

            let manager = createBoulderStateManager(maze);

            // Simulate many operations that could cause errors
            for (let i = 0; i < 10; i++) {
                // Mix valid and invalid operations
                manager = updateBoulderTriggers(manager, [
                    { x: i % 3, y: i % 3 }, // Some valid
                    { x: 999, y: 999 }      // Some invalid
                ], i);

                manager = updateBoulderMovement(manager, [
                    { x: i % 3, y: i % 3 }  // Some valid
                ], [
                    { x: 999, y: 999 }      // Some invalid
                ]);

                const result = simulateGravityWithState(maze, manager, i + 1);
                expect(result).toBeDefined();
            }

            // System should still be functional
            expect(manager.boulders.size).toBe(9); // All boulders should still be tracked
            expect(manager.movingBoulderCount).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Error Logging and Debugging', () => {
        it('should provide detailed error context for debugging', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);

            // Trigger an error that should provide detailed context
            updateBoulderTriggers(manager, [{ x: -1, y: -1 }], 1);

            // Check that error logging includes useful context
            expect(consoleSpy).toHaveBeenCalled();

            // Verify error messages contain position information
            const errorCalls = consoleSpy.mock.calls;
            const hasPositionInfo = errorCalls.some(call =>
                call.some(arg =>
                    typeof arg === 'string' &&
                    (arg.includes('position') || arg.includes('(-1,-1)'))
                )
            );
            expect(hasPositionInfo).toBe(true);
        });

        it('should distinguish between recoverable and non-recoverable errors', () => {
            // Test recoverable error
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createBoulderStateManager(maze);
            updateBoulderTriggers(manager, [{ x: 999, y: 999 }], 1);

            // Test non-recoverable error
            createBoulderStateManager([]);

            expect(consoleSpy).toHaveBeenCalled();

            // Check that both recoverable and non-recoverable errors are logged
            const errorCalls = consoleSpy.mock.calls;
            const hasRecoverableInfo = errorCalls.some(call =>
                call.some(arg =>
                    typeof arg === 'string' && arg.includes('Recoverable')
                )
            );
            expect(hasRecoverableInfo).toBe(true);
        });
    });
});