// Quick test script to verify WebKit fixes
const { chromium, webkit } = require('playwright');

async function testWebKitStability() {
    console.log('Testing WebKit stability fixes...');

    const browser = await webkit.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to the game
        await page.goto('http://127.0.0.1:3000', { timeout: 30000 });

        // Wait for maze grid
        await page.waitForSelector('.maze-grid', { timeout: 20000 });

        // Test page validity check
        const isValid = await page.evaluate(() => document.readyState).catch(() => false);
        console.log('Page validity check:', isValid ? 'PASS' : 'FAIL');

        // Test cell counting
        const cellCount = await page.locator('.cell').count();
        console.log('Cell count:', cellCount);

        // Test specific cell types
        const playerCells = await page.locator('.cell.player').count();
        console.log('Player cells found:', playerCells);

        if (playerCells > 0) {
            const firstPlayer = page.locator('.cell.player').first();
            await firstPlayer.waitFor({ state: 'visible', timeout: 5000 });
            console.log('Player cell visibility: PASS');
        }

        console.log('WebKit stability test: PASS');

    } catch (error) {
        console.error('WebKit stability test: FAIL', error.message);
    } finally {
        await browser.close();
    }
}

testWebKitStability();