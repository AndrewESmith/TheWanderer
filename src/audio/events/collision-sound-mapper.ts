import type { SoundEvent } from '../../Interfaces/ISoundEvent';
import type { MazeCell } from '../../maze';
import { CELL } from '../../maze';

// Pure function to map boulder collision to sound events
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