import type { MazeLevelData } from "../Interfaces/IMazeLevelData";
import type { MazeLevelManager } from "../Interfaces/IMazeLevelManager";
import { CELL, initialMaze } from "../maze";
import type { MazeCell } from "../maze";

/**
 * Level configurations for the maze game
 * Level 1 uses the existing maze, levels 2-5 are new configurations
 */
const MAZE_LEVELS: MazeLevelData[] = [
    // Level 1: Existing maze
    {
        levelNumber: 1,
        maze: initialMaze,
        moveLimit: 55,
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
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.BOULDER, CELL.ROCK],
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
        moveLimit: 45,
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
        moveLimit: 40,
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
        moveLimit: 50,
        diamondCount: 8,
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
        moveLimit: 35,
        diamondCount: 6,
        bombCount: 3,
        rockCount: 5,
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 8 }
    }
];

/**
 * Validates a maze level configuration to ensure data integrity
 * @param level The level data to validate
 * @returns true if the level is valid, false otherwise
 */
function validateLevel(level: MazeLevelData): boolean {
    // Check basic properties
    if (level.levelNumber < 1 || level.moveLimit < 1) {
        return false;
    }

    // Check maze dimensions (should be 16x10)
    if (level.maze.length !== 10 || level.maze.some(row => row.length !== 16)) {
        return false;
    }

    // Count actual elements in the maze
    let actualDiamonds = 0;
    let actualBombs = 0;
    let actualExits = 0;
    let playerFound = false;

    for (let y = 0; y < level.maze.length; y++) {
        for (let x = 0; x < level.maze[y]!.length; x++) {
            const cell = level.maze[y]![x];
            switch (cell) {
                case CELL.DIAMOND:
                    actualDiamonds++;
                    break;
                case CELL.BOMB:
                    actualBombs++;
                    break;
                case CELL.EXIT:
                    actualExits++;
                    break;
                case CELL.PLAYER:
                    playerFound = true;
                    // Verify player position matches playerStartPosition
                    if (x !== level.playerStartPosition.x || y !== level.playerStartPosition.y) {
                        return false;
                    }
                    break;
            }
        }
    }

    // Validate element counts
    if (actualDiamonds !== level.diamondCount ||
        actualBombs !== level.bombCount ||
        actualExits !== 1 ||
        !playerFound) {
        return false;
    }

    // Verify exit position
    const exitCell = level.maze[level.exitPosition.y]?.[level.exitPosition.x];
    if (exitCell !== CELL.EXIT) {
        return false;
    }

    // Verify player start position is within bounds
    if (level.playerStartPosition.x < 0 || level.playerStartPosition.x >= 16 ||
        level.playerStartPosition.y < 0 || level.playerStartPosition.y >= 10) {
        return false;
    }

    // Verify exit position is within bounds
    if (level.exitPosition.x < 0 || level.exitPosition.x >= 16 ||
        level.exitPosition.y < 0 || level.exitPosition.y >= 10) {
        return false;
    }

    return true;
}

/**
 * Implementation of MazeLevelManager following functional programming patterns
 * Manages level progression and provides access to level configurations
 */
export function createMazeLevelManager(): MazeLevelManager {
    let currentLevelIndex = 0;

    // Validate all levels on initialization
    const validLevels = MAZE_LEVELS.filter(level => {
        const isValid = validateLevel(level);
        if (!isValid) {
            console.warn(`Level ${level.levelNumber} failed validation and will be skipped`);
        }
        return isValid;
    });

    if (validLevels.length === 0) {
        throw new Error("No valid levels found. Cannot initialize MazeLevelManager.");
    }

    return {
        getCurrentLevel(): MazeLevelData {
            const level = validLevels[currentLevelIndex];
            if (!level) {
                throw new Error(`Invalid level index: ${currentLevelIndex}`);
            }
            return level;
        },

        hasNextLevel(): boolean {
            return currentLevelIndex < validLevels.length - 1;
        },

        advanceToNextLevel(): MazeLevelData | null {
            if (!this.hasNextLevel()) {
                return null;
            }

            currentLevelIndex++;
            return this.getCurrentLevel();
        },

        getTotalLevels(): number {
            return validLevels.length;
        },

        getCurrentLevelNumber(): number {
            const level = validLevels[currentLevelIndex];
            return level?.levelNumber ?? 1;
        }
    };
}