import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLevelProgressionHandler } from '../levels/level-progression-handler';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn()
}));

describe('LevelProgressionHandler', () => {
    let handler: ReturnType<typeof createLevelProgressionHandler>;
    let levelManager: MazeLevelManager;

    beforeEach(() => {
        handler = createLevelProgressionHandler();
        levelManager = createMazeLevelManager();
        vi.clearAllMocks();
    });

    describe('isLevelComplete', () => {
        it('should return true when player won and no diamonds remain', () => {
            const result = handler.isLevelComplete('won', 0);
            expect(result).toBe(true);
        });

        it('should return false when player won but diamonds remain', () => {
            const result = handler.isLevelComplete('won', 3);
            expect(result).toBe(false);
        });

        it('should return false when player is still playing', () => {
            const result = handler.isLevelComplete('playing', 0);
            expect(result).toBe(false);
        });

        it('should return false when player is dead', () => {
            const result = handler.isLevelComplete('dead', 0);
            expect(result).toBe(false);
        });
    });

    describe('processLevelCompletion', () => {
        it('should advance to next level when available', () => {
            // Level manager starts at level 1, should have next level
            const result = handler.processLevelCompletion(levelManager);

            expect(result.success).toBe(true);
            expect(result.isGameComplete).toBe(false);
            expect(result.soundToPlay).toBe('door_slam');
            expect(result.nextLevel).toBeDefined();
            expect(result.nextLevel?.levelNumber).toBe(2);
        });

        it('should complete game when no more levels available', () => {
            // Advance to the last level (level 5)
            levelManager.advanceToNextLevel(); // Level 2
            levelManager.advanceToNextLevel(); // Level 3
            levelManager.advanceToNextLevel(); // Level 4
            levelManager.advanceToNextLevel(); // Level 5

            // Now process completion from level 5
            const result = handler.processLevelCompletion(levelManager);

            expect(result.success).toBe(true);
            expect(result.isGameComplete).toBe(true);
            expect(result.soundToPlay).toBe('victory');
            expect(result.nextLevel).toBeUndefined();
        });

        it('should handle progression through all levels correctly', () => {
            // Test progression from level 1 to 2
            let result = handler.processLevelCompletion(levelManager);
            expect(result.nextLevel?.levelNumber).toBe(2);
            expect(result.soundToPlay).toBe('door_slam');
            expect(result.isGameComplete).toBe(false);

            // Test progression from level 2 to 3
            result = handler.processLevelCompletion(levelManager);
            expect(result.nextLevel?.levelNumber).toBe(3);
            expect(result.soundToPlay).toBe('door_slam');
            expect(result.isGameComplete).toBe(false);

            // Test progression from level 3 to 4
            result = handler.processLevelCompletion(levelManager);
            expect(result.nextLevel?.levelNumber).toBe(4);
            expect(result.soundToPlay).toBe('door_slam');
            expect(result.isGameComplete).toBe(false);

            // Test progression from level 4 to 5
            result = handler.processLevelCompletion(levelManager);
            expect(result.nextLevel?.levelNumber).toBe(5);
            expect(result.soundToPlay).toBe('door_slam');
            expect(result.isGameComplete).toBe(false);

            // Test completion from level 5
            result = handler.processLevelCompletion(levelManager);
            expect(result.nextLevel).toBeUndefined();
            expect(result.soundToPlay).toBe('victory');
            expect(result.isGameComplete).toBe(true);
        });
    });

    describe('emitLevelProgressionSound', () => {
        it('should emit door slam sound for level progression', async () => {
            const { emitSoundEvent } = await import('../audio/events/sound-event-emitter');

            const progressionResult = {
                success: true,
                isGameComplete: false,
                soundToPlay: 'door_slam' as const
            };

            handler.emitLevelProgressionSound(progressionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });
        });

        it('should emit victory sound for game completion', async () => {
            const { emitSoundEvent } = await import('../audio/events/sound-event-emitter');

            const progressionResult = {
                success: true,
                isGameComplete: true,
                soundToPlay: 'victory' as const
            };

            handler.emitLevelProgressionSound(progressionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });
    });

    describe('integration with level manager', () => {
        it('should work correctly with level manager state changes', () => {
            // Verify initial state
            expect(levelManager.getCurrentLevelNumber()).toBe(1);
            expect(levelManager.hasNextLevel()).toBe(true);

            // Process level completion and verify state changes
            const result1 = handler.processLevelCompletion(levelManager);
            expect(result1.nextLevel?.levelNumber).toBe(2);
            expect(levelManager.getCurrentLevelNumber()).toBe(2);

            // Continue progression
            const result2 = handler.processLevelCompletion(levelManager);
            expect(result2.nextLevel?.levelNumber).toBe(3);
            expect(levelManager.getCurrentLevelNumber()).toBe(3);

            // Verify we can reach the final level
            handler.processLevelCompletion(levelManager); // Level 4
            handler.processLevelCompletion(levelManager); // Level 5

            expect(levelManager.getCurrentLevelNumber()).toBe(5);
            expect(levelManager.hasNextLevel()).toBe(false);

            // Final completion should indicate game is complete
            const finalResult = handler.processLevelCompletion(levelManager);
            expect(finalResult.isGameComplete).toBe(true);
            expect(finalResult.soundToPlay).toBe('victory');
        });
    });
});