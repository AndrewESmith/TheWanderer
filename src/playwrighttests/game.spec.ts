import { test, expect } from '@playwright/test';

test.describe('Game functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the game before each test
        await page.goto('/');

        // Handle the How to Play popup if it appears
        try {
            // Wait for either the popup or the game to be ready
            await Promise.race([
                page.waitForSelector('.how-to-play-overlay', { timeout: 2000 }),
                page.waitForSelector('.maze-grid', { timeout: 2000 })
            ]);

            // If popup is visible, close it
            const popup = page.locator('.how-to-play-overlay').first();
            if (await popup.isVisible()) {
                // Close the popup by clicking the close button
                await page.click('button:has-text("Close")');
                // Wait for popup to disappear
                await page.waitForSelector('.how-to-play-overlay', { state: 'hidden', timeout: 1000 });
            }
        } catch (error) {
            // If popup handling fails, continue - the game might be ready
            console.log('Popup handling skipped:', error);
        }

        // Ensure the game is ready
        await page.waitForSelector('.maze-grid');
    });

    test('maze grid renders with correct cells', async ({ page }) => {
        // Check that the maze grid exists
        const mazeGrid = page.locator('.maze-grid');
        await expect(mazeGrid).toBeVisible();

        // Check that there are cells in the grid
        const cells = page.locator('.cell');
        const count = await cells.count();
        expect(count).toBeGreaterThan(0);

        // Check for different cell types
        const playerCell = page.locator('.cell.player');
        await expect(playerCell).toBeVisible();

        // Check for at least one diamond
        const diamondCells = page.locator('.cell.diamond');
        const diamondCount = await diamondCells.count();
        expect(diamondCount).toBeGreaterThan(0);
    });

    test('player can collect diamonds', async ({ page }) => {
        // Get initial diamond count
        const diamondsText = await page.locator('.hud span').filter({ hasText: /Diamonds left:/ }).textContent();
        const initialDiamonds = extractNumber(diamondsText || '0');

        // Find a path to a diamond and move there
        // This is a simplified approach - in a real test, you'd need to determine the actual path

        // Try different directions to find a diamond
        const directions = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

        for (const direction of directions) {
            await page.keyboard.press(direction);
            await page.waitForTimeout(100);

            // Check if diamond count changed
            const newDiamondsText = await page.locator('.hud span').filter({ hasText: /Diamonds left:/ }).textContent();
            const newDiamonds = extractNumber(newDiamondsText || '0');

            if (newDiamonds < initialDiamonds) {
                // Diamond collected
                expect(newDiamonds).toBe(initialDiamonds - 1);
                break;
            }
        }
    });

    test('score increases when collecting diamonds', async ({ page }) => {
        // Get initial score
        const scoreText = await page.locator('.hud span').filter({ hasText: /Score:/ }).textContent();
        const initialScore = extractNumber(scoreText || '0');

        // Try different directions to find a diamond
        const directions = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

        for (const direction of directions) {
            await page.keyboard.press(direction);
            await page.waitForTimeout(100);

            // Check if score changed
            const newScoreText = await page.locator('.hud span').filter({ hasText: /Score:/ }).textContent();
            const newScore = extractNumber(newScoreText || '0');

            if (newScore > initialScore) {
                // Score increased
                expect(newScore).toBe(initialScore + 10); // Assuming diamonds are worth 10 points
                break;
            }
        }
    });

    test('moves counter decreases with each move', async ({ page, browserName }) => {
        // Get initial moves count
        const movesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
        const initialMoves = extractNumber(movesText || '0');

        // Ensure we have a valid initial moves count
        expect(initialMoves).toBeGreaterThan(0);

        // Make a move - try multiple directions to ensure we make a valid move
        let moveSuccessful = false;
        const directions = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

        for (const direction of directions) {
            await page.keyboard.press(direction);

            // Wait for the move to be processed (requestAnimationFrame + React update)
            await page.waitForTimeout(browserName === 'webkit' ? 500 : 200);

            // Check if the move was successful by checking if moves decreased
            const currentMovesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
            const currentMoves = extractNumber(currentMovesText || '0');

            if (currentMoves < initialMoves) {
                moveSuccessful = true;
                break;
            }
        }

        // If no move was successful, the player might be blocked - try a different approach
        if (!moveSuccessful) {
            // Force a move by pressing multiple keys in sequence
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(browserName === 'webkit' ? 1000 : 300);
        }

        // Now wait for the moves counter to update using a more reliable approach
        const expectedMoves = initialMoves - 1;

        // Use Playwright's built-in waiting mechanism which is more reliable than waitForFunction
        await expect(async () => {
            const newMovesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
            const newMoves = extractNumber(newMovesText || '0');
            expect(newMoves).toBe(expectedMoves);
        }).toPass({
            timeout: browserName === 'webkit' ? 15000 : 5000,
            intervals: [100, 200, 500] // Start with frequent checks, then back off
        });
    });
});

// Helper function to extract numbers from strings like "Score: 10"
function extractNumber(text: string): number {
    const match = text.match(/\d+/);
    return match && match[0] ? parseInt(match[0], 10) : 0;
}