on how to use it. Th...

New Session






visual-test-helpers.ts 108 - 114



await expect(locator).toHaveScreenshot(name, {
    animations: opts.disableAnimations ? 'disabled' : 'allow',
    mode: 'strict',
    threshold: 0.2, // Allow up to 20% difference to handle minor rendering variations
});
How do I fix the following problem in the above code?: No overload matches this call.
  Overload 1 of 4, '(name: string | readonly string[], options?: PageAssertionsToHaveScreenshotOptions | undefined): Promise<void>', gave the following error.
    Object literal may only specify known properties, and 'mode' does not exist in type 'PageAssertionsToHaveScreenshotOptions'.
  Overload 2 of 4, '(name: string | readonly string[], options?: { animations?: "disabled" | "allow" | undefined; caret?: "hide" | "initial" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; ... 6 more ...; timeout?: number | undefined; } | undefined): Promise<...>', gave the following error.
    Object literal may only specify known properties, and 'mode' does not exist in type '{ animations?: "disabled" | "allow" | undefined; caret?: "hide" | "initial" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; maxDiffPixelRatio?: number | undefined; ... 5 more ...; timeout?: number | undefined; }'.

Kiro
Including Steering Documents

typescript-standards.md
The error is occurring because the mode property doesn't exist in Playwright's toHaveScreenshot options. Looking at the Playwright API, there's no mode: 'strict' option available.

You can simply remove the mode property from the options object:

Accepted edits to

visual-test-helpers.ts


The mode: 'strict' property isn't a valid option for Playwright's screenshot assertions. The available options for toHaveScreenshot include animations, threshold, maxDiffPixels, clip, fullPage, omitBackground, mask, maskColor, caret, and timeout, but not mode.

The screenshot comparison will still work correctly with just the animations and threshold options - Playwright's default behavior is already strict enough for visual regression testing.

how do I view the latest playwright report?

Kiro
To view the latest Playwright report, you have a few options:

Option 1: Open the HTML Report (Recommended)
Run this command to open the interactive HTML report in your browser:

npx playwright show-report
This will automatically open the report in your default browser and show test results, screenshots, traces, and any failures.

Option 2: Generate and Open Report
If you need to generate a fresh report first:

npx playwright test --reporter=html
npx playwright show-report
Option 3: Check the Report Directory
Playwright typically saves reports to playwright-report/ directory. You can open the index.html file directly:

start playwright-report\index.html
Option 4: View Last Run Results
If you just want to see the last test results without the full report:

npx playwright test --reporter=list
The HTML report (npx playwright show-report) is usually the most useful as it provides:

Visual diff comparisons for screenshot tests
Detailed error messages and stack traces
Test execution timeline
Screenshots and videos of test runs
Trace viewer for debugging
Since you're working with visual tests, the HTML report will be particularly helpful for comparing expected vs actual screenshots when tests fail.

Revert







Claude Sonnet 4.0
