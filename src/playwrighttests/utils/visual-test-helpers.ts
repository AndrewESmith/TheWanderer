import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Visual regression test utilities for The Wanderer game
 */

export interface VisualTestOptions {
    /** Timeout for waiting for images to load */
    imageLoadTimeout?: number;
    /** Minimum percentage of images that should be loaded */
    minLoadedPercentage?: number;
    /** Additional wait time after loading */
    stabilizationDelay?: number;
    /** Whether to disable animations */
    disableAnimations?: boolean;
}

export const DEFAULT_VISUAL_OPTIONS: Required<VisualTestOptions> = {
    imageLoadTimeout: 10000,
    minLoadedPercentage: 0.8,
    stabilizationDelay: 500,
    disableAnimations: true,
};

/**
 * Wait for the game to be in a stable visual state
 */
export async function waitForGameStable(
    page: Page,
    options: VisualTestOptions = {}
): Promise<void> {
    const opts = { ...DEFAULT_VISUAL_OPTIONS, ...options };

    // Wait for the maze grid to be visible first
    await page.waitForSelector('.maze-grid', { timeout: 5000 });

    // Set localStorage to prevent "How to Play" dialog from showing
    // Use try-catch to handle localStorage access errors
    await page.evaluate(() => {
        try {
            if (typeof Storage !== 'undefined' && window.localStorage) {
                localStorage.setItem('wanderer-how-to-play-settings', JSON.stringify({
                    dontShowAgain: true,
                    hasSeenInstructions: true,
                    lastViewedVersion: '1.0.0'
                }));
            }
        } catch (error) {
            console.warn('Could not access localStorage:', error);
        }
    });

    // Close any open dialogs that might still appear
    await dismissAudioDialogs(page);

    const closeButton = page.locator('button:has-text("Close"), button[aria-label*="Close"], button:has-text("×")');
    if (await closeButton.count() > 0) {
        await closeButton.first().click();
        await page.waitForTimeout(500);
    }

    // Wait for images to load by checking for image-loaded class on cells
    await page.waitForFunction(
        ({ minPercentage }) => {
            const cells = document.querySelectorAll('.cell');
            const loadedCells = document.querySelectorAll('.cell.image-loaded');
            const errorCells = document.querySelectorAll('.cell.image-error');

            // Consider both loaded and error cells as "processed"
            const processedCells = loadedCells.length + errorCells.length;

            return cells.length > 0 && processedCells >= cells.length * minPercentage;
        },
        { minPercentage: opts.minLoadedPercentage },
        { timeout: opts.imageLoadTimeout }
    );

    // Wait for any pending DOM updates to complete
    await page.waitForFunction(() => {
        // Check if document is ready and no pending image loads
        return document.readyState === 'complete' &&
            !document.querySelector('.cell:not(.image-loaded):not(.image-error)');
    }, { timeout: 5000 }).catch(() => {
        // If this fails, continue anyway as it's an additional check
        console.warn('Some cells may still be in loading state');
    });

    // Additional stabilization delay
    await page.waitForTimeout(opts.stabilizationDelay);
}

/**
 * Take a screenshot with consistent options
 */
export async function takeStableScreenshot(
    locator: any,
    name: string,
    options: VisualTestOptions = {}
): Promise<void> {
    const opts = { ...DEFAULT_VISUAL_OPTIONS, ...options };

    // Wait a moment before taking screenshot to ensure stability
    // Handle both Page and Locator objects
    const page = locator.page ? locator.page() : locator;

    // Multiple stability checks
    await page.waitForTimeout(100);

    // Wait for any pending network requests to complete
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {
        // Continue if network idle timeout - some requests might be ongoing
    });

    // Wait for fonts to be fully loaded
    await page.waitForFunction(() => document.fonts.ready, { timeout: 3000 }).catch(() => {
        // Continue if fonts timeout
    });

    await expect(locator).toHaveScreenshot(name, {
        animations: opts.disableAnimations ? 'disabled' : 'allow',
        threshold: 0.15, // Slightly more strict threshold for better consistency
        maxDiffPixels: 1000, // Allow up to 1000 different pixels for minor variations
    });
}

/**
 * Verify all cell types are visually rendered correctly
 */
