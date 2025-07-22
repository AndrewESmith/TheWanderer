import { describe, it, expect } from "vitest";
import { GameState } from "./mocks/GameState";
import { CELL, type MazeCell } from "./mocks/maze";
import { type IPlayerPos } from "../Interfaces/IPlayerPos";

describe("GameState", () => {
    it("movePlayer collects diamond and updates state", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.DIAMOND],
            [CELL.ROCK, CELL.ROCK],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        const diamonds = 1;
        const gameState = new GameState(testMaze, player, 0, 10, diamonds, 'playing');
        gameState.movePlayer(1, 0);
        expect(gameState.score).toBe(10);
        expect(gameState.diamonds).toBe(0);
        expect(gameState.player).toEqual({ x: 1, y: 0 });
        // Add null checks to prevent "Object is possibly 'undefined'" errors
        expect(gameState.maze[0]?.[0]).toBe(CELL.EMPTY);
        expect(gameState.maze[0]?.[1]).toBe(CELL.PLAYER);
        expect(gameState.moves).toBe(9);
        expect(gameState.gameState).toBe('playing');
    });

    it("movePlayer into rock does nothing", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        const gameState = new GameState(testMaze, player);
        gameState.movePlayer(1, 0);
        expect(gameState.player).toEqual({ x: 0, y: 0 });
        // Add null checks to prevent "Object is possibly 'undefined'" errors
        expect(gameState.maze[0]?.[0]).toBe(CELL.PLAYER);
        expect(gameState.maze[0]?.[1]).toBe(CELL.ROCK);
    });

    it("movePlayer into bomb sets gameState to dead", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.BOMB],
            [CELL.ROCK, CELL.ROCK],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        const gameState = new GameState(testMaze, player);
        gameState.movePlayer(1, 0);
        expect(gameState.gameState).toBe('dead');
        expect(gameState.player).toEqual({ x: 1, y: 0 });
        // Add null checks to prevent "Object is possibly 'undefined'" errors
        expect(gameState.maze[0]?.[0]).toBe(CELL.EMPTY);
        expect(gameState.maze[0]?.[1]).toBe(CELL.PLAYER);
    });

    it("movePlayer into exit fails when diamonds remain", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.EXIT],
            [CELL.ROCK, CELL.DIAMOND],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        // Set diamonds to 1 to indicate there's still a diamond to collect
        const diamonds = 1;
        const gameState = new GameState(testMaze, player, 0, 10, diamonds, 'playing');

        // Try to move into the exit
        gameState.movePlayer(1, 0);

        // Player should not move and game state should remain unchanged
        expect(gameState.gameState).toBe('playing');
        expect(gameState.player).toEqual({ x: 0, y: 0 });
        // Maze should remain unchanged
        expect(gameState.maze[0]?.[0]).toBe(CELL.PLAYER);
        expect(gameState.maze[0]?.[1]).toBe(CELL.EXIT);
        expect(gameState.maze[1]?.[1]).toBe(CELL.DIAMOND);
        // Diamonds count should remain unchanged
        expect(gameState.diamonds).toBe(1);
        // Moves should remain unchanged since the move was invalid
        expect(gameState.moves).toBe(10);
    });

    it("movePlayer into exit succeeds when all diamonds are collected", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.EXIT],
            [CELL.ROCK, CELL.ROCK],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        // Set diamonds to 0 to indicate all diamonds have been collected
        const diamonds = 0;
        const gameState = new GameState(testMaze, player, 10, 10, diamonds, 'playing');

        // Try to move into the exit
        gameState.movePlayer(1, 0);

        // Player should move and game state should change to 'won'
        expect(gameState.gameState).toBe('won');
        expect(gameState.player).toEqual({ x: 1, y: 0 });
        // Maze should be updated
        expect(gameState.maze[0]?.[0]).toBe(CELL.EMPTY);
        expect(gameState.maze[0]?.[1]).toBe(CELL.PLAYER);
        // Score should remain unchanged
        expect(gameState.score).toBe(10);
        // Moves should decrease by 1
        expect(gameState.moves).toBe(9);
    });

    it("movePlayer into soil succeeds and replaces soil with player", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.SOIL],
            [CELL.ROCK, CELL.ROCK],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        const gameState = new GameState(testMaze, player, 0, 10, 0, 'playing');

        // Move into the soil cell
        gameState.movePlayer(1, 0);

        // Player should move to the soil cell
        expect(gameState.player).toEqual({ x: 1, y: 0 });
        // Original position should be empty
        expect(gameState.maze[0]?.[0]).toBe(CELL.EMPTY);
        // Soil should be replaced by player
        expect(gameState.maze[0]?.[1]).toBe(CELL.PLAYER);
        // Game state should remain playing
        expect(gameState.gameState).toBe('playing');
        // Score should remain unchanged
        expect(gameState.score).toBe(0);
        // Moves should decrease by 1
        expect(gameState.moves).toBe(9);
    });

    it("player dies when running out of moves", () => {
        const testMaze: MazeCell[][] = [
            [CELL.PLAYER, CELL.EMPTY, CELL.EMPTY],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];
        const player: IPlayerPos = { x: 0, y: 0 };
        // Start with only 1 move remaining
        const gameState = new GameState(testMaze, player, 0, 1, 0, 'playing');

        // Make a move that uses up the last move
        gameState.movePlayer(1, 0);

        // Player should be dead after running out of moves
        expect(gameState.gameState).toBe('dead');
        expect(gameState.moves).toBe(0);
        expect(gameState.player).toEqual({ x: 1, y: 0 });
        // Maze should still be updated from the move
        expect(gameState.maze[0]?.[0]).toBe(CELL.EMPTY);
        expect(gameState.maze[0]?.[1]).toBe(CELL.PLAYER);
    });
});