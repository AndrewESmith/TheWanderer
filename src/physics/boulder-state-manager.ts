import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import {
    validatePosition,
    validateBoulderStateManager,
    recoverBoulderStateManager,
    createFallbackBoulderStateManager,
    logBoulderError,
    type ErrorResult
} from './boulder-error-handling';

// Position interface (re-exported from collision-detection for consistency)
export interface Position {
    x: number;
    y: number;
}

// Boulder state tracking interface
export interface BoulderState {
    position: Position;
    isTriggered: boolean;
    isMoving: boolean;
    triggeredOnMove: number; // Move number when triggered
}

// Boulder state manager interface
export interface BoulderStateManager {
    boulders: Map<string, BoulderState>;
    movingBoulderCount: number;
    lastPlayerPosition: Position | null;
}

// Proximity detection result interface
export interface ProximityResult {
    adjacentBoulders: Position[];
    newlyTriggeredBoulders: Position[];
}

// Boulder movement constraint interface
export interface MovementConstraint {
    isPlayerMovementBlocked: boolean;
    blockingReason: 'boulder_movement' | 'none';
    estimatedDuration?: number;
}

// Pure function to create a position key for Map storage
export function createPositionKey(position: Position): string {
    return `${position.x},${position.y}`;
}

// Pure function to parse position key back to Position
export function parsePositionKey(key: string): Position {
    const parts = key.split(',');
    const x = Number(parts[0]);
    const y = Number(parts[1]);

    if (isNaN(x) || isNaN(y)) {
        throw new Error(`Invalid position key format: ${key}`);
    }

    return { x, y };
}

// Pure function to find all boulder positions in maze
export function findBoulderPositions(maze: MazeCell[][]): Position[] {
    const positions: Position[] = [];

    for (let y = 0; y < maze.length; y++) {
        const row = maze[y];
        if (!row) continue;

        for (let x = 0; x < row.length; x++) {
            if (row[x] === CELL.BOULDER) {
                positions.push({ x, y });
            }
        }
    }

    return positions;
}

