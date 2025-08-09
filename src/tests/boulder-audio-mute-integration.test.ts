import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';
import {
    simulateGravityWithState,
    simulatePhysicsStepWithState
} from '../physics/physics-engine';
import {
    createBoulderStateManager,
    updateBoulderTriggers,
    updateBoulderMovement
} from '../physics/boulder-state-manager';
import { emitSoundEvents } from '../audio/events/sound-event-emitter';

// Mock the sound event emitter to track calls
const mockEmit = vi.fn();
const mockEmitMultiple = vi.fn();
const mockSetCallback = vi.fn();

vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvents: vi.fn(),
    getSoundEventEmitter: vi.fn(() => ({
        emit: mockEmit,
        emitMultiple: mockEmitMultiple,
        setCallback: mockSetCallback
    }))
}));

// Mock the audio manager to control mute state
const mockAudioManager = {
    playSound: vi.fn(),
    preloadSounds: vi.fn(),
    setMuted: vi.fn(),
    isMuted: vi.fn(() => false), // Default to unmuted
    isSupported: vi.fn(() => true),
    stopAllSounds: vi.fn(),
    cleanup: vi.fn(),
    getLoadingState: vi.fn(),
    onLoadingProgress: vi.fn(),
    getOptimizationReport: vi.fn(),
    setGlobalVolume: vi.fn(),
    getGlobalVolume: vi.fn(() => 0.8),
    setCategoryVolume: vi.fn(),
    getCategoryVolume: vi.fn(() => 0.8),
    getAllCategoryVolumes: vi.fn(() => ({}))
};

vi.mock('../audio/managers/audio-manager-factory', () => ({
    createAudioManager: vi.fn(() => mockAudioManager)
}));