export async function verifyCellTypes(page: Page): Promise<void> {
    const cellTypes = ['player', 'rock', 'soil', 'diamond', 'boulder', 'bomb', 'exit', 'empty'];

    for (const cellType of cellTypes) {
        const cells = page.locator(`.cell.${cellType}`);
        const count = await cells.count();

        if (count > 0) {
            // Take screenshot of first instance of each cell type
            const firstCell = cells.first();
            await takeStableScreenshot(firstCell, `cell-type-${cellType}.png`);

            // Verify the cell has proper styling
            await expect(firstCell).toHaveClass(new RegExp(`cell.*${cellType}`));

            // Check if image loaded successfully or has error state
            const hasImageLoaded = await firstCell.evaluate((el) =>
                el.classList.contains('image-loaded')
            );
            const hasImageError = await firstCell.evaluate((el) =>
                el.classList.contains('image-error')
            );

            // At least one should be true (either loaded or error state)
            if (!hasImageLoaded && !hasImageError) {
                console.warn(`Cell type ${cellType} appears to be in loading state`);
            }
        }
    }
}

/**
 * Setup test environment with consistent state
 */
export async function setupTestEnvironment(page: Page): Promise<void> {
    // Set localStorage to prevent dialogs and ensure consistent state
    // Use try-catch to handle localStorage access errors
    await page.evaluate(() => {
        try {
            if (typeof Storage !== 'undefined' && window.localStorage) {
                // Prevent "How to Play" dialog with multiple possible keys
                const howToPlaySettings = {
                    dontShowAgain: true,
                    hasSeenInstructions: true,
                    lastViewedVersion: '1.0.0',
                    dismissed: true,
                    showOnStartup: false
                };

                localStorage.setItem('wanderer-how-to-play-settings', JSON.stringify(howToPlaySettings));
                localStorage.setItem('how-to-play-settings', JSON.stringify(howToPlaySettings));
                localStorage.setItem('wanderer-tutorial-dismissed', 'true');
                localStorage.setItem('tutorial-dismissed', 'true');

                // Set audio preferences to avoid audio-related popups
                const audioSettings = {
                    enabled: false,
                    volume: 0,
                    userHasInteracted: true,
                    dismissedErrors: true,
                    autoRetryFailed: false,
                    muted: true
                };

                localStorage.setItem('wanderer-audio-settings', JSON.stringify(audioSettings));
                localStorage.setItem('audio-settings', JSON.stringify(audioSettings));
            }
        } catch (error) {
            console.warn('Could not access localStorage:', error);
        }
    });

    // Dismiss any audio error dialogs that might appear
    await dismissAudioDialogs(page);
}

/**
 * Dismiss any dialogs that might interfere with tests
 */
export async function dismissAudioDialogs(page: Page): Promise<void> {
    // Wait a moment for any dialogs to appear
    await page.waitForTimeout(500);

    // First, try to dismiss "How to Play" dialog if it appears
    const howToPlayDialog = page.locator('[data-testid="how-to-play-popup"]');
    if (await howToPlayDialog.count() > 0) {
        // Try different ways to close the How to Play dialog
        const closeButtons = [
            '[data-testid="close-button"]', // Specific close button
            'button.close-footer-button', // Footer close button
            '[data-testid="how-to-play-popup"] button:has-text("×")',
            '.how-to-play-overlay .close-button'
        ];

        for (const selector of closeButtons) {
            const button = page.locator(selector);
            if (await button.count() > 0) {
                try {
                    // Use first() to handle multiple matches
                    await button.first().click({ timeout: 2000 });
                    await page.waitForTimeout(500);
                    break;
                } catch (error) {
                    console.warn(`Could not click ${selector}:`, error);
                }
            }
        }

        // If buttons don't work, try pressing Escape
        if (await howToPlayDialog.count() > 0) {
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);
        }
    }

    // Then look for audio dialog dismiss buttons
    const dismissButtons = [
        'button:has-text("Dismiss")',
        'button:has-text("OK")',
        'button[aria-label*="dismiss"]',
        'button[aria-label*="close"]',
        '.audio-error-dialog button:last-child',
        '.dialog button:has-text("Dismiss")'
    ];

    for (const selector of dismissButtons) {
        const button = page.locator(selector);
        if (await button.count() > 0 && await button.isVisible()) {
            try {
                await button.click({ timeout: 2000 });
                await page.waitForTimeout(300);
                break;
            } catch (error) {
                console.warn(`Could not click ${selector}:`, error);
            }
        }
    }
}

/**
 * Test responsive behavior across different viewport sizes
 */
export async function testResponsiveLayout(
    page: Page,
    testName: string
): Promise<void> {
    const viewports = [
        { name: 'desktop', width: 1920, height: 1080 },
        { name: 'laptop', width: 1366, height: 768 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'mobile', width: 375, height: 667 },
    ];

    for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        // Navigate first, then setup environment
        await page.goto('/');
        await setupTestEnvironment(page);
        await waitForGameStable(page);

        // Take full page screenshot
        await takeStableScreenshot(page, `${testName}-${viewport.name}.png`);

        // Take maze grid screenshot
        const mazeGrid = page.locator('.maze-grid');
        await takeStableScreenshot(mazeGrid, `${testName}-maze-${viewport.name}.png`);

        // Take HUD screenshot
        const hud = page.locator('.hud');
        await takeStableScreenshot(hud, `${testName}-hud-${viewport.name}.png`);
    }
}

