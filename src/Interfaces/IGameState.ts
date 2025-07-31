import type { MazeCell } from "../maze";
import type { IPlayerPos } from "./IPlayerPos";
import type { BoulderStateManager, MovementConstraint } from "../physics/boulder-state-manager";

export interface IGameState {
  maze: MazeCell[][];
  player: IPlayerPos | null;
  score: number;
  moves: number;
  diamonds: number;
  gameState: 'playing' | 'dead' | 'won';
  boulderStateManager: BoulderStateManager;
  movementConstraint: MovementConstraint;
  movePlayer(dx: number, dy: number): void;
}