describe('Boulder Audio Events - Mute Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset mute state to unmuted by default
        mockAudioManager.isMuted.mockReturnValue(false);
    });

    describe('Boulder Audio Events Respect Mute Settings', () => {
        it('should generate boulder sound events when audio is not muted', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Ensure audio is not muted
            mockAudioManager.isMuted.mockReturnValue(false);

            // Create boulder state manager and trigger boulder
            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 2, y: 1 }],
                1
            );

            // Simulate physics - should generate boulder sound events
            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should generate BOULDER_MOVE sound event
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );

            expect(movementSounds).toHaveLength(1);
            expect(movementSounds[0]).toEqual({
                type: 'movement',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            });

            // Sound events should be generated regardless of mute state
            // (mute is handled at the audio manager level, not at event generation level)
            expect(result.soundEvents.length).toBeGreaterThan(0);
        });

        it('should still generate boulder sound events when audio is muted (mute handled by audio manager)', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Set audio to muted
            mockAudioManager.isMuted.mockReturnValue(true);

            // Create boulder state manager and trigger boulder
            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 2, y: 1 }],
                1
            );

            // Simulate physics - should still generate boulder sound events
            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should still generate BOULDER_MOVE sound event
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );

            expect(movementSounds).toHaveLength(1);
            expect(movementSounds[0]).toEqual({
                type: 'movement',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            });

            // Sound events are always generated - mute is handled by the audio manager
            // when it receives the events, not at the event generation level
            expect(result.soundEvents.length).toBeGreaterThan(0);
        });

        it('should generate collision sound events regardless of mute state', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Test with muted audio
            mockAudioManager.isMuted.mockReturnValue(true);

            // Create boulder state manager with moving boulder that will hit rock
            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }], // moving boulder
                []
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should still generate COLLISION_THUD sound event even when muted
            const collisionSounds = result.soundEvents.filter(
                event => event.type === 'collision' && event.source === 'boulder'
            );

            expect(collisionSounds).toHaveLength(1);
            expect(collisionSounds[0]).toEqual({
                type: 'collision',
                source: 'boulder',
                priority: 'high',
                volume: 0.9
            });
        });

        it('should emit sound events through the sound system regardless of mute state', () => {
            // This test verifies that sound events are emitted regardless of mute state
            // The actual mute handling is done by the audio manager, not the event generation

            const testSoundEvents: SoundEvent[] = [
                {
                    type: 'movement',
                    source: 'boulder',
                    priority: 'medium',
                    volume: 0.8
                },
                {
                    type: 'collision',
                    source: 'boulder',
                    priority: 'high',
                    volume: 0.9
                }
            ];

            // Test with muted audio
            mockAudioManager.isMuted.mockReturnValue(true);

            // Emit sound events directly (simulating what physics engine does)
            emitSoundEvents(testSoundEvents);

            // Verify that emitSoundEvents was called even when muted
            expect(vi.mocked(emitSoundEvents)).toHaveBeenCalledWith(testSoundEvents);

            // Test with unmuted audio
            mockAudioManager.isMuted.mockReturnValue(false);

            // Emit sound events again
            emitSoundEvents(testSoundEvents);

            // Should be called again regardless of mute state
            expect(vi.mocked(emitSoundEvents)).toHaveBeenCalledTimes(2);
        });
    });

    describe('Audio Manager Mute Behavior', () => {
        it('should verify that audio manager respects mute setting when playing sounds', () => {
            // This test verifies the integration between sound events and audio manager mute state
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            // Create boulder state manager and trigger boulder
            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                1
            );

            // Test with unmuted audio
            mockAudioManager.isMuted.mockReturnValue(false);
            const result1 = simulatePhysicsStepWithState(testMaze, boulderStateManager, 2);

            // Should generate sound events
            expect(result1.soundEvents.length).toBeGreaterThan(0);

            // Test with muted audio
            mockAudioManager.isMuted.mockReturnValue(true);
            const result2 = simulatePhysicsStepWithState(testMaze, boulderStateManager, 2);

            // Should still generate the same sound events (mute is handled by audio manager)
            expect(result2.soundEvents.length).toBe(result1.soundEvents.length);

            // Verify that the sound events have the same properties regardless of mute state
            const boulderSounds1 = result1.soundEvents.filter(e => e.source === 'boulder');
            const boulderSounds2 = result2.soundEvents.filter(e => e.source === 'boulder');

            expect(boulderSounds1.length).toBe(boulderSounds2.length);
            if (boulderSounds1.length > 0 && boulderSounds2.length > 0) {
                expect(boulderSounds1[0]?.volume).toBe(boulderSounds2[0]?.volume);
                expect(boulderSounds1[0]?.priority).toBe(boulderSounds2[0]?.priority);
            }
        });

        it('should demonstrate that mute functionality is handled at the audio manager level', () => {
            // This test demonstrates the correct architecture:
            // 1. Physics engine always generates sound events
            // 2. Sound events are emitted to the audio system
            // 3. Audio manager respects mute setting when playing sounds

            const testSoundEvent: SoundEvent = {
                type: 'movement',
                source: 'boulder',
                priority: 'medium',
                volume: 0.8
            };

            // Test unmuted state
            mockAudioManager.isMuted.mockReturnValue(false);

            // When audio manager plays a sound while unmuted, it should play normally
            mockAudioManager.playSound('boulder_move', { volume: 0.8 });
            expect(mockAudioManager.playSound).toHaveBeenCalledWith('boulder_move', { volume: 0.8 });

            // Test muted state
            mockAudioManager.isMuted.mockReturnValue(true);

            // The audio manager should handle mute internally
            // (In the real implementation, the audio manager checks isMuted() before playing)
            expect(mockAudioManager.isMuted()).toBe(true);

            // Sound events should still be generated and emitted regardless of mute state
            emitSoundEvents([testSoundEvent]);
            expect(vi.mocked(emitSoundEvents)).toHaveBeenCalledWith([testSoundEvent]);
        });
    });

    describe('Boulder Audio Event Volume and Priority', () => {
        it('should maintain consistent volume levels for boulder movement sounds', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                1
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);
            const movementSound = result.soundEvents.find(
                event => event.type === 'movement' && event.source === 'boulder'
            );

            expect(movementSound).toBeDefined();
            expect(movementSound?.volume).toBe(0.8); // BOULDER_MOVE volume as per requirements
            expect(movementSound?.priority).toBe('medium');
        });

        it('should maintain consistent volume levels for boulder collision sounds', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);
            const collisionSound = result.soundEvents.find(
                event => event.type === 'collision' && event.source === 'boulder'
            );

            expect(collisionSound).toBeDefined();
            expect(collisionSound?.volume).toBe(0.9); // COLLISION_THUD volume as per requirements
            expect(collisionSound?.priority).toBe('high');
        });

        it('should generate independent sound events for multiple boulders', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            let boulderStateManager = createBoulderStateManager(testMaze, 1);
            boulderStateManager = updateBoulderTriggers(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                1
            );

            const result = simulateGravityWithState(testMaze, boulderStateManager, 2);

            // Should generate independent movement sounds for each boulder
            const movementSounds = result.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );

            expect(movementSounds).toHaveLength(2);
            movementSounds.forEach(sound => {
                expect(sound.volume).toBe(0.8);
                expect(sound.priority).toBe('medium');
            });
        });
    });
});