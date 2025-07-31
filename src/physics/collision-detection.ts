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

// Enhanced collision result interface for boulder-specific interactions
export interface BoulderCollisionResult extends CollisionResult {
    targetCell?: MazeCell;
    isPlayerCollision: boolean;
    shouldTriggerBombExplosion: boolean;
    shouldStopBoulder: boolean;
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

// Enhanced function to detect boulder collision with all game objects
export function detectBoulderCollision(
    maze: MazeCell[][],
    position: Position
): BoulderCollisionResult {
    // Check bounds
    if (position.y < 0 || position.y >= maze.length ||
        position.x < 0 || position.x >= (maze[position.y]?.length ?? 0)) {
        return {
            hasCollision: true,
            collisionType: 'wall',
            targetCell: undefined,
            isPlayerCollision: false,
            shouldTriggerBombExplosion: false,
            shouldStopBoulder: true,
            soundEvent: {
                type: 'collision',
                source: 'boulder',
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
            targetCell: undefined,
            isPlayerCollision: false,
            shouldTriggerBombExplosion: false,
            shouldStopBoulder: true,
            soundEvent: {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            }
        };
    }

    // Handle specific collision types based on target cell
    switch (targetCell) {
        case CELL.EMPTY:
            // No collision with empty space
            return {
                hasCollision: false,
                collisionType: 'none',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: false
            };

        case CELL.ROCK:
        case CELL.BOULDER:
            // Solid objects - boulder stops and makes collision sound
            return {
                hasCollision: true,
                collisionType: 'object',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: true,
                soundEvent: {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'high',
                    volume: 0.9
                }
            };

        case CELL.SOIL:
            // Boulder stops on soil with ground collision sound
            return {
                hasCollision: true,
                collisionType: 'ground',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: true,
                soundEvent: {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'medium',
                    volume: 0.9
                }
            };

        case CELL.DIAMOND:
            // Boulder stops on diamond with collision sound
            return {
                hasCollision: true,
                collisionType: 'object',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: true,
                soundEvent: {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'medium',
                    volume: 0.8
                }
            };

        case CELL.BOMB:
            // Boulder hits bomb and triggers explosion, boulder stops at bomb position
            return {
                hasCollision: true,
                collisionType: 'object',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: true,
                shouldStopBoulder: true, // Boulder stops at bomb position
                soundEvent: {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'high',
                    volume: 0.9
                }
            };

        case CELL.PLAYER:
            // Boulder hits player - causes death, boulder stops at player position
            return {
                hasCollision: true,
                collisionType: 'object',
                targetCell,
                isPlayerCollision: true,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: true, // Boulder stops at player position
                soundEvent: {
                    type: 'death',
                    source: 'boulder',
                    priority: 'high',
                    volume: 1.0
                }
            };

        case CELL.EXIT:
            // Boulder stops at exit
            return {
                hasCollision: true,
                collisionType: 'object',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: true,
                soundEvent: {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'medium',
                    volume: 0.8
                }
            };

        default:
            // Unknown cell type - treat as solid object
            return {
                hasCollision: true,
                collisionType: 'object',
                targetCell,
                isPlayerCollision: false,
                shouldTriggerBombExplosion: false,
                shouldStopBoulder: true,
                soundEvent: {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'medium',
                    volume: 0.8
                }
            };
    }
}

// Pure function to check if boulder can fall (has empty space below)
export function canBoulderFall(maze: MazeCell[][], position: Position): boolean {
    const belowPosition = { x: position.x, y: position.y + 1 };
    const collision = detectBoulderCollision(maze, belowPosition);

    // Boulder can fall if there's no collision, OR if it's a special collision
    // that allows the boulder to move (player death, bomb explosion)
    return !collision.hasCollision ||
        collision.isPlayerCollision ||
        collision.shouldTriggerBombExplosion;
}

// Enhanced boulder fall simulation result
export interface BoulderFallResult {
    newMaze: MazeCell[][];
    newPosition: Position;
    soundEvents: SoundEvent[];
    playerCollision: boolean;
    bombExplosion: boolean;
    targetCell?: MazeCell;
}

// Pure function to simulate boulder falling one step with enhanced collision detection
export function simulateBoulderFall(
    maze: MazeCell[][],
    boulderPosition: Position
): { newMaze: MazeCell[][]; newPosition: Position; soundEvents: SoundEvent[] } {
    const result = simulateEnhancedBoulderFall(maze, boulderPosition);
    return {
        newMaze: result.newMaze,
        newPosition: result.newPosition,
        soundEvents: result.soundEvents
    };
}

// Enhanced function to simulate boulder falling with detailed collision information
export function simulateEnhancedBoulderFall(
    maze: MazeCell[][],
    boulderPosition: Position
): BoulderFallResult {
    const soundEvents: SoundEvent[] = [];



    // Check if boulder can fall
    if (!canBoulderFall(maze, boulderPosition)) {
        // Boulder can't fall, but check if it would collide with something below
        // This handles the case where a moving boulder encounters a solid obstacle
        const belowPosition = { x: boulderPosition.x, y: boulderPosition.y + 1 };
        const collision = detectBoulderCollision(maze, belowPosition);

        if (collision.hasCollision && collision.soundEvent) {
            soundEvents.push(collision.soundEvent);
        }

        return {
            newMaze: maze,
            newPosition: boulderPosition,
            soundEvents,
            playerCollision: false,
            bombExplosion: false
        };
    }

    // Create new maze with boulder moved down
    const newMaze = maze.map(row => [...row]);
    const newPosition = { x: boulderPosition.x, y: boulderPosition.y + 1 };

    // Clear old position
    newMaze[boulderPosition.y]![boulderPosition.x] = CELL.EMPTY;

    // Check collision at new position using enhanced detection
    const collision = detectBoulderCollision(maze, newPosition);



    if (collision.hasCollision) {
        // Boulder hits something
        if (collision.soundEvent) {
            soundEvents.push(collision.soundEvent);
        }

        // Handle special collision cases where boulder moves to target position
        if (collision.isPlayerCollision) {
            // Boulder hits player - player dies, boulder moves to player position
            newMaze[newPosition.y]![newPosition.x] = CELL.BOULDER;
            return {
                newMaze,
                newPosition,
                soundEvents,
                playerCollision: true,
                bombExplosion: false,
                targetCell: collision.targetCell
            };
        }

        if (collision.shouldTriggerBombExplosion) {
            // Boulder hits bomb - boulder moves to bomb position, bomb explodes
            newMaze[newPosition.y]![newPosition.x] = CELL.BOULDER;



            return {
                newMaze,
                newPosition,
                soundEvents,
                playerCollision: false,
                bombExplosion: true,
                targetCell: collision.targetCell
            };
        }

        // Regular collision - boulder stays at original position
        return {
            newMaze: maze,
            newPosition: boulderPosition,
            soundEvents,
            playerCollision: false,
            bombExplosion: false,
            targetCell: collision.targetCell
        };
    }

    // Move boulder to new position
    newMaze[newPosition.y]![newPosition.x] = CELL.BOULDER;

    // Note: Movement sounds are handled by the physics engine, not here
    // This avoids duplicate sound generation

    return {
        newMaze,
        newPosition,
        soundEvents,
        playerCollision: false,
        bombExplosion: false
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