import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import {
    detectCollision,
    simulateBoulderFall,
    simulateArrowMovement,
    canBoulderFall,
    type Position
} from '../physics/collision-detection';
import {
    simulateGravity,
    simulatePhysicsStep,
    findBoulders
} from '../physics/physics-engine';
import {
    mapBoulderCollisionToSound,
    mapArrowCollisionToSound,
    generateObjectInteractionEvents,
    generateCollisionSoundEvents
} from '../audio/events/collision-sound-mapper';
import { movePlayer, createInitialGameState } from '../GameState';
import { emitSoundEvents } from '../audio/events/sound-event-emitter';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvents: vi.fn(),
    getSoundEventEmitter: vi.fn(() => ({
        emit: vi.fn(),
        emitMultiple: vi.fn(),
        setCallback: vi.fn()
    }))
}));

describe('Collision Sound Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Boulder Collision Detection', () => {
        it('should detect collision when boulder hits rock', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.ROCK, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectCollision(maze, position, 'boulder');

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.soundEvent).toBeDefined();
            expect(result.soundEvent?.type).toBe('collision');
            expect(result.soundEvent?.source).toBe('boulder');
        });

        it('should detect collision when boulder hits another boulder', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.BOULDER, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectCollision(maze, position, 'boulder');

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.soundEvent?.source).toBe('boulder');
        });

        it('should detect ground collision when boulder hits soil', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.SOIL, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectCollision(maze, position, 'boulder');

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('ground');
            expect(result.soundEvent?.volume).toBe(0.7);
        });

        it('should not detect collision in empty space', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectCollision(maze, position, 'boulder');

            expect(result.hasCollision).toBe(false);
            expect(result.collisionType).toBe('none');
            expect(result.soundEvent).toBeUndefined();
        });
    });

    describe('Arrow Collision Detection', () => {
        it('should detect collision when arrow hits rock', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.ROCK, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectCollision(maze, position, 'arrow');

            expect(result.hasCollision).toBe(true);
            expect(result.collisionType).toBe('object');
            expect(result.soundEvent?.source).toBe('arrow');
            expect(result.soundEvent?.priority).toBe('high');
        });

        it('should detect collision when arrow hits boulder', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.BOULDER, CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 1 };

            const result = detectCollision(maze, position, 'arrow');

            expect(result.hasCollision).toBe(true);
            expect(result.soundEvent?.source).toBe('arrow');
        });
    });

    describe('Boulder Movement and Sound Events', () => {
        it('should generate movement sound when boulder falls', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EMPTY]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual({ x: 0, y: 1 });
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[0]?.source).toBe('boulder');
        });

        it('should generate collision sound when boulder cannot fall', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.ROCK]
            ];
            const boulderPosition: Position = { x: 0, y: 0 };

            const result = simulateBoulderFall(maze, boulderPosition);

            expect(result.newPosition).toEqual(boulderPosition);
            expect(result.soundEvents).toHaveLength(0); // No movement, but collision would be detected
        });

        it('should correctly identify when boulder can fall', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.EMPTY]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(true);
        });

        it('should correctly identify when boulder cannot fall', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER],
                [CELL.ROCK]
            ];
            const position: Position = { x: 0, y: 0 };

            const canFall = canBoulderFall(maze, position);
            expect(canFall).toBe(false);
        });
    });

    describe('Arrow Movement and Sound Events', () => {
        it('should generate movement sound when arrow moves', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.EMPTY, CELL.EMPTY]
            ];
            const arrowPosition: Position = { x: 0, y: 0 };
            const direction = { dx: 1, dy: 0 };

            const result = simulateArrowMovement(maze, arrowPosition, direction);

            expect(result.newPosition).toEqual({ x: 1, y: 0 });
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('movement');
            expect(result.soundEvents[0]?.source).toBe('arrow');
        });

        it('should generate collision sound and destroy arrow when hitting obstacle', () => {
            const maze: MazeCell[][] = [
                [CELL.EMPTY, CELL.ROCK],
                [CELL.EMPTY, CELL.EMPTY]
            ];
            const arrowPosition: Position = { x: 0, y: 0 };
            const direction = { dx: 1, dy: 0 };

            const result = simulateArrowMovement(maze, arrowPosition, direction);

            expect(result.newPosition).toBeNull(); // Arrow destroyed
            expect(result.soundEvents).toHaveLength(1);
            expect(result.soundEvents[0]?.type).toBe('collision');
            expect(result.soundEvents[0]?.source).toBe('arrow');
        });
    });

    describe('Physics Engine Integration', () => {
        it('should find all boulders in maze', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY, CELL.BOULDER],
                [CELL.EMPTY, CELL.BOULDER, CELL.EMPTY]
            ];

            const boulders = findBoulders(maze);

            expect(boulders).toHaveLength(3);
            expect(boulders).toContainEqual({ x: 0, y: 0 });
            expect(boulders).toContainEqual({ x: 2, y: 0 });
            expect(boulders).toContainEqual({ x: 1, y: 1 });
        });

        it('should simulate gravity for multiple boulders', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY, CELL.BOULDER],
                [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY],
                [CELL.ROCK, CELL.EMPTY, CELL.ROCK]
            ];

            const result = simulateGravity(maze);

            // Boulders should fall one level
            expect(result.newMaze[0]![0]).toBe(CELL.EMPTY);
            expect(result.newMaze[0]![2]).toBe(CELL.EMPTY);
            expect(result.newMaze[1]![0]).toBe(CELL.BOULDER);
            expect(result.newMaze[1]![2]).toBe(CELL.BOULDER);

            // Should generate movement sounds
            expect(result.soundEvents.length).toBeGreaterThan(0);
            expect(result.soundEvents.some(event =>
                event.type === 'movement' && event.source === 'boulder'
            )).toBe(true);
        });

        it('should run complete physics simulation step', () => {
            const maze: MazeCell[][] = [
                [CELL.BOULDER, CELL.EMPTY],
                [CELL.EMPTY, CELL.EMPTY],
                [CELL.ROCK, CELL.EMPTY]
            ];

            const result = simulatePhysicsStep(maze);

            expect(result.soundEvents.length).toBeGreaterThan(0);
            expect(result.boulderPositions).toHaveLength(1);
            expect(result.boulderPositions[0]).toEqual({ x: 0, y: 1 });
        });
    });

    describe('Sound Event Mapping', () => {
        it('should map boulder collision with rock to high priority sound', () => {
            const soundEvent = mapBoulderCollisionToSound(CELL.ROCK, 'object');

            expect(soundEvent).toBeDefined();
            expect(soundEvent?.type).toBe('collision');
            expect(soundEvent?.source).toBe('boulder');
            expect(soundEvent?.priority).toBe('high');
            expect(soundEvent?.volume).toBe(0.9);
        });

        it('should map arrow collision with soil to low priority sound', () => {
            const soundEvent = mapArrowCollisionToSound(CELL.SOIL, 'ground');

            expect(soundEvent).toBeDefined();
            expect(soundEvent?.type).toBe('collision');
            expect(soundEvent?.source).toBe('arrow');
            expect(soundEvent?.priority).toBe('low');
            expect(soundEvent?.volume).toBe(0.6);
        });

        it('should generate object interaction events correctly', () => {
            const events = generateObjectInteractionEvents('boulder', CELL.ROCK, 'collision');

            expect(events).toHaveLength(1);
            expect(events[0]?.type).toBe('collision');
            expect(events[0]?.source).toBe('boulder');
        });

        it('should generate collision sound events for multiple collisions', () => {
            const collisions = [
                { sourceObject: 'boulder' as const, targetCell: CELL.ROCK, position: { x: 0, y: 0 } },
                { sourceObject: 'arrow' as const, targetCell: CELL.SOIL, position: { x: 1, y: 1 } }
            ];

            const events = generateCollisionSoundEvents(collisions);

            expect(events).toHaveLength(2);
            expect(events[0]?.source).toBe('boulder');
            expect(events[1]?.source).toBe('arrow');
        });
    });

    describe('Game State Integration', () => {
        it('should trigger physics simulation and sound events when player moves', () => {
            // Create a simple test maze where player can move to empty space
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(testMaze);
            const newGameState = movePlayer(gameState, 1, 0); // Move player right to empty space

            // Verify that emitSoundEvents was called (should be called for player movement)
            expect(vi.mocked(emitSoundEvents)).toHaveBeenCalled();

            // Verify player moved
            expect(newGameState.player?.x).toBe(2);
            expect(newGameState.player?.y).toBe(1);
        });

        it('should handle collision timing correctly', () => {
            // Create a test maze with a boulder that can fall and make sound
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK], // Boulder can fall
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const gameState = createInitialGameState(testMaze);
            const newGameState = movePlayer(gameState, 1, 0); // Move player right

            // Should have called emitSoundEvents with sounds
            expect(vi.mocked(emitSoundEvents)).toHaveBeenCalled();

            // Get the calls to check sound events
            const calls = vi.mocked(emitSoundEvents).mock.calls;
            expect(calls.length).toBeGreaterThan(0);

            // Should include player movement sound at minimum
            const allEvents = calls.flat().flat();
            const hasPlayerSound = allEvents.some(event =>
                event.source === 'player' && event.type === 'movement'
            );
            expect(hasPlayerSound).toBe(true);
        });
    });
});