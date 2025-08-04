import type { MazeLevelData } from "../Interfaces/IMazeLevelData";
import { CELL } from "../maze";

/**
 * Validation error types for level data
 */
export interface LevelValidationError {
    type: 'dimension' | 'element_count' | 'position' | 'structure' | 'data_integrity';
    message: string;
    levelNumber?: number;
    details?: Record<string, unknown>;
}

/**
 * Validation result containing errors and warnings
 */
export interface LevelValidationResult {
    isValid: boolean;
    errors: LevelValidationError[];
    warnings: LevelValidationError[];
}

/**
 * Element count constraints for validation
 */
const ELEMENT_CONSTRAINTS = {
    diamonds: { min: 1, max: 10 },
    bombs: { min: 1, max: 3 },
    rocks: { min: 1, max: 6 },
    exits: { exact: 1 },
    players: { exact: 1 }
} as const;

/**
 * Maze dimension constraints
 */
const MAZE_DIMENSIONS = {
    width: 16,
    height: 10
} as const;

/**
 * Validates maze dimensions
 */
function validateMazeDimensions(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    if (!level.maze || !Array.isArray(level.maze)) {
        errors.push({
            type: 'structure',
            message: 'Maze data is missing or not an array',
            levelNumber: level.levelNumber
        });
        return errors;
    }

    if (level.maze.length !== MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'dimension',
            message: `Invalid maze height: expected ${MAZE_DIMENSIONS.height}, got ${level.maze.length}`,
            levelNumber: level.levelNumber,
            details: { expected: MAZE_DIMENSIONS.height, actual: level.maze.length }
        });
    }

    // Check each row
    for (let y = 0; y < level.maze.length; y++) {
        const row = level.maze[y];
        if (!Array.isArray(row)) {
            errors.push({
                type: 'structure',
                message: `Maze row ${y} is not an array`,
                levelNumber: level.levelNumber,
                details: { row: y }
            });
            continue;
        }

        if (row.length !== MAZE_DIMENSIONS.width) {
            errors.push({
                type: 'dimension',
                message: `Invalid maze width at row ${y}: expected ${MAZE_DIMENSIONS.width}, got ${row.length}`,
                levelNumber: level.levelNumber,
                details: { row: y, expected: MAZE_DIMENSIONS.width, actual: row.length }
            });
        }
    }

    return errors;
}

/**
 * Counts elements in the maze
 */
function countMazeElements(maze: unknown[][]): Record<string, number> {
    const counts = {
        diamonds: 0,
        bombs: 0,
        exits: 0,
        players: 0,
        rocks: 0,
        boulders: 0,
        empty: 0,
        soil: 0
    };

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y]!.length; x++) {
            const cell = maze[y]![x];
            switch (cell) {
                case CELL.DIAMOND:
                    counts.diamonds++;
                    break;
                case CELL.BOMB:
                    counts.bombs++;
                    break;
                case CELL.EXIT:
                    counts.exits++;
                    break;
                case CELL.PLAYER:
                    counts.players++;
                    break;
                case CELL.ROCK:
                    counts.rocks++;
                    break;
                case CELL.BOULDER:
                    counts.boulders++;
                    break;
                case CELL.EMPTY:
                    counts.empty++;
                    break;
                case CELL.SOIL:
                    counts.soil++;
                    break;
            }
        }
    }

    return counts;
}

/**
 * Validates element counts in the maze
 */
