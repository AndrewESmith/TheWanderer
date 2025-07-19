import type { IMaze } from "./Interfaces/IMaze";
import type { IPlayerPos } from "./Interfaces/IPlayerPos";

export class PlayerPos implements IPlayerPos {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static getPlayerPos(maze: IMaze): IPlayerPos | null {
    return maze.getPlayerPos();
  }
}