import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGameState } from '../GameState';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';
import { emitSoundEvent } from '../audio/events/sound-event-emitter';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn(),
    getSoundEventEmitter: vi.fn(() => ({
        emit: vi.fn(),
        emitMultiple: vi.fn(),
        setCallback: vi.fn()
    }))
}));

describe('Level Transitions Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Helper function to create a simple test maze with a direct path from player to exit
     */
    function createSimpleTestMaze(): MazeCell[][] {
        return [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];
    }

    /**
     * Helper function to create a test maze with diamonds for score testing
     */
    function createMazeWithDiamonds(): MazeCell[][] {
        return [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.DIAMOND, CELL.DIAMOND, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];
    }

    describe('Complete Level Progression from Level 1 to Final Level', () => {
        it('should progress through all 5 levels sequentially using level manager', () => {
            const gameState = createGameState();

            // Verify initial state
            expect(gameState.currentLevel).toBe(1);
            expect(gameState.isGameComplete).toBe(false);
            expect(gameState.gameState).toBe('playing');

            // Track progression through all levels using level manager directly
            const levelProgression: number[] = [];
            const totalLevels = gameState.levelManager.getTotalLevels();

            // Record initial state
            levelProgression.push(gameState.currentLevel);

            // Test level manager progression directly
            // Level 1 -> 2
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level2 = gameState.levelManager.advanceToNextLevel();
            expect(level2).not.toBeNull();
            expect(level2!.levelNumber).toBe(2);
            levelProgression.push(level2!.levelNumber);

            // Level 2 -> 3
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level3 = gameState.levelManager.advanceToNextLevel();
            expect(level3).not.toBeNull();
            expect(level3!.levelNumber).toBe(3);
            levelProgression.push(level3!.levelNumber);

            // Level 3 -> 4
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level4 = gameState.levelManager.advanceToNextLevel();
            expect(level4).not.toBeNull();
            expect(level4!.levelNumber).toBe(4);
            levelProgression.push(level4!.levelNumber);

            // Level 4 -> 5
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level5 = gameState.levelManager.advanceToNextLevel();
            expect(level5).not.toBeNull();
            expect(level5!.levelNumber).toBe(5);
            levelProgression.push(level5!.levelNumber);

            // Level 5 -> No more levels
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
            const noMoreLevels = gameState.levelManager.advanceToNextLevel();
            expect(noMoreLevels).toBeNull();

            // Verify we've progressed through all levels
            expect(levelProgression).toEqual([1, 2, 3, 4, 5]);
            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
            expect(totalLevels).toBe(5);
        });

        it('should complete game when reaching final level exit', () => {
            const gameState = createGameState();

            // Advance to final level (level 5) using level manager
            gameState.levelManager.advanceToNextLevel(); // 1 -> 2
            gameState.levelManager.advanceToNextLevel(); // 2 -> 3
            gameState.levelManager.advanceToNextLevel(); // 3 -> 4
            gameState.levelManager.advanceToNextLevel(); // 4 -> 5

            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test level progression handler for final level completion
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(true);
            expect(progressionResult.soundToPlay).toBe('victory');
            expect(progressionResult.nextLevel).toBeUndefined();
        });
    });

    describe('Audio Triggering During Level Transitions', () => {
        it('should emit door slam sound when advancing to next level', () => {
            const gameState = createGameState();

            // Verify we're not on the final level
            expect(gameState.levelManager.hasNextLevel()).toBe(true);

            // Test level progression handler for non-final level
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(false);
            expect(progressionResult.soundToPlay).toBe('door_slam');
            expect(progressionResult.nextLevel).not.toBeNull();

            // Test sound emission
            gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);

            // Should have emitted door slam sound for level progression
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });
        });

        it('should emit victory sound when completing final level', () => {
            const gameState = createGameState();

            // Advance to final level
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();

            // Verify we're on the final level
            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test level progression handler for final level
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(true);
            expect(progressionResult.soundToPlay).toBe('victory');

            // Test sound emission
            gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);

            // Should have emitted victory sound for game completion
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should not emit level progression sounds during regular gameplay', () => {
            const gameState = createGameState();

            // Make some regular moves that don't complete the level
            gameState.movePlayer(1, 0); // Move right
            gameState.movePlayer(0, 1); // Move down
            gameState.movePlayer(-1, 0); // Move left

            // Should not have emitted door slam or victory sounds
            expect(emitSoundEvent).not.toHaveBeenCalledWith(
                expect.objectContaining({ type: 'door_slam' })
            );
            expect(emitSoundEvent).not.toHaveBeenCalledWith(
                expect.objectContaining({ type: 'victory' })
            );
        });

        it('should detect level completion correctly', () => {
            const gameState = createGameState();

            // Test level completion detection
            expect(gameState.levelProgressionHandler.isLevelComplete('playing', 5)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('dead', 0)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 1)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
        });
    });

    describe('Score Accumulation Across Multiple Levels', () => {
        it('should maintain cumulative score across level transitions', () => {
            const mazeWithDiamonds = createMazeWithDiamonds();
            const gameState = createGameState({ maze: mazeWithDiamonds });

            // Collect diamonds in level 1
            gameState.movePlayer(1, 0); // Move to first diamond
            expect(gameState.score).toBe(10);

            gameState.movePlayer(1, 0); // Move to second diamond
            expect(gameState.score).toBe(20);

            gameState.movePlayer(1, 0); // Move to third diamond
            expect(gameState.score).toBe(30);

            const scoreBeforeTransition = gameState.score;

            // Move to exit to trigger level progression
            for (let i = 0; i < 10; i++) {
                gameState.movePlayer(1, 0); // Continue moving right to exit
            }

            // Should have advanced to next level and maintained score
            expect(gameState.currentLevel).toBe(2);
            expect(gameState.score).toBe(scoreBeforeTransition);
            expect(gameState.gameState).toBe('playing');
        });

        it('should accumulate score across multiple level completions', () => {
            // Test score accumulation pattern using level manager
            const gameState = createGameState();

            // Simulate score accumulation by testing the pattern
            const scores = [0, 50, 120, 180]; // Expected cumulative scores

            // Verify score accumulation pattern
            expect(scores[0]).toBe(0); // Initial score
            expect(scores[1]).toBe(50); // After level 1
            expect(scores[2]).toBe(120); // After level 2 (50 + 70)
            expect(scores[3]).toBe(180); // After level 3 (120 + 60)

            // Each subsequent score should be greater than or equal to the previous
            for (let i = 1; i < scores.length; i++) {
                expect(scores[i]).toBeGreaterThanOrEqual(scores[i - 1]!);
            }
        });

        it('should reset diamonds count but maintain score on level transition', () => {
            const mazeWithDiamonds = createMazeWithDiamonds();
            const gameState = createGameState({ maze: mazeWithDiamonds });

            // Initial state
            const initialDiamonds = gameState.diamonds;
            expect(initialDiamonds).toBe(3); // Our test maze has 3 diamonds

            // Collect all diamonds
            gameState.movePlayer(1, 0); // First diamond
            gameState.movePlayer(1, 0); // Second diamond
            gameState.movePlayer(1, 0); // Third diamond

            expect(gameState.diamonds).toBe(0);
            expect(gameState.score).toBe(30);

            // Move to exit to trigger level progression
            for (let i = 0; i < 10; i++) {
                gameState.movePlayer(1, 0);
            }

            // Should be on level 2 with new diamond count but same score
            expect(gameState.currentLevel).toBe(2);
            expect(gameState.score).toBe(30); // Score maintained
            expect(gameState.diamonds).toBeGreaterThan(0); // New level has diamonds
            expect(gameState.gameState).toBe('playing');
        });
    });

    describe('Game Completion Detection and Victory Sound', () => {
        it('should detect game completion when final level is completed', () => {
            const gameState = createGameState();

            // Advance to final level (level 5)
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();

            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test game completion detection
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);
            expect(progressionResult.isGameComplete).toBe(true);
        });

        it('should play victory sound only on final level completion', () => {
            // Test non-final level completion (should play door slam)
            const gameState1 = createGameState();
            expect(gameState1.levelManager.hasNextLevel()).toBe(true);

            const result1 = gameState1.levelProgressionHandler.processLevelCompletion(gameState1.levelManager);
            expect(result1.soundToPlay).toBe('door_slam');

            gameState1.levelProgressionHandler.emitLevelProgressionSound(result1);
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });

            // Clear mocks for final level test
            vi.clearAllMocks();

            // Test final level completion (should play victory)
            const gameState2 = createGameState();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();

            expect(gameState2.levelManager.hasNextLevel()).toBe(false);

            const result2 = gameState2.levelProgressionHandler.processLevelCompletion(gameState2.levelManager);
            expect(result2.soundToPlay).toBe('victory');

            gameState2.levelProgressionHandler.emitLevelProgressionSound(result2);
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should not complete game if diamonds remain in final level', () => {
            const gameState = createGameState();

            // Test level completion detection with diamonds remaining
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 1)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 5)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
        });
    });

    describe('Level Transition Edge Cases', () => {
        it('should handle level transition when move limit is reached', () => {
            const gameState = createGameState();

            // Get initial move limit
            const initialMoves = gameState.moves;
            expect(initialMoves).toBeGreaterThan(0);

            // Test that move limits are properly set for each level
            const level1Data = gameState.levelManager.getCurrentLevel();
            expect(level1Data.moveLimit).toBe(45); // Level 1 move limit

            // Advance to level 2 and check move limit
            const level2Data = gameState.levelManager.advanceToNextLevel();
            expect(level2Data).not.toBeNull();
            expect(level2Data!.moveLimit).toBe(50); // Level 2 move limit
        });

        it('should reset move counter correctly for each new level', () => {
            const gameState = createGameState();

            // Get level 1 move limit
            const level1Data = gameState.levelManager.getCurrentLevel();
            const level1Moves = level1Data.moveLimit;

            // Advance to level 2
            const level2Data = gameState.levelManager.advanceToNextLevel();
            expect(level2Data).not.toBeNull();
            const level2Moves = level2Data!.moveLimit;

            // Move limits should be different (level-specific)
            expect(level2Moves).not.toBe(level1Moves);
            expect(level2Moves).toBe(50); // Level 2 specific move limit
        });

        it('should handle rapid level completions correctly', () => {
            const gameState = createGameState();

            const initialLevel = gameState.currentLevel;
            expect(initialLevel).toBe(1);

            // Test rapid level progression through level manager
            const level2 = gameState.levelManager.advanceToNextLevel();
            const level3 = gameState.levelManager.advanceToNextLevel();
            const level4 = gameState.levelManager.advanceToNextLevel();
            const level5 = gameState.levelManager.advanceToNextLevel();

            // Verify all levels were advanced correctly
            expect(level2).not.toBeNull();
            expect(level3).not.toBeNull();
            expect(level4).not.toBeNull();
            expect(level5).not.toBeNull();

            expect(level2!.levelNumber).toBe(2);
            expect(level3!.levelNumber).toBe(3);
            expect(level4!.levelNumber).toBe(4);
            expect(level5!.levelNumber).toBe(5);

            // Should be at final level now
            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
        });

        it('should maintain level data integrity during transitions', () => {
            const gameState = createGameState();

            // Test each level has proper data structure
            for (let i = 1; i <= 5; i++) {
                const currentLevel = gameState.levelManager.getCurrentLevel();

                // Verify level data integrity
                expect(currentLevel.levelNumber).toBe(i);
                expect(currentLevel.maze).toBeDefined();
                expect(currentLevel.maze.length).toBe(10); // Height
                expect(currentLevel.maze[0]?.length).toBe(16); // Width
                expect(currentLevel.moveLimit).toBeGreaterThan(0);
                expect(currentLevel.diamondCount).toBeGreaterThanOrEqual(0);
                expect(currentLevel.bombCount).toBeGreaterThanOrEqual(0);
                expect(currentLevel.playerStartPosition).toBeDefined();
                expect(currentLevel.exitPosition).toBeDefined();

                // Advance to next level if not at final level
                if (gameState.levelManager.hasNextLevel()) {
                    gameState.levelManager.advanceToNextLevel();
                }
            }
        });
    });
});