import { IPlayerPos, IPlayerPosStatic } from "./Interfaces/IPlayerPos";
import { CELL } from "./maze";

export class PlayerPos implements IPlayerPos {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  // instance methods if needed
  static getPlayerPos(maze: string[][]): IPlayerPos | null {
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[0].length; x++) {
        if (maze[y][x] === CELL.PLAYER) return { x, y };
      }
    }
    return null;
  }
}

// To type-check static: (optional, for stricter typing)
const _staticCheck: IPlayerPosStatic = PlayerPos;