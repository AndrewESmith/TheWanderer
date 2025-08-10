import { test, expect } from '@playwright/test';

// Test the application loads correctly
test('application loads with correct title', async ({ page }) => {
    await page.goto('/');

    // Check the title
    await expect(page).toHaveTitle(/The Wanderer/);

    // Check that the game grid is visible
    const mazeGrid = page.locator('.maze-grid');
    await expect(mazeGrid).toBeVisible();
});

// Test the game HUD displays correctly
test('game HUD displays score, diamonds, and moves', async ({ page }) => {
    await page.goto('/');

    // Check that the HUD elements are visible
    const hud = page.locator('.hud');
    await expect(hud).toBeVisible();

    // Check for score display
    const scoreElement = page.locator('.hud span').filter({ hasText: /Score:/ });
    await expect(scoreElement).toBeVisible();

    // Check for diamonds display
    const diamondsElement = page.locator('.hud span').filter({ hasText: /Diamonds left:/ });
    await expect(diamondsElement).toBeVisible();

    // Check for moves display
    const movesElement = page.locator('.hud span').filter({ hasText: /Moves:/ });
    await expect(movesElement).toBeVisible();
});

// Test keyboard controls
test('player moves with keyboard controls', async ({ page }) => {
    // Clear localStorage to ensure clean state
    await page.goto('/');
    await page.evaluate(() => {
        localStorage.clear();
    });
    await page.reload();

    // Wait for the game to be fully loaded
    await page.waitForSelector('.maze-grid');
    await page.waitForSelector('.hud');

    // Handle the How to Play popup that appears for first-time users
    const popup = page.locator('[data-testid="how-to-play-popup"]');

    try {
        // Wait for popup to appear (it should appear automatically for first-time users)
        await expect(popup).toBeVisible({ timeout: 2000 });

        // Close the popup to allow game interaction
        const closeButton = page.locator('[data-testid="close-button"]');
        await closeButton.click();
        await expect(popup).not.toBeVisible();
    } catch (error) {
        // If popup doesn't appear, that's fine - continue with the test
        console.log('How to Play popup did not appear, continuing with test');
    }

    // Wait for game to be ready for interaction
    await page.waitForTimeout(500);

    // Check that the game is in playing state
    const gameStatus = page.locator('.hud span').filter({ hasText: /Game Over|Level Complete|Victory/ });
    await expect(gameStatus).not.toBeVisible();

    // Find the player cell
    const playerCell = page.locator('.cell.player');
    await expect(playerCell).toBeVisible();

    // Get initial moves count to verify game state changes
    const movesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
    const initialMoves = movesText ? parseInt(movesText.match(/Moves: (\d+)/)?.[1] || '0') : 0;

    // Ensure the game area has focus by clicking on it
    await page.locator('.maze-container').click();

    // Wait a moment for focus to be established
    await page.waitForTimeout(100);

    // Press the right arrow key
    await page.keyboard.press('ArrowRight');

    // Wait for movement to complete
    await page.waitForTimeout(500);

    // Check if moves count changed (indicating the game registered the input)
    // Note: moves counter shows remaining moves, so it should decrease
    const newMovesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
    const newMoves = newMovesText ? parseInt(newMovesText.match(/Moves: (\d+)/)?.[1] || '0') : 0;

    // Verify that the move was registered (moves should decrease)
    expect(newMoves).toBeLessThan(initialMoves);

    // Alternative approach: Check if there are multiple player cells (old and new position)
    // or if the player cell has moved by checking grid position
    const allPlayerCells = page.locator('.cell.player');
    const playerCellCount = await allPlayerCells.count();

    // There should still be exactly one player cell
    expect(playerCellCount).toBe(1);

    // Get the final player cell and verify it exists
    const finalPlayerCell = page.locator('.cell.player');
    await expect(finalPlayerCell).toBeVisible();
});

// Test game over scenario
test('game shows game over when player hits bomb', async ({ page }) => {
    // Load the game with our test-specific maze that has a bomb right next to the player
    await page.goto('/?testMaze=bomb');

    // Wait for the game to load
    await page.waitForSelector('.maze-grid');

    // Handle the How to Play popup that appears for first-time users
    const popup = page.locator('[data-testid="how-to-play-popup"]');
    const isPopupVisible = await popup.isVisible();

    if (isPopupVisible) {
        // Close the popup to allow game interaction
        const closeButton = page.locator('[data-testid="close-button"]');
        await closeButton.click();
        await expect(popup).not.toBeVisible();
    }

    // In our test maze, the bomb is directly to the right of the player
    await page.keyboard.press('ArrowRight');

    // Check for game over message
    const gameOverMessage = page.locator('.hud span').filter({ hasText: 'Game Over' });

    // Verify the game over message is visible
    await expect(gameOverMessage).toBeVisible({ timeout: 2000 });
});