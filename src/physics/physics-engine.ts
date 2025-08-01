import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';
import {
    simulateBoulderFall,
    simulateEnhancedBoulderFall,
    simulateArrowMovement,
    canBoulderFall,
    type Position
} from './collision-detection';
import type { BoulderStateManager } from './boulder-state-manager';
import {
    getTriggeredBouldersForMove,
    updateBoulderMovement,
    updateBoulderPositions,
    createPositionKey
} from './boulder-state-manager';

// Enhanced physics simulation result
export interface PhysicsSimulationResult {
    newMaze: MazeCell[][];
    soundEvents: SoundEvent[];
    boulderPositions: Position[];
    arrowPositions: Position[];
    movingBoulders: Position[];
    completedBoulders: Position[];
    playerCollisions: Position[];
}

// Pure function to find all boulders in the maze
export function findBoulders(maze: MazeCell[][]): Position[] {
    const boulders: Position[] = [];

    for (let y = 0; y < maze.length; y++) {
        const row = maze[y];
        if (!row) continue;

        for (let x = 0; x < row.length; x++) {
            if (row[x] === CELL.BOULDER) {
                boulders.push({ x, y });
            }
        }
    }

    return boulders;
}

// Pure function to simulate gravity for all boulders (legacy version)
export function simulateGravity(maze: MazeCell[][]): PhysicsSimulationResult {
    const boulders = findBoulders(maze);
    let currentMaze = maze.map(row => [...row]);
    const allSoundEvents: SoundEvent[] = [];
    const newBoulderPositions: Position[] = [];

    // Process boulders from bottom to top to avoid conflicts
    const sortedBoulders = [...boulders].sort((a, b) => b.y - a.y);

    for (const boulder of sortedBoulders) {
        const result = simulateBoulderFall(currentMaze, boulder);
        currentMaze = result.newMaze;
        newBoulderPositions.push(result.newPosition);

        // Add sound events from the fall simulation (includes movement and collision sounds)
        allSoundEvents.push(...result.soundEvents);
    }

    return {
        newMaze: currentMaze,
        soundEvents: allSoundEvents,
        boulderPositions: newBoulderPositions,
        arrowPositions: [], // No arrows in current implementation
        movingBoulders: [],
        completedBoulders: [],
        playerCollisions: []
    };
}

// Enhanced function to simulate gravity with boulder state management
export function simulateGravityWithState(
    maze: MazeCell[][],
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number
): PhysicsSimulationResult {
    let currentMaze = maze.map(row => [...row]);
    const allSoundEvents: SoundEvent[] = [];
    const movingBoulders: Position[] = [];
    const completedBoulders: Position[] = [];
    const playerCollisions: Position[] = [];
    const positionUpdates: Array<{ from: Position; to: Position }> = [];

    // Get boulders that should start moving this turn
    const triggeredBoulders = getTriggeredBouldersForMove(boulderStateManager, currentMoveNumber);

    // Get all boulders that are currently moving or should start moving
    const currentlyMovingBoulders = Array.from(boulderStateManager.boulders.values())
        .filter(state => state.isMoving)
        .map(state => state.position);

    const allMovingBoulders = [
        ...triggeredBoulders,
        ...currentlyMovingBoulders
    ];

    // Remove duplicates based on position
    const uniqueMovingBoulders = allMovingBoulders.filter((boulder, index, array) =>
        array.findIndex(b => b.x === boulder.x && b.y === boulder.y) === index
    );



    // Track newly triggered boulders
    for (const boulder of triggeredBoulders) {
        movingBoulders.push(boulder);
    }

    // Process boulder movement from bottom to top to avoid conflicts
    const sortedMovingBoulders = [...uniqueMovingBoulders].sort((a, b) => b.y - a.y);

    for (const boulder of sortedMovingBoulders) {
        const result = simulateEnhancedBoulderFall(currentMaze, boulder);

        // Add sound events from boulder fall simulation
        allSoundEvents.push(...result.soundEvents);

        // Check for player collision
        if (result.playerCollision) {
            playerCollisions.push(result.newPosition);
        }

        // Check if boulder actually moved
        const hasMoved = result.newPosition.x !== boulder.x || result.newPosition.y !== boulder.y;

        if (hasMoved) {
            // Boulder moved successfully
            currentMaze = result.newMaze;
            positionUpdates.push({ from: boulder, to: result.newPosition });

            // If this wasn't a newly triggered boulder, it's still moving
            if (!triggeredBoulders.some(tb => tb.x === boulder.x && tb.y === boulder.y)) {
                movingBoulders.push(boulder);
            }
        } else {
            // Boulder stopped moving (collision or reached bottom)
            completedBoulders.push(boulder);
        }
    }

    const finalBoulderPositions = findBoulders(currentMaze);

    return {
        newMaze: currentMaze,
        soundEvents: allSoundEvents,
        boulderPositions: finalBoulderPositions,
        arrowPositions: [], // No arrows in current implementation
        movingBoulders,
        completedBoulders,
        playerCollisions
    };
}

