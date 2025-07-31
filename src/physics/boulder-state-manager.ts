import type { MazeCell } from '../maze';
import { CELL } from '../maze';

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
    const [x, y] = key.split(',').map(Number);
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

// Pure function to create initial boulder state manager
export function createBoulderStateManager(
    maze: MazeCell[][],
    currentMoveNumber: number = 0
): BoulderStateManager {
    const boulderPositions = findBoulderPositions(maze);
    const boulders = new Map<string, BoulderState>();

    for (const position of boulderPositions) {
        const key = createPositionKey(position);
        boulders.set(key, {
            position,
            isTriggered: false,
            isMoving: false,
            triggeredOnMove: -1,
        });
    }

    return {
        boulders,
        movingBoulderCount: 0,
        lastPlayerPosition: null,
    };
}

// Pure function to check if two positions are adjacent (including diagonals)
export function arePositionsAdjacent(pos1: Position, pos2: Position): boolean {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);

    // Adjacent includes orthogonal and diagonal neighbors
    return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
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
export function identifyTriggeredBoulders(
    previousPlayerPosition: Position | null,
    currentPlayerPosition: Position,
    boulderStateManager: BoulderStateManager
): Position[] {
    const currentAdjacentBoulders = detectAdjacentBoulders(
        currentPlayerPosition,
        Array.from(boulderStateManager.boulders.values()).map(state => state.position)
    );

    // If no previous position, all adjacent boulders are newly triggered
    if (!previousPlayerPosition) {
        return currentAdjacentBoulders;
    }

    const previousAdjacentBoulders = detectAdjacentBoulders(
        previousPlayerPosition,
        Array.from(boulderStateManager.boulders.values()).map(state => state.position)
    );

    // Find boulders that are adjacent now but weren't before
    return currentAdjacentBoulders.filter(currentBoulder =>
        !previousAdjacentBoulders.some(prevBoulder =>
            prevBoulder.x === currentBoulder.x && prevBoulder.y === currentBoulder.y
        )
    );
}

// Pure function to update boulder state manager with triggered boulders
export function updateBoulderTriggers(
    boulderStateManager: BoulderStateManager,
    triggeredBoulders: Position[],
    currentMoveNumber: number
): BoulderStateManager {
    const newBoulders = new Map(boulderStateManager.boulders);

    for (const position of triggeredBoulders) {
        const key = createPositionKey(position);
        const existingState = newBoulders.get(key);

        if (existingState && !existingState.isTriggered) {
            newBoulders.set(key, {
                ...existingState,
                isTriggered: true,
                triggeredOnMove: currentMoveNumber,
            });
        }
    }

    return {
        ...boulderStateManager,
        boulders: newBoulders,
    };
}

// Pure function to update boulder movement states
export function updateBoulderMovement(
    boulderStateManager: BoulderStateManager,
    movingBoulders: Position[],
    stoppedBoulders: Position[]
): BoulderStateManager {
    const newBoulders = new Map(boulderStateManager.boulders);
    let movingCount = boulderStateManager.movingBoulderCount;

    // Mark boulders as moving
    for (const position of movingBoulders) {
        const key = createPositionKey(position);
        const existingState = newBoulders.get(key);

        if (existingState && !existingState.isMoving) {
            newBoulders.set(key, {
                ...existingState,
                isMoving: true,
            });
            movingCount++;
        }
    }

    // Mark boulders as stopped
    for (const position of stoppedBoulders) {
        const key = createPositionKey(position);
        const existingState = newBoulders.get(key);

        if (existingState && existingState.isMoving) {
            newBoulders.set(key, {
                ...existingState,
                isMoving: false,
            });
            movingCount--;
        }
    }

    return {
        ...boulderStateManager,
        boulders: newBoulders,
        movingBoulderCount: Math.max(0, movingCount),
    };
}

// Pure function to update boulder positions after movement
export function updateBoulderPositions(
    boulderStateManager: BoulderStateManager,
    positionUpdates: Array<{ from: Position; to: Position }>
): BoulderStateManager {
    const newBoulders = new Map<string, BoulderState>();

    // Create a mapping of old positions to new positions
    const positionMap = new Map<string, Position>();
    for (const update of positionUpdates) {
        const fromKey = createPositionKey(update.from);
        positionMap.set(fromKey, update.to);
    }

    // Update all boulder states with new positions
    for (const [key, state] of boulderStateManager.boulders) {
        const newPosition = positionMap.get(key) || state.position;
        const newKey = createPositionKey(newPosition);

        newBoulders.set(newKey, {
            ...state,
            position: newPosition,
        });
    }

    return {
        ...boulderStateManager,
        boulders: newBoulders,
    };
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
        // Boulder should start moving if it was triggered on the previous move
        // and is not already moving
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
    boulderStateManager: BoulderStateManager
): ProximityResult {
    const adjacentBoulders = detectAdjacentBoulders(
        playerPosition,
        Array.from(boulderStateManager.boulders.values()).map(state => state.position)
    );

    const newlyTriggeredBoulders = identifyTriggeredBoulders(
        previousPlayerPosition,
        playerPosition,
        boulderStateManager
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