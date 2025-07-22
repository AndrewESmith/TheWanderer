import type { IGameState } from "./Interfaces/IGameState";
import { CELL, initialMaze, getPlayerPosition } from "./maze";
import type { MazeCell } from "./maze";
import type { IPlayerPos } from "./Interfaces/IPlayerPos";

// Game state type following TypeScript standards
export interface GameStateData {
  maze: MazeCell[][];
  player: IPlayerPos | null;
  score: number;
  moves: number;
  diamonds: number;
  gameState: 'playing' | 'dead' | 'won';
}

// Pure function to count diamonds in maze
export function countDiamonds(maze: MazeCell[][]): number {
  return maze.flat().filter((cell) => cell === CELL.DIAMOND).length;
}

// Pure function to create initial game state
export function createInitialGameState(maze: MazeCell[][] = initialMaze): GameStateData {
  const mazeCopy = maze.map(row => [...row]);
  const playerPosition = getPlayerPosition(mazeCopy);
  const diamondCount = countDiamonds(mazeCopy);

  return {
    maze: mazeCopy,
    player: playerPosition,
    score: 0,
    moves: 55,
    diamonds: diamondCount,
    gameState: 'playing',
  };
}

// Pure function to check if position is valid
function isValidPosition(maze: MazeCell[][], x: number, y: number): boolean {
  return y >= 0 && y < maze.length && x >= 0 && x < (maze[y]?.length ?? 0);
}

// Pure function to check if cell blocks movement
function isBlockingCell(cell: MazeCell): boolean {
  return cell === CELL.ROCK || cell === CELL.BOULDER;
}

// Pure function to handle player movement
export function movePlayer(gameState: GameStateData, dx: number, dy: number): GameStateData {
  if (gameState.gameState !== 'playing' || !gameState.player) {
    return gameState;
  }

  const { x, y } = gameState.player;
  const newX = x + dx;
  const newY = y + dy;

  // Check bounds
  if (!isValidPosition(gameState.maze, newX, newY)) {
    return gameState;
  }

  const targetCell = gameState.maze[newY]?.[newX];
  if (targetCell === undefined) {
    return gameState;
  }

  // Check if movement is blocked
  if (isBlockingCell(targetCell)) {
    return gameState;
  }

  // Create new maze with player movement
  const newMaze = gameState.maze.map(row => [...row]);
  newMaze[y]![x] = CELL.EMPTY; // Clear old position
  newMaze[newY]![newX] = CELL.PLAYER; // Set new position

  let newScore = gameState.score;
  let newDiamonds = gameState.diamonds;
  let newGameState: 'playing' | 'dead' | 'won' = gameState.gameState;

  // Handle different cell types
  switch (targetCell) {
    case CELL.DIAMOND:
      newScore += 10;
      newDiamonds -= 1;
      break;
    case CELL.BOMB:
      newGameState = 'dead';
      break;
    case CELL.EXIT:
      if (newDiamonds === 0) {
        newGameState = 'won';
      } else {
        return gameState; // Can't exit with diamonds remaining
      }
      break;
    case CELL.SOIL:
    case CELL.EMPTY:
      // No special handling needed
      break;
  }

  const newMoves = gameState.moves - 1;

  // Check if out of moves
  if (newMoves <= 0 && newGameState === 'playing') {
    newGameState = 'dead';
  }

  return {
    maze: newMaze,
    player: { x: newX, y: newY },
    score: newScore,
    moves: newMoves,
    diamonds: newDiamonds,
    gameState: newGameState,
  };
}

// Factory function to create game state manager following functional patterns
export function createGameState(initialData?: Partial<GameStateData>): IGameState {
  let currentState: GameStateData;

  if (initialData?.maze) {
    // If a custom maze is provided, create initial state from that maze
    currentState = {
      ...createInitialGameState(initialData.maze),
      ...initialData,
    };
  } else {
    // Use default maze
    currentState = {
      ...createInitialGameState(),
      ...initialData,
    };
  }

  return {
    get maze() { return currentState.maze; },
    get player() { return currentState.player; },
    get score() { return currentState.score; },
    get moves() { return currentState.moves; },
    get diamonds() { return currentState.diamonds; },
    get gameState() { return currentState.gameState; },

    movePlayer: (dx: number, dy: number) => {
      currentState = movePlayer(currentState, dx, dy);
    },
  };
}