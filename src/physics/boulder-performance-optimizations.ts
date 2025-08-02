import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { Position, BoulderState, BoulderStateManager } from './boulder-state-manager';

// Performance monitoring interface
export interface PerformanceMetrics {
    proximityDetectionTime: number;
    stateManagementTime: number;
    physicsSimulationTime: number;
    totalBoulders: number;
    activeBoulders: number;
    operationsPerSecond: number;
    memoryUsage: number;
}

// Spatial indexing for efficient proximity detection
export interface SpatialIndex {
    grid: Map<string, Position[]>;
    cellSize: number;
    bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

// Performance monitoring state
interface PerformanceState {
    startTime: number;
    operations: number;
    lastMetrics: PerformanceMetrics | null;
}

let performanceState: PerformanceState = {
    startTime: Date.now(),
    operations: 0,
    lastMetrics: null
};

// Pure function to create spatial index for efficient proximity queries
export function createSpatialIndex(positions: Position[], cellSize: number = 3): SpatialIndex {
    const grid = new Map<string, Position[]>();
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    // Find bounds
    for (const pos of positions) {
        minX = Math.min(minX, pos.x);
        maxX = Math.max(maxX, pos.x);
        minY = Math.min(minY, pos.y);
        maxY = Math.max(maxY, pos.y);
    }

    // Handle empty positions array
    if (positions.length === 0) {
        minX = maxX = minY = maxY = 0;
    }

    // Index positions into grid cells
    for (const pos of positions) {
        const cellX = Math.floor(pos.x / cellSize);
        const cellY = Math.floor(pos.y / cellSize);
        const cellKey = `${cellX},${cellY}`;

        if (!grid.has(cellKey)) {
            grid.set(cellKey, []);
        }
        grid.get(cellKey)!.push(pos);
    }

    return {
        grid,
        cellSize,
        bounds: { minX, maxX, minY, maxY }
    };
}

// Optimized proximity detection using spatial indexing
export function detectAdjacentBouldersOptimized(
    playerPosition: Position,
    spatialIndex: SpatialIndex
): Position[] {
    const startTime = performance.now();
    const adjacentBoulders: Position[] = [];
    const cellSize = spatialIndex.cellSize;

    // Calculate which grid cells to check (player position ± 1 in each direction)
    const minCellX = Math.floor((playerPosition.x - 1) / cellSize);
    const maxCellX = Math.floor((playerPosition.x + 1) / cellSize);
    const minCellY = Math.floor((playerPosition.y - 1) / cellSize);
    const maxCellY = Math.floor((playerPosition.y + 1) / cellSize);

    // Check only relevant grid cells
    for (let cellX = minCellX; cellX <= maxCellX; cellX++) {
        for (let cellY = minCellY; cellY <= maxCellY; cellY++) {
            const cellKey = `${cellX},${cellY}`;
            const cellPositions = spatialIndex.grid.get(cellKey);

            if (cellPositions) {
                for (const boulderPos of cellPositions) {
                    const dx = Math.abs(playerPosition.x - boulderPos.x);
                    const dy = Math.abs(playerPosition.y - boulderPos.y);

                    // Adjacent includes orthogonal and diagonal neighbors
                    if (dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0)) {
                        adjacentBoulders.push(boulderPos);
                    }
                }
            }
        }
    }

    // Update performance metrics
    performanceState.operations++;
    const endTime = performance.now();
    updatePerformanceMetrics('proximityDetection', endTime - startTime);

    return adjacentBoulders;
}

// Optimized boulder state management with caching
export class OptimizedBoulderStateManager {
    private boulderStateManager: BoulderStateManager;
    private spatialIndex: SpatialIndex;
    private positionCache: Map<string, Position[]>;
    private lastUpdateMove: number;
    private isDirty: boolean;

    constructor(boulderStateManager: BoulderStateManager) {
        this.boulderStateManager = boulderStateManager;
        this.positionCache = new Map();
        this.lastUpdateMove = -1;
        this.isDirty = true;
        this.spatialIndex = this.rebuildSpatialIndex();
    }

