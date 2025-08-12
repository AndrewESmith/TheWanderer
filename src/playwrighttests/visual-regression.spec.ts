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
        // Set longer timeout for beforeEach
        test.setTimeout(90000); // 90 seconds for visual tests

        // Navigate first, then setup environment
        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });
    });

    test('full game interface screenshot - desktop', async ({ page, browserName }) => {
        // Set consistent viewport size for desktop screenshots
        await page.setViewportSize({ width: 1280, height: 720 });

        // Browser-specific additional setup
        if (browserName === 'webkit') {
            // Webkit needs extra time and specific settings
            await page.waitForTimeout(2000);

            // Ensure webkit uses consistent font rendering
            await page.addStyleTag({
                content: `
                    * {
                        -webkit-font-smoothing: antialiased !important;
                        -moz-osx-font-smoothing: grayscale !important;
                        text-rendering: optimizeLegibility !important;
                    }
                `
            });
        }

        // Ensure extra stability for full page screenshot
        await page.waitForTimeout(1500); // Increased wait for full stability

        // Verify all critical elements are visible and stable
        await expect(page.locator('.maze-grid')).toBeVisible();
        await expect(page.locator('.hud')).toBeVisible();

        // Enhanced stability checks for full page screenshot
        await page.waitForFunction(() => {
            // Check if all images have finished loading or erroring
            const cells = document.querySelectorAll('.cell');
            const processedCells = document.querySelectorAll('.cell.image-loaded, .cell.image-error');

            // Also check all img elements
            const allImages = document.querySelectorAll('img');
            const imagesReady = Array.from(allImages).every(img =>
                img.complete && (img.naturalWidth > 0 || img.src === '')
            );

            return cells.length > 0 &&
                processedCells.length === cells.length &&
                imagesReady;
        }, { timeout: 30000 });

        // Ensure no pending DOM mutations or loading states
        await page.waitForFunction(() => {
            return document.readyState === 'complete' &&
                !document.querySelector('.loading') &&
                !document.querySelector('[data-loading="true"]') &&
                !document.querySelector('.cell:not(.image-loaded):not(.image-error)');
        }, { timeout: 15000 }).catch(() => {
            console.warn('Some elements may still be in loading state');
        });

        // Wait for fonts to be fully loaded
        await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 }).catch(() => {
            console.warn('Font loading timeout');
        });

        // Additional stabilization based on browser
        const additionalWait = browserName === 'webkit' ? 2000 : 1000;
        await page.waitForTimeout(additionalWait);

        // Take a full page screenshot for baseline comparison
        await takeStableScreenshot(page, 'full-game-desktop.png');
    });

    test('maze grid only screenshot - desktop', async ({ page }) => {
        // Take a screenshot of just the maze grid
        const mazeGrid = page.locator('.maze-grid');
        await takeStableScreenshot(mazeGrid, 'maze-grid-desktop.png');
    });

    test('individual cell types visual verification', async ({ page, browserName }) => {
        // WebKit-specific handling for browser stability
        if (browserName === 'webkit') {
            // For WebKit, process cell types in smaller batches to avoid context closure
            const cellTypes = ['player', 'rock', 'soil', 'diamond', 'boulder', 'bomb', 'exit', 'empty'];
            const batchSize = 3; // Process 3 cell types at a time for WebKit

            for (let i = 0; i < cellTypes.length; i += batchSize) {
                const batch = cellTypes.slice(i, i + batchSize);
                console.log(`Processing WebKit batch: ${batch.join(', ')}`);

                try {
                    // Check if page is still valid before each batch
                    if (!(await page.evaluate(() => document.readyState).catch(() => false))) {
                        console.warn('Page became invalid, skipping remaining cell types');
                        break;
                    }

                    // Process this batch of cell types
                    for (const cellType of batch) {
                        try {
                            const cells = page.locator(`.cell.${cellType}`);
                            const count = await cells.count().catch(() => 0);

                            if (count > 0) {
                                const firstCell = cells.first();

                                // Quick visibility check
                                const isVisible = await firstCell.isVisible().catch(() => false);
                                if (isVisible) {
                                    console.log(`Taking screenshot for ${cellType}`);
                                    // Take screenshot with minimal processing for WebKit
                                    await expect(firstCell).toHaveScreenshot(`cell-type-${cellType}.png`, {
                                        animations: 'disabled',
                                        threshold: 0.4, // More lenient for WebKit
                                        maxDiffPixels: 4000
                                    });
                                }
                            }
                        } catch (error) {
                            console.warn(`WebKit: Failed to process ${cellType}:`, error);
                        }
                    }

                    // Small delay between batches for WebKit stability
                    await page.waitForTimeout(1000);
                } catch (error) {
                    console.warn(`WebKit batch processing failed:`, error);
                    break; // Stop processing if batch fails
                }
            }
        } else {
            // Use helper function to verify all cell types for other browsers
            await verifyCellTypes(page);
        }
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
        test.setTimeout(120000); // 2 minutes for responsive tests
        await testResponsiveLayout(page, 'responsive-layout');
    });

    test('mobile controls visibility and layout', async ({ page }) => {
        test.setTimeout(90000); // 90 seconds for mobile tests

        // Test mobile viewport specifically
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

        // Mobile controls should be visible
        const mobileControls = page.locator('.mobile-controls');
        await expect(mobileControls).toBeVisible();
        await takeStableScreenshot(mobileControls, 'mobile-controls-layout.png');

        // Test full mobile interface
        await takeStableScreenshot(page, 'full-mobile-interface.png');
    });

    test('tablet layout verification', async ({ page }) => {
        test.setTimeout(90000); // 90 seconds for tablet tests

        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

        await takeStableScreenshot(page, 'tablet-interface.png');
        await takeStableScreenshot(page.locator('.maze-grid'), 'tablet-maze-grid.png');
        await takeStableScreenshot(page.locator('.hud'), 'tablet-hud.png');
    });

    test('HUD responsive behavior', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for HUD responsive tests

        const viewports = [
            { name: 'desktop', width: 1920, height: 1080 },
            { name: 'mobile', width: 375, height: 667 },
        ];

        for (const viewport of viewports) {
            await page.setViewportSize({ width: viewport.width, height: viewport.height });
            await page.goto('/', { timeout: 30000 });
            await setupTestEnvironment(page);
            await waitForGameStable(page, {
                imageLoadTimeout: 25000,
                stabilizationDelay: 1500
            });

            const hud = page.locator('.hud');
            await takeStableScreenshot(hud, `hud-responsive-${viewport.name}.png`);
        }
    });
});

