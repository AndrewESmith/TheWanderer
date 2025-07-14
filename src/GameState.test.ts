import { GameState } from "./GameState";
import { CELL, MazeCell } from "./maze";
import { IPlayerPos } from "./Interfaces/IPlayerPos";

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
    expect(gameState.maze[0][0]).toBe(CELL.EMPTY);
    expect(gameState.maze[0][1]).toBe(CELL.PLAYER);
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
    expect(gameState.maze[0][0]).toBe(CELL.PLAYER);
    expect(gameState.maze[0][1]).toBe(CELL.ROCK);
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
    expect(gameState.maze[0][0]).toBe(CELL.EMPTY);
    expect(gameState.maze[0][1]).toBe(CELL.PLAYER);
  });
}); 