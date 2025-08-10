# Critical Fixes Documentation

This file tracks critical fixes that should not be regressed.

## Player Movement Rendering Fix

**Issue**: Playwright test "game state visual changes" failing due to player movement not being visually apparent.

**Root Cause**: Cell component was using separate player position state instead of maze data directly, causing synchronization issues.

**Fix**: Simplified Cell component to use maze data as single source of truth.

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
- Always update `setStableMazeRef` immediately in movePlayer function
- Read documentation before modifying player rendering logic

---

*Add other critical fixes here as they are discovered and resolved.*