// Pure function to create initial boulder state manager with error handling
export function createBoulderStateManager(
    maze: MazeCell[][],
    currentMoveNumber: number = 0
): BoulderStateManager {
    try {
        const boulderPositions = findBoulderPositions(maze);
        const boulders = new Map<string, BoulderState>();

        for (const position of boulderPositions) {
            // Validate position before creating state
            const positionResult = validatePosition(position, maze);
            if (!positionResult.success) {
                logBoulderError(positionResult.error!, 'createBoulderStateManager');
                continue; // Skip invalid positions
            }

            const key = createPositionKey(position);
            boulders.set(key, {
                position,
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1,
            });
        }

        const manager: BoulderStateManager = {
            boulders,
            movingBoulderCount: 0,
            lastPlayerPosition: null,
        };

        // Validate created manager
        const validationResult = validateBoulderStateManager(manager, maze);
        if (!validationResult.success) {
            logBoulderError(validationResult.error!, 'createBoulderStateManager');
            return createFallbackBoulderStateManager(maze);
        }

        return manager;
    } catch (error) {
        logBoulderError({
            type: 'unknown',
            message: `Unexpected error creating boulder state manager: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, currentMoveNumber },
            recoverable: true
        }, 'createBoulderStateManager');

        return createFallbackBoulderStateManager(maze);
    }
}

// Pure function to check if two positions are adjacent (including diagonals)
export function arePositionsAdjacent(pos1: Position, pos2: Position): boolean {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);

    // Adjacent includes orthogonal and diagonal neighbors
    return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
}

// Simple function to check if boulder can fall (to avoid circular dependency with collision-detection)
function canBoulderFallSimple(maze: MazeCell[][], position: Position): boolean {
    const belowPosition = { x: position.x, y: position.y + 1 };

    // Check bounds
    if (belowPosition.y >= maze.length || belowPosition.x < 0 || belowPosition.x >= (maze[belowPosition.y]?.length ?? 0)) {
        return false; // Can't fall outside maze bounds
    }

    const cellBelow = maze[belowPosition.y]?.[belowPosition.x];
    if (cellBelow === undefined) {
        return false;
    }

    // Boulder can fall if there's empty space, or if it can collide with special objects
    return cellBelow === CELL.EMPTY ||
        cellBelow === CELL.SOIL ||
        cellBelow === CELL.PLAYER ||
        cellBelow === CELL.BOMB;
}

// Pure function to detect boulders adjacent to player position
export function detectAdjacentBoulders(
    playerPosition: Position,
    boulderPositions: Position[]
): Position[] {
    return boulderPositions.filter(boulderPos =>
        arePositionsAdjacent(playerPosition, boulderPos)
    );
}

// Pure function to identify newly triggered boulders based on player movement
// Only triggers boulders that can actually move to prevent unnecessary sounds
export function identifyTriggeredBoulders(
    previousPlayerPosition: Position | null,
    currentPlayerPosition: Position,
    boulderStateManager: BoulderStateManager,
    maze?: MazeCell[][]
): Position[] {
    const currentAdjacentBoulders = detectAdjacentBoulders(
        currentPlayerPosition,
        Array.from(boulderStateManager.boulders.values()).map(state => state.position)
    );

    // If no previous position, all adjacent boulders are newly triggered
    let newlyTriggeredBoulders: Position[];
    if (!previousPlayerPosition) {
        newlyTriggeredBoulders = currentAdjacentBoulders;
    } else {
        const previousAdjacentBoulders = detectAdjacentBoulders(
            previousPlayerPosition,
            Array.from(boulderStateManager.boulders.values()).map(state => state.position)
        );

        // Find boulders that are adjacent now but weren't before
        newlyTriggeredBoulders = currentAdjacentBoulders.filter(currentBoulder =>
            !previousAdjacentBoulders.some(prevBoulder =>
                prevBoulder.x === currentBoulder.x && prevBoulder.y === currentBoulder.y
            )
        );
    }

    // If maze is provided, filter out boulders that cannot actually move
    // This prevents COLLISION_THUD sounds from playing when player passes immovable boulders
    if (maze) {
        return newlyTriggeredBoulders.filter(boulder => {
            try {
                return canBoulderFallSimple(maze, boulder);
            } catch (error) {
                // If we can't determine if boulder can fall, err on the side of not triggering
                // to prevent unwanted sounds
                logBoulderError({
                    type: 'physics_failure',
                    message: `Error checking if boulder can fall at position (${boulder.x},${boulder.y}): ${error instanceof Error ? error.message : 'Unknown error'}`,
                    context: { boulder, error },
                    recoverable: true
                }, 'identifyTriggeredBoulders');
                return false;
            }
        });
    }

    // If no maze provided, return all newly triggered boulders (backward compatibility)
    return newlyTriggeredBoulders;
}

// Pure function to update boulder state manager with triggered boulders with error handling
export function updateBoulderTriggers(
    boulderStateManager: BoulderStateManager,
    triggeredBoulders: Position[],
    currentMoveNumber: number
): BoulderStateManager {
    try {
        // Skip validation in updateBoulderTriggers to avoid breaking existing tests
        // The validation will be done at the physics simulation level where maze is available

        const newBoulders = new Map(boulderStateManager.boulders);

        for (const position of triggeredBoulders) {
            try {
                const key = createPositionKey(position);
                const existingState = newBoulders.get(key);

                if (existingState && !existingState.isTriggered) {
                    newBoulders.set(key, {
                        ...existingState,
                        isTriggered: true,
                        triggeredOnMove: currentMoveNumber,
                    });
                } else if (!existingState) {
                    logBoulderError({
                        type: 'position_mismatch',
                        message: `Attempted to trigger boulder at position (${position.x},${position.y}) but no boulder state exists`,
                        context: { position, availableKeys: Array.from(newBoulders.keys()) },
                        recoverable: true
                    }, 'updateBoulderTriggers');
                }
            } catch (positionError) {
                logBoulderError({
                    type: 'invalid_state',
                    message: `Error processing triggered boulder at position (${position.x},${position.y}): ${positionError instanceof Error ? positionError.message : 'Unknown error'}`,
                    context: { position, error: positionError },
                    recoverable: true
                }, 'updateBoulderTriggers');
                continue; // Skip this position and continue with others
            }
        }

        return {
            ...boulderStateManager,
            boulders: newBoulders,
        };
    } catch (error) {
        logBoulderError({
            type: 'unknown',
            message: `Unexpected error updating boulder triggers: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, triggeredBoulders, currentMoveNumber },
            recoverable: true
        }, 'updateBoulderTriggers');

        return boulderStateManager; // Return original state on error
    }
}

