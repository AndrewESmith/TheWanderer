import { describe, it, expect } from 'vitest';
import {
    shouldBlockPlayerMovement,
    updateMovementConstraints,
    getConstraintReason,
    hasBouldersInMotion,
    getMovingBoulderCount,
    validateConstraintState,
    createMovementConstraintSystem,
    createEnhancedMovementConstraint,
    isMovementAllowed,
    getMovementStatus,
    type MovementConstraintSystem,
    type EnhancedMovementConstraint,
} from '../physics/movement-constraint-system';
import {
    createBoulderStateManager,
    updateBoulderMovement,
    type BoulderStateManager,
    type MovementConstraint,
} from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('Movement Constraint System', () => {
    // Test maze with boulders for testing
    const testMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    let boulderStateManager: BoulderStateManager;

    beforeEach(() => {
        boulderStateManager = createBoulderStateManager(testMaze);
    });

    describe('shouldBlockPlayerMovement', () => {
        it('should not block movement when no boulders are moving', () => {
            const shouldBlock = shouldBlockPlayerMovement(boulderStateManager);
            expect(shouldBlock).toBe(false);
        });

        it('should block movement when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const shouldBlock = shouldBlockPlayerMovement(updatedManager);
            expect(shouldBlock).toBe(true);
        });

        it('should block movement when multiple boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                []
            );

            const shouldBlock = shouldBlockPlayerMovement(updatedManager);
            expect(shouldBlock).toBe(true);
        });

        it('should not block movement after all boulders stop', () => {
            // First set boulders as moving
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);

            // Then stop all boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }, { x: 3, y: 1 }]
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(false);
        });
    });

    describe('updateMovementConstraints', () => {
        it('should create constraint with no blocking when no boulders are moving', () => {
            const constraint = updateMovementConstraints(boulderStateManager);

            expect(constraint.isPlayerMovementBlocked).toBe(false);
            expect(constraint.blockingReason).toBe('none');
        });

        it('should create constraint with blocking when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const constraint = updateMovementConstraints(updatedManager);

            expect(constraint.isPlayerMovementBlocked).toBe(true);
            expect(constraint.blockingReason).toBe('boulder_movement');
        });

        it('should update constraint when boulder states change', () => {
            // Initially no constraints
            let constraint = updateMovementConstraints(boulderStateManager);
            expect(constraint.isPlayerMovementBlocked).toBe(false);

            // Add moving boulder
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );
            constraint = updateMovementConstraints(updatedManager);
            expect(constraint.isPlayerMovementBlocked).toBe(true);

            // Stop boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }]
            );
            constraint = updateMovementConstraints(updatedManager);
            expect(constraint.isPlayerMovementBlocked).toBe(false);
        });
    });

    describe('getConstraintReason', () => {
        it('should return no constraints message when no boulders are moving', () => {
            const reason = getConstraintReason(boulderStateManager);
            expect(reason).toBe('No movement constraints active');
        });

        it('should return single boulder message when one boulder is moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const reason = getConstraintReason(updatedManager);
            expect(reason).toBe('A boulder is currently moving');
        });

        it('should return multiple boulders message when multiple boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                []
            );

            const reason = getConstraintReason(updatedManager);
            expect(reason).toBe('3 boulders are currently moving');
        });

        it('should handle edge case of two boulders moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const reason = getConstraintReason(updatedManager);
            expect(reason).toBe('2 boulders are currently moving');
        });
    });

    describe('hasBouldersInMotion', () => {
        it('should return false when no boulders are moving', () => {
            const hasMoving = hasBouldersInMotion(boulderStateManager);
            expect(hasMoving).toBe(false);
        });

        it('should return true when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const hasMoving = hasBouldersInMotion(updatedManager);
            expect(hasMoving).toBe(true);
        });

        it('should return false after all boulders stop moving', () => {
            // Start with moving boulders
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );
            expect(hasBouldersInMotion(updatedManager)).toBe(true);

            // Stop all boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }, { x: 3, y: 1 }]
            );
            expect(hasBouldersInMotion(updatedManager)).toBe(false);
        });
    });

    describe('getMovingBoulderCount', () => {
        it('should return 0 when no boulders are moving', () => {
            const count = getMovingBoulderCount(boulderStateManager);
            expect(count).toBe(0);
        });

        it('should return correct count when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const count = getMovingBoulderCount(updatedManager);
            expect(count).toBe(2);
        });

        it('should update count when boulders stop moving', () => {
            // Start with 3 moving boulders
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                []
            );
            expect(getMovingBoulderCount(updatedManager)).toBe(3);

            // Stop 2 boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }, { x: 3, y: 1 }]
            );
            expect(getMovingBoulderCount(updatedManager)).toBe(1);

            // Stop remaining boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 3 }]
            );
            expect(getMovingBoulderCount(updatedManager)).toBe(0);
        });
    });

    describe('validateConstraintState', () => {
        it('should validate consistent constraint states', () => {
            const validConstraint1: MovementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'none',
            };

            const validConstraint2: MovementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            expect(validateConstraintState(validConstraint1)).toBe(true);
            expect(validateConstraintState(validConstraint2)).toBe(true);
        });

        it('should invalidate inconsistent constraint states', () => {
            const invalidConstraint1: MovementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'none',
            };

            const invalidConstraint2: MovementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'boulder_movement',
            };

            expect(validateConstraintState(invalidConstraint1)).toBe(false);
            expect(validateConstraintState(invalidConstraint2)).toBe(false);
        });
    });

    describe('createMovementConstraintSystem', () => {
        it('should create a valid movement constraint system', () => {
            const system = createMovementConstraintSystem();

            expect(system).toBeDefined();
            expect(typeof system.shouldBlockPlayerMovement).toBe('function');
            expect(typeof system.updateMovementConstraints).toBe('function');
            expect(typeof system.getConstraintReason).toBe('function');
        });

        it('should have working methods in the created system', () => {
            const system = createMovementConstraintSystem();

            // Test with no moving boulders
            expect(system.shouldBlockPlayerMovement(boulderStateManager)).toBe(false);

            const constraint = system.updateMovementConstraints(boulderStateManager);
            expect(constraint.isPlayerMovementBlocked).toBe(false);

            const reason = system.getConstraintReason(boulderStateManager);
            expect(reason).toBe('No movement constraints active');

            // Test with moving boulders
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            expect(system.shouldBlockPlayerMovement(updatedManager)).toBe(true);

            const constraintWithMoving = system.updateMovementConstraints(updatedManager);
            expect(constraintWithMoving.isPlayerMovementBlocked).toBe(true);

            const reasonWithMoving = system.getConstraintReason(updatedManager);
            expect(reasonWithMoving).toBe('A boulder is currently moving');
        });
    });

    describe('createEnhancedMovementConstraint', () => {
        it('should create enhanced constraint with additional metadata', () => {
            const enhanced = createEnhancedMovementConstraint(boulderStateManager);

            expect(enhanced.isPlayerMovementBlocked).toBe(false);
            expect(enhanced.blockingReason).toBe('none');
            expect(enhanced.movingBoulderCount).toBe(0);
            expect(enhanced.constraintReason).toBe('No movement constraints active');
            expect(enhanced.isValid).toBe(true);
        });

        it('should create enhanced constraint with moving boulders', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const enhanced = createEnhancedMovementConstraint(updatedManager);

            expect(enhanced.isPlayerMovementBlocked).toBe(true);
            expect(enhanced.blockingReason).toBe('boulder_movement');
            expect(enhanced.movingBoulderCount).toBe(2);
            expect(enhanced.constraintReason).toBe('2 boulders are currently moving');
            expect(enhanced.isValid).toBe(true);
        });
    });

    describe('isMovementAllowed', () => {
        it('should allow movement when no boulders are moving', () => {
            const isAllowed = isMovementAllowed(boulderStateManager);
            expect(isAllowed).toBe(true);
        });

        it('should not allow movement when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const isAllowed = isMovementAllowed(updatedManager);
            expect(isAllowed).toBe(false);
        });
    });

    describe('getMovementStatus', () => {
        it('should return correct status when movement is allowed', () => {
            const status = getMovementStatus(boulderStateManager);

            expect(status.isAllowed).toBe(true);
            expect(status.reason).toBe('No movement constraints active');
            expect(status.movingBoulderCount).toBe(0);
        });

        it('should return correct status when movement is blocked', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const status = getMovementStatus(updatedManager);

            expect(status.isAllowed).toBe(false);
            expect(status.reason).toBe('2 boulders are currently moving');
            expect(status.movingBoulderCount).toBe(2);
        });

        it('should update status when boulder states change', () => {
            // Initially allowed
            let status = getMovementStatus(boulderStateManager);
            expect(status.isAllowed).toBe(true);
            expect(status.movingBoulderCount).toBe(0);

            // Add moving boulder
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );
            status = getMovementStatus(updatedManager);
            expect(status.isAllowed).toBe(false);
            expect(status.movingBoulderCount).toBe(1);

            // Stop boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }]
            );
            status = getMovementStatus(updatedManager);
            expect(status.isAllowed).toBe(true);
            expect(status.movingBoulderCount).toBe(0);
        });
    });

    describe('Edge cases and error handling', () => {
        it('should handle empty boulder state manager', () => {
            const emptyMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];
            const emptyManager = createBoulderStateManager(emptyMaze);

            expect(shouldBlockPlayerMovement(emptyManager)).toBe(false);
            expect(hasBouldersInMotion(emptyManager)).toBe(false);
            expect(getMovingBoulderCount(emptyManager)).toBe(0);
            expect(getConstraintReason(emptyManager)).toBe('No movement constraints active');
            expect(isMovementAllowed(emptyManager)).toBe(true);
        });

        it('should handle boulder state manager with zero moving count but inconsistent state', () => {
            // Create a manager with inconsistent state (this shouldn't happen in normal operation)
            const inconsistentManager: BoulderStateManager = {
                ...boulderStateManager,
                movingBoulderCount: 0,
            };

            // Manually set a boulder as moving (simulating inconsistent state)
            const boulderState = inconsistentManager.boulders.get('1,1');
            if (boulderState) {
                inconsistentManager.boulders.set('1,1', {
                    ...boulderState,
                    isMoving: true,
                });
            }

            // The system should rely on movingBoulderCount for performance
            expect(shouldBlockPlayerMovement(inconsistentManager)).toBe(false);
            expect(hasBouldersInMotion(inconsistentManager)).toBe(false);
            expect(getMovingBoulderCount(inconsistentManager)).toBe(0);
        });

        it('should handle boundary conditions for boulder counts', () => {
            // Test with maximum reasonable number of boulders
            const largeMaze: MazeCell[][] = Array(10).fill(null).map(() =>
                Array(10).fill(CELL.BOULDER)
            );
            largeMaze[0] = Array(10).fill(CELL.ROCK);
            largeMaze[9] = Array(10).fill(CELL.ROCK);
            largeMaze[5][5] = CELL.PLAYER;

            const largeManager = createBoulderStateManager(largeMaze);

            // Set many boulders as moving
            const manyBoulders = Array.from(largeManager.boulders.keys())
                .slice(0, 50)
                .map(key => {
                    const [x, y] = key.split(',').map(Number);
                    return { x, y };
                });

            const updatedLargeManager = updateBoulderMovement(
                largeManager,
                manyBoulders,
                []
            );

            expect(shouldBlockPlayerMovement(updatedLargeManager)).toBe(true);
            expect(getMovingBoulderCount(updatedLargeManager)).toBe(manyBoulders.length);
            expect(getConstraintReason(updatedLargeManager)).toBe(
                `${manyBoulders.length} boulders are currently moving`
            );
        });
    });

    describe('Integration with boulder state changes', () => {
        it('should maintain constraint consistency through boulder lifecycle', () => {
            // Start with no constraints
            expect(shouldBlockPlayerMovement(boulderStateManager)).toBe(false);

            // Trigger boulders (should not affect movement constraints yet)
            // Note: Triggering doesn't make boulders move immediately
            expect(shouldBlockPlayerMovement(boulderStateManager)).toBe(false);

            // Start boulder movement
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);

            // Add more moving boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [{ x: 3, y: 1 }],
                []
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);
            expect(getMovingBoulderCount(updatedManager)).toBe(2);

            // Stop one boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }]
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);
            expect(getMovingBoulderCount(updatedManager)).toBe(1);

            // Stop last boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 3, y: 1 }]
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(false);
            expect(getMovingBoulderCount(updatedManager)).toBe(0);
        });

        it('should handle rapid boulder state changes', () => {
            let manager = boulderStateManager;

            // Rapid start/stop cycles
            for (let i = 0; i < 5; i++) {
                // Start movement
                manager = updateBoulderMovement(
                    manager,
                    [{ x: 1, y: 1 }],
                    []
                );
                expect(shouldBlockPlayerMovement(manager)).toBe(true);

                // Stop movement
                manager = updateBoulderMovement(
                    manager,
                    [],
                    [{ x: 1, y: 1 }]
                );
                expect(shouldBlockPlayerMovement(manager)).toBe(false);
            }

            // Final state should be consistent
            expect(getMovingBoulderCount(manager)).toBe(0);
            expect(isMovementAllowed(manager)).toBe(true);
        });
    });
});