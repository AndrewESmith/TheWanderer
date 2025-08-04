import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    mapPlayerMovementToSound,
    mapGameStateChangeToSound,
    mapDiamondCollectionToSound,
    mapExitInteractionToSound,
    mapSoundEventToId,
    generatePlayerMoveEvents
} from '../audio/events/sound-event-mapper';
import {
    createSoundEventEmitter,
    getSoundEventEmitter,
    emitSoundEvent,
    emitSoundEvents
} from '../audio/events/sound-event-emitter';
import { CELL } from '../maze';
import { SOUND_IDS } from '../audio/config/sound-config';
import type { SoundEvent } from '../Interfaces/ISoundEvent';

describe('Sound Event Mapper', () => {
    describe('mapPlayerMovementToSound', () => {
        it('should return dig sound event when player enters soil', () => {
            const result = mapPlayerMovementToSound(CELL.EMPTY, CELL.SOIL);

            expect(result).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            });
        });

        it('should return walk sound event when player moves to empty cell', () => {
            const result = mapPlayerMovementToSound(CELL.EMPTY, CELL.EMPTY);

            expect(result).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            });
        });

        it('should return walk sound event when player moves to diamond', () => {
            const result = mapPlayerMovementToSound(CELL.EMPTY, CELL.DIAMOND);

            expect(result).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            });
        });

        it('should return walk sound event when player moves to exit', () => {
            const result = mapPlayerMovementToSound(CELL.EMPTY, CELL.EXIT);

            expect(result).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            });
        });

        it('should return bomb explosion sound event when player moves to bomb', () => {
            const result = mapPlayerMovementToSound(CELL.EMPTY, CELL.BOMB);

            expect(result).toEqual({
                type: 'bomb_explode',
                source: 'player',
                priority: 'high',
                volume: 0.9
            });
        });

        it('should return null for blocked movement', () => {
            const result = mapPlayerMovementToSound(CELL.EMPTY, CELL.ROCK);
            expect(result).toBeNull();
        });
    });

    describe('mapGameStateChangeToSound', () => {
        it('should return death sound event when player dies', () => {
            const result = mapGameStateChangeToSound('dead', 'playing');

            expect(result).toEqual({
                type: 'death',
                source: 'system',
                priority: 'high',
                volume: 0.9
            });
        });

        it('should return null when player wins (victory handled by level progression)', () => {
            const result = mapGameStateChangeToSound('won', 'playing');

            // Victory sounds are now handled by the level progression system
            // to ensure they only play when completing the final level
            expect(result).toBeNull();
        });

        it('should return null when game state does not change', () => {
            const result = mapGameStateChangeToSound('playing', 'playing');
            expect(result).toBeNull();
        });

        it('should return null for invalid state transitions', () => {
            const result = mapGameStateChangeToSound('playing', 'dead');
            expect(result).toBeNull();
        });
    });

    describe('mapDiamondCollectionToSound', () => {
        it('should return collection sound event when collecting diamond', () => {
            const result = mapDiamondCollectionToSound(CELL.DIAMOND);

            expect(result).toEqual({
                type: 'collection',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            });
        });

        it('should return null for non-diamond cells', () => {
            const result = mapDiamondCollectionToSound(CELL.EMPTY);
            expect(result).toBeNull();
        });
    });

    describe('mapExitInteractionToSound', () => {
        it('should return door slam sound event when player can exit', () => {
            const result = mapExitInteractionToSound(CELL.EXIT, true);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                type: 'door_slam',
                source: 'system',
                priority: 'high',
                volume: 0.8
            });
        });

        it('should return empty array when player cannot exit', () => {
            const result = mapExitInteractionToSound(CELL.EXIT, false);
            expect(result).toEqual([]);
        });

        it('should return empty array for non-exit cells', () => {
            const result = mapExitInteractionToSound(CELL.EMPTY, true);
            expect(result).toEqual([]);
        });
    });

    describe('mapSoundEventToId', () => {
        it('should map player dig movement to dig sound ID', () => {
            const event: SoundEvent = {
                type: 'movement',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.PLAYER_DIG);
        });

        it('should map player walk movement to walk sound ID', () => {
            const event: SoundEvent = {
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.PLAYER_WALK);
        });

        it('should map boulder movement to boulder sound ID', () => {
            const event: SoundEvent = {
                type: 'movement',
                source: 'boulder',
                priority: 'medium'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.BOULDER_MOVE);
        });

        it('should map arrow movement to arrow sound ID', () => {
            const event: SoundEvent = {
                type: 'movement',
                source: 'arrow',
                priority: 'medium'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.ARROW_MOVE);
        });

        it('should map collision event to thud sound ID', () => {
            const event: SoundEvent = {
                type: 'collision',
                source: 'boulder',
                priority: 'high'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.COLLISION_THUD);
        });

        it('should map collection event to diamond collect sound ID', () => {
            const event: SoundEvent = {
                type: 'collection',
                source: 'player',
                priority: 'medium'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.DIAMOND_COLLECT);
        });

        it('should map death event to death sound ID', () => {
            const event: SoundEvent = {
                type: 'death',
                source: 'system',
                priority: 'high'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.DEATH_SOUND);
        });

        it('should map victory event to victory sound ID', () => {
            const event: SoundEvent = {
                type: 'victory',
                source: 'system',
                priority: 'high'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.VICTORY_SOUND);
        });

        it('should map door_slam event to door slam sound ID', () => {
            const event: SoundEvent = {
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.DOOR_SLAM);
        });

        it('should map bomb_explode event to bomb sound ID', () => {
            const event: SoundEvent = {
                type: 'bomb_explode',
                source: 'player',
                priority: 'high'
            };

            const result = mapSoundEventToId(event);
            expect(result).toBe(SOUND_IDS.BOMB_SOUND);
        });

        it('should throw error for unknown event type', () => {
            const event = {
                type: 'unknown',
                source: 'player',
                priority: 'low'
            } as any;

            expect(() => mapSoundEventToId(event)).toThrow('Unknown sound event');
        });
    });

    describe('generatePlayerMoveEvents', () => {
        it('should generate movement and collection events for diamond collection', () => {
            const events = generatePlayerMoveEvents(
                CELL.EMPTY,
                CELL.DIAMOND,
                'playing',
                'playing',
                5
            );

            expect(events).toHaveLength(2);
            expect(events[0]).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            });
            expect(events[1]).toEqual({
                type: 'collection',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            });
        });

        it('should generate movement and death events when player dies', () => {
            const events = generatePlayerMoveEvents(
                CELL.EMPTY,
                CELL.BOMB,
                'dead',
                'playing',
                3
            );

            expect(events).toHaveLength(2);
            expect(events[0]).toEqual({
                type: 'bomb_explode',
                source: 'player',
                priority: 'high',
                volume: 0.9
            });
            expect(events[1]).toEqual({
                type: 'death',
                source: 'system',
                priority: 'high',
                volume: 0.9
            });
        });

        it('should generate movement and door slam events when player wins', () => {
            const events = generatePlayerMoveEvents(
                CELL.EMPTY,
                CELL.EXIT,
                'won',
                'playing',
                0
            );

            // Victory sound is now handled by level progression system
            expect(events).toHaveLength(2);
            expect(events[0]).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            });
            expect(events[1]).toEqual({
                type: 'door_slam',
                source: 'system',
                priority: 'high',
                volume: 0.8
            });
        });

        it('should generate dig sound when entering soil', () => {
            const events = generatePlayerMoveEvents(
                CELL.EMPTY,
                CELL.SOIL,
                'playing',
                'playing',
                3
            );

            expect(events).toHaveLength(1);
            expect(events[0]).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            });
        });

        it('should generate only movement event for regular movement', () => {
            const events = generatePlayerMoveEvents(
                CELL.EMPTY,
                CELL.EMPTY,
                'playing',
                'playing',
                3
            );

            expect(events).toHaveLength(1);
            expect(events[0]).toEqual({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            });
        });
    });
});

