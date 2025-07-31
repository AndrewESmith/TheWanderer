import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import {
    detectBoulderCollision,
    simulateEnhancedBoulderFall,
    canBoulderFall,
    type Position,
    type BoulderCollisionResult,
    type BoulderFallResult
} from '../physics/collision-detection';
import {
    mapBoulderObjectCollisionToSound,
    generateBoulderPlayerCollisionSound,
    generateBoulderBombCollisionSound,
    categorizeBoulderCollision
} from '../audio/events/collision-sound-mapper';

describe('Enhanced Boulder Collision Detection', () => {
    describe('detectBoulderCollision', () => {
        it('should detect no collision with empty space', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(false);
            expect(result.collisionType).toBe('none');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(false);
            expect(result.targetCell).toBe(CELL.EMPTY);
            expect(result.soundEvent).toBeUndefined();
        });

        it('should detect collision with rock', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.ROCK, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.ROCK);
            expect(result.soundEvent?.type).toBe('collision');
            expect(result.soundEvent?.source).toBe('boulder');
            expect(result.soundEvent?.priority).toBe('high');
            expect(result.soundEvent?.volume).toBe(0.9);
        });

        it('should detect collision with another boulder', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.BOULDER, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.BOULDER);
            expect(result.soundEvent?.volume).toBe(0.9);
        });

        it('should detect ground collision with soil', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.SOIL, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('ground');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.SOIL);
            expect(result.soundEvent?.volume).toBe(0.7);
        });

        it('should detect collision with diamond', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.DIAMOND, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.DIAMOND);
            expect(result.soundEvent?.volume).toBe(0.8);
        });

        it('should detect collision with bomb and trigger explosion', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.BOMB, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(true);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.BOMB);
            expect(result.soundEvent?.priority).toBe('high');
            expect(result.soundEvent?.volume).toBe(0.9);
        });

        it('should detect player collision and trigger death', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.PLAYER, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.isPlayerCollision).toBe(true);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.PLAYER);
            expect(result.soundEvent?.type).toBe('death');
            expect(result.soundEvent?.source).toBe('boulder');
            expect(result.soundEvent?.priority).toBe('high');
            expect(result.soundEvent?.volume).toBe(1.0);
        });

        it('should detect collision with exit', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.EXIT, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBe(CELL.EXIT);
            expect(result.soundEvent?.volume).toBe(0.8);
        });

        it('should detect wall collision when out of bounds', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 2 }; // Out of bounds

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('wall');
            expect(result.isPlayerCollision).toBe(false);
            expect(result.shouldTriggerBombExplosion).toBe(false);
            expect(result.shouldStopBoulder).toBe(true);
            expect(result.targetCell).toBeUndefined();
            expect(result.soundEvent?.volume).toBe(0.8);
        });
    });

    describe('simulateEnhancedBoulderFall', () => {
        it('should move boulder to empty space with movement sound', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EMPTY]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual({ x: 0, y: 1 });
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY);
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER);
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[0]?.source).toBe('boulder');
            expect(result.playerCollision).toBe(false);
            expect(result.bombExplosion).toBe(false);
        });

        it('should stop boulder when hitting rock with collision sound', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.ROCK]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual(boulderPosition);
            expect(result.newMaze[0]![0]).toBe(CELL.BOULDER);
            expect(result.newMaze[1]![0]).toBe(CELL.ROCK);
            expect(result.soundEvents).toHaveLength(0); // No collision sound in this case
            expect(result.playerCollision).toBe(false);
            expect(result.bombExplosion).toBe(false);
        });

        it('should handle player collision with death sound', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.PLAYER]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual({ x: 0, y: 1 });
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY);
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER);
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('death');
            expect(result.soundEvents[0]?.source).toBe('boulder');
            expect(result.playerCollision).toBe(true);
            expect(result.bombExplosion).toBe(false);
            expect(result.targetCell).toBe(CELL.PLAYER);
        });

        it('should handle bomb collision with explosion', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.BOMB]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual({ x: 0, y: 1 });
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY);
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER);
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('collision');
            expect(result.soundEvents[0]?.source).toBe('boulder');
            expect(result.playerCollision).toBe(false);
            expect(result.bombExplosion).toBe(true);
            expect(result.targetCell).toBe(CELL.BOMB);
        });

        it('should not move boulder when blocked', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.SOIL]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual(boulderPosition);
            expect(result.newMaze).toEqual(maze);
            expect(result.soundEvents).toHaveLength(0);
            expect(result.playerCollision).toBe(false);
            expect(result.bombExplosion).toBe(false);
        });
    });

    describe('canBoulderFall', () => {
        it('should return true when space below is empty', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(true);
        });

        it('should return false when space below is blocked', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.ROCK]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(false);
        });

        it('should return false when at bottom boundary', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(false);
        });

        it('should return true when player is below (allows boulder to fall and kill player)', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.PLAYER]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(true);
        });

        it('should return true when bomb is below (allows boulder to fall and trigger explosion)', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.BOMB]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(true);
        });

        it('should return false when diamond is below', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.DIAMOND]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(false);
        });

        it('should return false when exit is below', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EXIT]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(false);
        });
    });
});

