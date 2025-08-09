import type { MazeCell } from '../maze';
import type { Position, BoulderStateManager } from './boulder-state-manager';
import {
    createBoulderStateManager,
    updateBoulderTriggers,
    updateBoulderMovement,
    updateBoulderPositions
} from './boulder-state-manager';
import {
    OptimizedBoulderStateManager,
    createSpatialIndex,
    detectAdjacentBouldersOptimized,
    findBoulderPositionsOptimized,
    BoulderPositionTracker,
    processBouldersBatch,
    getPerformanceMetrics,
    resetPerformanceMetrics,
    type PerformanceMetrics
} from './boulder-performance-optimizations';

// Enhanced boulder state manager with performance optimizations
export class PerformanceOptimizedBoulderSystem {
    private optimizedManager: OptimizedBoulderStateManager;
    private positionTracker: BoulderPositionTracker;
    private lastMazeHash: string;
    private performanceHistory: PerformanceMetrics[];

    constructor(maze: MazeCell[][], currentMoveNumber: number = 0) {
        const baseManager = createBoulderStateManager(maze, currentMoveNumber);
        this.optimizedManager = new OptimizedBoulderStateManager(baseManager);
        this.positionTracker = new BoulderPositionTracker();
        this.lastMazeHash = this.hashMaze(maze);
        this.performanceHistory = [];

        // Initialize position tracker with current boulder positions
        const positions = findBoulderPositionsOptimized(maze);
        positions.forEach(pos => this.positionTracker.add(pos));
    }

    // Hash maze for change detection
    private hashMaze(maze: MazeCell[][]): string {
        return maze.map(row => row.join('')).join('|');
    }

    // Get current boulder state manager
    getStateManager(): BoulderStateManager {
        return this.optimizedManager.getStateManager();
    }

    // Optimized proximity detection
    detectAdjacentBoulders(playerPosition: Position): Position[] {
        return this.optimizedManager.detectAdjacentBoulders(playerPosition);
    }

    // Optimized triggered boulder identification
    identifyTriggeredBoulders(
        previousPlayerPosition: Position | null,
        currentPlayerPosition: Position
    ): Position[] {
        const startTime = performance.now();

        // Use optimized proximity detection
        const currentAdjacent = this.detectAdjacentBoulders(currentPlayerPosition);

        if (!previousPlayerPosition) {
            return currentAdjacent;
        }

        const previousAdjacent = this.detectAdjacentBoulders(previousPlayerPosition);

        // Find newly triggered boulders
        const newlyTriggered = currentAdjacent.filter(current =>
            !previousAdjacent.some(prev => prev.x === current.x && prev.y === current.y)
        );

        const endTime = performance.now();
        this.recordPerformanceMetric('triggerIdentification', endTime - startTime);

        return newlyTriggered;
    }

    // Update boulder state with optimizations
    updateBoulderState(
        triggeredBoulders: Position[],
        movingBoulders: Position[],
        stoppedBoulders: Position[],
        positionUpdates: Array<{ from: Position; to: Position }>,
        currentMoveNumber: number
    ): void {
        const startTime = performance.now();

        let currentManager = this.optimizedManager.getStateManager();

        // Apply updates in batch
        if (triggeredBoulders.length > 0) {
            currentManager = updateBoulderTriggers(currentManager, triggeredBoulders, currentMoveNumber);
        }

        if (movingBoulders.length > 0 || stoppedBoulders.length > 0) {
            currentManager = updateBoulderMovement(currentManager, movingBoulders, stoppedBoulders);
        }

        if (positionUpdates.length > 0) {
            currentManager = updateBoulderPositions(currentManager, positionUpdates);

            // Update position tracker
            for (const update of positionUpdates) {
                this.positionTracker.remove(update.from);
                this.positionTracker.add(update.to);
            }
        }

        // Update optimized manager
        this.optimizedManager.updateState(currentManager, currentMoveNumber);

        const endTime = performance.now();
        this.recordPerformanceMetric('stateUpdate', endTime - startTime);
    }

    // Get boulders by state with caching
    getBouldersByState(state: 'moving' | 'stationary' | 'triggered'): Position[] {
        return this.optimizedManager.getBouldersByState(state);
    }

    // Batch process boulder operations
    processBoulderOperations<T>(
        boulders: Position[],
        operation: (boulder: Position) => T,
        batchSize: number = 10
    ): T[] {
        return processBouldersBatch(boulders, operation, batchSize);
    }

    // Get performance statistics
    getPerformanceStats(): {
        current: PerformanceMetrics | null;
        history: PerformanceMetrics[];
        system: {
            totalBoulders: number;
            movingBoulders: number;
            cacheSize: number;
            spatialIndexCells: number;
            trackedPositions: number;
        };
    } {
        const systemStats = this.optimizedManager.getStats();

        return {
            current: getPerformanceMetrics(),
            history: [...this.performanceHistory],
            system: {
                ...systemStats,
                trackedPositions: this.positionTracker.size()
            }
        };
    }

