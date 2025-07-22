import { describe, it, expect } from "vitest";
import { createGameState, movePlayer, type GameStateData } from "../GameState";
import { CELL, type MazeCell } from "../maze";
import type { IPlayerPos } from "../Interfaces/IPlayerPos";

// Helper function to create larger test maze following functional patterns
function createLargerTestMaze(): MazeCell[][] {
    // Create a 16x10 maze filled with empty cells
    const maze: MazeCell[][] = Array(10).fill(null).map(() =>
        Array(16).fill(CELL.EMPTY)
    );

    // Add a border of rocks
    for (let x = 0; x < 16; x++) {
        maze[0]![x] = CELL.ROCK; // Top border
        maze[9]![x] = CELL.ROCK; // Bottom border
    }
    for (let y = 0; y < 10; y++) {
        maze[y]![0] = CELL.ROCK; // Left border
        maze[y]![15] = CELL.ROCK; // Right border
    }

    return maze;
}

// Helper function to create test game state
function createTestGameState(
    maze: MazeCell[][],
    player: IPlayerPos,
    score: number = 0,
    moves: number = 2000,
    diamonds: number = 0,
    gameState: 'playing' | 'dead' | 'won' = 'playing'
): GameStateData {
    return {
        maze: maze.map(row => [...row]), // Deep copy
        player,
        score,
        moves,
        diamonds,
        gameState,
    };
}

// Helper function to simulate multiple moves
function simulateMovesSequence(
    initialState: GameStateData,
    moves: Array<{ dx: number; dy: number }>
): GameStateData {
    return moves.reduce((state, move) => movePlayer(state, move.dx, move.dy), initialState);
}