describe('Enhanced Collision Sound Mapping', () => {
    describe('mapBoulderObjectCollisionToSound', () => {
        it('should map rock collision to high priority sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.ROCK);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('collision');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('high');
            expect(sound?.volume).toBe(0.9);
        });

        it('should map boulder collision to high priority sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.BOULDER);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('collision');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('high');
            expect(sound?.volume).toBe(0.8);
        });

        it('should map soil collision to medium priority sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.SOIL);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('collision');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('medium');
            expect(sound?.volume).toBe(0.7);
        });

        it('should map diamond collision to medium priority sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.DIAMOND);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('collision');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('medium');
            expect(sound?.volume).toBe(0.8);
        });

        it('should map bomb collision to high priority sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.BOMB);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('collision');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('high');
            expect(sound?.volume).toBe(0.9);
        });

        it('should map player collision to death sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.PLAYER);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('death');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('high');
            expect(sound?.volume).toBe(1.0);
        });

        it('should map exit collision to medium priority sound', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.EXIT);

            expect(sound).toBeDefined();
            expect(sound?.type).toBe('collision');
            expect(sound?.source).toBe('boulder');
            expect(sound?.priority).toBe('medium');
            expect(sound?.volume).toBe(0.8);
        });

        it('should return null for empty space', () => {
            const sound = mapBoulderObjectCollisionToSound(CELL.EMPTY);
            expect(sound).toBeNull();
        });
    });

    describe('generateBoulderPlayerCollisionSound', () => {
        it('should generate death sound for player collision', () => {
            const sound = generateBoulderPlayerCollisionSound();

            expect(sound.type).toBe('death');
            expect(sound.source).toBe('boulder');
            expect(sound.priority).toBe('high');
            expect(sound.volume).toBe(1.0);
        });
    });

    describe('generateBoulderBombCollisionSound', () => {
        it('should generate high priority collision sound for bomb', () => {
            const sound = generateBoulderBombCollisionSound();

            expect(sound.type).toBe('collision');
            expect(sound.source).toBe('boulder');
            expect(sound.priority).toBe('high');
            expect(sound.volume).toBe(0.9);
        });
    });

    describe('categorizeBoulderCollision', () => {
        it('should categorize rock as solid collision', () => {
            const category = categorizeBoulderCollision(CELL.ROCK);

            expect(category.collisionType).toBe('solid');
            expect(category.soundPriority).toBe('high');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize boulder as solid collision', () => {
            const category = categorizeBoulderCollision(CELL.BOULDER);

            expect(category.collisionType).toBe('solid');
            expect(category.soundPriority).toBe('high');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize soil as soft collision', () => {
            const category = categorizeBoulderCollision(CELL.SOIL);

            expect(category.collisionType).toBe('soft');
            expect(category.soundPriority).toBe('medium');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize diamond as solid collision', () => {
            const category = categorizeBoulderCollision(CELL.DIAMOND);

            expect(category.collisionType).toBe('solid');
            expect(category.soundPriority).toBe('medium');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize bomb as special collision', () => {
            const category = categorizeBoulderCollision(CELL.BOMB);

            expect(category.collisionType).toBe('special');
            expect(category.soundPriority).toBe('high');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize player as special collision', () => {
            const category = categorizeBoulderCollision(CELL.PLAYER);

            expect(category.collisionType).toBe('special');
            expect(category.soundPriority).toBe('high');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize exit as solid collision', () => {
            const category = categorizeBoulderCollision(CELL.EXIT);

            expect(category.collisionType).toBe('solid');
            expect(category.soundPriority).toBe('medium');
            expect(category.shouldStopBoulder).toBe(true);
        });

        it('should categorize empty as no collision', () => {
            const category = categorizeBoulderCollision(CELL.EMPTY);

            expect(category.collisionType).toBe('none');
            expect(category.soundPriority).toBe('low');
            expect(category.shouldStopBoulder).toBe(false);
        });
    });
});

