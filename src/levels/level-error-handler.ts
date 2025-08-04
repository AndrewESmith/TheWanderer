import type { MazeLevelData } from "../Interfaces/IMazeLevelData";
import type { LevelValidationError } from "./level-validation";
import { CELL, initialMaze } from "../maze";
import type { IPlayerPos } from "../Interfaces/IPlayerPos";

/**
 * Error types for level management operations
 */
export type LevelErrorType =
    | 'level_loading_failed'
    | 'level_transition_failed'
    | 'invalid_level_data'
    | 'level_manager_initialization_failed'
    | 'level_progression_failed';

/**
 * Level management error with context
 */
export interface LevelError extends Error {
    type: LevelErrorType;
    levelNumber?: number;
    originalError?: Error;
    context?: Record<string, unknown>;
}

/**
 * Creates a level error with proper typing and context
 */
export function createLevelError(
    type: LevelErrorType,
    message: string,
    options?: {
        levelNumber?: number;
        originalError?: Error;
        context?: Record<string, unknown>;
    }
): LevelError {
    const error = new Error(message) as LevelError;
    error.type = type;
    error.levelNumber = options?.levelNumber;
    error.originalError = options?.originalError;
    error.context = options?.context;
    return error;
}

/**
 * Fallback level data for emergency situations
 * This is a minimal, guaranteed-valid level that can be used when all else fails
 */
export function createFallbackLevel(levelNumber: number = 1): MazeLevelData {
    // Create a simple 16x10 maze with minimal elements
    const fallbackMaze = [
        // Row 0: Top border
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        // Row 1: Player and simple path
        [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOMB, CELL.EXIT, CELL.ROCK],
        // Rows 2-7: Simple open areas
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        // Row 9: Bottom border
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    return {
        levelNumber,
        maze: fallbackMaze,
        moveLimit: 30,
        diamondCount: 1,
        bombCount: 1,
        rockCount: 64, // Border rocks
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 1 }
    };
}

/**
 * Attempts to repair a level by fixing common issues
 */
