import type { MazeCell } from "../maze";
import type { IPlayerPos } from "./IPlayerPos";
import type { BoulderStateManager, MovementConstraint } from "../physics/boulder-state-manager";
import type { MazeLevelManager } from "./IMazeLevelManager";

export interface IGameState {
  maze: MazeCell[][];
  player: IPlayerPos | null;
  score: number;
  moves: number;
  diamonds: number;
  gameState: 'playing' | 'dead' | 'won';
  boulderStateManager: BoulderStateManager;
  movementConstraint: MovementConstraint;
  currentLevel: number;
  levelManager: MazeLevelManager;
  isGameComplete: boolean;
  movePlayer(dx: number, dy: number): void;
}