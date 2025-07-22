import type { MazeCell } from "../maze";
import type { IPlayerPos } from "./IPlayerPos";

export interface IGameState {
  maze: MazeCell[][];
  player: IPlayerPos | null;
  score: number;
  moves: number;
  diamonds: number;
  gameState: 'playing' | 'dead' | 'won';
  movePlayer(dx: number, dy: number): void;
}