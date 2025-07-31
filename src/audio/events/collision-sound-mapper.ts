import type { SoundEvent } from '../../Interfaces/ISoundEvent';
import type { MazeCell } from '../../maze';
import { CELL } from '../../maze';

// Pure function to map boulder collision to sound events with enhanced object support
export function mapBoulderCollisionToSound(
    targetCell: MazeCell,
    collisionType: 'wall' | 'object' | 'ground' | 'none'
): SoundEvent | null {
    if (collisionType === 'none') {
        return null;
    }

    // Different collision sounds based on what the boulder hits
    switch (targetCell) {
        case CELL.ROCK:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.9
            };

        case CELL.BOULDER:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.8
            };

        case CELL.SOIL:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.7
            };

        case CELL.DIAMOND:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };

        case CELL.BOMB:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.9
            };

        case CELL.PLAYER:
            return {
                type: 'death',
                source: 'boulder',
                priority: 'high',
                volume: 1.0
            };

        case CELL.EXIT:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };

        default:
            // Generic collision sound for other objects
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };
    }
}

// Pure function to map arrow collision to sound events
export function mapArrowCollisionToSound(
    targetCell: MazeCell,
    collisionType: 'wall' | 'object' | 'ground' | 'none'
): SoundEvent | null {
    if (collisionType === 'none') {
        return null;
    }

    // Different collision sounds based on what the arrow hits
    switch (targetCell) {
        case CELL.ROCK:
            return {
                type: 'collision',
                source: 'arrow',
                priority: 'medium',
                volume: 0.8
            };

        case CELL.BOULDER:
            return {
                type: 'collision',
                source: 'arrow',
                priority: 'medium',
                volume: 0.7
            };

        case CELL.SOIL:
            return {
                type: 'collision',
                source: 'arrow',
                priority: 'low',
                volume: 0.6
            };

        default:
            // Generic collision sound for other objects
            return {
                type: 'collision',
                source: 'arrow',
                priority: 'low',
                volume: 0.7
            };
    }
}

// Pure function to map boulder movement to sound events
export function mapBoulderMovementToSound(): SoundEvent {
    return {
        type: 'movement',
        source: 'boulder',
        priority: 'medium',
        volume: 0.8
    };
}

// Pure function to map arrow movement to sound events
export function mapArrowMovementToSound(): SoundEvent {
    return {
        type: 'movement',
        source: 'arrow',
        priority: 'low',
        volume: 0.7
    };
}

// Pure function to generate sound events for object interactions
export function generateObjectInteractionEvents(
    sourceObject: 'boulder' | 'arrow',
    targetCell: MazeCell,
    interactionType: 'collision' | 'movement'
): SoundEvent[] {
    const events: SoundEvent[] = [];

    if (interactionType === 'movement') {
        // Add movement sound
        if (sourceObject === 'boulder') {
            events.push(mapBoulderMovementToSound());
        } else if (sourceObject === 'arrow') {
            events.push(mapArrowMovementToSound());
        }
    } else if (interactionType === 'collision') {
        // Add collision sound based on what was hit
        let collisionEvent: SoundEvent | null = null;

        if (sourceObject === 'boulder') {
            collisionEvent = mapBoulderCollisionToSound(targetCell, 'object');
        } else if (sourceObject === 'arrow') {
            collisionEvent = mapArrowCollisionToSound(targetCell, 'object');
        }

        if (collisionEvent) {
            events.push(collisionEvent);
        }
    }

    return events;
}

// Pure function to generate comprehensive collision sound events
export function generateCollisionSoundEvents(
    collisions: Array<{
        sourceObject: 'boulder' | 'arrow';
        targetCell: MazeCell;
        position: { x: number; y: number };
    }>
): SoundEvent[] {
    const events: SoundEvent[] = [];

    for (const collision of collisions) {
        const collisionEvents = generateObjectInteractionEvents(
            collision.sourceObject,
            collision.targetCell,
            'collision'
        );
        events.push(...collisionEvents);
    }

    return events;
}

// Enhanced function to map boulder collision with specific object types
export function mapBoulderObjectCollisionToSound(
    targetCell: MazeCell
): SoundEvent | null {
    switch (targetCell) {
        case CELL.ROCK:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.9
            };

        case CELL.BOULDER:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.8
            };

        case CELL.SOIL:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.7
            };

        case CELL.DIAMOND:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };

        case CELL.BOMB:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.9
            };

        case CELL.PLAYER:
            return {
                type: 'death',
                source: 'boulder',
                priority: 'high',
                volume: 1.0
            };

        case CELL.EXIT:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };

        case CELL.EMPTY:
            return null; // No collision sound for empty space

        default:
            return {
                type: 'collision',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };
    }
}

// Function to generate sound events for boulder-player collision (death)
export function generateBoulderPlayerCollisionSound(): SoundEvent {
    return {
        type: 'death',
        source: 'boulder',
        priority: 'high',
        volume: 1.0
    };
}

// Function to generate sound events for boulder-bomb collision
export function generateBoulderBombCollisionSound(): SoundEvent {
    return {
        type: 'collision',
        source: 'boulder',
        priority: 'high',
        volume: 0.9
    };
}

// Function to categorize collision types for enhanced sound mapping
export function categorizeBoulderCollision(targetCell: MazeCell): {
    collisionType: 'solid' | 'soft' | 'special' | 'none';
    soundPriority: 'low' | 'medium' | 'high';
    shouldStopBoulder: boolean;
} {
    switch (targetCell) {
        case CELL.ROCK:
        case CELL.BOULDER:
            return {
                collisionType: 'solid',
                soundPriority: 'high',
                shouldStopBoulder: true
            };

        case CELL.SOIL:
            return {
                collisionType: 'soft',
                soundPriority: 'medium',
                shouldStopBoulder: true
            };

        case CELL.DIAMOND:
        case CELL.EXIT:
            return {
                collisionType: 'solid',
                soundPriority: 'medium',
                shouldStopBoulder: true
            };

        case CELL.BOMB:
        case CELL.PLAYER:
            return {
                collisionType: 'special',
                soundPriority: 'high',
                shouldStopBoulder: true
            };

        case CELL.EMPTY:
            return {
                collisionType: 'none',
                soundPriority: 'low',
                shouldStopBoulder: false
            };

        default:
            return {
                collisionType: 'solid',
                soundPriority: 'medium',
                shouldStopBoulder: true
            };
    }
}