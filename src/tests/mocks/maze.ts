// Mock version of maze.ts without CSS import
import { IMaze } from "../../Interfaces/IMaze";
import { IPlayerPos } from "../../Interfaces/IPlayerPos";

export const ICONS = {
    empty: "",
    player: "🧑",
    rock: "🧱",
    soil: "🟫",
    diamond: "💎",
    boulder: "🪨",
    bomb: "💣",
    exit: "🚪",
} as const;

export const CELL = {
    EMPTY: "empty",
    PLAYER: "player",
    ROCK: "rock",
    SOIL: "soil",
    DIAMOND: "diamond",
    BOULDER: "boulder",
    BOMB: "bomb",
    EXIT: "exit",
} as const;

// Type definitions
export type CellType = keyof typeof ICONS;
export type MazeCell = CellType;
export const initialMaze: MazeCell[][] = [
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    [CELL.ROCK, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.BOMB, CELL.ROCK],
    [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
    [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.EXIT, CELL.ROCK],
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
];
export class Maze implements IMaze {
    getCell(x: number, y: number): MazeCell {
        return initialMaze[y][x];
    }
    setCell(x: number, y: number, value: MazeCell): void {
        initialMaze[y][x] = value;
    }

    getPlayerPos(): IPlayerPos | null {
        for (let y = 0; y < initialMaze.length; y++) {
            for (let x = 0; x < initialMaze[0].length; x++) {
                if (initialMaze[y][x] === CELL.PLAYER) return { x, y };
            }
        }
        return null;
    }
}