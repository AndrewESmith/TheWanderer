import { describe, it, expect } from "vitest";
import { GameState } from "./mocks/GameState";
import { CELL, type MazeCell } from "./mocks/maze";
import { type IPlayerPos } from "../Interfaces/IPlayerPos";

describe("Larger Maze Game State Management", () => {
    // Create a test maze that's 16x10 to match our new maze size
    const createLargerTestMaze = (): MazeCell[][] => {
        // Create a 16x10 maze filled with empty cells
        const maze: MazeCell[][] = Array(10).fill(null).map(() =>
            Array(16).fill(CELL.EMPTY)
        );

        // Add a border of rocks
        for (let x = 0; x < 16; x++) {
            maze[0][x] = CELL.ROCK; // Top border
            maze[9][x] = CELL.ROCK; // Bottom border
        }
        for (let y = 0; y < 10; y++) {
            maze[y][0] = CELL.ROCK; // Left border
            maze[y][15] = CELL.ROCK; // Right border
        }

        return maze;
    };

    it("correctly counts diamonds in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player and multiple diamonds
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.DIAMOND;
        testMaze[6][7] = CELL.DIAMOND;
        testMaze[7][8] = CELL.DIAMOND;
        testMaze[8][9] = CELL.DIAMOND;
        testMaze[4][4] = CELL.DIAMOND;
        testMaze[3][3] = CELL.DIAMOND;

        // Count diamonds in the maze
        const diamondCount = testMaze.flat().filter(cell => cell === CELL.DIAMOND).length;
        expect(diamondCount).toBe(6);

        // Initialize game state with the correct diamond count
        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, diamondCount, 'playing');

        // Verify initial diamond count
        expect(gameState.diamonds).toBe(6);

        // Collect one diamond
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(5);

        // Verify we can't exit yet
        testMaze[5][7] = CELL.EXIT;
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('playing');
        expect(gameState.player).toEqual({ x: 7, y: 5 });
    });

    it("handles win condition correctly in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player, diamonds, and exit
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.DIAMOND;
        testMaze[5][7] = CELL.EXIT;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 1, 'playing');

        // Collect the diamond
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(0);

        // Enter the exit
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('won');
    });

    it("handles lose condition correctly when out of moves", () => {
        const testMaze = createLargerTestMaze();
        // Place player
        testMaze[5][5] = CELL.PLAYER;

        const player: IPlayerPos = { x: 5, y: 5 };
        // Set moves to 1 so we'll run out after one move
        const gameState = new GameState(testMaze, player, 0, 1, 0, 'playing');

        // Make one move
        gameState.movePlayer(1, 0);
        expect(gameState.moves).toBe(0);
        expect(gameState.gameState).toBe('dead');
    });

    it("handles multiple diamonds collection across the larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player and diamonds in a path
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.DIAMOND; // Diamond 1
        testMaze[5][7] = CELL.DIAMOND; // Diamond 2
        testMaze[5][8] = CELL.DIAMOND; // Diamond 3
        testMaze[6][8] = CELL.DIAMOND; // Diamond 4
        testMaze[7][8] = CELL.DIAMOND; // Diamond 5
        testMaze[8][8] = CELL.EXIT;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 5, 'playing');

        // Collect first diamond
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(4);
        expect(gameState.score).toBe(10);

        // Collect second diamond
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(3);
        expect(gameState.score).toBe(20);

        // Collect third diamond
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(2);
        expect(gameState.score).toBe(30);

        // Collect fourth diamond
        gameState.movePlayer(0, 1);
        expect(gameState.diamonds).toBe(1);
        expect(gameState.score).toBe(40);

        // Collect fifth diamond
        gameState.movePlayer(0, 1);
        expect(gameState.diamonds).toBe(0);
        expect(gameState.score).toBe(50);

        // Enter exit
        gameState.movePlayer(0, 1);
        expect(gameState.gameState).toBe('won');
    });

    it("handles bomb interactions correctly in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player and bombs
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.EMPTY;
        testMaze[5][7] = CELL.BOMB;
        testMaze[6][5] = CELL.BOMB;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 0, 'playing');

        // Move safely
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('playing');

        // Hit bomb
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('dead');

        // Create a new game state
        const gameState2 = new GameState(testMaze, { x: 5, y: 5 }, 0, 2000, 0, 'playing');

        // Hit bomb in different direction
        gameState2.movePlayer(0, 1);
        expect(gameState2.gameState).toBe('dead');
    });

    it("handles move counting correctly in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player
        testMaze[5][5] = CELL.PLAYER;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 0, 'playing');

        // Make 10 moves
        for (let i = 0; i < 10; i++) {
            // Move right and left alternately
            gameState.movePlayer(i % 2 === 0 ? 1 : -1, 0);
        }

        // Check that moves were counted correctly
        expect(gameState.moves).toBe(2000 - 10);
        expect(gameState.gameState).toBe('playing');
    });
});