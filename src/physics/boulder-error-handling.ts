import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { Position, BoulderState, BoulderStateManager } from './boulder-state-manager';
import { createPositionKey, findBoulderPositions } from './boulder-state-manager';

// Error types for boulder system
export interface BoulderSystemError {
    type: 'invalid_state' | 'physics_failure' | 'position_mismatch' | 'constraint_error' | 'unknown';
    message: string;
    context?: Record<string, unknown>;
    recoverable: boolean;
}

// Error result wrapper
export interface ErrorResult<T> {
    success: boolean;
    data?: T;
    error?: BoulderSystemError;
}

// Pure function to create error result
export function createErrorResult<T>(error: BoulderSystemError): ErrorResult<T> {
    return {
        success: false,
        error
    };
}

// Pure function to create success result
export function createSuccessResult<T>(data: T): ErrorResult<T> {
    return {
        success: true,
        data
    };
}

// Pure function to validate position bounds
export function validatePosition(position: Position, maze: MazeCell[][]): ErrorResult<Position> {
    if (!maze || maze.length === 0) {
        return createErrorResult({
            type: 'invalid_state',
            message: 'Maze is empty or undefined',
            context: { position },
            recoverable: false
        });
    }

    if (position.y < 0 || position.y >= maze.length) {
        return createErrorResult({
            type: 'invalid_state',
            message: `Position Y coordinate ${position.y} is out of bounds (0-${maze.length - 1})`,
            context: { position, mazeHeight: maze.length },
            recoverable: true
        });
    }

    const row = maze[position.y];
    if (!row || position.x < 0 || position.x >= row.length) {
        return createErrorResult({
            type: 'invalid_state',
            message: `Position X coordinate ${position.x} is out of bounds for row ${position.y}`,
            context: { position, rowLength: row?.length || 0 },
            recoverable: true
        });
    }

    return createSuccessResult(position);
}

// Pure function to validate boulder state consistency
export function validateBoulderState(
    state: BoulderState,
    maze: MazeCell[][]
): ErrorResult<BoulderState> {
    // Validate position bounds
    const positionResult = validatePosition(state.position, maze);
    if (!positionResult.success) {
        return createErrorResult({
            type: 'invalid_state',
            message: `Boulder state has invalid position: ${positionResult.error?.message}`,
            context: { state, originalError: positionResult.error },
            recoverable: positionResult.error?.recoverable || false
        });
    }

    // Validate position contains boulder in maze
    const cell = maze[state.position.y]?.[state.position.x];
    if (cell !== CELL.BOULDER) {
        return createErrorResult({
            type: 'position_mismatch',
            message: `Boulder state position (${state.position.x},${state.position.y}) does not contain boulder in maze (found: ${cell})`,
            context: { state, actualCell: cell },
            recoverable: true
        });
    }

    // Validate state logic consistency
    if (state.isMoving && !state.isTriggered) {
        return createErrorResult({
            type: 'invalid_state',
            message: 'Boulder cannot be moving without being triggered first',
            context: { state },
            recoverable: true
        });
    }

    if (state.triggeredOnMove < -1) {
        return createErrorResult({
            type: 'invalid_state',
            message: `Invalid triggeredOnMove value: ${state.triggeredOnMove}`,
            context: { state },
            recoverable: true
        });
    }

    return createSuccessResult(state);
}

// Pure function to validate boulder state manager consistency
export function validateBoulderStateManager(
    manager: BoulderStateManager,
    maze: MazeCell[][]
): ErrorResult<BoulderStateManager> {
    if (!manager) {
        return createErrorResult({
            type: 'invalid_state',
            message: 'Boulder state manager is null or undefined',
            recoverable: false
        });
    }

    if (!manager.boulders) {
        return createErrorResult({
            type: 'invalid_state',
            message: 'Boulder state manager boulders map is null or undefined',
            recoverable: false
        });
    }

    // Validate each boulder state
    for (const [key, state] of manager.boulders) {
        const stateResult = validateBoulderState(state, maze);
        if (!stateResult.success) {
            return createErrorResult({
                type: 'invalid_state',
                message: `Invalid boulder state for key ${key}: ${stateResult.error?.message}`,
                context: { key, state, originalError: stateResult.error },
                recoverable: stateResult.error?.recoverable || false
            });
        }

        // Validate key matches position
        const expectedKey = createPositionKey(state.position);
        if (key !== expectedKey) {
            return createErrorResult({
                type: 'invalid_state',
                message: `Boulder state key ${key} does not match position key ${expectedKey}`,
                context: { key, expectedKey, state },
                recoverable: true
            });
        }
    }

    // Validate moving boulder count
    const actualMovingCount = Array.from(manager.boulders.values())
        .filter(state => state.isMoving).length;

    if (manager.movingBoulderCount !== actualMovingCount) {
        return createErrorResult({
            type: 'invalid_state',
            message: `Moving boulder count mismatch: manager reports ${manager.movingBoulderCount}, actual count is ${actualMovingCount}`,
            context: {
                reportedCount: manager.movingBoulderCount,
                actualCount: actualMovingCount,
                movingBoulders: Array.from(manager.boulders.values()).filter(s => s.isMoving)
            },
            recoverable: true
        });
    }

    // Validate all boulders in maze are tracked
    const mazeBouldersPositions = findBoulderPositions(maze);
    const trackedPositions = Array.from(manager.boulders.values()).map(s => s.position);

    for (const mazePos of mazeBouldersPositions) {
        const isTracked = trackedPositions.some(
            tracked => tracked.x === mazePos.x && tracked.y === mazePos.y
        );
        if (!isTracked) {
            return createErrorResult({
                type: 'position_mismatch',
                message: `Boulder at position (${mazePos.x},${mazePos.y}) exists in maze but is not tracked in state manager`,
                context: { mazePos, trackedPositions },
                recoverable: true
            });
        }
    }

    return createSuccessResult(manager);
}

