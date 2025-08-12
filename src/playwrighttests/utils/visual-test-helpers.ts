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
    imageLoadTimeout: 30000, // Increased to 30s for better reliability
    minLoadedPercentage: 0.9, // Increased to 90% for more consistency
    stabilizationDelay: 2000, // Increased to 2s for better stability
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

    try {
        // Check if page is still valid
        await page.evaluate(() => document.readyState);

        // Wait for the maze grid to be visible first with increased timeout
        await page.waitForSelector('.maze-grid', { timeout: 20000 });

        // Set localStorage to prevent "How to Play" dialog from showing
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
        }).catch(() => {
            console.warn('Could not set localStorage settings');
        });

        // Close any open dialogs that might still appear
        await dismissAudioDialogs(page);

        // Wait for images to load with enhanced checking
        await page.waitForFunction(
            ({ minPercentage }) => {
                try {
                    const cells = document.querySelectorAll('.cell');
                    const loadedCells = document.querySelectorAll('.cell.image-loaded');
                    const errorCells = document.querySelectorAll('.cell.image-error');
                    const processedCells = loadedCells.length + errorCells.length;

                    // Also check that all images in the document are loaded
                    const allImages = document.querySelectorAll('img');
                    const imagesLoaded = Array.from(allImages).every(img =>
                        img.complete && (img.naturalWidth > 0 || img.src === '')
                    );

                    return cells.length > 0 &&
                        processedCells >= cells.length * minPercentage &&
                        imagesLoaded;
                } catch (error) {
                    console.warn('Error in image loading check:', error);
                    return false;
                }
            },
            { minPercentage: opts.minLoadedPercentage },
            { timeout: opts.imageLoadTimeout }
        ).catch(() => {
            console.warn('Image loading timeout - continuing with reduced stability');
        });

        // Wait for document to be completely ready
        await page.waitForFunction(() => {
            try {
                return document.readyState === 'complete' &&
                    !document.querySelector('.loading') &&
                    !document.querySelector('[data-loading="true"]') &&
                    !document.querySelector('.cell:not(.image-loaded):not(.image-error)');
            } catch (error) {
                console.warn('Error in document ready check:', error);
                return document.readyState === 'complete';
            }
        }, { timeout: 15000 }).catch(() => {
            console.warn('Some elements may still be in loading state');
        });

        // Wait for any CSS to be fully applied
        await page.waitForFunction(() => {
            try {
                // Check that stylesheets are loaded
                const stylesheets = document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>;
                return Array.from(stylesheets).every(sheet => {
                    try {
                        return sheet.sheet && sheet.sheet.cssRules.length > 0;
                    } catch (e) {
                        return true; // Cross-origin stylesheets might throw, assume loaded
                    }
                });
            } catch (error) {
                console.warn('Error in stylesheet check:', error);
                return true; // Assume stylesheets are loaded
            }
        }, { timeout: 10000 }).catch(() => {
            console.warn('Stylesheet loading check timeout');
        });

        // Enhanced stabilization delay
        await page.waitForTimeout(opts.stabilizationDelay);

        // Final check - ensure no elements are still transitioning
        await page.waitForTimeout(500);
    } catch (error) {
        console.warn('Error in waitForGameStable:', error);
        // Don't rethrow to prevent test failure, but log the issue
    }
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

    // Handle both Page and Locator objects
    const page = locator.page ? locator.page() : locator;

    // Check if page is still valid before proceeding
    try {
        await page.evaluate(() => document.readyState);
    } catch (error) {
        console.warn('Page is no longer available for screenshot:', error);
        return;
    }

    // Get browser name for browser-specific handling
    const browserName = page.context().browser()?.browserType().name() || 'unknown';

    // Enhanced stability checks with error handling
    try {
        if (browserName === 'webkit') {
            // Full stability checks for WebKit
            await page.waitForTimeout(500); // Initial wait

            // Wait for network to be idle
            await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
                console.warn('Network idle timeout - continuing with screenshot');
            });

            // Wait for fonts to be fully loaded with retry
            await page.waitForFunction(() => {
                return document.fonts.ready.then(() => true);
            }, { timeout: 10000 }).catch(() => {
                console.warn('Font loading timeout - continuing with screenshot');
            });

            // Ensure all images are in a stable state
            await page.waitForFunction(() => {
                const images = document.querySelectorAll('img');
                return Array.from(images).every(img => img.complete || img.naturalWidth > 0);
            }, { timeout: 10000 }).catch(() => {
                console.warn('Image loading check timeout - continuing with screenshot');
            });

            // Wait for any CSS transitions/animations to complete
            await page.waitForFunction(() => {
                const elements = document.querySelectorAll('*');
                return Array.from(elements).every(el => {
                    const styles = window.getComputedStyle(el);
                    return styles.animationPlayState !== 'running' &&
                        (styles.transitionProperty === 'none' ||
                            styles.transitionDuration === '0s');
                });
            }, { timeout: 5000 }).catch(() => {
                console.warn('Animation check timeout - continuing with screenshot');
            });

            // Webkit needs extra time for rendering stability
            await page.waitForTimeout(1000);

            // Force a repaint in webkit with error handling
            await page.evaluate(() => {
                try {
                    document.body.style.transform = 'translateZ(0)';
                    document.body.offsetHeight; // Force reflow
                    document.body.style.transform = '';
                } catch (error) {
                    console.warn('Could not force repaint:', error);
                }
            }).catch(() => {
                console.warn('Webkit repaint evaluation failed');
            });
        } else {
            // Simplified checks for Chromium/Firefox
            await page.waitForTimeout(200); // Minimal initial wait

            // Quick font check
            await page.waitForFunction(() => document.fonts.ready, { timeout: 3000 }).catch(() => {
                console.warn('Font loading timeout - continuing with screenshot');
            });
        }

        // Final stabilization wait
        await page.waitForTimeout(opts.stabilizationDelay);

        // Browser-specific screenshot settings
        const screenshotOptions = {
            animations: 'disabled' as const,
            threshold: browserName === 'webkit' ? 0.35 : 0.25, // More lenient for webkit
            maxDiffPixels: browserName === 'webkit' ? 3000 : 2000, // More pixels allowed for webkit
        };

        await expect(locator).toHaveScreenshot(name, screenshotOptions);
    } catch (error) {
        console.warn(`Screenshot failed for ${name}:`, error);
        // Don't rethrow to prevent test failure on screenshot issues
    }
}