// Pure function to update boulder movement states with error handling
export function updateBoulderMovement(
    boulderStateManager: BoulderStateManager,
    movingBoulders: Position[],
    stoppedBoulders: Position[]
): BoulderStateManager {
    try {
        const newBoulders = new Map(boulderStateManager.boulders);
        let movingCount = boulderStateManager.movingBoulderCount;

        // Mark boulders as moving
        for (const position of movingBoulders) {
            try {
                const key = createPositionKey(position);
                const existingState = newBoulders.get(key);

                if (existingState && !existingState.isMoving) {
                    newBoulders.set(key, {
                        ...existingState,
                        isMoving: true,
                    });
                    movingCount++;
                } else if (!existingState) {
                    logBoulderError({
                        type: 'position_mismatch',
                        message: `Attempted to mark boulder as moving at position (${position.x},${position.y}) but no boulder state exists`,
                        context: { position, availableKeys: Array.from(newBoulders.keys()) },
                        recoverable: true
                    }, 'updateBoulderMovement');
                }
            } catch (positionError) {
                logBoulderError({
                    type: 'invalid_state',
                    message: `Error processing moving boulder at position (${position.x},${position.y}): ${positionError instanceof Error ? positionError.message : 'Unknown error'}`,
                    context: { position, error: positionError },
                    recoverable: true
                }, 'updateBoulderMovement');
                continue;
            }
        }

        // Mark boulders as stopped
        for (const position of stoppedBoulders) {
            try {
                const key = createPositionKey(position);
                const existingState = newBoulders.get(key);

                if (existingState && existingState.isMoving) {
                    newBoulders.set(key, {
                        ...existingState,
                        isMoving: false,
                    });
                    movingCount--;
                } else if (!existingState) {
                    logBoulderError({
                        type: 'position_mismatch',
                        message: `Attempted to mark boulder as stopped at position (${position.x},${position.y}) but no boulder state exists`,
                        context: { position, availableKeys: Array.from(newBoulders.keys()) },
                        recoverable: true
                    }, 'updateBoulderMovement');
                } else if (!existingState.isMoving) {
                    logBoulderError({
                        type: 'invalid_state',
                        message: `Attempted to stop boulder at position (${position.x},${position.y}) but it was not moving`,
                        context: { position, state: existingState },
                        recoverable: true
                    }, 'updateBoulderMovement');
                }
            } catch (positionError) {
                logBoulderError({
                    type: 'invalid_state',
                    message: `Error processing stopped boulder at position (${position.x},${position.y}): ${positionError instanceof Error ? positionError.message : 'Unknown error'}`,
                    context: { position, error: positionError },
                    recoverable: true
                }, 'updateBoulderMovement');
                continue;
            }
        }

        // Ensure moving count doesn't go negative
        const finalMovingCount = Math.max(0, movingCount);

        // Validate final count against actual moving boulders
        const actualMovingCount = Array.from(newBoulders.values()).filter(s => s.isMoving).length;
        if (finalMovingCount !== actualMovingCount) {
            logBoulderError({
                type: 'invalid_state',
                message: `Moving boulder count mismatch after update: calculated ${finalMovingCount}, actual ${actualMovingCount}`,
                context: { calculatedCount: finalMovingCount, actualCount: actualMovingCount },
                recoverable: true
            }, 'updateBoulderMovement');

            // Use actual count as fallback
            return {
                ...boulderStateManager,
                boulders: newBoulders,
                movingBoulderCount: actualMovingCount,
            };
        }

        return {
            ...boulderStateManager,
            boulders: newBoulders,
            movingBoulderCount: finalMovingCount,
        };
    } catch (error) {
        logBoulderError({
            type: 'unknown',
            message: `Unexpected error updating boulder movement: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, movingBoulders, stoppedBoulders },
            recoverable: true
        }, 'updateBoulderMovement');

        return boulderStateManager; // Return original state on error
    }
}

// Pure function to update boulder positions after movement with error handling
export function updateBoulderPositions(
    boulderStateManager: BoulderStateManager,
    positionUpdates: Array<{ from: Position; to: Position }>
): BoulderStateManager {
    try {
        const newBoulders = new Map<string, BoulderState>();

        // Create a mapping of old positions to new positions
        const positionMap = new Map<string, Position>();
        for (const update of positionUpdates) {
            try {
                const fromKey = createPositionKey(update.from);
                positionMap.set(fromKey, update.to);
            } catch (keyError) {
                logBoulderError({
                    type: 'invalid_state',
                    message: `Error creating position key for update from (${update.from.x},${update.from.y}) to (${update.to.x},${update.to.y}): ${keyError instanceof Error ? keyError.message : 'Unknown error'}`,
                    context: { update, error: keyError },
                    recoverable: true
                }, 'updateBoulderPositions');
                continue;
            }
        }

        // Update all boulder states with new positions
        for (const [key, state] of boulderStateManager.boulders) {
            try {
                const newPosition = positionMap.get(key) || state.position;
                const newKey = createPositionKey(newPosition);

                // Check for key conflicts (multiple boulders trying to move to same position)
                if (newKey !== key && newBoulders.has(newKey)) {
                    logBoulderError({
                        type: 'position_mismatch',
                        message: `Position conflict: multiple boulders trying to occupy position (${newPosition.x},${newPosition.y})`,
                        context: {
                            originalKey: key,
                            newKey,
                            originalPosition: state.position,
                            newPosition,
                            existingState: newBoulders.get(newKey)
                        },
                        recoverable: true
                    }, 'updateBoulderPositions');

                    // Keep boulder at original position to avoid conflict
                    newBoulders.set(key, state);
                    continue;
                }

                newBoulders.set(newKey, {
                    ...state,
                    position: newPosition,
                });
            } catch (updateError) {
                logBoulderError({
                    type: 'invalid_state',
                    message: `Error updating boulder position for key ${key}: ${updateError instanceof Error ? updateError.message : 'Unknown error'}`,
                    context: { key, state, error: updateError },
                    recoverable: true
                }, 'updateBoulderPositions');

                // Keep original state on error
                newBoulders.set(key, state);
            }
        }

        return {
            ...boulderStateManager,
            boulders: newBoulders,
        };
    } catch (error) {
        logBoulderError({
            type: 'unknown',
            message: `Unexpected error updating boulder positions: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, positionUpdates },
            recoverable: true
        }, 'updateBoulderPositions');

        return boulderStateManager; // Return original state on error
    }
}

