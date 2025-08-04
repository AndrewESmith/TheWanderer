import { describe, it, expect } from 'vitest';
import { validateLevel, validateLevels } from '../levels/level-validation';
import { CELL } from '../maze';
import type { MazeLevelData } from '../Interfaces/IMazeLevelData';

describe('Level Validation', () => {
    const createValidLevel = (levelNumber: number = 1): MazeLevelData => ({
        levelNumber,
        maze: [
            // Row 0: Top border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            // Row 1: Player and path to exit
            [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOMB, CELL.EXIT, CELL.ROCK],
            // Rows 2-8: Fill with rocks and empty spaces
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            // Row 9: Bottom border
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ],
        moveLimit: 30,
        diamondCount: 1,
        bombCount: 1,
        rockCount: 64,
        playerStartPosition: { x: 1, y: 1 },
        exitPosition: { x: 14, y: 1 }
    });

    describe('validateLevel', () => {
        it('should validate a correct level', () => {
            const level = createValidLevel();
            const result = validateLevel(level);

            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should detect invalid maze dimensions', () => {
            const level = createValidLevel();
            level.maze = level.maze.slice(0, 8); // Remove 2 rows

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'dimension',
                    message: expect.stringContaining('Invalid maze height')
                })
            );
        });

        it('should detect invalid row width', () => {
            const level = createValidLevel();
            level.maze[1] = level.maze[1]!.slice(0, 14); // Remove 2 columns

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'dimension',
                    message: expect.stringContaining('Invalid maze width at row 1')
                })
            );
        });

        it('should detect diamond count mismatch', () => {
            const level = createValidLevel();
            level.diamondCount = 5; // Wrong count

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'element_count',
                    message: expect.stringContaining('Diamond count mismatch')
                })
            );
        });

        it('should detect bomb count mismatch', () => {
            const level = createValidLevel();
            level.bombCount = 3; // Wrong count

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'element_count',
                    message: expect.stringContaining('Bomb count mismatch')
                })
            );
        });

        it('should detect missing exit', () => {
            const level = createValidLevel();
            level.maze[1]![14] = CELL.EMPTY; // Remove exit

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'element_count',
                    message: expect.stringContaining('Exit count invalid')
                })
            );
        });

        it('should detect missing player', () => {
            const level = createValidLevel();
            level.maze[1]![1] = CELL.EMPTY; // Remove player

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'element_count',
                    message: expect.stringContaining('Player count invalid')
                })
            );
        });

        it('should detect player position mismatch', () => {
            const level = createValidLevel();
            level.playerStartPosition = { x: 2, y: 1 }; // Wrong position

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'position',
                    message: expect.stringContaining('Player not found at specified start position')
                })
            );
        });

        it('should detect exit position mismatch', () => {
            const level = createValidLevel();
            level.exitPosition = { x: 13, y: 1 }; // Wrong position

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'position',
                    message: expect.stringContaining('Exit not found at specified position')
                })
            );
        });

        it('should detect out of bounds positions', () => {
            const level = createValidLevel();
            level.playerStartPosition = { x: -1, y: 1 }; // Out of bounds

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'position',
                    message: expect.stringContaining('Player start position out of bounds')
                })
            );
        });

        it('should detect invalid level number', () => {
            const level = createValidLevel();
            level.levelNumber = 0; // Invalid

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'data_integrity',
                    message: expect.stringContaining('Invalid level number')
                })
            );
        });

        it('should detect invalid move limit', () => {
            const level = createValidLevel();
            level.moveLimit = -5; // Invalid

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'data_integrity',
                    message: expect.stringContaining('Invalid move limit')
                })
            );
        });

        it('should detect element count out of range', () => {
            const level = createValidLevel();
            level.maze[1]![3] = CELL.EMPTY; // Remove diamond
            level.diamondCount = 0; // Now 0 diamonds, which is out of range (min 1)

            const result = validateLevel(level);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'element_count',
                    message: expect.stringContaining('Diamond count out of range')
                })
            );
        });

        it('should generate warnings for unsealed borders', () => {
            const level = createValidLevel();
            level.maze[0]![5] = CELL.EMPTY; // Break top border

            const result = validateLevel(level);

            expect(result.warnings).toContainEqual(
                expect.objectContaining({
                    type: 'structure',
                    message: expect.stringContaining('Top border not properly sealed')
                })
            );
        });

        it('should handle validation errors gracefully', () => {
            const invalidLevel = {
                levelNumber: 1,
                maze: null, // Invalid maze data
                moveLimit: 30,
                diamondCount: 1,
                bombCount: 1,
                rockCount: 64,
                playerStartPosition: { x: 1, y: 1 },
                exitPosition: { x: 14, y: 1 }
            } as unknown as MazeLevelData;

            const result = validateLevel(invalidLevel);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'structure',
                    message: expect.stringContaining('Maze data is missing or not an array')
                })
            );
        });
    });

    describe('validateLevels', () => {
        it('should validate multiple levels', () => {
            const levels = [
                createValidLevel(1),
                createValidLevel(2),
                createValidLevel(3)
            ];

            const result = validateLevels(levels);

            expect(result.overallValid).toBe(true);
            expect(result.summary.totalLevels).toBe(3);
            expect(result.summary.validLevels).toBe(3);
            expect(result.summary.invalidLevels).toBe(0);
            expect(result.summary.totalErrors).toBe(0);
        });

        it('should detect invalid levels in a set', () => {
            const levels = [
                createValidLevel(1),
                { ...createValidLevel(2), diamondCount: 999 }, // Invalid
                createValidLevel(3)
            ];

            const result = validateLevels(levels);

            expect(result.overallValid).toBe(false);
            expect(result.summary.totalLevels).toBe(3);
            expect(result.summary.validLevels).toBe(2);
            expect(result.summary.invalidLevels).toBe(1);
            expect(result.summary.totalErrors).toBeGreaterThan(0);
        });

        it('should provide individual level results', () => {
            const levels = [
                createValidLevel(1),
                { ...createValidLevel(2), moveLimit: -1 } // Invalid
            ];

            const result = validateLevels(levels);

            expect(result.results.get(1)?.isValid).toBe(true);
            expect(result.results.get(2)?.isValid).toBe(false);
            expect(result.results.get(2)?.errors).toContainEqual(
                expect.objectContaining({
                    type: 'data_integrity',
                    message: expect.stringContaining('Invalid move limit')
                })
            );
        });
    });
});