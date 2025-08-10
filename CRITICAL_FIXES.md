# Critical Fixes Documentation

This file tracks critical fixes that should not be regressed.

## Player Movement Rendering Fix ✅ RESOLVED

**Issue**: Playwright test "game state visual changes" failing due to player movement not being visually apparent.

**Root Cause**: Cell component was using separate player position state instead of maze data directly, causing synchronization issues. Later, mobile flicker fixes introduced complex maze update logic that prevented immediate visual updates.

**Fix**: 
1. Simplified Cell component to use maze data as single source of truth: `const actualCellType = type;`
2. Simplified movePlayer function to always update stableMazeRef immediately: `setStableMazeRef([...gameState.maze.map((row) => [...row])]);`

**Status**: ✅ FIXED - All tests passing as of latest update

**Documentation**: See `PLAYER_MOVEMENT_FIX_DOCUMENTATION.md` for complete details.

**Key Files**:
- `src/App.tsx` - Main fix location (Cell component and movePlayer function)
- `src/playwrighttests/utils/visual-test-helpers.ts` - Test helper with documentation

**Warning Signs of Regression**:
- "game state visual changes" test fails
- Player appears not to move when arrow keys are pressed
- Visual lag in player movement

**Prevention**: 
- Always use `const actualCellType = type;` in Cell component
- Always update `setStableMazeRef([...gameState.maze.map((row) => [...row])]);` immediately in movePlayer function
- Do NOT use complex maze update logic that tries to be "smart" about when to update
- Read documentation before modifying player rendering logic

**Test Verification**:
- `npx playwright test --grep "game state visual changes"` - Must pass
- `npx playwright test --grep "player moves with keyboard controls"` - Must pass

---

*Add other critical fixes here as they are discovered and resolved.*