import "./maze.css";
import type { IMaze } from "./Interfaces/IMaze";
import type { IPlayerPos } from "./Interfaces/IPlayerPos";

export const ICONS = {
  empty: "/Empty.png",
  player: "/player.png",
  rock: "/rock.png",
  soil: "/soil.png",
  diamond: "/diamond.png",
  boulder: "/boulder.png",
  bomb: "/bomb.png",
  exit: "/exit.png",
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
  // Row 0: Top border
  [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
  // Row 1
  [CELL.ROCK, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.BOMB, CELL.EMPTY, CELL.ROCK],
  // Row 2
  [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK],
  // Row 3
  [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
  // Row 4
  [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
  // Row 5
  [CELL.ROCK, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.SOIL, CELL.EMPTY, CELL.ROCK],
  // Row 6
  [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
  // Row 7
  [CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK],
  // Row 8
  [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
  // Row 9: Bottom border
  [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
];
// Functional maze utilities following TypeScript standards
export function getCell(maze: MazeCell[][], x: number, y: number): MazeCell {
  if (y < 0 || y >= maze.length || x < 0 || x >= (maze[y]?.length ?? 0)) {
    return CELL.EMPTY;
  }
  return maze[y]?.[x] ?? CELL.EMPTY;
}

export function setCell(maze: MazeCell[][], x: number, y: number, value: MazeCell): MazeCell[][] {
  if (y < 0 || y >= maze.length || x < 0 || x >= (maze[y]?.length ?? 0)) {
    return maze; // Return unchanged if out of bounds
  }

  // Create a deep copy to avoid mutation
  const newMaze = maze.map(row => [...row]);
  newMaze[y]![x] = value;
  return newMaze;
}

export function getPlayerPosition(maze: MazeCell[][]): IPlayerPos | null {
  for (let y = 0; y < maze.length; y++) {
    const row = maze[y];
    if (!row) continue;

    for (let x = 0; x < row.length; x++) {
      if (row[x] === CELL.PLAYER) {
        return { x, y };
      }
    }
  }
  return null;
}

// Factory function to create maze instances
export function createMaze(initialLayout: MazeCell[][] = initialMaze): IMaze {
  let currentMaze = initialLayout.map(row => [...row]); // Deep copy

  return {
    getCell: (x: number, y: number) => getCell(currentMaze, x, y),
    setCell: (x: number, y: number, value: MazeCell) => {
      currentMaze = setCell(currentMaze, x, y, value);
    },
    getPlayerPos: () => getPlayerPosition(currentMaze),
  };
}