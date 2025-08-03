import type { LevelProgressionResult } from "../Interfaces/ILevelProgressionResult";
import type { MazeLevelManager } from "../Interfaces/IMazeLevelManager";
import type { SoundEvent } from "../Interfaces/ISoundEvent";
import { emitSoundEvent } from "../audio/events/sound-event-emitter";

/**
 * Interface for level progression handler
 * Manages transitions between levels and determines appropriate sounds
 */
export interface LevelProgressionHandler {
    /**
     * Process level completion and determine next action
     * @param levelManager The current level manager instance
     * @returns Result containing progression information and sound to play
     */
    processLevelCompletion(levelManager: MazeLevelManager): LevelProgressionResult;

    /**
     * Check if the player has completed the current level (reached exit with no diamonds)
     * @param gameState Current game state indicating if player won
     * @param diamonds Number of diamonds remaining
     * @returns true if level is complete, false otherwise
     */
    isLevelComplete(gameState: 'playing' | 'dead' | 'won', diamonds: number): boolean;

    /**
     * Generate and emit the appropriate sound event for level progression
     * @param result The level progression result containing sound information
     */
    emitLevelProgressionSound(result: LevelProgressionResult): void;
}

/**
 * Implementation of LevelProgressionHandler following functional programming patterns
 * Handles level transitions, completion detection, and sound event generation
 */
export function createLevelProgressionHandler(): LevelProgressionHandler {

    const processLevelCompletion = (levelManager: MazeLevelManager): LevelProgressionResult => {
        // Check if there's a next level available
        const hasNext = levelManager.hasNextLevel();

        if (hasNext) {
            // Advance to next level
            const nextLevel = levelManager.advanceToNextLevel();

            if (nextLevel) {
                return {
                    success: true,
                    nextLevel,
                    isGameComplete: false,
                    soundToPlay: 'door_slam'
                };
            } else {
                // This shouldn't happen if hasNextLevel() returned true
                return {
                    success: false,
                    isGameComplete: true,
                    soundToPlay: 'victory'
                };
            }
        } else {
            // No more levels - game is complete
            return {
                success: true,
                isGameComplete: true,
                soundToPlay: 'victory'
            };
        }
    };

    const isLevelComplete = (gameState: 'playing' | 'dead' | 'won', diamonds: number): boolean => {
        // Level is complete when player has won (reached exit) and collected all diamonds
        return gameState === 'won' && diamonds === 0;
    };

    const emitLevelProgressionSound = (result: LevelProgressionResult): void => {
        const soundEvent: SoundEvent = {
            type: result.soundToPlay,
            source: 'system',
            priority: 'high'
        };

        emitSoundEvent(soundEvent);
    };

    return {
        processLevelCompletion,
        isLevelComplete,
        emitLevelProgressionSound
    };
}