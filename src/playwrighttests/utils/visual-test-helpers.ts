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

    await expect(locator).toHaveScreenshot(name, {
        animations: opts.disableAnimations ? 'disabled' : 'allow',
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
                // Prevent "How to Play" dialog
                localStorage.setItem('wanderer-how-to-play-settings', JSON.stringify({
                    dontShowAgain: true,
                    hasSeenInstructions: true,
                    lastViewedVersion: '1.0.0'
                }));

                // Set audio preferences to avoid audio-related popups
                localStorage.setItem('wanderer-audio-settings', JSON.stringify({
                    enabled: false,
                    volume: 0.5,
                    userHasInteracted: true
                }));
            }
        } catch (error) {
            console.warn('Could not access localStorage:', error);
        }
    });
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
    // Initial state
    await waitForGameStable(page);
    await takeStableScreenshot(page.locator('.maze-grid'), 'game-state-initial.png');

    // After player movement
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
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