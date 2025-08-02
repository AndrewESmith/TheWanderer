import type { MazeLevelData } from "./IMazeLevelData";

/**
 * Interface for handling level transition results
 * Contains information about the success of level progression and what should happen next
 */
export interface LevelProgressionResult {
    /** Whether the level progression was successful */
    success: boolean;

    /** The next level's data if progression was successful and a next level exists */
    nextLevel?: MazeLevelData;

    /** Whether the game is complete (no more levels) */
    isGameComplete: boolean;

    /** The sound that should be played for this transition */
    soundToPlay: 'door_slam' | 'victory_sound';
}