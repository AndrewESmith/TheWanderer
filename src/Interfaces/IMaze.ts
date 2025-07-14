import { IPlayerPos } from "./IPlayerPos";
import { MazeCell } from "../maze";

// @maze.ts or a new file
export interface IMaze {
    getCell(x: number, y: number): MazeCell;
    setCell(x: number, y: number, value: MazeCell): void;
    getPlayerPos(): IPlayerPos | null;
    // ...other methods as needed
  }