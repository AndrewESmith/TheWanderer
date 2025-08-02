import type { MazeCell } from "../maze";
import type { IPlayerPos } from "./IPlayerPos";

/**
 * Interface defining the structure of each maze level's configuration
 * Contains all necessary data to initialize and manage a specific level
 */
export interface MazeLevelData {
    /** Unique identifier for the level (1, 2, 3, etc.) */
    levelNumber: number;

    /** 2D array representing the maze layout with all game elements */
    maze: MazeCell[][];

    /** Maximum number of moves allowed for this level */
    moveLimit: number;

    /** Number of diamonds placed in this level */
    diamondCount: number;

    /** Number of bombs placed in this level */
    bombCount: number;

    /** Number of rocks placed in this level */
    rockCount: number;

    /** Starting position for the player in this level */
    playerStartPosition: IPlayerPos;

    /** Position of the exit in this level */
    exitPosition: IPlayerPos;
}