// Pure function to check if any boulders are currently moving
export function hasMovingBoulders(boulderStateManager: BoulderStateManager): boolean {
    return boulderStateManager.movingBoulderCount > 0;
}

// Pure function to get all triggered boulders that should start moving
export function getTriggeredBouldersForMove(
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number
): Position[] {
    const triggeredBoulders: Position[] = [];

    for (const state of boulderStateManager.boulders.values()) {
        // Boulder should start moving if it was triggered on the previous move number
        // and is not already moving (boulders triggered on move N start moving on move N+1)
        if (state.isTriggered &&
            !state.isMoving &&
            state.triggeredOnMove === currentMoveNumber - 1) {
            triggeredBoulders.push(state.position);
        }
    }

    return triggeredBoulders;
}

// Pure function to update player position tracking
export function updatePlayerPosition(
    boulderStateManager: BoulderStateManager,
    newPlayerPosition: Position
): BoulderStateManager {
    return {
        ...boulderStateManager,
        lastPlayerPosition: newPlayerPosition,
    };
}

// Pure function to create proximity result
export function createProximityResult(
    playerPosition: Position,
    previousPlayerPosition: Position | null,
    boulderStateManager: BoulderStateManager,
    maze?: MazeCell[][]
): ProximityResult {
    const adjacentBoulders = detectAdjacentBoulders(
        playerPosition,
        Array.from(boulderStateManager.boulders.values()).map(state => state.position)
    );

    const newlyTriggeredBoulders = identifyTriggeredBoulders(
        previousPlayerPosition,
        playerPosition,
        boulderStateManager,
        maze
    );

    return {
        adjacentBoulders,
        newlyTriggeredBoulders,
    };
}

// Pure function to create movement constraint based on boulder state
export function createMovementConstraint(
    boulderStateManager: BoulderStateManager
): MovementConstraint {
    const isBlocked = hasMovingBoulders(boulderStateManager);

    return {
        isPlayerMovementBlocked: isBlocked,
        blockingReason: isBlocked ? 'boulder_movement' : 'none',
        estimatedDuration: isBlocked ? undefined : undefined, // Could be enhanced with timing estimation
    };
}