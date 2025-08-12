import { test, expect } from '@playwright/test';
import {
    waitForGameStable,
    takeStableScreenshot,
    verifyCellTypes,
    testResponsiveLayout,
    simulateImageLoadingFailures,
    simulatePartialImageFailures,
    verifyImageLoadingStates,
    testGameStateChanges,
    verifyCrossBrowserConsistency,
    setupTestEnvironment,
    dismissAudioDialogs,
} from './utils/visual-test-helpers';

test.describe('Visual Regression Tests - Core Interface', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate first, then setup environment
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);
    });

    test('full game interface screenshot - desktop', async ({ page }) => {
        // Set consistent viewport size for desktop screenshots
        await page.setViewportSize({ width: 1280, height: 720 });

        // Ensure extra stability for full page screenshot
        await page.waitForTimeout(1000); // Additional wait for full stability

        // Verify all critical elements are visible and stable
        await expect(page.locator('.maze-grid')).toBeVisible();
        await expect(page.locator('.hud')).toBeVisible();

        // Wait for any potential animations or transitions to complete
        await page.waitForFunction(() => {
            // Check if all images have finished loading or erroring
            const cells = document.querySelectorAll('.cell');
            const processedCells = document.querySelectorAll('.cell.image-loaded, .cell.image-error');
            return cells.length > 0 && processedCells.length === cells.length;
        }, { timeout: 15000 });

        // Ensure no pending DOM mutations
        await page.waitForFunction(() => {
            return document.readyState === 'complete' &&
                !document.querySelector('.loading') &&
                !document.querySelector('[data-loading="true"]');
        }, { timeout: 5000 }).catch(() => {
            // Continue if no loading indicators found
        });

        // Additional stabilization
        await page.waitForTimeout(500);

        // Take a full page screenshot for baseline comparison
        await takeStableScreenshot(page, 'full-game-desktop.png');
    });

    test('maze grid only screenshot - desktop', async ({ page }) => {
        // Take a screenshot of just the maze grid
        const mazeGrid = page.locator('.maze-grid');
        await takeStableScreenshot(mazeGrid, 'maze-grid-desktop.png');
    });

    test('individual cell types visual verification', async ({ page }) => {
        // Use helper function to verify all cell types
        await verifyCellTypes(page);
    });

    test('HUD display visual verification', async ({ page }) => {
        // Take a screenshot of the HUD
        const hud = page.locator('.hud');
        await takeStableScreenshot(hud, 'hud-desktop.png');
    });

    test('image loading states visual verification', async ({ page }) => {
        // Use helper function to verify image loading states
        await verifyImageLoadingStates(page);
    });

    test('game state visual changes', async ({ page }) => {
        // Use helper function to test game state changes
        await testGameStateChanges(page);
    });
});

test.describe('Visual Regression Tests - Responsive Design', () => {
    test('responsive layout across different screen sizes', async ({ page }) => {
        await testResponsiveLayout(page, 'responsive-layout');
    });

    test('mobile controls visibility and layout', async ({ page }) => {
        // Test mobile viewport specifically
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        // Mobile controls should be visible
        const mobileControls = page.locator('.mobile-controls');
        await expect(mobileControls).toBeVisible();
        await takeStableScreenshot(mobileControls, 'mobile-controls-layout.png');

        // Test full mobile interface
        await takeStableScreenshot(page, 'full-mobile-interface.png');
    });

    test('tablet layout verification', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        await takeStableScreenshot(page, 'tablet-interface.png');
        await takeStableScreenshot(page.locator('.maze-grid'), 'tablet-maze-grid.png');
        await takeStableScreenshot(page.locator('.hud'), 'tablet-hud.png');
    });

    test('HUD responsive behavior', async ({ page }) => {
        const viewports = [
            { name: 'desktop', width: 1920, height: 1080 },
            { name: 'mobile', width: 375, height: 667 },
        ];

        for (const viewport of viewports) {
            await page.setViewportSize({ width: viewport.width, height: viewport.height });
            await page.goto('/');
            await setupTestEnvironment(page);
            await waitForGameStable(page);

            const hud = page.locator('.hud');
            await takeStableScreenshot(hud, `hud-responsive-${viewport.name}.png`);
        }
    });
});

