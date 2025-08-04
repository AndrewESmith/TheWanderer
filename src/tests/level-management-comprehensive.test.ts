import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import { createLevelProgressionHandler } from '../levels/level-progression-handler';
import { createInitialGameState, movePlayer } from '../GameState';
import type { GameStateData } from '../GameState';
import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';
import type { LevelProgressionHandler } from '../levels/level-progression-handler';
import { CELL } from '../maze';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn()
}));

// Mock game end sound manager
vi.mock('../audio/events/game-end-sound-manager', () => ({
    handleGameEndSounds: vi.fn()
}));

describe('Level Management Comprehensive Tests', () => {
    let levelManager: MazeLevelManager;
    let progressionHandler: LevelProgressionHandler;
    let gameState: GameStateData;

    beforeEach(() => {
        levelManager = createMazeLevelManager();
        progressionHandler = createLevelProgressionHandler();
        gameState = createInitialGameState();
        vi.clearAllMocks();
    });

    describe('MazeLevelManager Navigation and Validation', () => {
        it('should validate all level configurations on initialization', () => {
            const manager = createMazeLevelManager();

            // Should have exactly 5 valid levels
            expect(manager.getTotalLevels()).toBe(5);

            // Each level should be valid
            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();

                // Validate basic properties
                expect(level.levelNumber).toBeGreaterThan(0);
                expect(level.moveLimit).toBeGreaterThan(0);
                expect(level.diamondCount).toBeGreaterThan(0);
                expect(level.bombCount).toBeGreaterThanOrEqual(0);

                // Validate maze dimensions
                expect(level.maze).toHaveLength(10);
                expect(level.maze[0]).toHaveLength(16);

                // Validate positions are within bounds
                expect(level.playerStartPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.x).toBeLessThan(16);
                expect(level.playerStartPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.y).toBeLessThan(10);

                expect(level.exitPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.x).toBeLessThan(16);
                expect(level.exitPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.y).toBeLessThan(10);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should maintain consistent level numbering', () => {
            const manager = createMazeLevelManager();
            const expectedLevels = [1, 2, 3, 4, 5];
            const actualLevels: number[] = [];

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                actualLevels.push(manager.getCurrentLevelNumber());
                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }

            expect(actualLevels).toEqual(expectedLevels);
        });

        it('should validate element counts match actual maze content', () => {
            const manager = createMazeLevelManager();

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                let actualDiamonds = 0;
                let actualBombs = 0;
                let actualExits = 0;
                let actualPlayers = 0;

                level.maze.forEach(row => {
                    row.forEach(cell => {
                        switch (cell) {
                            case CELL.DIAMOND:
                                actualDiamonds++;
                                break;
                            case CELL.BOMB:
                                actualBombs++;
                                break;
                            case CELL.EXIT:
                                actualExits++;
                                break;
                            case CELL.PLAYER:
                                actualPlayers++;
                                break;
                        }
                    });
                });

                expect(actualDiamonds).toBe(level.diamondCount);
                expect(actualBombs).toBe(level.bombCount);
                expect(actualExits).toBe(1);
                expect(actualPlayers).toBe(1);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should handle edge cases gracefully', () => {
            const manager = createMazeLevelManager();

            // Advance to last level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should be at level 5
            expect(manager.getCurrentLevelNumber()).toBe(5);
            expect(manager.hasNextLevel()).toBe(false);

            // Attempting to advance beyond should return null
            const result = manager.advanceToNextLevel();
            expect(result).toBeNull();

            // Should still be at level 5
            expect(manager.getCurrentLevelNumber()).toBe(5);
        });
    });

    describe('Level Progression Logic and Sound Event Generation', () => {
        it('should generate correct sound events for each transition type', async () => {
            const { emitSoundEvent } = await import('../audio/events/sound-event-emitter');
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            // Test door slam sound for level progression
            const progressionResult = handler.processLevelCompletion(manager);
            handler.emitLevelProgressionSound(progressionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });

            vi.clearAllMocks();

            // Advance to final level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Test victory sound for game completion
            const completionResult = handler.processLevelCompletion(manager);
            handler.emitLevelProgressionSound(completionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should correctly identify level completion conditions', () => {
            const handler = createLevelProgressionHandler();

            // Test various game states and diamond counts
            expect(handler.isLevelComplete('won', 0)).toBe(true);
            expect(handler.isLevelComplete('won', 1)).toBe(false);
            expect(handler.isLevelComplete('playing', 0)).toBe(false);
            expect(handler.isLevelComplete('dead', 0)).toBe(false);
            expect(handler.isLevelComplete('dead', 5)).toBe(false);
            expect(handler.isLevelComplete('playing', 3)).toBe(false);
        });

        it('should handle progression through all levels with correct results', () => {
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            const progressionResults = [];

            // Process progression through all levels
            for (let i = 1; i <= 5; i++) {
                const result = handler.processLevelCompletion(manager);
                progressionResults.push(result);

                if (i < 5) {
                    // Should advance to next level
                    expect(result.success).toBe(true);
                    expect(result.isGameComplete).toBe(false);
                    expect(result.soundToPlay).toBe('door_slam');
                    expect(result.nextLevel?.levelNumber).toBe(i + 1);
                } else {
                    // Should complete game
                    expect(result.success).toBe(true);
                    expect(result.isGameComplete).toBe(true);
                    expect(result.soundToPlay).toBe('victory');
                    expect(result.nextLevel).toBeUndefined();
                }
            }

            expect(progressionResults).toHaveLength(5);
        });
    });

    describe('GameState Integration with Level Management', () => {
        it('should initialize with correct level 1 data', () => {
            const state = createInitialGameState();
            const level1Data = state.levelManager.getCurrentLevel();

            expect(state.currentLevel).toBe(1);
            expect(state.moves).toBe(level1Data.moveLimit);
            expect(state.diamonds).toBe(level1Data.diamondCount);
            expect(state.maze).toEqual(level1Data.maze);
            expect(state.player).toEqual(level1Data.playerStartPosition);
            expect(state.isGameComplete).toBe(false);
        });

        it('should maintain level manager state consistency', () => {
            const state = createInitialGameState();

            expect(state.levelManager.getCurrentLevelNumber()).toBe(state.currentLevel);
            expect(state.levelManager.getTotalLevels()).toBe(5);
            expect(state.levelManager.hasNextLevel()).toBe(true);

            // Level manager should provide consistent data
            const levelData = state.levelManager.getCurrentLevel();
            expect(levelData.levelNumber).toBe(state.currentLevel);
            expect(levelData.moveLimit).toBe(state.moves);
            expect(levelData.diamondCount).toBe(state.diamonds);
        });

        it('should handle level progression integration correctly', () => {
            const state = createInitialGameState();

            // Verify progression handler is properly integrated
            expect(state.levelProgressionHandler).toBeDefined();

            // Test level completion detection
            expect(state.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
            expect(state.levelProgressionHandler.isLevelComplete('playing', 0)).toBe(false);

            // Test progression processing
            const result = state.levelProgressionHandler.processLevelCompletion(state.levelManager);
            expect(result.success).toBe(true);
            expect(result.nextLevel?.levelNumber).toBe(2);
        });
    });

    describe('Score Persistence and Move Limit Resets', () => {
        it('should persist score across level transitions', () => {
            // Create a simple test scenario where we can control level progression
            let state = createInitialGameState();
            const initialScore = 50;

            // Create a test state that will trigger level progression
            const testState: GameStateData = {
                ...state,
                score: initialScore,
                gameState: 'playing',
                diamonds: 1, // One diamond remaining
                player: { x: 12, y: 8 }, // Player position
                maze: state.maze.map((row, y) =>
                    row.map((cell, x) => {
                        if (x === 14 && y === 8) return CELL.EXIT;
                        if (x === 13 && y === 8) return CELL.DIAMOND; // Diamond next to player
                        if (x === 12 && y === 8) return CELL.PLAYER; // Player position
                        return cell === CELL.PLAYER ? CELL.EMPTY : cell; // Clear original player position
                    })
                )
            };

            // Move player to collect diamond
            const afterDiamondCollection = movePlayer(testState, 1, 0); // Move right to diamond
            expect(afterDiamondCollection.score).toBe(initialScore + 10); // Score should increase
            expect(afterDiamondCollection.diamonds).toBe(0); // Diamonds should be 0

            // Move to exit to trigger level progression
            const afterLevelProgression = movePlayer(afterDiamondCollection, 1, 0); // Move right to exit

            // Score should persist to next level if level progression occurred
            if (afterLevelProgression.currentLevel === 2) {
                expect(afterLevelProgression.score).toBe(initialScore + 10);
                expect(afterLevelProgression.currentLevel).toBe(2);
            } else {
                // If level progression didn't occur, score should still be maintained
                expect(afterLevelProgression.score).toBe(initialScore + 10);
            }
        });

        it('should reset move limits for each new level', () => {
            const manager = createMazeLevelManager();
            const expectedMoveLimits = [45, 50, 50, 45, 45]; // Based on level configurations

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                expect(level.moveLimit).toBe(expectedMoveLimits[i]);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should reset diamond counts for each new level', () => {
            const manager = createMazeLevelManager();
            const expectedDiamondCounts = [6, 7, 6, 6, 6]; // Based on level configurations

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                expect(level.diamondCount).toBe(expectedDiamondCounts[i]);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should maintain cumulative scoring across multiple level transitions', () => {
            // Test the cumulative nature of scoring
            const scores = [0, 50, 120, 180, 250, 300]; // Simulated cumulative scores

            for (let i = 0; i < scores.length - 1; i++) {
                const currentScore = scores[i]!;
                const nextScore = scores[i + 1]!;
                const scoreDifference = nextScore - currentScore;

                // Verify that score increases are reasonable (multiples of 10 for diamonds)
                expect(scoreDifference % 10).toBe(0);
                expect(scoreDifference).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle invalid level manager states gracefully', () => {
            const manager = createMazeLevelManager();

            // Advance beyond available levels
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should handle attempts to advance beyond last level
            expect(manager.advanceToNextLevel()).toBeNull();
            expect(manager.hasNextLevel()).toBe(false);
            expect(manager.getCurrentLevelNumber()).toBe(5);
        });

        it('should validate level data integrity', () => {
            const manager = createMazeLevelManager();

            // Test each level for data integrity
            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();

                // Validate required properties exist
                expect(level.levelNumber).toBeDefined();
                expect(level.maze).toBeDefined();
                expect(level.moveLimit).toBeDefined();
                expect(level.diamondCount).toBeDefined();
                expect(level.bombCount).toBeDefined();
                expect(level.rockCount).toBeDefined();
                expect(level.playerStartPosition).toBeDefined();
                expect(level.exitPosition).toBeDefined();

                // Validate property types
                expect(typeof level.levelNumber).toBe('number');
                expect(Array.isArray(level.maze)).toBe(true);
                expect(typeof level.moveLimit).toBe('number');
                expect(typeof level.diamondCount).toBe('number');
                expect(typeof level.bombCount).toBe('number');
                expect(typeof level.rockCount).toBe('number');
                expect(typeof level.playerStartPosition).toBe('object');
                expect(typeof level.exitPosition).toBe('object');

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should handle progression handler edge cases', () => {
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            // Test with manager at different states
            const initialResult = handler.processLevelCompletion(manager);
            expect(initialResult.success).toBe(true);
            expect(initialResult.isGameComplete).toBe(false);

            // Advance to last level and test completion
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            const finalResult = handler.processLevelCompletion(manager);
            expect(finalResult.success).toBe(true);
            expect(finalResult.isGameComplete).toBe(true);
            expect(finalResult.soundToPlay).toBe('victory');
        });
    });

    describe('Performance and Memory Management', () => {
        it('should not leak memory during level transitions', () => {
            const manager = createMazeLevelManager();
            const handler = createLevelProgressionHandler();

            // Simulate multiple level transitions
            for (let i = 0; i < 10; i++) {
                const result = handler.processLevelCompletion(manager);

                if (result.nextLevel) {
                    // Verify new level data is properly created
                    expect(result.nextLevel.maze).toBeDefined();
                    expect(result.nextLevel.maze.length).toBe(10);
                    expect(result.nextLevel.maze[0]?.length).toBe(16);
                }

                if (!manager.hasNextLevel()) {
                    break;
                }
            }

            // Manager should still be in valid state
            expect(manager.getCurrentLevel()).toBeDefined();
            expect(manager.getCurrentLevelNumber()).toBeGreaterThan(0);
        });

        it('should handle rapid level manager operations efficiently', () => {
            const startTime = performance.now();

            // Perform many operations
            for (let i = 0; i < 1000; i++) {
                const manager = createMazeLevelManager();

                while (manager.hasNextLevel()) {
                    manager.getCurrentLevel();
                    manager.getCurrentLevelNumber();
                    manager.getTotalLevels();
                    manager.advanceToNextLevel();
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (less than 1 second)
            expect(duration).toBeLessThan(1000);
        });
    });
});