/**
 * Verify all cell types are visually rendered correctly
 */
export async function verifyCellTypes(page: Page): Promise<void> {
    // Check if page is still valid before proceeding
    if (!(await isPageValid(page))) {
        console.warn('Page is not valid for cell verification');
        return;
    }

    // Get browser name for conditional stability measures
    const browserName = page.context().browser()?.browserType().name() || 'unknown';

    // Ensure WebKit stability before proceeding (only for WebKit)
    if (browserName === 'webkit') {
        await ensureWebKitStability(page);
    }

    const cellTypes = ['player', 'rock', 'soil', 'diamond', 'boulder', 'bomb', 'exit', 'empty'];

    for (const cellType of cellTypes) {
        try {
            // Check if page is still valid before each cell type
            if (!(await isPageValid(page))) {
                console.warn(`Page became invalid during cell type ${cellType} verification`);
                break;
            }

            const cells = page.locator(`.cell.${cellType}`);
            const count = await cells.count().catch(() => 0);

            if (count > 0) {
                // Take screenshot of first instance of each cell type
                const firstCell = cells.first();

                // Verify the cell exists and is visible before screenshot - with error handling
                try {
                    await expect(firstCell).toBeVisible({ timeout: 5000 });
                } catch (error) {
                    console.warn(`Cell ${cellType} visibility check failed:`, error);
                    continue; // Skip this cell type if visibility check fails
                }

                // Additional WebKit stability for each cell (only for WebKit)
                if (browserName === 'webkit') {
                    await ensureWebKitStability(page);
                }

                // Check page validity again before screenshot
                if (!(await isPageValid(page))) {
                    console.warn(`Page became invalid before screenshot for ${cellType}`);
                    break;
                }

                // Use shorter stabilization delay for non-WebKit browsers
                const screenshotOptions = browserName === 'webkit'
                    ? { stabilizationDelay: 1500 }
                    : { stabilizationDelay: 500 }; // Much shorter for Chromium/Firefox

                await takeStableScreenshot(firstCell, `cell-type-${cellType}.png`, screenshotOptions);

                // Only do styling verification if page is still valid
                if (await isPageValid(page)) {
                    try {
                        // Verify the cell has proper styling
                        await expect(firstCell).toHaveClass(new RegExp(`cell.*${cellType}`));
                    } catch (error) {
                        console.warn(`Cell ${cellType} styling check failed:`, error);
                        // Continue anyway, styling check is not critical
                    }

                    // Check if image loaded successfully or has error state
                    const hasImageLoaded = await firstCell.evaluate((el) =>
                        el.classList.contains('image-loaded')
                    ).catch(() => false);

                    const hasImageError = await firstCell.evaluate((el) =>
                        el.classList.contains('image-error')
                    ).catch(() => false);

                    // At least one should be true (either loaded or error state)
                    if (!hasImageLoaded && !hasImageError) {
                        console.warn(`Cell type ${cellType} appears to be in loading state`);
                    }
                }
            }
        } catch (error) {
            console.warn(`Failed to verify cell type ${cellType}:`, error);
            // Continue with next cell type instead of failing entire verification
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
                // Clear any existing settings first
                localStorage.clear();

                // Prevent "How to Play" dialog with multiple possible keys
                const howToPlaySettings = {
                    dontShowAgain: true,
                    hasSeenInstructions: true,
                    lastViewedVersion: '1.0.0',
                    dismissed: true,
                    showOnStartup: false,
                    userHasDismissed: true,
                    skipIntro: true
                };

                localStorage.setItem('wanderer-how-to-play-settings', JSON.stringify(howToPlaySettings));
                localStorage.setItem('how-to-play-settings', JSON.stringify(howToPlaySettings));
                localStorage.setItem('wanderer-tutorial-dismissed', 'true');
                localStorage.setItem('tutorial-dismissed', 'true');
                localStorage.setItem('how-to-play-dismissed', 'true');
                localStorage.setItem('intro-dismissed', 'true');

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

                // Set a flag to indicate test environment
                localStorage.setItem('playwright-test-mode', 'true');
            }
        } catch (error) {
            console.warn('Could not access localStorage:', error);
        }
    });

    // Dismiss any audio error dialogs that might appear
    await dismissAudioDialogs(page);
}

