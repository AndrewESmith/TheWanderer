# Visual Regression Testing for The Wanderer

This document describes the visual regression testing implementation for The Wanderer game's graphics upgrade from emoji to PNG images.

## Overview

The visual regression tests ensure that the graphics upgrade maintains consistent visual appearance across:
- Different browsers (Chromium, Firefox, WebKit)
- Different screen sizes and orientations
- Various game states and interactions
- Image loading scenarios (success, failure, partial failure)

## Test Structure

### Core Test Files

- `visual-regression.spec.ts` - Main visual regression test suite
- `utils/visual-test-helpers.ts` - Utility functions for visual testing
- `VISUAL_REGRESSION_TESTING.md` - This documentation file

### Test Categories

#### 1. Core Interface Tests
- Full game interface screenshots
- Maze grid rendering
- Individual cell type verification
- HUD display verification
- Image loading state verification
- Game state change tracking

#### 2. Responsive Design Tests
- Layout across different screen sizes (desktop, tablet, mobile)
- Mobile controls visibility and layout
- HUD responsive behavior
- Cross-device consistency

#### 3. Cross-Browser Consistency Tests
- Maze rendering consistency across browsers
- Cell image rendering consistency
- HUD consistency across browsers

#### 4. Image Loading Scenario Tests
- Complete image loading failure fallback
- Partial image loading failure handling
- Image loading error indicators
- Mixed loading states

#### 5. Game State Change Tests
- Player movement visual tracking
- HUD value changes
- Game over state verification
- Level progression visual changes

#### 6. Accessibility and Edge Case Tests
- High contrast mode compatibility
- Reduced motion preferences
- Zoom level compatibility
- Keyboard navigation visual feedback

## Running Visual Regression Tests

### Prerequisites

1. Ensure the development server is running:
   ```bash
   npm run dev
   ```

2. Install Playwright browsers if not already installed:
   ```bash
   npx playwright install
   ```

### Running Tests

#### Run all visual regression tests:
```bash
npm run test:visual
```

#### Run with Playwright UI for debugging:
```bash
npx playwright test src/playwrighttests/visual-regression.spec.ts --ui
```

#### Update baseline screenshots (when intentional changes are made):
```bash
npm run test:visual:update
```

#### Run specific test collections:
```bash
# Core interface tests
npm run test:visual:core

# Responsive design tests
npm run test:visual:responsive

# Cross-browser consistency tests
npm run test:visual:cross-browser

# Image loading scenario tests
npm run test:visual:image-loading

# Game state change tests
npm run test:visual:game-state

# Accessibility and edge case tests
npm run test:visual:accessibility
```

#### Update specific test collections:
```bash
# Update core interface baselines
npm run test:visual:core:update

# Update responsive design baselines
npm run test:visual:responsive:update

# Update cross-browser baselines
npm run test:visual:cross-browser:update

# Update image loading baselines
npm run test:visual:image-loading:update

# Update game state baselines
npm run test:visual:game-state:update

# Update accessibility baselines
npm run test:visual:accessibility:update
```

#### Advanced usage with the script directly:
```bash
# Run specific collection with custom browser
node scripts/run-visual-tests.js --collection=responsive --browser=firefox

# Run with custom grep pattern
node scripts/run-visual-tests.js --grep="Mobile Controls"

# Show help and available options
node scripts/run-visual-tests.js --help
```

## Understanding Test Results

### Screenshot Comparison

Visual regression tests work by:
1. Taking screenshots of UI elements
2. Comparing them against baseline images
3. Flagging differences that exceed the threshold (0.2 or 20%)

### Test Artifacts

When tests run, they generate:
- **Screenshots**: Stored in `test-results/` directory
- **Baseline images**: Stored in `src/playwrighttests/visual-regression.spec.ts-snapshots/`
- **Diff images**: Generated when tests fail, showing visual differences

### Interpreting Failures

Visual test failures can indicate:
1. **Intentional changes**: Graphics upgrade working as expected
2. **Unintentional regressions**: Broken styling or image loading
3. **Browser differences**: Inconsistent rendering across browsers
4. **Timing issues**: Images not fully loaded before screenshot

