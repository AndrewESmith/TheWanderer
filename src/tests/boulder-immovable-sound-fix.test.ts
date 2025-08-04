import { describe, it, expect } from 'vitest';
import { CELL, type MazeCell } from '../maze';
import { identifyTriggeredBoulders, createBoulderStateManager } from '../physics/boulder-state-manager';
import type { Position } from '../physics/boulder-state-manager';

describe('Boulder Immovable Sound Fix', () => {
    describe('identifyTriggeredBoulders with maze context', () => {
        it('should not trigger boulders that cannot move (blocked by rock below)', () => {
            // Create a maze where boulder at (1,1) cannot fall because there's rock below
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.ROCK, CELL.EMPTY], // Rock directly below boulder
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the boulder
            const previousPlayerPosition: Position = { x: 0, y: 3 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 0 }; // Adjacent to boulder

            // Without maze context, boulder would be triggered
            const triggeredWithoutMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager
                // No maze parameter
            );
            expect(triggeredWithoutMaze).toHaveLength(1);
            expect(triggeredWithoutMaze[0]).toEqual({ x: 1, y: 1 });

            // With maze context, boulder should NOT be triggered because it can't move
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(0); // No boulders should be triggered
        });

        it('should trigger boulders that can move (empty space below)', () => {
            // Create a maze where boulder at (1,1) can fall because there's empty space below
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY], // Empty space below boulder
                [CELL.EMPTY, CELL.ROCK, CELL.EMPTY]   // Rock at bottom
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the boulder
            const previousPlayerPosition: Position = { x: 0, y: 3 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 0 }; // Adjacent to boulder

            // With maze context, boulder should be triggered because it can move
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(1);
            expect(triggeredWithMaze[0]).toEqual({ x: 1, y: 1 });
        });

        it('should not trigger boulders blocked by other boulders', () => {
            // Create a maze where boulder at (1,1) cannot fall because there's another boulder below
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY], // Another boulder directly below
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the top boulder
            const previousPlayerPosition: Position = { x: 0, y: 3 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 0 }; // Adjacent to top boulder

            // With maze context, top boulder should NOT be triggered because it can't move
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(0); // No boulders should be triggered
        });

        it('should trigger boulders that can fall onto soil', () => {
            // Create a maze where boulder at (1,1) can fall onto soil
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.SOIL, CELL.EMPTY], // Soil below boulder (boulder can fall onto it)
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the boulder
            const previousPlayerPosition: Position = { x: 0, y: 3 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 0 }; // Adjacent to boulder

            // With maze context, boulder should be triggered because it can move (fall onto soil)
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(1);
            expect(triggeredWithMaze[0]).toEqual({ x: 1, y: 1 });
        });

        it('should trigger boulders that can fall onto player (special collision)', () => {
            // Create a maze where boulder at (1,1) can fall onto player
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.PLAYER, CELL.EMPTY], // Player below boulder (boulder can fall onto player)
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the boulder
            const previousPlayerPosition: Position = { x: 0, y: 3 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 0 }; // Adjacent to boulder

            // With maze context, boulder should be triggered because it can move (fall onto player)
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(1);
            expect(triggeredWithMaze[0]).toEqual({ x: 1, y: 1 });
        });

        it('should trigger boulders that can fall onto bomb (special collision)', () => {
            // Create a maze where boulder at (1,1) can fall onto bomb
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOMB, CELL.EMPTY], // Bomb below boulder (boulder can fall onto bomb)
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the boulder
            const previousPlayerPosition: Position = { x: 0, y: 3 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 0 }; // Adjacent to boulder

            // With maze context, boulder should be triggered because it can move (fall onto bomb)
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(1);
            expect(triggeredWithMaze[0]).toEqual({ x: 1, y: 1 });
        });

        it('should handle multiple boulders with mixed movability', () => {
            // Create a maze with multiple boulders - some can move, some cannot
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY], // Rock blocks first boulder, second can fall
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.EMPTY]
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves to position adjacent to both boulders
            const previousPlayerPosition: Position = { x: 0, y: 0 }; // Far from boulders (not adjacent)
            const currentPlayerPosition: Position = { x: 2, y: 1 }; // Adjacent to both boulders

            // With maze context, only the movable boulder should be triggered
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(1);
            expect(triggeredWithMaze[0]).toEqual({ x: 3, y: 1 }); // Only the second boulder (can move)
        });

        it('should handle edge case where boulder is at bottom of maze', () => {
            // Create a maze where boulder is at the bottom edge
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY] // Boulder at bottom row
            ];

            const boulderStateManager = createBoulderStateManager(maze);

            // Player moves from far away to adjacent to the boulder
            const previousPlayerPosition: Position = { x: 0, y: 0 }; // Far from boulder (not adjacent)
            const currentPlayerPosition: Position = { x: 1, y: 1 }; // Adjacent to boulder

            // With maze context, boulder should NOT be triggered because it's at the bottom
            const triggeredWithMaze = identifyTriggeredBoulders(
                previousPlayerPosition,
                currentPlayerPosition,
                boulderStateManager,
                maze
            );
            expect(triggeredWithMaze).toHaveLength(0); // No boulders should be triggered
        });
    });
});