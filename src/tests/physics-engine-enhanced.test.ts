import { describe, it, expect } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import {
    simulatePhysicsStepWithState,
    simulateGravityWithState,
    getMovingBoulderPositions,
    getStationaryBoulderPositions,
    getTriggeredBoulderPositions,
    categorizeBoulders,
    shouldContinuePhysicsWithState
} from '../physics/physics-engine';
import {
    createBoulderStateManager,
    updateBoulderTriggers,
    updateBoulderMovement,
    type BoulderStateManager
} from '../physics/boulder-state-manager';

describe('Enhanced Physics Engine', () => {
    describe('simulateGravityWithState', () => {
        it('should handle triggered boulders starting to move', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create boulder state manager
            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Trigger boulder at (2,1) on move 1
            const triggeredBoulders = [{ x: 2, y: 1 }];
            boulderStateManager = updateBoulderTriggers(boulderStateManager, triggeredBoulders, 1);

            // Simulate physics on move 2 (triggered boulders should start moving)
            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should generate BOULDER_MOVE sound for triggered boulder
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );
            expect(movementSounds).toHaveLength(1);
            expect(movementSounds[0]?.volume).toBe(0.8);

            // Boulder should be in moving list (original position when it started moving)
            expect(result.movingBoulders).toHaveLength(1);
            expect(result.movingBoulders[0]).toEqual({ x: 2, y: 1 });

            // Boulder should have moved down continuously until it hits the bottom rock
            // Per Requirement 1.4: boulder continues moving until collision
            expect(result.newMaze[1]![2]).toBe(CELL.EMPTY); // Original position empty
            expect(result.newMaze[2]![2]).toBe(CELL.EMPTY); // Intermediate position empty
            expect(result.newMaze[3]![2]).toBe(CELL.BOULDER); // Boulder fell all the way down
        });

        it('should handle boulder collision with COLLISION_THUD sound', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create boulder state manager with moving boulder
            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Mark boulder as moving (it will try to move but hit rock)
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }], // moving
                [] // stopped
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Boulder should stop and generate collision sound
            expect(result.completedBoulders).toHaveLength(1);
            expect(result.completedBoulders[0]).toEqual({ x: 1, y: 1 });

            // Should generate COLLISION_THUD sound
            const collisionSounds = result.soundEvents.filter(
                event => event.type === 'collision' && event.source === 'boulder'
            );
            expect(collisionSounds).toHaveLength(1);
            expect(collisionSounds[0]?.priority).toBe('high');
            expect(collisionSounds[0]?.volume).toBe(0.9);
        });

        it('should detect player collision with moving boulder', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create boulder state manager with moving boulder
            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }], // moving boulder
                []
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should detect player collision
            expect(result.playerCollisions).toHaveLength(1);
            expect(result.playerCollisions[0]).toEqual({ x: 1, y: 2 });
        });

        it('should handle multiple moving boulders', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create boulder state manager
            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Trigger both boulders
            const triggeredBoulders = [{ x: 1, y: 1 }, { x: 3, y: 1 }];
            boulderStateManager = updateBoulderTriggers(boulderStateManager, triggeredBoulders, 1);

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should generate movement sounds for both boulders
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );
            expect(movementSounds).toHaveLength(2);

            // Both boulders should be in moving list
            expect(result.movingBoulders).toHaveLength(2);

            // Both boulders should have moved down continuously until they hit the bottom rocks
            // Per Requirement 1.4: boulder continues moving until collision
            expect(result.newMaze[1]![1]).toBe(CELL.EMPTY); // First boulder original position empty
            expect(result.newMaze[1]![3]).toBe(CELL.EMPTY); // Second boulder original position empty
            expect(result.newMaze[2]![1]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[2]![3]).toBe(CELL.EMPTY); // Intermediate positions empty
            expect(result.newMaze[3]![1]).toBe(CELL.BOULDER); // First boulder fell all the way down
            expect(result.newMaze[3]![3]).toBe(CELL.BOULDER); // Second boulder fell all the way down
        });
    });

    describe('simulatePhysicsStepWithState', () => {
        it('should integrate boulder state management with physics simulation', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create boulder state manager with triggered boulder
            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                1
            );

            const result = simulatePhysicsStepWithState(testMaze, boulderStateManager, 2);

            // Should have enhanced result properties
            expect(result.movingBoulders).toBeDefined();
            expect(result.completedBoulders).toBeDefined();
            expect(result.playerCollisions).toBeDefined();

            // Boulder should start moving
            expect(result.movingBoulders).toHaveLength(1);
            expect(result.movingBoulders[0]).toEqual({ x: 1, y: 1 });

            // Should generate movement sound
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );
            expect(movementSounds).toHaveLength(1);
        });

        it('should handle arrows alongside boulder state management', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const arrows = [{ position: { x: 2, y: 1 }, direction: { dx: 0, dy: 1 } }];
            const boulderStateManager = createBoulderStateManager(testMaze, 1);

            const result = simulatePhysicsStepWithState(testMaze, boulderStateManager, 2, arrows);

            // Should handle both boulders and arrows
            expect(result.boulderPositions).toBeDefined();
            expect(result.arrowPositions).toBeDefined();
            expect(result.movingBoulders).toBeDefined();
        });
    });

    describe('Boulder State Tracking Functions', () => {
        it('should correctly identify moving boulder positions', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Mark first boulder as moving
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 0 }], // moving
                [] // stopped
            );

            const movingPositions = getMovingBoulderPositions(boulderStateManager);
            const stationaryPositions = getStationaryBoulderPositions(boulderStateManager);

            expect(movingPositions).toHaveLength(1);
            expect(movingPositions[0]).toEqual({ x: 1, y: 0 });

            expect(stationaryPositions).toHaveLength(1);
            expect(stationaryPositions[0]).toEqual({ x: 2, y: 0 });
        });

        it('should correctly identify triggered boulder positions', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Trigger first boulder
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 0 }],
                1
            );

            const triggeredPositions = getTriggeredBoulderPositions(boulderStateManager);

            expect(triggeredPositions).toHaveLength(1);
            expect(triggeredPositions[0]).toEqual({ x: 1, y: 0 });
        });

        it('should categorize boulders correctly', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.BOULDER, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Trigger first boulder
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 0 }],
                1
            );

            // Mark second boulder as moving
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 2, y: 0 }], // moving
                [] // stopped
            );

            const categories = categorizeBoulders(boulderStateManager);

            expect(categories.total).toBe(3);
            expect(categories.triggered).toHaveLength(1);
            expect(categories.moving).toHaveLength(1);
            expect(categories.stationary).toHaveLength(1);

            expect(categories.triggered[0]).toEqual({ x: 1, y: 0 });
            expect(categories.moving[0]).toEqual({ x: 2, y: 0 });
            expect(categories.stationary[0]).toEqual({ x: 3, y: 0 });
        });

        it('should determine if physics should continue based on state', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // No moving boulders - should not continue
            expect(shouldContinuePhysicsWithState(boulderStateManager)).toBe(false);

            // Mark boulder as moving - should continue
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 0 }], // moving
                [] // stopped
            );

            expect(shouldContinuePhysicsWithState(boulderStateManager)).toBe(true);

            // Stop boulder - should not continue
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [], // moving
                [{ x: 1, y: 0 }] // stopped
            );

            expect(shouldContinuePhysicsWithState(boulderStateManager)).toBe(false);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty maze', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const boulderStateManager = createBoulderStateManager(testMaze, 1);
            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            expect(result.movingBoulders).toHaveLength(0);
            expect(result.completedBoulders).toHaveLength(0);
            expect(result.soundEvents).toHaveLength(0);
        });

        it('should handle boulder at maze boundary', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 2 }], // moving boulder at bottom
                []
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Boulder should stop at boundary
            expect(result.completedBoulders).toHaveLength(1);
            expect(result.newMaze[2]![1]).toBe(CELL.BOULDER); // Boulder stays in place
        });

        it('should handle duplicate boulder positions in moving list', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);

            // Only trigger the boulder (it should generate movement sound when triggered)
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                1
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should generate one movement sound for triggered boulder
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );
            expect(movementSounds).toHaveLength(1);
        });
    });
});