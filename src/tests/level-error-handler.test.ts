import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    createLevelError,
    createFallbackLevel,
    attemptLevelRepair,
    createErrorRecoveryStrategy,
    logLevelError,
    withLevelErrorHandling
} from '../levels/level-error-handler';
import { CELL } from '../maze';
import type { MazeLevelData } from '../Interfaces/IMazeLevelData';
import type { LevelValidationError } from '../levels/level-validation';

// Mock console methods
const mockConsole = {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
};

vi.stubGlobal('console', mockConsole);

describe('Level Error Handler', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createLevelError', () => {
        it('should create a level error with proper properties', () => {
            const error = createLevelError(
                'level_loading_failed',
                'Test error message',
                {
                    levelNumber: 5,
                    originalError: new Error('Original error'),
                    context: { test: 'data' }
                }
            );

            expect(error.type).toBe('level_loading_failed');
            expect(error.message).toBe('Test error message');
            expect(error.levelNumber).toBe(5);
            expect(error.originalError?.message).toBe('Original error');
            expect(error.context).toEqual({ test: 'data' });
        });

        it('should create a minimal level error', () => {
            const error = createLevelError('invalid_level_data', 'Simple error');

            expect(error.type).toBe('invalid_level_data');
            expect(error.message).toBe('Simple error');
            expect(error.levelNumber).toBeUndefined();
            expect(error.originalError).toBeUndefined();
            expect(error.context).toBeUndefined();
        });
    });

    describe('createFallbackLevel', () => {
        it('should create a valid fallback level', () => {
            const fallback = createFallbackLevel(3);

            expect(fallback.levelNumber).toBe(3);
            expect(fallback.maze).toHaveLength(10);
            expect(fallback.maze[0]).toHaveLength(16);
            expect(fallback.moveLimit).toBe(30);
            expect(fallback.diamondCount).toBe(1);
            expect(fallback.bombCount).toBe(1);
            expect(fallback.playerStartPosition).toEqual({ x: 1, y: 1 });
            expect(fallback.exitPosition).toEqual({ x: 14, y: 1 });
        });

        it('should create fallback with default level number', () => {
            const fallback = createFallbackLevel();
            expect(fallback.levelNumber).toBe(1);
        });

        it('should have proper maze structure', () => {
            const fallback = createFallbackLevel();

            // Check borders are rocks
            for (let x = 0; x < 16; x++) {
                expect(fallback.maze[0]![x]).toBe(CELL.ROCK); // Top border
                expect(fallback.maze[9]![x]).toBe(CELL.ROCK); // Bottom border
            }

            for (let y = 0; y < 10; y++) {
                expect(fallback.maze[y]![0]).toBe(CELL.ROCK); // Left border
                expect(fallback.maze[y]![15]).toBe(CELL.ROCK); // Right border
            }

            // Check player and exit positions
            expect(fallback.maze[1]![1]).toBe(CELL.PLAYER);
            expect(fallback.maze[1]![14]).toBe(CELL.EXIT);
            expect(fallback.maze[1]![3]).toBe(CELL.DIAMOND);
            expect(fallback.maze[1]![13]).toBe(CELL.BOMB);
        });
    });

    describe('attemptLevelRepair', () => {
        const createTestLevel = (): MazeLevelData => ({
            levelNumber: 1,
            maze: [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOMB, CELL.EXIT, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ],
            moveLimit: 30,
            diamondCount: 1,
            bombCount: 1,
            rockCount: 64,
            playerStartPosition: { x: 1, y: 1 },
            exitPosition: { x: 14, y: 1 }
        });

        it('should repair player position mismatch', () => {
            const level = createTestLevel();
            level.playerStartPosition = { x: 5, y: 5 }; // Wrong position

            const errors: LevelValidationError[] = [{
                type: 'position',
                message: 'Player not found at specified start position (5, 5), found: empty',
                levelNumber: 1
            }];

            const result = attemptLevelRepair(level, errors);

            expect(result.repairedLevel).not.toBeNull();
            expect(result.repairedLevel!.playerStartPosition).toEqual({ x: 1, y: 1 });
            expect(result.repairLog).toContain('Updated player start position to actual player location: (1, 1)');
        });

        it('should repair exit position mismatch', () => {
            const level = createTestLevel();
            level.exitPosition = { x: 5, y: 5 }; // Wrong position

            const errors: LevelValidationError[] = [{
                type: 'position',
                message: 'Exit not found at specified position (5, 5), found: empty',
                levelNumber: 1
            }];

            const result = attemptLevelRepair(level, errors);

            expect(result.repairedLevel).not.toBeNull();
            expect(result.repairedLevel!.exitPosition).toEqual({ x: 14, y: 1 });
            expect(result.repairLog).toContain('Updated exit position to actual exit location: (14, 1)');
        });

        it('should repair element count mismatches', () => {
            const level = createTestLevel();
            level.diamondCount = 5; // Wrong count
            level.bombCount = 3; // Wrong count

            const errors: LevelValidationError[] = [
                {
                    type: 'element_count',
                    message: 'Diamond count mismatch: expected 5, found 1',
                    levelNumber: 1,
                    details: { expected: 5, actual: 1 }
                },
                {
                    type: 'element_count',
                    message: 'Bomb count mismatch: expected 3, found 1',
                    levelNumber: 1,
                    details: { expected: 3, actual: 1 }
                }
            ];

            const result = attemptLevelRepair(level, errors);

            expect(result.repairedLevel).not.toBeNull();
            expect(result.repairedLevel!.diamondCount).toBe(1);
            expect(result.repairedLevel!.bombCount).toBe(1);
            expect(result.repairLog).toContain('Updated diamond count to match actual count: 1');
            expect(result.repairLog).toContain('Updated bomb count to match actual count: 1');
        });

        it('should repair invalid level number and move limit', () => {
            const level = createTestLevel();
            level.levelNumber = 0; // Invalid
            level.moveLimit = -5; // Invalid

            const errors: LevelValidationError[] = [
                {
                    type: 'data_integrity',
                    message: 'Invalid level number: 0',
                    levelNumber: 0
                },
                {
                    type: 'data_integrity',
                    message: 'Invalid move limit: -5',
                    levelNumber: 0
                }
            ];

            const result = attemptLevelRepair(level, errors);

            expect(result.repairedLevel).not.toBeNull();
            expect(result.repairedLevel!.levelNumber).toBe(1);
            expect(result.repairedLevel!.moveLimit).toBe(10);
            expect(result.repairLog).toContain('Fixed invalid level number to: 1');
            expect(result.repairLog).toContain('Fixed invalid move limit to: 10');
        });

        it('should not repair dimension errors', () => {
            const level = createTestLevel();
            const errors: LevelValidationError[] = [{
                type: 'dimension',
                message: 'Invalid maze height: expected 10, got 8',
                levelNumber: 1
            }];

            const result = attemptLevelRepair(level, errors);

            expect(result.repairedLevel).toBeNull();
            expect(result.repairLog).toContain('Cannot repair dimension errors - level structure is fundamentally invalid');
        });

        it('should handle repair failures gracefully', () => {
            const level = createTestLevel();
            level.maze = null as any; // This will cause repair to fail

            const errors: LevelValidationError[] = [{
                type: 'position',
                message: 'Player not found at specified start position',
                levelNumber: 1
            }];

            const result = attemptLevelRepair(level, errors);

            expect(result.repairedLevel).toBeNull();
            expect(result.repairLog.length).toBeGreaterThan(0);
            expect(result.repairLog.some(log => log.includes('Level repair failed:'))).toBe(true);
        });
    });

    describe('createErrorRecoveryStrategy', () => {
        it('should handle level loading failure with previous level fallback', () => {
            const strategy = createErrorRecoveryStrategy();
            const availableLevels = [createFallbackLevel(1), createFallbackLevel(2)];

            const result = strategy.handleLevelLoadingFailure(
                3,
                new Error('Level 3 failed'),
                availableLevels
            );

            expect(result.recoveryAction).toBe('use_previous_level');
            expect(result.fallbackLevel.levelNumber).toBe(3);
            expect(result.message).toContain('Using level 2 layout as fallback for level 3');
        });

        it('should handle level loading failure with initial maze fallback', () => {
            const strategy = createErrorRecoveryStrategy();

            const result = strategy.handleLevelLoadingFailure(
                1,
                new Error('Level 1 failed'),
                []
            );

            expect(result.recoveryAction).toBe('use_initial_maze');
            expect(result.fallbackLevel.levelNumber).toBe(1);
            expect(result.message).toContain('Using initial maze as fallback for level 1');
        });

        it('should handle level transition failure with retry', () => {
            const strategy = createErrorRecoveryStrategy();

            const result = strategy.handleLevelTransitionFailure(
                2,
                3,
                new Error('Transition failed')
            );

            expect(result.shouldRetry).toBe(true);
            expect(result.fallbackAction).toBe('stay_current_level');
            expect(result.message).toContain('staying on level 2');
        });

        it('should handle critical level transition failure', () => {
            const strategy = createErrorRecoveryStrategy();

            const result = strategy.handleLevelTransitionFailure(
                2,
                3,
                new Error('critical error occurred')
            );

            expect(result.shouldRetry).toBe(false);
            expect(result.fallbackAction).toBe('end_game');
            expect(result.message).toContain('Critical error during level transition - ending game');
        });

        it('should handle initialization failure', () => {
            const strategy = createErrorRecoveryStrategy();

            const result = strategy.handleInitializationFailure(
                new Error('Init failed')
            );

            expect(result.fallbackLevels).toHaveLength(3);
            expect(result.fallbackLevels[0]!.levelNumber).toBe(1);
            expect(result.fallbackLevels[1]!.levelNumber).toBe(2);
            expect(result.fallbackLevels[2]!.levelNumber).toBe(3);
            expect(result.message).toContain('Using fallback level configuration');
        });
    });

    describe('logLevelError', () => {
        it('should log level loading and transition errors as warnings', () => {
            const error = createLevelError('level_loading_failed', 'Loading failed', { levelNumber: 2 });

            logLevelError(error);

            expect(mockConsole.warn).toHaveBeenCalledWith(
                'Level management warning:',
                expect.objectContaining({
                    type: 'level_loading_failed',
                    levelNumber: 2,
                    message: 'Loading failed'
                })
            );
        });

        it('should log critical errors', () => {
            const error = createLevelError('level_manager_initialization_failed', 'Init failed');

            logLevelError(error);

            expect(mockConsole.error).toHaveBeenCalledWith(
                'Critical level management error:',
                expect.objectContaining({
                    type: 'level_manager_initialization_failed',
                    message: 'Init failed'
                })
            );
        });

        it('should include additional context', () => {
            const error = createLevelError('invalid_level_data', 'Invalid data', { levelNumber: 1 });

            logLevelError(error, { additionalInfo: 'test' });

            expect(mockConsole.error).toHaveBeenCalledWith(
                'Level validation error:',
                expect.objectContaining({
                    context: expect.objectContaining({
                        additionalInfo: 'test'
                    })
                })
            );
        });
    });

    describe('withLevelErrorHandling', () => {
        it('should execute operation successfully', () => {
            const operation = vi.fn().mockReturnValue('success');

            const result = withLevelErrorHandling(
                operation,
                'level_loading_failed',
                { levelNumber: 1, operationName: 'Test operation' }
            );

            expect(result).toBe('success');
            expect(operation).toHaveBeenCalled();
        });

        it('should catch and wrap errors', () => {
            const operation = vi.fn().mockImplementation(() => {
                throw new Error('Operation failed');
            });

            expect(() => {
                withLevelErrorHandling(
                    operation,
                    'level_loading_failed',
                    { levelNumber: 1, operationName: 'Test operation' }
                );
            }).toThrow();

            expect(mockConsole.warn).toHaveBeenCalled();
        });

        it('should handle non-Error exceptions', () => {
            const operation = vi.fn().mockImplementation(() => {
                throw 'String error';
            });

            expect(() => {
                withLevelErrorHandling(
                    operation,
                    'level_loading_failed',
                    { levelNumber: 1, operationName: 'Test operation' }
                );
            }).toThrow();

            expect(mockConsole.warn).toHaveBeenCalled();
        });
    });
});