import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';
import {
    simulateBoulderFall,
    simulateArrowMovement,
    type Position
} from './collision-detection';

// Physics simulation result
export interface PhysicsSimulationResult {
    newMaze: MazeCell[][];
    soundEvents: SoundEvent[];
    boulderPositions: Position[];
    arrowPositions: Position[];
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

// Pure function to simulate gravity for all boulders
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
        allSoundEvents.push(...result.soundEvents);
    }

    return {
        newMaze: currentMaze,
        soundEvents: allSoundEvents,
        boulderPositions: newBoulderPositions,
        arrowPositions: [] // No arrows in current implementation
    };
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
        arrowPositions: newArrowPositions
    };
}

// Pure function to run a complete physics simulation step
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
        arrowPositions: arrowResult.arrowPositions
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