import { describe, it, expect } from 'vitest';
import {
    createPositionKey,
    parsePositionKey,
    findBoulderPositions,
    createBoulderStateManager,
    arePositionsAdjacent,
    detectAdjacentBoulders,
    identifyTriggeredBoulders,
    updateBoulderTriggers,
    updateBoulderMovement,
    updateBoulderPositions,
    hasMovingBoulders,
    getTriggeredBouldersForMove,
    updatePlayerPosition,
    createProximityResult,
    createMovementConstraint,
    type Position,
    type BoulderStateManager,
    type ProximityResult,
    type MovementConstraint,
} from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('Boulder State Manager', () => {
    // Test maze with boulders for testing
    const testMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    describe('Position utilities', () => {
        it('should create position key correctly', () => {
            const position: Position = { x: 5, y: 10 };
            const key = createPositionKey(position);
            expect(key).toBe('5,10');
        });

        it('should parse position key correctly', () => {
            const key = '5,10';
            const position = parsePositionKey(key);
            expect(position).toEqual({ x: 5, y: 10 });
        });

        it('should handle zero coordinates', () => {
            const position: Position = { x: 0, y: 0 };
            const key = createPositionKey(position);
            const parsed = parsePositionKey(key);
            expect(key).toBe('0,0');
            expect(parsed).toEqual(position);
        });
    });

    describe('Boulder position detection', () => {
        it('should find all boulder positions in maze', () => {
            const positions = findBoulderPositions(testMaze);
            expect(positions).toHaveLength(3);
            expect(positions).toContainEqual({ x: 1, y: 1 });
            expect(positions).toContainEqual({ x: 3, y: 1 });
            expect(positions).toContainEqual({ x: 1, y: 3 });
        });

        it('should return empty array for maze with no boulders', () => {
            const emptyMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];
            const positions = findBoulderPositions(emptyMaze);
            expect(positions).toHaveLength(0);
        });

        it('should handle empty maze', () => {
            const positions = findBoulderPositions([]);
            expect(positions).toHaveLength(0);
        });
    });

    describe('Boulder state manager creation', () => {
        it('should create initial boulder state manager correctly', () => {
            const manager = createBoulderStateManager(testMaze, 5);

            expect(manager.boulders.size).toBe(3);
            expect(manager.movingBoulderCount).toBe(0);
            expect(manager.lastPlayerPosition).toBeNull();

            // Check individual boulder states
            const boulder1 = manager.boulders.get('1,1');
            expect(boulder1).toEqual({
                position: { x: 1, y: 1 },
                isTriggered: false,
                isMoving: false,
                triggeredOnMove: -1,
            });
        });

        it('should handle maze with no boulders', () => {
            const emptyMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const manager = createBoulderStateManager(emptyMaze);
            expect(manager.boulders.size).toBe(0);
            expect(manager.movingBoulderCount).toBe(0);
        });
    });

    describe('Position adjacency detection', () => {
        it('should detect orthogonal adjacency', () => {
            const pos1: Position = { x: 2, y: 2 };
            const pos2: Position = { x: 2, y: 3 }; // Below
            const pos3: Position = { x: 3, y: 2 }; // Right

            expect(arePositionsAdjacent(pos1, pos2)).toBe(true);
            expect(arePositionsAdjacent(pos1, pos3)).toBe(true);
        });

        it('should detect diagonal adjacency', () => {
            const pos1: Position = { x: 2, y: 2 };
            const pos2: Position = { x: 3, y: 3 }; // Diagonal

            expect(arePositionsAdjacent(pos1, pos2)).toBe(true);
        });

        it('should not detect non-adjacent positions', () => {
            const pos1: Position = { x: 2, y: 2 };
            const pos2: Position = { x: 2, y: 4 }; // Two cells away
            const pos3: Position = { x: 4, y: 4 }; // Far diagonal

            expect(arePositionsAdjacent(pos1, pos2)).toBe(false);
            expect(arePositionsAdjacent(pos1, pos3)).toBe(false);
        });

        it('should not consider same position as adjacent', () => {
            const pos: Position = { x: 2, y: 2 };
            expect(arePositionsAdjacent(pos, pos)).toBe(false);
        });
    });

    describe('Adjacent boulder detection', () => {
        it('should detect boulders adjacent to player', () => {
            const playerPos: Position = { x: 2, y: 2 };
            const boulderPositions: Position[] = [
                { x: 1, y: 1 }, // Diagonal - adjacent
                { x: 3, y: 1 }, // Diagonal - adjacent
                { x: 1, y: 3 }, // Diagonal - adjacent
            ];

            const adjacent = detectAdjacentBoulders(playerPos, boulderPositions);
            expect(adjacent).toHaveLength(3);
            expect(adjacent).toContainEqual({ x: 1, y: 1 });
            expect(adjacent).toContainEqual({ x: 3, y: 1 });
            expect(adjacent).toContainEqual({ x: 1, y: 3 });
        });

        it('should return empty array when no boulders are adjacent', () => {
            const playerPos: Position = { x: 2, y: 2 };
            const boulderPositions: Position[] = [
                { x: 0, y: 0 }, // Far away
                { x: 4, y: 4 }, // Far away
            ];

            const adjacent = detectAdjacentBoulders(playerPos, boulderPositions);
            expect(adjacent).toHaveLength(0);
        });

        it('should handle boundary edge cases correctly', () => {
            // Test player at maze corner (0,0)
            const cornerPlayerPos: Position = { x: 0, y: 0 };
            const cornerBoulderPositions: Position[] = [
                { x: 1, y: 0 }, // Right adjacent
                { x: 0, y: 1 }, // Below adjacent
                { x: 1, y: 1 }, // Diagonal adjacent
                { x: 2, y: 2 }, // Not adjacent
            ];

            const cornerAdjacent = detectAdjacentBoulders(cornerPlayerPos, cornerBoulderPositions);
            expect(cornerAdjacent).toHaveLength(3);
            expect(cornerAdjacent).toContainEqual({ x: 1, y: 0 });
            expect(cornerAdjacent).toContainEqual({ x: 0, y: 1 });
            expect(cornerAdjacent).toContainEqual({ x: 1, y: 1 });
            expect(cornerAdjacent).not.toContainEqual({ x: 2, y: 2 });
        });

        it('should handle all 8 adjacent positions correctly', () => {
            const centerPos: Position = { x: 5, y: 5 };
            const allAdjacentPositions: Position[] = [
                { x: 4, y: 4 }, // Top-left diagonal
                { x: 5, y: 4 }, // Top
                { x: 6, y: 4 }, // Top-right diagonal
                { x: 4, y: 5 }, // Left
                { x: 6, y: 5 }, // Right
                { x: 4, y: 6 }, // Bottom-left diagonal
                { x: 5, y: 6 }, // Bottom
                { x: 6, y: 6 }, // Bottom-right diagonal
            ];

            const adjacent = detectAdjacentBoulders(centerPos, allAdjacentPositions);
            expect(adjacent).toHaveLength(8);

            // Verify all positions are detected as adjacent
            for (const pos of allAdjacentPositions) {
                expect(adjacent).toContainEqual(pos);
            }
        });

        it('should handle negative coordinates correctly', () => {
            // Test with negative coordinates (edge case for position calculations)
            const playerPos: Position = { x: 1, y: 1 };
            const boulderPositions: Position[] = [
                { x: 0, y: 0 }, // Adjacent diagonal
                { x: -1, y: -1 }, // Not adjacent (too far)
            ];

            const adjacent = detectAdjacentBoulders(playerPos, boulderPositions);
            expect(adjacent).toHaveLength(1);
            expect(adjacent).toContainEqual({ x: 0, y: 0 });
            expect(adjacent).not.toContainEqual({ x: -1, y: -1 });
        });
    });

    describe('Triggered boulder identification', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should identify newly triggered boulders when player moves', () => {
            const previousPos: Position = { x: 4, y: 4 }; // Far from boulders
            const currentPos: Position = { x: 2, y: 2 }; // Near all 3 boulders

            const triggered = identifyTriggeredBoulders(previousPos, currentPos, manager);
            expect(triggered).toHaveLength(3);
            expect(triggered).toContainEqual({ x: 1, y: 1 });
            expect(triggered).toContainEqual({ x: 3, y: 1 });
            expect(triggered).toContainEqual({ x: 1, y: 3 });
        });

        it('should not trigger boulders that were already adjacent', () => {
            const previousPos: Position = { x: 2, y: 1 }; // Near boulder at (1,1) and (3,1)
            const currentPos: Position = { x: 2, y: 2 }; // Near boulder at (1,1) and (1,3)

            const triggered = identifyTriggeredBoulders(previousPos, currentPos, manager);
            expect(triggered).toHaveLength(1);
            expect(triggered).toContainEqual({ x: 1, y: 3 }); // Only newly adjacent boulder
        });

        it('should trigger all adjacent boulders when no previous position', () => {
            const currentPos: Position = { x: 2, y: 2 };

            const triggered = identifyTriggeredBoulders(null, currentPos, manager);
            expect(triggered).toHaveLength(3);
            expect(triggered).toContainEqual({ x: 1, y: 1 });
            expect(triggered).toContainEqual({ x: 3, y: 1 });
            expect(triggered).toContainEqual({ x: 1, y: 3 });
        });

        it('should handle boundary edge cases for triggered boulder identification', () => {
            // Create a manager with boulders at maze edges
            const edgeMaze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY, CELL.BOULDER],
                [CELL.EMPTY, CELL.PLAYER, CELL.EMPTY],
                [CELL.BOULDER, CELL.EMPTY, CELL.BOULDER],
            ];
            const edgeManager = createBoulderStateManager(edgeMaze);

            // Player moves from center to corner
            const previousPos: Position = { x: 1, y: 1 }; // Center, adjacent to all 4 boulders
            const currentPos: Position = { x: 0, y: 0 }; // Corner, only adjacent to boulder at (0,0)

            const triggered = identifyTriggeredBoulders(previousPos, currentPos, edgeManager);
            expect(triggered).toHaveLength(0); // No newly triggered boulders (was already adjacent to corner boulder)
        });

        it('should handle player movement across maze boundaries correctly', () => {
            // Test player moving from far position to near boulders
            const farPos: Position = { x: 10, y: 10 }; // Far from any boulder
            const nearPos: Position = { x: 2, y: 2 }; // Near all test boulders

            const triggered = identifyTriggeredBoulders(farPos, nearPos, manager);
            expect(triggered).toHaveLength(3); // All boulders are newly triggered
            expect(triggered).toContainEqual({ x: 1, y: 1 });
            expect(triggered).toContainEqual({ x: 3, y: 1 });
            expect(triggered).toContainEqual({ x: 1, y: 3 });
        });
    });

    describe('Boulder trigger updates', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should update boulder states when triggered', () => {
            const triggeredBoulders: Position[] = [{ x: 1, y: 1 }, { x: 1, y: 3 }];
            const currentMove = 5;

            const updatedManager = updateBoulderTriggers(manager, triggeredBoulders, currentMove);

            const boulder1 = updatedManager.boulders.get('1,1');
            const boulder3 = updatedManager.boulders.get('1,3');
            const boulder2 = updatedManager.boulders.get('3,1'); // Not triggered

            expect(boulder1?.isTriggered).toBe(true);
            expect(boulder1?.triggeredOnMove).toBe(currentMove);
            expect(boulder3?.isTriggered).toBe(true);
            expect(boulder3?.triggeredOnMove).toBe(currentMove);
            expect(boulder2?.isTriggered).toBe(false);
            expect(boulder2?.triggeredOnMove).toBe(-1);
        });

        it('should not re-trigger already triggered boulders', () => {
            // First trigger
            const triggeredBoulders: Position[] = [{ x: 1, y: 1 }];
            let updatedManager = updateBoulderTriggers(manager, triggeredBoulders, 5);

            // Try to trigger again
            updatedManager = updateBoulderTriggers(updatedManager, triggeredBoulders, 6);

            const boulder = updatedManager.boulders.get('1,1');
            expect(boulder?.triggeredOnMove).toBe(5); // Should remain original trigger move
        });
    });

    describe('Boulder movement updates', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should update moving boulder states correctly', () => {
            const movingBoulders: Position[] = [{ x: 1, y: 1 }, { x: 1, y: 3 }];
            const stoppedBoulders: Position[] = [];

            const updatedManager = updateBoulderMovement(manager, movingBoulders, stoppedBoulders);

            expect(updatedManager.movingBoulderCount).toBe(2);
            expect(updatedManager.boulders.get('1,1')?.isMoving).toBe(true);
            expect(updatedManager.boulders.get('1,3')?.isMoving).toBe(true);
            expect(updatedManager.boulders.get('3,1')?.isMoving).toBe(false);
        });

        it('should update stopped boulder states correctly', () => {
            // First set some boulders as moving
            let updatedManager = updateBoulderMovement(manager, [{ x: 1, y: 1 }, { x: 1, y: 3 }], []);
            expect(updatedManager.movingBoulderCount).toBe(2);

            // Then stop one boulder
            updatedManager = updateBoulderMovement(updatedManager, [], [{ x: 1, y: 1 }]);

            expect(updatedManager.movingBoulderCount).toBe(1);
            expect(updatedManager.boulders.get('1,1')?.isMoving).toBe(false);
            expect(updatedManager.boulders.get('1,3')?.isMoving).toBe(true);
        });

        it('should not allow negative moving boulder count', () => {
            const stoppedBoulders: Position[] = [{ x: 1, y: 1 }]; // Stop boulder that wasn't moving

            const updatedManager = updateBoulderMovement(manager, [], stoppedBoulders);
            expect(updatedManager.movingBoulderCount).toBe(0);
        });
    });

    describe('Boulder position updates', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should update boulder positions correctly', () => {
            const positionUpdates = [
                { from: { x: 1, y: 1 }, to: { x: 1, y: 2 } },
                { from: { x: 1, y: 3 }, to: { x: 1, y: 4 } },
            ];

            const updatedManager = updateBoulderPositions(manager, positionUpdates);

            // Old positions should be removed
            expect(updatedManager.boulders.has('1,1')).toBe(false);
            expect(updatedManager.boulders.has('1,3')).toBe(false);

            // New positions should exist
            expect(updatedManager.boulders.has('1,2')).toBe(true);
            expect(updatedManager.boulders.has('1,4')).toBe(true);

            // Unchanged boulder should remain
            expect(updatedManager.boulders.has('3,1')).toBe(true);

            // Check position data is correct
            const movedBoulder = updatedManager.boulders.get('1,2');
            expect(movedBoulder?.position).toEqual({ x: 1, y: 2 });
        });

        it('should preserve boulder state data when updating positions', () => {
            // First trigger and set moving state
            let updatedManager = updateBoulderTriggers(manager, [{ x: 1, y: 1 }], 5);
            updatedManager = updateBoulderMovement(updatedManager, [{ x: 1, y: 1 }], []);

            // Then update position
            const positionUpdates = [{ from: { x: 1, y: 1 }, to: { x: 1, y: 2 } }];
            updatedManager = updateBoulderPositions(updatedManager, positionUpdates);

            const movedBoulder = updatedManager.boulders.get('1,2');
            expect(movedBoulder?.isTriggered).toBe(true);
            expect(movedBoulder?.isMoving).toBe(true);
            expect(movedBoulder?.triggeredOnMove).toBe(5);
        });
    });

    describe('Moving boulder detection', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should detect when boulders are moving', () => {
            expect(hasMovingBoulders(manager)).toBe(false);

            const updatedManager = updateBoulderMovement(manager, [{ x: 1, y: 1 }], []);
            expect(hasMovingBoulders(updatedManager)).toBe(true);
        });

        it('should detect when no boulders are moving', () => {
            let updatedManager = updateBoulderMovement(manager, [{ x: 1, y: 1 }], []);
            expect(hasMovingBoulders(updatedManager)).toBe(true);

            updatedManager = updateBoulderMovement(updatedManager, [], [{ x: 1, y: 1 }]);
            expect(hasMovingBoulders(updatedManager)).toBe(false);
        });
    });

    describe('Triggered boulders for move', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should return boulders triggered on previous move', () => {
            // Trigger boulders on move 5
            const triggeredBoulders: Position[] = [{ x: 1, y: 1 }, { x: 1, y: 3 }];
            const updatedManager = updateBoulderTriggers(manager, triggeredBoulders, 5);

            // Check for move 4 (countdown system: should return boulders triggered on move 5)
            const bouldersToMove = getTriggeredBouldersForMove(updatedManager, 4);
            expect(bouldersToMove).toHaveLength(2);
            expect(bouldersToMove).toContainEqual({ x: 1, y: 1 });
            expect(bouldersToMove).toContainEqual({ x: 1, y: 3 });
        });

        it('should not return boulders already moving', () => {
            // Trigger and set moving
            let updatedManager = updateBoulderTriggers(manager, [{ x: 1, y: 1 }], 5);
            updatedManager = updateBoulderMovement(updatedManager, [{ x: 1, y: 1 }], []);

            const bouldersToMove = getTriggeredBouldersForMove(updatedManager, 4);
            expect(bouldersToMove).toHaveLength(0);
        });

        it('should not return boulders triggered on different moves', () => {
            // Trigger boulder on move 5
            const updatedManager = updateBoulderTriggers(manager, [{ x: 1, y: 1 }], 5);

            // Check for move 3 (boulder was triggered on move 5, should start moving on move 4, not 3)
            const bouldersToMove = getTriggeredBouldersForMove(updatedManager, 3);
            expect(bouldersToMove).toHaveLength(0);
        });
    });

    describe('Player position tracking', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should update player position correctly', () => {
            const newPosition: Position = { x: 5, y: 5 };
            const updatedManager = updatePlayerPosition(manager, newPosition);

            expect(updatedManager.lastPlayerPosition).toEqual(newPosition);
            expect(updatedManager.boulders).toBe(manager.boulders); // Should not affect boulders
        });

        it('should handle null to position update', () => {
            const newPosition: Position = { x: 0, y: 0 };
            const updatedManager = updatePlayerPosition(manager, newPosition);

            expect(updatedManager.lastPlayerPosition).toEqual(newPosition);
        });
    });

    describe('Proximity result creation', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should create proximity result with adjacent and newly triggered boulders', () => {
            const playerPosition: Position = { x: 2, y: 2 };
            const previousPlayerPosition: Position = { x: 4, y: 4 };

            const result = createProximityResult(playerPosition, previousPlayerPosition, manager);

            expect(result.adjacentBoulders).toHaveLength(3);
            expect(result.newlyTriggeredBoulders).toHaveLength(3);
            expect(result.adjacentBoulders).toContainEqual({ x: 1, y: 1 });
            expect(result.adjacentBoulders).toContainEqual({ x: 3, y: 1 });
            expect(result.adjacentBoulders).toContainEqual({ x: 1, y: 3 });
        });

        it('should handle null previous position', () => {
            const playerPosition: Position = { x: 2, y: 2 };

            const result = createProximityResult(playerPosition, null, manager);

            expect(result.adjacentBoulders).toHaveLength(3);
            expect(result.newlyTriggeredBoulders).toHaveLength(3);
        });
    });

    describe('Movement constraint creation', () => {
        let manager: BoulderStateManager;

        beforeEach(() => {
            manager = createBoulderStateManager(testMaze);
        });

        it('should create constraint with no blocking when no boulders are moving', () => {
            const constraint = createMovementConstraint(manager);

            expect(constraint.isPlayerMovementBlocked).toBe(false);
            expect(constraint.blockingReason).toBe('none');
        });

        it('should create constraint with blocking when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(manager, [{ x: 1, y: 1 }], []);
            const constraint = createMovementConstraint(updatedManager);

            expect(constraint.isPlayerMovementBlocked).toBe(true);
            expect(constraint.blockingReason).toBe('boulder_movement');
        });
    });
});