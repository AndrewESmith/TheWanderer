import type { MazeLevelData } from "./IMazeLevelData";

/**
 * Interface for managing level progression and navigation
 * Provides methods to navigate between levels and access level data
 */
export interface MazeLevelManager {
    /** 
     * Get the current level's data
     * @returns The current level configuration
     */
    getCurrentLevel(): MazeLevelData;

    /** 
     * Check if there is a next level available
     * @returns true if a next level exists, false otherwise
     */
    hasNextLevel(): boolean;

    /** 
     * Advance to the next level
     * @returns The next level's data, or null if no next level exists
     */
    advanceToNextLevel(): MazeLevelData | null;

    /** 
     * Get the total number of levels available
     * @returns Total count of levels
     */
    getTotalLevels(): number;

    /** 
     * Get the current level number
     * @returns Current level number (1-based)
     */
    getCurrentLevelNumber(): number;
}