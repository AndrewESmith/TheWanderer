import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';
import type { BoulderState, BoulderStateManager } from '../physics/boulder-state-manager';
import {
    validatePosition,
    validateBoulderState,
    validateBoulderStateManager,
    recoverBoulderState,
    recoverBoulderStateManager,
    createFallbackBoulderStateManager,
    handlePhysicsError,
    validateMazeIntegrity,
    logBoulderError,
    createErrorResult,
    createSuccessResult,
    type BoulderSystemError
} from '../physics/boulder-error-handling';

describe('Boulder Error Handling', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('Error Result Creation', () => {
        it('should create error result correctly', () => {
            const error: BoulderSystemError = {
                type: 'invalid_state',
                message: 'Test error',
                recoverable: true
            };

            const result = createErrorResult<string>(error);

            expect(result.success).toBe(false);
            expect(result.error).toEqual(error);
            expect(result.data).toBeUndefined();
        });

        it('should create success result correctly', () => {
            const data = 'test data';
            const result = createSuccessResult(data);

            expect(result.success).toBe(true);
            expect(result.data).toBe(data);
            expect(result.error).toBeUndefined();
        });
    });

    describe('Position Validation', () => {
        const validMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        it('should validate valid position', () => {
            const position = { x: 1, y: 1 };
            const result = validatePosition(position, validMaze);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(position);
        });

        it('should reject position with negative coordinates', () => {
            const position = { x: -1, y: 1 };
            const result = validatePosition(position, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(true);
        });

        it('should reject position outside maze bounds', () => {
            const position = { x: 5, y: 1 };
            const result = validatePosition(position, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(true);
        });

        it('should reject position with empty maze', () => {
            const position = { x: 0, y: 0 };
            const result = validatePosition(position, []);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });
    });

    describe('Boulder State Validation', () => {
        const validMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        it('should validate valid boulder state', () => {
            const state: BoulderState = {
                position: { x: 1, y: 1 },
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1
            };

            const result = validateBoulderState(state, validMaze);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(state);
        });

        it('should reject boulder state with invalid position', () => {
            const state: BoulderState = {
                position: { x: -1, y: 1 },
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1
            };

            const result = validateBoulderState(state, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
        });

        it('should reject boulder state with position mismatch', () => {
            const state: BoulderState = {
                position: { x: 0, y: 0 }, // This position has ROCK, not BOULDER
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1
            };

            const result = validateBoulderState(state, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('position_mismatch');
            expect(result.error?.recoverable).toBe(true);
        });

        it('should reject boulder state with inconsistent logic', () => {
            const state: BoulderState = {
                position: { x: 1, y: 1 },
                isTriggered: false,
                isMoving: true, // Moving without being triggered
                triggeredOnMove: -1
            };

            const result = validateBoulderState(state, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(true);
        });

        it('should reject boulder state with invalid triggeredOnMove', () => {
            const state: BoulderState = {
                position: { x: 1, y: 1 },
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -5 // Invalid value
            };

            const result = validateBoulderState(state, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(true);
        });
    });

    describe('Boulder State Manager Validation', () => {
        const validMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        it('should validate valid boulder state manager', () => {
            const manager: BoulderStateManager = {
                boulders: new Map([
                    ['1,1', {
                        position: { x: 1, y: 1 },
                        isTriggered: false,
                        isMoving: false,
                        triggeredOnMove: -1
                    }]
                ]),
                movingBoulderCount: 0,
                lastPlayerPosition: null
            };

            const result = validateBoulderStateManager(manager, validMaze);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(manager);
        });

        it('should reject null boulder state manager', () => {
            const result = validateBoulderStateManager(null as any, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });

        it('should reject manager with null boulders map', () => {
            const manager = {
                boulders: null,
                movingBoulderCount: 0,
                lastPlayerPosition: null
            } as any;

            const result = validateBoulderStateManager(manager, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });

        it('should reject manager with incorrect moving boulder count', () => {
            const manager: BoulderStateManager = {
                boulders: new Map([
                    ['1,1', {
                        position: { x: 1, y: 1 },
                        isTriggered: true,
                        isMoving: true,
                        triggeredOnMove: 1
                    }]
                ]),
                movingBoulderCount: 0, // Should be 1
                lastPlayerPosition: null
            };

            const result = validateBoulderStateManager(manager, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(true);
        });

        it('should reject manager with mismatched position keys', () => {
            const manager: BoulderStateManager = {
                boulders: new Map([
                    ['0,0', { // Wrong key for position (1,1)
                        position: { x: 1, y: 1 },
                        isTriggered: false,
                        isMoving: false,
                        triggeredOnMove: -1
                    }]
                ]),
                movingBoulderCount: 0,
                lastPlayerPosition: null
            };

            const result = validateBoulderStateManager(manager, validMaze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(true);
        });
    });

    describe('Boulder State Recovery', () => {
        const validMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        it('should recover boulder state with out-of-bounds position', () => {
            const invalidState: BoulderState = {
                position: { x: 10, y: 10 }, // Out of bounds
                isTriggered: true,
                isMoving: true,
                triggeredOnMove: 5
            };

            const result = recoverBoulderState(invalidState, validMaze);

            expect(result.success).toBe(true);
            expect(result.data?.position).toEqual({ x: 1, y: 1 }); // Should use the boulder position from maze
            expect(result.data?.isTriggered).toBe(false);
            expect(result.data?.isMoving).toBe(false);
            expect(result.data?.triggeredOnMove).toBe(-1);
        });

        it('should handle recovery failure gracefully', () => {
            const invalidState: BoulderState = {
                position: { x: 0, y: 0 },
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1
            };

            // Empty maze should cause recovery to fail
            const result = recoverBoulderState(invalidState, []);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });
    });

    describe('Boulder State Manager Recovery', () => {
        const validMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        it('should recover boulder state manager', () => {
            const invalidManager: BoulderStateManager = {
                boulders: new Map([
                    ['invalid', {
                        position: { x: -1, y: -1 }, // Invalid position
                        isTriggered: true,
                        isMoving: true,
                        triggeredOnMove: 5
                    }]
                ]),
                movingBoulderCount: 999, // Wrong count
                lastPlayerPosition: null
            };

            const result = recoverBoulderStateManager(invalidManager, validMaze);

            expect(result.success).toBe(true);
            expect(result.data?.boulders.size).toBe(1);
            expect(result.data?.movingBoulderCount).toBe(0);
            expect(result.data?.lastPlayerPosition).toBeNull();

            const recoveredState = result.data?.boulders.get('1,1');
            expect(recoveredState?.position).toEqual({ x: 1, y: 1 });
            expect(recoveredState?.isTriggered).toBe(false);
            expect(recoveredState?.isMoving).toBe(false);
        });
    });

    describe('Fallback Boulder State Manager', () => {
        it('should create fallback manager for maze with boulders', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY, CELL.BOULDER],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createFallbackBoulderStateManager(maze);

            expect(manager.boulders.size).toBe(3);
            expect(manager.movingBoulderCount).toBe(0);
            expect(manager.lastPlayerPosition).toBeNull();

            // Check all boulders are in safe state
            for (const state of manager.boulders.values()) {
                expect(state.isTriggered).toBe(false);
                expect(state.isMoving).toBe(false);
                expect(state.triggeredOnMove).toBe(-1);
            }
        });

        it('should create empty fallback manager for maze without boulders', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK],
                [CELL.EMPTY, CELL.PLAYER, CELL.EMPTY],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const manager = createFallbackBoulderStateManager(maze);

            expect(manager.boulders.size).toBe(0);
            expect(manager.movingBoulderCount).toBe(0);
            expect(manager.lastPlayerPosition).toBeNull();
        });
    });

    describe('Physics Error Handling', () => {
        const validMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const validManager: BoulderStateManager = {
            boulders: new Map([
                ['1,1', {
                    position: { x: 1, y: 1 },
                    isTriggered: false,
                    isMoving: false,
                    triggeredOnMove: -1
                }]
            ]),
            movingBoulderCount: 0,
            lastPlayerPosition: null
        };

        it('should handle physics error with fallback', () => {
            const error = new Error('Physics simulation failed');
            const result = handlePhysicsError(error, validMaze, validManager);

            expect(result.success).toBe(true);
            expect(result.data?.maze).toEqual(validMaze);
            expect(result.data?.manager.boulders.size).toBe(1);
            expect(result.data?.manager.movingBoulderCount).toBe(0);
        });

        it('should handle fallback creation failure', () => {
            const error = new Error('Physics simulation failed');

            // Create a maze that will cause the fallback to throw an error
            const invalidMaze = null as any;

            const result = handlePhysicsError(error, invalidMaze, validManager);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('physics_failure');
            expect(result.error?.recoverable).toBe(false);
        });
    });

    describe('Maze Integrity Validation', () => {
        it('should validate valid maze', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const result = validateMazeIntegrity(maze);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(maze);
        });

        it('should reject empty maze', () => {
            const result = validateMazeIntegrity([]);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });

        it('should reject maze with null rows', () => {
            const maze = [
                [CELL.ROCK, CELL.ROCK],
                null as any,
                [CELL.ROCK, CELL.ROCK]
            ];

            const result = validateMazeIntegrity(maze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });

        it('should reject maze with inconsistent row lengths', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK], // Shorter row
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const result = validateMazeIntegrity(maze);

            expect(result.success).toBe(false);
            expect(result.error?.type).toBe('invalid_state');
            expect(result.error?.recoverable).toBe(false);
        });
    });

    describe('Error Logging', () => {
        it('should log error with context', () => {
            const error: BoulderSystemError = {
                type: 'invalid_state',
                message: 'Test error message',
                context: { testData: 'test value' },
                recoverable: true
            };

            logBoulderError(error, 'test context');

            expect(consoleSpy).toHaveBeenCalledWith(
                '[Boulder System - test context] INVALID_STATE: Test error message'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                '[Boulder System - test context] Context:',
                { testData: 'test value' }
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                '[Boulder System - test context] Recoverable: true'
            );
        });

        it('should log error without context', () => {
            const error: BoulderSystemError = {
                type: 'physics_failure',
                message: 'Physics failed',
                recoverable: false
            };

            logBoulderError(error);

            expect(consoleSpy).toHaveBeenCalledWith(
                '[Boulder System] PHYSICS_FAILURE: Physics failed'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                '[Boulder System] Recoverable: false'
            );
        });
    });
});