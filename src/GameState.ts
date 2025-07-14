import { IGameState } from "./Interfaces/IGameState";
import { MazeCell, CELL, initialMaze } from "./maze";
import { IPlayerPos } from "./Interfaces/IPlayerPos";
import { PlayerPos } from "./PlayerPos";

export class GameState implements IGameState {
  maze: MazeCell[][];
  player: IPlayerPos | null;
  score: number;
  moves: number;
  diamonds: number;
  gameState: 'playing' | 'dead' | 'won';

  constructor(
    maze: MazeCell[][] = initialMaze,
    player: IPlayerPos | null = null,
    score: number = 0,
    moves: number = 1000,
    diamonds: number = initialMaze.flat().filter((c) => c === CELL.DIAMOND).length,
    gameState: 'playing' | 'dead' | 'won' = 'playing',
  ) {
    this.maze = maze.map(row => [...row]);
    this.player = player ?? PlayerPos.getPlayerPos({
      getPlayerPos: () => {
        for (let y = 0; y < this.maze.length; y++) {
          for (let x = 0; x < this.maze[0].length; x++) {
            if (this.maze[y][x] === CELL.PLAYER) return { x, y };
          }
        }
        return null;
      }
    } as any);
    this.score = score;
    this.diamonds = diamonds;
    this.moves = moves;
    this.gameState = gameState;
  }

  movePlayer(dx: number, dy: number): void {
    if (this.gameState !== 'playing' || !this.player) return;
    const { x, y } = this.player;
    const nx = x + dx;
    const ny = y + dy;
    if (
      ny < 0 ||
      ny >= this.maze.length ||
      nx < 0 ||
      nx >= this.maze[0].length
    )
      return;

    const target = this.maze[ny][nx];
    let newGameState: 'playing' | 'dead' | 'won' = this.gameState;

    // Blocked by rock or boulder
    if (target === CELL.ROCK || target === CELL.BOULDER) return;

    // Diamond: collect
    if (target === CELL.DIAMOND) {
      this.score += 10;
      this.diamonds -= 1;
    }

    // Soil: disappears
    if (target === CELL.SOIL || target === CELL.DIAMOND) {
      this.maze[ny][nx] = CELL.PLAYER;
      this.maze[y][x] = CELL.EMPTY;
    }
    // Bomb: die
    else if (target === CELL.BOMB) {
      this.maze[ny][nx] = CELL.PLAYER;
      this.maze[y][x] = CELL.EMPTY;
      newGameState = 'dead';
    }
    // Exit: only if all diamonds collected
    else if (target === CELL.EXIT) {
      if (this.diamonds === 0) {
        this.maze[ny][nx] = CELL.PLAYER;
        this.maze[y][x] = CELL.EMPTY;
        newGameState = 'won';
      } else {
        return;
      }
    }
    // Empty: just move
    else if (target === CELL.EMPTY) {
      this.maze[ny][nx] = CELL.PLAYER;
      this.maze[y][x] = CELL.EMPTY;
    }

    this.player = { x: nx, y: ny };
    this.moves -= 1;
    this.gameState = newGameState;
    if (this.moves <= 0 && this.gameState === 'playing') {
      this.gameState = 'dead';
    }
  }
}