    // Record custom performance metric
    private recordPerformanceMetric(operation: string, duration: number): void {
        const current = getPerformanceMetrics();
        if (current) {
            // Store snapshot of current metrics
            this.performanceHistory.push({
                ...current,
                proximityDetectionTime: operation === 'proximityDetection' ? duration : current.proximityDetectionTime,
                stateManagementTime: operation === 'stateUpdate' ? duration : current.stateManagementTime,
                physicsSimulationTime: operation === 'physics' ? duration : current.physicsSimulationTime
            });

            // Keep only last 100 metrics to prevent memory growth
            if (this.performanceHistory.length > 100) {
                this.performanceHistory = this.performanceHistory.slice(-100);
            }
        }
    }

    // Reset performance tracking
    resetPerformanceTracking(): void {
        resetPerformanceMetrics();
        this.performanceHistory = [];
    }

    // Check if maze has changed (for cache invalidation)
    checkMazeChanges(maze: MazeCell[][]): boolean {
        const currentHash = this.hashMaze(maze);
        const hasChanged = currentHash !== this.lastMazeHash;

        if (hasChanged) {
            this.lastMazeHash = currentHash;

            // Update position tracker with new maze state
            this.positionTracker.clear();
            const positions = findBoulderPositionsOptimized(maze);
            positions.forEach(pos => this.positionTracker.add(pos));
        }

        return hasChanged;
    }

    // Get memory usage estimate
    getMemoryUsage(): {
        estimatedBytes: number;
        breakdown: {
            stateManager: number;
            positionTracker: number;
            performanceHistory: number;
            spatialIndex: number;
        };
    } {
        const stateManagerSize = this.optimizedManager.getStateManager().boulders.size * 100; // Rough estimate
        const positionTrackerSize = this.positionTracker.size() * 50; // Rough estimate
        const performanceHistorySize = this.performanceHistory.length * 200; // Rough estimate
        const spatialIndexSize = this.optimizedManager.getStats().spatialIndexCells * 100; // Rough estimate

        return {
            estimatedBytes: stateManagerSize + positionTrackerSize + performanceHistorySize + spatialIndexSize,
            breakdown: {
                stateManager: stateManagerSize,
                positionTracker: positionTrackerSize,
                performanceHistory: performanceHistorySize,
                spatialIndex: spatialIndexSize
            }
        };
    }

    // Optimize for large maze scenarios
    optimizeForLargeMaze(maze: MazeCell[][]): void {
        const mazeSize = maze.length * (maze[0]?.length || 0);

        if (mazeSize > 10000) { // Large maze threshold
            // Use larger spatial index cell size for better performance
            const positions = findBoulderPositionsOptimized(maze);
            const largeCellSize = Math.max(5, Math.floor(Math.sqrt(mazeSize) / 20));

            // Recreate optimized manager with larger cell size
            const baseManager = createBoulderStateManager(maze);
            this.optimizedManager = new OptimizedBoulderStateManager(baseManager);

            // Clear performance history to start fresh
            this.resetPerformanceTracking();
        }
    }

    // Get optimization recommendations
    getOptimizationRecommendations(): {
        recommendations: string[];
        severity: 'low' | 'medium' | 'high';
        metrics: {
            avgProximityTime: number;
            avgStateUpdateTime: number;
            memoryUsage: number;
            operationsPerSecond: number;
        };
    } {
        const stats = this.getPerformanceStats();
        const recommendations: string[] = [];
        let severity: 'low' | 'medium' | 'high' = 'low';

        // Calculate averages from history
        const avgProximityTime = this.performanceHistory.length > 0
            ? this.performanceHistory.reduce((sum, m) => sum + m.proximityDetectionTime, 0) / this.performanceHistory.length
            : 0;

        const avgStateUpdateTime = this.performanceHistory.length > 0
            ? this.performanceHistory.reduce((sum, m) => sum + m.stateManagementTime, 0) / this.performanceHistory.length
            : 0;

        const currentMetrics = stats.current;
        const memoryUsage = this.getMemoryUsage().estimatedBytes;

        // Performance thresholds
        if (avgProximityTime > 5) {
            recommendations.push('Consider increasing spatial index cell size for proximity detection');
            severity = 'medium';
        }

        if (avgStateUpdateTime > 10) {
            recommendations.push('Consider reducing batch size for boulder state updates');
            severity = 'medium';
        }

        if (memoryUsage > 1000000) { // 1MB
            recommendations.push('Consider clearing performance history more frequently');
            severity = 'high';
        }

        if (stats.system.totalBoulders > 1000) {
            recommendations.push('Consider implementing boulder culling for very large mazes');
            severity = 'high';
        }

        if (currentMetrics && currentMetrics.operationsPerSecond < 100) {
            recommendations.push('Performance is below optimal threshold, consider optimization');
            severity = 'high';
        }

        if (recommendations.length === 0) {
            recommendations.push('Performance is optimal');
        }

        return {
            recommendations,
            severity,
            metrics: {
                avgProximityTime,
                avgStateUpdateTime,
                memoryUsage,
                operationsPerSecond: currentMetrics?.operationsPerSecond || 0
            }
        };
    }
}