    private rebuildSpatialIndex(): SpatialIndex {
        const positions = Array.from(this.boulderStateManager.boulders.values())
            .map(state => state.position);
        return createSpatialIndex(positions);
    }

    // Get cached or compute boulder positions by state
    getBouldersByState(state: 'moving' | 'stationary' | 'triggered'): Position[] {
        const cacheKey = `${state}_${this.lastUpdateMove}`;

        if (!this.isDirty && this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey)!;
        }

        const startTime = performance.now();
        let positions: Position[];

        switch (state) {
            case 'moving':
                positions = Array.from(this.boulderStateManager.boulders.values())
                    .filter(s => s.isMoving)
                    .map(s => s.position);
                break;
            case 'stationary':
                positions = Array.from(this.boulderStateManager.boulders.values())
                    .filter(s => !s.isMoving && !s.isTriggered)
                    .map(s => s.position);
                break;
            case 'triggered':
                positions = Array.from(this.boulderStateManager.boulders.values())
                    .filter(s => s.isTriggered && !s.isMoving)
                    .map(s => s.position);
                break;
        }

        this.positionCache.set(cacheKey, positions);

        const endTime = performance.now();
        updatePerformanceMetrics('stateManagement', endTime - startTime);

        return positions;
    }

    // Optimized proximity detection
    detectAdjacentBoulders(playerPosition: Position): Position[] {
        if (this.isDirty) {
            this.spatialIndex = this.rebuildSpatialIndex();
            this.isDirty = false;
        }

        return detectAdjacentBouldersOptimized(playerPosition, this.spatialIndex);
    }

    // Update state and mark as dirty
    updateState(newStateManager: BoulderStateManager, moveNumber: number): void {
        this.boulderStateManager = newStateManager;
        this.lastUpdateMove = moveNumber;
        this.isDirty = true;
        this.positionCache.clear(); // Clear cache when state changes
    }

    // Get current state manager
    getStateManager(): BoulderStateManager {
        return this.boulderStateManager;
    }

    // Get performance statistics
    getStats(): {
        totalBoulders: number;
        movingBoulders: number;
        cacheSize: number;
        spatialIndexCells: number;
    } {
        return {
            totalBoulders: this.boulderStateManager.boulders.size,
            movingBoulders: this.boulderStateManager.movingBoulderCount,
            cacheSize: this.positionCache.size,
            spatialIndexCells: this.spatialIndex.grid.size
        };
    }
}

// Batch processing for multiple boulder operations
export function processBouldersBatch(
    boulders: Position[],
    operation: (boulder: Position) => any,
    batchSize: number = 10
): any[] {
    const results: any[] = [];
    const startTime = performance.now();

    for (let i = 0; i < boulders.length; i += batchSize) {
        const batch = boulders.slice(i, i + batchSize);

        // Process batch
        for (const boulder of batch) {
            try {
                results.push(operation(boulder));
            } catch (error) {
                console.warn(`Error processing boulder at (${boulder.x},${boulder.y}):`, error);
                results.push(null); // Add null for failed operations
            }
        }

        // Yield control to prevent blocking UI (in browser environment)
        if (typeof window !== 'undefined' && i + batchSize < boulders.length) {
            // Small delay to prevent blocking
            const now = performance.now();
            if (now - startTime > 16) { // ~60fps threshold
                break; // Exit early if taking too long
            }
        }
    }

    const endTime = performance.now();
    updatePerformanceMetrics('batchProcessing', endTime - startTime);

    return results;
}

// Memory-efficient boulder position tracking
export class BoulderPositionTracker {
    private positions: Set<string>;
    private positionArray: Position[] | null;
    private isDirty: boolean;

    constructor(initialPositions: Position[] = []) {
        this.positions = new Set(initialPositions.map(p => `${p.x},${p.y}`));
        this.positionArray = null;
        this.isDirty = true;
    }

