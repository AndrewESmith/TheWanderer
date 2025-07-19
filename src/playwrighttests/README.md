# Playwright E2E Tests for The Wanderer

This directory contains end-to-end tests for The Wanderer game using Playwright.

## Test Files

- `example.spec.ts`: Basic tests for application loading and UI elements
- `game.spec.ts`: Tests for game functionality like player movement and diamond collection

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all Playwright tests
npm run test:e2e

# Run tests with UI mode (for debugging)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug
```

## Test Configuration

The tests are configured in the `playwright.config.ts` file in the project root. Key configurations:

- Tests run against a local development server on port 3000
- Tests run in Chromium, Firefox, and WebKit browsers
- Screenshots are captured on test failures
- Traces are collected on first retry

## Writing New Tests

When writing new tests:

1. Create a new file with the `.spec.ts` extension in this directory
2. Import the Playwright test utilities: `import { test, expect } from '@playwright/test'`
3. Write your tests using the Playwright API

Example:

```typescript
import { test, expect } from '@playwright/test';

test('my new test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.some-element')).toBeVisible();
});
```

## Best Practices

- Use `test.describe` to group related tests
- Use `test.beforeEach` for common setup
- Use page objects for complex UI interactions
- Add comments to explain test logic
- Keep tests independent of each other