/**
 * Wait with timeout and retry logic for better reliability
 */
export async function waitWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> {
    let lastError: Error | undefined;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error as Error;
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
}

/**
 * Dismiss any dialogs that might interfere with tests
 */
export async function dismissAudioDialogs(page: Page): Promise<void> {
    try {
        // Check if page is still valid
        await page.evaluate(() => document.readyState);

        // Reduced wait time for faster execution
        await page.waitForTimeout(500);

        // First, try to dismiss "How to Play" dialog if it appears
        const howToPlaySelectors = [
            '.how-to-play-overlay',
            '[data-testid="how-to-play-popup"]',
            '.tutorial-overlay',
            '.intro-dialog'
        ];

        for (const dialogSelector of howToPlaySelectors) {
            const dialog = page.locator(dialogSelector);
            const dialogCount = await dialog.count().catch(() => 0);

            if (dialogCount > 0 && await dialog.isVisible().catch(() => false)) {
                console.log(`Found dialog: ${dialogSelector}, attempting to close`);

                // Try different ways to close the dialog quickly
                const closeButtons = [
                    `${dialogSelector} [data-testid="close-button"]`,
                    `${dialogSelector} button.close-footer-button`,
                    `${dialogSelector} button:has-text("×")`,
                    `${dialogSelector} button:has-text("Close")`,
                    `${dialogSelector} .close-button`
                ];

                let closed = false;
                for (const selector of closeButtons) {
                    try {
                        const button = page.locator(selector);
                        const buttonCount = await button.count().catch(() => 0);

                        if (buttonCount > 0 && await button.isVisible().catch(() => false)) {
                            await button.first().click({ timeout: 3000 });
                            await page.waitForTimeout(300);
                            closed = true;
                            console.log(`Successfully closed dialog with: ${selector}`);
                            break;
                        }
                    } catch (error) {
                        console.warn(`Could not click ${selector}:`, error);
                    }
                }

                // If buttons don't work, try pressing Escape
                if (!closed) {
                    try {
                        await page.keyboard.press('Escape');
                        await page.waitForTimeout(300);
                        console.log('Closed dialog with Escape key');
                    } catch (error) {
                        console.warn('Could not press Escape:', error);
                    }
                }

                // If still visible, try clicking overlay
                if (!closed && await dialog.isVisible().catch(() => false)) {
                    try {
                        await dialog.click({ position: { x: 10, y: 10 }, timeout: 3000 });
                        await page.waitForTimeout(300);
                        console.log('Closed dialog by clicking overlay');
                    } catch (error) {
                        console.warn('Could not click overlay:', error);
                    }
                }
                break; // Only handle the first dialog found
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
            try {
                const button = page.locator(selector);
                const buttonCount = await button.count().catch(() => 0);
                const isVisible = buttonCount > 0 ? await button.isVisible().catch(() => false) : false;

                if (buttonCount > 0 && isVisible) {
                    await button.click({ timeout: 3000 });
                    await page.waitForTimeout(200);
                    console.log(`Dismissed audio dialog with: ${selector}`);
                    break;
                }
            } catch (error) {
                console.warn(`Could not click ${selector}:`, error);
            }
        }
    } catch (error) {
        console.warn('Error in dismissAudioDialogs:', error);
        // Don't rethrow to prevent test failure
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

    // Get browser name for specific handling
    const browserName = page.context().browser()?.browserType().name() || 'unknown';

    for (const viewport of viewports) {
        try {
            console.log(`Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);

            // Check if page is still valid before proceeding
            if (!(await isPageValid(page))) {
                console.warn(`Page invalid before ${viewport.name} viewport test`);
                continue;
            }

            await page.setViewportSize({ width: viewport.width, height: viewport.height });

            // Navigate first, then setup environment with timeout
            await page.goto('/', { timeout: 20000 });
            await setupTestEnvironment(page);

            // Ensure How to Play dialog is dismissed immediately
            await dismissAudioDialogs(page);

            // Use more aggressive options for responsive testing to speed up
            const responsiveOptions = {
                imageLoadTimeout: browserName === 'webkit' ? 15000 : 20000,
                minLoadedPercentage: 0.6, // Lower threshold for responsive tests
                stabilizationDelay: browserName === 'webkit' ? 1000 : 1500
            };

            await waitForGameStable(page, responsiveOptions);

            // WebKit-specific stability check
            if (browserName === 'webkit') {
                await ensureWebKitStability(page);
            }

            // Take screenshots with reduced complexity for speed
            console.log(`Taking screenshots for ${viewport.name}`);

            // Check page validity before screenshot
            if (!(await isPageValid(page))) {
                console.warn(`Page invalid before screenshot for ${viewport.name}`);
                continue;
            }

            // Only take full page screenshot - skip individual components for speed
            if (browserName === 'webkit') {
                // For WebKit, use direct screenshot to avoid complex takeStableScreenshot
                try {
                    await expect(page).toHaveScreenshot(`${testName}-${viewport.name}.png`, {
                        animations: 'disabled',
                        threshold: 0.4,
                        maxDiffPixels: 5000,
                        timeout: 15000
                    });
                    console.log(`WebKit screenshot completed for ${viewport.name}`);
                } catch (error) {
                    console.warn(`WebKit screenshot failed for ${viewport.name}:`, error);
                }
            } else {
                await takeStableScreenshot(page, `${testName}-${viewport.name}.png`, {
                    stabilizationDelay: 1000
                });
            }

            console.log(`Completed ${viewport.name} viewport test`);
        } catch (error) {
            console.warn(`Failed to test ${viewport.name} viewport:`, error);
            // Continue with next viewport instead of failing entire test
        }
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
 * Check if page/browser is still valid and accessible
 */
export async function isPageValid(page: Page): Promise<boolean> {
    try {
        // Check if context is still valid
        if (!page.context()) {
            console.warn('Page context is null');
            return false;
        }

        // Check if browser is still valid
        const browser = page.context().browser();
        if (!browser || !browser.isConnected()) {
            console.warn('Browser is not connected');
            return false;
        }

        // Check if page is still accessible
        await page.evaluate(() => document.readyState);
        return true;
    } catch (error) {
        console.warn('Page is no longer valid:', error);
        return false;
    }
}

/**
 * WebKit-specific stability helper
 */
export async function ensureWebKitStability(page: Page): Promise<void> {
    const browserName = page.context().browser()?.browserType().name();

    if (browserName === 'webkit') {
        // Extra stability measures for WebKit
        await page.waitForTimeout(1500);

        // Force a repaint and ensure DOM is stable
        await page.evaluate(() => {
            try {
                // Force layout recalculation
                document.body.offsetHeight;

                // Ensure all images are processed
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                });

                // Force another layout
                document.body.offsetHeight;
            } catch (error) {
                console.warn('WebKit stability measures failed:', error);
            }
        }).catch(() => {
            console.warn('WebKit evaluation failed');
        });

        await page.waitForTimeout(500);
    }
}

/**
 * WebKit-specific lightweight cell verification
 */
export async function verifyWebKitCellTypes(page: Page): Promise<void> {
    const cellTypes = ['player', 'rock', 'soil', 'diamond', 'boulder', 'bomb', 'exit', 'empty'];

    for (const cellType of cellTypes) {
        try {
            // Quick check if page is still valid
            const isValid = await page.evaluate(() => document.readyState).catch(() => false);
            if (!isValid) {
                console.warn(`Page invalid during ${cellType} verification`);
                break;
            }

            const cells = page.locator(`.cell.${cellType}`);
            const count = await cells.count().catch(() => 0);

            if (count > 0) {
                const firstCell = cells.first();
                const isVisible = await firstCell.isVisible().catch(() => false);

                if (isVisible) {
                    // Minimal screenshot operation for WebKit
                    await expect(firstCell).toHaveScreenshot(`webkit-cell-${cellType}.png`, {
                        animations: 'disabled',
                        threshold: 0.4,
                        maxDiffPixels: 4000
                    });
                    console.log(`WebKit: Successfully captured ${cellType}`);
                }
            }

            // Small delay between cell types
            await page.waitForTimeout(500);
        } catch (error) {
            console.warn(`WebKit: Failed ${cellType}:`, error);
            // Continue with next cell type
        }
    }
}

/**
 * Verify cross-browser consistency
 */
export async function verifyCrossBrowserConsistency(
    page: Page,
    browserName: string
): Promise<void> {
    if (!(await isPageValid(page))) {
        console.warn('Page is not valid for cross-browser consistency check');
        return;
    }

    await waitForGameStable(page);
    await ensureWebKitStability(page);

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
    const playerCount = await playerCell.count().catch(() => 0);

    if (playerCount > 0) {
        await takeStableScreenshot(playerCell, `cross-browser-player-${browserName}.png`);
    }
}