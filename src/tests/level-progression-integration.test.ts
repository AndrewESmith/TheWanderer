import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGameState, movePlayer } from '../GameState';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn()
}));

describe('Level Progression Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should progress from level 1 to level 2 when player completes level', () => {
        // Create a simple test maze with correct dimensions (10x16) for level completion
        const testMaze: MazeCell[][] = [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1: Player and path to exit
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Rows 2-8: Fill with rocks and empty spaces
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];

        const gameState = createGameState({ maze: testMaze });

        // Verify initial state
        expect(gameState.currentLevel).toBe(1);
        expect(gameState.isGameComplete).toBe(false);
        expect(gameState.gameState).toBe('playing');
        expect(gameState.diamonds).toBe(0); // No diamonds in test maze

        // Move player to exit (move right across the row)
        for (let i = 0; i < 13; i++) {
            gameState.movePlayer(1, 0); // Move right
            expect(gameState.gameState).toBe('playing');
        }

        // Final move to exit
        gameState.movePlayer(1, 0); // Move right to exit

        // After reaching exit with no diamonds, should advance to next level
        expect(gameState.gameState).toBe('playing'); // Reset to playing for new level
        expect(gameState.currentLevel).toBe(2); // Advanced to level 2
        expect(gameState.isGameComplete).toBe(false);

        // Score should be maintained
        expect(gameState.score).toBe(0); // No diamonds collected

        // Should have new maze from level 2
        expect(gameState.maze).not.toEqual(testMaze);

        // Should have level 2's move limit (45 - 1 for the final move to exit)
        expect(gameState.moves).toBe(44); // Level 2 move limit minus the final move
    });

    it('should complete game when reaching final level', () => {
        const gameState = createGameState();

        // Simulate completing all levels by advancing the level manager
        // Level 1 -> 2
        gameState.levelManager.advanceToNextLevel();
        // Level 2 -> 3
        gameState.levelManager.advanceToNextLevel();
        // Level 3 -> 4
        gameState.levelManager.advanceToNextLevel();
        // Level 4 -> 5
        gameState.levelManager.advanceToNextLevel();

        // Now we're at level 5 (final level)
        expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
        expect(gameState.levelManager.hasNextLevel()).toBe(false);

        // Create a simple completion scenario with correct dimensions (10x16)
        const testMaze: MazeCell[][] = [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1: Player and path to exit
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Rows 2-8: Fill with rocks and empty spaces
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];

        const finalGameState = createGameState({ maze: testMaze });

        // Manually set to final level state
        finalGameState.levelManager.advanceToNextLevel();
        finalGameState.levelManager.advanceToNextLevel();
        finalGameState.levelManager.advanceToNextLevel();
        finalGameState.levelManager.advanceToNextLevel();

        // Move to exit (move right across the row)
        for (let i = 0; i < 13; i++) {
            finalGameState.movePlayer(1, 0); // Move right
        }
        finalGameState.movePlayer(1, 0); // Final move to exit

        // Should complete the game since we're on the final level
        expect(finalGameState.isGameComplete).toBe(true);
    });

    it('should maintain score across level transitions', () => {
        // Create a test maze with diamonds with correct dimensions (10x16)
        const testMaze: MazeCell[][] = [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1: Player, diamonds, and path to exit
            [CELL.ROCK, CELL.PLAYER, CELL.DIAMOND, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Rows 2-8: Fill with rocks and empty spaces
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];

        const gameState = createGameState({ maze: testMaze });

        // Collect diamonds
        gameState.movePlayer(1, 0); // Move right to first diamond
        expect(gameState.score).toBe(10);
        expect(gameState.diamonds).toBe(1); // One diamond remaining

        gameState.movePlayer(1, 0); // Move right to second diamond
        expect(gameState.score).toBe(20);
        expect(gameState.diamonds).toBe(0); // All diamonds collected

        const scoreBeforeExit = gameState.score;

        // Move to exit (continue moving right)
        for (let i = 0; i < 11; i++) {
            gameState.movePlayer(1, 0); // Move right
        }
        gameState.movePlayer(1, 0); // Final move to exit

        // Should advance to next level and maintain score
        expect(gameState.currentLevel).toBe(2);
        expect(gameState.score).toBe(scoreBeforeExit); // Score maintained
        expect(gameState.gameState).toBe('playing'); // Reset for new level
    });

    it('should handle level progression with proper sound events', async () => {
        const { emitSoundEvent } = await import('../audio/events/sound-event-emitter');

        const testMaze: MazeCell[][] = [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1: Player and path to exit
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Rows 2-8: Fill with rocks and empty spaces
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];

        const gameState = createGameState({ maze: testMaze });

        // Move to exit (move right across the row)
        for (let i = 0; i < 13; i++) {
            gameState.movePlayer(1, 0); // Move right
        }
        gameState.movePlayer(1, 0); // Final move to exit

        // Should have emitted door slam sound for level progression
        expect(emitSoundEvent).toHaveBeenCalledWith({
            type: 'door_slam',
            source: 'system',
            priority: 'high'
        });
    });

    it('should reset move counter for each new level', () => {
        const testMaze: MazeCell[][] = [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1: Player and path to exit
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            // Rows 2-8: Fill with rocks and empty spaces
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];

        const gameState = createGameState({ maze: testMaze });

        const initialMoves = gameState.moves;

        // Make some moves to reduce move count
        gameState.movePlayer(1, 0); // Move right
        expect(gameState.moves).toBe(initialMoves - 1);

        // Continue moving to exit - the exit is at position 14, so we need 12 more moves to reach it
        for (let i = 0; i < 12; i++) {
            gameState.movePlayer(1, 0); // Move right
            // Check if level progression happened
            if (gameState.currentLevel === 2) {
                // Level progression happened - moves should be reset to level 2's limit
                expect(gameState.moves).toBe(45); // Level 2 move limit
                expect(gameState.currentLevel).toBe(2);
                return; // Test passed, exit early
            }
        }

        // If we get here, level progression didn't happen as expected
        throw new Error('Level progression should have happened during the moves to exit');
    });
});