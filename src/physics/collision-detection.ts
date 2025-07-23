import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';

// Position interface for collision detection
export interface Position {
    x: number;
    y: number;
}

// Collision result interface
export interface CollisionResult {
    hasCollision: boolean;
    collisionType: 'wall' | 'object' | 'ground' | 'none';
    soundEvent?: SoundEvent;
}

// Pure function to check if a cell is solid (blocks movement)
export function isSolidCell(cell: MazeCell): boolean {
    return cell === CELL.ROCK || cell === CELL.BOULDER;
}

// Pure function to check if a cell can be entered by moving objects
export function isPassableCell(cell: MazeCell): boolean {
    return cell === CELL.EMPTY || cell === CELL.SOIL;
}

// Pure function to detect collision between a moving object and the maze
export function detectCollision(
    maze: MazeCell[][],
    position: Position,
    objectType: 'boulder' | 'arrow'
): CollisionResult {
    // Check bounds
    if (position.y < 0 || position.y >= maze.length ||
        position.x < 0 || position.x >= (maze[position.y]?.length ?? 0)) {
        return {
            hasCollision: true,
            collisionType: 'wall',
            soundEvent: {
                type: 'collision',
                source: objectType,
                priority: 'medium',
                volume: 0.8
            }
        };
    }

    const targetCell = maze[position.y]?.[position.x];
    if (targetCell === undefined) {
        return {
            hasCollision: true,
            collisionType: 'wall',
            soundEvent: {
                type: 'collision',
                source: objectType,
                priority: 'medium',
                volume: 0.8
            }
        };
    }

    // Check for solid objects
    if (isSolidCell(targetCell)) {
        return {
            hasCollision: true,
            collisionType: 'object',
            soundEvent: {
                type: 'collision',
                source: objectType,
                priority: 'high',
                volume: 0.9
            }
        };
    }

    // Check for ground collision (soil)
    if (targetCell === CELL.SOIL) {
        return {
            hasCollision: true,
            collisionType: 'ground',
            soundEvent: {
                type: 'collision',
                source: objectType,
                priority: 'medium',
                volume: 0.7
            }
        };
    }

    // No collision
    return {
        hasCollision: false,
        collisionType: 'none'
    };
}

// Pure function to check if boulder can fall (has empty space below)
export function canBoulderFall(maze: MazeCell[][], position: Position): boolean {
    const belowPosition = { x: position.x, y: position.y + 1 };
    const collision = detectCollision(maze, belowPosition, 'boulder');
    return !collision.hasCollision;
}

// Pure function to simulate boulder falling one step
export function simulateBoulderFall(
    maze: MazeCell[][],
    boulderPosition: Position
): { newMaze: MazeCell[][]; newPosition: Position; soundEvents: SoundEvent[] } {
    const soundEvents: SoundEvent[] = [];

    // Check if boulder can fall
    if (!canBoulderFall(maze, boulderPosition)) {
        return {
            newMaze: maze,
            newPosition: boulderPosition,
            soundEvents
        };
    }

    // Create new maze with boulder moved down
    const newMaze = maze.map(row => [...row]);
    const newPosition = { x: boulderPosition.x, y: boulderPosition.y + 1 };

    // Clear old position
    newMaze[boulderPosition.y]![boulderPosition.x] = CELL.EMPTY;

    // Check collision at new position
    const collision = detectCollision(maze, newPosition, 'boulder');

    if (collision.hasCollision) {
        // Boulder hits something, add collision sound
        if (collision.soundEvent) {
            soundEvents.push(collision.soundEvent);
        }
        // Boulder stays at original position
        return {
            newMaze: maze,
            newPosition: boulderPosition,
            soundEvents
        };
    }

    // Move boulder to new position
    newMaze[newPosition.y]![newPosition.x] = CELL.BOULDER;

    // Add movement sound
    soundEvents.push({
        type: 'movement',
        source: 'boulder',
        priority: 'medium',
        volume: 0.8
    });

    return {
        newMaze,
        newPosition,
        soundEvents
    };
}

// Pure function to simulate arrow movement in a direction
export function simulateArrowMovement(
    maze: MazeCell[][],
    arrowPosition: Position,
    direction: { dx: number; dy: number }
): { newMaze: MazeCell[][]; newPosition: Position | null; soundEvents: SoundEvent[] } {
    const soundEvents: SoundEvent[] = [];
    const newPosition = {
        x: arrowPosition.x + direction.dx,
        y: arrowPosition.y + direction.dy
    };

    // Check collision at new position
    const collision = detectCollision(maze, newPosition, 'arrow');

    if (collision.hasCollision) {
        // Arrow hits something, add collision sound and remove arrow
        if (collision.soundEvent) {
            soundEvents.push(collision.soundEvent);
        }

        // Remove arrow from maze
        const newMaze = maze.map(row => [...row]);
        // Note: Arrows aren't currently represented in the maze, but this is for future extensibility

        return {
            newMaze,
            newPosition: null, // Arrow is destroyed
            soundEvents
        };
    }

    // Arrow moves successfully
    soundEvents.push({
        type: 'movement',
        source: 'arrow',
        priority: 'low',
        volume: 0.7
    });

    return {
        newMaze: maze, // Maze unchanged for arrow movement
        newPosition,
        soundEvents
    };
}