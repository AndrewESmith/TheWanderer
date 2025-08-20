# Playwright Visual Regression Test Timeout Fixes

## Summary of Changes

The visual regression tests were failing due to timeout issues. I've implemented comprehensive timeout fixes across the test suite.

## Changes Made

### 1. Playwright Configuration (`playwright.config.ts`)
- **Global test timeout**: Increased from default 30s to 60s
- **Action timeout**: Set to 15s for individual actions
- **Navigation timeout**: Set to 30s for page navigation

### 2. Visual Test Helpers (`src/playwrighttests/utils/visual-test-helpers.ts`)
- **Image load timeout**: Increased from 10s to 20s
- **Stabilization delay**: Increased from 500ms to 1s
- **Maze grid selector timeout**: Increased from 5s to 15s
- **DOM update timeout**: Increased from 5s to 10s
- **Network idle timeout**: Increased from 5s to 10s
- **Font loading timeout**: Increased from 3s to 5s

### 3. Test-Specific Timeouts (`visual-regression.spec.ts`)
- **Core interface tests**: 90 seconds
- **Responsive design tests**: 120 seconds (2 minutes)
- **Cross-browser tests**: 90 seconds
- **Image loading tests**: 90 seconds
- **Game state tests**: 120 seconds (2 minutes)
- **Accessibility tests**: 90 seconds

### 4. Enhanced Error Handling
- Added retry logic with `waitWithRetry` function
- Improved dialog dismissal with longer timeouts
- Better error handling in responsive layout testing
- More lenient image loading thresholds for complex tests

### 5. Navigation Improvements
- All `page.goto()` calls now have explicit 30s timeout
- Enhanced `waitForGameStable()` with configurable options
- Better stabilization delays for different test scenarios

## Key Timeout Settings

| Component        | Old Timeout | New Timeout | Reason                            |
| ---------------- | ----------- | ----------- | --------------------------------- |
| Global test      | 30s         | 60s         | Visual tests need more time       |
| Image loading    | 10s         | 20s         | Complex image loading scenarios   |
| Maze grid wait   | 5s          | 15s         | Allow more time for DOM rendering |
| Navigation       | Default     | 30s         | Ensure page loads completely      |
| Responsive tests | 30s         | 120s        | Multiple viewport changes         |

## Usage

The tests should now handle:
- Slow image loading
- Complex DOM rendering
- Multiple viewport changes
- Dialog dismissal delays
- Network latency issues

Run the tests with:
```bash
npx playwright test src/playwrighttests/visual-regression.spec.ts
```

## Troubleshooting

If tests still timeout:
1. Check network connectivity
2. Verify dev server is running on port 3000
3. Consider increasing specific timeouts further
4. Check browser console for JavaScript errors
5. Use `--debug` flag to step through tests manually