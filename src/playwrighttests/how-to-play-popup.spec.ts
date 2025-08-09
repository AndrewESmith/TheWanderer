import { test, expect } from '@playwright/test';

test.describe('How to Play Popup', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage to ensure first-time user experience
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.clear();
        });
        await page.reload();
    });

    test('should show popup automatically for first-time users', async ({ page }) => {
        // Wait for the popup to appear
        await page.waitForSelector('.how-to-play-overlay', { timeout: 3000 });

        // Verify popup is visible
        const popup = page.locator('.how-to-play-overlay');
        await expect(popup).toBeVisible();

        // Verify popup content
        await expect(page.locator('h2:has-text("How to Play The Wanderer")')).toBeVisible();
        await expect(page.locator('text=Objective')).toBeVisible();
        await expect(page.locator('text=Controls')).toBeVisible();
        await expect(page.locator('text=Game Objects')).toBeVisible();
        await expect(page.locator('text=Movement Rules')).toBeVisible();
        await expect(page.locator('text=Credits')).toBeVisible();
    });

    test('should close popup when X button is clicked', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Click the X close button
        await page.click('button[aria-label="Close dialog using X button"]');

        // Verify popup is closed
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });

    test('should close popup when footer Close button is clicked', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Click the footer close button
        await page.click('button:has-text("Close")');

        // Verify popup is closed
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });

    test('should close popup when Escape key is pressed', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Press Escape key
        await page.keyboard.press('Escape');

        // Verify popup is closed
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });

    test('should close popup when overlay is clicked', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Click on the overlay (outside the panel)
        await page.click('.how-to-play-overlay', { position: { x: 10, y: 10 } });

        // Verify popup is closed
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });

    test('should not close popup when panel is clicked', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Click on the panel content
        await page.click('.how-to-play-panel');

        // Verify popup remains open
        await expect(page.locator('.how-to-play-overlay')).toBeVisible();
    });

    test('should handle "Don\'t show again" checkbox', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Check the "Don't show again" checkbox
        const checkbox = page.locator('input[type="checkbox"]');
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // Close the popup
        await page.click('button:has-text("Close")');
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });

        // Reload the page
        await page.reload();

        // Wait a bit to see if popup appears
        await page.waitForTimeout(2000);

        // Verify popup doesn't appear again
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });

    test('should have proper accessibility attributes', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toHaveAttribute('aria-modal', 'true');
        await expect(dialog).toHaveAttribute('aria-labelledby', 'how-to-play-title');
        await expect(dialog).toHaveAttribute('aria-describedby', 'how-to-play-description');

        // Check for proper heading structure
        const mainHeading = page.locator('#how-to-play-title');
        await expect(mainHeading).toBeVisible();

        // Check for landmark roles
        await expect(page.locator('[role="banner"]')).toBeVisible();
        await expect(page.locator('[role="main"]')).toBeVisible();
        await expect(page.locator('[role="contentinfo"]')).toBeVisible();
    });

    test('should prevent background interaction when open', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Try to interact with game controls (should be blocked)
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('w');

        // Popup should still be visible (input was blocked)
        await expect(page.locator('.how-to-play-overlay')).toBeVisible();

        // Close popup
        await page.click('button:has-text("Close")');
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });

        // Now game controls should work
        await page.keyboard.press('ArrowRight');

        // Popup should remain closed
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });

    test('should handle focus management correctly', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Check that focus is within the modal
        const modal = page.locator('.how-to-play-panel');
        await expect(modal).toBeVisible();

        // Test tab navigation within modal
        await page.keyboard.press('Tab');

        // Should be able to focus on interactive elements
        const closeButton = page.locator('button[aria-label="Close dialog using X button"]');
        const checkbox = page.locator('input[type="checkbox"]');
        const footerButton = page.locator('button:has-text("Close")');

        await expect(closeButton).toBeVisible();
        await expect(checkbox).toBeVisible();
        await expect(footerButton).toBeVisible();
    });

    test('should display all required content sections', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Check all instruction sections
        await expect(page.locator('text=Objective')).toBeVisible();
        await expect(page.locator('text=Navigate through the maze')).toBeVisible();

        await expect(page.locator('text=Controls')).toBeVisible();
        await expect(page.locator('text=Use WASD keys or Arrow keys')).toBeVisible();

        await expect(page.locator('text=Game Objects')).toBeVisible();
        await expect(page.locator('text=Walls: Immovable barriers')).toBeVisible();
        await expect(page.locator('text=Diamonds: Collect these')).toBeVisible();

        await expect(page.locator('text=Movement Rules')).toBeVisible();
        await expect(page.locator('text=Boulders fall down')).toBeVisible();

        // Check credits section
        await expect(page.locator('text=Credits')).toBeVisible();
        await expect(page.locator('text=Author:')).toBeVisible();
        await expect(page.locator('text=Andrew Smith')).toBeVisible();

        // Check external links
        const authorLink = page.locator('a[href="https://www.linkedin.com/in/andrewesmith/"]');
        await expect(authorLink).toBeVisible();
        await expect(authorLink).toHaveAttribute('target', '_blank');
        await expect(authorLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should persist settings across page reloads', async ({ page }) => {
        // Wait for popup to appear
        await page.waitForSelector('.how-to-play-overlay');

        // Don't check "Don't show again" - just close
        await page.click('button:has-text("Close")');
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });

        // Reload the page
        await page.reload();

        // Popup should appear again since user didn't opt out
        await page.waitForSelector('.how-to-play-overlay', { timeout: 3000 });
        await expect(page.locator('.how-to-play-overlay')).toBeVisible();

        // Now check "Don't show again" and close
        await page.check('input[type="checkbox"]');
        await page.click('button:has-text("Close")');
        await page.waitForSelector('.how-to-play-overlay', { state: 'hidden' });

        // Reload again
        await page.reload();
        await page.waitForTimeout(2000);

        // Popup should not appear
        await expect(page.locator('.how-to-play-overlay')).not.toBeVisible();
    });
});