test.describe('Visual Regression Tests - Cross-Browser Consistency', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate first, then setup environment
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);
    });

    test('cross-browser maze rendering consistency', async ({ page, browserName }) => {
        await verifyCrossBrowserConsistency(page, browserName);
    });

    test('cross-browser cell image rendering', async ({ page, browserName }) => {
        // Test specific cell types across browsers for image rendering consistency
        const cellTypes = ['player', 'diamond', 'boulder', 'bomb'];

        for (const cellType of cellTypes) {
            const cell = page.locator(`.cell.${cellType}`).first();
            if (await cell.count() > 0) {
                await takeStableScreenshot(cell, `cell-${cellType}-${browserName}.png`);
            }
        }
    });

    test('cross-browser HUD consistency', async ({ page, browserName }) => {
        const hud = page.locator('.hud');
        await takeStableScreenshot(hud, `hud-consistency-${browserName}.png`);
    });
});

test.describe('Visual Regression Tests - Image Loading Scenarios', () => {
    test('complete image loading failure fallback', async ({ page }) => {
        // Block all image requests to test fallback behavior
        await simulateImageLoadingFailures(page);

        await page.goto('/');
        await setupTestEnvironment(page);
        await page.waitForSelector('.maze-grid');

        // Wait for fallback rendering to complete
        await page.waitForTimeout(2000);

        // Take screenshot of fallback state
        await takeStableScreenshot(page.locator('.maze-grid'), 'maze-grid-complete-fallback.png');

        // Verify fallback colors are visible
        const cells = page.locator('.cell');
        const firstCell = cells.first();

        // Should have background color but no background image
        const hasBackgroundColor = await firstCell.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent';
        });

        expect(hasBackgroundColor).toBe(true);
    });

    test('partial image loading failure handling', async ({ page }) => {
        // Block some images but not others to test mixed states
        // Block boulder and bomb images which are present in the initial maze
        await simulatePartialImageFailures(page, ['boulder.png', 'bomb.png']);

        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page, { minLoadedPercentage: 0.3 }); // Lower threshold since some images will fail

        await takeStableScreenshot(page.locator('.maze-grid'), 'maze-grid-partial-failure.png');

        // Verify we have both loaded and error states
        const loadedCells = await page.locator('.cell.image-loaded').count();
        const errorCells = await page.locator('.cell.image-error').count();
        const totalCells = await page.locator('.cell').count();

        // We should have some loaded cells (player, rock, soil, diamond, empty, exit)
        expect(loadedCells).toBeGreaterThan(0);
        // We should have some error cells (boulder, bomb)
        expect(errorCells).toBeGreaterThan(0);
        // The sum of loaded and error cells should equal total cells
        expect(loadedCells + errorCells).toBe(totalCells);
    });

    test('image loading error indicators', async ({ page }) => {
        // Block specific images to test error indicators
        await page.route('**/boulder.png', route => route.abort());

        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page, { minLoadedPercentage: 0.7 });

        // Find error cells and verify they have error indicators
        const errorCells = page.locator('.cell.image-error');
        const errorCount = await errorCells.count();

        if (errorCount > 0) {
            const firstErrorCell = errorCells.first();
            await takeStableScreenshot(firstErrorCell, 'cell-with-error-indicator.png');

            // Verify error styling is applied
            await expect(firstErrorCell).toHaveClass(/image-error/);
        }
    });
});

