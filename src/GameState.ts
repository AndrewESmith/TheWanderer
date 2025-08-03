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
import type { MazeLevelManager } from "./Interfaces/IMazeLevelManager";
import { createMazeLevelManager } from "./levels/maze-level-manager";
import type { LevelProgressionHandler } from "./levels/level-progression-handler";
import { createLevelProgressionHandler } from "./levels/level-progression-handler";

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
  currentLevel: number;
  levelManager: MazeLevelManager;
  levelProgressionHandler: LevelProgressionHandler;
  isGameComplete: boolean;
}

// Pure function to count diamonds in maze
export function countDiamonds(maze: MazeCell[][]): number {
  return maze.flat().filter((cell) => cell === CELL.DIAMOND).length;
}

// Pure function to create initial game state
export function createInitialGameState(maze?: MazeCell[][]): GameStateData {
  // Create level manager and get level 1 data
  const levelManager = createMazeLevelManager();
  const currentLevelData = levelManager.getCurrentLevel();

  // Use provided maze or level 1 maze
  const mazeCopy = maze ? maze.map(row => [...row]) : currentLevelData.maze.map(row => [...row]);
  const playerPosition = getPlayerPosition(mazeCopy);
  const diamondCount = countDiamonds(mazeCopy);
  const moveLimit = maze ? 55 : currentLevelData.moveLimit; // Use default if custom maze provided
  const boulderStateManager = createBoulderStateManager(mazeCopy, moveLimit);
  const movementConstraint = updateMovementConstraints(boulderStateManager);
  const levelProgressionHandler = createLevelProgressionHandler();

  return {
    maze: mazeCopy,
    player: playerPosition,
    score: 0,
    moves: moveLimit,
    diamonds: diamondCount,
    gameState: 'playing',
    boulderStateManager,
    movementConstraint,
    currentLevel: levelManager.getCurrentLevelNumber(),
    levelManager,
    levelProgressionHandler,
    isGameComplete: false,
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
      newMoves - 2 // Trigger with move number that will be found on next physics simulation
    );
  }

  // Update movement constraints based on current boulder states
  const updatedMovementConstraint = updateMovementConstraints(updatedBoulderStateManager);

  // Handle level progression if player completed the level
  let updatedLevelManager = gameState.levelManager;
  let updatedCurrentLevel = gameState.currentLevel;
  let updatedIsGameComplete = gameState.isGameComplete;
  let updatedMaze = finalMaze;
  let updatedPlayer = { x: newX, y: newY };
  let updatedScore = newScore;
  let updatedMoves = newMoves;
  let updatedDiamonds = newDiamonds;
  let updatedGameState = newGameState;
  let updatedBoulderStateManager = updatedBoulderStateManager;

  // Check if level is complete and handle progression
  if (gameState.levelProgressionHandler.isLevelComplete(newGameState, newDiamonds)) {
    const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(updatedLevelManager);

    if (progressionResult.success) {
      if (progressionResult.isGameComplete) {
        // Game is complete - no more levels
        updatedIsGameComplete = true;
        // Emit victory sound
        gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);
      } else if (progressionResult.nextLevel) {
        // Advance to next level
        updatedCurrentLevel = progressionResult.nextLevel.levelNumber;
        updatedMaze = progressionResult.nextLevel.maze.map(row => [...row]);
        updatedPlayer = { ...progressionResult.nextLevel.playerStartPosition };
        updatedScore = newScore; // Keep cumulative score
        updatedMoves = progressionResult.nextLevel.moveLimit;
        updatedDiamonds = progressionResult.nextLevel.diamondCount;
        updatedGameState = 'playing'; // Reset to playing for new level

        // Create new boulder state manager for the new level
        updatedBoulderStateManager = createBoulderStateManager(updatedMaze, updatedMoves);

        // Emit door slam sound
        gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);
      }
    }
  }

  return {
    maze: updatedMaze,
    player: updatedPlayer,
    score: updatedScore,
    moves: updatedMoves,
    diamonds: updatedDiamonds,
    gameState: updatedGameState,
    boulderStateManager: updatedBoulderStateManager,
    movementConstraint: updatedMovementConstraint,
    currentLevel: updatedCurrentLevel,
    levelManager: updatedLevelManager,
    levelProgressionHandler: gameState.levelProgressionHandler,
    isGameComplete: updatedIsGameComplete,
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
    get currentLevel() { return currentState.currentLevel; },
    get levelManager() { return currentState.levelManager; },
    get levelProgressionHandler() { return currentState.levelProgressionHandler; },
    get isGameComplete() { return currentState.isGameComplete; },

    movePlayer: (dx: number, dy: number) => {
      currentState = movePlayer(currentState, dx, dy);
    },
  };
}