export function attemptLevelRepair(level: MazeLevelData, validationErrors: LevelValidationError[]): {
    repairedLevel: MazeLevelData | null;
    repairLog: string[];
} {
    const repairLog: string[] = [];
    let repairedLevel: MazeLevelData | null = null;

    try {
        // Create a copy to work with
        const levelCopy: MazeLevelData = {
            ...level,
            maze: level.maze.map(row => [...row])
        };

        let repairAttempted = false;

        // Attempt to fix dimension issues
        const dimensionErrors = validationErrors.filter(e => e.type === 'dimension');
        if (dimensionErrors.length > 0) {
            repairLog.push(`Cannot repair dimension errors - level structure is fundamentally invalid`);
            return { repairedLevel: null, repairLog };
        }

        // Attempt to fix position mismatches
        const positionErrors = validationErrors.filter(e => e.type === 'position');
        for (const error of positionErrors) {
            if (error.message.includes('Player not found at specified start position')) {
                // Try to find the actual player position and update the start position
                for (let y = 0; y < levelCopy.maze.length; y++) {
                    for (let x = 0; x < levelCopy.maze[y]!.length; x++) {
                        if (levelCopy.maze[y]![x] === CELL.PLAYER) {
                            levelCopy.playerStartPosition = { x, y };
                            repairLog.push(`Updated player start position to actual player location: (${x}, ${y})`);
                            repairAttempted = true;
                            break;
                        }
                    }
                }
            }

            if (error.message.includes('Exit not found at specified position')) {
                // Try to find the actual exit position and update the exit position
                for (let y = 0; y < levelCopy.maze.length; y++) {
                    for (let x = 0; x < levelCopy.maze[y]!.length; x++) {
                        if (levelCopy.maze[y]![x] === CELL.EXIT) {
                            levelCopy.exitPosition = { x, y };
                            repairLog.push(`Updated exit position to actual exit location: (${x}, ${y})`);
                            repairAttempted = true;
                            break;
                        }
                    }
                }
            }
        }

        // Attempt to fix element count mismatches by updating the counts to match reality
        const elementErrors = validationErrors.filter(e => e.type === 'element_count');
        for (const error of elementErrors) {
            if (error.message.includes('Diamond count mismatch') && error.details?.actual !== undefined) {
                levelCopy.diamondCount = error.details.actual as number;
                repairLog.push(`Updated diamond count to match actual count: ${levelCopy.diamondCount}`);
                repairAttempted = true;
            }

            if (error.message.includes('Bomb count mismatch') && error.details?.actual !== undefined) {
                levelCopy.bombCount = error.details.actual as number;
                repairLog.push(`Updated bomb count to match actual count: ${levelCopy.bombCount}`);
                repairAttempted = true;
            }
        }

        // Attempt to fix data integrity issues
        const dataErrors = validationErrors.filter(e => e.type === 'data_integrity');
        for (const error of dataErrors) {
            if (error.message.includes('Invalid level number')) {
                levelCopy.levelNumber = Math.max(1, level.levelNumber || 1);
                repairLog.push(`Fixed invalid level number to: ${levelCopy.levelNumber}`);
                repairAttempted = true;
            }

            if (error.message.includes('Invalid move limit')) {
                levelCopy.moveLimit = Math.max(10, level.moveLimit || 30);
                repairLog.push(`Fixed invalid move limit to: ${levelCopy.moveLimit}`);
                repairAttempted = true;
            }
        }

        if (repairAttempted) {
            repairedLevel = levelCopy;
            repairLog.push(`Level repair completed - ${repairLog.length - 1} issues addressed`);
        } else {
            repairLog.push('No repairable issues found');
        }

    } catch (error) {
        repairLog.push(`Level repair failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return { repairedLevel, repairLog };
}

/**
 * Error recovery strategies for different failure scenarios
 */
export interface ErrorRecoveryStrategy {
    /**
     * Handles level loading failures by providing fallback options
     */
    handleLevelLoadingFailure(
        levelNumber: number,
        error: Error,
        availableLevels: MazeLevelData[]
    ): {
        fallbackLevel: MazeLevelData;
        recoveryAction: 'use_fallback' | 'use_previous_level' | 'use_initial_maze';
        message: string;
    };

    /**
     * Handles level transition failures
     */
    handleLevelTransitionFailure(
        fromLevel: number,
        toLevel: number,
        error: Error
    ): {
        shouldRetry: boolean;
        fallbackAction: 'stay_current_level' | 'use_fallback_level' | 'end_game';
        message: string;
    };

    /**
     * Handles level manager initialization failures
     */
    handleInitializationFailure(error: Error): {
        fallbackLevels: MazeLevelData[];
        message: string;
    };
}

/**
 * Default error recovery strategy implementation
 */
export function createErrorRecoveryStrategy(): ErrorRecoveryStrategy {
    return {
        handleLevelLoadingFailure(levelNumber, error, availableLevels) {
            console.warn(`Level ${levelNumber} loading failed:`, error.message);

            // Try to use a previous level if available
            if (availableLevels.length > 0) {
                const lastValidLevel = availableLevels[availableLevels.length - 1];
                if (lastValidLevel) {
                    return {
                        fallbackLevel: { ...lastValidLevel, levelNumber },
                        recoveryAction: 'use_previous_level',
                        message: `Using level ${lastValidLevel.levelNumber} layout as fallback for level ${levelNumber}`
                    };
                }
            }

            // Use the initial maze as fallback
            const fallbackLevel: MazeLevelData = {
                levelNumber,
                maze: initialMaze,
                moveLimit: 45,
                diamondCount: 6,
                bombCount: 2,
                rockCount: 78,
                playerStartPosition: { x: 1, y: 3 },
                exitPosition: { x: 14, y: 8 }
            };

            return {
                fallbackLevel,
                recoveryAction: 'use_initial_maze',
                message: `Using initial maze as fallback for level ${levelNumber}`
            };
        },

        handleLevelTransitionFailure(fromLevel, toLevel, error) {
            console.error(`Level transition failed from ${fromLevel} to ${toLevel}:`, error.message);

            // For critical errors, suggest ending the game
            if (error.message.includes('critical') || error.message.includes('fatal')) {
                return {
                    shouldRetry: false,
                    fallbackAction: 'end_game',
                    message: `Critical error during level transition - ending game`
                };
            }

            // For less critical errors, stay on current level
            return {
                shouldRetry: true,
                fallbackAction: 'stay_current_level',
                message: `Level transition failed - staying on level ${fromLevel}`
            };
        },

        handleInitializationFailure(error) {
            console.error('Level manager initialization failed:', error.message);

            // Create a minimal set of fallback levels
            const fallbackLevels: MazeLevelData[] = [
                {
                    levelNumber: 1,
                    maze: initialMaze,
                    moveLimit: 45,
                    diamondCount: 6,
                    bombCount: 2,
                    rockCount: 78,
                    playerStartPosition: { x: 1, y: 3 },
                    exitPosition: { x: 14, y: 8 }
                },
                createFallbackLevel(2),
                createFallbackLevel(3)
            ];

            return {
                fallbackLevels,
                message: 'Using fallback level configuration due to initialization failure'
            };
        }
    };
}

/**
 * Logs level errors with appropriate detail level
 */
export function logLevelError(error: LevelError, context?: Record<string, unknown>): void {
    const logContext = {
        type: error.type,
        levelNumber: error.levelNumber,
        message: error.message,
        originalError: error.originalError?.message,
        context: { ...error.context, ...context }
    };

    switch (error.type) {
        case 'level_loading_failed':
        case 'level_transition_failed':
            console.warn('Level management warning:', logContext);
            break;
        case 'invalid_level_data':
            console.error('Level validation error:', logContext);
            break;
        case 'level_manager_initialization_failed':
        case 'level_progression_failed':
            console.error('Critical level management error:', logContext);
            break;
        default:
            console.error('Unknown level error:', logContext);
    }
}

/**
 * Wraps level operations with error handling
 */
export function withLevelErrorHandling<T>(
    operation: () => T,
    errorType: LevelErrorType,
    context?: { levelNumber?: number; operationName?: string }
): T {
    try {
        return operation();
    } catch (error) {
        const levelError = createLevelError(
            errorType,
            `${context?.operationName || 'Level operation'} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            {
                levelNumber: context?.levelNumber,
                originalError: error instanceof Error ? error : new Error(String(error)),
                context
            }
        );

        logLevelError(levelError);
        throw levelError;
    }
}