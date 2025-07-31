import { describe, it, expect } from "vitest";
import { createGameState, movePlayer, createInitialGameState, type GameStateData } from "../GameState";
import { CELL, type MazeCell } from "../maze";
import type { IPlayerPos } from "../Interfaces/IPlayerPos";
import { createBoulderStateManager } from "../physics/boulder-state-manager";
import { updateMovementConstraints } from "../physics/movement-constraint-system";

// Helper function to create test maze data following functional patterns
function createTestGameState(
    maze: MazeCell[][],
    player: IPlayerPos,
    score: number = 0,
    moves: number = 10,
    diamonds: number = 0,
    gameState: 'playing' | 'dead' | 'won' = 'playing'
): GameStateData {
    const mazeCopy = maze.map(row => [...row]); // Deep copy
    const boulderStateManager = createBoulderStateManager(mazeCopy, moves);
    const movementConstraint = updateMovementConstraints(boulderStateManager);

    return {
        maze: mazeCopy,
        player,
        score,
        moves,
        diamonds,
        gameState,
        boulderStateManager,
        movementConstraint,
    };
}

describe("GameState - Functional Implementation", () => {
    describe("movePlayer function", () => {
        it("should collect diamond and update state correctly", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.DIAMOND],
                [CELL.ROCK, CELL.ROCK],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 }, 0, 10, 1, 'playing');

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.score).toBe(10);
            expect(newState.diamonds).toBe(0);
            expect(newState.player).toEqual({ x: 1, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.EMPTY);
            expect(newState.maze[0]?.[1]).toBe(CELL.PLAYER);
            expect(newState.moves).toBe(9);
            expect(newState.gameState).toBe('playing');
        });

        it("should not move when blocked by rock", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 });

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.player).toEqual({ x: 0, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.PLAYER);
            expect(newState.maze[0]?.[1]).toBe(CELL.ROCK);
            expect(newState.moves).toBe(10); // Moves should not decrease for invalid move
        });

        it("should set game state to dead when hitting bomb", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.BOMB],
                [CELL.ROCK, CELL.ROCK],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 });

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.gameState).toBe('dead');
            expect(newState.player).toEqual({ x: 1, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.EMPTY);
            expect(newState.maze[0]?.[1]).toBe(CELL.PLAYER);
            expect(newState.moves).toBe(9);
        });

        it("should prevent exit when diamonds remain", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.EXIT],
                [CELL.ROCK, CELL.DIAMOND],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 }, 0, 10, 1, 'playing');

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.gameState).toBe('playing');
            expect(newState.player).toEqual({ x: 0, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.PLAYER);
            expect(newState.maze[0]?.[1]).toBe(CELL.EXIT);
            expect(newState.diamonds).toBe(1);
            expect(newState.moves).toBe(10); // No move should occur
        });

        it("should allow exit when all diamonds are collected", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.EXIT],
                [CELL.ROCK, CELL.ROCK],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 }, 10, 10, 0, 'playing');

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.gameState).toBe('won');
            expect(newState.player).toEqual({ x: 1, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.EMPTY);
            expect(newState.maze[0]?.[1]).toBe(CELL.PLAYER);
            expect(newState.score).toBe(10);
            expect(newState.moves).toBe(9);
        });

        it("should handle soil movement correctly", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.SOIL],
                [CELL.ROCK, CELL.ROCK],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 }, 0, 10, 0, 'playing');

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.player).toEqual({ x: 1, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.EMPTY);
            expect(newState.maze[0]?.[1]).toBe(CELL.PLAYER);
            expect(newState.gameState).toBe('playing');
            expect(newState.score).toBe(0);
            expect(newState.moves).toBe(9);
        });

        it("should set game state to dead when running out of moves", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.EMPTY, CELL.EMPTY],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];
            const initialState = createTestGameState(testMaze, { x: 0, y: 0 }, 0, 1, 0, 'playing');

            const newState = movePlayer(initialState, 1, 0);

            expect(newState.gameState).toBe('dead');
            expect(newState.moves).toBe(0);
            expect(newState.player).toEqual({ x: 1, y: 0 });
            expect(newState.maze[0]?.[0]).toBe(CELL.EMPTY);
            expect(newState.maze[0]?.[1]).toBe(CELL.PLAYER);
        });
    });

    describe("createGameState factory function", () => {
        it("should create game state with default values", () => {
            const gameState = createGameState();

            expect(gameState.score).toBe(0);
            expect(gameState.moves).toBe(55);
            expect(gameState.gameState).toBe('playing');
            expect(gameState.player).toBeTruthy();
        });

        it("should create game state with custom initial data", () => {
            const customMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.EMPTY],
                [CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createGameState({
                maze: customMaze,
                score: 100,
                moves: 20,
            });

            expect(gameState.score).toBe(100);
            expect(gameState.moves).toBe(20);
            expect(gameState.maze).toEqual(customMaze);
        });

        it("should handle player movement through factory interface", () => {
            const testMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.DIAMOND],
                [CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createGameState({
                maze: testMaze,
                diamonds: 1,
            });

            const initialScore = gameState.score;
            gameState.movePlayer(1, 0);

            expect(gameState.score).toBe(initialScore + 10);
            expect(gameState.diamonds).toBe(0);
        });
    });
});