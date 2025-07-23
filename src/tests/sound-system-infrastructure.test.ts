import { describe, it, expect } from 'vitest';
import { SOUND_ASSETS, SOUND_CONFIG, SOUND_IDS } from '../audio/config/sound-config';
import { isWebAudioSupported, isHTML5AudioSupported } from '../audio/utils/audio-utils';

describe('Sound System Infrastructure', () => {
    describe('Sound Configuration', () => {
        it('should have all required sound assets defined', () => {
            expect(SOUND_ASSETS).toBeDefined();
            expect(Object.keys(SOUND_ASSETS)).toHaveLength(9);

            // Check that all expected sounds are present
            expect(SOUND_ASSETS.PLAYER_WALK).toBeDefined();
            expect(SOUND_ASSETS.PLAYER_DIG).toBeDefined();
            expect(SOUND_ASSETS.BOULDER_MOVE).toBeDefined();
            expect(SOUND_ASSETS.ARROW_MOVE).toBeDefined();
            expect(SOUND_ASSETS.COLLISION_THUD).toBeDefined();
            expect(SOUND_ASSETS.DEATH_SOUND).toBeDefined();
            expect(SOUND_ASSETS.VICTORY_SOUND).toBeDefined();
            expect(SOUND_ASSETS.DOOR_SLAM).toBeDefined();
            expect(SOUND_ASSETS.DIAMOND_COLLECT).toBeDefined();
        });

        it('should have proper sound asset structure', () => {
            const playerWalk = SOUND_ASSETS.PLAYER_WALK;
            expect(playerWalk.id).toBe('player_walk');
            expect(playerWalk.src).toBeInstanceOf(Array);
            expect(playerWalk.src.length).toBeGreaterThan(0);
            expect(typeof playerWalk.volume).toBe('number');
            expect(typeof playerWalk.loop).toBe('boolean');
            expect(typeof playerWalk.preload).toBe('boolean');
        });

        it('should have sound configuration with categories', () => {
            expect(SOUND_CONFIG).toBeDefined();
            expect(SOUND_CONFIG.categories).toBeDefined();
            expect(SOUND_CONFIG.categories.movement).toBeDefined();
            expect(SOUND_CONFIG.categories.collision).toBeDefined();
            expect(SOUND_CONFIG.categories.gameState).toBeDefined();
        });

        it('should have sound ID constants', () => {
            expect(SOUND_IDS).toBeDefined();
            expect(SOUND_IDS.PLAYER_WALK).toBe('player_walk');
            expect(SOUND_IDS.BOULDER_MOVE).toBe('boulder_move');
            expect(SOUND_IDS.DEATH_SOUND).toBe('death_sound');
        });
    });

    describe('Audio Utilities', () => {
        it('should detect browser audio support', () => {
            const webAudioSupported = isWebAudioSupported();
            const html5AudioSupported = isHTML5AudioSupported();

            expect(typeof webAudioSupported).toBe('boolean');
            expect(typeof html5AudioSupported).toBe('boolean');
        });
    });
});