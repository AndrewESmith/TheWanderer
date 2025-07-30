import type { SoundEvent } from '../../Interfaces/ISoundEvent';
import type { MazeCell } from '../../maze';
import { CELL } from '../../maze';
import { SOUND_IDS } from '../config/sound-config';

// Pure function to map player movement to sound events
export function mapPlayerMovementToSound(
    fromCell: MazeCell,
    toCell: MazeCell
): SoundEvent | null {
    // Player entering soil should play dig sound
    if (toCell === CELL.SOIL) {
        return {
            type: 'movement',
            source: 'player',
            priority: 'medium',
            volume: 0.7
        };
    }

    // Player hitting bomb should play bomb explosion sound
    if (toCell === CELL.BOMB) {
        return {
            type: 'bomb_explode',
            source: 'player',
            priority: 'high',
            volume: 0.9
        };
    }

    // Regular movement (empty cells, diamonds, exits) should play walk sound
    if (toCell === CELL.EMPTY || toCell === CELL.DIAMOND || toCell === CELL.EXIT) {
        return {
            type: 'movement',
            source: 'player',
            priority: 'low',
            volume: 0.6
        };
    }

    return null;
}

// Pure function to map game state changes to sound events
export function mapGameStateChangeToSound(
    newGameState: 'playing' | 'dead' | 'won',
    previousGameState: 'playing' | 'dead' | 'won',
    targetCell?: MazeCell
): SoundEvent | null {
    // Death sound when player dies
    if (newGameState === 'dead' && previousGameState === 'playing') {
        return {
            type: 'death',
            source: 'system',
            priority: 'high',
            volume: 0.9
        };
    }

    // Victory sound when player wins
    if (newGameState === 'won' && previousGameState === 'playing') {
        return {
            type: 'victory',
            source: 'system',
            priority: 'high',
            volume: 0.8
        };
    }

    return null;
}

// Pure function to map diamond collection to sound events
export function mapDiamondCollectionToSound(
    targetCell: MazeCell
): SoundEvent | null {
    if (targetCell === CELL.DIAMOND) {
        return {
            type: 'collection',
            source: 'player',
            priority: 'medium',
            volume: 0.7
        };
    }

    return null;
}

// Pure function to map exit interaction to sound events
export function mapExitInteractionToSound(
    targetCell: MazeCell,
    canExit: boolean
): SoundEvent[] {
    if (targetCell === CELL.EXIT && canExit) {
        return [
            {
                type: 'door_slam',
                source: 'system',
                priority: 'high',
                volume: 0.8
            }
        ];
    }

    return [];
}

// Pure function to map sound events to sound IDs
export function mapSoundEventToId(event: SoundEvent): string {
    switch (event.type) {
        case 'movement':
            if (event.source === 'player') {
                // Determine if it's dig or walk based on volume (dig has higher volume)
                return event.volume && event.volume > 0.65 ? SOUND_IDS.PLAYER_DIG : SOUND_IDS.PLAYER_WALK;
            }
            if (event.source === 'boulder') {
                return SOUND_IDS.BOULDER_MOVE;
            }
            if (event.source === 'arrow') {
                return SOUND_IDS.ARROW_MOVE;
            }
            break;

        case 'collision':
            return SOUND_IDS.COLLISION_THUD;

        case 'collection':
            return SOUND_IDS.DIAMOND_COLLECT;

        case 'death':
            return SOUND_IDS.DEATH_SOUND;

        case 'victory':
            return SOUND_IDS.VICTORY_SOUND;

        case 'door_slam':
            return SOUND_IDS.DOOR_SLAM;

        case 'bomb_explode':
            return SOUND_IDS.BOMB_SOUND;
    }

    // Fallback - should not happen with proper typing
    throw new Error(`Unknown sound event: ${JSON.stringify(event)}`);
}

// Pure function to generate all sound events for a player move
export function generatePlayerMoveEvents(
    fromCell: MazeCell,
    toCell: MazeCell,
    newGameState: 'playing' | 'dead' | 'won',
    previousGameState: 'playing' | 'dead' | 'won',
    diamondsRemaining: number
): SoundEvent[] {
    const events: SoundEvent[] = [];

    // Movement sound
    const movementEvent = mapPlayerMovementToSound(fromCell, toCell);
    if (movementEvent) {
        events.push(movementEvent);
    }

    // Diamond collection sound
    const collectionEvent = mapDiamondCollectionToSound(toCell);
    if (collectionEvent) {
        events.push(collectionEvent);
    }

    // Exit interaction sounds (only if player can actually exit)
    const exitEvents = mapExitInteractionToSound(toCell, diamondsRemaining === 0);
    events.push(...exitEvents);

    // Game state change sound
    const stateChangeEvent = mapGameStateChangeToSound(newGameState, previousGameState, toCell);
    if (stateChangeEvent) {
        events.push(stateChangeEvent);
    }

    return events;
}