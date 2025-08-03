import { describe, it, expect } from 'vitest';
import { createInitialGameState, createGameState } from '../GameState';

describe('GameState Level Integration', () => {
    it('should initialize with level 1 from MazeLevelManager', () => {
        const gameState = createInitialGameState();

        expect(gameState.currentLevel).toBe(1);
        expect(gameState.levelManager).toBeDefined();
        expect(gameState.isGameComplete).toBe(false);
        expect(gameState.levelManager.getCurrentLevelNumber()).toBe(1);
        expect(gameState.levelManager.getTotalLevels()).toBe(5);
    });

    it('should expose level properties through IGameState interface', () => {
        const gameState = createGameState();

        expect(gameState.currentLevel).toBe(1);
        expect(gameState.levelManager).toBeDefined();
        expect(gameState.isGameComplete).toBe(false);
        expect(gameState.levelManager.hasNextLevel()).toBe(true);
    });

    it('should use level 1 maze and move limit from MazeLevelManager', () => {
        const gameState = createInitialGameState();
        const levelData = gameState.levelManager.getCurrentLevel();

        // Should use the move limit from level 1 (55 moves)
        expect(gameState.moves).toBe(levelData.moveLimit);
        expect(gameState.moves).toBe(55);

        // Should use the maze from level 1
        expect(gameState.maze).toEqual(levelData.maze);
    });

    it('should maintain score persistence capability', () => {
        const gameState = createInitialGameState();

        // Score should start at 0 for persistence across levels
        expect(gameState.score).toBe(0);

        // Should have the structure needed for level transitions
        expect(gameState.currentLevel).toBeDefined();
        expect(gameState.levelManager).toBeDefined();
        expect(gameState.isGameComplete).toBeDefined();
    });
});