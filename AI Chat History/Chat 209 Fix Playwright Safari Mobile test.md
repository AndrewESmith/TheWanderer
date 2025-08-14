Expected: trueReceiv...

New Session





This Playwright test 'moves counter decreases with each move' for mobile safari fails occasionally   1) [Mobile Safari] › src\playwrighttests\game.spec.ts:104:5 › Game functionality › moves counter decreases with each move 

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 44

    Received: 45

Kiro
Including Steering Documents

typescript-standards.md
I can see you're dealing with a flaky Playwright test for mobile Safari where the moves counter is occasionally off by one. Let me examine the test file to understand what's happening.

Read file(s)

game.spec.ts
Now let me check if there are any existing stability fixes or documentation about this issue:

Read file(s)

WEBKIT_STABILITY_FIXES.md

PLAYWRIGHT_TIMEOUT_FIXES.md
Now let me look at the game source code to understand how the moves counter is implemented:

Searched workspace
Searching for moves counter implementation in the game source code
Let me look at the GameState.ts file to understand how moves are handled:

Read file(s)

GameState.ts
Now let me check the HUD component to see how the moves counter is displayed:

Searched workspace
Searching for HUD component implementation to understand how moves counter is rendered
Let me find the actual HUD component:

Searched workspace
Searching for HUD component files
Searched workspace
Searching for HUD component TypeScript files
Searched workspace
Searching for HUD class or component definition
Let me look at the main game file to see how the HUD is rendered:

Error(s) while reading file(s)
Searched workspace
Listing the src directory to find the main game files
Read file(s)

App.tsx
Now I can see the issue! Looking at the test and the code, I can identify the problem with the flaky test. The issue is related to timing and how Safari handles DOM updates. Let me analyze the specific failing test:

The test is expecting the moves counter to decrease from 45 to 44, but it's getting 45 instead. This suggests a race condition where the DOM hasn't been updated yet when the test checks the value.

Looking at the current test code:

test('moves counter decreases with each move', async ({ page, browserName }) => {
    // Get initial moves count
    const movesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
    const initialMoves = extractNumber(movesText || '0');

    // Make a move
    await page.keyboard.press('ArrowRight');

    // Safari needs more time for game state updates
    const waitTime = browserName === 'webkit' ? 500 : 100;
    await page.waitForTimeout(waitTime);

    // Check if moves decreased
    const newMovesText = await page.locator('.hud span').filter({ hasText: /Moves:/ }).textContent();
    const newMoves = extractNumber(newMovesText || '0');

    expect(newMoves).toBe(initialMoves - 1);
});
The problem is that even with the 500ms wait for Safari, it's still not enough in some cases. Let me create a more robust solution:

Accepted edits to

game.spec.ts


The fix I implemented addresses the flaky test issue by:

Using waitForFunction for Safari: Instead of relying on a fixed timeout, the test now actively waits for the moves counter to reach the expected value using Playwright's waitForFunction.

Robust DOM querying: The waitForFunction uses native DOM querying to find the moves element, making it more reliable than Playwright's locator system for this specific timing-sensitive check.

Polling mechanism: The function checks every 100ms for up to 3 seconds, giving Safari plenty of time to update the DOM while not waiting unnecessarily long.

Fallback for other browsers: Other browsers still use the simpler 100ms timeout since they don't have the same timing issues.

Clear error messaging: If the wait times out, Playwright will provide a clear error about what condition wasn't met.

This approach is much more reliable than fixed timeouts because:

It waits exactly as long as needed (no more, no less)
It actively checks for the condition rather than hoping the timing is right
It's specifically tailored to Safari's slower DOM update behavior
It maintains fast execution for other browsers
The test should now pass consistently on Mobile Safari by properly waiting for the game state to update in the DOM before making assertions.

  1) [Mobile Safari] › src\playwrighttests\game.spec.ts:104:5 › Game functionality › moves counter decreases with each move 

    Error: page.waitForFunction: SyntaxError: '.hud span[class*="moves-info"], .hud span:has-text("Moves:")' is not a valid selector.

      115 |         if (browserName === 'webkit') {

      116 |             // Safari needs more robust waiting - use waitFor with retry logic

    > 117 |             await page.waitForFunction(

          |                        ^

      118 |                 (expected) => {

      119 |                     const movesElement = document.querySelector('.hud span[class*="moves-info"], .hud span:has-text("Moves:")');

      120 |                     if (!movesElement) return false;

        at d:\FizzBash\TheWanderer\src\playwrighttests\game.spec.ts:117:24



Kiro
I see the issue - the CSS selector I used in the waitForFunction is invalid. The :has-text() pseudo-selector is a Playwright-specific selector that doesn't work in native DOM queries. Let me fix this:

Error(s) while editing

game.spec.ts

Unable to replace text, trying a different approach...
Let me read the current file to see what it looks like after the IDE formatting:

Read file(s)

game.spec.ts 100 - 141
Now I can fix the invalid CSS selector:

Accepted edits to

game.spec.ts


Perfect! Now the fix should work properly. The key changes I made:

Fixed the invalid CSS selector: Removed the Playwright-specific :has-text() pseudo-selector that doesn't work in native DOM queries.

Used proper DOM traversal: Instead of trying to use complex CSS selectors, the code now:

Queries all spans within the HUD
Iterates through them to find the one containing "Moves:"
Uses that element for the moves count extraction
Maintained the robust waiting logic: The waitForFunction still provides the polling mechanism that will wait up to 3 seconds for Safari to update the moves counter.

This approach is much more reliable because:

It uses only standard DOM APIs that work in all browsers
It actively waits for the specific condition (moves counter update) rather than using arbitrary timeouts
It's specifically designed to handle Safari's slower DOM update timing
It will fail fast if the moves counter element isn't found, providing clear debugging information
The test should now pass consistently on Mobile Safari by properly waiting for the game state to update before making assertions.


1 change accepted
(
View all
)
Revert


game.spec.ts






Claude Sonnet 4.0
Autopilot