    add(position: Position): void {
        const key = `${position.x},${position.y}`;
        if (!this.positions.has(key)) {
            this.positions.add(key);
            this.isDirty = true;
        }
    }

    remove(position: Position): void {
        const key = `${position.x},${position.y}`;
        if (this.positions.has(key)) {
            this.positions.delete(key);
            this.isDirty = true;
        }
    }

    has(position: Position): boolean {
        const key = `${position.x},${position.y}`;
        return this.positions.has(key);
    }

    getPositions(): Position[] {
        if (this.isDirty || !this.positionArray) {
            this.positionArray = Array.from(this.positions).map(key => {
                const [x, y] = key.split(',').map(Number);
                return { x, y };
            });
            this.isDirty = false;
        }
        return this.positionArray;
    }

    size(): number {
        return this.positions.size;
    }

    clear(): void {
        this.positions.clear();
        this.positionArray = null;
        this.isDirty = true;
    }
}

// Performance monitoring functions
function updatePerformanceMetrics(operation: string, duration: number): void {
    performanceState.operations++;

    // Update metrics every 100 operations or every 5 seconds
    const now = Date.now();
    const timeSinceStart = now - performanceState.startTime;

    if (performanceState.operations % 100 === 0 || timeSinceStart > 5000) {
        const memoryUsage = typeof window !== 'undefined' && 'memory' in performance
            ? (performance as any).memory?.usedJSHeapSize || 0
            : 0;

        performanceState.lastMetrics = {
            proximityDetectionTime: duration,
            stateManagementTime: 0,
            physicsSimulationTime: 0,
            totalBoulders: 0,
            activeBoulders: 0,
            operationsPerSecond: performanceState.operations / (timeSinceStart / 1000),
            memoryUsage
        };
    }
}

export function getPerformanceMetrics(): PerformanceMetrics | null {
    return performanceState.lastMetrics;
}

export function resetPerformanceMetrics(): void {
    performanceState = {
        startTime: Date.now(),
        operations: 0,
        lastMetrics: null
    };
}

// Optimized maze scanning for large mazes
export function findBoulderPositionsOptimized(maze: MazeCell[][]): Position[] {
    const startTime = performance.now();
    const positions: Position[] = [];

    // Early exit for empty maze
    if (!maze || maze.length === 0) {
        return positions;
    }

    // Use more efficient scanning pattern
    const height = maze.length;
    for (let y = 0; y < height; y++) {
        const row = maze[y];
        if (!row) continue;

        const width = row.length;
        for (let x = 0; x < width; x++) {
            if (row[x] === CELL.BOULDER) {
                positions.push({ x, y });
            }
        }
    }

    const endTime = performance.now();
    updatePerformanceMetrics('mazeScanning', endTime - startTime);

    return positions;
}

// Efficient duplicate removal for position arrays
export function removeDuplicatePositions(positions: Position[]): Position[] {
    const seen = new Set<string>();
    const unique: Position[] = [];

    for (const pos of positions) {
        const key = `${pos.x},${pos.y}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(pos);
        }
    }

    return unique;
}

// Optimized distance calculation for proximity checks
export function calculateManhattanDistance(pos1: Position, pos2: Position): number {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

export function calculateChebyshevDistance(pos1: Position, pos2: Position): number {
    return Math.max(Math.abs(pos1.x - pos2.x), Math.abs(pos1.y - pos2.y));
}

// Efficient position comparison
export function positionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Bulk position operations
export function filterPositionsByDistance(
    positions: Position[],
    center: Position,
    maxDistance: number,
    distanceType: 'manhattan' | 'chebyshev' = 'chebyshev'
): Position[] {
    const distanceFunc = distanceType === 'manhattan'
        ? calculateManhattanDistance
        : calculateChebyshevDistance;

    return positions.filter(pos => distanceFunc(center, pos) <= maxDistance);
}