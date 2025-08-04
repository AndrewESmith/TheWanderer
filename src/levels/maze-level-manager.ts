import type { MazeLevelData } from "../Interfaces/IMazeLevelData";
import type { MazeLevelManager } from "../Interfaces/IMazeLevelManager";
import { CELL, initialMaze } from "../maze";
import { validateLevel, validateLevels } from "./level-validation";
import {
    createLevelError,
    createErrorRecoveryStrategy,
    logLevelError,
    withLevelErrorHandling,
    attemptLevelRepair,
    createFallbackLevel
} from "./level-error-handler";

/**
 * Level configurations for the maze game
 * Level 1 uses the existing maze, levels 2-5 are new configurations
 */
const MAZE_LEVELS: MazeLevelData[] = [
    // Level 1: Existing maze
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

    // Level 2: More challenging layout
    {
        levelNumber: 2,
        maze: [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.SOIL, CELL.ROCK],
            // Row 2
            [CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK],
            // Row 3
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
            // Row 4
            [CELL.ROCK, CELL.SOIL, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 5
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
            // Row 6
            [CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 7
            [CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.BOULDER, CELL.ROCK],
            // Row 8
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ],
        moveLimit: 50,
        diamondCount: 7,
        bombCount: 2,
        rockCount: 78,
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 8 }
    },

    // Level 3: Tighter spaces and more obstacles
    {
        levelNumber: 3,
        maze: [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1
            [CELL.ROCK, CELL.PLAYER, CELL.SOIL, CELL.EMPTY, CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK, CELL.EMPTY, CELL.BOMB, CELL.SOIL, CELL.ROCK],
            // Row 2
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
            // Row 3
            [CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
            // Row 4
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 5
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.SOIL, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 6
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
            // Row 7
            [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.BOMB, CELL.ROCK],
            // Row 8
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ],
        moveLimit: 50,
        diamondCount: 6,
        bombCount: 2,
        rockCount: 1,
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 8 }
    },

    // Level 4: Complex maze with multiple paths
    {
        levelNumber: 4,
        maze: [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.BOULDER, CELL.ROCK, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.ROCK],
            // Row 2
            [CELL.ROCK, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK],
            // Row 3
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
            // Row 4
            [CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
            // Row 5
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 6
            [CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
            // Row 7
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.SOIL, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 8
            [CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ],
        moveLimit: 45,
        diamondCount: 6,
        bombCount: 2,
        rockCount: 6,
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 8 }
    },

    // Level 5: Final challenging level
    {
        levelNumber: 5,
        maze: [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1
            [CELL.ROCK, CELL.PLAYER, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.ROCK],
            // Row 2
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
            // Row 3
            [CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
            // Row 4
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 5
            [CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK],
            // Row 6
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 7
            [CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
            // Row 8
            [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOMB, CELL.EXIT, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ],
        moveLimit: 45,
        diamondCount: 6,
        bombCount: 2,
        rockCount: 5,
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 8 }
    }
];

/**
 * Enhanced level validation with error recovery
 * @param level The level data to validate
 * @param levelIndex The index of the level in the array (for context)
 * @returns The validated level or a repaired/fallback level
 */
function validateAndRepairLevel(level: MazeLevelData, levelIndex: number): MazeLevelData | null {
    return withLevelErrorHandling(() => {
        const validationResult = validateLevel(level);

        if (validationResult.isValid) {
            if (validationResult.warnings.length > 0) {
                console.warn(`Level ${level.levelNumber} has warnings:`, validationResult.warnings);
            }
            return level;
        }

        // Log validation errors
        console.error(`Level ${level.levelNumber} validation failed:`, validationResult.errors);

        // Attempt to repair the level
        const repairResult = attemptLevelRepair(level, validationResult.errors);

        if (repairResult.repairedLevel) {
            console.info(`Level ${level.levelNumber} repair attempted:`, repairResult.repairLog);

            // Validate the repaired level
            const repairedValidation = validateLevel(repairResult.repairedLevel);
            if (repairedValidation.isValid) {
                console.info(`Level ${level.levelNumber} successfully repaired`);
                return repairResult.repairedLevel;
            } else {
                console.warn(`Level ${level.levelNumber} repair failed, using fallback`);
            }
        }

        // If repair failed, log the error and return null (will be filtered out)
        const error = createLevelError(
            'invalid_level_data',
            `Level ${level.levelNumber} is invalid and could not be repaired`,
            {
                levelNumber: level.levelNumber,
                context: {
                    validationErrors: validationResult.errors,
                    repairLog: repairResult.repairLog
                }
            }
        );

        logLevelError(error);
        return null;
    }, 'invalid_level_data', { levelNumber: level.levelNumber, operationName: 'Level validation' });
}

/**
 * Enhanced implementation of MazeLevelManager with comprehensive error handling
 * Manages level progression and provides access to level configurations with fallback mechanisms
 */
export function createMazeLevelManager(): MazeLevelManager {
    return withLevelErrorHandling(() => {
        let currentLevelIndex = 0;
        const errorRecovery = createErrorRecoveryStrategy();

        // Validate all levels with comprehensive error handling
        const validationResult = validateLevels(MAZE_LEVELS);

        if (!validationResult.overallValid) {
            console.warn(`Level validation found ${validationResult.summary.totalErrors} errors and ${validationResult.summary.totalWarnings} warnings`);
        }

        // Process levels with validation and repair
        const processedLevels: MazeLevelData[] = [];

        for (let i = 0; i < MAZE_LEVELS.length; i++) {
            const level = MAZE_LEVELS[i]!;
            const validatedLevel = validateAndRepairLevel(level, i);

            if (validatedLevel) {
                processedLevels.push(validatedLevel);
            } else {
                // Use error recovery to get a fallback level
                const recovery = errorRecovery.handleLevelLoadingFailure(
                    level.levelNumber,
                    new Error(`Level ${level.levelNumber} validation failed`),
                    processedLevels
                );

                console.warn(recovery.message);
                processedLevels.push(recovery.fallbackLevel);
            }
        }

        // Final safety check - ensure we have at least one valid level
        if (processedLevels.length === 0) {
            console.error('No valid levels found after processing - using emergency fallback');
            const emergencyRecovery = errorRecovery.handleInitializationFailure(
                new Error('All levels failed validation')
            );
            processedLevels.push(...emergencyRecovery.fallbackLevels);
        }

        const validLevels = processedLevels;

        return {
            getCurrentLevel(): MazeLevelData {
                return withLevelErrorHandling(() => {
                    const level = validLevels[currentLevelIndex];
                    if (!level) {
                        throw new Error(`Invalid level index: ${currentLevelIndex}, total levels: ${validLevels.length}`);
                    }
                    return level;
                }, 'level_loading_failed', {
                    levelNumber: currentLevelIndex + 1,
                    operationName: 'Get current level'
                });
            },

            hasNextLevel(): boolean {
                return currentLevelIndex < validLevels.length - 1;
            },

            advanceToNextLevel(): MazeLevelData | null {
                return withLevelErrorHandling(() => {
                    if (!this.hasNextLevel()) {
                        return null;
                    }

                    const previousIndex = currentLevelIndex;
                    currentLevelIndex++;

                    try {
                        const nextLevel = this.getCurrentLevel();
                        return nextLevel;
                    } catch (error) {
                        // Rollback on failure
                        currentLevelIndex = previousIndex;

                        const recovery = errorRecovery.handleLevelTransitionFailure(
                            previousIndex + 1,
                            currentLevelIndex + 1,
                            error instanceof Error ? error : new Error('Unknown transition error')
                        );

                        if (recovery.fallbackAction === 'stay_current_level') {
                            console.warn(recovery.message);
                            return null;
                        }

                        throw error;
                    }
                }, 'level_transition_failed', {
                    levelNumber: currentLevelIndex + 1,
                    operationName: 'Advance to next level'
                });
            },

            getTotalLevels(): number {
                return validLevels.length;
            },

            getCurrentLevelNumber(): number {
                return withLevelErrorHandling(() => {
                    const level = validLevels[currentLevelIndex];
                    return level?.levelNumber ?? 1;
                }, 'level_loading_failed', {
                    levelNumber: currentLevelIndex + 1,
                    operationName: 'Get current level number'
                });
            }
        };
    }, 'level_manager_initialization_failed', { operationName: 'Create MazeLevelManager' });
}