## Maintenance

### Updating Baselines

When making intentional visual changes:

1. Run tests to see current failures:
   ```bash
   npm run test:visual
   ```

2. Review the diff images in `test-results/`

3. If changes are correct, update baselines:
   ```bash
   npm run test:visual:update
   ```

4. Commit the new baseline images to version control

### Adding New Tests

To add new visual regression tests:

1. Add test cases to `visual-regression.spec.ts`
2. Use helper functions from `utils/visual-test-helpers.ts`
3. Follow the naming convention: `test-name-context.png`
4. Run tests to generate initial baselines
5. Review and commit baseline images

### Helper Functions

The `visual-test-helpers.ts` provides utilities:

- `waitForGameStable()` - Wait for images to load and game to stabilize
- `takeStableScreenshot()` - Take screenshot with consistent options
- `verifyCellTypes()` - Test all cell types systematically
- `testResponsiveLayout()` - Test across multiple viewport sizes
- `simulateImageLoadingFailures()` - Test fallback scenarios
- `verifyImageLoadingStates()` - Check loading state handling

## Configuration

### Playwright Configuration

Visual comparison settings in `playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: { 
    threshold: 0.2,        // 20% difference threshold
    mode: 'strict',        // Strict comparison mode
    animations: 'disabled', // Disable animations for consistency
  },
}
```

### Browser Coverage

Tests run across:
- **Desktop**: Chromium, Firefox, WebKit
- **Mobile**: Mobile Chrome, Mobile Safari (when enabled)

### Viewport Sizes Tested

- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024
- Mobile: 375x667 (iPhone SE)

## Troubleshooting

### Common Issues

#### 1. Flaky Tests Due to Timing
**Problem**: Screenshots taken before images fully load
**Solution**: Increase `imageLoadTimeout` in test options

#### 2. Browser-Specific Differences
**Problem**: Slight rendering differences between browsers
**Solution**: Adjust threshold or create browser-specific baselines

#### 3. Image Loading Failures in Tests
**Problem**: Network issues preventing image loading
**Solution**: Use local test images or mock image responses

#### 4. Large Baseline Image Files
**Problem**: Git repository size growing due to screenshots
**Solution**: Use Git LFS for large binary files

### Debugging Tips

1. **Use Playwright UI**: `--ui` flag provides visual debugging
2. **Check timing**: Add `page.waitForTimeout()` if needed
3. **Verify selectors**: Ensure CSS selectors match current markup
4. **Review diff images**: Check `test-results/` for visual differences
5. **Test locally**: Run tests on your machine before CI

## Best Practices

### Test Design

1. **Stable selectors**: Use reliable CSS selectors that won't change
2. **Consistent timing**: Always wait for stable state before screenshots
3. **Meaningful names**: Use descriptive screenshot names
4. **Focused tests**: Test specific UI components rather than entire pages
5. **Cross-browser coverage**: Ensure tests work across all target browsers

### Maintenance

1. **Regular updates**: Update baselines when making intentional changes
2. **Review failures**: Don't automatically update without reviewing
3. **Version control**: Always commit baseline images
4. **Documentation**: Keep this documentation updated with changes

## Integration with CI/CD

### GitHub Actions Integration

Add to your workflow:

```yaml
- name: Run Visual Regression Tests
  run: npm run test:visual

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: failure()
  with:
    name: visual-test-results
    path: test-results/
```

### Handling CI Failures

1. Download test artifacts from CI
2. Review diff images locally
3. Update baselines if changes are intentional
4. Re-run CI pipeline

## Requirements Coverage

This visual regression testing implementation addresses the following requirements:

### Requirement 1.1 & 1.3
- **Consistent graphics across devices**: Cross-browser and responsive tests
- **Professional visual appearance**: Full interface screenshot comparisons

### Requirement 1.3
- **Identical appearance across browsers**: Cross-browser consistency tests
- **Different screen sizes**: Responsive design test coverage

The visual regression tests provide comprehensive coverage of the graphics upgrade requirements, ensuring consistent visual presentation across all supported platforms and scenarios.