import { describe, it, expect } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import { simulatePhysicsStep, findBoulders } from '../physics/physics-engine';
import { createInitialGameState, movePlayer } from '../GameState';

describe('Physics Integration Demo', () => {
    it('should demonstrate boulder falling with sound events', () => {
        // Create a test maze with a suspended boulder
        const testMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        console.log('Initial maze state:');
        console.log('Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)');

        // Find initial boulder positions
        const initialBoulders = findBoulders(testMaze);
        expect(initialBoulders).toHaveLength(1);
        expect(initialBoulders[0]).toEqual({ x: 3, y: 1 });

        // Simulate one physics step
        const physicsResult = simulatePhysicsStep(testMaze);

        console.log('After physics simulation:');
        console.log('Sound events generated:', physicsResult.soundEvents.length);

        // Should generate movement sound for boulder falling
        expect(physicsResult.soundEvents.length).toBeGreaterThan(0);

        const movementSounds = physicsResult.soundEvents.filter(
            event => event.type === 'movement' && event.source === 'boulder'
        );
        expect(movementSounds.length).toBeGreaterThan(0);

        // Boulder should have moved down one position
        const newBoulders = findBoulders(physicsResult.newMaze);
        expect(newBoulders).toHaveLength(1);
        expect(newBoulders[0]).toEqual({ x: 3, y: 2 });

        console.log('Boulder successfully fell from (3,1) to (3,2) with sound event');
    });

    it('should demonstrate boulder collision with sound events', () => {
        // Create a test maze where boulder will immediately hit an obstacle
        const testMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        console.log('Boulder collision test:');
        console.log('Boulder at (1,1) surrounded by rocks - should not move');

        // Simulate physics - boulder should not move and no sounds should be generated
        const physicsResult = simulatePhysicsStep(testMaze);

        // Boulder should stay in same position
        const boulders = findBoulders(physicsResult.newMaze);
        expect(boulders).toHaveLength(1);
        expect(boulders[0]).toEqual({ x: 1, y: 1 });

        // No movement should occur, so no movement sounds
        const movementSounds = physicsResult.soundEvents.filter(
            event => event.type === 'movement' && event.source === 'boulder'
        );
        expect(movementSounds).toHaveLength(0);

        console.log('Boulder correctly stayed in place - no movement sounds generated');
    });

    it('should demonstrate game integration with physics and sound', () => {
        // Create a game scenario where player movement triggers physics
        const testMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        console.log('Game integration test:');
        console.log('Player moves right, boulder at (2,2) should fall to (2,3)');

        const gameState = createInitialGameState(testMaze);

        // Player moves right
        const newGameState = movePlayer(gameState, 1, 0);

        // Verify player moved
        expect(newGameState.player?.x).toBe(2);
        expect(newGameState.player?.y).toBe(1);

        // Verify boulder fell due to physics simulation
        expect(newGameState.maze[2]![2]).toBe(CELL.EMPTY); // Original boulder position empty
        expect(newGameState.maze[3]![2]).toBe(CELL.BOULDER); // Boulder fell down

        console.log('Player moved successfully and boulder physics was applied');
        console.log('Final player position:', newGameState.player);
        console.log('Boulder moved from (2,2) to (2,3)');
    });

    it('should demonstrate multiple boulder physics', () => {
        // Create a test maze with multiple boulders
        const testMaze: MazeCell[][] = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        console.log('Multiple boulder physics test:');
        console.log('Two boulders at (1,1) and (3,1) should both fall');

        const initialBoulders = findBoulders(testMaze);
        expect(initialBoulders).toHaveLength(2);

        const physicsResult = simulatePhysicsStep(testMaze);

        // Should generate movement sounds for both boulders
        const movementSounds = physicsResult.soundEvents.filter(
            event => event.type === 'movement' && event.source === 'boulder'
        );
        expect(movementSounds.length).toBe(2); // One for each boulder

        // Both boulders should have moved down
        const newBoulders = findBoulders(physicsResult.newMaze);
        expect(newBoulders).toHaveLength(2);

        // Verify positions (sorted for consistent comparison)
        const sortedNewBoulders = newBoulders.sort((a, b) => a.x - b.x);
        expect(sortedNewBoulders[0]).toEqual({ x: 1, y: 2 });
        expect(sortedNewBoulders[1]).toEqual({ x: 3, y: 2 });

        console.log('Both boulders fell successfully with sound events');
        console.log('Generated', movementSounds.length, 'movement sound events');
    });
});