describe('Enhanced Boulder Collision Integration Tests', () => {
    describe('Multiple object collision scenarios', () => {
        it('should handle boulder falling through multiple empty spaces', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EMPTY],
                [CELL.EMPTY],
                [CELL.ROCK]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            // First fall
            const result1 = simulateEnhancedBoulderFall(maze, boulderPosition);
            expect(result1.newPosition).toEqual({ x: 0, y: 1 });
            expect(result1.playerCollision).toBe(false);
            expect(result1.bombExplosion).toBe(false);

            // Second fall
            const result2 = simulateEnhancedBoulderFall(result1.newMaze, result1.newPosition);
            expect(result2.newPosition).toEqual({ x: 0, y: 2 });
            expect(result2.playerCollision).toBe(false);
            expect(result2.bombExplosion).toBe(false);

            // Third fall - should stop at rock
            const result3 = simulateEnhancedBoulderFall(result2.newMaze, result2.newPosition);
            expect(result3.newPosition).toEqual({ x: 0, y: 2 }); // Stays in place
            expect(result3.playerCollision).toBe(false);
            expect(result3.bombExplosion).toBe(false);
        });

        it('should handle boulder collision with diamond after falling', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EMPTY],
                [CELL.DIAMOND]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            // First fall - moves to empty space
            const result1 = simulateEnhancedBoulderFall(maze, boulderPosition);
            expect(result1.newPosition).toEqual({ x: 0, y: 1 });

            // Second fall - should stop at diamond (can't fall)
            const result2 = simulateEnhancedBoulderFall(result1.newMaze, result1.newPosition);
            expect(result2.newPosition).toEqual({ x: 0, y: 1 }); // Stays in place
            expect(result2.playerCollision).toBe(false);
            expect(result2.bombExplosion).toBe(false);
            // targetCell is undefined when boulder can't fall
        });

        it('should handle complex maze with multiple collision types', () => {
            const maze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOMB, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Boulder at (1,1) falling to player at (1,2)
            const boulderPosition: Position = { x: 1, y: 1 };
            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual({ x: 1, y: 2 });
            expect(result.playerCollision).toBe(true);
            expect(result.bombExplosion).toBe(false);
            expect(result.targetCell).toBe(CELL.PLAYER);
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('death');
        });
    });

    describe('Sound event generation for different collision types', () => {
        it('should generate appropriate sound events for each collision type', () => {
            const testCases = [
                { cell: CELL.ROCK, expectedVolume: 0.9, expectedPriority: 'high' as const },
                { cell: CELL.BOULDER, expectedVolume: 0.8, expectedPriority: 'high' as const },
                { cell: CELL.SOIL, expectedVolume: 0.7, expectedPriority: 'medium' as const },
                { cell: CELL.DIAMOND, expectedVolume: 0.8, expectedPriority: 'medium' as const },
                { cell: CELL.BOMB, expectedVolume: 0.9, expectedPriority: 'high' as const },
                { cell: CELL.EXIT, expectedVolume: 0.8, expectedPriority: 'medium' as const }
            ];

            testCases.forEach(({ cell, expectedVolume, expectedPriority }) => {
                const maze: MazeCell[][] = [
                    [CELL.BOULDER],
                    [cell]
                ];
                const boulderPosition: Position = { x: 0, y: 0 };

                const result = simulateEnhancedBoulderFall(maze, boulderPosition);

                // Should not move for solid objects (except player/bomb)
                if (cell !== CELL.PLAYER && cell !== CELL.BOMB) {
                    expect(result.newPosition).toEqual(boulderPosition);
                    expect(result.soundEvents).toHaveLength(0); // No collision sound in this implementation
                } else {
                    expect(result.newPosition).toEqual({ x: 0, y: 1 });
                    expect(result.soundEvents).toHaveLength(1);
                    expect(result.soundEvents[0]?.volume).toBe(expectedVolume);
                    expect(result.soundEvents[0]?.priority).toBe(expectedPriority);
                }
            });
        });

        it('should generate death sound for player collision', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.PLAYER]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('death');
            expect(result.soundEvents[0]?.source).toBe('boulder');
            expect(result.soundEvents[0]?.volume).toBe(1.0);
        });
    });

    describe('Boundary and edge case handling', () => {
        it('should handle boulder at maze edge correctly', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateEnhancedBoulderFall(maze, boulderPosition);

            // Boulder should not move (at bottom boundary)
            expect(result.newPosition).toEqual(boulderPosition);
            expect(result.soundEvents).toHaveLength(0);
        });

        it('should handle out of bounds collision detection', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY]
            ];
            const position: Position = { x: 1, y: 0 }; // Out of bounds horizontally

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('wall');
            expect(result.shouldStopBoulder).toBe(true);
        });

        it('should handle negative coordinates', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY]
            ];
            const position: Position = { x: -1, y: 0 }; // Negative coordinates

            const result = detectBoulderCollision(maze, position);

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('wall');
            expect(result.shouldStopBoulder).toBe(true);
        });
    });
});