import { describe, it, expect } from "vitest";
import { CELL, ICONS, initialMaze, type MazeCell } from "../maze";
import { createInitialGameState, countDiamonds } from "../GameState";

// Helper function to validate maze dimensions
function validateMazeDimensions(maze: MazeCell[][]): { width: number; height: number; isValid: boolean } {
    const height = maze.length;
    const width = maze[0]?.length ?? 0;
    const isValid = height > 0 && width > 0 && maze.every(row => row.length === width);

    return { width, height, isValid };
}

// Helper function to check if maze has proper border
function hasBorderOfRocks(maze: MazeCell[][]): boolean {
    const { width, height } = validateMazeDimensions(maze);

    // Check top and bottom borders
    const hasTopBorder = maze[0]?.every(cell => cell === CELL.ROCK) ?? false;
    const hasBottomBorder = maze[height - 1]?.every(cell => cell === CELL.ROCK) ?? false;

    // Check left and right borders
    const hasLeftBorder = maze.every(row => row[0] === CELL.ROCK);
    const hasRightBorder = maze.every(row => row[width - 1] === CELL.ROCK);

    return hasTopBorder && hasBottomBorder && hasLeftBorder && hasRightBorder;
}

// Helper function to count different cell types
function analyzeMazeComposition(maze: MazeCell[][]): Record<MazeCell, number> {
    const composition: Record<string, number> = {};

    // Initialize all cell types to 0
    Object.values(CELL).forEach(cellType => {
        composition[cellType] = 0;
    });

    // Count each cell type
    maze.flat().forEach(cell => {
        composition[cell] = (composition[cell] ?? 0) + 1;
    });

    return composition as Record<MazeCell, number>;
}

// Helper function to validate maze has required game elements
function hasRequiredGameElements(maze: MazeCell[][]): { hasPlayer: boolean; hasDiamonds: boolean; hasExit: boolean } {
    const composition = analyzeMazeComposition(maze);

    return {
        hasPlayer: composition[CELL.PLAYER] === 1, // Should have exactly one player
        hasDiamonds: composition[CELL.DIAMOND] > 0, // Should have at least one diamond
        hasExit: composition[CELL.EXIT] === 1, // Should have exactly one exit
    };
}

describe("Larger Maze UI Adaptation - Functional Implementation", () => {
    describe("Maze dimension validation", () => {
        it("should have correct larger maze dimensions", () => {
            const dimensions = validateMazeDimensions(initialMaze);

            expect(dimensions.isValid).toBe(true);
            expect(dimensions.width).toBe(16);
            expect(dimensions.height).toBe(10);
        });

        it("should maintain consistent row lengths", () => {
            const { isValid } = validateMazeDimensions(initialMaze);
            expect(isValid).toBe(true);

            // Verify each row has the same length
            const expectedWidth = initialMaze[0]?.length ?? 0;
            initialMaze.forEach((row, index) => {
                expect(row.length).toBe(expectedWidth);
            });
        });
    });

    describe("Maze structure validation", () => {
        it("should have proper rock border around the maze", () => {
            const hasBorder = hasBorderOfRocks(initialMaze);
            expect(hasBorder).toBe(true);
        });

        it("should have required game elements", () => {
            const elements = hasRequiredGameElements(initialMaze);

            expect(elements.hasPlayer).toBe(true);
            expect(elements.hasDiamonds).toBe(true);
            expect(elements.hasExit).toBe(true);
        });

        it("should have appropriate maze composition for larger size", () => {
            const composition = analyzeMazeComposition(initialMaze);
            const totalCells = initialMaze.length * (initialMaze[0]?.length ?? 0);

            // Verify we have exactly one player and one exit
            expect(composition[CELL.PLAYER]).toBe(1);
            expect(composition[CELL.EXIT]).toBe(1);

            // Verify we have multiple diamonds for larger maze
            expect(composition[CELL.DIAMOND]).toBeGreaterThan(3);

            // Verify we have some obstacles and interactive elements
            expect(composition[CELL.BOULDER]).toBeGreaterThan(0);
            expect(composition[CELL.BOMB]).toBeGreaterThan(0);
            expect(composition[CELL.SOIL]).toBeGreaterThan(0);

            // Verify total cells add up correctly
            const totalCountedCells = Object.values(composition).reduce((sum, count) => sum + count, 0);
            expect(totalCountedCells).toBe(totalCells);
        });
    });

    describe("Icon mapping validation", () => {
        it("should have icons defined for all cell types", () => {
            Object.values(CELL).forEach(cellType => {
                expect(ICONS).toHaveProperty(cellType);
                expect(typeof ICONS[cellType as keyof typeof ICONS]).toBe('string');
            });
        });

        it("should have unique icons for different cell types", () => {
            const iconValues = Object.values(ICONS);
            const uniqueIcons = new Set(iconValues);

            // Allow empty string for EMPTY cell, but other icons should be unique
            const nonEmptyIcons = iconValues.filter(icon => icon !== '');
            const uniqueNonEmptyIcons = new Set(nonEmptyIcons);

            expect(uniqueNonEmptyIcons.size).toBe(nonEmptyIcons.length);
        });
    });

    describe("Game state integration with larger maze", () => {
        it("should create valid initial game state with larger maze", () => {
            const gameState = createInitialGameState(initialMaze);

            expect(gameState.maze).toEqual(initialMaze);
            expect(gameState.player).toBeTruthy();
            expect(gameState.diamonds).toBeGreaterThan(0);
            expect(gameState.score).toBe(0);
            expect(gameState.moves).toBe(55);
            expect(gameState.gameState).toBe('playing');
        });

        it("should correctly count diamonds in larger maze", () => {
            const diamondCount = countDiamonds(initialMaze);
            const gameState = createInitialGameState(initialMaze);

            expect(gameState.diamonds).toBe(diamondCount);
            expect(diamondCount).toBeGreaterThan(3); // Larger maze should have more diamonds
        });
    });

    describe("Maze accessibility and playability", () => {
        it("should have sufficient empty spaces for movement", () => {
            const composition = analyzeMazeComposition(initialMaze);
            const totalCells = initialMaze.length * (initialMaze[0]?.length ?? 0);
            const movableSpaces = composition[CELL.EMPTY] + composition[CELL.SOIL] + composition[CELL.DIAMOND];

            // Should have reasonable amount of movable space (at least 20% of total)
            expect(movableSpaces / totalCells).toBeGreaterThan(0.2);
        });

        it("should have balanced distribution of obstacles", () => {
            const composition = analyzeMazeComposition(initialMaze);
            const totalCells = initialMaze.length * (initialMaze[0]?.length ?? 0);
            const obstacles = composition[CELL.ROCK] + composition[CELL.BOULDER];

            // Obstacles should not dominate the maze (less than 60% of total)
            expect(obstacles / totalCells).toBeLessThan(0.6);
        });

        it("should have appropriate challenge elements for larger maze", () => {
            const composition = analyzeMazeComposition(initialMaze);

            // Should have multiple challenge elements
            expect(composition[CELL.BOMB]).toBeGreaterThanOrEqual(2);
            expect(composition[CELL.BOULDER]).toBeGreaterThanOrEqual(3);
            expect(composition[CELL.SOIL]).toBeGreaterThanOrEqual(5);
        });
    });
});