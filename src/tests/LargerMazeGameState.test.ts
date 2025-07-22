import { describe, it, expect } from "vitest";
import { createGameState, movePlayer, countDiamonds, type GameStateData } from "../GameState";
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

// Helper function to create test game state with larger maze
function createLargerMazeGameState(
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

describe("Larger Maze Game State Management - Functional Implementation", () => {
    describe("Diamond counting and collection", () => {
        it("should correctly count diamonds in larger maze", () => {
            const testMaze = createLargerTestMaze();
            // Place player and multiple diamonds
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;
            testMaze[6]![7] = CELL.DIAMOND;
            testMaze[7]![8] = CELL.DIAMOND;
            testMaze[8]![9] = CELL.DIAMOND;
            testMaze[4]![4] = CELL.DIAMOND;
            testMaze[3]![3] = CELL.DIAMOND;

            const diamondCount = countDiamonds(testMaze);
            expect(diamondCount).toBe(6);

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, diamondCount, 'playing');
            expect(initialState.diamonds).toBe(6);

            // Collect one diamond
            const newState = movePlayer(initialState, 1, 0);
            expect(newState.diamonds).toBe(5);
            expect(newState.score).toBe(10);
        });

        it("should prevent exit when diamonds remain in larger maze", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;
            testMaze[5]![7] = CELL.EXIT;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1, 'playing');

            // Collect diamond first
            const afterDiamond = movePlayer(initialState, 1, 0);
            expect(afterDiamond.diamonds).toBe(0);

            // Now should be able to exit
            const afterExit = movePlayer(afterDiamond, 1, 0);
            expect(afterExit.gameState).toBe('won');
        });
    });

    describe("Win and lose conditions", () => {
        it("should handle win condition correctly in larger maze", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;
            testMaze[5]![7] = CELL.EXIT;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1, 'playing');

            // Simulate collecting diamond and entering exit
            const finalState = simulateMovesSequence(initialState, [
                { dx: 1, dy: 0 }, // Collect diamond
                { dx: 1, dy: 0 }  // Enter exit
            ]);

            expect(finalState.diamonds).toBe(0);
            expect(finalState.gameState).toBe('won');
        });

        it("should handle lose condition when running out of moves", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 1, 0, 'playing');

            const finalState = movePlayer(initialState, 1, 0);

            expect(finalState.moves).toBe(0);
            expect(finalState.gameState).toBe('dead');
        });
    });

    describe("Multiple diamond collection scenarios", () => {
        it("should handle multiple diamonds collection across larger maze", () => {
            const testMaze = createLargerTestMaze();
            // Place player and diamonds in a path
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND; // Diamond 1
            testMaze[5]![7] = CELL.DIAMOND; // Diamond 2
            testMaze[5]![8] = CELL.DIAMOND; // Diamond 3
            testMaze[6]![8] = CELL.DIAMOND; // Diamond 4
            testMaze[7]![8] = CELL.DIAMOND; // Diamond 5
            testMaze[8]![8] = CELL.EXIT;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 5, 'playing');

            // Simulate collecting all diamonds and exiting
            const finalState = simulateMovesSequence(initialState, [
                { dx: 1, dy: 0 }, // Diamond 1
                { dx: 1, dy: 0 }, // Diamond 2
                { dx: 1, dy: 0 }, // Diamond 3
                { dx: 0, dy: 1 }, // Diamond 4
                { dx: 0, dy: 1 }, // Diamond 5
                { dx: 0, dy: 1 }  // Exit
            ]);

            expect(finalState.diamonds).toBe(0);
            expect(finalState.score).toBe(50);
            expect(finalState.gameState).toBe('won');
            expect(finalState.moves).toBe(2000 - 6);
        });
    });

    describe("Bomb interactions", () => {
        it("should handle bomb interactions correctly in larger maze", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.EMPTY;
            testMaze[5]![7] = CELL.BOMB;
            testMaze[6]![5] = CELL.BOMB;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 0, 'playing');

            // Move safely first
            const afterSafeMove = movePlayer(initialState, 1, 0);
            expect(afterSafeMove.gameState).toBe('playing');

            // Hit bomb
            const afterBomb = movePlayer(afterSafeMove, 1, 0);
            expect(afterBomb.gameState).toBe('dead');

            // Test bomb in different direction
            const afterBombDown = movePlayer(initialState, 0, 1);
            expect(afterBombDown.gameState).toBe('dead');
        });
    });

    describe("Move counting and game mechanics", () => {
        it("should handle move counting correctly in larger maze", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 0, 'playing');

            // Simulate 10 alternating moves
            const moves = Array.from({ length: 10 }, (_, i) => ({
                dx: i % 2 === 0 ? 1 : -1,
                dy: 0
            }));

            const finalState = simulateMovesSequence(initialState, moves);

            expect(finalState.moves).toBe(2000 - 10);
            expect(finalState.gameState).toBe('playing');
        });

        it("should maintain maze integrity during multiple operations", () => {
            const testMaze = createLargerTestMaze();
            testMaze[5]![5] = CELL.PLAYER;
            testMaze[5]![6] = CELL.DIAMOND;
            testMaze[5]![7] = CELL.SOIL;

            const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1, 'playing');

            // Move through diamond and soil
            const afterDiamond = movePlayer(initialState, 1, 0);
            const afterSoil = movePlayer(afterDiamond, 1, 0);

            // Verify maze state changes
            expect(afterSoil.maze[5]![5]).toBe(CELL.EMPTY); // Original position
            expect(afterSoil.maze[5]![6]).toBe(CELL.EMPTY); // Diamond collected
            expect(afterSoil.maze[5]![7]).toBe(CELL.PLAYER); // Current position
            expect(afterSoil.player).toEqual({ x: 7, y: 5 });
            expect(afterSoil.score).toBe(10);
            expect(afterSoil.diamonds).toBe(0);
        });
    });

    describe("Factory function integration", () => {
        it("should work correctly with createGameState factory for larger mazes", () => {
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