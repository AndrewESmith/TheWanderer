import { describe, it, expect } from 'vitest';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import { CELL } from '../maze';

describe('MazeLevelManager', () => {
    it('should initialize with level 1', () => {
        const manager = createMazeLevelManager();

        const currentLevel = manager.getCurrentLevel();
        expect(currentLevel.levelNumber).toBe(1);
        expect(currentLevel.moveLimit).toBe(55);
        expect(currentLevel.diamondCount).toBe(5);
        expect(currentLevel.bombCount).toBe(2);
        expect(currentLevel.playerStartPosition).toEqual({ x: 1, y: 3 });
        expect(currentLevel.exitPosition).toEqual({ x: 14, y: 8 });
    });

    it('should return correct total levels count', () => {
        const manager = createMazeLevelManager();
        expect(manager.getTotalLevels()).toBe(5);
    });

    it('should return current level number', () => {
        const manager = createMazeLevelManager();
        expect(manager.getCurrentLevelNumber()).toBe(1);
    });

    it('should detect if next level exists', () => {
        const manager = createMazeLevelManager();
        expect(manager.hasNextLevel()).toBe(true);
    });

    it('should advance to next level correctly', () => {
        const manager = createMazeLevelManager();

        // Advance to level 2
        const level2 = manager.advanceToNextLevel();
        expect(level2).not.toBeNull();
        expect(level2!.levelNumber).toBe(2);
        expect(manager.getCurrentLevelNumber()).toBe(2);

        // Advance to level 3
        const level3 = manager.advanceToNextLevel();
        expect(level3).not.toBeNull();
        expect(level3!.levelNumber).toBe(3);
        expect(manager.getCurrentLevelNumber()).toBe(3);
    });

    it('should return null when trying to advance beyond last level', () => {
        const manager = createMazeLevelManager();

        // Advance through all levels
        manager.advanceToNextLevel(); // Level 2
        manager.advanceToNextLevel(); // Level 3
        manager.advanceToNextLevel(); // Level 4
        manager.advanceToNextLevel(); // Level 5

        expect(manager.getCurrentLevelNumber()).toBe(5);
        expect(manager.hasNextLevel()).toBe(false);

        // Try to advance beyond last level
        const nextLevel = manager.advanceToNextLevel();
        expect(nextLevel).toBeNull();
        expect(manager.getCurrentLevelNumber()).toBe(5); // Should stay at level 5
    });

    it('should validate maze dimensions are 16x10', () => {
        const manager = createMazeLevelManager();

        for (let i = 0; i < manager.getTotalLevels(); i++) {
            const level = manager.getCurrentLevel();
            expect(level.maze.length).toBe(10); // Height
            expect(level.maze[0]!.length).toBe(16); // Width

            // Check all rows have consistent width
            level.maze.forEach(row => {
                expect(row.length).toBe(16);
            });

            if (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }
        }
    });

    it('should have exactly one exit per level', () => {
        const manager = createMazeLevelManager();

        for (let i = 0; i < manager.getTotalLevels(); i++) {
            const level = manager.getCurrentLevel();
            let exitCount = 0;

            level.maze.forEach(row => {
                row.forEach(cell => {
                    if (cell === CELL.EXIT) {
                        exitCount++;
                    }
                });
            });

            expect(exitCount).toBe(1);

            if (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }
        }
    });

    it('should have correct diamond counts per level', () => {
        const manager = createMazeLevelManager();

        for (let i = 0; i < manager.getTotalLevels(); i++) {
            const level = manager.getCurrentLevel();
            let diamondCount = 0;

            level.maze.forEach(row => {
                row.forEach(cell => {
                    if (cell === CELL.DIAMOND) {
                        diamondCount++;
                    }
                });
            });

            expect(diamondCount).toBe(level.diamondCount);

            if (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }
        }
    });

    it('should have correct bomb counts per level', () => {
        const manager = createMazeLevelManager();

        for (let i = 0; i < manager.getTotalLevels(); i++) {
            const level = manager.getCurrentLevel();
            let bombCount = 0;

            level.maze.forEach(row => {
                row.forEach(cell => {
                    if (cell === CELL.BOMB) {
                        bombCount++;
                    }
                });
            });

            expect(bombCount).toBe(level.bombCount);

            if (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }
        }
    });

    it('should have player at correct start position', () => {
        const manager = createMazeLevelManager();

        for (let i = 0; i < manager.getTotalLevels(); i++) {
            const level = manager.getCurrentLevel();
            const { x, y } = level.playerStartPosition;

            expect(level.maze[y]![x]).toBe(CELL.PLAYER);

            if (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }
        }
    });

    it('should have exit at correct position', () => {
        const manager = createMazeLevelManager();

        for (let i = 0; i < manager.getTotalLevels(); i++) {
            const level = manager.getCurrentLevel();
            const { x, y } = level.exitPosition;

            expect(level.maze[y]![x]).toBe(CELL.EXIT);

            if (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }
        }
    });
});