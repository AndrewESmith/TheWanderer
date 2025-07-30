import { describe, it, expect, beforeEach, vi } from 'vitest';
import { movePlayer, createInitialGameState } from '../GameState';
import { getSoundEventEmitter } from '../audio/events/sound-event-emitter';
import { CELL } from '../maze';
import { SOUND_IDS } from '../audio/config/sound-config';


describe('GameState Sound Integration', () => {
    let mockCallback: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockCallback = vi.fn();
        const emitter = getSoundEventEmitter();
        emitter.setCallback(mockCallback);
    });

    it('should emit walk sound when player moves to empty cell', () => {
        const gameState = createInitialGameState();

        // Move player right (assuming there's an empty cell)
        const newState = movePlayer(gameState, 1, 0);

        expect(mockCallback).toHaveBeenCalledWith(
            SOUND_IDS.PLAYER_WALK,
            expect.objectContaining({
                type: 'movement',
                source: 'player',
                priority: 'low',
                volume: 0.6
            })
        );
    });

    it('should emit dig sound when player moves to soil', () => {
        // Create a custom maze with soil next to player
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.SOIL],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = createInitialGameState(customMaze);

        // Move player right into soil
        const newState = movePlayer(gameState, 1, 0);

        expect(mockCallback).toHaveBeenCalledWith(
            SOUND_IDS.PLAYER_DIG,
            expect.objectContaining({
                type: 'movement',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            })
        );
    });

    it('should emit collection sound when player collects diamond', () => {
        // Create a custom maze with diamond next to player
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.DIAMOND],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = createInitialGameState(customMaze);

        // Move player right to collect diamond
        const newState = movePlayer(gameState, 1, 0);

        // Should emit both walk and collection sounds
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(1,
            SOUND_IDS.PLAYER_WALK,
            expect.objectContaining({
                type: 'movement',
                source: 'player'
            })
        );
        expect(mockCallback).toHaveBeenNthCalledWith(2,
            SOUND_IDS.DIAMOND_COLLECT,
            expect.objectContaining({
                type: 'collection',
                source: 'player',
                priority: 'medium',
                volume: 0.7
            })
        );
    });

    it('should emit death sound when player hits bomb', async () => {
        // Create a custom maze with bomb next to player
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.BOMB],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = createInitialGameState(customMaze);

        // Move player right into bomb
        const newState = movePlayer(gameState, 1, 0);

        // Should emit walk sound immediately (death sound is handled by game end manager)
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenNthCalledWith(1,
            SOUND_IDS.PLAYER_WALK,
            expect.objectContaining({
                type: 'movement',
                source: 'player'
            })
        );

        // Wait for the delayed death sound from game end manager
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should now have the death sound as well
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(2,
            SOUND_IDS.DEATH_SOUND,
            expect.objectContaining({
                type: 'death',
                source: 'system',
                priority: 'high',
                volume: 0.9
            })
        );
    });

    it('should emit victory sounds when player exits with no diamonds', async () => {
        // Create a custom maze with exit next to player and no diamonds
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.EXIT],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = createInitialGameState(customMaze);

        // Move player right to exit
        const newState = movePlayer(gameState, 1, 0);

        // Should emit walk and door slam sounds immediately (victory sound handled by game end manager)
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(1,
            SOUND_IDS.PLAYER_WALK,
            expect.objectContaining({
                type: 'movement',
                source: 'player'
            })
        );
        expect(mockCallback).toHaveBeenNthCalledWith(2,
            SOUND_IDS.DOOR_SLAM,
            expect.objectContaining({
                type: 'door_slam',
                source: 'system'
            })
        );

        // Wait for the delayed victory sound from game end manager
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should now have the victory sound as well
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenNthCalledWith(3,
            SOUND_IDS.VICTORY_SOUND,
            expect.objectContaining({
                type: 'victory',
                source: 'system'
            })
        );
    });

    it('should not emit sounds when movement is blocked', () => {
        // Create a custom maze with rock next to player
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = createInitialGameState(customMaze);

        // Try to move player right into rock (should be blocked)
        const newState = movePlayer(gameState, 1, 0);

        // No sounds should be emitted for blocked movement
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should not emit sounds when game is not in playing state', () => {
        const gameState = {
            ...createInitialGameState(),
            gameState: 'dead' as const
        };

        // Try to move player when game is over
        const newState = movePlayer(gameState, 1, 0);

        // No sounds should be emitted when game is not playing
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should emit death sound when running out of moves', async () => {
        // Create a custom maze with empty cell next to player
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = {
            ...createInitialGameState(customMaze),
            moves: 1 // Only one move left
        };

        // Move player right (this will be the last move)
        const newState = movePlayer(gameState, 1, 0);

        // Should emit walk sound immediately (death sound handled by game end manager)
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenNthCalledWith(1,
            SOUND_IDS.PLAYER_WALK,
            expect.objectContaining({
                type: 'movement',
                source: 'player'
            })
        );

        // Wait for the delayed death sound from game end manager
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should now have the death sound as well
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(2,
            SOUND_IDS.DEATH_SOUND,
            expect.objectContaining({
                type: 'death',
                source: 'system',
                priority: 'high',
                volume: 0.9
            })
        );
    });

    it('should not emit exit sounds when player cannot exit with diamonds remaining', () => {
        // Create a custom maze with exit next to player and diamonds remaining
        const customMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.EXIT, CELL.ROCK],
            [CELL.ROCK, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        const gameState = createInitialGameState(customMaze);

        // Try to move player right to exit (should be blocked due to diamonds)
        const newState = movePlayer(gameState, 1, 0);

        // No sounds should be emitted for blocked exit
        expect(mockCallback).not.toHaveBeenCalled();
    });
});