New Session





git hub failed to run playwright test # Instructions

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

<launching> /home/runner/.cache/ms-playwright/webkit-2191/pw_run.sh --inspector-pipe --headless --no-startup-window --force-color-profile=srgb

<launched> pid=15032

[pid=15032][err] Cannot parse arguments: Unknown option --force-color-profile=srgb

Call log:

  - <launching> /home/runner/.cache/ms-playwright/webkit-2191/pw_run.sh --inspector-pipe --headless --no-startup-window --force-color-profile=srgb

  - <launched> pid=15032

  - [pid=15032][err] Cannot parse arguments: Unknown option --force-color-profile=srgb

```

Kiro
Including Steering Documents

typescript-standards.md
Looking at the error, the issue is that WebKit in the GitHub Actions environment doesn't support the --force-color-profile=srgb flag. This is a common problem with older WebKit versions or certain environments.

Let me check your current Playwright config to see the exact setup:

Read file(s)

playwright.config.ts
The issue is clear now. The --force-color-profile=srgb flag is being passed to WebKit in the CI environment, but the WebKit version in GitHub Actions doesn't support this flag.

Here's the fix - remove the problematic flag from the CI configuration:

Accepted edits to

playwright.config.ts


Why this happened:
The --force-color-profile=srgb flag is not supported by the WebKit version used in GitHub Actions runners. This flag is useful for ensuring consistent color rendering across different environments, but it's not universally supported.

The fix:
Removed the problematic flag from CI environment
Kept it for local development where it might be supported
Used an empty args array for CI to avoid any launch option conflicts
This should resolve the browser launch failure. The visual regression tests might have slightly different color rendering between local and CI environments, but they should run successfully. If color consistency becomes critical, you can adjust the visual comparison thresholds or use a different approach for color profile management.

are there any other github actions that don't support flags being provided in the CI configuration? If so they should be removed as well

Kiro
Let me check the current state of the config after the autofix and look for other potentially problematic flags:

Read file(s)

playwright.config.ts
Looking at the configuration, I can see a few other potential issues for GitHub Actions CI:

Firefox preferences - Some Firefox preferences might not work in headless CI environments
WebKit local flags - The --disable-web-security and --disable-features=VizDisplayCompositor flags might cause issues if they somehow get applied in CI
Let me clean up the Firefox configuration to be more CI-friendly and ensure WebKit is properly isolated:

Accepted edits to

playwright.config.ts


The main flags that commonly cause issues in GitHub Actions are:

--force-color-profile=srgb - Not supported in CI WebKit (already fixed)
--disable-web-security - Can cause issues in some CI environments, but we're keeping it local-only
--disable-features=VizDisplayCompositor - Can be problematic in headless environments, but again local-only
Firefox preferences - Some network-related preferences might not work in CI
The configuration is now properly isolated:

CI environments get minimal, stable configurations
Local development keeps the helpful flags for testing
This should prevent any browser launch failures in GitHub Actions while maintaining good local development experience.


1 change accepted
(
View all
)
Revert


playwright.config.ts






Claude Sonnet 4.0
Autopilot
