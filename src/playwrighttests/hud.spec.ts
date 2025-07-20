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
    await page.goto('/');

    // Find the player cell
    const playerCell = page.locator('.cell.player');
    await expect(playerCell).toBeVisible();

    // Get the initial position
    const initialPosition = await playerCell.boundingBox();

    // Press the right arrow key
    await page.keyboard.press('ArrowRight');

    // Wait for animation or movement to complete
    await page.waitForTimeout(100);

    // Get the new position
    const newPlayerCell = page.locator('.cell.player');
    const newPosition = await newPlayerCell.boundingBox();

    // Check if the position has changed (this might need adjustment based on your game's implementation)
    expect(newPosition).not.toEqual(initialPosition);
});

// Test game over scenario
test('game shows game over when player hits bomb', async ({ page }) => {
    // Load the game with our test-specific maze that has a bomb right next to the player
    await page.goto('/?testMaze=bomb');

    // Wait for the game to load
    await page.waitForSelector('.maze-grid');

    // In our test maze, the bomb is directly to the right of the player
    await page.keyboard.press('ArrowRight');

    // Check for game over message
    const gameOverMessage = page.locator('.hud span').filter({ hasText: 'Game Over' });

    // Verify the game over message is visible
    await expect(gameOverMessage).toBeVisible({ timeout: 2000 });
});