/**
 * Simulate image loading failures for fallback testing
 */
export async function simulateImageLoadingFailures(
    page: Page,
    failurePatterns: string[] = ['**/*.png']
): Promise<void> {
    for (const pattern of failurePatterns) {
        await page.route(pattern, route => route.abort());
    }
}

/**
 * Simulate partial image loading failures
 */
export async function simulatePartialImageFailures(
    page: Page,
    failedImages: string[] = ['boulder.png', 'bomb.png']
): Promise<void> {
    for (const imageName of failedImages) {
        await page.route(`**/${imageName}`, route => route.abort());
    }
}

/**
 * Verify image loading states are properly handled
 */
export async function verifyImageLoadingStates(page: Page): Promise<void> {
    // Check for loaded images
    const loadedCells = page.locator('.cell.image-loaded');
    const loadedCount = await loadedCells.count();

    // Check for error images
    const errorCells = page.locator('.cell.image-error');
    const errorCount = await errorCells.count();

    // Check for loading images
    const loadingCells = page.locator('.cell.image-loading');
    const loadingCount = await loadingCells.count();

    console.log(`Image states - Loaded: ${loadedCount}, Error: ${errorCount}, Loading: ${loadingCount}`);

    // Take screenshots of different states if they exist
    if (loadedCount > 0) {
        await takeStableScreenshot(loadedCells.first(), 'image-state-loaded.png');
    }

    if (errorCount > 0) {
        await takeStableScreenshot(errorCells.first(), 'image-state-error.png');
    }

    if (loadingCount > 0) {
        await takeStableScreenshot(loadingCells.first(), 'image-state-loading.png');
    }
}

/**
 * Test game state visual changes
 */
export async function testGameStateChanges(page: Page): Promise<void> {
    // IMPORTANT: This test verifies that player movement is visually apparent
    // It takes screenshots before and after movement to ensure the player position changes
    // If this test fails, check PLAYER_MOVEMENT_FIX_DOCUMENTATION.md for troubleshooting

    // Ensure game is stable and ready for input
    await waitForGameStable(page);

    // Ensure How to Play popup is dismissed and game has focus
    await dismissAudioDialogs(page);

    // Click on the maze container to ensure focus
    await page.locator('.maze-container').click();
    await page.waitForTimeout(100);

    // Verify game is in playing state
    const gameStatus = page.locator('.hud span').filter({ hasText: /Game Over|Level Complete|Victory/ });
    await expect(gameStatus).not.toBeVisible();

    // Initial state
    await takeStableScreenshot(page.locator('.maze-grid'), 'game-state-initial.png');

    // Get initial player position for verification
    const initialPlayerCell = page.locator('.cell.player');
    await expect(initialPlayerCell).toBeVisible();

    // Get initial moves count
    const initialMovesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
    const initialMoves = initialMovesText ? parseInt(initialMovesText.match(/Moves: (\d+)/)?.[1] || '0') : 0;

    // After player movement
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500); // Increased wait time for movement to complete

    // Verify the move was registered by checking moves count changed
    const newMovesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
    const newMoves = newMovesText ? parseInt(newMovesText.match(/Moves: (\d+)/)?.[1] || '0') : 0;

    // Moves should have decreased (remaining moves counter)
    expect(newMoves).toBeLessThan(initialMoves);

    await takeStableScreenshot(page.locator('.maze-grid'), 'game-state-after-move.png');

    // HUD changes
    await takeStableScreenshot(page.locator('.hud'), 'hud-state-after-move.png');
}

/**
 * Verify cross-browser consistency
 */
export async function verifyCrossBrowserConsistency(
    page: Page,
    browserName: string
): Promise<void> {
    await waitForGameStable(page);

    // Take browser-specific screenshots
    await takeStableScreenshot(
        page.locator('.maze-grid'),
        `cross-browser-maze-${browserName}.png`
    );

    await takeStableScreenshot(
        page.locator('.hud'),
        `cross-browser-hud-${browserName}.png`
    );

    // Test specific cell types across browsers
    const playerCell = page.locator('.cell.player').first();
    if (await playerCell.count() > 0) {
        await takeStableScreenshot(playerCell, `cross-browser-player-${browserName}.png`);
    }
}