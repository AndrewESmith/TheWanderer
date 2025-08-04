import { describe, it, expect } from 'vitest';
import { CELL, type MazeCell } from '../maze';
import { simulateEnhancedBoulderFall } from '../physics/collision-detection';
import { simulateGravityWithState } from '../physics/physics-engine';
import { createBoulderStateManager, updateBoulderTriggers } from '../physics/boulder-state-manager';

/**
 * Test suite to verify Requirement 1.4: Boulder Continuous Falling Behavior
 * 
 * REQUIREMENT 1.4: WHEN a boulder is moving THEN it SHALL continue moving downward until it collides with another object
 * 
 * This test suite ensures that boulders do not stop after moving just one space,
 * but continue falling until they hit something solid.
 */
describe('Boulder Continuous Falling - Requirement 1.4', () => {
    describe('Single Boulder Continuous Falling', () => {
        it('should fall through multiple empty spaces until hitting rock', () => {
            // Test maze: Boulder at top, multiple empty spaces, then rock at bottom
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at (0,0)
                [CELL.EMPTY],    // Empty space at (0,1)
                [CELL.EMPTY],    // Empty space at (0,2)
                [CELL.EMPTY],    // Empty space at (0,3)
                [CELL.ROCK]      // Rock at (0,4) - boulder should stop here
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall all the way down to position (0,3) - just above the rock
            expect(result.newPosition).toEqual({ x: 0, y: 3 });

            // Verify maze state: boulder should be at final position
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[2]![0]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[3]![0]).toBe(CELL.BOULDER); // Final position has boulder
            expect(result.newMaze[4]![0]).toBe(CELL.ROCK); // Rock unchanged

            // Should generate movement sound (when falling starts) and collision sound (when hitting rock)
            expect(result.soundEvents).toHaveLength(2);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[0]?.source).toBe('boulder');
            expect(result.soundEvents[1]?.type).toBe('collision');
            expect(result.soundEvents[1]?.source).toBe('boulder');
        });

        it('should fall through multiple empty spaces until hitting soil', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at (0,0)
                [CELL.EMPTY],    // Empty space at (0,1)
                [CELL.EMPTY],    // Empty space at (0,2)
                [CELL.SOIL]      // Soil at (0,3) - boulder should stop here
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall all the way down to position (0,2) - just above the soil
            expect(result.newPosition).toEqual({ x: 0, y: 2 });

            // Verify maze state
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.EMPTY); // Intermediate position empty
            expect(result.newMaze[2]![0]).toBe(CELL.BOULDER); // Final position has boulder
            expect(result.newMaze[3]![0]).toBe(CELL.SOIL); // Soil unchanged

            // Should generate movement and collision sounds
            expect(result.soundEvents).toHaveLength(2);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[1]?.type).toBe('collision');
        });

        it('should fall through multiple empty spaces until hitting another boulder', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Falling boulder at (0,0)
                [CELL.EMPTY],    // Empty space at (0,1)
                [CELL.EMPTY],    // Empty space at (0,2)
                [CELL.BOULDER]   // Stationary boulder at (0,3) - falling boulder should stop here
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall to position (0,2) - just above the other boulder
            expect(result.newPosition).toEqual({ x: 0, y: 2 });

            // Verify maze state
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.EMPTY); // Intermediate position empty
            expect(result.newMaze[2]![0]).toBe(CELL.BOULDER); // Final position has falling boulder
            expect(result.newMaze[3]![0]).toBe(CELL.BOULDER); // Stationary boulder unchanged

            // Should generate movement and collision sounds
            expect(result.soundEvents).toHaveLength(2);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[1]?.type).toBe('collision');
        });

        it('should fall through multiple empty spaces until hitting diamond', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at (0,0)
                [CELL.EMPTY],    // Empty space at (0,1)
                [CELL.EMPTY],    // Empty space at (0,2)
                [CELL.DIAMOND]   // Diamond at (0,3) - boulder should stop here
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall to position (0,2) - just above the diamond
            expect(result.newPosition).toEqual({ x: 0, y: 2 });

            // Verify maze state
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.EMPTY); // Intermediate position empty
            expect(result.newMaze[2]![0]).toBe(CELL.BOULDER); // Final position has boulder
            expect(result.newMaze[3]![0]).toBe(CELL.DIAMOND); // Diamond unchanged

            // Should generate movement and collision sounds
            expect(result.soundEvents).toHaveLength(2);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[1]?.type).toBe('collision');
        });
    });

    describe('Special Collision Cases', () => {
        it('should fall through empty spaces and kill player on collision', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at (0,0)
                [CELL.EMPTY],    // Empty space at (0,1)
                [CELL.EMPTY],    // Empty space at (0,2)
                [CELL.PLAYER]    // Player at (0,3) - boulder should kill player
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall all the way to player position (0,3)
            expect(result.newPosition).toEqual({ x: 0, y: 3 });
            expect(result.playerCollision).toBe(true);

            // Verify maze state: boulder replaces player
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[2]![0]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[3]![0]).toBe(CELL.BOULDER); // Boulder at player position

            // Should generate movement sound and death sound
            expect(result.soundEvents).toHaveLength(2);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[1]?.type).toBe('death');
        });

        it('should fall through empty spaces and trigger bomb explosion', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at (0,0)
                [CELL.EMPTY],    // Empty space at (0,1)
                [CELL.EMPTY],    // Empty space at (0,2)
                [CELL.BOMB]      // Bomb at (0,3) - boulder should trigger explosion
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall all the way to bomb position (0,3)
            expect(result.newPosition).toEqual({ x: 0, y: 3 });
            expect(result.bombExplosion).toBe(true);

            // Verify maze state: boulder replaces bomb
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[2]![0]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[3]![0]).toBe(CELL.BOULDER); // Boulder at bomb position

            // Should generate movement sound and collision sound
            expect(result.soundEvents).toHaveLength(2);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[1]?.type).toBe('collision');
        });
    });

    describe('Physics Engine Integration', () => {
        it('should handle continuous falling with boulder state management', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],  // Boulder at (1,1)
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],    // Empty at (1,2)
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],    // Empty at (1,3)
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]       // Rock at (1,4)
            ];

            // Create boulder state manager and trigger the boulder
            let boulderStateManager = createBoulderStateManager(maze, 1);
            const triggeredBoulders = [{ x: 1, y: 1 }];
            boulderStateManager = updateBoulderTriggers(boulderStateManager, triggeredBoulders, 1);

            // Simulate physics - boulder should fall continuously until hitting bottom rock
            const result = simulateGravityWithState(maze, boulderStateManager, 2);

            // Boulder should have fallen from (1,1) all the way down to (1,3)
            expect(result.newMaze[1]![1]).toBe(CELL.EMPTY); // Original position empty
            expect(result.newMaze[2]![1]).toBe(CELL.EMPTY); // Intermediate position empty
            expect(result.newMaze[3]![1]).toBe(CELL.BOULDER); // Final position has boulder

            // Should generate movement and collision sounds
            expect(result.soundEvents.length).toBeGreaterThanOrEqual(2);
            const movementSounds = result.soundEvents.filter(e => e.type === 'movement' && e.source === 'boulder');
            const collisionSounds = result.soundEvents.filter(e => e.type === 'collision' && e.source === 'boulder');
            expect(movementSounds).toHaveLength(1);
            expect(collisionSounds).toHaveLength(1);
        });

        it('should handle multiple boulders falling continuously simultaneously', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],  // Boulders at (1,1) and (3,1)
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],      // Empty spaces
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],      // Empty spaces
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]         // Bottom rocks
            ];

            // Create boulder state manager and trigger both boulders
            let boulderStateManager = createBoulderStateManager(maze, 1);
            const triggeredBoulders = [{ x: 1, y: 1 }, { x: 3, y: 1 }];
            boulderStateManager = updateBoulderTriggers(boulderStateManager, triggeredBoulders, 1);

            // Simulate physics - both boulders should fall continuously
            const result = simulateGravityWithState(maze, boulderStateManager, 2);

            // Both boulders should have fallen all the way down
            expect(result.newMaze[1]![1]).toBe(CELL.EMPTY); // First boulder original position empty
            expect(result.newMaze[1]![3]).toBe(CELL.EMPTY); // Second boulder original position empty
            expect(result.newMaze[2]![1]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[2]![3]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[3]![1]).toBe(CELL.BOULDER); // First boulder final position
            expect(result.newMaze[3]![3]).toBe(CELL.BOULDER); // Second boulder final position

            // Should generate movement and collision sounds for both boulders
            const movementSounds = result.soundEvents.filter(e => e.type === 'movement' && e.source === 'boulder');
            const collisionSounds = result.soundEvents.filter(e => e.type === 'collision' && e.source === 'boulder');
            expect(movementSounds).toHaveLength(2); // One for each boulder
            expect(collisionSounds).toHaveLength(2); // One for each boulder
        });
    });

    describe('Edge Cases and Boundary Conditions', () => {
        it('should not move boulder if already at bottom of maze', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY],
                [CELL.BOULDER]  // Boulder already at bottom
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 1 });

            // Boulder should not move
            expect(result.newPosition).toEqual({ x: 0, y: 1 });
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER);

            // Should generate collision sound (hitting boundary)
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('collision');
        });

        it('should handle boulder falling to maze boundary', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at top
                [CELL.EMPTY]     // Empty space at bottom (maze boundary)
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should fall to the bottom position
            expect(result.newPosition).toEqual({ x: 0, y: 1 });
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY); // Original position cleared
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER); // Boulder at bottom

            // Should generate movement sound only (no collision with boundary)
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('movement');
        });

        it('should not generate movement sound if boulder cannot fall at all', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],  // Boulder at top
                [CELL.ROCK]      // Rock directly below - boulder cannot fall
            ];

            const result = simulateEnhancedBoulderFall(maze, { x: 0, y: 0 });

            // Boulder should not move
            expect(result.newPosition).toEqual({ x: 0, y: 0 });
            expect(result.newMaze[0]![0]).toBe(CELL.BOULDER);

            // Should generate collision sound only (no movement sound)
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('collision');
        });
    });
});