describe("Larger Maze Tests - Functional Implementation", () => {
    describe("Player movement in larger maze", () => {
        it("should allow player to move in all directions", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;

            const initialState = createTestGameState(testMaze, { x: 5, y: 5 });

            // Test moving right
            const afterRight = movePlayer(initialState, 1, 0);
            expect(afterRight.player).toEqual({ x: 6, y: 5 });
            expect(afterRight.maze[5]?.[5]).toBe(CELL.EMPTY);
            expect(afterRight.maze[5]?.[6]).toBe(CELL.PLAYER);

            // Test moving down from new position
            const afterDown = movePlayer(afterRight, 0, 1);
            expect(afterDown.player).toEqual({ x: 6, y: 6 });
            expect(afterDown.maze[5]?.[6]).toBe(CELL.EMPTY);
            expect(afterDown.maze[6]?.[6]).toBe(CELL.PLAYER);

            // Test moving left
            const afterLeft = movePlayer(afterDown, -1, 0);
            expect(afterLeft.player).toEqual({ x: 5, y: 6 });
            expect(afterLeft.maze[6]?.[6]).toBe(CELL.EMPTY);
            expect(afterLeft.maze[6]?.[5]).toBe(CELL.PLAYER);

            // Test moving up
            const afterUp = movePlayer(afterLeft, 0, -1);
            expect(afterUp.player).toEqual({ x: 5, y: 5 });
            expect(afterUp.maze[6]?.[5]).toBe(CELL.EMPTY);
            expect(afterUp.maze[5]?.[5]).toBe(CELL.PLAYER);
        });

        it("should prevent movement through rock borders", () => {
            const testMaze = createLargerTestMaze();
            testMaze[1]![5] = CELL.PLAYER;

            const initialState = createTestGameState(testMaze, { x: 5, y: 1 });

            // Try to move up through the border
            const afterUpAttempt = movePlayer(initialState, 0, -1);
            expect(afterUpAttempt.player).toEqual({ x: 5, y: 1 });
            expect(afterUpAttempt.maze[1]?.[5]).toBe(CELL.PLAYER);
            expect(afterUpAttempt.moves).toBe(2000); // No move should occur

            // Test right border
            const rightBorderMaze = createLargerTestMaze();
            rightBorderMaze[5]![14] = CELL.PLAYER;
            const rightBorderState = createTestGameState(rightBorderMaze, { x: 14, y: 5 });

            const afterRightAttempt = movePlayer(rightBorderState, 1, 0);
            expect(afterRightAttempt.player).toEqual({ x: 14, y: 5 });
            expect(afterRightAttempt.maze[5]?.[14]).toBe(CELL.PLAYER);
            expect(afterRightAttempt.moves).toBe(2000); // No move should occur
        });
    });

    describe("Diamond collection in larger maze", () => {
        it("should allow player to collect diamonds across the maze", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;
            testMaze[6]![5] = CELL.DIAMOND;

            const initialState = createTestGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 2);

            // Collect first diamond
            const afterFirstDiamond = movePlayer(initialState, 1, 0);
            expect(afterFirstDiamond.diamonds).toBe(1);
            expect(afterFirstDiamond.score).toBe(10);
            expect(afterFirstDiamond.player).toEqual({ x: 6, y: 5 });

            // Move to collect second diamond
            const afterSecondDiamond = movePlayer(afterFirstDiamond, -1, 1);
            expect(afterSecondDiamond.diamonds).toBe(0);
            expect(afterSecondDiamond.score).toBe(20);
            expect(afterSecondDiamond.player).toEqual({ x: 5, y: 6 });
        });
    });

    describe("Exit mechanics in larger maze", () => {
        it("should allow exit only after collecting all diamonds", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;
            testMaze[5]![7] = CELL.EXIT;

            const initialState = createTestGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1);

            // First move: collect the diamond
            const afterDiamond = movePlayer(initialState, 1, 0);
            expect(afterDiamond.player).toEqual({ x: 6, y: 5 });
            expect(afterDiamond.gameState).toBe('playing');
            expect(afterDiamond.diamonds).toBe(0); // Diamond collected

            // Now should be able to enter exit
            const exitAttempt = movePlayer(afterDiamond, 1, 0);
            expect(exitAttempt.gameState).toBe('won');
            expect(exitAttempt.player).toEqual({ x: 7, y: 5 });
        });
    });

    describe("Bomb interactions in larger maze", () => {
        it("should cause death when hitting a bomb", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.BOMB;

            const initialState = createTestGameState(testMaze, { x: 5, y: 5 });

            const afterBomb = movePlayer(initialState, 1, 0);
            expect(afterBomb.gameState).toBe('dead');
            expect(afterBomb.player).toEqual({ x: 6, y: 5 });
            expect(afterBomb.maze[5]?.[5]).toBe(CELL.EMPTY);
            expect(afterBomb.maze[5]?.[6]).toBe(CELL.PLAYER);
        });
    });

    describe("Complex navigation in larger maze", () => {
        it("should handle complex paths with various obstacles", () => {
            const testMaze = createLargerTestMaze();
            // Create a complex path with rocks and soil
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.SOIL;
            testMaze[5]![7] = CELL.ROCK;
            testMaze[6]![5] = CELL.ROCK;
            testMaze[6]![6] = CELL.SOIL;
            testMaze[6]![7] = CELL.DIAMOND;

            const initialState = createTestGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1);

            // Navigate through soil
            const afterSoil = movePlayer(initialState, 1, 0);
            expect(afterSoil.player).toEqual({ x: 6, y: 5 });

            // Try to move through rock (should fail)
            const rockAttempt = movePlayer(afterSoil, 1, 0);
            expect(rockAttempt.player).toEqual({ x: 6, y: 5 }); // No movement
            expect(rockAttempt.moves).toBe(afterSoil.moves); // No move consumed

            // Move down through soil
            const downThroughSoil = movePlayer(afterSoil, 0, 1);
            expect(downThroughSoil.player).toEqual({ x: 6, y: 6 });

            // Collect diamond
            const collectDiamond = movePlayer(downThroughSoil, 1, 0);
            expect(collectDiamond.player).toEqual({ x: 7, y: 6 });
            expect(collectDiamond.diamonds).toBe(0);
            expect(collectDiamond.score).toBe(10);
        });

        it("should handle sequential moves efficiently", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.EMPTY;
            testMaze[5]![7] = CELL.EMPTY;
            testMaze[5]![8] = CELL.DIAMOND;

            const initialState = createTestGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1);

            // Use functional composition to simulate path
            const finalState = simulateMovesSequence(initialState, [
                { dx: 1, dy: 0 }, // Move right
                { dx: 1, dy: 0 }, // Move right
                { dx: 1, dy: 0 }  // Collect diamond
            ]);

            expect(finalState.player).toEqual({ x: 8, y: 5 });
            expect(finalState.diamonds).toBe(0);
            expect(finalState.score).toBe(10);
            expect(finalState.moves).toBe(2000 - 3);
        });
    });

    describe("Factory function integration", () => {
        it("should work correctly with createGameState factory", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;

            const gameState = createGameState({
                maze: testMaze,
                diamonds: 1,
                moves: 100
            });

            expect(gameState.moves).toBe(100);
            expect(gameState.diamonds).toBe(1);

            // Test movement through factory interface
            gameState.movePlayer(1, 0);

            expect(gameState.score).toBe(10);
            expect(gameState.diamonds).toBe(0);
            expect(gameState.moves).toBe(99);
        });
    });
});