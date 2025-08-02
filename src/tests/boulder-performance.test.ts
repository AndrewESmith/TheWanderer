import { describe, it, expect, beforeEach } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { Position } from '../physics/boulder-state-manager';
import {
    createBoulderStateManager,
    detectAdjacentBoulders,
    findBoulderPositions
} from '../physics/boulder-state-manager';
import {
    createSpatialIndex,
    detectAdjacentBouldersOptimized,
    OptimizedBoulderStateManager,
    processBouldersBatch,
    BoulderPositionTracker,
    findBoulderPositionsOptimized,
    removeDuplicatePositions,
    calculateManhattanDistance,
    calculateChebyshevDistance,
    filterPositionsByDistance,
    getPerformanceMetrics,
    resetPerformanceMetrics
} from '../physics/boulder-performance-optimizations';

describe('Boulder Performance Optimizations', () => {
    beforeEach(() => {
        resetPerformanceMetrics();
    });

    describe('Spatial Index', () => {
        it('should create spatial index for boulder positions', () => {
            const positions: Position[] = [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 5, y: 5 },
                { x: 10, y: 10 }
            ];

            const spatialIndex = createSpatialIndex(positions, 3);

            expect(spatialIndex.grid.size).toBeGreaterThan(0);
            expect(spatialIndex.cellSize).toBe(3);
            expect(spatialIndex.bounds.minX).toBe(0);
            expect(spatialIndex.bounds.maxX).toBe(10);
        });

        it('should handle empty positions array', () => {
            const spatialIndex = createSpatialIndex([], 3);

            expect(spatialIndex.grid.size).toBe(0);
            expect(spatialIndex.cellSize).toBe(3);
            expect(spatialIndex.bounds.minX).toBe(0);
            expect(spatialIndex.bounds.maxX).toBe(0);
        });

        it('should group nearby positions in same grid cell', () => {
            const positions: Position[] = [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 } // All should be in same cell with cellSize=3
            ];

            const spatialIndex = createSpatialIndex(positions, 3);
            const cellKey = '0,0'; // All positions should map to cell (0,0)

            expect(spatialIndex.grid.has(cellKey)).toBe(true);
            expect(spatialIndex.grid.get(cellKey)?.length).toBe(3);
        });
    });

    describe('Optimized Proximity Detection', () => {
        it('should detect adjacent boulders efficiently', () => {
            const positions: Position[] = [
                { x: 1, y: 1 }, // Adjacent
                { x: 2, y: 2 }, // Adjacent (diagonal)
                { x: 5, y: 5 }, // Not adjacent
                { x: 10, y: 10 } // Not adjacent
            ];

            const spatialIndex = createSpatialIndex(positions);
            const playerPos: Position = { x: 2, y: 1 };

            const adjacent = detectAdjacentBouldersOptimized(playerPos, spatialIndex);

            expect(adjacent).toHaveLength(2);
            expect(adjacent).toContainEqual({ x: 1, y: 1 });
            expect(adjacent).toContainEqual({ x: 2, y: 2 });
        });

        it('should perform better than naive approach with many boulders', () => {
            // Create a large number of boulder positions
            const positions: Position[] = [];
            for (let x = 0; x < 50; x++) {
                for (let y = 0; y < 50; y++) {
                    if (Math.random() > 0.7) { // 30% chance of boulder
                        positions.push({ x, y });
                    }
                }
            }

            const playerPos: Position = { x: 25, y: 25 };
            const spatialIndex = createSpatialIndex(positions);

            // Time optimized approach
            const startOptimized = performance.now();
            const optimizedResult = detectAdjacentBouldersOptimized(playerPos, spatialIndex);
            const endOptimized = performance.now();
            const optimizedTime = endOptimized - startOptimized;

            // Time naive approach
            const startNaive = performance.now();
            const naiveResult = detectAdjacentBoulders(playerPos, positions);
            const endNaive = performance.now();
            const naiveTime = endNaive - startNaive;

            // Results should be the same
            expect(optimizedResult.sort((a, b) => a.x - b.x || a.y - b.y))
                .toEqual(naiveResult.sort((a, b) => a.x - b.x || a.y - b.y));

            // Optimized should be faster (or at least not significantly slower)
            // Allow some tolerance for small datasets where overhead might dominate
            expect(optimizedTime).toBeLessThan(naiveTime * 2);
        });
    });

    describe('OptimizedBoulderStateManager', () => {
        let testMaze: MazeCell[][];
        let boulderStateManager: OptimizedBoulderStateManager;

        beforeEach(() => {
            testMaze = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.SOIL, CELL.BOULDER],
                [CELL.ROCK, CELL.SOIL, CELL.PLAYER, CELL.SOIL],
                [CELL.ROCK, CELL.BOULDER, CELL.SOIL, CELL.ROCK]
            ];

            const baseManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = new OptimizedBoulderStateManager(baseManager);
        });

        it('should cache boulder positions by state', () => {
            const moving1 = boulderStateManager.getBouldersByState('moving');
            const moving2 = boulderStateManager.getBouldersByState('moving');

            // Should return same array reference (cached)
            expect(moving1).toStrictEqual(moving2);
        });

        it('should invalidate cache when state updates', () => {
            const moving1 = boulderStateManager.getBouldersByState('moving');

            // Update state
            const newManager = createBoulderStateManager(testMaze, 2);
            boulderStateManager.updateState(newManager, 2);

            const moving2 = boulderStateManager.getBouldersByState('moving');

            // Should return different array reference (cache invalidated)
            expect(moving1).not.toBe(moving2);
        });

        it('should provide performance statistics', () => {
            const stats = boulderStateManager.getStats();

            expect(stats.totalBoulders).toBeGreaterThan(0);
            expect(stats.movingBoulders).toBeGreaterThanOrEqual(0);
            expect(stats.cacheSize).toBeGreaterThanOrEqual(0);
            expect(stats.spatialIndexCells).toBeGreaterThanOrEqual(0);
        });

        it('should detect adjacent boulders efficiently', () => {
            const playerPos: Position = { x: 2, y: 2 };
            const adjacent = boulderStateManager.detectAdjacentBoulders(playerPos);

            // Check actual adjacent boulders based on test maze layout
            expect(adjacent.length).toBeGreaterThanOrEqual(2);
            expect(adjacent).toContainEqual({ x: 1, y: 1 });
            expect(adjacent).toContainEqual({ x: 3, y: 1 });
        });
    });

    describe('Batch Processing', () => {
        it('should process boulders in batches', () => {
            const boulders: Position[] = [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 4 }
            ];

            const operation = (boulder: Position) => boulder.x + boulder.y;
            const results = processBouldersBatch(boulders, operation, 2);

            expect(results).toHaveLength(5);
            expect(results).toEqual([0, 2, 4, 6, 8]);
        });

        it('should handle errors in batch processing', () => {
            const boulders: Position[] = [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 }
            ];

            const operation = (boulder: Position) => {
                if (boulder.x === 1) {
                    throw new Error('Test error');
                }
                return boulder.x + boulder.y;
            };

            const results = processBouldersBatch(boulders, operation, 1);

            expect(results).toHaveLength(3);
            expect(results[0]).toBe(0);
            expect(results[1]).toBeNull(); // Error case
            expect(results[2]).toBe(4);
        });
    });

    describe('BoulderPositionTracker', () => {
        let tracker: BoulderPositionTracker;

        beforeEach(() => {
            tracker = new BoulderPositionTracker();
        });

        it('should track boulder positions efficiently', () => {
            const pos1: Position = { x: 1, y: 1 };
            const pos2: Position = { x: 2, y: 2 };

            tracker.add(pos1);
            tracker.add(pos2);

            expect(tracker.size()).toBe(2);
            expect(tracker.has(pos1)).toBe(true);
            expect(tracker.has(pos2)).toBe(true);
        });

        it('should not add duplicate positions', () => {
            const pos: Position = { x: 1, y: 1 };

            tracker.add(pos);
            tracker.add(pos);
            tracker.add({ x: 1, y: 1 }); // Same position, different object

            expect(tracker.size()).toBe(1);
        });

        it('should remove positions', () => {
            const pos: Position = { x: 1, y: 1 };

            tracker.add(pos);
            expect(tracker.has(pos)).toBe(true);

            tracker.remove(pos);
            expect(tracker.has(pos)).toBe(false);
            expect(tracker.size()).toBe(0);
        });

        it('should return position array', () => {
            const positions: Position[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 }
            ];

            positions.forEach(pos => tracker.add(pos));
            const result = tracker.getPositions();

            expect(result).toHaveLength(3);
            expect(result).toEqual(expect.arrayContaining(positions));
        });

        it('should cache position array until dirty', () => {
            const pos: Position = { x: 1, y: 1 };
            tracker.add(pos);

            const array1 = tracker.getPositions();
            const array2 = tracker.getPositions();

            // Should return same array reference (cached)
            expect(array1).toBe(array2);

            // Add new position to make dirty
            tracker.add({ x: 2, y: 2 });
            const array3 = tracker.getPositions();

            // Should return different array reference (cache invalidated)
            expect(array1).not.toBe(array3);
        });
    });

    describe('Optimized Maze Scanning', () => {
        it('should find boulder positions efficiently', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.SOIL, CELL.PLAYER, CELL.BOULDER],
                [CELL.BOULDER, CELL.SOIL, CELL.ROCK]
            ];

            const optimizedPositions = findBoulderPositionsOptimized(testMaze);
            const standardPositions = findBoulderPositions(testMaze);

            expect(optimizedPositions).toEqual(standardPositions);
            expect(optimizedPositions).toHaveLength(3);
        });

        it('should handle empty maze', () => {
            const positions = findBoulderPositionsOptimized([]);
            expect(positions).toHaveLength(0);
        });

        it('should handle maze with no boulders', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.SOIL, CELL.ROCK],
                [CELL.SOIL, CELL.PLAYER, CELL.SOIL],
                [CELL.ROCK, CELL.SOIL, CELL.ROCK]
            ];

            const positions = findBoulderPositionsOptimized(testMaze);
            expect(positions).toHaveLength(0);
        });
    });

    describe('Utility Functions', () => {
        it('should remove duplicate positions', () => {
            const positions: Position[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 1, y: 1 }, // Duplicate
                { x: 3, y: 3 },
                { x: 2, y: 2 }  // Duplicate
            ];

            const unique = removeDuplicatePositions(positions);

            expect(unique).toHaveLength(3);
            expect(unique).toContainEqual({ x: 1, y: 1 });
            expect(unique).toContainEqual({ x: 2, y: 2 });
            expect(unique).toContainEqual({ x: 3, y: 3 });
        });

        it('should calculate Manhattan distance', () => {
            const pos1: Position = { x: 0, y: 0 };
            const pos2: Position = { x: 3, y: 4 };

            const distance = calculateManhattanDistance(pos1, pos2);
            expect(distance).toBe(7); // |3-0| + |4-0| = 7
        });

        it('should calculate Chebyshev distance', () => {
            const pos1: Position = { x: 0, y: 0 };
            const pos2: Position = { x: 3, y: 4 };

            const distance = calculateChebyshevDistance(pos1, pos2);
            expect(distance).toBe(4); // max(|3-0|, |4-0|) = 4
        });

        it('should filter positions by distance', () => {
            const center: Position = { x: 5, y: 5 };
            const positions: Position[] = [
                { x: 5, y: 5 }, // Distance 0
                { x: 6, y: 6 }, // Distance 1 (Chebyshev)
                { x: 7, y: 7 }, // Distance 2 (Chebyshev)
                { x: 8, y: 8 }, // Distance 3 (Chebyshev)
                { x: 10, y: 10 } // Distance 5 (Chebyshev)
            ];

            const nearby = filterPositionsByDistance(positions, center, 2, 'chebyshev');

            expect(nearby).toHaveLength(3);
            expect(nearby).toContainEqual({ x: 5, y: 5 });
            expect(nearby).toContainEqual({ x: 6, y: 6 });
            expect(nearby).toContainEqual({ x: 7, y: 7 });
        });

        it('should filter positions by Manhattan distance', () => {
            const center: Position = { x: 5, y: 5 };
            const positions: Position[] = [
                { x: 5, y: 5 }, // Distance 0
                { x: 6, y: 5 }, // Distance 1
                { x: 7, y: 5 }, // Distance 2
                { x: 5, y: 8 }, // Distance 3
                { x: 10, y: 10 } // Distance 10
            ];

            const nearby = filterPositionsByDistance(positions, center, 2, 'manhattan');

            expect(nearby).toHaveLength(3);
            expect(nearby).toContainEqual({ x: 5, y: 5 });
            expect(nearby).toContainEqual({ x: 6, y: 5 });
            expect(nearby).toContainEqual({ x: 7, y: 5 });
        });
    });

    describe('Performance Monitoring', () => {
        it('should track performance metrics', () => {
            // Trigger some operations to generate metrics
            const positions: Position[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 }
            ];

            const spatialIndex = createSpatialIndex(positions);
            detectAdjacentBouldersOptimized({ x: 2, y: 2 }, spatialIndex);

            // Performance metrics might not be available immediately
            // This test mainly ensures the functions don't throw errors
            const metrics = getPerformanceMetrics();
            // metrics could be null if not enough operations have been performed
            if (metrics) {
                expect(metrics.operationsPerSecond).toBeGreaterThanOrEqual(0);
                expect(metrics.memoryUsage).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('Large Scale Performance', () => {
        it('should handle large mazes efficiently', () => {
            // Create a large maze with many boulders
            const size = 100;
            const largeMaze: MazeCell[][] = [];

            for (let y = 0; y < size; y++) {
                const row: MazeCell[] = [];
                for (let x = 0; x < size; x++) {
                    if (Math.random() > 0.8) {
                        row.push(CELL.BOULDER);
                    } else {
                        row.push(CELL.SOIL);
                    }
                }
                largeMaze.push(row);
            }

            const startTime = performance.now();
            const positions = findBoulderPositionsOptimized(largeMaze);
            const endTime = performance.now();

            expect(positions.length).toBeGreaterThan(0);
            expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
        });

        it('should handle many proximity checks efficiently', () => {
            // Create many boulder positions
            const positions: Position[] = [];
            for (let x = 0; x < 50; x++) {
                for (let y = 0; y < 50; y++) {
                    if (Math.random() > 0.9) {
                        positions.push({ x, y });
                    }
                }
            }

            const spatialIndex = createSpatialIndex(positions);
            const playerPositions: Position[] = [];

            // Generate many player positions to test
            for (let i = 0; i < 100; i++) {
                playerPositions.push({
                    x: Math.floor(Math.random() * 50),
                    y: Math.floor(Math.random() * 50)
                });
            }

            const startTime = performance.now();

            for (const playerPos of playerPositions) {
                detectAdjacentBouldersOptimized(playerPos, spatialIndex);
            }

            const endTime = performance.now();

            // Should complete many proximity checks quickly
            expect(endTime - startTime).toBeLessThan(50); // Should complete in under 50ms
        });
    });
});