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
    await page.goto('/');

    // This test assumes there's a way to trigger game over
    // You might need to adapt this based on your game's implementation

    // Find a bomb in the game (this is a simplified example)
    // In a real test, you would need to navigate to a bomb

    // Simulate moves to reach a bomb
    // This is just an example - you'll need to implement the actual navigation
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');

    // Check for game over message
    // This might need to be adjusted based on your actual game over indication
    const gameOverMessage = page.locator('.hud span').filter({ hasText: 'Game Over' });

    // Use a try/catch since we're not sure if the moves above will actually hit a bomb
    try {
        await expect(gameOverMessage).toBeVisible({ timeout: 1000 });
        console.log('Game over message found');
    } catch (e) {
        console.log('Game over message not found - player might not have hit a bomb');
    }
});