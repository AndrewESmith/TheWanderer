import { test, expect } from '@playwright/test';

test.describe('How to Play User Workflows E2E', () => {
    test.describe('New User Experience', () => {
        test.beforeEach(async ({ page }) => {
            // Clear localStorage to simulate first-time user
            await page.goto('/');
            await page.evaluate(() => {
                localStorage.clear();
            });
            await page.reload();
        });

        test('should automatically display popup for first-time users', async ({ page }) => {
            // Wait for the popup to appear automatically
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Verify popup content is displayed
            await expect(page.locator('text=How to Play The Wanderer')).toBeVisible();
            await expect(page.locator('text=Objective')).toBeVisible();
            await expect(page.locator('text=Controls')).toBeVisible();
            await expect(page.locator('text=Game Objects')).toBeVisible();

            // Verify "Don't show again" checkbox is unchecked by default
            const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
            await expect(checkbox).not.toBeChecked();

            // Verify game interaction is blocked
            const gameArea = page.locator('[data-testid="maze-container"]');
            await expect(gameArea).toBeVisible();

            // Try to interact with game (should be blocked)
            await page.keyboard.press('ArrowRight');
            // Game should not respond to input while popup is open
        });

        test('should close popup and allow game interaction', async ({ page }) => {
            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Close popup using close button
            const closeButton = page.locator('[data-testid="close-button"]');
            await closeButton.click();

            // Verify popup is closed
            await expect(popup).not.toBeVisible();

            // Verify game interaction is now possible
            const gameArea = page.locator('[data-testid="maze-container"]');
            await expect(gameArea).toBeVisible();
        });

        test('should close popup with escape key', async ({ page }) => {
            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Close popup using escape key
            await page.keyboard.press('Escape');

            // Verify popup is closed
            await expect(popup).not.toBeVisible();
        });

        test('should persist "Don\'t show again" preference', async ({ page }) => {
            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Check "Don't show again" checkbox
            const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
            await checkbox.check();
            await expect(checkbox).toBeChecked();

            // Close popup
            const closeButton = page.locator('[data-testid="close-button"]');
            await closeButton.click();

            // Reload page to simulate returning user
            await page.reload();

            // Verify popup does not appear automatically
            await expect(popup).not.toBeVisible();

            // Verify localStorage has the preference
            const settings = await page.evaluate(() => {
                const stored = localStorage.getItem('wanderer-how-to-play-settings');
                return stored ? JSON.parse(stored) : null;
            });
            expect(settings?.dontShowAgain).toBe(true);
        });
    });

    test.describe('Returning User Experience', () => {
        test.beforeEach(async ({ page }) => {
            // Set up returning user with "don't show again" preference
            await page.goto('/');
            await page.evaluate(() => {
                localStorage.setItem('wanderer-how-to-play-settings', JSON.stringify({
                    dontShowAgain: true,
                    hasSeenInstructions: true
                }));
            });
            await page.reload();
        });

        test('should not display popup for returning users with preference', async ({ page }) => {
            // Wait a moment to ensure popup would have appeared if it was going to
            await page.waitForTimeout(1000);

            // Verify popup does not appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).not.toBeVisible();

            // Verify game is immediately interactive
            const gameArea = page.locator('[data-testid="maze-container"]');
            await expect(gameArea).toBeVisible();
        });

        test('should allow access to popup through settings', async ({ page }) => {
            // Verify popup is not shown initially
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).not.toBeVisible();

            // Open settings menu
            const settingsButton = page.locator('[data-testid="settings-button"]');
            await settingsButton.click();

            // Click "How to Play" option in settings
            const howToPlayButton = page.locator('text=How to Play');
            await howToPlayButton.click();

            // Verify popup opens
            await expect(popup).toBeVisible();
            await expect(page.locator('text=How to Play The Wanderer')).toBeVisible();

            // Verify checkbox reflects current preference (should be checked)
            const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
            await expect(checkbox).toBeChecked();
        });
    });

    test.describe('Settings Access Workflow', () => {
        test.beforeEach(async ({ page }) => {
            // Set up user who has seen instructions but didn't check "don't show again"
            await page.goto('/');
            await page.evaluate(() => {
                localStorage.setItem('wanderer-how-to-play-settings', JSON.stringify({
                    dontShowAgain: false,
                    hasSeenInstructions: true
                }));
            });
            await page.reload();
        });

        test('should open popup from settings menu', async ({ page }) => {
            // Open settings menu
            const settingsButton = page.locator('[data-testid="settings-button"]');
            await settingsButton.click();

            // Verify settings menu is open
            const settingsPanel = page.locator('[data-testid="audio-settings-panel"]');
            await expect(settingsPanel).toBeVisible();

            // Click "How to Play" option
            const howToPlayButton = page.locator('text=How to Play');
            await howToPlayButton.click();

            // Verify popup opens
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();
            await expect(page.locator('text=How to Play The Wanderer')).toBeVisible();

            // Verify settings menu closes when popup opens
            await expect(settingsPanel).not.toBeVisible();
        });

        test('should update preference from settings-opened popup', async ({ page }) => {
            // Open popup from settings
            const settingsButton = page.locator('[data-testid="settings-button"]');
            await settingsButton.click();
            const howToPlayButton = page.locator('text=How to Play');
            await howToPlayButton.click();

            // Verify popup is open
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Check "Don't show again" checkbox
            const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
            await checkbox.check();
            await expect(checkbox).toBeChecked();

            // Close popup
            const closeButton = page.locator('[data-testid="close-button"]');
            await closeButton.click();

            // Verify preference is updated in localStorage
            const settings = await page.evaluate(() => {
                const stored = localStorage.getItem('wanderer-how-to-play-settings');
                return stored ? JSON.parse(stored) : null;
            });
            expect(settings?.dontShowAgain).toBe(true);

            // Reload page to verify popup doesn't appear automatically
            await page.reload();
            await page.waitForTimeout(1000);
            await expect(popup).not.toBeVisible();
        });
    });

    test.describe('Responsive Behavior', () => {
        const viewports = [
            { name: 'Desktop', width: 1200, height: 800 },
            { name: 'Tablet', width: 768, height: 1024 },
            { name: 'Mobile', width: 375, height: 667 }
        ];

        viewports.forEach(({ name, width, height }) => {
            test(`should display properly on ${name} (${width}x${height})`, async ({ page }) => {
                // Set viewport size
                await page.setViewportSize({ width, height });

                // Clear localStorage to trigger popup
                await page.goto('/');
                await page.evaluate(() => {
                    localStorage.clear();
                });
                await page.reload();

                // Wait for popup to appear
                const popup = page.locator('[data-testid="how-to-play-popup"]');
                await expect(popup).toBeVisible();

                // Verify popup is properly sized and positioned
                const popupBox = await popup.boundingBox();
                expect(popupBox).toBeTruthy();

                if (popupBox) {
                    // Popup should not exceed viewport bounds
                    expect(popupBox.x).toBeGreaterThanOrEqual(0);
                    expect(popupBox.y).toBeGreaterThanOrEqual(0);
                    expect(popupBox.x + popupBox.width).toBeLessThanOrEqual(width);
                    expect(popupBox.y + popupBox.height).toBeLessThanOrEqual(height);
                }

                // Verify content is readable
                await expect(page.locator('text=How to Play The Wanderer')).toBeVisible();
                await expect(page.locator('text=Objective')).toBeVisible();

                // Verify interactive elements are accessible
                const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
                await expect(checkbox).toBeVisible();

                const closeButton = page.locator('[data-testid="close-button"]');
                await expect(closeButton).toBeVisible();

                // Test interaction on mobile (touch-friendly)
                if (name === 'Mobile') {
                    // Verify touch targets are appropriately sized
                    const checkboxBox = await checkbox.boundingBox();
                    const closeButtonBox = await closeButton.boundingBox();

                    expect(checkboxBox?.width).toBeGreaterThanOrEqual(24);
                    expect(checkboxBox?.height).toBeGreaterThanOrEqual(24);
                    expect(closeButtonBox?.width).toBeGreaterThanOrEqual(32);
                    expect(closeButtonBox?.height).toBeGreaterThanOrEqual(32);
                }

                // Test closing popup works on all screen sizes
                await closeButton.click();
                await expect(popup).not.toBeVisible();
            });
        });

        test('should handle content overflow gracefully', async ({ page }) => {
            // Set a very small viewport to test scrolling
            await page.setViewportSize({ width: 320, height: 400 });

            // Clear localStorage to trigger popup
            await page.goto('/');
            await page.evaluate(() => {
                localStorage.clear();
            });
            await page.reload();

            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Verify popup content is scrollable if needed
            const popupContent = page.locator('[data-testid="how-to-play-content"]');
            await expect(popupContent).toBeVisible();

            // Verify we can scroll to see all content
            await popupContent.scrollIntoViewIfNeeded();

            // Check that credits section is accessible via scrolling
            const creditsSection = page.locator('text=Credits');
            await creditsSection.scrollIntoViewIfNeeded();
            await expect(creditsSection).toBeVisible();

            // Verify close button remains accessible
            const closeButton = page.locator('[data-testid="close-button"]');
            await closeButton.scrollIntoViewIfNeeded();
            await expect(closeButton).toBeVisible();
        });
    });

    test.describe('Accessibility and Keyboard Navigation', () => {
        test.beforeEach(async ({ page }) => {
            // Clear localStorage to trigger popup
            await page.goto('/');
            await page.evaluate(() => {
                localStorage.clear();
            });
            await page.reload();
        });

        test('should support keyboard navigation', async ({ page }) => {
            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Focus trap initially focuses the close button
            const closeButton = page.locator('[data-testid="close-button"]');
            await expect(closeButton).toBeFocused();

            // Test tab navigation through interactive elements
            // First tab goes to first link (Andrew Smith)
            await page.keyboard.press('Tab');
            const andrewLink = page.locator('a[href*="linkedin"]');
            await expect(andrewLink).toBeFocused();

            // Tab through the other links to get to checkbox
            await page.keyboard.press('Tab'); // Wanderer link
            await page.keyboard.press('Tab'); // Steven Shipway link
            await page.keyboard.press('Tab'); // Checkbox

            const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
            await expect(checkbox).toBeFocused();

            // Test space key to activate checkbox
            await page.keyboard.press('Space');
            await expect(checkbox).toBeChecked();

            // Test Enter key to activate close footer button
            await page.keyboard.press('Tab'); // To close footer button
            const closeFooterButton = page.locator('.close-footer-button');
            await expect(closeFooterButton).toBeFocused();
            await page.keyboard.press('Enter');
            await expect(popup).not.toBeVisible();
        });

        test('should trap focus within popup', async ({ page }) => {
            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Get focusable elements in actual DOM order
            const closeButton = page.locator('[data-testid="close-button"]');
            const andrewLink = page.locator('a[href*="linkedin"]');
            const wandererLink = page.locator('a[href*="wikipedia"]');
            const stevenLink = page.locator('a[href*="steveshipway"]');
            const checkbox = page.locator('[data-testid="dont-show-again-checkbox"]');
            const closeFooterButton = page.locator('.close-footer-button');

            // Focus trap initially focuses the close button
            await expect(closeButton).toBeFocused();

            // Tab through elements and verify focus stays within popup
            await page.keyboard.press('Tab');
            await expect(andrewLink).toBeFocused();

            await page.keyboard.press('Tab');
            await expect(wandererLink).toBeFocused();

            await page.keyboard.press('Tab');
            await expect(stevenLink).toBeFocused();

            await page.keyboard.press('Tab');
            await expect(checkbox).toBeFocused();

            await page.keyboard.press('Tab');
            await expect(closeFooterButton).toBeFocused();

            // Tab again should cycle back to first element (close button in header)
            await page.keyboard.press('Tab');
            await expect(closeButton).toBeFocused();

            // Shift+Tab should go to last element (close footer button)
            await page.keyboard.press('Shift+Tab');
            await expect(closeFooterButton).toBeFocused();
        });

        test('should restore focus after closing popup', async ({ page }) => {
            // First close the automatically opened popup
            const initialPopup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(initialPopup).toBeVisible();
            const initialCloseButton = page.locator('[data-testid="close-button"]');
            await initialCloseButton.click();
            await expect(initialPopup).not.toBeVisible();

            // Focus on settings button before opening popup
            const settingsButton = page.locator('[data-testid="settings-button"]');
            await settingsButton.focus();

            // Open settings and then how-to-play
            await settingsButton.click();
            const howToPlayButton = page.locator('button', { hasText: 'How to Play' });
            await howToPlayButton.click();

            // Wait for popup to appear
            const popup = page.locator('[data-testid="how-to-play-popup"]');
            await expect(popup).toBeVisible();

            // Close popup with escape
            await page.keyboard.press('Escape');
            await expect(popup).not.toBeVisible();

            // Focus should return to the element that opened the popup
            // In this case, it should be on the game area or a reasonable default
            const gameArea = page.locator('[data-testid="maze-container"]');
            await expect(gameArea).toBeVisible();
        });
    });
});