function validateElementCounts(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];
    const actualCounts = countMazeElements(level.maze);

    // Validate diamonds
    if (actualCounts.diamonds !== level.diamondCount) {
        errors.push({
            type: 'element_count',
            message: `Diamond count mismatch: expected ${level.diamondCount}, found ${actualCounts.diamonds}`,
            levelNumber: level.levelNumber,
            details: { expected: level.diamondCount, actual: actualCounts.diamonds }
        });
    }

    if (actualCounts.diamonds < ELEMENT_CONSTRAINTS.diamonds.min ||
        actualCounts.diamonds > ELEMENT_CONSTRAINTS.diamonds.max) {
        errors.push({
            type: 'element_count',
            message: `Diamond count out of range: expected ${ELEMENT_CONSTRAINTS.diamonds.min}-${ELEMENT_CONSTRAINTS.diamonds.max}, got ${actualCounts.diamonds}`,
            levelNumber: level.levelNumber,
            details: {
                min: ELEMENT_CONSTRAINTS.diamonds.min,
                max: ELEMENT_CONSTRAINTS.diamonds.max,
                actual: actualCounts.diamonds
            }
        });
    }

    // Validate bombs
    if (actualCounts.bombs !== level.bombCount) {
        errors.push({
            type: 'element_count',
            message: `Bomb count mismatch: expected ${level.bombCount}, found ${actualCounts.bombs}`,
            levelNumber: level.levelNumber,
            details: { expected: level.bombCount, actual: actualCounts.bombs }
        });
    }

    if (actualCounts.bombs < ELEMENT_CONSTRAINTS.bombs.min ||
        actualCounts.bombs > ELEMENT_CONSTRAINTS.bombs.max) {
        errors.push({
            type: 'element_count',
            message: `Bomb count out of range: expected ${ELEMENT_CONSTRAINTS.bombs.min}-${ELEMENT_CONSTRAINTS.bombs.max}, got ${actualCounts.bombs}`,
            levelNumber: level.levelNumber,
            details: {
                min: ELEMENT_CONSTRAINTS.bombs.min,
                max: ELEMENT_CONSTRAINTS.bombs.max,
                actual: actualCounts.bombs
            }
        });
    }

    // Validate exits
    if (actualCounts.exits !== ELEMENT_CONSTRAINTS.exits.exact) {
        errors.push({
            type: 'element_count',
            message: `Exit count invalid: expected exactly ${ELEMENT_CONSTRAINTS.exits.exact}, found ${actualCounts.exits}`,
            levelNumber: level.levelNumber,
            details: { expected: ELEMENT_CONSTRAINTS.exits.exact, actual: actualCounts.exits }
        });
    }

    // Validate players
    if (actualCounts.players !== ELEMENT_CONSTRAINTS.players.exact) {
        errors.push({
            type: 'element_count',
            message: `Player count invalid: expected exactly ${ELEMENT_CONSTRAINTS.players.exact}, found ${actualCounts.players}`,
            levelNumber: level.levelNumber,
            details: { expected: ELEMENT_CONSTRAINTS.players.exact, actual: actualCounts.players }
        });
    }

    return errors;
}

/**
 * Validates player and exit positions
 */
function validatePositions(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    // Validate player start position
    const { x: playerX, y: playerY } = level.playerStartPosition;

    if (playerX < 0 || playerX >= MAZE_DIMENSIONS.width ||
        playerY < 0 || playerY >= MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'position',
            message: `Player start position out of bounds: (${playerX}, ${playerY})`,
            levelNumber: level.levelNumber,
            details: { position: { x: playerX, y: playerY }, bounds: MAZE_DIMENSIONS }
        });
    } else {
        // Check if player is actually at the specified position
        const cellAtPlayerPos = level.maze[playerY]?.[playerX];
        if (cellAtPlayerPos !== CELL.PLAYER) {
            errors.push({
                type: 'position',
                message: `Player not found at specified start position (${playerX}, ${playerY}), found: ${cellAtPlayerPos}`,
                levelNumber: level.levelNumber,
                details: { position: { x: playerX, y: playerY }, foundCell: cellAtPlayerPos }
            });
        }
    }

    // Validate exit position
    const { x: exitX, y: exitY } = level.exitPosition;

    if (exitX < 0 || exitX >= MAZE_DIMENSIONS.width ||
        exitY < 0 || exitY >= MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'position',
            message: `Exit position out of bounds: (${exitX}, ${exitY})`,
            levelNumber: level.levelNumber,
            details: { position: { x: exitX, y: exitY }, bounds: MAZE_DIMENSIONS }
        });
    } else {
        // Check if exit is actually at the specified position
        const cellAtExitPos = level.maze[exitY]?.[exitX];
        if (cellAtExitPos !== CELL.EXIT) {
            errors.push({
                type: 'position',
                message: `Exit not found at specified position (${exitX}, ${exitY}), found: ${cellAtExitPos}`,
                levelNumber: level.levelNumber,
                details: { position: { x: exitX, y: exitY }, foundCell: cellAtExitPos }
            });
        }
    }

    return errors;
}

/**
 * Validates basic data integrity
 */
