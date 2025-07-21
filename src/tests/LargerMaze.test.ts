import { describe, it, expect } from "vitest";
import { GameState } from "./mocks/GameState";
import { CELL, type MazeCell } from "./mocks/maze";
import { type IPlayerPos } from "../Interfaces/IPlayerPos";

describe("Larger Maze Tests", () => {
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

    it("player can move in all directions in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player in the middle of the maze
        testMaze[5][5] = CELL.PLAYER;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 0, 'playing');

        // Test moving right
        gameState.movePlayer(1, 0);
        expect(gameState.player).toEqual({ x: 6, y: 5 });
        expect(gameState.maze[5]?.[5]).toBe(CELL.EMPTY);
        expect(gameState.maze[5]?.[6]).toBe(CELL.PLAYER);

        // Test moving down
        gameState.movePlayer(0, 1);
        expect(gameState.player).toEqual({ x: 6, y: 6 });
        expect(gameState.maze[5]?.[6]).toBe(CELL.EMPTY);
        expect(gameState.maze[6]?.[6]).toBe(CELL.PLAYER);

        // Test moving left
        gameState.movePlayer(-1, 0);
        expect(gameState.player).toEqual({ x: 5, y: 6 });
        expect(gameState.maze[6]?.[6]).toBe(CELL.EMPTY);
        expect(gameState.maze[6]?.[5]).toBe(CELL.PLAYER);

        // Test moving up
        gameState.movePlayer(0, -1);
        expect(gameState.player).toEqual({ x: 5, y: 5 });
        expect(gameState.maze[6]?.[5]).toBe(CELL.EMPTY);
        expect(gameState.maze[5]?.[5]).toBe(CELL.PLAYER);
    });

    it("player cannot move through rock borders in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player near the top border
        testMaze[1][5] = CELL.PLAYER;

        const player: IPlayerPos = { x: 5, y: 1 };
        const gameState = new GameState(testMaze, player, 0, 2000, 0, 'playing');

        // Try to move up through the border
        gameState.movePlayer(0, -1);
        // Player should not move
        expect(gameState.player).toEqual({ x: 5, y: 1 });
        expect(gameState.maze[1]?.[5]).toBe(CELL.PLAYER);

        // Place player near the right border
        gameState.maze[5][14] = CELL.PLAYER;
        gameState.maze[1][5] = CELL.EMPTY;
        gameState.player = { x: 14, y: 5 };

        // Try to move right through the border
        gameState.movePlayer(1, 0);
        // Player should not move
        expect(gameState.player).toEqual({ x: 14, y: 5 });
        expect(gameState.maze[5]?.[14]).toBe(CELL.PLAYER);
    });

    it("player can collect diamonds across the larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player and diamonds
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.DIAMOND;
        testMaze[6][5] = CELL.DIAMOND;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 2, 'playing');

        // Collect first diamond
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(1);
        expect(gameState.score).toBe(10);
        expect(gameState.player).toEqual({ x: 6, y: 5 });

        // Move to position for second diamond
        gameState.movePlayer(-1, 1);
        expect(gameState.diamonds).toBe(0);
        expect(gameState.score).toBe(20);
        expect(gameState.player).toEqual({ x: 5, y: 6 });
    });

    it("player can reach the exit after collecting all diamonds in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player, diamond, and exit
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.DIAMOND;
        testMaze[5][7] = CELL.EXIT;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 1, 'playing');

        // Try to reach exit without collecting diamond
        gameState.movePlayer(2, 0);
        // Should not be able to enter exit
        expect(gameState.player).toEqual({ x: 5, y: 5 });
        expect(gameState.gameState).toBe('playing');

        // Collect diamond first
        gameState.movePlayer(1, 0);
        expect(gameState.diamonds).toBe(0);
        expect(gameState.player).toEqual({ x: 6, y: 5 });

        // Now enter exit
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('won');
        expect(gameState.player).toEqual({ x: 7, y: 5 });
    });

    it("player dies when hitting a bomb in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Place player and bomb
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.BOMB;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 0, 'playing');

        // Move into bomb
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('dead');
        expect(gameState.player).toEqual({ x: 6, y: 5 });
        expect(gameState.maze[5]?.[5]).toBe(CELL.EMPTY);
        expect(gameState.maze[5]?.[6]).toBe(CELL.PLAYER);
    });

    it("player can navigate through complex paths in larger maze", () => {
        const testMaze = createLargerTestMaze();
        // Create a more complex path with rocks and soil
        testMaze[5][5] = CELL.PLAYER;
        testMaze[5][6] = CELL.SOIL;
        testMaze[5][7] = CELL.ROCK;
        testMaze[6][5] = CELL.ROCK;
        testMaze[6][6] = CELL.SOIL;
        testMaze[6][7] = CELL.DIAMOND;

        const player: IPlayerPos = { x: 5, y: 5 };
        const gameState = new GameState(testMaze, player, 0, 2000, 1, 'playing');

        // Navigate through soil
        gameState.movePlayer(1, 0);
        expect(gameState.player).toEqual({ x: 6, y: 5 });

        // Try to move through rock (should fail)
        gameState.movePlayer(1, 0);
        expect(gameState.player).toEqual({ x: 6, y: 5 });

        // Move down through soil
        gameState.movePlayer(0, 1);
        expect(gameState.player).toEqual({ x: 6, y: 6 });

        // Collect diamond
        gameState.movePlayer(1, 0);
        expect(gameState.player).toEqual({ x: 7, y: 6 });
        expect(gameState.diamonds).toBe(0);
        expect(gameState.score).toBe(10);
    });
});