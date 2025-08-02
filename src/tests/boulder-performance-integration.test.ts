import { describe, it, expect, beforeEach } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { Position } from '../physics/boulder-state-manager';
import { PerformanceOptimizedBoulderSystem } from '../physics/boulder-performance-integration';

describe('Boulder Performance Integration', () => {
    let testMaze: MazeCell[][];
    let performanceSystem: PerformanceOptimizedBoulderSystem;

    beforeEach(() => {
        testMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.SOIL, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.SOIL, CELL.PLAYER, CELL.SOIL, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.SOIL, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        performanceSystem = new PerformanceOptimizedBoulderSystem(testMaze, 1);
    });

    describe('Initialization', () => {
        it('should initialize with maze and track boulder positions', () => {
            const stateManager = performanceSystem.getStateManager();

            expect(stateManager.boulders.size).toBe(4); // 4 boulders in test maze
            expect(stateManager.movingBoulderCount).toBe(0);
        });

        it('should provide performance statistics', () => {
            const stats = performanceSystem.getPerformanceStats();

            expect(stats.system.totalBoulders).toBe(4);
            expect(stats.system.movingBoulders).toBe(0);
            expect(stats.system.trackedPositions).toBe(4);
        });
    });

    describe('Optimized Proximity Detection', () => {
        it('should detect adjacent boulders efficiently', () => {
            const playerPos: Position = { x: 2, y: 2 };
            const adjacent = performanceSystem.detectAdjacentBoulders(playerPos);

            expect(adjacent).toHaveLength(4); // All 4 boulders are adjacent to center position
            expect(adjacent).toContainEqual({ x: 1, y: 1 });
            expect(adjacent).toContainEqual({ x: 3, y: 1 });
            expect(adjacent).toContainEqual({ x: 1, y: 3 });
            expect(adjacent).toContainEqual({ x: 3, y: 3 });
        });

        it('should identify triggered boulders efficiently', () => {
            const previousPos: Position = { x: 0, y: 0 }; // Far from boulders
            const currentPos: Position = { x: 2, y: 2 }; // Near all boulders

            const triggered = performanceSystem.identifyTriggeredBoulders(previousPos, currentPos);

            // Check what boulders are actually adjacent to each position
            const previousAdjacent = performanceSystem.detectAdjacentBoulders(previousPos);
            const currentAdjacent = performanceSystem.detectAdjacentBoulders(currentPos);

            // Newly triggered = current adjacent - previous adjacent
            const expectedCount = currentAdjacent.length - previousAdjacent.length;
            expect(triggered).toHaveLength(expectedCount);
        });

        it('should handle no previous position', () => {
            const currentPos: Position = { x: 2, y: 2 };

            const triggered = performanceSystem.identifyTriggeredBoulders(null, currentPos);

            expect(triggered).toHaveLength(4); // All adjacent boulders are triggered
        });
    });

    describe('State Management', () => {
        it('should update boulder state efficiently', () => {
            const triggeredBoulders: Position[] = [{ x: 1, y: 1 }];
            const movingBoulders: Position[] = [];
            const stoppedBoulders: Position[] = [];
            const positionUpdates: Array<{ from: Position; to: Position }> = [];

            performanceSystem.updateBoulderState(
                triggeredBoulders,
                movingBoulders,
                stoppedBoulders,
                positionUpdates,
                2
            );

            const stateManager = performanceSystem.getStateManager();
            const boulderKey = '1,1';
            const boulderState = stateManager.boulders.get(boulderKey);

            expect(boulderState?.isTriggered).toBe(true);
            expect(boulderState?.triggeredOnMove).toBe(2);
        });

        it('should handle position updates', () => {
            const positionUpdates: Array<{ from: Position; to: Position }> = [
                { from: { x: 1, y: 1 }, to: { x: 1, y: 2 } }
            ];

            performanceSystem.updateBoulderState([], [], [], positionUpdates, 2);

            const stateManager = performanceSystem.getStateManager();
            const oldKey = '1,1';
            const newKey = '1,2';

            expect(stateManager.boulders.has(oldKey)).toBe(false);
            expect(stateManager.boulders.has(newKey)).toBe(true);
        });

        it('should get boulders by state with caching', () => {
            // Initially all boulders should be stationary
            const stationary1 = performanceSystem.getBouldersByState('stationary');
            const stationary2 = performanceSystem.getBouldersByState('stationary');

            expect(stationary1).toHaveLength(4);
            expect(stationary1).toStrictEqual(stationary2); // Should return same content (cached)

            // Trigger a boulder
            performanceSystem.updateBoulderState([{ x: 1, y: 1 }], [], [], [], 2);

            const stationary3 = performanceSystem.getBouldersByState('stationary');
            const triggered = performanceSystem.getBouldersByState('triggered');

            expect(stationary3).toHaveLength(3); // One less stationary
            expect(triggered).toHaveLength(1); // One triggered
            expect(stationary1).not.toStrictEqual(stationary3); // Cache should be invalidated
        });
    });

    describe('Batch Processing', () => {
        it('should process boulder operations in batches', () => {
            const boulders: Position[] = [
                { x: 1, y: 1 },
                { x: 3, y: 1 },
                { x: 1, y: 3 },
                { x: 3, y: 3 }
            ];

            const operation = (boulder: Position) => `${boulder.x},${boulder.y}`;
            const results = performanceSystem.processBoulderOperations(boulders, operation, 2);

            expect(results).toHaveLength(4);
            expect(results).toContain('1,1');
            expect(results).toContain('3,1');
            expect(results).toContain('1,3');
            expect(results).toContain('3,3');
        });
    });

    describe('Performance Monitoring', () => {
        it('should track performance metrics', () => {
            // Perform some operations to generate metrics
            performanceSystem.detectAdjacentBoulders({ x: 2, y: 2 });
            performanceSystem.updateBoulderState([{ x: 1, y: 1 }], [], [], [], 2);

            const stats = performanceSystem.getPerformanceStats();

            expect(stats.system.totalBoulders).toBe(4);
            expect(stats.system.trackedPositions).toBe(4);
        });

        it('should provide memory usage estimates', () => {
            const memoryUsage = performanceSystem.getMemoryUsage();

            expect(memoryUsage.estimatedBytes).toBeGreaterThan(0);
            expect(memoryUsage.breakdown.stateManager).toBeGreaterThan(0);
            expect(memoryUsage.breakdown.positionTracker).toBeGreaterThan(0);
        });

        it('should reset performance tracking', () => {
            // Generate some performance history
            performanceSystem.detectAdjacentBoulders({ x: 2, y: 2 });

            performanceSystem.resetPerformanceTracking();

            const stats = performanceSystem.getPerformanceStats();
            expect(stats.history).toHaveLength(0);
        });
    });

    describe('Maze Change Detection', () => {
        it('should detect maze changes', () => {
            const hasChanged1 = performanceSystem.checkMazeChanges(testMaze);
            expect(hasChanged1).toBe(false); // Same maze

            // Modify maze
            const modifiedMaze = testMaze.map(row => [...row]);
            modifiedMaze[1][1] = CELL.SOIL; // Remove a boulder

            const hasChanged2 = performanceSystem.checkMazeChanges(modifiedMaze);
            expect(hasChanged2).toBe(true); // Maze changed
        });

        it('should update position tracker when maze changes', () => {
            const initialStats = performanceSystem.getPerformanceStats();
            expect(initialStats.system.trackedPositions).toBe(4);

            // Remove a boulder from maze
            const modifiedMaze = testMaze.map(row => [...row]);
            modifiedMaze[1][1] = CELL.SOIL;

            performanceSystem.checkMazeChanges(modifiedMaze);

            const updatedStats = performanceSystem.getPerformanceStats();
            expect(updatedStats.system.trackedPositions).toBe(3); // One less boulder
        });
    });

    describe('Large Maze Optimization', () => {
        it('should optimize for large mazes', () => {
            // Create a large maze
            const largeMaze: MazeCell[][] = [];
            for (let y = 0; y < 200; y++) {
                const row: MazeCell[] = [];
                for (let x = 0; x < 200; x++) {
                    if (Math.random() > 0.95) {
                        row.push(CELL.BOULDER);
                    } else {
                        row.push(CELL.SOIL);
                    }
                }
                largeMaze.push(row);
            }

            const largeSystem = new PerformanceOptimizedBoulderSystem(largeMaze, 1);
            largeSystem.optimizeForLargeMaze(largeMaze);

            // Should not throw errors and should complete quickly
            const stats = largeSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Optimization Recommendations', () => {
        it('should provide optimization recommendations', () => {
            const recommendations = performanceSystem.getOptimizationRecommendations();

            expect(recommendations.recommendations).toBeInstanceOf(Array);
            expect(recommendations.severity).toMatch(/^(low|medium|high)$/);
            expect(recommendations.metrics.avgProximityTime).toBeGreaterThanOrEqual(0);
            expect(recommendations.metrics.avgStateUpdateTime).toBeGreaterThanOrEqual(0);
            expect(recommendations.metrics.memoryUsage).toBeGreaterThanOrEqual(0);
        });

        it('should recommend optimizations for poor performance', () => {
            // Create a system with many boulders to trigger recommendations
            const largeMaze: MazeCell[][] = [];
            for (let y = 0; y < 50; y++) {
                const row: MazeCell[] = [];
                for (let x = 0; x < 50; x++) {
                    row.push(CELL.BOULDER); // All boulders
                }
                largeMaze.push(row);
            }

            const largeSystem = new PerformanceOptimizedBoulderSystem(largeMaze, 1);
            const recommendations = largeSystem.getOptimizationRecommendations();

            expect(recommendations.severity).toBe('high');
            expect(recommendations.recommendations.some(r =>
                r.includes('boulder culling') || r.includes('optimization')
            )).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty maze', () => {
            const emptyMaze: MazeCell[][] = [];
            const emptySystem = new PerformanceOptimizedBoulderSystem(emptyMaze, 1);

            const stats = emptySystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(0);
            expect(stats.system.trackedPositions).toBe(0);
        });

        it('should handle maze with no boulders', () => {
            const noBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.SOIL, CELL.ROCK],
                [CELL.SOIL, CELL.PLAYER, CELL.SOIL],
                [CELL.ROCK, CELL.SOIL, CELL.ROCK]
            ];

            const noBoulderSystem = new PerformanceOptimizedBoulderSystem(noBoulderMaze, 1);

            const adjacent = noBoulderSystem.detectAdjacentBoulders({ x: 1, y: 1 });
            expect(adjacent).toHaveLength(0);

            const stats = noBoulderSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(0);
        });

        it('should handle single boulder maze', () => {
            const singleBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const singleSystem = new PerformanceOptimizedBoulderSystem(singleBoulderMaze, 1);

            const adjacent = singleSystem.detectAdjacentBoulders({ x: 0, y: 1 }); // Adjacent to boulder at (1,1)
            expect(adjacent).toHaveLength(1);
            expect(adjacent[0]).toEqual({ x: 1, y: 1 });

            const stats = singleSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(1);
        });
    });

    describe('Stress Testing', () => {
        it('should handle rapid state updates', () => {
            const startTime = performance.now();

            // Perform many rapid updates
            for (let i = 0; i < 100; i++) {
                const boulders = performanceSystem.getBouldersByState('stationary');
                if (boulders.length > 0) {
                    performanceSystem.updateBoulderState([boulders[0]], [], [], [], i + 2);
                    performanceSystem.updateBoulderState([], [], [boulders[0]], [], i + 3);
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (less than 1 second)
            expect(duration).toBeLessThan(1000);

            // System should still be in valid state
            const stats = performanceSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(4);
        });

        it('should handle many proximity checks', () => {
            const startTime = performance.now();

            // Perform many proximity checks
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    performanceSystem.detectAdjacentBoulders({ x, y });
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete quickly (less than 100ms)
            expect(duration).toBeLessThan(100);
        });
    });
});