// Pure function to attempt boulder state recovery
export function recoverBoulderState(
    invalidState: BoulderState,
    maze: MazeCell[][]
): ErrorResult<BoulderState> {
    try {
        if (!maze || maze.length === 0) {
            return createErrorResult({
                type: 'invalid_state',
                message: 'Cannot recover boulder state with empty maze',
                context: { originalState: invalidState },
                recoverable: false
            });
        }

        // Find a valid boulder position in the maze to use as recovery position
        const boulderPositions = findBoulderPositions(maze);

        if (boulderPositions.length === 0) {
            return createErrorResult({
                type: 'invalid_state',
                message: 'Cannot recover boulder state - no boulders found in maze',
                context: { originalState: invalidState },
                recoverable: false
            });
        }

        // Use the first available boulder position as recovery position
        const recoveryPosition = boulderPositions[0]!; // Safe because we checked length > 0

        // Create recovered state with safe defaults
        const recoveredState: BoulderState = {
            position: recoveryPosition,
            isTriggered: false, // Reset to safe state
            isMoving: false,    // Reset to safe state
            triggeredOnMove: -1 // Reset to safe state
        };

        // Validate recovered state
        const validationResult = validateBoulderState(recoveredState, maze);
        if (validationResult.success) {
            return createSuccessResult(recoveredState);
        }

        return createErrorResult({
            type: 'invalid_state',
            message: 'Could not recover boulder state - validation failed after recovery attempt',
            context: { originalState: invalidState, recoveredState, validationError: validationResult.error },
            recoverable: false
        });
    } catch (error) {
        return createErrorResult({
            type: 'unknown',
            message: `Unexpected error during boulder state recovery: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { originalState: invalidState, error },
            recoverable: false
        });
    }
}

// Pure function to attempt boulder state manager recovery
export function recoverBoulderStateManager(
    invalidManager: BoulderStateManager,
    maze: MazeCell[][]
): ErrorResult<BoulderStateManager> {
    try {
        // Find all boulders in the maze
        const mazeBouldersPositions = findBoulderPositions(maze);
        const recoveredBoulders = new Map<string, BoulderState>();

        // Create safe boulder states for all boulders in maze
        for (const position of mazeBouldersPositions) {
            const key = createPositionKey(position);
            const safeState: BoulderState = {
                position,
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1
            };
            recoveredBoulders.set(key, safeState);
        }

        const recoveredManager: BoulderStateManager = {
            boulders: recoveredBoulders,
            movingBoulderCount: 0, // Reset to safe state
            lastPlayerPosition: null // Reset to safe state
        };

        // Validate recovered manager
        const validationResult = validateBoulderStateManager(recoveredManager, maze);
        if (validationResult.success) {
            return createSuccessResult(recoveredManager);
        }

        return createErrorResult({
            type: 'invalid_state',
            message: 'Could not recover boulder state manager - validation failed after recovery attempt',
            context: { originalManager: invalidManager, recoveredManager, validationError: validationResult.error },
            recoverable: false
        });
    } catch (error) {
        return createErrorResult({
            type: 'unknown',
            message: `Unexpected error during boulder state manager recovery: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { originalManager: invalidManager, error },
            recoverable: false
        });
    }
}

// Pure function to create fallback boulder state manager
export function createFallbackBoulderStateManager(maze: MazeCell[][]): BoulderStateManager {
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

// Pure function to handle physics simulation errors
export function handlePhysicsError(
    error: unknown,
    maze: MazeCell[][],
    _boulderStateManager: BoulderStateManager
): ErrorResult<{ maze: MazeCell[][]; manager: BoulderStateManager }> {
    try {
        // Create safe fallback state
        const fallbackMaze = maze.map(row => [...row]); // Deep copy to prevent mutations
        const fallbackManager = createFallbackBoulderStateManager(fallbackMaze);

        return createSuccessResult({
            maze: fallbackMaze,
            manager: fallbackManager
        });
    } catch (fallbackError) {
        return createErrorResult({
            type: 'physics_failure',
            message: `Physics simulation failed and fallback creation also failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { originalError: error, fallbackError },
            recoverable: false
        });
    }
}

// Pure function to validate maze integrity
export function validateMazeIntegrity(maze: MazeCell[][]): ErrorResult<MazeCell[][]> {
    if (!maze || maze.length === 0) {
        return createErrorResult({
            type: 'invalid_state',
            message: 'Maze is empty or undefined',
            recoverable: false
        });
    }

    // Check for consistent row lengths
    const firstRowLength = maze[0]?.length || 0;
    for (let y = 0; y < maze.length; y++) {
        const row = maze[y];
        if (!row) {
            return createErrorResult({
                type: 'invalid_state',
                message: `Maze row ${y} is null or undefined`,
                context: { rowIndex: y },
                recoverable: false
            });
        }

        if (row.length !== firstRowLength) {
            return createErrorResult({
                type: 'invalid_state',
                message: `Maze row ${y} has inconsistent length: expected ${firstRowLength}, got ${row.length}`,
                context: { rowIndex: y, expectedLength: firstRowLength, actualLength: row.length },
                recoverable: false
            });
        }
    }

    return createSuccessResult(maze);
}

// Pure function to log error for debugging
export function logBoulderError(error: BoulderSystemError, context?: string): void {
    const prefix = context ? `[Boulder System - ${context}]` : '[Boulder System]';
    console.error(`${prefix} ${error.type.toUpperCase()}: ${error.message}`);

    if (error.context) {
        console.error(`${prefix} Context:`, error.context);
    }

    console.error(`${prefix} Recoverable: ${error.recoverable}`);
}