// Helper function to find player position in maze
function findPlayerPosition(maze: MazeCell[][]): Position | null {
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

// Pure function to simulate arrow movement (for future use)
export function simulateArrows(
    maze: MazeCell[][],
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }>
): PhysicsSimulationResult {
    let currentMaze = maze.map(row => [...row]);
    const allSoundEvents: SoundEvent[] = [];
    const newArrowPositions: Position[] = [];

    for (const arrow of arrows) {
        const result = simulateArrowMovement(currentMaze, arrow.position, arrow.direction);
        currentMaze = result.newMaze;
        allSoundEvents.push(...result.soundEvents);

        if (result.newPosition) {
            newArrowPositions.push(result.newPosition);
        }
    }

    return {
        newMaze: currentMaze,
        soundEvents: allSoundEvents,
        boulderPositions: findBoulders(currentMaze),
        arrowPositions: newArrowPositions,
        movingBoulders: [],
        completedBoulders: [],
        playerCollisions: []
    };
}

// Pure function to run a complete physics simulation step (legacy version)
export function simulatePhysicsStep(
    maze: MazeCell[][],
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }> = []
): PhysicsSimulationResult {
    // First simulate gravity for boulders
    const gravityResult = simulateGravity(maze);

    // Then simulate arrow movement
    const arrowResult = simulateArrows(gravityResult.newMaze, arrows);

    // Combine results
    return {
        newMaze: arrowResult.newMaze,
        soundEvents: [...gravityResult.soundEvents, ...arrowResult.soundEvents],
        boulderPositions: arrowResult.boulderPositions,
        arrowPositions: arrowResult.arrowPositions,
        movingBoulders: [],
        completedBoulders: [],
        playerCollisions: []
    };
}

// Enhanced function to run physics simulation with boulder state management
export function simulatePhysicsStepWithState(
    maze: MazeCell[][],
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number,
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }> = []
): PhysicsSimulationResult {
    // First simulate gravity for boulders with state management
    const gravityResult = simulateGravityWithState(maze, boulderStateManager, currentMoveNumber);

    // Then simulate arrow movement
    const arrowResult = simulateArrows(gravityResult.newMaze, arrows);

    // Combine results
    return {
        newMaze: arrowResult.newMaze,
        soundEvents: [...gravityResult.soundEvents, ...arrowResult.soundEvents],
        boulderPositions: arrowResult.boulderPositions,
        arrowPositions: arrowResult.arrowPositions,
        movingBoulders: gravityResult.movingBoulders,
        completedBoulders: gravityResult.completedBoulders,
        playerCollisions: gravityResult.playerCollisions
    };
}

// Pure function to check if physics simulation should continue
export function shouldContinuePhysics(
    previousMaze: MazeCell[][],
    currentMaze: MazeCell[][]
): boolean {
    // Continue if maze has changed (objects are still moving)
    for (let y = 0; y < previousMaze.length; y++) {
        const prevRow = previousMaze[y];
        const currRow = currentMaze[y];

        if (!prevRow || !currRow) continue;

        for (let x = 0; x < prevRow.length; x++) {
            if (prevRow[x] !== currRow[x]) {
                return true;
            }
        }
    }

    return false;
}

// Pure function to check if physics simulation should continue with state
export function shouldContinuePhysicsWithState(
    boulderStateManager: BoulderStateManager
): boolean {
    return boulderStateManager.movingBoulderCount > 0;
}

// Pure function to get all moving boulder positions
export function getMovingBoulderPositions(
    boulderStateManager: BoulderStateManager
): Position[] {
    return Array.from(boulderStateManager.boulders.values())
        .filter(state => state.isMoving)
        .map(state => state.position);
}

// Pure function to get all stationary boulder positions
export function getStationaryBoulderPositions(
    boulderStateManager: BoulderStateManager
): Position[] {
    return Array.from(boulderStateManager.boulders.values())
        .filter(state => !state.isMoving && !state.isTriggered)
        .map(state => state.position);
}

// Pure function to get all triggered but not yet moving boulder positions
export function getTriggeredBoulderPositions(
    boulderStateManager: BoulderStateManager
): Position[] {
    return Array.from(boulderStateManager.boulders.values())
        .filter(state => state.isTriggered && !state.isMoving)
        .map(state => state.position);
}

// Pure function to categorize boulders by their state
export function categorizeBoulders(
    boulderStateManager: BoulderStateManager
): {
    moving: Position[];
    stationary: Position[];
    triggered: Position[];
    total: number;
} {
    const moving = getMovingBoulderPositions(boulderStateManager);
    const stationary = getStationaryBoulderPositions(boulderStateManager);
    const triggered = getTriggeredBoulderPositions(boulderStateManager);

    return {
        moving,
        stationary,
        triggered,
        total: boulderStateManager.boulders.size
    };
}