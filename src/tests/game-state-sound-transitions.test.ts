import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { movePlayer, createInitialGameState } from '../GameState';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';
import { getSoundEventEmitter } from '../audio/events/sound-event-emitter';
import { getGameEndSoundManager } from '../audio/events/game-end-sound-manager';
import { SOUND_IDS } from '../audio/config/sound-config';

describe('Game State Sound Transitions', () => {
    let mockCallback: ReturnType<typeof vi.fn>;
    let mockStopAllSounds: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockCallback = vi.fn();
        mockStopAllSounds = vi.fn();

        // Set up sound event emitter
        const soundEmitter = getSoundEventEmitter();
        soundEmitter.setCallback(mockCallback);

        // Set up game end sound manager
        const gameEndManager = getGameEndSoundManager();
        gameEndManager.setStopAllSoundsCallback(mockStopAllSounds);
    });

    afterEach(() => {
        vi.clearAllMocks();

        // Clean up callbacks
        const soundEmitter = getSoundEventEmitter();
        soundEmitter.setCallback(null);

        const gameEndManager = getGameEndSoundManager();
        gameEndManager.setStopAllSoundsCallback(null);
    });

    describe('Death sound transitions', () => {
        it('should stop all sounds and play death sound when player hits bomb', async () => {
            // Create a custom maze with bomb next to player
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOMB],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);

            // Move player into bomb
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('dead');

            // Should stop all sounds
            expect(mockStopAllSounds).toHaveBeenCalledTimes(1);

            // Wait for the delayed death sound
            await new Promise(resolve => setTimeout(resolve, 100));

            // Should play death sound after delay
            expect(mockCallback).toHaveBeenCalledWith(
                SOUND_IDS.DEATH_SOUND,
                expect.objectContaining({
                    type: 'death',
                    source: 'system',
                    priority: 'high',
                    volume: 0.9
                })
            );
        });

        it('should stop all sounds and play death sound when running out of moves', async () => {
            // Create a custom maze with empty cell next to player
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EMPTY],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);
            // Set moves to 1 so next move will cause death
            gameState.moves = 1;

            // Move player - this should cause death due to no moves left
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('dead');
            expect(newState.moves).toBe(0);

            // Should stop all sounds
            expect(mockStopAllSounds).toHaveBeenCalledTimes(1);

            // Wait for the delayed death sound
            await new Promise(resolve => setTimeout(resolve, 100));

            // Should play death sound after delay
            expect(mockCallback).toHaveBeenCalledWith(
                SOUND_IDS.DEATH_SOUND,
                expect.objectContaining({
                    type: 'death',
                    source: 'system',
                    priority: 'high',
                    volume: 0.9
                })
            );
        });
    });

    describe('Victory sound transitions', () => {
        it('should stop all sounds and play victory sound when player exits successfully', async () => {
            // Create a custom maze with exit next to player and no diamonds
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EXIT],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);
            // Set diamonds to 0 so player can exit
            gameState.diamonds = 0;

            // Move player to exit
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('won');

            // Should stop all sounds
            expect(mockStopAllSounds).toHaveBeenCalledTimes(1);

            // Wait for the delayed victory sound
            await new Promise(resolve => setTimeout(resolve, 100));

            // Should play victory sound after delay
            expect(mockCallback).toHaveBeenCalledWith(
                SOUND_IDS.VICTORY_SOUND,
                expect.objectContaining({
                    type: 'victory',
                    source: 'system',
                    priority: 'high',
                    volume: 0.8
                })
            );
        });

        it('should not allow exit when diamonds remain', () => {
            // Create a custom maze with exit next to player and diamonds remaining
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EXIT],
                [CELL.ROCK, CELL.DIAMOND, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);

            // Move player to exit - should not work with diamonds remaining
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('playing');
            expect(newState.player?.x).toBe(1); // Player should not have moved
            expect(newState.player?.y).toBe(1);

            // Should not stop sounds or play victory sound
            expect(mockStopAllSounds).not.toHaveBeenCalled();
        });
    });

    describe('Door slam sound for exit interaction', () => {
        it('should play door slam sound when player successfully exits', () => {
            // Create a custom maze with exit next to player and no diamonds
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EXIT],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);
            // Set diamonds to 0 so player can exit
            gameState.diamonds = 0;

            // Move player to exit
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('won');

            // Should have called the callback for non-game-end sounds (including door slam)
            // The door slam should be emitted as part of the regular sound events
            const doorSlamCalls = mockCallback.mock.calls.filter(call =>
                call[0] === SOUND_IDS.DOOR_SLAM
            );

            expect(doorSlamCalls.length).toBeGreaterThan(0);
            expect(doorSlamCalls[0]![1]).toEqual(
                expect.objectContaining({
                    type: 'door_slam',
                    source: 'system',
                    priority: 'high',
                    volume: 0.8
                })
            );
        });
    });

    describe('Sound stopping behavior', () => {
        it('should not stop sounds during normal gameplay', () => {
            // Create a custom maze with empty cell next to player
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EMPTY],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);

            // Move player normally
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('playing');

            // Should not stop sounds during normal gameplay
            expect(mockStopAllSounds).not.toHaveBeenCalled();

            // Should play normal movement sound
            expect(mockCallback).toHaveBeenCalledWith(
                SOUND_IDS.PLAYER_WALK,
                expect.objectContaining({
                    type: 'movement',
                    source: 'player'
                })
            );
        });

        it('should filter out death/victory sounds from regular emission when game ends', () => {
            // Create a custom maze with bomb next to player
            const customMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOMB],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(customMaze);

            // Move player into bomb
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.gameState).toBe('dead');

            // Should have emitted bomb sound immediately (not filtered)
            const bombCalls = mockCallback.mock.calls.filter(call =>
                call[0] === SOUND_IDS.BOMB_SOUND
            );
            expect(bombCalls.length).toBe(1);

            // Should not have emitted death sound immediately (handled by game end manager)
            const immediateDeatCalls = mockCallback.mock.calls.filter(call =>
                call[0] === SOUND_IDS.DEATH_SOUND
            );
            expect(immediateDeatCalls.length).toBe(0);
        });
    });
});