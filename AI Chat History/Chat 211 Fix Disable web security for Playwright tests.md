Expected: trueReceiv...

Received: 45

Playwright tests pas...

New Session





For Webkit when running Playwright tests on Git hub acction it erros on beforeEach hook "   16 | test.describe('Visual Regression Tests - Core Interface', () => {    17 |     test.beforeEach(async ({ page, browserName }) => {". The prompt error in git hub is # Instructions

- Following Playwright test failed.

- Explain why, be concise, respect Playwright best practices.

- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Visual Regression Tests - Core Interface >> full game interface screenshot - desktop

- Location: visual-regression.spec.ts:40:5

# Error details

```

Error: browserType.launch: Target page, context or browser has been closed

Browser logs:

<launching> /home/runner/.cache/ms-playwright/webkit-2191/pw_run.sh --inspector-pipe --headless --no-startup-window --disable-web-security --disable-features=VizDisplayCompositor --force-color-profile=srgb

<launched> pid=15040

[pid=15040][err] Cannot parse arguments: Unknown option --disable-web-security

Call log:

  - <launching> /home/runner/.cache/ms-playwright/webkit-2191/pw_run.sh --inspector-pipe --headless --no-startup-window --disable-web-security --disable-features=VizDisplayCompositor --force-color-profile=srgb

  - <launched> pid=15040

  - [pid=15040][err] Cannot parse arguments: Unknown option --disable-web-security

```

Kiro
Including Steering Documents

typescript-standards.md
The error occurs because WebKit in GitHub Actions doesn't support the --disable-web-security flag that Playwright tries to use by default. This is a common issue with WebKit in CI environments.

Let me check your current Playwright configuration to provide the exact fix:

Read file(s)

playwright.config.ts
Now let me check the visual regression test file to see the exact test structure:

Searched workspace
Finding the visual regression test file to understand the test structure
Read file(s)

visual-regression.spec.ts
The issue is that WebKit in GitHub Actions doesn't support the --disable-web-security flag. Here's the fix:

Accepted edits to

playwright.config.ts


Why the error occurs:
WebKit in GitHub Actions doesn't support the --disable-web-security flag that works locally. This causes the browser launch to fail with "Cannot parse arguments: Unknown option --disable-web-security".

The fix:
The solution conditionally applies different launch arguments based on whether we're running in CI (GitHub Actions) or locally:

In CI: Only uses --force-color-profile=srgb which is supported
Locally: Keeps all the original flags including --disable-web-security for development
This approach maintains local development functionality while ensuring CI compatibility. The --force-color-profile=srgb flag helps with visual consistency across different environments, which is important for your visual regression tests.


1 change accepted
(
View all
)
Revert


playwright.config.ts






Claude Sonnet 4.0
Autopilot