function validateDataIntegrity(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    // Check level number
    if (typeof level.levelNumber !== 'number' || level.levelNumber < 1) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid level number: ${level.levelNumber}`,
            levelNumber: level.levelNumber,
            details: { levelNumber: level.levelNumber }
        });
    }

    // Check move limit
    if (typeof level.moveLimit !== 'number' || level.moveLimit < 1) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid move limit: ${level.moveLimit}`,
            levelNumber: level.levelNumber,
            details: { moveLimit: level.moveLimit }
        });
    }

    // Check counts are non-negative
    if (typeof level.diamondCount !== 'number' || level.diamondCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid diamond count: ${level.diamondCount}`,
            levelNumber: level.levelNumber,
            details: { diamondCount: level.diamondCount }
        });
    }

    if (typeof level.bombCount !== 'number' || level.bombCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid bomb count: ${level.bombCount}`,
            levelNumber: level.levelNumber,
            details: { bombCount: level.bombCount }
        });
    }

    if (typeof level.rockCount !== 'number' || level.rockCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid rock count: ${level.rockCount}`,
            levelNumber: level.levelNumber,
            details: { rockCount: level.rockCount }
        });
    }

    return errors;
}

/**
 * Validates maze structure for basic playability
 */
function validateMazeStructure(level: MazeLevelData): LevelValidationError[] {
    const warnings: LevelValidationError[] = [];

    // Check if maze has proper borders (all edges should be rocks)
    const maze = level.maze;

    // Check top and bottom borders
    for (let x = 0; x < MAZE_DIMENSIONS.width; x++) {
        if (maze[0]?.[x] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Top border not properly sealed at column ${x}`,
                levelNumber: level.levelNumber,
                details: { position: { x, y: 0 }, cell: maze[0]?.[x] }
            });
        }

        if (maze[MAZE_DIMENSIONS.height - 1]?.[x] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Bottom border not properly sealed at column ${x}`,
                levelNumber: level.levelNumber,
                details: { position: { x, y: MAZE_DIMENSIONS.height - 1 }, cell: maze[MAZE_DIMENSIONS.height - 1]?.[x] }
            });
        }
    }

    // Check left and right borders
    for (let y = 0; y < MAZE_DIMENSIONS.height; y++) {
        if (maze[y]?.[0] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Left border not properly sealed at row ${y}`,
                levelNumber: level.levelNumber,
                details: { position: { x: 0, y }, cell: maze[y]?.[0] }
            });
        }

        if (maze[y]?.[MAZE_DIMENSIONS.width - 1] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Right border not properly sealed at row ${y}`,
                levelNumber: level.levelNumber,
                details: { position: { x: MAZE_DIMENSIONS.width - 1, y }, cell: maze[y]?.[MAZE_DIMENSIONS.width - 1] }
            });
        }
    }

    return warnings;
}

/**
 * Comprehensive validation function for a single level
 */
export function validateLevel(level: MazeLevelData): LevelValidationResult {
    const errors: LevelValidationError[] = [];
    const warnings: LevelValidationError[] = [];

    try {
        // Basic data integrity checks
        errors.push(...validateDataIntegrity(level));

        // Dimension validation
        errors.push(...validateMazeDimensions(level));

        // Only proceed with detailed validation if basic structure is valid
        if (errors.length === 0) {
            // Element count validation
            errors.push(...validateElementCounts(level));

            // Position validation
            errors.push(...validatePositions(level));

            // Structure warnings
            warnings.push(...validateMazeStructure(level));
        }
    } catch (error) {
        errors.push({
            type: 'data_integrity',
            message: `Validation failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            levelNumber: level.levelNumber,
            details: { error: error instanceof Error ? error.message : String(error) }
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validates multiple levels and returns aggregated results
 */
export function validateLevels(levels: MazeLevelData[]): {
    overallValid: boolean;
    results: Map<number, LevelValidationResult>;
    summary: {
        totalLevels: number;
        validLevels: number;
        invalidLevels: number;
        totalErrors: number;
        totalWarnings: number;
    };
} {
    const results = new Map<number, LevelValidationResult>();
    let totalErrors = 0;
    let totalWarnings = 0;
    let validLevels = 0;

    for (const level of levels) {
        const result = validateLevel(level);
        results.set(level.levelNumber, result);

        totalErrors += result.errors.length;
        totalWarnings += result.warnings.length;

        if (result.isValid) {
            validLevels++;
        }
    }

    return {
        overallValid: totalErrors === 0,
        results,
        summary: {
            totalLevels: levels.length,
            validLevels,
            invalidLevels: levels.length - validLevels,
            totalErrors,
            totalWarnings
        }
    };
}