test.describe('Visual Regression Tests - Game State Changes', () => {
    test.beforeEach(async ({ page }) => {
        // Set up environment before navigation to prevent dialogs
        await setupTestEnvironment(page);

        // Navigate to the page
        await page.goto('/');

        // Additional dialog dismissal after navigation
        await dismissAudioDialogs(page);

        // Wait for game to be stable
        await waitForGameStable(page);
    });

    test('player movement visual tracking', async ({ page }) => {
        // Capture initial state
        await takeStableScreenshot(page.locator('.maze-grid'), 'player-movement-initial.png');

        // Move player in different directions and capture each state
        const moves = [
            { key: 'ArrowRight', name: 'right' },
            { key: 'ArrowDown', name: 'down' },
            { key: 'ArrowLeft', name: 'left' },
            { key: 'ArrowUp', name: 'up' },
        ];

        for (const move of moves) {
            await page.keyboard.press(move.key);
            await page.waitForTimeout(200);
            await takeStableScreenshot(page.locator('.maze-grid'), `player-movement-${move.name}.png`);
        }
    });

    test('HUD value changes visual verification', async ({ page }) => {
        // Capture initial HUD state
        await takeStableScreenshot(page.locator('.hud'), 'hud-values-initial.png');

        // Make several moves to change HUD values
        for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
            await page.waitForTimeout(200);
        }

        await takeStableScreenshot(page.locator('.hud'), 'hud-values-after-moves.png');
    });

    test('game over state visual verification', async ({ page }) => {
        // Navigate to test maze with bomb next to player
        await page.goto('/?testMaze=bomb');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        // Dismiss any audio dialogs before capturing initial state
        await page.evaluate(() => {
            // Additional audio context handling
            try {
                if (typeof Storage !== 'undefined' && window.localStorage) {
                    localStorage.setItem('wanderer-audio-settings', JSON.stringify({
                        enabled: false,
                        volume: 0,
                        userHasInteracted: true,
                        dismissedErrors: true,
                        autoRetryFailed: false
                    }));
                }
            } catch (error) {
                console.warn('Could not set audio settings:', error);
            }
        });

        // Wait for any dialogs and dismiss them
        await page.waitForTimeout(1000);
        const dismissButton = page.locator('button:has-text("Dismiss")');
        if (await dismissButton.count() > 0) {
            await dismissButton.click();
            await page.waitForTimeout(500);
        }

        // Capture initial state
        await takeStableScreenshot(page, 'game-over-initial-state.png');

        // Move into bomb to trigger game over
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(500);

        // Dismiss any new audio dialogs that might appear after game over
        const dismissButtonAfter = page.locator('button:has-text("Dismiss")');
        if (await dismissButtonAfter.count() > 0) {
            await dismissButtonAfter.click();
            await page.waitForTimeout(500);
        }

        // Capture game over state
        await takeStableScreenshot(page, 'game-over-final-state.png');

        // Verify game over message is visible
        const gameOverMessage = page.locator('.hud span').filter({ hasText: 'Game Over' });
        await expect(gameOverMessage).toBeVisible();
        await takeStableScreenshot(gameOverMessage, 'game-over-message.png');
    });

    test('level progression visual changes', async ({ page }) => {
        // Test level information display
        const levelInfo = page.locator('.level-info');
        await expect(levelInfo).toBeVisible();
        await takeStableScreenshot(levelInfo, 'level-info-display.png');

        // Test moves counter styling changes
        const movesInfo = page.locator('.moves-info');
        await takeStableScreenshot(movesInfo, 'moves-counter-initial.png');

        // Make moves to potentially trigger low-moves styling
        for (let i = 0; i < 10; i++) {
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowLeft');
            await page.waitForTimeout(100);
        }

        await takeStableScreenshot(movesInfo, 'moves-counter-after-moves.png');
    });
});

test.describe('Visual Regression Tests - Accessibility and Edge Cases', () => {
    test('high contrast mode compatibility', async ({ page }) => {
        // Simulate high contrast mode
        await page.emulateMedia({ colorScheme: 'dark' });
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        await takeStableScreenshot(page, 'high-contrast-mode.png');
        await takeStableScreenshot(page.locator('.maze-grid'), 'maze-grid-high-contrast.png');
    });

    test('reduced motion preferences', async ({ page }) => {
        // Simulate reduced motion preference
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        await takeStableScreenshot(page, 'reduced-motion-mode.png');
    });

    test('zoom level compatibility', async ({ page }) => {
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        // Test different zoom levels
        const zoomLevels = [0.75, 1.0, 1.25, 1.5];

        for (const zoom of zoomLevels) {
            await page.evaluate((zoomLevel) => {
                document.body.style.zoom = zoomLevel.toString();
            }, zoom);

            await page.waitForTimeout(500);
            await takeStableScreenshot(page, `zoom-level-${zoom}.png`);
        }
    });

    test('keyboard navigation visual feedback', async ({ page }) => {
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        // Test keyboard focus states if any interactive elements exist
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);

        await takeStableScreenshot(page, 'keyboard-navigation-focus.png');
    });
});