describe('Sound Event Emitter', () => {
    let mockCallback: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockCallback = vi.fn();
    });

    describe('createSoundEventEmitter', () => {
        it('should create emitter with working emit function', () => {
            const emitter = createSoundEventEmitter();
            emitter.setCallback(mockCallback);

            const event: SoundEvent = {
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            };

            emitter.emit(event);

            expect(mockCallback).toHaveBeenCalledWith(SOUND_IDS.PLAYER_WALK, event);
        });

        it('should emit multiple events', () => {
            const emitter = createSoundEventEmitter();
            emitter.setCallback(mockCallback);

            const events: SoundEvent[] = [
                {
                    type: 'movement',
                    source: 'player',
                    priority: 'low',
                    volume: 0.6
                },
                {
                    type: 'collection',
                    source: 'player',
                    priority: 'medium',
                    volume: 0.7
                }
            ];

            emitter.emitMultiple(events);

            expect(mockCallback).toHaveBeenCalledTimes(2);
            expect(mockCallback).toHaveBeenNthCalledWith(1, SOUND_IDS.PLAYER_WALK, events[0]);
            expect(mockCallback).toHaveBeenNthCalledWith(2, SOUND_IDS.DIAMOND_COLLECT, events[1]);
        });

        it('should not emit when no callback is set', () => {
            const emitter = createSoundEventEmitter();

            const event: SoundEvent = {
                type: 'movement',
                source: 'player',
                priority: 'low'
            };

            // Should not throw
            expect(() => emitter.emit(event)).not.toThrow();
        });

        it('should handle errors gracefully', () => {
            const emitter = createSoundEventEmitter();
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            emitter.setCallback(mockCallback);

            const invalidEvent = {
                type: 'invalid',
                source: 'player',
                priority: 'low'
            } as any;

            emitter.emit(invalidEvent);

            expect(consoleSpy).toHaveBeenCalledWith('Failed to emit sound event:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('getSoundEventEmitter', () => {
        it('should return the same instance on multiple calls', () => {
            const emitter1 = getSoundEventEmitter();
            const emitter2 = getSoundEventEmitter();

            expect(emitter1).toBe(emitter2);
        });
    });

    describe('emitSoundEvent', () => {
        it('should emit single event using global emitter', () => {
            const emitter = getSoundEventEmitter();
            emitter.setCallback(mockCallback);

            const event: SoundEvent = {
                type: 'death',
                source: 'system',
                priority: 'high'
            };

            emitSoundEvent(event);

            expect(mockCallback).toHaveBeenCalledWith(SOUND_IDS.DEATH_SOUND, event);
        });
    });

    describe('emitSoundEvents', () => {
        it('should emit multiple events using global emitter', () => {
            const emitter = getSoundEventEmitter();
            emitter.setCallback(mockCallback);

            const events: SoundEvent[] = [
                {
                    type: 'victory',
                    source: 'system',
                    priority: 'high'
                },
                {
                    type: 'collection',
                    source: 'player',
                    priority: 'medium'
                }
            ];

            emitSoundEvents(events);

            expect(mockCallback).toHaveBeenCalledTimes(2);
            expect(mockCallback).toHaveBeenNthCalledWith(1, SOUND_IDS.VICTORY_SOUND, events[0]);
            expect(mockCallback).toHaveBeenNthCalledWith(2, SOUND_IDS.DIAMOND_COLLECT, events[1]);
        });
    });
});