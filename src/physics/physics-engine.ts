import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';
import {
    simulateBoulderFall,
    simulateEnhancedBoulderFall,
    simulateArrowMovement,
    type Position
} from './collision-detection';
import type { BoulderStateManager } from './boulder-state-manager';
import {
    getTriggeredBouldersForMove
} from './boulder-state-manager';
import {
    validateMazeIntegrity,
    validateBoulderStateManager,
    handlePhysicsError,
    logBoulderError
} from './boulder-error-handling';

// Enhanced physics simulation result
export interface PhysicsSimulationResult {
    newMaze: MazeCell[][];
    soundEvents: SoundEvent[];
    boulderPositions: Position[];
    arrowPositions: Position[];
    movingBoulders: Position[];
    completedBoulders: Position[];
    playerCollisions: Position[];
    positionUpdates: Array<{ from: Position; to: Position }>;
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
        playerCollisions: [],
        positionUpdates: [] // Legacy function doesn't track position updates
    };
}

// Enhanced function to simulate gravity with boulder state management and error handling
export function simulateGravityWithState(
    maze: MazeCell[][],
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number
): PhysicsSimulationResult {
    try {
        // Validate inputs
        const mazeValidation = validateMazeIntegrity(maze);
        if (!mazeValidation.success) {
            logBoulderError(mazeValidation.error!, 'simulateGravityWithState');

            // Return safe fallback result
            const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
            return {
                newMaze: safeMaze,
                soundEvents: [],
                boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
                arrowPositions: [],
                movingBoulders: [],
                completedBoulders: [],
                playerCollisions: [],
                positionUpdates: []
            };
        }

        const managerValidation = validateBoulderStateManager(boulderStateManager, maze);
        if (!managerValidation.success) {
            logBoulderError(managerValidation.error!, 'simulateGravityWithState');

            if (!managerValidation.error?.recoverable) {
                // Return safe fallback result for non-recoverable errors
                const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
                return {
                    newMaze: safeMaze,
                    soundEvents: [],
                    boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
                    arrowPositions: [],
                    movingBoulders: [],
                    completedBoulders: [],
                    playerCollisions: [],
                    positionUpdates: []
                };
            }
        }

        let currentMaze = maze.map(row => [...row]);
        const allSoundEvents: SoundEvent[] = [];
        const movingBoulders: Position[] = [];
        const completedBoulders: Position[] = [];
        const playerCollisions: Position[] = [];
        const positionUpdates: Array<{ from: Position; to: Position }> = [];

        // Get boulders that should start moving this turn
        let triggeredBoulders: Position[] = [];
        try {
            triggeredBoulders = getTriggeredBouldersForMove(boulderStateManager, currentMoveNumber);
        } catch (error) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error getting triggered boulders: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { error, currentMoveNumber },
                recoverable: true
            }, 'simulateGravityWithState');
            triggeredBoulders = []; // Continue with empty array
        }

        // Get all boulders that are currently moving or should start moving
        let currentlyMovingBoulders: Position[] = [];
        try {
            currentlyMovingBoulders = Array.from(boulderStateManager.boulders.values())
                .filter(state => state.isMoving)
                .map(state => state.position);
        } catch (error) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error getting currently moving boulders: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { error },
                recoverable: true
            }, 'simulateGravityWithState');
            currentlyMovingBoulders = []; // Continue with empty array
        }

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
            try {
                // CRITICAL: simulateEnhancedBoulderFall implements continuous falling per Requirement 1.4
                // Each call to this function will make the boulder fall all the way down until collision
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
            } catch (boulderError) {
                logBoulderError({
                    type: 'physics_failure',
                    message: `Error simulating boulder fall at position (${boulder.x},${boulder.y}): ${boulderError instanceof Error ? boulderError.message : 'Unknown error'}`,
                    context: { boulder, error: boulderError },
                    recoverable: true
                }, 'simulateGravityWithState');

                // Mark boulder as completed to prevent infinite processing
                completedBoulders.push(boulder);
                continue;
            }
        }

        let finalBoulderPositions: Position[] = [];
        try {
            finalBoulderPositions = findBoulders(currentMaze);
        } catch (error) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error finding final boulder positions: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { error },
                recoverable: true
            }, 'simulateGravityWithState');
            finalBoulderPositions = []; // Continue with empty array
        }

        return {
            newMaze: currentMaze,
            soundEvents: allSoundEvents,
            boulderPositions: finalBoulderPositions,
            arrowPositions: [], // No arrows in current implementation
            movingBoulders,
            completedBoulders,
            playerCollisions,
            positionUpdates
        };
    } catch (error) {
        logBoulderError({
            type: 'physics_failure',
            message: `Unexpected error in gravity simulation: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, currentMoveNumber },
            recoverable: false
        }, 'simulateGravityWithState');

        // Handle physics error with fallback
        const fallbackResult = handlePhysicsError(error, maze, boulderStateManager);
        if (fallbackResult.success && fallbackResult.data) {
            return {
                newMaze: fallbackResult.data.maze,
                soundEvents: [],
                boulderPositions: findBoulders(fallbackResult.data.maze),
                arrowPositions: [],
                movingBoulders: [],
                completedBoulders: [],
                playerCollisions: [],
                positionUpdates: []
            };
        }

        // Final fallback - return original maze unchanged
        const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
        return {
            newMaze: safeMaze,
            soundEvents: [],
            boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
            arrowPositions: [],
            movingBoulders: [],
            completedBoulders: [],
            playerCollisions: [],
            positionUpdates: []
        };
    }
}

// (removed unused helper findPlayerPosition)

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
        playerCollisions: [],
        positionUpdates: [] // Arrow simulation doesn't track boulder position updates
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
        playerCollisions: [],
        positionUpdates: [] // Legacy function doesn't track position updates
    };
}

// Enhanced function to run physics simulation with boulder state management and error handling
export function simulatePhysicsStepWithState(
    maze: MazeCell[][],
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number,
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }> = []
): PhysicsSimulationResult {
    try {
        // First simulate gravity for boulders with state management
        const gravityResult = simulateGravityWithState(maze, boulderStateManager, currentMoveNumber);

        // Then simulate arrow movement
        let arrowResult: PhysicsSimulationResult;
        try {
            arrowResult = simulateArrows(gravityResult.newMaze, arrows);
        } catch (arrowError) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error simulating arrows: ${arrowError instanceof Error ? arrowError.message : 'Unknown error'}`,
                context: { error: arrowError, arrows },
                recoverable: true
            }, 'simulatePhysicsStepWithState');

            // Continue without arrow simulation
            arrowResult = {
                newMaze: gravityResult.newMaze,
                soundEvents: [],
                boulderPositions: gravityResult.boulderPositions,
                arrowPositions: [],
                movingBoulders: [],
                completedBoulders: [],
                playerCollisions: [],
                positionUpdates: []
            };
        }

        // Combine results
        return {
            newMaze: arrowResult.newMaze,
            soundEvents: [...gravityResult.soundEvents, ...arrowResult.soundEvents],
            boulderPositions: arrowResult.boulderPositions,
            arrowPositions: arrowResult.arrowPositions,
            movingBoulders: gravityResult.movingBoulders,
            completedBoulders: gravityResult.completedBoulders,
            playerCollisions: gravityResult.playerCollisions,
            positionUpdates: gravityResult.positionUpdates
        };
    } catch (error) {
        logBoulderError({
            type: 'physics_failure',
            message: `Unexpected error in physics step simulation: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, currentMoveNumber, arrows },
            recoverable: false
        }, 'simulatePhysicsStepWithState');

        // Return safe fallback result
        const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
        return {
            newMaze: safeMaze,
            soundEvents: [],
            boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
            arrowPositions: [],
            movingBoulders: [],
            completedBoulders: [],
            playerCollisions: [],
            positionUpdates: []
        };
    }
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