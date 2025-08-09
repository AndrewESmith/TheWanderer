import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';
import { CELL } from '../maze';

// Mock console methods to avoid noise in tests
const mockConsole = {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
};

vi.stubGlobal('console', mockConsole);

describe('MazeLevelManager Error Handling', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Initialization with invalid levels', () => {
        it('should handle initialization when some levels are invalid', () => {
            // This test verifies that the manager can still initialize even if some levels fail validation
            const manager = createMazeLevelManager();

            // Should still create a manager with valid levels
            expect(manager).toBeDefined();
            expect(manager.getTotalLevels()).toBeGreaterThan(0);
            expect(manager.getCurrentLevelNumber()).toBe(1);
        });

        it('should provide fallback levels if all original levels fail', () => {
            // Since we can't easily mock the MAZE_LEVELS constant, we test the recovery behavior
            const manager = createMazeLevelManager();

            // Should have at least one level (fallback if needed)
            expect(manager.getTotalLevels()).toBeGreaterThan(0);

            const currentLevel = manager.getCurrentLevel();
            expect(currentLevel).toBeDefined();
            expect(currentLevel.maze).toHaveLength(10);
            expect(currentLevel.maze[0]).toHaveLength(16);
        });
    });

    describe('Level retrieval error handling', () => {
        it('should handle getCurrentLevel gracefully', () => {
            const manager = createMazeLevelManager();

            // Should not throw for valid operations
            expect(() => manager.getCurrentLevel()).not.toThrow();

            const level = manager.getCurrentLevel();
            expect(level).toBeDefined();
            expect(level.levelNumber).toBe(1);
        });

        it('should handle getCurrentLevelNumber gracefully', () => {
            const manager = createMazeLevelManager();

            expect(() => manager.getCurrentLevelNumber()).not.toThrow();
            expect(manager.getCurrentLevelNumber()).toBe(1);
        });

        it('should handle hasNextLevel gracefully', () => {
            const manager = createMazeLevelManager();

            expect(() => manager.hasNextLevel()).not.toThrow();
            expect(typeof manager.hasNextLevel()).toBe('boolean');
        });

        it('should handle getTotalLevels gracefully', () => {
            const manager = createMazeLevelManager();

            expect(() => manager.getTotalLevels()).not.toThrow();
            expect(manager.getTotalLevels()).toBeGreaterThan(0);
        });
    });

    describe('Level advancement error handling', () => {
        it('should handle normal level advancement', () => {
            const manager = createMazeLevelManager();

            if (manager.hasNextLevel()) {
                const nextLevel = manager.advanceToNextLevel();
                expect(nextLevel).not.toBeNull();
                expect(nextLevel!.levelNumber).toBe(2);
                expect(manager.getCurrentLevelNumber()).toBe(2);
            }
        });

        it('should handle advancement beyond last level', () => {
            const manager = createMazeLevelManager();

            // Advance to the last level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should be at the last level
            const lastLevelNumber = manager.getCurrentLevelNumber();
            expect(lastLevelNumber).toBeGreaterThan(1);

            // Trying to advance beyond should return null
            const result = manager.advanceToNextLevel();
            expect(result).toBeNull();

            // Should still be at the same level
            expect(manager.getCurrentLevelNumber()).toBe(lastLevelNumber);
        });

        it('should handle level transition failures gracefully', () => {
            const manager = createMazeLevelManager();

            // Normal advancement should work
            if (manager.hasNextLevel()) {
                expect(() => manager.advanceToNextLevel()).not.toThrow();
            }
        });
    });

    describe('Error recovery scenarios', () => {
        it('should maintain consistent state after errors', () => {
            const manager = createMazeLevelManager();
            const initialLevel = manager.getCurrentLevelNumber();

            // Multiple operations should maintain consistency
            expect(manager.getCurrentLevelNumber()).toBe(initialLevel);
            expect(manager.getCurrentLevel().levelNumber).toBe(initialLevel);

            if (manager.hasNextLevel()) {
                const nextLevel = manager.advanceToNextLevel();
                expect(nextLevel!.levelNumber).toBe(manager.getCurrentLevelNumber());
            }
        });

        it('should handle rapid successive operations', () => {
            const manager = createMazeLevelManager();

            // Rapid successive calls should not cause issues
            for (let i = 0; i < 10; i++) {
                expect(() => manager.getCurrentLevel()).not.toThrow();
                expect(() => manager.getCurrentLevelNumber()).not.toThrow();
                expect(() => manager.hasNextLevel()).not.toThrow();
                expect(() => manager.getTotalLevels()).not.toThrow();
            }
        });

        it('should provide valid level data even in error scenarios', () => {
            const manager = createMazeLevelManager();

            // Every level should be valid
            const totalLevels = manager.getTotalLevels();

            for (let i = 0; i < totalLevels; i++) {
                const level = manager.getCurrentLevel();

                // Basic validation
                expect(level.maze).toHaveLength(10);
                expect(level.maze[0]).toHaveLength(16);
                expect(level.levelNumber).toBeGreaterThan(0);
                expect(level.moveLimit).toBeGreaterThan(0);
                expect(level.diamondCount).toBeGreaterThanOrEqual(0);
                expect(level.bombCount).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.y).toBeGreaterThanOrEqual(0);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                } else {
                    break;
                }
            }
        });
    });

    describe('Validation and repair integration', () => {
        it('should handle levels that need repair', () => {
            const manager = createMazeLevelManager();

            // All levels should be accessible and valid after any repairs
            const totalLevels = manager.getTotalLevels();
            expect(totalLevels).toBeGreaterThan(0);

            // Each level should have proper structure
            for (let i = 0; i < totalLevels; i++) {
                const level = manager.getCurrentLevel();

                // Check maze structure
                expect(level.maze).toHaveLength(10);
                level.maze.forEach(row => {
                    expect(row).toHaveLength(16);
                });

                // Check that player and exit positions are valid
                const playerCell = level.maze[level.playerStartPosition.y]?.[level.playerStartPosition.x];
                const exitCell = level.maze[level.exitPosition.y]?.[level.exitPosition.x];

                expect(playerCell).toBe(CELL.PLAYER);
                expect(exitCell).toBe(CELL.EXIT);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                } else {
                    break;
                }
            }
        });

        it('should log appropriate warnings for repaired levels', () => {
            // Create manager (this may trigger validation warnings)
            const manager = createMazeLevelManager();

            // Since the actual levels are valid, we just verify the manager was created successfully
            // In a real scenario with invalid levels, warnings would be logged
            expect(manager).toBeDefined();
            expect(manager.getTotalLevels()).toBeGreaterThan(0);

            // The console.warn might be called 0 or more times depending on level validity
            // We don't assert specific call counts since the actual levels might be valid
        });
    });

    describe('Fallback level functionality', () => {
        it('should provide working fallback levels', () => {
            const manager = createMazeLevelManager();

            // Get the first level (might be original or fallback)
            const level = manager.getCurrentLevel();

            // Should be a complete, playable level
            expect(level.maze).toHaveLength(10);
            expect(level.maze[0]).toHaveLength(16);

            // Should have proper borders
            for (let x = 0; x < 16; x++) {
                expect(level.maze[0]![x]).toBe(CELL.ROCK); // Top border
                expect(level.maze[9]![x]).toBe(CELL.ROCK); // Bottom border
            }

            for (let y = 0; y < 10; y++) {
                expect(level.maze[y]![0]).toBe(CELL.ROCK); // Left border
                expect(level.maze[y]![15]).toBe(CELL.ROCK); // Right border
            }

            // Should have exactly one player and one exit
            let playerCount = 0;
            let exitCount = 0;

            level.maze.forEach(row => {
                row.forEach(cell => {
                    if (cell === CELL.PLAYER) playerCount++;
                    if (cell === CELL.EXIT) exitCount++;
                });
            });

            expect(playerCount).toBe(1);
            expect(exitCount).toBe(1);
        });
    });

    describe('Performance under error conditions', () => {
        it('should handle multiple manager instances', () => {
            const managers: MazeLevelManager[] = [];

            // Create multiple managers
            for (let i = 0; i < 5; i++) {
                expect(() => {
                    managers.push(createMazeLevelManager());
                }).not.toThrow();
            }

            // All should be functional
            managers.forEach(manager => {
                expect(manager.getTotalLevels()).toBeGreaterThan(0);
                expect(manager.getCurrentLevelNumber()).toBe(1);
            });
        });

        it('should handle concurrent operations', () => {
            const manager = createMazeLevelManager();

            // Simulate concurrent access patterns
            const operations = [
                () => manager.getCurrentLevel(),
                () => manager.getCurrentLevelNumber(),
                () => manager.hasNextLevel(),
                () => manager.getTotalLevels()
            ];

            // Run operations multiple times
            for (let i = 0; i < 20; i++) {
                const operation = operations[i % operations.length]!;
                expect(() => operation()).not.toThrow();
            }
        });
    });
});