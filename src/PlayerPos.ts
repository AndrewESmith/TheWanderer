import { IMaze } from "./Interfaces/IMaze";
import { IPlayerPos, IPlayerPosStatic } from "./Interfaces/IPlayerPos";
import { CELL } from "./maze";

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
