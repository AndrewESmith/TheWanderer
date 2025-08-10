# Visual Regression Testing

This document explains how to use the visual regression testing system for The Wanderer game.

## Overview

Visual regression tests automatically capture screenshots of the game interface and compare them against baseline images to detect unintended visual changes. This helps ensure UI consistency across different browsers, screen sizes, and game states.

## Quick Start

### Running Visual Tests

```bash
# Run all visual tests on Chromium
npm run test:visual:chromium

# Run all visual tests on all browsers
npm run test:visual

# Run specific test suite
npm run test:visual:chromium -- --grep="Core Interface"

# Update baselines after intentional UI changes
npm run test:visual:update
```

### First Time Setup

When setting up visual regression tests for the first time, generate baseline screenshots:

```bash
# Generate all baselines for all browsers
npm run test:visual:generate

# Or generate for specific browser
npm run test:visual:chromium -- --update-snapshots
```

## Test Suites

### Core Interface Tests
- Full game interface screenshots
- Individual cell type verification
- HUD display verification
- Image loading states

### Responsive Design Tests
- Layout across different screen sizes
- Mobile controls visibility
- Tablet layout verification
- HUD responsive behavior

### Cross-Browser Consistency Tests
- Maze rendering consistency
- Cell image rendering
- HUD consistency across browsers

### Image Loading Scenarios
- Complete image loading failure fallback
- Partial image loading failure handling
- Error indicator verification

### Game State Changes
- Player movement visual tracking
- HUD value changes
- Game over state verification
- Level progression changes

### Accessibility and Edge Cases
- High contrast mode compatibility
- Reduced motion preferences
- Zoom level compatibility
- Keyboard navigation feedback

## Available Scripts

| Script                         | Description                           |
| ------------------------------ | ------------------------------------- |
| `npm run test:visual`          | Run visual tests with enhanced output |
| `npm run test:visual:update`   | Update all baseline screenshots       |
| `npm run test:visual:generate` | Generate baselines for all browsers   |
| `npm run test:visual:chromium` | Run tests on Chromium only            |
| `npm run test:visual:firefox`  | Run tests on Firefox only             |
| `npm run test:visual:webkit`   | Run tests on WebKit only              |

## Command Line Options

```bash
# Filter tests by name
npm run test:visual:chromium -- --grep="cell types"

# Update snapshots
npm run test:visual:chromium -- --update-snapshots

# Run specific browser
npm run test:visual -- --browser=firefox
```

## Understanding Test Results

### Passing Tests
When tests pass, it means the current UI matches the baseline screenshots within the configured threshold (20% difference allowed).

### Failing Tests
Tests fail when visual differences exceed the threshold. This could indicate:

1. **Unintended changes**: Bug fixes or code changes accidentally affected the UI
2. **Intentional changes**: You made deliberate UI improvements
3. **Environment differences**: Different fonts, OS, or browser versions

### Updating Baselines

When you make intentional UI changes, update the baselines:

```bash
# Update all baselines
npm run test:visual:update

# Update specific test baselines
npm run test:visual:chromium -- --grep="HUD" --update-snapshots
```

## Troubleshooting

### localStorage Access Errors
The tests automatically handle localStorage access issues by:
- Waiting for page load before accessing localStorage
- Using try-catch blocks around localStorage operations
- Providing fallback behavior when localStorage is unavailable

### Image Loading Issues
Tests wait for images to load using:
- Image load state detection (`.image-loaded`, `.image-error` classes)
- Configurable timeout and retry logic
- Fallback handling for failed image loads

### Flaky Tests
If tests are inconsistent:
1. Increase stabilization delays in test options
2. Check for animations that need to be disabled
3. Verify image loading is complete before screenshots
4. Ensure consistent viewport sizes

## Configuration

Visual test configuration is in `src/playwrighttests/utils/visual-test-helpers.ts`:

```typescript
export const DEFAULT_VISUAL_OPTIONS: Required<VisualTestOptions> = {
    imageLoadTimeout: 10000,        // Wait up to 10s for images
    minLoadedPercentage: 0.8,       // 80% of images must load
    stabilizationDelay: 500,        // Wait 500ms after loading
    disableAnimations: true,        // Disable CSS animations
};
```

Playwright configuration is in `playwright.config.ts`:

```typescript
expect: {
    toHaveScreenshot: {
        threshold: 0.2,           // 20% difference threshold
        mode: 'strict',           // Strict comparison mode
        animations: 'disabled',   // Disable animations
    },
},
```

## Best Practices

1. **Run tests locally** before committing UI changes
2. **Update baselines** when making intentional UI changes
3. **Test across browsers** for cross-browser compatibility
4. **Use descriptive test names** for easy identification
5. **Keep screenshots focused** on specific UI components when possible
6. **Review diff images** when tests fail to understand changes

## File Structure

```
src/playwrighttests/
├── visual-regression.spec.ts           # Main test file
├── utils/
│   └── visual-test-helpers.ts          # Helper functions
└── visual-regression.spec.ts-snapshots/ # Baseline screenshots
    ├── full-game-desktop-chromium-win32.png
    ├── cell-type-player-chromium-win32.png
    └── ...

scripts/
├── run-visual-tests.js                 # Enhanced test runner
└── generate-visual-baselines.js        # Baseline generator
```

## Integration with CI/CD

For continuous integration, consider:

1. **Generating baselines** in a consistent environment
2. **Storing baselines** in version control
3. **Running tests** on pull requests
4. **Handling failures** with clear reporting
5. **Updating baselines** through automated processes

Example CI configuration:

```yaml
- name: Run Visual Regression Tests
  run: npm run test:visual:chromium
  
- name: Upload test results
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: visual-test-results
    path: test-results/
```