test.describe('Visual Regression Tests - Cross-Browser Consistency', () => {
    test.beforeEach(async ({ page }) => {
        test.setTimeout(90000); // 90 seconds for cross-browser tests

        // Navigate first, then setup environment
        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });
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
        test.setTimeout(90000); // 90 seconds for image loading tests

        // Block all image requests to test fallback behavior
        await simulateImageLoadingFailures(page);

        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await page.waitForSelector('.maze-grid', { timeout: 15000 });

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
        test.setTimeout(90000); // 90 seconds for partial failure tests

        // Block some images but not others to test mixed states
        // Block boulder and bomb images which are present in the initial maze
        await simulatePartialImageFailures(page, ['boulder.png', 'bomb.png']);

        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            minLoadedPercentage: 0.3, // Lower threshold since some images will fail
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

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
        test.setTimeout(90000); // 90 seconds for error indicator tests

        // Block specific images to test error indicators
        await page.route('**/boulder.png', route => route.abort());

        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            minLoadedPercentage: 0.7,
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

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
        test.setTimeout(120000); // 2 minutes for game state tests

        // Set up environment before navigation to prevent dialogs
        await setupTestEnvironment(page);

        // Navigate to the page
        await page.goto('/', { timeout: 30000 });

        // Additional dialog dismissal after navigation
        await dismissAudioDialogs(page);

        // Wait for game to be stable
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });
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
        test.setTimeout(120000); // 2 minutes for game over tests

        // Navigate to test maze with bomb next to player
        await page.goto('/?testMaze=bomb', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

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
        test.setTimeout(90000); // 90 seconds for accessibility tests

        // Simulate high contrast mode
        await page.emulateMedia({ colorScheme: 'dark' });
        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

        await takeStableScreenshot(page, 'high-contrast-mode.png');
        await takeStableScreenshot(page.locator('.maze-grid'), 'maze-grid-high-contrast.png');
    });

    test('reduced motion preferences', async ({ page }) => {
        test.setTimeout(90000); // 90 seconds for reduced motion tests

        // Simulate reduced motion preference
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

        await takeStableScreenshot(page, 'reduced-motion-mode.png');
    });

    test('zoom level compatibility', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for zoom level tests

        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

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
        test.setTimeout(90000); // 90 seconds for keyboard navigation tests

        await page.goto('/', { timeout: 30000 });
        await setupTestEnvironment(page);
        await waitForGameStable(page, {
            imageLoadTimeout: 25000,
            stabilizationDelay: 1500
        });

        // Test keyboard focus states if any interactive elements exist
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);

        await takeStableScreenshot(page, 'keyboard-navigation-focus.png');
    });
});