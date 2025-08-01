import type { IGameState } from "./Interfaces/IGameState";
import { CELL, initialMaze, getPlayerPosition } from "./maze";
import type { MazeCell } from "./maze";
import type { IPlayerPos } from "./Interfaces/IPlayerPos";
import { generatePlayerMoveEvents } from "./audio/events/sound-event-mapper";
import { emitSoundEvents } from "./audio/events/sound-event-emitter";
import { simulatePhysicsStep, simulatePhysicsStepWithState } from "./physics/physics-engine";
import { handleGameEndSounds } from "./audio/events/game-end-sound-manager";
import type { BoulderStateManager, MovementConstraint } from "./physics/boulder-state-manager";
import {
  createBoulderStateManager,
  updatePlayerPosition,
  updateBoulderMovement,
  updateBoulderPositions,
  identifyTriggeredBoulders,
  updateBoulderTriggers
} from "./physics/boulder-state-manager";
import { shouldBlockPlayerMovement, updateMovementConstraints } from "./physics/movement-constraint-system";

// Game state type following TypeScript standards
export interface GameStateData {
  maze: MazeCell[][];
  player: IPlayerPos | null;
  score: number;
  moves: number;
  diamonds: number;
  gameState: 'playing' | 'dead' | 'won';
  boulderStateManager: BoulderStateManager;
  movementConstraint: MovementConstraint;
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
  const boulderStateManager = createBoulderStateManager(mazeCopy, 55);
  const movementConstraint = updateMovementConstraints(boulderStateManager);

  return {
    maze: mazeCopy,
    player: playerPosition,
    score: 0,
    moves: 55,
    diamonds: diamondCount,
    gameState: 'playing',
    boulderStateManager,
    movementConstraint,
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

  // Check if player movement is blocked by boulder movement constraints
  if (shouldBlockPlayerMovement(gameState.boulderStateManager)) {
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

  // Store previous state for sound event generation
  const previousGameState = gameState.gameState;
  const fromCell = gameState.maze[y]?.[x] ?? CELL.EMPTY;

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

  // Generate and emit sound events for the move
  const playerSoundEvents = generatePlayerMoveEvents(
    fromCell,
    targetCell,
    newGameState,
    previousGameState,
    newDiamonds
  );

  // Simulate physics after player movement (boulder gravity, etc.)
  const physicsResult = simulatePhysicsStepWithState(
    newMaze,
    gameState.boulderStateManager,
    newMoves
  );
  const finalMaze = physicsResult.newMaze;

  // Check for boulder-player collisions and handle player death
  if (physicsResult.playerCollisions.length > 0 && newGameState === 'playing') {
    newGameState = 'dead';
  }

  // Only include physics sound events if this is not the first move (when moves = 54)
  // This prevents initial boulder sounds from playing on the first move
  const physicsSoundEvents = gameState.moves === 55 ? [] : physicsResult.soundEvents;

  // Handle game end sounds separately to ensure movement sounds are stopped
  if (newGameState !== 'playing' && previousGameState === 'playing') {
    // Game just ended - handle end sounds with proper stopping of movement sounds
    handleGameEndSounds(newGameState);

    // Only emit non-game-state-change sounds for game end moves
    const nonGameEndEvents = [...playerSoundEvents, ...physicsSoundEvents].filter(
      event => event.type !== 'death' && event.type !== 'victory'
    );

    if (nonGameEndEvents.length > 0) {
      emitSoundEvents(nonGameEndEvents);
    }
  } else {
    // Normal gameplay - emit all sound events
    const allSoundEvents = [...playerSoundEvents, ...physicsSoundEvents];

    if (allSoundEvents.length > 0) {
      emitSoundEvents(allSoundEvents);
    }
  }

  // Update boulder state manager with physics results
  let updatedBoulderStateManager = updatePlayerPosition(
    gameState.boulderStateManager,
    { x: newX, y: newY }
  );

  // Update boulder positions based on physics results
  updatedBoulderStateManager = updateBoulderPositions(
    updatedBoulderStateManager,
    physicsResult.positionUpdates
  );

  // Update boulder movement states based on physics results
  updatedBoulderStateManager = updateBoulderMovement(
    updatedBoulderStateManager,
    physicsResult.movingBoulders,
    physicsResult.completedBoulders
  );

  // Identify and trigger newly adjacent boulders
  const triggeredBoulders = identifyTriggeredBoulders(
    gameState.boulderStateManager.lastPlayerPosition,
    { x: newX, y: newY },
    updatedBoulderStateManager
  );

  // Update boulder triggers for next move
  if (triggeredBoulders.length > 0) {
    updatedBoulderStateManager = updateBoulderTriggers(
      updatedBoulderStateManager,
      triggeredBoulders,
      newMoves // Trigger on current move, will start moving on next move
    );
  }

  // Update movement constraints based on current boulder states
  const updatedMovementConstraint = updateMovementConstraints(updatedBoulderStateManager);

  return {
    maze: finalMaze,
    player: { x: newX, y: newY },
    score: newScore,
    moves: newMoves,
    diamonds: newDiamonds,
    gameState: newGameState,
    boulderStateManager: updatedBoulderStateManager,
    movementConstraint: updatedMovementConstraint,
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
    get boulderStateManager() { return currentState.boulderStateManager; },
    get movementConstraint() { return currentState.movementConstraint; },

    movePlayer: (dx: number, dy: number) => {
      currentState = movePlayer(currentState, dx, dy);
    },
  };
}