import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import { simulatePhysicsStepWithState } from '../physics/physics-engine';
import { createBoulderStateManager, updateBoulderTriggers } from '../physics/boulder-state-manager';
import { movePlayer, type GameStateData } from '../GameState';
import { emitSoundEvents } from '../audio/events/sound-event-emitter';
import { handleGameEndSounds } from '../audio/events/game-end-sound-manager';

// Mock the sound system
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvents: vi.fn(),
    emitSoundEvent: vi.fn()
}));

vi.mock('../audio/events/game-end-sound-manager', () => ({
    handleGameEndSounds: vi.fn()
}));

describe('Boulder Player Death', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Physics simulation player collision detection', () => {
        it('should detect player collision when boulder falls on player', () => {
            // Create simple maze with boulder above player
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.PLAYER]
            ];

            // Create boulder state manager and trigger the boulder
            let boulderStateManager = createBoulderStateManager(maze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 0, y: 0 }], // Trigger boulder at (0,0)
                2 // Trigger for move 2
            );

            // Simulate physics on move 3 (boulder triggered on move 2 should start moving on move 3)
            const result = simulatePhysicsStepWithState(maze, boulderStateManager, 3);

            // Should detect player collision
            expect(result.playerCollisions).toHaveLength(1);
            expect(result.playerCollisions[0]).toEqual({ x: 0, y: 1 });

            // Should generate death sound
            const deathSounds = result.soundEvents.filter(event => event.type === 'death');
            expect(deathSounds).toHaveLength(1);
            expect(deathSounds[0]?.source).toBe('boulder');
        });

        it('should place boulder at player position after collision', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.PLAYER]
            ];

            let boulderStateManager = createBoulderStateManager(maze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 0, y: 0 }],
                2 // Trigger for move 2
            );

            const result = simulatePhysicsStepWithState(maze, boulderStateManager, 3);

            // Boulder should be at player position
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER);
            // Original boulder position should be empty
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY);
        });
    });

    describe('Game state integration', () => {
        function createTestGameState(
            maze: MazeCell[][],
            moves: number = 10,
            diamonds: number = 0,
            gameState: 'playing' | 'dead' | 'won' = 'playing'
        ): GameStateData {
            const mazeCopy = maze.map(row => [...row]);
            const boulderStateManager = createBoulderStateManager(mazeCopy, moves);

            return {
                maze: mazeCopy,
                player: { x: 0, y: 1 }, // Default player position
                score: 0,
                moves,
                diamonds,
                gameState,
                boulderStateManager,
                movementConstraint: {
                    isPlayerMovementBlocked: false,
                    blockingReason: 'none'
                }
            };
        }

        it('should kill player when boulder collision is detected in physics', () => {
            // Create a test case where player moves into the path of a falling boulder
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.BOULDER],
                [CELL.PLAYER, CELL.EMPTY]
            ];

            const gameState = createTestGameState(maze, 10);

            // Set boulder as triggered so it will start moving
            gameState.boulderStateManager = updateBoulderTriggers(
                gameState.boulderStateManager,
                [{ x: 1, y: 0 }],
                8 // Trigger for move 8 so it starts moving on move 9
            );

            // Move player right into the path where boulder will fall
            const afterMove = movePlayer(gameState, 1, 0); // Move right to (1,1)

            // Player should die from boulder collision
            expect(afterMove.gameState).toBe('dead');
            expect(handleGameEndSounds).toHaveBeenCalledWith('dead');

            // Boulder should be at player's position
            expect(afterMove.maze[1]![1]).toBe(CELL.BOULDER);
        });

        it('should kill player when boulder falls one space to hit player', () => {
            // Create a test case with boulder falling one space to hit player
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.PLAYER, CELL.EMPTY, CELL.EMPTY]
            ];

            const gameState = createTestGameState(maze, 10);
            gameState.player = { x: 0, y: 1 };

            // Trigger boulder to fall
            gameState.boulderStateManager = updateBoulderTriggers(
                gameState.boulderStateManager,
                [{ x: 1, y: 0 }],
                8 // Trigger for move 8 so it starts moving on move 9
            );

            // Move player into boulder's path
            const afterMove = movePlayer(gameState, 1, 0); // Move right to (1,1)

            // Player should die from boulder collision
            expect(afterMove.gameState).toBe('dead');
            expect(handleGameEndSounds).toHaveBeenCalledWith('dead');
        });

        it('should generate death sound when boulder kills player', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.BOULDER],
                [CELL.PLAYER, CELL.EMPTY]
            ];

            const gameState = createTestGameState(maze, 10);

            gameState.boulderStateManager = updateBoulderTriggers(
                gameState.boulderStateManager,
                [{ x: 1, y: 0 }],
                8 // Trigger for move 8 so it starts moving on move 9
            );

            const afterMove = movePlayer(gameState, 1, 0);

            expect(afterMove.gameState).toBe('dead');
            expect(handleGameEndSounds).toHaveBeenCalledWith('dead');
        });

        it('should not kill player if no boulder collision occurs', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.PLAYER]
            ];

            const gameState = createTestGameState(maze, 10);
            gameState.player = { x: 1, y: 1 };

            // Move player without triggering boulder
            const afterMove = movePlayer(gameState, -1, 0); // Move left

            // Player should still be alive
            expect(afterMove.gameState).toBe('playing');
            expect(handleGameEndSounds).not.toHaveBeenCalled();
        });
    });
});