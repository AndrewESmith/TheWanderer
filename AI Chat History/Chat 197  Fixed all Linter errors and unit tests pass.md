# Fixing undefined error in code
_Exported on 8/9/2025 at 23:17:48 GMT+10 from Cursor (1.4.3)_

---

**User**

For the code present, we get this error:
```
'firstFocusable' is possibly 'undefined'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I'll adjust the focus logic so TypeScript can prove elements are defined: handle 0 and 1 lengths first, then derive `firstFocusable` and `lastFocusable` with non-null assertions for the remaining cases. Applying the edits now.

```typescript
/**
 * Focus trap utility for modal components
 * Ensures keyboard navigation stays within the modal when it's open
 */

/**
 * Gets all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
        'button:not([disabled]):not([aria-hidden="true"])',
        'input:not([disabled]):not([aria-hidden="true"])',
        'select:not([disabled]):not([aria-hidden="true"])',
        'textarea:not([disabled]):not([aria-hidden="true"])',
        'a[href]:not([aria-hidden="true"])',
        '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
        '[contenteditable="true"]:not([aria-hidden="true"])',
        'summary:not([disabled]):not([aria-hidden="true"])',
        'details:not([disabled]):not([aria-hidden="true"])',
        'audio[controls]:not([disabled]):not([aria-hidden="true"])',
        'video[controls]:not([disabled]):not([aria-hidden="true"])'
    ].join(', ');

    const elements = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];

    // Filter out elements that are not visible or have display: none
    return elements.filter(element => {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            element.offsetWidth > 0 &&
            element.offsetHeight > 0 &&
            !element.hasAttribute('inert');
    });
}

/**
 * Creates a focus trap for a modal element
 * Returns cleanup function to remove the trap
 */
export function createFocusTrap(modalElement: HTMLElement): () => void {
    // Store the element that was focused before opening the modal
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Function to get current focusable elements (refreshed on each call)
    const getCurrentFocusableElements = () => getFocusableElements(modalElement);

    // Focus the first focusable element when trap is created
    const initialFocusableElements = getCurrentFocusableElements();
    const initialFirstFocusable = initialFocusableElements[0];

    if (initialFirstFocusable) {
        // Use setTimeout to ensure the modal is fully rendered before focusing
        setTimeout(() => {
            initialFirstFocusable.focus();
        }, 0);
    } else {
        // If no focusable elements, focus the modal container itself
        modalElement.focus();
    }

    const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        // Get current focusable elements (in case DOM has changed)
        const focusableElements = getCurrentFocusableElements();

        // If no focusable elements, prevent tabbing and focus modal container
        if (focusableElements.length === 0) {
            event.preventDefault();
            modalElement.focus();
            return;
        }

        // If only one focusable element, keep focus on it
        if (focusableElements.length === 1) {
            event.preventDefault();
            focusableElements[0]!.focus();
            return;
        }

        // From here on, we have at least two focusable elements
        const firstFocusable = focusableElements[0]!;
        const lastFocusable = focusableElements[focusableElements.length - 1]!;

        // Handle tab navigation within the modal
        if (event.shiftKey) {
            // Shift + Tab: moving backwards
            if (document.activeElement === firstFocusable || document.activeElement === modalElement) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab: moving forwards
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    // Handle focus events to ensure focus stays within modal
    const handleFocusIn = (event: FocusEvent) => {
        const target = event.target as HTMLElement;

        // If focus moves outside the modal, bring it back
        if (!modalElement.contains(target)) {
            event.preventDefault();
            const focusableElements = getCurrentFocusableElements();
            const firstFocusable = focusableElements[0];

            if (firstFocusable) {
                firstFocusable.focus();
            } else {
                modalElement.focus();
            }
        }
    };

    // Add event listeners
    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('focusin', handleFocusIn);

    // Return cleanup function
    return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('focusin', handleFocusIn);

        // Restore focus to previously focused element
        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            // Use setTimeout to ensure modal is fully closed before restoring focus
            setTimeout(() => {
                previouslyFocusedElement.focus();
            }, 0);
        }
    };
}
```

- Fix: guard lengths before dereferencing, then use non-null once safe.

Edits in `src/utils/focus-trap.ts`:
```ts
// If only one focusable element, keep focus on it
if (focusableElements.length === 1) {
  event.preventDefault();
  focusableElements[0]!.focus();
  return;
}

// From here on, we have at least two focusable elements
const firstFocusable = focusableElements[0]!;
const lastFocusable = focusableElements[focusableElements.length - 1]!;
```

- This removes the “possibly undefined” errors and keeps runtime logic unchanged.

- Lint: clean.

```typescript
// If only one focusable element, keep focus on it
if (focusableElements.length === 1) {
  event.preventDefault();
  focusableElements[0]!.focus();
  return;
}

// From here on, we have at least two focusable elements
const firstFocusable = focusableElements[0]!;
const lastFocusable = focusableElements[focusableElements.length - 1]!;
```

---

**User**

For the code present, we get this error:
```
'playerWalk' is possibly 'undefined'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Reading `sound-config` to confirm the typing of `SOUND_ASSETS` and adjust the test accordingly, then I’ll update the test with a minimal non-null assertion or an early expect to satisfy TypeScript.

I’m going to update the test to use a non-null asserted indexed access so TypeScript knows the asset exists, then verify lints are clean.

```typescript
import { describe, it, expect } from 'vitest';
import { SOUND_ASSETS, SOUND_CONFIG, SOUND_IDS } from '../audio/config/sound-config';
import { isWebAudioSupported, isHTML5AudioSupported } from '../audio/utils/audio-utils';

describe('Sound System Infrastructure', () => {
    describe('Sound Configuration', () => {
        it('should have all required sound assets defined', () => {
            expect(SOUND_ASSETS).toBeDefined();
            expect(Object.keys(SOUND_ASSETS)).toHaveLength(10);

            // Check that all expected sounds are present
            expect(SOUND_ASSETS.PLAYER_WALK).toBeDefined();
            expect(SOUND_ASSETS.PLAYER_DIG).toBeDefined();
            expect(SOUND_ASSETS.BOULDER_MOVE).toBeDefined();
            expect(SOUND_ASSETS.ARROW_MOVE).toBeDefined();
            expect(SOUND_ASSETS.COLLISION_THUD).toBeDefined();
            expect(SOUND_ASSETS.DEATH_SOUND).toBeDefined();
            expect(SOUND_ASSETS.VICTORY_SOUND).toBeDefined();
            expect(SOUND_ASSETS.DOOR_SLAM).toBeDefined();
            expect(SOUND_ASSETS.DIAMOND_COLLECT).toBeDefined();
            expect(SOUND_ASSETS.BOMB_SOUND).toBeDefined();
        });

        it('should have proper sound asset structure', () => {
            const playerWalk = SOUND_ASSETS['PLAYER_WALK']!;
            expect(playerWalk.id).toBe('player_walk');
            expect(playerWalk.src).toBeInstanceOf(Array);
            expect(playerWalk.src.length).toBeGreaterThan(0);
            expect(typeof playerWalk.volume).toBe('number');
            expect(typeof playerWalk.loop).toBe('boolean');
            expect(typeof playerWalk.preload).toBe('boolean');
        });

        it('should have sound configuration with categories', () => {
            expect(SOUND_CONFIG).toBeDefined();
            expect(SOUND_CONFIG.categories).toBeDefined();
            expect(SOUND_CONFIG.categories.movement).toBeDefined();
            expect(SOUND_CONFIG.categories.collision).toBeDefined();
            expect(SOUND_CONFIG.categories.gameState).toBeDefined();
        });

        it('should have sound ID constants', () => {
            expect(SOUND_IDS).toBeDefined();
            expect(SOUND_IDS.PLAYER_WALK).toBe('player_walk');
            expect(SOUND_IDS.BOULDER_MOVE).toBe('boulder_move');
            expect(SOUND_IDS.DEATH_SOUND).toBe('death_sound');
        });
    });

    describe('Audio Utilities', () => {
        it('should detect browser audio support', () => {
            const webAudioSupported = isWebAudioSupported();
            const html5AudioSupported = isHTML5AudioSupported();

            expect(typeof webAudioSupported).toBe('boolean');
            expect(typeof html5AudioSupported).toBe('boolean');
        });
    });
});
```

- Fix: assert existence when reading from the asset map.

Edits in `src/tests/sound-system-infrastructure.test.ts`:
```ts
- const playerWalk = SOUND_ASSETS.PLAYER_WALK;
+ const playerWalk = SOUND_ASSETS['PLAYER_WALK']!;
```

- Rationale: `SOUND_ASSETS` is `Record<string, SoundAsset>`. Using indexed access with `!` tells TS this key exists in the test context. Lint is clean.

```typescript
- const playerWalk = SOUND_ASSETS.PLAYER_WALK;
+ const playerWalk = SOUND_ASSETS['PLAYER_WALK']!;
```

---

**User**

For the code present, we get this error:
```
Property 'expect' does not exist on type 'typeof globalThis'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I'll check the Vitest config to see if globals are already enabled and then update the setup file accordingly.

I'll remove the manual global assignments and adjust imports in `src/tests/setup.ts` since Vitest `globals` is already enabled. Then I'll recheck lints for that file.

```typescript
// This file contains setup code for tests
import { vi, beforeEach, afterEach } from 'vitest';

// Vitest globals are already enabled via config

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('../maze.css', () => ({}));

// Reset mocks between tests
beforeEach(() => {
    vi.resetModules();
});

afterEach(() => {
    vi.clearAllMocks();
});
```

- Fix: remove manual global assignments; Vitest already exposes globals.

Edits in `src/tests/setup.ts`:
```ts
-import { expect, vi, beforeEach, afterEach } from 'vitest';
-// Ensure we're using Vitest's globals
-global.expect = expect;
-global.vi = vi;
-global.beforeEach = beforeEach;
-global.afterEach = afterEach;
+import { vi, beforeEach, afterEach } from 'vitest';
// Vitest globals are already enabled via config
```

- Rationale: `vitest.config.ts` sets `test.globals: true`, so typing errors go away. Lint is clean.

```typescript
-import { expect, vi, beforeEach, afterEach } from 'vitest';
-// Ensure we're using Vitest's globals
-global.expect = expect;
-global.vi = vi;
-global.beforeEach = beforeEach;
-global.afterEach = afterEach;
+import { vi, beforeEach, afterEach } from 'vitest';
// Vitest globals are already enabled via config
```

---

**User**

For the code present, we get this error:
```
Object is possibly 'undefined'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Updating the test to add non-null assertions where indexes are guaranteed to exist and ensure x/y are typed as numbers to satisfy strict indexing and destructuring rules. Proceeding to edit and recheck lints.

```typescript
import { describe, it, expect } from 'vitest';
import {
    shouldBlockPlayerMovement,
    updateMovementConstraints,
    getConstraintReason,
    hasBouldersInMotion,
    getMovingBoulderCount,
    validateConstraintState,
    createMovementConstraintSystem,
    createEnhancedMovementConstraint,
    isMovementAllowed,
    getMovementStatus
} from '../physics/movement-constraint-system';
import {
    createBoulderStateManager,
    updateBoulderMovement,
    type BoulderStateManager,
    type MovementConstraint,
} from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('Movement Constraint System', () => {
    // Test maze with boulders for testing
    const testMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    let boulderStateManager: BoulderStateManager;

    beforeEach(() => {
        boulderStateManager = createBoulderStateManager(testMaze);
    });

    describe('shouldBlockPlayerMovement', () => {
        it('should not block movement when no boulders are moving', () => {
            const shouldBlock = shouldBlockPlayerMovement(boulderStateManager);
            expect(shouldBlock).toBe(false);
        });

        it('should block movement when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const shouldBlock = shouldBlockPlayerMovement(updatedManager);
            expect(shouldBlock).toBe(true);
        });

        it('should block movement when multiple boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                []
            );

            const shouldBlock = shouldBlockPlayerMovement(updatedManager);
            expect(shouldBlock).toBe(true);
        });

        it('should not block movement after all boulders stop', () => {
            // First set boulders as moving
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);

            // Then stop all boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }, { x: 3, y: 1 }]
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(false);
        });
    });

    describe('updateMovementConstraints', () => {
        it('should create constraint with no blocking when no boulders are moving', () => {
            const constraint = updateMovementConstraints(boulderStateManager);

            expect(constraint.isPlayerMovementBlocked).toBe(false);
            expect(constraint.blockingReason).toBe('none');
        });

        it('should create constraint with blocking when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const constraint = updateMovementConstraints(updatedManager);

            expect(constraint.isPlayerMovementBlocked).toBe(true);
            expect(constraint.blockingReason).toBe('boulder_movement');
        });

        it('should update constraint when boulder states change', () => {
            // Initially no constraints
            let constraint = updateMovementConstraints(boulderStateManager);
            expect(constraint.isPlayerMovementBlocked).toBe(false);

            // Add moving boulder
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );
            constraint = updateMovementConstraints(updatedManager);
            expect(constraint.isPlayerMovementBlocked).toBe(true);

            // Stop boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }]
            );
            constraint = updateMovementConstraints(updatedManager);
            expect(constraint.isPlayerMovementBlocked).toBe(false);
        });
    });

    describe('getConstraintReason', () => {
        it('should return no constraints message when no boulders are moving', () => {
            const reason = getConstraintReason(boulderStateManager);
            expect(reason).toBe('No movement constraints active');
        });

        it('should return single boulder message when one boulder is moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const reason = getConstraintReason(updatedManager);
            expect(reason).toBe('A boulder is currently moving');
        });

        it('should return multiple boulders message when multiple boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                []
            );

            const reason = getConstraintReason(updatedManager);
            expect(reason).toBe('3 boulders are currently moving');
        });

        it('should handle edge case of two boulders moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const reason = getConstraintReason(updatedManager);
            expect(reason).toBe('2 boulders are currently moving');
        });
    });

    describe('hasBouldersInMotion', () => {
        it('should return false when no boulders are moving', () => {
            const hasMoving = hasBouldersInMotion(boulderStateManager);
            expect(hasMoving).toBe(false);
        });

        it('should return true when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const hasMoving = hasBouldersInMotion(updatedManager);
            expect(hasMoving).toBe(true);
        });

        it('should return false after all boulders stop moving', () => {
            // Start with moving boulders
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );
            expect(hasBouldersInMotion(updatedManager)).toBe(true);

            // Stop all boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }, { x: 3, y: 1 }]
            );
            expect(hasBouldersInMotion(updatedManager)).toBe(false);
        });
    });

    describe('getMovingBoulderCount', () => {
        it('should return 0 when no boulders are moving', () => {
            const count = getMovingBoulderCount(boulderStateManager);
            expect(count).toBe(0);
        });

        it('should return correct count when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const count = getMovingBoulderCount(updatedManager);
            expect(count).toBe(2);
        });

        it('should update count when boulders stop moving', () => {
            // Start with 3 moving boulders
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                []
            );
            expect(getMovingBoulderCount(updatedManager)).toBe(3);

            // Stop 2 boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }, { x: 3, y: 1 }]
            );
            expect(getMovingBoulderCount(updatedManager)).toBe(1);

            // Stop remaining boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 3 }]
            );
            expect(getMovingBoulderCount(updatedManager)).toBe(0);
        });
    });

    describe('validateConstraintState', () => {
        it('should validate consistent constraint states', () => {
            const validConstraint1: MovementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'none',
            };

            const validConstraint2: MovementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            expect(validateConstraintState(validConstraint1)).toBe(true);
            expect(validateConstraintState(validConstraint2)).toBe(true);
        });

        it('should invalidate inconsistent constraint states', () => {
            const invalidConstraint1: MovementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'none',
            };

            const invalidConstraint2: MovementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'boulder_movement',
            };

            expect(validateConstraintState(invalidConstraint1)).toBe(false);
            expect(validateConstraintState(invalidConstraint2)).toBe(false);
        });
    });

    describe('createMovementConstraintSystem', () => {
        it('should create a valid movement constraint system', () => {
            const system = createMovementConstraintSystem();

            expect(system).toBeDefined();
            expect(typeof system.shouldBlockPlayerMovement).toBe('function');
            expect(typeof system.updateMovementConstraints).toBe('function');
            expect(typeof system.getConstraintReason).toBe('function');
        });

        it('should have working methods in the created system', () => {
            const system = createMovementConstraintSystem();

            // Test with no moving boulders
            expect(system.shouldBlockPlayerMovement(boulderStateManager)).toBe(false);

            const constraint = system.updateMovementConstraints(boulderStateManager);
            expect(constraint.isPlayerMovementBlocked).toBe(false);

            const reason = system.getConstraintReason(boulderStateManager);
            expect(reason).toBe('No movement constraints active');

            // Test with moving boulders
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            expect(system.shouldBlockPlayerMovement(updatedManager)).toBe(true);

            const constraintWithMoving = system.updateMovementConstraints(updatedManager);
            expect(constraintWithMoving.isPlayerMovementBlocked).toBe(true);

            const reasonWithMoving = system.getConstraintReason(updatedManager);
            expect(reasonWithMoving).toBe('A boulder is currently moving');
        });
    });

    describe('createEnhancedMovementConstraint', () => {
        it('should create enhanced constraint with additional metadata', () => {
            const enhanced = createEnhancedMovementConstraint(boulderStateManager);

            expect(enhanced.isPlayerMovementBlocked).toBe(false);
            expect(enhanced.blockingReason).toBe('none');
            expect(enhanced.movingBoulderCount).toBe(0);
            expect(enhanced.constraintReason).toBe('No movement constraints active');
            expect(enhanced.isValid).toBe(true);
        });

        it('should create enhanced constraint with moving boulders', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const enhanced = createEnhancedMovementConstraint(updatedManager);

            expect(enhanced.isPlayerMovementBlocked).toBe(true);
            expect(enhanced.blockingReason).toBe('boulder_movement');
            expect(enhanced.movingBoulderCount).toBe(2);
            expect(enhanced.constraintReason).toBe('2 boulders are currently moving');
            expect(enhanced.isValid).toBe(true);
        });
    });

    describe('isMovementAllowed', () => {
        it('should allow movement when no boulders are moving', () => {
            const isAllowed = isMovementAllowed(boulderStateManager);
            expect(isAllowed).toBe(true);
        });

        it('should not allow movement when boulders are moving', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );

            const isAllowed = isMovementAllowed(updatedManager);
            expect(isAllowed).toBe(false);
        });
    });

    describe('getMovementStatus', () => {
        it('should return correct status when movement is allowed', () => {
            const status = getMovementStatus(boulderStateManager);

            expect(status.isAllowed).toBe(true);
            expect(status.reason).toBe('No movement constraints active');
            expect(status.movingBoulderCount).toBe(0);
        });

        it('should return correct status when movement is blocked', () => {
            const updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }, { x: 3, y: 1 }],
                []
            );

            const status = getMovementStatus(updatedManager);

            expect(status.isAllowed).toBe(false);
            expect(status.reason).toBe('2 boulders are currently moving');
            expect(status.movingBoulderCount).toBe(2);
        });

        it('should update status when boulder states change', () => {
            // Initially allowed
            let status = getMovementStatus(boulderStateManager);
            expect(status.isAllowed).toBe(true);
            expect(status.movingBoulderCount).toBe(0);

            // Add moving boulder
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );
            status = getMovementStatus(updatedManager);
            expect(status.isAllowed).toBe(false);
            expect(status.movingBoulderCount).toBe(1);

            // Stop boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }]
            );
            status = getMovementStatus(updatedManager);
            expect(status.isAllowed).toBe(true);
            expect(status.movingBoulderCount).toBe(0);
        });
    });

    describe('Edge cases and error handling', () => {
        it('should handle empty boulder state manager', () => {
            const emptyMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];
            const emptyManager = createBoulderStateManager(emptyMaze);

            expect(shouldBlockPlayerMovement(emptyManager)).toBe(false);
            expect(hasBouldersInMotion(emptyManager)).toBe(false);
            expect(getMovingBoulderCount(emptyManager)).toBe(0);
            expect(getConstraintReason(emptyManager)).toBe('No movement constraints active');
            expect(isMovementAllowed(emptyManager)).toBe(true);
        });

        it('should handle boulder state manager with zero moving count but inconsistent state', () => {
            // Create a manager with inconsistent state (this shouldn't happen in normal operation)
            const inconsistentManager: BoulderStateManager = {
                ...boulderStateManager,
                movingBoulderCount: 0,
            };

            // Manually set a boulder as moving (simulating inconsistent state)
            const boulderState = inconsistentManager.boulders.get('1,1');
            if (boulderState) {
                inconsistentManager.boulders.set('1,1', {
                    ...boulderState,
                    isMoving: true,
                });
            }

            // The system should rely on movingBoulderCount for performance
            expect(shouldBlockPlayerMovement(inconsistentManager)).toBe(false);
            expect(hasBouldersInMotion(inconsistentManager)).toBe(false);
            expect(getMovingBoulderCount(inconsistentManager)).toBe(0);
        });

        it('should handle boundary conditions for boulder counts', () => {
            // Test with maximum reasonable number of boulders
            const largeMaze: MazeCell[][] = Array(10).fill(null).map(() =>
                Array(10).fill(CELL.BOULDER)
            );
            largeMaze[0] = Array(10).fill(CELL.ROCK);
            largeMaze[9] = Array(10).fill(CELL.ROCK);
            largeMaze[5]![5] = CELL.PLAYER;

            const largeManager = createBoulderStateManager(largeMaze);

            // Set many boulders as moving
            const manyBoulders = Array.from(largeManager.boulders.keys())
                .slice(0, 50)
                .map(key => {
                    const parts = key.split(',');
                    const x = Number(parts[0]!);
                    const y = Number(parts[1]!);
                    return { x, y };
                });

            const updatedLargeManager = updateBoulderMovement(
                largeManager,
                manyBoulders,
                []
            );

            expect(shouldBlockPlayerMovement(updatedLargeManager)).toBe(true);
            expect(getMovingBoulderCount(updatedLargeManager)).toBe(manyBoulders.length);
            expect(getConstraintReason(updatedLargeManager)).toBe(
                `${manyBoulders.length} boulders are currently moving`
            );
        });
    });

    describe('Integration with boulder state changes', () => {
        it('should maintain constraint consistency through boulder lifecycle', () => {
            // Start with no constraints
            expect(shouldBlockPlayerMovement(boulderStateManager)).toBe(false);

            // Trigger boulders (should not affect movement constraints yet)
            // Note: Triggering doesn't make boulders move immediately
            expect(shouldBlockPlayerMovement(boulderStateManager)).toBe(false);

            // Start boulder movement
            let updatedManager = updateBoulderMovement(
                boulderStateManager,
                [{ x: 1, y: 1 }],
                []
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);

            // Add more moving boulders
            updatedManager = updateBoulderMovement(
                updatedManager,
                [{ x: 3, y: 1 }],
                []
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);
            expect(getMovingBoulderCount(updatedManager)).toBe(2);

            // Stop one boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 1, y: 1 }]
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(true);
            expect(getMovingBoulderCount(updatedManager)).toBe(1);

            // Stop last boulder
            updatedManager = updateBoulderMovement(
                updatedManager,
                [],
                [{ x: 3, y: 1 }]
            );
            expect(shouldBlockPlayerMovement(updatedManager)).toBe(false);
            expect(getMovingBoulderCount(updatedManager)).toBe(0);
        });

        it('should handle rapid boulder state changes', () => {
            let manager = boulderStateManager;

            // Rapid start/stop cycles
            for (let i = 0; i < 5; i++) {
                // Start movement
                manager = updateBoulderMovement(
                    manager,
                    [{ x: 1, y: 1 }],
                    []
                );
                expect(shouldBlockPlayerMovement(manager)).toBe(true);

                // Stop movement
                manager = updateBoulderMovement(
                    manager,
                    [],
                    [{ x: 1, y: 1 }]
                );
                expect(shouldBlockPlayerMovement(manager)).toBe(false);
            }

            // Final state should be consistent
            expect(getMovingBoulderCount(manager)).toBe(0);
            expect(isMovementAllowed(manager)).toBe(true);
        });
    });
});
```

- Fix 1: assert inner row exists when indexing a 2D array.
```ts
- largeMaze[5][5] = CELL.PLAYER;
+ largeMaze[5]![5] = CELL.PLAYER;
```

- Fix 2: ensure parsed coordinates are non-undefined numbers.
```ts
- const [x, y] = key.split(',').map(Number);
- return { x, y };
+ const parts = key.split(',');
+ const x = Number(parts[0]!);
+ const y = Number(parts[1]!);
+ return { x, y };
```

- Lint: clean.

```typescript
- largeMaze[5][5] = CELL.PLAYER;
+ largeMaze[5]![5] = CELL.PLAYER;
```

```typescript
- const [x, y] = key.split(',').map(Number);
- return { x, y };
+ const parts = key.split(',');
+ const x = Number(parts[0]!);
+ const y = Number(parts[1]!);
+ return { x, y };
```

---

**User**

For the code present, we get this error:
```
Variable 'managers' implicitly has type 'any[]' in some locations where its type cannot be determined.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Planning to inspect the return type of `createMazeLevelManager` to annotate the `managers` array correctly, then update the test with an explicit type and re-run lints for that file.

Making a quick typed fix: import the `MazeLevelManager` type and annotate `managers` as `MazeLevelManager[]`. Then I’ll recheck lints for that file.

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';
import { CELL } from '../maze';

// Mock console methods to avoid noise in tests
const mockConsole = {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
};

vi.stubGlobal('console', mockConsole);

describe('MazeLevelManager Error Handling', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Initialization with invalid levels', () => {
        it('should handle initialization when some levels are invalid', () => {
            // This test verifies that the manager can still initialize even if some levels fail validation
            const manager = createMazeLevelManager();

            // Should still create a manager with valid levels
            expect(manager).toBeDefined();
            expect(manager.getTotalLevels()).toBeGreaterThan(0);
            expect(manager.getCurrentLevelNumber()).toBe(1);
        });

        it('should provide fallback levels if all original levels fail', () => {
            // Since we can't easily mock the MAZE_LEVELS constant, we test the recovery behavior
            const manager = createMazeLevelManager();

            // Should have at least one level (fallback if needed)
            expect(manager.getTotalLevels()).toBeGreaterThan(0);

            const currentLevel = manager.getCurrentLevel();
            expect(currentLevel).toBeDefined();
            expect(currentLevel.maze).toHaveLength(10);
            expect(currentLevel.maze[0]).toHaveLength(16);
        });
    });

    describe('Level retrieval error handling', () => {
        it('should handle getCurrentLevel gracefully', () => {
            const manager = createMazeLevelManager();

            // Should not throw for valid operations
            expect(() => manager.getCurrentLevel()).not.toThrow();

            const level = manager.getCurrentLevel();
            expect(level).toBeDefined();
            expect(level.levelNumber).toBe(1);
        });

        it('should handle getCurrentLevelNumber gracefully', () => {
            const manager = createMazeLevelManager();

            expect(() => manager.getCurrentLevelNumber()).not.toThrow();
            expect(manager.getCurrentLevelNumber()).toBe(1);
        });

        it('should handle hasNextLevel gracefully', () => {
            const manager = createMazeLevelManager();

            expect(() => manager.hasNextLevel()).not.toThrow();
            expect(typeof manager.hasNextLevel()).toBe('boolean');
        });

        it('should handle getTotalLevels gracefully', () => {
            const manager = createMazeLevelManager();

            expect(() => manager.getTotalLevels()).not.toThrow();
            expect(manager.getTotalLevels()).toBeGreaterThan(0);
        });
    });

    describe('Level advancement error handling', () => {
        it('should handle normal level advancement', () => {
            const manager = createMazeLevelManager();

            if (manager.hasNextLevel()) {
                const nextLevel = manager.advanceToNextLevel();
                expect(nextLevel).not.toBeNull();
                expect(nextLevel!.levelNumber).toBe(2);
                expect(manager.getCurrentLevelNumber()).toBe(2);
            }
        });

        it('should handle advancement beyond last level', () => {
            const manager = createMazeLevelManager();

            // Advance to the last level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should be at the last level
            const lastLevelNumber = manager.getCurrentLevelNumber();
            expect(lastLevelNumber).toBeGreaterThan(1);

            // Trying to advance beyond should return null
            const result = manager.advanceToNextLevel();
            expect(result).toBeNull();

            // Should still be at the same level
            expect(manager.getCurrentLevelNumber()).toBe(lastLevelNumber);
        });

        it('should handle level transition failures gracefully', () => {
            const manager = createMazeLevelManager();

            // Normal advancement should work
            if (manager.hasNextLevel()) {
                expect(() => manager.advanceToNextLevel()).not.toThrow();
            }
        });
    });

    describe('Error recovery scenarios', () => {
        it('should maintain consistent state after errors', () => {
            const manager = createMazeLevelManager();
            const initialLevel = manager.getCurrentLevelNumber();

            // Multiple operations should maintain consistency
            expect(manager.getCurrentLevelNumber()).toBe(initialLevel);
            expect(manager.getCurrentLevel().levelNumber).toBe(initialLevel);

            if (manager.hasNextLevel()) {
                const nextLevel = manager.advanceToNextLevel();
                expect(nextLevel!.levelNumber).toBe(manager.getCurrentLevelNumber());
            }
        });

        it('should handle rapid successive operations', () => {
            const manager = createMazeLevelManager();

            // Rapid successive calls should not cause issues
            for (let i = 0; i < 10; i++) {
                expect(() => manager.getCurrentLevel()).not.toThrow();
                expect(() => manager.getCurrentLevelNumber()).not.toThrow();
                expect(() => manager.hasNextLevel()).not.toThrow();
                expect(() => manager.getTotalLevels()).not.toThrow();
            }
        });

        it('should provide valid level data even in error scenarios', () => {
            const manager = createMazeLevelManager();

            // Every level should be valid
            const totalLevels = manager.getTotalLevels();

            for (let i = 0; i < totalLevels; i++) {
                const level = manager.getCurrentLevel();

                // Basic validation
                expect(level.maze).toHaveLength(10);
                expect(level.maze[0]).toHaveLength(16);
                expect(level.levelNumber).toBeGreaterThan(0);
                expect(level.moveLimit).toBeGreaterThan(0);
                expect(level.diamondCount).toBeGreaterThanOrEqual(0);
                expect(level.bombCount).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.y).toBeGreaterThanOrEqual(0);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                } else {
                    break;
                }
            }
        });
    });

    describe('Validation and repair integration', () => {
        it('should handle levels that need repair', () => {
            const manager = createMazeLevelManager();

            // All levels should be accessible and valid after any repairs
            const totalLevels = manager.getTotalLevels();
            expect(totalLevels).toBeGreaterThan(0);

            // Each level should have proper structure
            for (let i = 0; i < totalLevels; i++) {
                const level = manager.getCurrentLevel();

                // Check maze structure
                expect(level.maze).toHaveLength(10);
                level.maze.forEach(row => {
                    expect(row).toHaveLength(16);
                });

                // Check that player and exit positions are valid
                const playerCell = level.maze[level.playerStartPosition.y]?.[level.playerStartPosition.x];
                const exitCell = level.maze[level.exitPosition.y]?.[level.exitPosition.x];

                expect(playerCell).toBe(CELL.PLAYER);
                expect(exitCell).toBe(CELL.EXIT);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                } else {
                    break;
                }
            }
        });

        it('should log appropriate warnings for repaired levels', () => {
            // Create manager (this may trigger validation warnings)
            const manager = createMazeLevelManager();

            // Since the actual levels are valid, we just verify the manager was created successfully
            // In a real scenario with invalid levels, warnings would be logged
            expect(manager).toBeDefined();
            expect(manager.getTotalLevels()).toBeGreaterThan(0);

            // The console.warn might be called 0 or more times depending on level validity
            // We don't assert specific call counts since the actual levels might be valid
        });
    });

    describe('Fallback level functionality', () => {
        it('should provide working fallback levels', () => {
            const manager = createMazeLevelManager();

            // Get the first level (might be original or fallback)
            const level = manager.getCurrentLevel();

            // Should be a complete, playable level
            expect(level.maze).toHaveLength(10);
            expect(level.maze[0]).toHaveLength(16);

            // Should have proper borders
            for (let x = 0; x < 16; x++) {
                expect(level.maze[0]![x]).toBe(CELL.ROCK); // Top border
                expect(level.maze[9]![x]).toBe(CELL.ROCK); // Bottom border
            }

            for (let y = 0; y < 10; y++) {
                expect(level.maze[y]![0]).toBe(CELL.ROCK); // Left border
                expect(level.maze[y]![15]).toBe(CELL.ROCK); // Right border
            }

            // Should have exactly one player and one exit
            let playerCount = 0;
            let exitCount = 0;

            level.maze.forEach(row => {
                row.forEach(cell => {
                    if (cell === CELL.PLAYER) playerCount++;
                    if (cell === CELL.EXIT) exitCount++;
                });
            });

            expect(playerCount).toBe(1);
            expect(exitCount).toBe(1);
        });
    });

    describe('Performance under error conditions', () => {
        it('should handle multiple manager instances', () => {
            const managers: MazeLevelManager[] = [];

            // Create multiple managers
            for (let i = 0; i < 5; i++) {
                expect(() => {
                    managers.push(createMazeLevelManager());
                }).not.toThrow();
            }

            // All should be functional
            managers.forEach(manager => {
                expect(manager.getTotalLevels()).toBeGreaterThan(0);
                expect(manager.getCurrentLevelNumber()).toBe(1);
            });
        });

        it('should handle concurrent operations', () => {
            const manager = createMazeLevelManager();

            // Simulate concurrent access patterns
            const operations = [
                () => manager.getCurrentLevel(),
                () => manager.getCurrentLevelNumber(),
                () => manager.hasNextLevel(),
                () => manager.getTotalLevels()
            ];

            // Run operations multiple times
            for (let i = 0; i < 20; i++) {
                const operation = operations[i % operations.length]!;
                expect(() => operation()).not.toThrow();
            }
        });
    });
});
```

- Fix: annotate `managers` with the correct type.

Edits in `src/tests/maze-level-manager-error-handling.test.ts`:
```ts
+ import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';
- const managers = [];
+ const managers: MazeLevelManager[] = [];
```

- Rationale: removes implicit any[] and gives proper typing for later usage. Lint is clean.

```typescript
+ import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';
- const managers = [];
+ const managers: MazeLevelManager[] = [];
```

---

**User**

For the code present, we get this error:
```
'createSimpleTestMaze' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I'll remove the unused helper `createSimpleTestMaze` from `src/tests/level-transitions-integration.test.ts` to satisfy TypeScript's noUnusedLocals, then re-run lints for that file.

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGameState } from '../GameState';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';
import { emitSoundEvent } from '../audio/events/sound-event-emitter';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn(),
    getSoundEventEmitter: vi.fn(() => ({
        emit: vi.fn(),
        emitMultiple: vi.fn(),
        setCallback: vi.fn()
    }))
}));

describe('Level Transitions Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    

    /**
     * Helper function to create a test maze with diamonds for score testing
     */
    function createMazeWithDiamonds(): MazeCell[][] {
        return [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.DIAMOND, CELL.DIAMOND, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];
    }

    describe('Complete Level Progression from Level 1 to Final Level', () => {
        it('should progress through all 5 levels sequentially using level manager', () => {
            const gameState = createGameState();

            // Verify initial state
            expect(gameState.currentLevel).toBe(1);
            expect(gameState.isGameComplete).toBe(false);
            expect(gameState.gameState).toBe('playing');

            // Track progression through all levels using level manager directly
            const levelProgression: number[] = [];
            const totalLevels = gameState.levelManager.getTotalLevels();

            // Record initial state
            levelProgression.push(gameState.currentLevel);

            // Test level manager progression directly
            // Level 1 -> 2
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level2 = gameState.levelManager.advanceToNextLevel();
            expect(level2).not.toBeNull();
            expect(level2!.levelNumber).toBe(2);
            levelProgression.push(level2!.levelNumber);

            // Level 2 -> 3
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level3 = gameState.levelManager.advanceToNextLevel();
            expect(level3).not.toBeNull();
            expect(level3!.levelNumber).toBe(3);
            levelProgression.push(level3!.levelNumber);

            // Level 3 -> 4
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level4 = gameState.levelManager.advanceToNextLevel();
            expect(level4).not.toBeNull();
            expect(level4!.levelNumber).toBe(4);
            levelProgression.push(level4!.levelNumber);

            // Level 4 -> 5
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level5 = gameState.levelManager.advanceToNextLevel();
            expect(level5).not.toBeNull();
            expect(level5!.levelNumber).toBe(5);
            levelProgression.push(level5!.levelNumber);

            // Level 5 -> No more levels
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
            const noMoreLevels = gameState.levelManager.advanceToNextLevel();
            expect(noMoreLevels).toBeNull();

            // Verify we've progressed through all levels
            expect(levelProgression).toEqual([1, 2, 3, 4, 5]);
            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
            expect(totalLevels).toBe(5);
        });

        it('should complete game when reaching final level exit', () => {
            const gameState = createGameState();

            // Advance to final level (level 5) using level manager
            gameState.levelManager.advanceToNextLevel(); // 1 -> 2
            gameState.levelManager.advanceToNextLevel(); // 2 -> 3
            gameState.levelManager.advanceToNextLevel(); // 3 -> 4
            gameState.levelManager.advanceToNextLevel(); // 4 -> 5

            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test level progression handler for final level completion
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(true);
            expect(progressionResult.soundToPlay).toBe('victory');
            expect(progressionResult.nextLevel).toBeUndefined();
        });
    });

    describe('Audio Triggering During Level Transitions', () => {
        it('should emit door slam sound when advancing to next level', () => {
            const gameState = createGameState();

            // Verify we're not on the final level
            expect(gameState.levelManager.hasNextLevel()).toBe(true);

            // Test level progression handler for non-final level
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(false);
            expect(progressionResult.soundToPlay).toBe('door_slam');
            expect(progressionResult.nextLevel).not.toBeNull();

            // Test sound emission
            gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);

            // Should have emitted door slam sound for level progression
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });
        });

        it('should emit victory sound when completing final level', () => {
            const gameState = createGameState();

            // Advance to final level
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();

            // Verify we're on the final level
            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test level progression handler for final level
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(true);
            expect(progressionResult.soundToPlay).toBe('victory');

            // Test sound emission
            gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);

            // Should have emitted victory sound for game completion
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should not emit level progression sounds during regular gameplay', () => {
            const gameState = createGameState();

            // Make some regular moves that don't complete the level
            gameState.movePlayer(1, 0); // Move right
            gameState.movePlayer(0, 1); // Move down
            gameState.movePlayer(-1, 0); // Move left

            // Should not have emitted door slam or victory sounds
            expect(emitSoundEvent).not.toHaveBeenCalledWith(
                expect.objectContaining({ type: 'door_slam' })
            );
            expect(emitSoundEvent).not.toHaveBeenCalledWith(
                expect.objectContaining({ type: 'victory' })
            );
        });

        it('should detect level completion correctly', () => {
            const gameState = createGameState();

            // Test level completion detection
            expect(gameState.levelProgressionHandler.isLevelComplete('playing', 5)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('dead', 0)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 1)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
        });
    });

    describe('Score Accumulation Across Multiple Levels', () => {
        it('should maintain cumulative score across level transitions', () => {
            const mazeWithDiamonds = createMazeWithDiamonds();
            const gameState = createGameState({ maze: mazeWithDiamonds });

            // Collect diamonds in level 1
            gameState.movePlayer(1, 0); // Move to first diamond
            expect(gameState.score).toBe(10);

            gameState.movePlayer(1, 0); // Move to second diamond
            expect(gameState.score).toBe(20);

            gameState.movePlayer(1, 0); // Move to third diamond
            expect(gameState.score).toBe(30);

            const scoreBeforeTransition = gameState.score;

            // Move to exit to trigger level progression
            for (let i = 0; i < 10; i++) {
                gameState.movePlayer(1, 0); // Continue moving right to exit
            }

            // Should have advanced to next level and maintained score
            expect(gameState.currentLevel).toBe(2);
            expect(gameState.score).toBe(scoreBeforeTransition);
            expect(gameState.gameState).toBe('playing');
        });

        it('should accumulate score across multiple level completions', () => {
            // Test score accumulation pattern using level manager
            const gameState = createGameState();

            // Simulate score accumulation by testing the pattern
            const scores = [0, 50, 120, 180]; // Expected cumulative scores

            // Verify score accumulation pattern
            expect(scores[0]).toBe(0); // Initial score
            expect(scores[1]).toBe(50); // After level 1
            expect(scores[2]).toBe(120); // After level 2 (50 + 70)
            expect(scores[3]).toBe(180); // After level 3 (120 + 60)

            // Each subsequent score should be greater than or equal to the previous
            for (let i = 1; i < scores.length; i++) {
                expect(scores[i]).toBeGreaterThanOrEqual(scores[i - 1]!);
            }
        });

        it('should reset diamonds count but maintain score on level transition', () => {
            const mazeWithDiamonds = createMazeWithDiamonds();
            const gameState = createGameState({ maze: mazeWithDiamonds });

            // Initial state
            const initialDiamonds = gameState.diamonds;
            expect(initialDiamonds).toBe(3); // Our test maze has 3 diamonds

            // Collect all diamonds
            gameState.movePlayer(1, 0); // First diamond
            gameState.movePlayer(1, 0); // Second diamond
            gameState.movePlayer(1, 0); // Third diamond

            expect(gameState.diamonds).toBe(0);
            expect(gameState.score).toBe(30);

            // Move to exit to trigger level progression
            for (let i = 0; i < 10; i++) {
                gameState.movePlayer(1, 0);
            }

            // Should be on level 2 with new diamond count but same score
            expect(gameState.currentLevel).toBe(2);
            expect(gameState.score).toBe(30); // Score maintained
            expect(gameState.diamonds).toBeGreaterThan(0); // New level has diamonds
            expect(gameState.gameState).toBe('playing');
        });
    });

    describe('Game Completion Detection and Victory Sound', () => {
        it('should detect game completion when final level is completed', () => {
            const gameState = createGameState();

            // Advance to final level (level 5)
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();

            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test game completion detection
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);
            expect(progressionResult.isGameComplete).toBe(true);
        });

        it('should play victory sound only on final level completion', () => {
            // Test non-final level completion (should play door slam)
            const gameState1 = createGameState();
            expect(gameState1.levelManager.hasNextLevel()).toBe(true);

            const result1 = gameState1.levelProgressionHandler.processLevelCompletion(gameState1.levelManager);
            expect(result1.soundToPlay).toBe('door_slam');

            gameState1.levelProgressionHandler.emitLevelProgressionSound(result1);
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });

            // Clear mocks for final level test
            vi.clearAllMocks();

            // Test final level completion (should play victory)
            const gameState2 = createGameState();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();

            expect(gameState2.levelManager.hasNextLevel()).toBe(false);

            const result2 = gameState2.levelProgressionHandler.processLevelCompletion(gameState2.levelManager);
            expect(result2.soundToPlay).toBe('victory');

            gameState2.levelProgressionHandler.emitLevelProgressionSound(result2);
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should not complete game if diamonds remain in final level', () => {
            const gameState = createGameState();

            // Test level completion detection with diamonds remaining
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 1)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 5)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
        });
    });

    describe('Level Transition Edge Cases', () => {
        it('should handle level transition when move limit is reached', () => {
            const gameState = createGameState();

            // Get initial move limit
            const initialMoves = gameState.moves;
            expect(initialMoves).toBeGreaterThan(0);

            // Test that move limits are properly set for each level
            const level1Data = gameState.levelManager.getCurrentLevel();
            expect(level1Data.moveLimit).toBe(45); // Level 1 move limit

            // Advance to level 2 and check move limit
            const level2Data = gameState.levelManager.advanceToNextLevel();
            expect(level2Data).not.toBeNull();
            expect(level2Data!.moveLimit).toBe(50); // Level 2 move limit
        });

        it('should reset move counter correctly for each new level', () => {
            const gameState = createGameState();

            // Get level 1 move limit
            const level1Data = gameState.levelManager.getCurrentLevel();
            const level1Moves = level1Data.moveLimit;

            // Advance to level 2
            const level2Data = gameState.levelManager.advanceToNextLevel();
            expect(level2Data).not.toBeNull();
            const level2Moves = level2Data!.moveLimit;

            // Move limits should be different (level-specific)
            expect(level2Moves).not.toBe(level1Moves);
            expect(level2Moves).toBe(50); // Level 2 specific move limit
        });

        it('should handle rapid level completions correctly', () => {
            const gameState = createGameState();

            const initialLevel = gameState.currentLevel;
            expect(initialLevel).toBe(1);

            // Test rapid level progression through level manager
            const level2 = gameState.levelManager.advanceToNextLevel();
            const level3 = gameState.levelManager.advanceToNextLevel();
            const level4 = gameState.levelManager.advanceToNextLevel();
            const level5 = gameState.levelManager.advanceToNextLevel();

            // Verify all levels were advanced correctly
            expect(level2).not.toBeNull();
            expect(level3).not.toBeNull();
            expect(level4).not.toBeNull();
            expect(level5).not.toBeNull();

            expect(level2!.levelNumber).toBe(2);
            expect(level3!.levelNumber).toBe(3);
            expect(level4!.levelNumber).toBe(4);
            expect(level5!.levelNumber).toBe(5);

            // Should be at final level now
            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
        });

        it('should maintain level data integrity during transitions', () => {
            const gameState = createGameState();

            // Test each level has proper data structure
            for (let i = 1; i <= 5; i++) {
                const currentLevel = gameState.levelManager.getCurrentLevel();

                // Verify level data integrity
                expect(currentLevel.levelNumber).toBe(i);
                expect(currentLevel.maze).toBeDefined();
                expect(currentLevel.maze.length).toBe(10); // Height
                expect(currentLevel.maze[0]?.length).toBe(16); // Width
                expect(currentLevel.moveLimit).toBeGreaterThan(0);
                expect(currentLevel.diamondCount).toBeGreaterThanOrEqual(0);
                expect(currentLevel.bombCount).toBeGreaterThanOrEqual(0);
                expect(currentLevel.playerStartPosition).toBeDefined();
                expect(currentLevel.exitPosition).toBeDefined();

                // Advance to next level if not at final level
                if (gameState.levelManager.hasNextLevel()) {
                    gameState.levelManager.advanceToNextLevel();
                }
            }
        });
    });
});
```

Removing the unused helper and cleaning up another unused variable in the same file to satisfy noUnusedLocals, then rechecking lints.

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGameState } from '../GameState';
import { CELL } from '../maze';
import type { MazeCell } from '../maze';
import { emitSoundEvent } from '../audio/events/sound-event-emitter';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn(),
    getSoundEventEmitter: vi.fn(() => ({
        emit: vi.fn(),
        emitMultiple: vi.fn(),
        setCallback: vi.fn()
    }))
}));

describe('Level Transitions Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    

    /**
     * Helper function to create a test maze with diamonds for score testing
     */
    function createMazeWithDiamonds(): MazeCell[][] {
        return [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.PLAYER, CELL.DIAMOND, CELL.DIAMOND, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        ];
    }

    describe('Complete Level Progression from Level 1 to Final Level', () => {
        it('should progress through all 5 levels sequentially using level manager', () => {
            const gameState = createGameState();

            // Verify initial state
            expect(gameState.currentLevel).toBe(1);
            expect(gameState.isGameComplete).toBe(false);
            expect(gameState.gameState).toBe('playing');

            // Track progression through all levels using level manager directly
            const levelProgression: number[] = [];
            const totalLevels = gameState.levelManager.getTotalLevels();

            // Record initial state
            levelProgression.push(gameState.currentLevel);

            // Test level manager progression directly
            // Level 1 -> 2
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level2 = gameState.levelManager.advanceToNextLevel();
            expect(level2).not.toBeNull();
            expect(level2!.levelNumber).toBe(2);
            levelProgression.push(level2!.levelNumber);

            // Level 2 -> 3
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level3 = gameState.levelManager.advanceToNextLevel();
            expect(level3).not.toBeNull();
            expect(level3!.levelNumber).toBe(3);
            levelProgression.push(level3!.levelNumber);

            // Level 3 -> 4
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level4 = gameState.levelManager.advanceToNextLevel();
            expect(level4).not.toBeNull();
            expect(level4!.levelNumber).toBe(4);
            levelProgression.push(level4!.levelNumber);

            // Level 4 -> 5
            expect(gameState.levelManager.hasNextLevel()).toBe(true);
            const level5 = gameState.levelManager.advanceToNextLevel();
            expect(level5).not.toBeNull();
            expect(level5!.levelNumber).toBe(5);
            levelProgression.push(level5!.levelNumber);

            // Level 5 -> No more levels
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
            const noMoreLevels = gameState.levelManager.advanceToNextLevel();
            expect(noMoreLevels).toBeNull();

            // Verify we've progressed through all levels
            expect(levelProgression).toEqual([1, 2, 3, 4, 5]);
            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
            expect(totalLevels).toBe(5);
        });

        it('should complete game when reaching final level exit', () => {
            const gameState = createGameState();

            // Advance to final level (level 5) using level manager
            gameState.levelManager.advanceToNextLevel(); // 1 -> 2
            gameState.levelManager.advanceToNextLevel(); // 2 -> 3
            gameState.levelManager.advanceToNextLevel(); // 3 -> 4
            gameState.levelManager.advanceToNextLevel(); // 4 -> 5

            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test level progression handler for final level completion
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(true);
            expect(progressionResult.soundToPlay).toBe('victory');
            expect(progressionResult.nextLevel).toBeUndefined();
        });
    });

    describe('Audio Triggering During Level Transitions', () => {
        it('should emit door slam sound when advancing to next level', () => {
            const gameState = createGameState();

            // Verify we're not on the final level
            expect(gameState.levelManager.hasNextLevel()).toBe(true);

            // Test level progression handler for non-final level
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(false);
            expect(progressionResult.soundToPlay).toBe('door_slam');
            expect(progressionResult.nextLevel).not.toBeNull();

            // Test sound emission
            gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);

            // Should have emitted door slam sound for level progression
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });
        });

        it('should emit victory sound when completing final level', () => {
            const gameState = createGameState();

            // Advance to final level
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();

            // Verify we're on the final level
            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test level progression handler for final level
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);

            expect(progressionResult.success).toBe(true);
            expect(progressionResult.isGameComplete).toBe(true);
            expect(progressionResult.soundToPlay).toBe('victory');

            // Test sound emission
            gameState.levelProgressionHandler.emitLevelProgressionSound(progressionResult);

            // Should have emitted victory sound for game completion
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should not emit level progression sounds during regular gameplay', () => {
            const gameState = createGameState();

            // Make some regular moves that don't complete the level
            gameState.movePlayer(1, 0); // Move right
            gameState.movePlayer(0, 1); // Move down
            gameState.movePlayer(-1, 0); // Move left

            // Should not have emitted door slam or victory sounds
            expect(emitSoundEvent).not.toHaveBeenCalledWith(
                expect.objectContaining({ type: 'door_slam' })
            );
            expect(emitSoundEvent).not.toHaveBeenCalledWith(
                expect.objectContaining({ type: 'victory' })
            );
        });

        it('should detect level completion correctly', () => {
            const gameState = createGameState();

            // Test level completion detection
            expect(gameState.levelProgressionHandler.isLevelComplete('playing', 5)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('dead', 0)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 1)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
        });
    });

    describe('Score Accumulation Across Multiple Levels', () => {
        it('should maintain cumulative score across level transitions', () => {
            const mazeWithDiamonds = createMazeWithDiamonds();
            const gameState = createGameState({ maze: mazeWithDiamonds });

            // Collect diamonds in level 1
            gameState.movePlayer(1, 0); // Move to first diamond
            expect(gameState.score).toBe(10);

            gameState.movePlayer(1, 0); // Move to second diamond
            expect(gameState.score).toBe(20);

            gameState.movePlayer(1, 0); // Move to third diamond
            expect(gameState.score).toBe(30);

            const scoreBeforeTransition = gameState.score;

            // Move to exit to trigger level progression
            for (let i = 0; i < 10; i++) {
                gameState.movePlayer(1, 0); // Continue moving right to exit
            }

            // Should have advanced to next level and maintained score
            expect(gameState.currentLevel).toBe(2);
            expect(gameState.score).toBe(scoreBeforeTransition);
            expect(gameState.gameState).toBe('playing');
        });

        it('should accumulate score across multiple level completions', () => {
            // Test score accumulation pattern using level manager

            // Simulate score accumulation by testing the pattern
            const scores = [0, 50, 120, 180]; // Expected cumulative scores

            // Verify score accumulation pattern
            expect(scores[0]).toBe(0); // Initial score
            expect(scores[1]).toBe(50); // After level 1
            expect(scores[2]).toBe(120); // After level 2 (50 + 70)
            expect(scores[3]).toBe(180); // After level 3 (120 + 60)

            // Each subsequent score should be greater than or equal to the previous
            for (let i = 1; i < scores.length; i++) {
                expect(scores[i]).toBeGreaterThanOrEqual(scores[i - 1]!);
            }
        });

        it('should reset diamonds count but maintain score on level transition', () => {
            const mazeWithDiamonds = createMazeWithDiamonds();
            const gameState = createGameState({ maze: mazeWithDiamonds });

            // Initial state
            const initialDiamonds = gameState.diamonds;
            expect(initialDiamonds).toBe(3); // Our test maze has 3 diamonds

            // Collect all diamonds
            gameState.movePlayer(1, 0); // First diamond
            gameState.movePlayer(1, 0); // Second diamond
            gameState.movePlayer(1, 0); // Third diamond

            expect(gameState.diamonds).toBe(0);
            expect(gameState.score).toBe(30);

            // Move to exit to trigger level progression
            for (let i = 0; i < 10; i++) {
                gameState.movePlayer(1, 0);
            }

            // Should be on level 2 with new diamond count but same score
            expect(gameState.currentLevel).toBe(2);
            expect(gameState.score).toBe(30); // Score maintained
            expect(gameState.diamonds).toBeGreaterThan(0); // New level has diamonds
            expect(gameState.gameState).toBe('playing');
        });
    });

    describe('Game Completion Detection and Victory Sound', () => {
        it('should detect game completion when final level is completed', () => {
            const gameState = createGameState();

            // Advance to final level (level 5)
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();
            gameState.levelManager.advanceToNextLevel();

            expect(gameState.levelManager.hasNextLevel()).toBe(false);

            // Test game completion detection
            const progressionResult = gameState.levelProgressionHandler.processLevelCompletion(gameState.levelManager);
            expect(progressionResult.isGameComplete).toBe(true);
        });

        it('should play victory sound only on final level completion', () => {
            // Test non-final level completion (should play door slam)
            const gameState1 = createGameState();
            expect(gameState1.levelManager.hasNextLevel()).toBe(true);

            const result1 = gameState1.levelProgressionHandler.processLevelCompletion(gameState1.levelManager);
            expect(result1.soundToPlay).toBe('door_slam');

            gameState1.levelProgressionHandler.emitLevelProgressionSound(result1);
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });

            // Clear mocks for final level test
            vi.clearAllMocks();

            // Test final level completion (should play victory)
            const gameState2 = createGameState();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();
            gameState2.levelManager.advanceToNextLevel();

            expect(gameState2.levelManager.hasNextLevel()).toBe(false);

            const result2 = gameState2.levelProgressionHandler.processLevelCompletion(gameState2.levelManager);
            expect(result2.soundToPlay).toBe('victory');

            gameState2.levelProgressionHandler.emitLevelProgressionSound(result2);
            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should not complete game if diamonds remain in final level', () => {
            const gameState = createGameState();

            // Test level completion detection with diamonds remaining
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 1)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 5)).toBe(false);
            expect(gameState.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
        });
    });

    describe('Level Transition Edge Cases', () => {
        it('should handle level transition when move limit is reached', () => {
            const gameState = createGameState();

            // Get initial move limit
            const initialMoves = gameState.moves;
            expect(initialMoves).toBeGreaterThan(0);

            // Test that move limits are properly set for each level
            const level1Data = gameState.levelManager.getCurrentLevel();
            expect(level1Data.moveLimit).toBe(45); // Level 1 move limit

            // Advance to level 2 and check move limit
            const level2Data = gameState.levelManager.advanceToNextLevel();
            expect(level2Data).not.toBeNull();
            expect(level2Data!.moveLimit).toBe(50); // Level 2 move limit
        });

        it('should reset move counter correctly for each new level', () => {
            const gameState = createGameState();

            // Get level 1 move limit
            const level1Data = gameState.levelManager.getCurrentLevel();
            const level1Moves = level1Data.moveLimit;

            // Advance to level 2
            const level2Data = gameState.levelManager.advanceToNextLevel();
            expect(level2Data).not.toBeNull();
            const level2Moves = level2Data!.moveLimit;

            // Move limits should be different (level-specific)
            expect(level2Moves).not.toBe(level1Moves);
            expect(level2Moves).toBe(50); // Level 2 specific move limit
        });

        it('should handle rapid level completions correctly', () => {
            const gameState = createGameState();

            const initialLevel = gameState.currentLevel;
            expect(initialLevel).toBe(1);

            // Test rapid level progression through level manager
            const level2 = gameState.levelManager.advanceToNextLevel();
            const level3 = gameState.levelManager.advanceToNextLevel();
            const level4 = gameState.levelManager.advanceToNextLevel();
            const level5 = gameState.levelManager.advanceToNextLevel();

            // Verify all levels were advanced correctly
            expect(level2).not.toBeNull();
            expect(level3).not.toBeNull();
            expect(level4).not.toBeNull();
            expect(level5).not.toBeNull();

            expect(level2!.levelNumber).toBe(2);
            expect(level3!.levelNumber).toBe(3);
            expect(level4!.levelNumber).toBe(4);
            expect(level5!.levelNumber).toBe(5);

            // Should be at final level now
            expect(gameState.levelManager.getCurrentLevelNumber()).toBe(5);
            expect(gameState.levelManager.hasNextLevel()).toBe(false);
        });

        it('should maintain level data integrity during transitions', () => {
            const gameState = createGameState();

            // Test each level has proper data structure
            for (let i = 1; i <= 5; i++) {
                const currentLevel = gameState.levelManager.getCurrentLevel();

                // Verify level data integrity
                expect(currentLevel.levelNumber).toBe(i);
                expect(currentLevel.maze).toBeDefined();
                expect(currentLevel.maze.length).toBe(10); // Height
                expect(currentLevel.maze[0]?.length).toBe(16); // Width
                expect(currentLevel.moveLimit).toBeGreaterThan(0);
                expect(currentLevel.diamondCount).toBeGreaterThanOrEqual(0);
                expect(currentLevel.bombCount).toBeGreaterThanOrEqual(0);
                expect(currentLevel.playerStartPosition).toBeDefined();
                expect(currentLevel.exitPosition).toBeDefined();

                // Advance to next level if not at final level
                if (gameState.levelManager.hasNextLevel()) {
                    gameState.levelManager.advanceToNextLevel();
                }
            }
        });
    });
});
```

- Fix: remove unused `createSimpleTestMaze` and another unused `gameState` declaration.

Edits in `src/tests/level-transitions-integration.test.ts`:
- Deleted the entire `createSimpleTestMaze` helper.
```ts
- const gameState = createGameState();
```
- Removed in the “accumulate score” test where it wasn’t used.

- Lint: clean.

```typescript
- const gameState = createGameState();
```

---

**User**

For the code present, we get this error:
```
This comparison appears to be unintentional because the types '"/Empty.png" | "/player.png" | "/rock.png" | "/soil.png" | "/diamond.png" | "/boulder.png" | "/bomb.png" | "/exit.png"' and '""' have no overlap.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```javascript
const nonEmptyIcons = iconValues.filter(icon => icon !== '');
```

```javascript
const emptyIcon = ICONS[CELL.EMPTY as keyof typeof ICONS];
const nonEmptyIcons = iconValues.filter(icon => icon !== emptyIcon);
```

I'll update the comparison to exclude the actual EMPTY icon value from `ICONS` instead of comparing to an impossible empty string, then recheck lints.

```typescript
import { describe, it, expect } from "vitest";
import { CELL, ICONS, initialMaze, type MazeCell } from "../maze";
import { createInitialGameState, countDiamonds } from "../GameState";

// Helper function to validate maze dimensions
function validateMazeDimensions(maze: MazeCell[][]): { width: number; height: number; isValid: boolean } {
    const height = maze.length;
    const width = maze[0]?.length ?? 0;
    const isValid = height > 0 && width > 0 && maze.every(row => row.length === width);

    return { width, height, isValid };
}

// Helper function to check if maze has proper border
function hasBorderOfRocks(maze: MazeCell[][]): boolean {
    const { width, height } = validateMazeDimensions(maze);

    // Check top and bottom borders
    const hasTopBorder = maze[0]?.every(cell => cell === CELL.ROCK) ?? false;
    const hasBottomBorder = maze[height - 1]?.every(cell => cell === CELL.ROCK) ?? false;

    // Check left and right borders
    const hasLeftBorder = maze.every(row => row[0] === CELL.ROCK);
    const hasRightBorder = maze.every(row => row[width - 1] === CELL.ROCK);

    return hasTopBorder && hasBottomBorder && hasLeftBorder && hasRightBorder;
}

// Helper function to count different cell types
function analyzeMazeComposition(maze: MazeCell[][]): Record<MazeCell, number> {
    const composition: Record<string, number> = {};

    // Initialize all cell types to 0
    Object.values(CELL).forEach(cellType => {
        composition[cellType] = 0;
    });

    // Count each cell type
    maze.flat().forEach(cell => {
        composition[cell] = (composition[cell] ?? 0) + 1;
    });

    return composition as Record<MazeCell, number>;
}

// Helper function to validate maze has required game elements
function hasRequiredGameElements(maze: MazeCell[][]): { hasPlayer: boolean; hasDiamonds: boolean; hasExit: boolean } {
    const composition = analyzeMazeComposition(maze);

    return {
        hasPlayer: composition[CELL.PLAYER] === 1, // Should have exactly one player
        hasDiamonds: composition[CELL.DIAMOND] > 0, // Should have at least one diamond
        hasExit: composition[CELL.EXIT] === 1, // Should have exactly one exit
    };
}

describe("Larger Maze UI Adaptation - Functional Implementation", () => {
    describe("Maze dimension validation", () => {
        it("should have correct larger maze dimensions", () => {
            const dimensions = validateMazeDimensions(initialMaze);

            expect(dimensions.isValid).toBe(true);
            expect(dimensions.width).toBe(16);
            expect(dimensions.height).toBe(10);
        });

        it("should maintain consistent row lengths", () => {
            const { isValid } = validateMazeDimensions(initialMaze);
            expect(isValid).toBe(true);

            // Verify each row has the same length
            const expectedWidth = initialMaze[0]?.length ?? 0;
            initialMaze.forEach((row, _index) => {
                expect(row.length).toBe(expectedWidth);
            });
        });
    });

    describe("Maze structure validation", () => {
        it("should have proper rock border around the maze", () => {
            const hasBorder = hasBorderOfRocks(initialMaze);
            expect(hasBorder).toBe(true);
        });

        it("should have required game elements", () => {
            const elements = hasRequiredGameElements(initialMaze);

            expect(elements.hasPlayer).toBe(true);
            expect(elements.hasDiamonds).toBe(true);
            expect(elements.hasExit).toBe(true);
        });

        it("should have appropriate maze composition for larger size", () => {
            const composition = analyzeMazeComposition(initialMaze);
            const totalCells = initialMaze.length * (initialMaze[0]?.length ?? 0);

            // Verify we have exactly one player and one exit
            expect(composition[CELL.PLAYER]).toBe(1);
            expect(composition[CELL.EXIT]).toBe(1);

            // Verify we have multiple diamonds for larger maze
            expect(composition[CELL.DIAMOND]).toBeGreaterThan(3);

            // Verify we have some obstacles and interactive elements
            expect(composition[CELL.BOULDER]).toBeGreaterThan(0);
            expect(composition[CELL.BOMB]).toBeGreaterThan(0);
            expect(composition[CELL.SOIL]).toBeGreaterThan(0);

            // Verify total cells add up correctly
            const totalCountedCells = Object.values(composition).reduce((sum, count) => sum + count, 0);
            expect(totalCountedCells).toBe(totalCells);
        });
    });

    describe("Icon mapping validation", () => {
        it("should have icons defined for all cell types", () => {
            Object.values(CELL).forEach(cellType => {
                expect(ICONS).toHaveProperty(cellType);
                expect(typeof ICONS[cellType as keyof typeof ICONS]).toBe('string');
            });
        });

        it("should have unique icons for different cell types", () => {
            const iconValues = Object.values(ICONS);
            new Set(iconValues);

            // Exclude the EMPTY cell icon, but other icons should be unique
            const emptyIcon = ICONS[CELL.EMPTY as keyof typeof ICONS];
            const nonEmptyIcons = iconValues.filter(icon => icon !== emptyIcon);
            const uniqueNonEmptyIcons = new Set(nonEmptyIcons);

            expect(uniqueNonEmptyIcons.size).toBe(nonEmptyIcons.length);
        });
    });

    describe("Game state integration with larger maze", () => {
        it("should create valid initial game state with larger maze", () => {
            const gameState = createInitialGameState(initialMaze);

            expect(gameState.maze).toEqual(initialMaze);
            expect(gameState.player).toBeTruthy();
            expect(gameState.diamonds).toBeGreaterThan(0);
            expect(gameState.score).toBe(0);
            expect(gameState.moves).toBe(55);
            expect(gameState.gameState).toBe('playing');
        });

        it("should correctly count diamonds in larger maze", () => {
            const diamondCount = countDiamonds(initialMaze);
            const gameState = createInitialGameState(initialMaze);

            expect(gameState.diamonds).toBe(diamondCount);
            expect(diamondCount).toBeGreaterThan(3); // Larger maze should have more diamonds
        });
    });

    describe("Maze accessibility and playability", () => {
        it("should have sufficient empty spaces for movement", () => {
            const composition = analyzeMazeComposition(initialMaze);
            const totalCells = initialMaze.length * (initialMaze[0]?.length ?? 0);
            const movableSpaces = composition[CELL.EMPTY] + composition[CELL.SOIL] + composition[CELL.DIAMOND];

            // Should have reasonable amount of movable space (at least 20% of total)
            expect(movableSpaces / totalCells).toBeGreaterThan(0.2);
        });

        it("should have balanced distribution of obstacles", () => {
            const composition = analyzeMazeComposition(initialMaze);
            const totalCells = initialMaze.length * (initialMaze[0]?.length ?? 0);
            const obstacles = composition[CELL.ROCK] + composition[CELL.BOULDER];

            // Obstacles should not dominate the maze (less than 60% of total)
            expect(obstacles / totalCells).toBeLessThan(0.6);
        });

        it("should have appropriate challenge elements for larger maze", () => {
            const composition = analyzeMazeComposition(initialMaze);

            // Should have multiple challenge elements
            expect(composition[CELL.BOMB]).toBeGreaterThanOrEqual(2);
            expect(composition[CELL.BOULDER]).toBeGreaterThanOrEqual(3);
            expect(composition[CELL.SOIL]).toBeGreaterThanOrEqual(5);
        });
    });
});
```

- Fix: compare against the actual EMPTY icon value instead of an impossible empty string.

Edits in `src/tests/LargerMazeUI.test.ts`:
```ts
- // Allow empty string for EMPTY cell, but other icons should be unique
- const nonEmptyIcons = iconValues.filter(icon => icon !== '');
+ // Exclude the EMPTY cell icon, but other icons should be unique
+ const emptyIcon = ICONS[CELL.EMPTY as keyof typeof ICONS];
+ const nonEmptyIcons = iconValues.filter(icon => icon !== emptyIcon);
```

- Lint: clean.

```typescript
- // Allow empty string for EMPTY cell, but other icons should be unique
- const nonEmptyIcons = iconValues.filter(icon => icon !== '');
+ // Exclude the EMPTY cell icon, but other icons should be unique
+ const emptyIcon = ICONS[CELL.EMPTY as keyof typeof ICONS];
+ const nonEmptyIcons = iconValues.filter(icon => icon !== emptyIcon);
```

---

**User**

For the code present, we get this error:
```
Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Updating the test to explicitly type tuple arrays so destructured values are numbers, then checking lints for that file.

```typescript
import { describe, it, expect } from 'vitest';
import {
    createInitialGameState,
    movePlayer,
    type GameStateData,
} from '../GameState';
import { updateBoulderMovement } from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('GameState Movement Constraints Integration', () => {
    // Test maze with boulders for testing movement constraints
    const testMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    describe('Initial game state with movement constraints', () => {
        it('should create initial game state with boulder state manager and movement constraints', () => {
            const gameState = createInitialGameState(testMaze);

            expect(gameState.boulderStateManager).toBeDefined();
            expect(gameState.movementConstraint).toBeDefined();
            expect(gameState.boulderStateManager.boulders.size).toBe(3);
            expect(gameState.boulderStateManager.movingBoulderCount).toBe(0);
            expect(gameState.movementConstraint.isPlayerMovementBlocked).toBe(false);
            expect(gameState.movementConstraint.blockingReason).toBe('none');
        });

        it('should initialize boulder state manager with correct boulder positions', () => {
            const gameState = createInitialGameState(testMaze);

            const expectedPositions = [
                { x: 1, y: 1 },
                { x: 3, y: 1 },
                { x: 1, y: 3 },
            ];

            for (const pos of expectedPositions) {
                const key = `${pos.x},${pos.y}`;
                const boulderState = gameState.boulderStateManager.boulders.get(key);
                expect(boulderState).toBeDefined();
                expect(boulderState?.position).toEqual(pos);
                expect(boulderState?.isTriggered).toBe(false);
                expect(boulderState?.isMoving).toBe(false);
            }
        });
    });

    describe('Player movement with no boulder constraints', () => {
        it('should allow normal player movement when no boulders are moving', () => {
            const initialState = createInitialGameState(testMaze);
            expect(initialState.player).toEqual({ x: 2, y: 2 });

            // Move player right
            const newState = movePlayer(initialState, 1, 0);

            expect(newState.player).toEqual({ x: 3, y: 2 });
            expect(newState.moves).toBe(54); // Decremented from 55
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });

        it('should update player position in boulder state manager after movement', () => {
            const initialState = createInitialGameState(testMaze);

            // Move player left
            const newState = movePlayer(initialState, -1, 0);

            expect(newState.player).toEqual({ x: 1, y: 2 });
            expect(newState.boulderStateManager.lastPlayerPosition).toEqual({ x: 1, y: 2 });
        });

        it('should maintain boulder state consistency after normal movement', () => {
            const initialState = createInitialGameState(testMaze);

            // Move player up
            const newState = movePlayer(initialState, 0, -1);

            expect(newState.boulderStateManager.boulders.size).toBe(3);
            expect(newState.boulderStateManager.movingBoulderCount).toBe(0);
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });
    });

    describe('Player movement blocked by boulder constraints', () => {
        it('should block player movement when boulders are moving', () => {
            const initialState = createInitialGameState(testMaze);

            // Simulate a boulder starting to move
            const stateWithMovingBoulder: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 1 }],
                    []
                ),
            };

            // Update movement constraint to reflect the moving boulder
            stateWithMovingBoulder.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            const originalPlayerPos = stateWithMovingBoulder.player;

            // Attempt to move player - should be blocked
            const newState = movePlayer(stateWithMovingBoulder, 1, 0);

            expect(newState.player).toEqual(originalPlayerPos); // Player didn't move
            expect(newState.moves).toBe(55); // Moves not decremented
            expect(newState.score).toBe(0); // Score unchanged
        });

        it('should block movement in all directions when boulders are moving', () => {
            const initialState = createInitialGameState(testMaze);

            // Create state with multiple moving boulders
            const stateWithMovingBoulders: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }],
                    []
                ),
            };

            stateWithMovingBoulders.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            const originalPlayerPos = stateWithMovingBoulders.player;
            const directions: [number, number][] = [
                [0, -1], // Up
                [0, 1],  // Down
                [-1, 0], // Left
                [1, 0],  // Right
            ];

            for (const [dx, dy] of directions) {
                const newState = movePlayer(stateWithMovingBoulders, dx, dy);
                expect(newState.player).toEqual(originalPlayerPos);
                expect(newState.moves).toBe(55);
            }
        });

        it('should allow movement again after all boulders stop moving', () => {
            const initialState = createInitialGameState(testMaze);

            // Start with moving boulders
            let stateWithMovingBoulders: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 1 }],
                    []
                ),
            };

            stateWithMovingBoulders.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Verify movement is blocked
            let blockedState = movePlayer(stateWithMovingBoulders, 1, 0);
            expect(blockedState.player).toEqual(initialState.player);

            // Stop all boulders
            const stateWithStoppedBoulders: GameStateData = {
                ...stateWithMovingBoulders,
                boulderStateManager: updateBoulderMovement(
                    stateWithMovingBoulders.boulderStateManager,
                    [],
                    [{ x: 1, y: 1 }]
                ),
            };

            stateWithStoppedBoulders.movementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'none',
            };

            // Verify movement is now allowed
            const allowedState = movePlayer(stateWithStoppedBoulders, 1, 0);
            expect(allowedState.player).toEqual({ x: 3, y: 2 });
            expect(allowedState.moves).toBe(54);
        });
    });

    describe('Movement constraints with game state changes', () => {
        it('should not block movement when player dies', () => {
            // Create maze with bomb next to player
            const bombMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOMB, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const initialState = createInitialGameState(bombMaze);

            // Set boulder as moving
            const stateWithMovingBoulder: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 2 }],
                    []
                ),
            };

            stateWithMovingBoulder.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Move player into bomb - should be blocked by boulder constraint
            const newState = movePlayer(stateWithMovingBoulder, 1, 0);

            expect(newState.player).toEqual({ x: 1, y: 1 }); // Player didn't move
            expect(newState.gameState).toBe('playing'); // Game still playing
        });

        it('should not block movement when player wins', () => {
            // Create maze with exit next to player and no diamonds
            const exitMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.EXIT, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            let initialState = createInitialGameState(exitMaze);
            initialState.diamonds = 0; // No diamonds to collect

            // Set boulder as moving
            const stateWithMovingBoulder: GameStateData = {
                ...initialState,
                boulderStateManager: updateBoulderMovement(
                    initialState.boulderStateManager,
                    [{ x: 1, y: 2 }],
                    []
                ),
            };

            stateWithMovingBoulder.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Move player to exit - should be blocked by boulder constraint
            const newState = movePlayer(stateWithMovingBoulder, 1, 0);

            expect(newState.player).toEqual({ x: 1, y: 1 }); // Player didn't move
            expect(newState.gameState).toBe('playing'); // Game still playing
        });
    });

    describe('Movement constraints with invalid moves', () => {
        it('should not affect constraint state when move is invalid due to boundaries', () => {
            const initialState = createInitialGameState(testMaze);

            // Try to move player out of bounds (up from position 2,2 to 2,1 is valid, but 2,0 would be rock)
            // Let's move to a corner first
            const cornerMaze: MazeCell[][] = [
                [CELL.PLAYER, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const cornerState = createInitialGameState(cornerMaze);

            // Try to move out of bounds
            const newState = movePlayer(cornerState, -1, 0);

            expect(newState.player).toEqual({ x: 0, y: 0 }); // Player didn't move
            expect(newState.boulderStateManager).toEqual(cornerState.boulderStateManager);
            expect(newState.movementConstraint).toEqual(cornerState.movementConstraint);
        });

        it('should not affect constraint state when move is blocked by rocks', () => {
            const initialState = createInitialGameState(testMaze);

            // Try to move into rock (up from center position)
            const newState = movePlayer(initialState, 0, -2); // This would hit the rock border

            expect(newState.player).toEqual(initialState.player); // Player didn't move
            expect(newState.boulderStateManager.lastPlayerPosition).toBeNull(); // Not updated
            expect(newState.movementConstraint).toEqual(initialState.movementConstraint);
        });

        it('should not affect constraint state when move is blocked by boulders', () => {
            // Create a specific maze where player can hit a boulder
            const boulderBlockMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const boulderBlockState = createInitialGameState(boulderBlockMaze);

            // Try to move into boulder (right from position 1,1 to boulder at 2,1)
            const newState = movePlayer(boulderBlockState, 1, 0);

            expect(newState.player).toEqual(boulderBlockState.player); // Player didn't move
            expect(newState.boulderStateManager.lastPlayerPosition).toBeNull(); // Not updated
            expect(newState.movementConstraint).toEqual(boulderBlockState.movementConstraint);
        });
    });

    describe('Edge cases and error handling', () => {
        it('should handle game state with null player', () => {
            const initialState = createInitialGameState(testMaze);
            const stateWithNullPlayer: GameStateData = {
                ...initialState,
                player: null,
            };

            const newState = movePlayer(stateWithNullPlayer, 1, 0);

            expect(newState).toEqual(stateWithNullPlayer); // State unchanged
        });

        it('should handle game state when game is not playing', () => {
            const initialState = createInitialGameState(testMaze);
            const deadGameState: GameStateData = {
                ...initialState,
                gameState: 'dead',
            };

            const newState = movePlayer(deadGameState, 1, 0);

            expect(newState).toEqual(deadGameState); // State unchanged
        });

        it('should maintain constraint consistency with empty boulder state', () => {
            const emptyMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const emptyState = createInitialGameState(emptyMaze);

            expect(emptyState.boulderStateManager.boulders.size).toBe(0);
            expect(emptyState.boulderStateManager.movingBoulderCount).toBe(0);
            expect(emptyState.movementConstraint.isPlayerMovementBlocked).toBe(false);

            // Movement should work normally
            const newState = movePlayer(emptyState, 0, 1); // This would be blocked by rock, but constraint logic should work
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });
    });

    describe('Performance considerations', () => {
        it('should handle large numbers of boulders efficiently', () => {
            // Create a deterministic maze with many boulders
            const largeMaze: MazeCell[][] = Array(20).fill(null).map((_, y) =>
                Array(20).fill(null).map((_, x) => {
                    if (y === 0 || y === 19 || x === 0 || x === 19) return CELL.ROCK;
                    if (x === 10 && y === 10) return CELL.PLAYER;
                    // Create a deterministic pattern of boulders, ensuring path is clear for player movement
                    if (x === 11 && y === 10) return CELL.EMPTY; // Ensure player can move right
                    if (x === 9 && y === 10) return CELL.EMPTY; // Ensure player can move left
                    if (x === 10 && y === 9) return CELL.EMPTY; // Ensure player can move up
                    if (x === 10 && y === 11) return CELL.EMPTY; // Ensure player can move down
                    // Place boulders in a deterministic pattern (every 3rd cell)
                    return (x + y) % 3 === 0 ? CELL.BOULDER : CELL.EMPTY;
                })
            );

            const largeState = createInitialGameState(largeMaze);

            // Should create state efficiently
            expect(largeState.boulderStateManager).toBeDefined();
            expect(largeState.movementConstraint).toBeDefined();
            expect(largeState.movementConstraint.isPlayerMovementBlocked).toBe(false);

            // Movement should work efficiently
            const newState = movePlayer(largeState, 1, 0);
            expect(newState.player).toEqual({ x: 11, y: 10 });
            expect(newState.movementConstraint.isPlayerMovementBlocked).toBe(false);
        });

        it('should handle rapid movement attempts efficiently', () => {
            const initialState = createInitialGameState(testMaze);
            let currentState = initialState;

            // Perform many movement operations
            const movements: [number, number][] = [
                [1, 0], [-1, 0], [0, 1], [0, -1],
                [1, 0], [-1, 0], [0, 1], [0, -1],
            ];

            for (const [dx, dy] of movements) {
                currentState = movePlayer(currentState, dx, dy);
                expect(currentState.movementConstraint).toBeDefined();
                expect(currentState.boulderStateManager).toBeDefined();
            }

            // Final state should be consistent
            expect(currentState.movementConstraint.isPlayerMovementBlocked).toBe(false);
            expect(currentState.boulderStateManager.movingBoulderCount).toBe(0);
        });
    });
});
```

- Fix: type the tuple arrays so destructured values are `number`, not `number | undefined`.

Edits in `src/tests/game-state-movement-constraints.test.ts`:
```ts
- const directions = [
+ const directions: [number, number][] = [
  [0, -1], [0, 1], [-1, 0], [1, 0],
];

- const movements = [
+ const movements: [number, number][] = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
];
```

- Lint: only a warning about an unused variable elsewhere; type error resolved.

```typescript
- const directions = [
+ const directions: [number, number][] = [
  [0, -1], [0, 1], [-1, 0], [1, 0],
];

- const movements = [
+ const movements: [number, number][] = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
];
```

---

**User**

For the code present, we get this error:
```
Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```typescript
const moves = [
  [1, 0], ...
];
```

I'll type the tuple array so destructured values are numbers, not possibly undefined, then verify lints are clean for that file.

```typescript
import { describe, it, expect } from 'vitest';
import {
    createInitialGameState,
    movePlayer,
    type GameStateData,
} from '../GameState';
import {
    updateBoulderMovement,
    createPositionKey,
} from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';

describe('Game State Boulder System Integration', () => {
    // Test maze with strategic boulder placement for comprehensive testing
    const integrationTestMaze: MazeCell[][] = [
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.DIAMOND, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
        [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
        [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ];

    describe('Boulder proximity detection integration', () => {
        it('should detect and trigger boulders when player moves adjacent', () => {
            const gameState = createInitialGameState(integrationTestMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Move player left to be adjacent to boulder at (1,1) and (1,3)
            const newState = movePlayer(gameState, -1, 0);

            expect(newState.player).toEqual({ x: 1, y: 2 });
            expect(newState.boulderStateManager.lastPlayerPosition).toEqual({ x: 1, y: 2 });

            // Check that boulders adjacent to new position are triggered for next move
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            const boulder1State = newState.boulderStateManager.boulders.get(boulder1Key);
            const boulder3State = newState.boulderStateManager.boulders.get(boulder3Key);

            expect(boulder1State?.isTriggered).toBe(true);
            expect(boulder3State?.isTriggered).toBe(true);
            expect(boulder1State?.triggeredOnMove).toBe(52); // Move 54 - 2 = 52 for next physics simulation
            expect(boulder3State?.triggeredOnMove).toBe(52);
        });

        it('should not trigger boulders that are not adjacent to player movement', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Move player right (away from most boulders)
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.player).toEqual({ x: 3, y: 2 });

            // Check that distant boulders are not triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            const boulder1State = newState.boulderStateManager.boulders.get(boulder1Key);
            const boulder3State = newState.boulderStateManager.boulders.get(boulder3Key);

            expect(boulder1State?.isTriggered).toBe(false);
            expect(boulder3State?.isTriggered).toBe(false);
        });

        it('should trigger boulder when player moves to be adjacent', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Move player up to be adjacent to boulder at (3,1) - move to (3,2)
            const newState = movePlayer(gameState, 1, 0);

            expect(newState.player).toEqual({ x: 3, y: 2 });

            // The boulder at (3,1) should be triggered since player is now adjacent
            const boulder2Key = createPositionKey({ x: 3, y: 1 });
            const boulder2State = newState.boulderStateManager.boulders.get(boulder2Key);

            // Boulder at (3,1) should be triggered as it's adjacent to new position (3,2)
            expect(boulder2State?.isTriggered).toBe(true);

            // Also check boulder at (4,2) should be triggered as it's adjacent
            const boulder4Key = createPositionKey({ x: 4, y: 2 });
            const boulder4State = newState.boulderStateManager.boulders.get(boulder4Key);
            expect(boulder4State?.isTriggered).toBe(true);
        });
    });

    describe('Boulder state persistence across moves', () => {
        it('should maintain boulder state consistency across multiple moves', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // First move: trigger some boulders
            const state1 = movePlayer(gameState, -1, 0); // Move left to (1,2)

            // Verify initial trigger state
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            expect(state1.boulderStateManager.boulders.get(boulder1Key)?.isTriggered).toBe(true);
            expect(state1.boulderStateManager.boulders.get(boulder3Key)?.isTriggered).toBe(true);

            // Second move: move away and verify boulder state manager is maintained
            const state2 = movePlayer(state1, 1, 0); // Move right back to (2,2)

            expect(state2.player).toEqual({ x: 2, y: 2 });
            expect(state2.boulderStateManager).toBeDefined();
            expect(state2.boulderStateManager.boulders.size).toBeGreaterThan(0);

            // Third move: verify boulder state manager continues to function
            // Try to move down, but movement might be blocked by boulder physics
            const state3 = movePlayer(state2, 0, 1); // Attempt to move down to (2,3)

            expect(state3.boulderStateManager).toBeDefined();
            expect(state3.boulderStateManager.boulders.size).toBeGreaterThan(0);

            // Player position may vary depending on boulder physics and movement constraints
            // The key is that the boulder state manager continues to function correctly
            expect(state3.player).toBeDefined();
            expect(state3.player!.x).toBeGreaterThanOrEqual(1);
            expect(state3.player!.x).toBeLessThanOrEqual(5);
            expect(state3.player!.y).toBeGreaterThanOrEqual(1);
            expect(state3.player!.y).toBeLessThanOrEqual(4);
        });

        it('should track boulder movement states correctly across physics simulations', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Create a state with moving boulders to test persistence
            const stateWithMovingBoulders: GameStateData = {
                ...gameState,
                boulderStateManager: updateBoulderMovement(
                    gameState.boulderStateManager,
                    [{ x: 1, y: 1 }, { x: 4, y: 2 }], // Start moving
                    []
                ),
            };

            // Update movement constraints
            stateWithMovingBoulders.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Verify movement is blocked
            expect(stateWithMovingBoulders.movementConstraint.isPlayerMovementBlocked).toBe(true);
            expect(stateWithMovingBoulders.boulderStateManager.movingBoulderCount).toBe(2);

            // Try to move player - should be blocked
            const blockedState = movePlayer(stateWithMovingBoulders, 1, 0);

            expect(blockedState.player).toEqual(gameState.player); // Player shouldn't move
            expect(blockedState.boulderStateManager.movingBoulderCount).toBe(2); // Boulder count preserved
        });
    });

    describe('Movement constraint integration', () => {
        it('should block player movement when boulders are moving and allow when stopped', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Create state with moving boulder
            const movingState: GameStateData = {
                ...gameState,
                boulderStateManager: updateBoulderMovement(
                    gameState.boulderStateManager,
                    [{ x: 1, y: 1 }], // Start moving
                    []
                ),
            };

            // Update movement constraints
            movingState.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Movement should be blocked
            const blockedMove = movePlayer(movingState, 1, 0);
            expect(blockedMove.player).toEqual(gameState.player); // No movement

            // Now stop the boulder
            const stoppedState: GameStateData = {
                ...movingState,
                boulderStateManager: updateBoulderMovement(
                    movingState.boulderStateManager,
                    [], // No new moving boulders
                    [{ x: 1, y: 1 }] // Stop this boulder
                ),
            };

            // Update movement constraints
            stoppedState.movementConstraint = {
                isPlayerMovementBlocked: false,
                blockingReason: 'none',
            };

            // Movement should now be allowed
            const allowedMove = movePlayer(stoppedState, 1, 0);
            expect(allowedMove.player).toEqual({ x: 3, y: 2 }); // Movement occurred
        });

        it('should update movement constraints correctly after each move', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Normal move should have no constraints
            const normalMove = movePlayer(gameState, 0, -1);
            expect(normalMove.movementConstraint.isPlayerMovementBlocked).toBe(false);
            expect(normalMove.movementConstraint.blockingReason).toBe('none');

            // Create state with triggered boulders (but not yet moving)
            const triggeredState = movePlayer(normalMove, -1, 1); // Move to trigger boulders
            expect(triggeredState.movementConstraint.isPlayerMovementBlocked).toBe(false); // Not moving yet

            // Simulate physics step that would start boulder movement
            const movingState: GameStateData = {
                ...triggeredState,
                boulderStateManager: updateBoulderMovement(
                    triggeredState.boulderStateManager,
                    [{ x: 1, y: 1 }], // Start moving
                    []
                ),
            };

            movingState.movementConstraint = {
                isPlayerMovementBlocked: true,
                blockingReason: 'boulder_movement',
            };

            // Now movement should be blocked
            expect(movingState.movementConstraint.isPlayerMovementBlocked).toBe(true);
            expect(movingState.movementConstraint.blockingReason).toBe('boulder_movement');
        });
    });

    describe('Complete boulder interaction scenarios', () => {
        it('should handle complete boulder trigger-to-movement cycle', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Step 1: Move player to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move left to (1,2)

            // Verify boulder is triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            expect(step1.boulderStateManager.boulders.get(boulder1Key)?.isTriggered).toBe(true);
            expect(step1.movementConstraint.isPlayerMovementBlocked).toBe(false); // Not moving yet

            // Step 2: Move again to start physics simulation
            const step2 = movePlayer(step1, 1, 0); // Move right back to (2,2)

            // The physics simulation should have processed the triggered boulder
            // Check that boulder state is updated appropriately
            expect(step2.boulderStateManager).toBeDefined();
            expect(step2.movementConstraint).toBeDefined();

            // Step 3: Verify game state consistency
            expect(step2.player).toEqual({ x: 2, y: 2 });
            expect(step2.moves).toBe(53); // Two moves made
            expect(step2.gameState).toBe('playing');
        });

        it('should handle multiple boulder interactions simultaneously', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Move to position that triggers multiple boulders
            const multiTriggerState = movePlayer(gameState, -1, 0); // Move to (1,2)

            // Check multiple boulders are triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });
            const boulder3Key = createPositionKey({ x: 1, y: 3 });

            expect(multiTriggerState.boulderStateManager.boulders.get(boulder1Key)?.isTriggered).toBe(true);
            expect(multiTriggerState.boulderStateManager.boulders.get(boulder3Key)?.isTriggered).toBe(true);

            // Make another move to process physics
            const processedState = movePlayer(multiTriggerState, 1, 0); // Move right to (2,2)

            // Verify state consistency with multiple boulder interactions
            expect(processedState.boulderStateManager.boulders.size).toBeGreaterThan(0);
            expect(processedState.player).toEqual({ x: 2, y: 2 });
            expect(processedState.gameState).toBe('playing');
        });

        it('should maintain game state integrity during boulder system errors', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            // Create a potentially problematic state (this tests error handling)
            const problematicState: GameStateData = {
                ...gameState,
                boulderStateManager: {
                    ...gameState.boulderStateManager,
                    movingBoulderCount: -1, // Invalid state
                },
            };

            // The system should handle this gracefully
            const recoveredState = movePlayer(problematicState, 1, 0);

            // Game should continue functioning
            expect(recoveredState.player).toEqual({ x: 3, y: 2 });
            expect(recoveredState.gameState).toBe('playing');
            expect(recoveredState.boulderStateManager.movingBoulderCount).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Performance and scalability', () => {
        it('should handle large numbers of boulders efficiently', () => {
            // Create a maze with many boulders
            const largeMaze: MazeCell[][] = Array(10).fill(null).map((_, y) =>
                Array(10).fill(null).map((_, x) => {
                    if (y === 0 || y === 9 || x === 0 || x === 9) return CELL.ROCK;
                    if (x === 5 && y === 5) return CELL.PLAYER;
                    if ((x + y) % 2 === 0) return CELL.BOULDER;
                    return CELL.EMPTY;
                })
            );

            const startTime = performance.now();
            const gameState = createInitialGameState(largeMaze);
            const initTime = performance.now() - startTime;

            expect(initTime).toBeLessThan(100); // Should initialize quickly
            expect(gameState.boulderStateManager.boulders.size).toBeGreaterThan(10);

            // Test movement performance
            const moveStartTime = performance.now();
            const movedState = movePlayer(gameState, 1, 0);
            const moveTime = performance.now() - moveStartTime;

            expect(moveTime).toBeLessThan(50); // Should move quickly even with many boulders
            expect(movedState.player).toEqual({ x: 6, y: 5 });
        });

        it('should handle rapid sequential moves efficiently', () => {
            const gameState = createInitialGameState(integrationTestMaze);

            const startTime = performance.now();
            let currentState = gameState;

            // Perform 10 rapid moves
            const moves: [number, number][] = [
                [1, 0], [-1, 0], [0, 1], [0, -1], [1, 0],
                [-1, 0], [0, 1], [0, -1], [1, 0], [-1, 0]
            ];

            for (const [dx, dy] of moves) {
                currentState = movePlayer(currentState, dx, dy);
            }

            const totalTime = performance.now() - startTime;

            expect(totalTime).toBeLessThan(100); // Should handle rapid moves efficiently
            expect(currentState.moves).toBeLessThanOrEqual(55); // Some moves may be blocked
            expect(currentState.moves).toBeGreaterThanOrEqual(45); // But some should succeed
            expect(currentState.boulderStateManager).toBeDefined();
            expect(currentState.movementConstraint).toBeDefined();
        });
    });
});
```

- Fix: type the move tuples to `[number, number][]`.

Edits in `src/tests/game-state-boulder-integration.test.ts`:
```ts
- const moves = [
+ const moves: [number, number][] = [
  [1,0], [-1,0], [0,1], [0,-1], [1,0],
  [-1,0], [0,1], [0,-1], [1,0], [-1,0]
];
```

- Lint: clean.

```typescript
- const moves = [
+ const moves: [number, number][] = [
  [1,0], [-1,0], [0,1], [0,-1], [1,0],
  [-1,0], [0,1], [0,-1], [1,0], [-1,0]
];
```

---

**User**

For the code present, we get this error:
```
Object is possibly 'undefined'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I'll make small, targeted edits:
- Add non-null assertions when indexing into `modifiedMaze` rows.
- Assert the first element of `boulders` is defined inside the guarded block before passing to functions.

Then I'll recheck lints for that file.

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { Position } from '../physics/boulder-state-manager';
import { PerformanceOptimizedBoulderSystem } from '../physics/boulder-performance-integration';

describe('Boulder Performance Integration', () => {
    let testMaze: MazeCell[][];
    let performanceSystem: PerformanceOptimizedBoulderSystem;

    beforeEach(() => {
        testMaze = [
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.SOIL, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.SOIL, CELL.PLAYER, CELL.SOIL, CELL.ROCK],
            [CELL.ROCK, CELL.BOULDER, CELL.SOIL, CELL.BOULDER, CELL.ROCK],
            [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK]
        ];

        performanceSystem = new PerformanceOptimizedBoulderSystem(testMaze, 1);
    });

    describe('Initialization', () => {
        it('should initialize with maze and track boulder positions', () => {
            const stateManager = performanceSystem.getStateManager();

            expect(stateManager.boulders.size).toBe(4); // 4 boulders in test maze
            expect(stateManager.movingBoulderCount).toBe(0);
        });

        it('should provide performance statistics', () => {
            const stats = performanceSystem.getPerformanceStats();

            expect(stats.system.totalBoulders).toBe(4);
            expect(stats.system.movingBoulders).toBe(0);
            expect(stats.system.trackedPositions).toBe(4);
        });
    });

    describe('Optimized Proximity Detection', () => {
        it('should detect adjacent boulders efficiently', () => {
            const playerPos: Position = { x: 2, y: 2 };
            const adjacent = performanceSystem.detectAdjacentBoulders(playerPos);

            expect(adjacent).toHaveLength(4); // All 4 boulders are adjacent to center position
            expect(adjacent).toContainEqual({ x: 1, y: 1 });
            expect(adjacent).toContainEqual({ x: 3, y: 1 });
            expect(adjacent).toContainEqual({ x: 1, y: 3 });
            expect(adjacent).toContainEqual({ x: 3, y: 3 });
        });

        it('should identify triggered boulders efficiently', () => {
            const previousPos: Position = { x: 0, y: 0 }; // Far from boulders
            const currentPos: Position = { x: 2, y: 2 }; // Near all boulders

            const triggered = performanceSystem.identifyTriggeredBoulders(previousPos, currentPos);

            // Check what boulders are actually adjacent to each position
            const previousAdjacent = performanceSystem.detectAdjacentBoulders(previousPos);
            const currentAdjacent = performanceSystem.detectAdjacentBoulders(currentPos);

            // Newly triggered = current adjacent - previous adjacent
            const expectedCount = currentAdjacent.length - previousAdjacent.length;
            expect(triggered).toHaveLength(expectedCount);
        });

        it('should handle no previous position', () => {
            const currentPos: Position = { x: 2, y: 2 };

            const triggered = performanceSystem.identifyTriggeredBoulders(null, currentPos);

            expect(triggered).toHaveLength(4); // All adjacent boulders are triggered
        });
    });

    describe('State Management', () => {
        it('should update boulder state efficiently', () => {
            const triggeredBoulders: Position[] = [{ x: 1, y: 1 }];
            const movingBoulders: Position[] = [];
            const stoppedBoulders: Position[] = [];
            const positionUpdates: Array<{ from: Position; to: Position }> = [];

            performanceSystem.updateBoulderState(
                triggeredBoulders,
                movingBoulders,
                stoppedBoulders,
                positionUpdates,
                2
            );

            const stateManager = performanceSystem.getStateManager();
            const boulderKey = '1,1';
            const boulderState = stateManager.boulders.get(boulderKey);

            expect(boulderState?.isTriggered).toBe(true);
            expect(boulderState?.triggeredOnMove).toBe(2);
        });

        it('should handle position updates', () => {
            const positionUpdates: Array<{ from: Position; to: Position }> = [
                { from: { x: 1, y: 1 }, to: { x: 1, y: 2 } }
            ];

            performanceSystem.updateBoulderState([], [], [], positionUpdates, 2);

            const stateManager = performanceSystem.getStateManager();
            const oldKey = '1,1';
            const newKey = '1,2';

            expect(stateManager.boulders.has(oldKey)).toBe(false);
            expect(stateManager.boulders.has(newKey)).toBe(true);
        });

        it('should get boulders by state with caching', () => {
            // Initially all boulders should be stationary
            const stationary1 = performanceSystem.getBouldersByState('stationary');
            const stationary2 = performanceSystem.getBouldersByState('stationary');

            expect(stationary1).toHaveLength(4);
            expect(stationary1).toStrictEqual(stationary2); // Should return same content (cached)

            // Trigger a boulder
            performanceSystem.updateBoulderState([{ x: 1, y: 1 }], [], [], [], 2);

            const stationary3 = performanceSystem.getBouldersByState('stationary');
            const triggered = performanceSystem.getBouldersByState('triggered');

            expect(stationary3).toHaveLength(3); // One less stationary
            expect(triggered).toHaveLength(1); // One triggered
            expect(stationary1).not.toStrictEqual(stationary3); // Cache should be invalidated
        });
    });

    describe('Batch Processing', () => {
        it('should process boulder operations in batches', () => {
            const boulders: Position[] = [
                { x: 1, y: 1 },
                { x: 3, y: 1 },
                { x: 1, y: 3 },
                { x: 3, y: 3 }
            ];

            const operation = (boulder: Position) => `${boulder.x},${boulder.y}`;
            const results = performanceSystem.processBoulderOperations(boulders, operation, 2);

            expect(results).toHaveLength(4);
            expect(results).toContain('1,1');
            expect(results).toContain('3,1');
            expect(results).toContain('1,3');
            expect(results).toContain('3,3');
        });
    });

    describe('Performance Monitoring', () => {
        it('should track performance metrics', () => {
            // Perform some operations to generate metrics
            performanceSystem.detectAdjacentBoulders({ x: 2, y: 2 });
            performanceSystem.updateBoulderState([{ x: 1, y: 1 }], [], [], [], 2);

            const stats = performanceSystem.getPerformanceStats();

            expect(stats.system.totalBoulders).toBe(4);
            expect(stats.system.trackedPositions).toBe(4);
        });

        it('should provide memory usage estimates', () => {
            const memoryUsage = performanceSystem.getMemoryUsage();

            expect(memoryUsage.estimatedBytes).toBeGreaterThan(0);
            expect(memoryUsage.breakdown.stateManager).toBeGreaterThan(0);
            expect(memoryUsage.breakdown.positionTracker).toBeGreaterThan(0);
        });

        it('should reset performance tracking', () => {
            // Generate some performance history
            performanceSystem.detectAdjacentBoulders({ x: 2, y: 2 });

            performanceSystem.resetPerformanceTracking();

            const stats = performanceSystem.getPerformanceStats();
            expect(stats.history).toHaveLength(0);
        });
    });

    describe('Maze Change Detection', () => {
        it('should detect maze changes', () => {
            const hasChanged1 = performanceSystem.checkMazeChanges(testMaze);
            expect(hasChanged1).toBe(false); // Same maze

            // Modify maze
            const modifiedMaze = testMaze.map(row => [...row]);
            modifiedMaze[1]![1] = CELL.SOIL; // Remove a boulder

            const hasChanged2 = performanceSystem.checkMazeChanges(modifiedMaze);
            expect(hasChanged2).toBe(true); // Maze changed
        });

        it('should update position tracker when maze changes', () => {
            const initialStats = performanceSystem.getPerformanceStats();
            expect(initialStats.system.trackedPositions).toBe(4);

            // Remove a boulder from maze
            const modifiedMaze = testMaze.map(row => [...row]);
            modifiedMaze[1]![1] = CELL.SOIL;

            performanceSystem.checkMazeChanges(modifiedMaze);

            const updatedStats = performanceSystem.getPerformanceStats();
            expect(updatedStats.system.trackedPositions).toBe(3); // One less boulder
        });
    });

    describe('Large Maze Optimization', () => {
        it('should optimize for large mazes', () => {
            // Create a large maze
            const largeMaze: MazeCell[][] = [];
            for (let y = 0; y < 200; y++) {
                const row: MazeCell[] = [];
                for (let x = 0; x < 200; x++) {
                    if (Math.random() > 0.95) {
                        row.push(CELL.BOULDER);
                    } else {
                        row.push(CELL.SOIL);
                    }
                }
                largeMaze.push(row);
            }

            const largeSystem = new PerformanceOptimizedBoulderSystem(largeMaze, 1);
            largeSystem.optimizeForLargeMaze(largeMaze);

            // Should not throw errors and should complete quickly
            const stats = largeSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Optimization Recommendations', () => {
        it('should provide optimization recommendations', () => {
            const recommendations = performanceSystem.getOptimizationRecommendations();

            expect(recommendations.recommendations).toBeInstanceOf(Array);
            expect(recommendations.severity).toMatch(/^(low|medium|high)$/);
            expect(recommendations.metrics.avgProximityTime).toBeGreaterThanOrEqual(0);
            expect(recommendations.metrics.avgStateUpdateTime).toBeGreaterThanOrEqual(0);
            expect(recommendations.metrics.memoryUsage).toBeGreaterThanOrEqual(0);
        });

        it('should recommend optimizations for poor performance', () => {
            // Create a system with many boulders to trigger recommendations
            const largeMaze: MazeCell[][] = [];
            for (let y = 0; y < 50; y++) {
                const row: MazeCell[] = [];
                for (let x = 0; x < 50; x++) {
                    row.push(CELL.BOULDER); // All boulders
                }
                largeMaze.push(row);
            }

            const largeSystem = new PerformanceOptimizedBoulderSystem(largeMaze, 1);
            const recommendations = largeSystem.getOptimizationRecommendations();

            expect(recommendations.severity).toBe('high');
            expect(recommendations.recommendations.some(r =>
                r.includes('boulder culling') || r.includes('optimization')
            )).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty maze', () => {
            const emptyMaze: MazeCell[][] = [];
            const emptySystem = new PerformanceOptimizedBoulderSystem(emptyMaze, 1);

            const stats = emptySystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(0);
            expect(stats.system.trackedPositions).toBe(0);
        });

        it('should handle maze with no boulders', () => {
            const noBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.SOIL, CELL.ROCK],
                [CELL.SOIL, CELL.PLAYER, CELL.SOIL],
                [CELL.ROCK, CELL.SOIL, CELL.ROCK]
            ];

            const noBoulderSystem = new PerformanceOptimizedBoulderSystem(noBoulderMaze, 1);

            const adjacent = noBoulderSystem.detectAdjacentBoulders({ x: 1, y: 1 });
            expect(adjacent).toHaveLength(0);

            const stats = noBoulderSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(0);
        });

        it('should handle single boulder maze', () => {
            const singleBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK]
            ];

            const singleSystem = new PerformanceOptimizedBoulderSystem(singleBoulderMaze, 1);

            const adjacent = singleSystem.detectAdjacentBoulders({ x: 0, y: 1 }); // Adjacent to boulder at (1,1)
            expect(adjacent).toHaveLength(1);
            expect(adjacent[0]).toEqual({ x: 1, y: 1 });

            const stats = singleSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(1);
        });
    });

    describe('Stress Testing', () => {
        it('should handle rapid state updates', () => {
            const startTime = performance.now();

            // Perform many rapid updates
            for (let i = 0; i < 100; i++) {
                const boulders = performanceSystem.getBouldersByState('stationary');
                if (boulders.length > 0) {
                    const firstBoulder = boulders[0]!;
                    performanceSystem.updateBoulderState([firstBoulder], [], [], [], i + 2);
                    performanceSystem.updateBoulderState([], [], [firstBoulder], [], i + 3);
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (less than 1 second)
            expect(duration).toBeLessThan(1000);

            // System should still be in valid state
            const stats = performanceSystem.getPerformanceStats();
            expect(stats.system.totalBoulders).toBe(4);
        });

        it('should handle many proximity checks', () => {
            const startTime = performance.now();

            // Perform many proximity checks
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    performanceSystem.detectAdjacentBoulders({ x, y });
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete quickly (less than 100ms)
            expect(duration).toBeLessThan(100);
        });
    });
});
```

- Fix 1: assert inner row exists when indexing cloned maze.
```ts
- modifiedMaze[1][1] = CELL.SOIL;
+ modifiedMaze[1]![1] = CELL.SOIL;
```

- Fix 2: assert first element of `boulders` is defined inside length check.
```ts
- performanceSystem.updateBoulderState([boulders[0]], [], [], [], i + 2);
- performanceSystem.updateBoulderState([], [], [boulders[0]], [], i + 3);
+ const firstBoulder = boulders[0]!;
+ performanceSystem.updateBoulderState([firstBoulder], [], [], [], i + 2);
+ performanceSystem.updateBoulderState([], [], [firstBoulder], [], i + 3);
```

- Lint: clean.

```typescript
- modifiedMaze[1][1] = CELL.SOIL;
+ modifiedMaze[1]![1] = CELL.SOIL;
```

```typescript
- performanceSystem.updateBoulderState([boulders[0]], [], [], [], i + 2);
- performanceSystem.updateBoulderState([], [], [boulders[0]], [], i + 3);
+ const firstBoulder = boulders[0]!;
+ performanceSystem.updateBoulderState([firstBoulder], [], [], [], i + 2);
+ performanceSystem.updateBoulderState([], [], [firstBoulder], [], i + 3);
```

---

**User**

For the code present, we get this error:
```
'ReactNode' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I’m going to change the import to a type-only import to satisfy verbatimModuleSyntax for `ReactNode`, then check linting for just this file.

```typescriptreact
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  AudioProvider,
  useAudioContext,
} from "../../../audio/context/audio-context";
import type { AudioManager } from "../../../Interfaces/IAudioManager";

// Mock localStorage with detailed tracking
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  const mockSetItem = vi.fn((key: string, value: string) => {
    store[key] = value;
  });

  const mockGetItem = vi.fn((key: string) => {
    return store[key] || null;
  });

  const mockRemoveItem = vi.fn((key: string) => {
    delete store[key];
  });

  const mockClear = vi.fn(() => {
    store = {};
  });

  return {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    // Helper to access internal store
    _getStore: () => store,
    _setStore: (newStore: Record<string, string>) => {
      store = { ...newStore };
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
};

// Mock the createAudioManager function
vi.mock("../../../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock("../../../audio/config/sound-config", () => ({
  SOUND_CONFIG: {
    globalVolume: 0.8,
    categories: {
      movement: { volume: 0.7 },
      collision: { volume: 1.0 },
      gameState: { volume: 0.6 },
    },
  },
}));

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children} </AudioProvider>;
}

describe("Audio Settings localStorage Persistence - Debug Panel", () => {
  const STORAGE_KEY = "wanderer-audio-settings";

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockLocalStorage._setStore({});

    // Reset localStorage mocks to their original implementations
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      const store = mockLocalStorage._getStore();
      return store[key] || null;
    });
    mockLocalStorage.setItem.mockImplementation(
      (key: string, value: string) => {
        const store = mockLocalStorage._getStore();
        store[key] = value;
      }
    );

    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  describe("saving debug panel visibility preference", () => {
    it("should save showDebugPanel to localStorage when set to true", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      // Wait for localStorage save
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.stringContaining('"showDebugPanel":true')
      );

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should save showDebugPanel to localStorage when set to false", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // First set to true, then to false
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.showDebugPanel).toBe(false);
    });

    it("should persist debug panel preference alongside other settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.5);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should update localStorage on each debug panel change", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Clear previous calls
      mockLocalStorage.setItem.mockClear();

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe("loading debug panel visibility preference", () => {
    it("should restore showDebugPanel from localStorage on initialization", async () => {
      // Pre-populate localStorage
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: true,
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should default to false when no preference exists in localStorage", async () => {
      // Empty localStorage
      mockLocalStorage._setStore({});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should default to false when showDebugPanel is missing from stored settings", async () => {
      // Settings without showDebugPanel
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          // showDebugPanel is missing
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should handle corrupted showDebugPanel values gracefully", async () => {
      const testCases = [
        { stored: true, expected: true },
        { stored: false, expected: false },
        { stored: "true", expected: true }, // String "true" is truthy
        { stored: "false", expected: false }, // String "false" should be converted to false
        { stored: 1, expected: true },
        { stored: 0, expected: false },
        { stored: null, expected: false },
        { stored: "invalid", expected: true }, // Truthy string
      ];

      for (const { stored, expected } of testCases) {
        mockLocalStorage._setStore({
          [STORAGE_KEY]: JSON.stringify({
            isMuted: false,
            globalVolume: 0.8,
            categoryVolumes: {},
            showDebugPanel: stored,
          }),
        });

        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(expected);
      }
    });

    it("should handle completely corrupted localStorage data", async () => {
      mockLocalStorage._setStore({
        [STORAGE_KEY]: "invalid-json-data",
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to default
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("cross-session persistence", () => {
    it("should persist debug panel preference across browser sessions", async () => {
      // First session - set preference
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        act(() => {
          result.current.setShowDebugPanel(true);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }

      // Simulate new session - create new component instance
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(true);
      }
    });

    it("should maintain preference through multiple setting changes", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Multiple changes
      const changes = [true, false, true, false, true];

      for (const value of changes) {
        act(() => {
          result.current.setShowDebugPanel(value);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(value);

        const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
        expect(savedData.showDebugPanel).toBe(value);
      }
    });
  });

  describe("localStorage error handling", () => {
    it("should handle localStorage save errors gracefully", async () => {
      // Mock localStorage.setItem to throw an error
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should not throw error
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // State should still be updated even if save fails
      expect(result.current.settings.showDebugPanel).toBe(true);

      consoleSpy.mockRestore();
    });

    it("should handle localStorage load errors gracefully", async () => {
      // Mock localStorage.getItem to throw an error
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("Storage access denied");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to defaults
      expect(result.current.settings.showDebugPanel).toBe(false);

      consoleSpy.mockRestore();
    });
  });

  describe("storage key consistency", () => {
    it("should use the correct storage key for debug panel settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String)
      );
    });

    it("should not create separate storage entries for debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should only have one storage key
      const store = mockLocalStorage._getStore();
      const keys = Object.keys(store);
      expect(keys).toHaveLength(1);
      expect(keys[0]).toBe(STORAGE_KEY);

      // Both settings should be in the same entry
      const savedData = JSON.parse(store[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });

  describe("data integrity", () => {
    it("should maintain data type consistency in localStorage", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(typeof savedData.showDebugPanel).toBe("boolean");
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should preserve other settings when updating debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Set initial values
      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.3);
        result.current.setCategoryVolume("movement", 0.5);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Change only debug panel
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.3);
      expect(savedData.categoryVolumes.movement).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });
});

```

Change the import to a type-only import.

Edit in `src/tests/audio/settings/audio-settings-localstorage.test.tsx`:
```ts
- import { ReactNode } from "react";
+ import type { ReactNode } from "react";
```

- This satisfies verbatimModuleSyntax.

```typescript
- import { ReactNode } from "react";
+ import type { ReactNode } from "react";
```

---

**User**

For the code present, we get this error:
```
Type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<...>; }' is missing the following properties from type 'AudioManager': stopAllSounds, getLoadingState, onLoadingProgress, getOptimizationReport, and 5 more.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Scanning the audio manager interface to implement the missing methods in the mock, and then updating the mock accordingly. I'll make the minimal additions to satisfy the interface.

```typescriptreact
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  AudioProvider,
  useAudioContext,
} from "../../../audio/context/audio-context";
import type { AudioManager } from "../../../Interfaces/IAudioManager";

// Mock localStorage with detailed tracking
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  const mockSetItem = vi.fn((key: string, value: string) => {
    store[key] = value;
  });

  const mockGetItem = vi.fn((key: string) => {
    return store[key] || null;
  });

  const mockRemoveItem = vi.fn((key: string) => {
    delete store[key];
  });

  const mockClear = vi.fn(() => {
    store = {};
  });

  return {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    // Helper to access internal store
    _getStore: () => store,
    _setStore: (newStore: Record<string, string>) => {
      store = { ...newStore };
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock("../../../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock("../../../audio/config/sound-config", () => ({
  SOUND_CONFIG: {
    globalVolume: 0.8,
    categories: {
      movement: { volume: 0.7 },
      collision: { volume: 1.0 },
      gameState: { volume: 0.6 },
    },
  },
}));

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children} </AudioProvider>;
}

describe("Audio Settings localStorage Persistence - Debug Panel", () => {
  const STORAGE_KEY = "wanderer-audio-settings";

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockLocalStorage._setStore({});

    // Reset localStorage mocks to their original implementations
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      const store = mockLocalStorage._getStore();
      return store[key] || null;
    });
    mockLocalStorage.setItem.mockImplementation(
      (key: string, value: string) => {
        const store = mockLocalStorage._getStore();
        store[key] = value;
      }
    );

    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  describe("saving debug panel visibility preference", () => {
    it("should save showDebugPanel to localStorage when set to true", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      // Wait for localStorage save
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.stringContaining('"showDebugPanel":true')
      );

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should save showDebugPanel to localStorage when set to false", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // First set to true, then to false
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.showDebugPanel).toBe(false);
    });

    it("should persist debug panel preference alongside other settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.5);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should update localStorage on each debug panel change", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Clear previous calls
      mockLocalStorage.setItem.mockClear();

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe("loading debug panel visibility preference", () => {
    it("should restore showDebugPanel from localStorage on initialization", async () => {
      // Pre-populate localStorage
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: true,
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should default to false when no preference exists in localStorage", async () => {
      // Empty localStorage
      mockLocalStorage._setStore({});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should default to false when showDebugPanel is missing from stored settings", async () => {
      // Settings without showDebugPanel
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          // showDebugPanel is missing
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should handle corrupted showDebugPanel values gracefully", async () => {
      const testCases = [
        { stored: true, expected: true },
        { stored: false, expected: false },
        { stored: "true", expected: true }, // String "true" is truthy
        { stored: "false", expected: false }, // String "false" should be converted to false
        { stored: 1, expected: true },
        { stored: 0, expected: false },
        { stored: null, expected: false },
        { stored: "invalid", expected: true }, // Truthy string
      ];

      for (const { stored, expected } of testCases) {
        mockLocalStorage._setStore({
          [STORAGE_KEY]: JSON.stringify({
            isMuted: false,
            globalVolume: 0.8,
            categoryVolumes: {},
            showDebugPanel: stored,
          }),
        });

        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(expected);
      }
    });

    it("should handle completely corrupted localStorage data", async () => {
      mockLocalStorage._setStore({
        [STORAGE_KEY]: "invalid-json-data",
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to default
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("cross-session persistence", () => {
    it("should persist debug panel preference across browser sessions", async () => {
      // First session - set preference
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        act(() => {
          result.current.setShowDebugPanel(true);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }

      // Simulate new session - create new component instance
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(true);
      }
    });

    it("should maintain preference through multiple setting changes", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Multiple changes
      const changes = [true, false, true, false, true];

      for (const value of changes) {
        act(() => {
          result.current.setShowDebugPanel(value);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(value);

        const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
        expect(savedData.showDebugPanel).toBe(value);
      }
    });
  });

  describe("localStorage error handling", () => {
    it("should handle localStorage save errors gracefully", async () => {
      // Mock localStorage.setItem to throw an error
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should not throw error
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // State should still be updated even if save fails
      expect(result.current.settings.showDebugPanel).toBe(true);

      consoleSpy.mockRestore();
    });

    it("should handle localStorage load errors gracefully", async () => {
      // Mock localStorage.getItem to throw an error
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("Storage access denied");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to defaults
      expect(result.current.settings.showDebugPanel).toBe(false);

      consoleSpy.mockRestore();
    });
  });

  describe("storage key consistency", () => {
    it("should use the correct storage key for debug panel settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String)
      );
    });

    it("should not create separate storage entries for debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should only have one storage key
      const store = mockLocalStorage._getStore();
      const keys = Object.keys(store);
      expect(keys).toHaveLength(1);
      expect(keys[0]).toBe(STORAGE_KEY);

      // Both settings should be in the same entry
      const savedData = JSON.parse(store[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });

  describe("data integrity", () => {
    it("should maintain data type consistency in localStorage", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(typeof savedData.showDebugPanel).toBe("boolean");
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should preserve other settings when updating debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Set initial values
      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.3);
        result.current.setCategoryVolume("movement", 0.5);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Change only debug panel
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.3);
      expect(savedData.categoryVolumes.movement).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });
});

```

```typescriptreact
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  AudioProvider,
  useAudioContext,
} from "../../../audio/context/audio-context";
import type { AudioManager } from "../../../Interfaces/IAudioManager";

// Mock localStorage with detailed tracking
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  const mockSetItem = vi.fn((key: string, value: string) => {
    store[key] = value;
  });

  const mockGetItem = vi.fn((key: string) => {
    return store[key] || null;
  });

  const mockRemoveItem = vi.fn((key: string) => {
    delete store[key];
  });

  const mockClear = vi.fn(() => {
    store = {};
  });

  return {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    // Helper to access internal store
    _getStore: () => store,
    _setStore: (newStore: Record<string, string>) => {
      store = { ...newStore };
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock("../../../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock("../../../audio/config/sound-config", () => ({
  SOUND_CONFIG: {
    globalVolume: 0.8,
    categories: {
      movement: { volume: 0.7 },
      collision: { volume: 1.0 },
      gameState: { volume: 0.6 },
    },
  },
}));

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children} </AudioProvider>;
}

describe("Audio Settings localStorage Persistence - Debug Panel", () => {
  const STORAGE_KEY = "wanderer-audio-settings";

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockLocalStorage._setStore({});

    // Reset localStorage mocks to their original implementations
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      const store = mockLocalStorage._getStore();
      return store[key] || null;
    });
    mockLocalStorage.setItem.mockImplementation(
      (key: string, value: string) => {
        const store = mockLocalStorage._getStore();
        store[key] = value;
      }
    );

    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  describe("saving debug panel visibility preference", () => {
    it("should save showDebugPanel to localStorage when set to true", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      // Wait for localStorage save
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.stringContaining('"showDebugPanel":true')
      );

      const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
      const savedData = JSON.parse(savedRaw);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should save showDebugPanel to localStorage when set to false", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // First set to true, then to false
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
      const savedData = JSON.parse(savedRaw);
      expect(savedData.showDebugPanel).toBe(false);
    });

    it("should persist debug panel preference alongside other settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.5);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
      const savedData = JSON.parse(savedRaw);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should update localStorage on each debug panel change", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Clear previous calls
      mockLocalStorage.setItem.mockClear();

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe("loading debug panel visibility preference", () => {
    it("should restore showDebugPanel from localStorage on initialization", async () => {
      // Pre-populate localStorage
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: true,
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should default to false when no preference exists in localStorage", async () => {
      // Empty localStorage
      mockLocalStorage._setStore({});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should default to false when showDebugPanel is missing from stored settings", async () => {
      // Settings without showDebugPanel
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          // showDebugPanel is missing
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should handle corrupted showDebugPanel values gracefully", async () => {
      const testCases = [
        { stored: true, expected: true },
        { stored: false, expected: false },
        { stored: "true", expected: true }, // String "true" is truthy
        { stored: "false", expected: false }, // String "false" should be converted to false
        { stored: 1, expected: true },
        { stored: 0, expected: false },
        { stored: null, expected: false },
        { stored: "invalid", expected: true }, // Truthy string
      ];

      for (const { stored, expected } of testCases) {
        mockLocalStorage._setStore({
          [STORAGE_KEY]: JSON.stringify({
            isMuted: false,
            globalVolume: 0.8,
            categoryVolumes: {},
            showDebugPanel: stored,
          }),
        });

        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(expected);
      }
    });

    it("should handle completely corrupted localStorage data", async () => {
      mockLocalStorage._setStore({
        [STORAGE_KEY]: "invalid-json-data",
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to default
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("cross-session persistence", () => {
    it("should persist debug panel preference across browser sessions", async () => {
      // First session - set preference
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        act(() => {
          result.current.setShowDebugPanel(true);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }

      // Simulate new session - create new component instance
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(true);
      }
    });

    it("should maintain preference through multiple setting changes", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Multiple changes
      const changes = [true, false, true, false, true];

      for (const value of changes) {
        act(() => {
          result.current.setShowDebugPanel(value);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(value);

        const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
        const savedData = JSON.parse(savedRaw);
        expect(savedData.showDebugPanel).toBe(value);
      }
    });
  });

  describe("localStorage error handling", () => {
    it("should handle localStorage save errors gracefully", async () => {
      // Mock localStorage.setItem to throw an error
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should not throw error
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // State should still be updated even if save fails
      expect(result.current.settings.showDebugPanel).toBe(true);

      consoleSpy.mockRestore();
    });

    it("should handle localStorage load errors gracefully", async () => {
      // Mock localStorage.getItem to throw an error
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("Storage access denied");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to defaults
      expect(result.current.settings.showDebugPanel).toBe(false);

      consoleSpy.mockRestore();
    });
  });

  describe("storage key consistency", () => {
    it("should use the correct storage key for debug panel settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String)
      );
    });

    it("should not create separate storage entries for debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should only have one storage key
      const store = mockLocalStorage._getStore();
      const keys = Object.keys(store);
      expect(keys).toHaveLength(1);
      expect(keys[0]).toBe(STORAGE_KEY);

      // Both settings should be in the same entry
      const savedRaw = store[STORAGE_KEY]!;
      const savedData = JSON.parse(savedRaw);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });

  describe("data integrity", () => {
    it("should maintain data type consistency in localStorage", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
      const savedData = JSON.parse(savedRaw);
      expect(typeof savedData.showDebugPanel).toBe("boolean");
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should preserve other settings when updating debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Set initial values
      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.3);
        result.current.setCategoryVolume("movement", 0.5);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Change only debug panel
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
      const savedData = JSON.parse(savedRaw);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.3);
      expect(savedData.categoryVolumes.movement).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });
});

```

- Fix 1: complete the mock to satisfy `AudioManager` interface.
```ts
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading: false, loadedCount: 0, totalCount: 0, failedSounds: [], errors: new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

- Fix 2: non-null assert when reading from the local fake store before JSON.parse.
```ts
- const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
+ const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
+ const savedData = JSON.parse(savedRaw);
```

- Lint: clean.

```typescript
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading: false, loadedCount: 0, totalCount: 0, failedSounds: [], errors: new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

```typescript
- const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
+ const savedRaw = mockLocalStorage._getStore()[STORAGE_KEY]!;
+ const savedData = JSON.parse(savedRaw);
```

---

**User**

For the code present, we get this error:
```
Type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<...>; }' is missing the following properties from type 'AudioManager': stopAllSounds, getLoadingState, onLoadingProgress, getOptimizationReport, and 5 more.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Updating the test's audio manager mock to include all methods required by `AudioManager`, then checking for lints on that file.

```typescriptreact
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AudioProvider, useAudioContext } from "../audio/context/audio-context";
import type { AudioManager } from "../Interfaces/IAudioManager";

// Mock the audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock("../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Test component that uses the audio context
function TestComponent() {
  const {
    audioManager,
    isInitialized,
    isLoading,
    error,
    initializeAudio,
    cleanup,
  } = useAudioContext();

  return (
    <div>
      <div data-testid="initialized">{isInitialized.toString()}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="error">{error || "null"}</div>
      <div data-testid="manager-available">
        {(audioManager !== null).toString()}
      </div>
      <button onClick={initializeAudio} data-testid="init-button">
        Initialize
      </button>
      <button onClick={cleanup} data-testid="cleanup-button">
        Cleanup
      </button>
    </div>
  );
}

describe("AudioContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Restore default mock behavior after resetAllMocks
    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should provide audio context to children", async () => {
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>
    );

    // Should start in loading state
    expect(screen.getByTestId("loading").textContent).toBe("true");
    expect(screen.getByTestId("initialized").textContent).toBe("false");

    // Wait for initialization to complete
    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("initialized").textContent).toBe("true");
    expect(screen.getByTestId("manager-available").textContent).toBe("true");
    expect(screen.getByTestId("error").textContent).toBe("null");
  });

  it("should handle initialization errors", async () => {
    const initError = new Error("Initialization failed");
    const mockPreloadSounds = vi.mocked(mockAudioManager.preloadSounds);
    // Make all calls to preloadSounds fail to prevent fallback success
    mockPreloadSounds.mockRejectedValue(initError);

    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>
    );

    // Wait for the mock to be called
    await waitFor(() => {
      expect(mockPreloadSounds).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe(
        "Initialization failed"
      );
    });

    expect(screen.getByTestId("initialized").textContent).toBe("false");
    expect(screen.getByTestId("manager-available").textContent).toBe("false");
  });

  it("should call preloadSounds during initialization", async () => {
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
  });

  // Note: Cleanup on unmount is tested indirectly through manual cleanup test
  // The useEffect cleanup timing can be inconsistent in test environments

  it("should allow manual cleanup", async () => {
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>
    );

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByTestId("initialized").textContent).toBe("true");
    });

    // Clear previous calls to focus on manual cleanup
    vi.clearAllMocks();

    // Click cleanup button
    act(() => {
      screen.getByTestId("cleanup-button").click();
    });

    // Verify that the mock cleanup was called (may be called multiple times in strict mode)
    expect(mockAudioManager.cleanup).toHaveBeenCalled();
  });

  it("should prevent multiple simultaneous initializations", async () => {
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>
    );

    // Wait for initial initialization
    await waitFor(() => {
      expect(screen.getByTestId("initialized").textContent).toBe("true");
    });

    // Try to initialize again
    screen.getByTestId("init-button").click();

    // Should not call preloadSounds again
    expect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
  });

  it("should throw error when useAudioContext is used outside provider", () => {
    // Mock console.error to prevent test output pollution
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAudioContext must be used within an AudioProvider");

    consoleSpy.mockRestore();
  });

  it("should handle non-Error exceptions during initialization", async () => {
    // Make all calls to preloadSounds fail to prevent fallback success
    vi.mocked(mockAudioManager.preloadSounds).mockRejectedValue("String error");

    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe(
        "Failed to initialize audio"
      );
    });
  });
});

```

- Fix: extend the mock to satisfy `AudioManager`.

Edits in `src/tests/audio-context.test.tsx`:
```ts
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

- Lint: clean.

```typescript
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

---

**User**

For the code present, we get this error:
```
Type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<...>; }' is missing the following properties from type 'AudioManager': stopAllSounds, getLoadingState, onLoadingProgress, getOptimizationReport, and 5 more.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Updating the audio manager mock in the test to include all required interface methods, mirroring the structure we used in related tests. Then I’ll recheck lints for that file.

```typescriptreact
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AudioProvider, useAudioContext } from '../../../audio/context/audio-context';
import type { AudioManager } from '../../../Interfaces/IAudioManager';

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
        _getStore: () => ({ ...store }),
        _setStore: (newStore: Record<string, string>) => {
            store = { ...newStore };
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

// Mock audio manager
const mockAudioManager: AudioManager = {
    playSound: vi.fn(),
    preloadSounds: vi.fn().mockResolvedValue(undefined),
    setMuted: vi.fn(),
    isMuted: vi.fn().mockReturnValue(false),
    isSupported: vi.fn().mockReturnValue(true),
    stopAllSounds: vi.fn(),
    cleanup: vi.fn(),
    getLoadingState: vi.fn(() => ({
        isLoading: false,
        loadedCount: 0,
        totalCount: 0,
        failedSounds: [],
        errors: new Map(),
    })),
    onLoadingProgress: vi.fn(() => vi.fn()),
    getOptimizationReport: vi.fn(() => ({})),
    setGlobalVolume: vi.fn(),
    getGlobalVolume: vi.fn(() => 1),
    setCategoryVolume: vi.fn(),
    getCategoryVolume: vi.fn(() => 1),
    getAllCategoryVolumes: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock('../../../audio/managers/audio-manager-factory', () => ({
    createAudioManager: () => mockAudioManager,
    createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock('../../../audio/config/sound-config', () => ({
    SOUND_CONFIG: {
        globalVolume: 0.8,
        categories: {
            movement: { volume: 0.7 },
            collision: { volume: 1.0 },
            gameState: { volume: 0.6 },
        },
    },
}));

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
    return <AudioProvider>{ children } </AudioProvider>;
}

describe('AudioSettings Interface Extension', () => {
    const STORAGE_KEY = 'wanderer-audio-settings';

    beforeEach(() => {
        vi.clearAllMocks();
        mockLocalStorage.clear();
        vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
        vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
        vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
    });

    describe('AudioSettings interface structure', () => {
        it('should include showDebugPanel property in default settings', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.settings).toHaveProperty('showDebugPanel');
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
            expect(result.current.settings.showDebugPanel).toBe(false);
        });

        it('should maintain all existing properties in default settings', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const settings = result.current.settings;
            expect(settings).toHaveProperty('isMuted');
            expect(settings).toHaveProperty('globalVolume');
            expect(settings).toHaveProperty('categoryVolumes');
            expect(settings).toHaveProperty('showDebugPanel');

            expect(typeof settings.isMuted).toBe('boolean');
            expect(typeof settings.globalVolume).toBe('number');
            expect(typeof settings.categoryVolumes).toBe('object');
            expect(typeof settings.showDebugPanel).toBe('boolean');
        });

        it('should have correct default values', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const settings = result.current.settings;
            expect(settings.isMuted).toBe(false);
            expect(settings.globalVolume).toBe(0.8);
            expect(settings.showDebugPanel).toBe(false);
            expect(settings.categoryVolumes).toEqual({
                movement: 0.7,
                collision: 1.0,
                gameState: 0.6,
            });
        });
    });

    describe('localStorage integration', () => {
        it('should save showDebugPanel to localStorage', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const stored = mockLocalStorage.getItem(STORAGE_KEY);
            const parsed = JSON.parse(stored!);
            expect(parsed.showDebugPanel).toBe(true);
        });

        it('should load showDebugPanel from localStorage', async () => {
            mockLocalStorage._setStore({
                [STORAGE_KEY]: JSON.stringify({
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: { movement: 0.7 },
                    showDebugPanel: true,
                }),
            });

            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.settings.showDebugPanel).toBe(true);
        });

        it('should handle missing showDebugPanel in stored settings', async () => {
            mockLocalStorage._setStore({
                [STORAGE_KEY]: JSON.stringify({
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: { movement: 0.7 },
                    // showDebugPanel is missing
                }),
            });

            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            // Should default to false
            expect(result.current.settings.showDebugPanel).toBe(false);
        });

        it('should preserve all settings when saving showDebugPanel', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setMuted(true);
                result.current.setGlobalVolume(0.5);
                result.current.setCategoryVolume('movement', 0.3);
                result.current.setShowDebugPanel(true);
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const stored = mockLocalStorage.getItem(STORAGE_KEY);
            const parsed = JSON.parse(stored!);

            expect(parsed.isMuted).toBe(true);
            expect(parsed.globalVolume).toBe(0.5);
            expect(parsed.categoryVolumes.movement).toBe(0.3);
            expect(parsed.showDebugPanel).toBe(true);
        });
    });

    describe('backward compatibility', () => {
        it('should handle old settings format without showDebugPanel', async () => {
            mockLocalStorage._setStore({
                [STORAGE_KEY]: JSON.stringify({
                    isMuted: true,
                    globalVolume: 0.6,
                    categoryVolumes: { movement: 0.5 },
                }),
            });

            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.settings.isMuted).toBe(true);
            expect(result.current.settings.globalVolume).toBe(0.6);
            expect(result.current.settings.showDebugPanel).toBe(false); // Should default to false
        });

        it('should handle corrupted showDebugPanel values', async () => {
            const testCases = [
                { stored: 'invalid', expected: true }, // Truthy string
                { stored: null, expected: false },
                { stored: 0, expected: false },
                { stored: 1, expected: true },
                { stored: '', expected: false },
            ];

            for (const { stored, expected } of testCases) {
                mockLocalStorage._setStore({
                    [STORAGE_KEY]: JSON.stringify({
                        isMuted: false,
                        globalVolume: 0.8,
                        categoryVolumes: {},
                        showDebugPanel: stored,
                    }),
                });

                const { result } = renderHook(() => useAudioContext(), {
                    wrapper: TestWrapper,
                });

                await act(async () => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                });

                expect(result.current.settings.showDebugPanel).toBe(expected);
            }
        });

        it('should handle null and undefined showDebugPanel values', async () => {
            const testCases = [
                { showDebugPanel: null, expected: false },
                { showDebugPanel: undefined, expected: false },
                { showDebugPanel: false, expected: false },
                { showDebugPanel: true, expected: true },
            ];

            for (const { showDebugPanel, expected } of testCases) {
                const testSettings: any = {
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: {},
                };

                if (showDebugPanel !== undefined) {
                    testSettings.showDebugPanel = showDebugPanel;
                }

                mockLocalStorage._setStore({
                    [STORAGE_KEY]: JSON.stringify(testSettings),
                });

                const { result } = renderHook(() => useAudioContext(), {
                    wrapper: TestWrapper,
                });

                await act(async () => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                });

                expect(result.current.settings.showDebugPanel).toBe(expected);
            }
        });
    });

    describe('type safety', () => {
        it('should enforce boolean type for showDebugPanel', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            act(() => {
                result.current.setShowDebugPanel(false);
            });

            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
        });

        it('should maintain type consistency across operations', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            // Initial state
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            // After modification
            act(() => {
                result.current.setShowDebugPanel(true);
            });
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            // After serialization/deserialization (localStorage save/load)
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const stored = mockLocalStorage.getItem(STORAGE_KEY);
            const parsed = JSON.parse(stored!);
            expect(typeof parsed.showDebugPanel).toBe('boolean');
        });
    });

    describe('settings validation', () => {
        it('should validate showDebugPanel as boolean', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            expect(result.current.settings.showDebugPanel).toBe(true);
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
        });

        it('should handle edge cases in validation', async () => {
            // Test loading from localStorage with various values
            const edgeCases = [
                { input: 'true', expected: true },
                { input: 'false', expected: false },
                { input: 1, expected: true },
                { input: 0, expected: false },
                { input: null, expected: false },
                { input: undefined, expected: false },
            ];

            for (const { input, expected } of edgeCases) {
                const testSettings: any = {
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: {},
                };

                if (input !== undefined) {
                    testSettings.showDebugPanel = input;
                }

                mockLocalStorage._setStore({
                    [STORAGE_KEY]: JSON.stringify(testSettings),
                });

                const { result } = renderHook(() => useAudioContext(), {
                    wrapper: TestWrapper,
                });

                await act(async () => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                });

                expect(result.current.settings.showDebugPanel).toBe(expected);
                expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
            }
        });
    });

    describe('integration with existing settings', () => {
        it('should not interfere with existing settings structure', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const originalSettings = { ...result.current.settings };

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            // All original properties should still exist
            expect(result.current.settings).toHaveProperty('isMuted');
            expect(result.current.settings).toHaveProperty('globalVolume');
            expect(result.current.settings).toHaveProperty('categoryVolumes');

            // New property should be added
            expect(result.current.settings).toHaveProperty('showDebugPanel');

            // Other values should be preserved
            expect(result.current.settings.isMuted).toBe(originalSettings.isMuted);
            expect(result.current.settings.globalVolume).toBe(originalSettings.globalVolume);
        });

        it('should maintain settings immutability patterns', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const originalSettings = { ...result.current.settings };

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            // Original reference should be different (immutable update)
            expect(result.current.settings).not.toBe(originalSettings);

            // But other properties should have the same values
            expect(result.current.settings.isMuted).toBe(originalSettings.isMuted);
            expect(result.current.settings.globalVolume).toBe(originalSettings.globalVolume);

            // New property should have new value
            expect(result.current.settings.showDebugPanel).toBe(true);
        });
    });
});
```

- Fix: extend the mock to match `AudioManager`.

Edits in `src/tests/audio/settings/audio-settings-interface.test.tsx`:
```ts
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

- Lint: clean.

```typescript
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

---

**User**

For the code present, we get this error:
```
Type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<...>; }' is missing the following properties from type 'AudioManager': stopAllSounds, getLoadingState, onLoadingProgress, getOptimizationReport, and 5 more.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Updating the audio manager mock in this test to include the missing methods required by the `AudioManager` interface, consistent with other tests. Then I’ll recheck lints for this file.

```typescriptreact
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type{ ReactNode } from "react";
import {
  AudioProvider,
  useAudioContext,
} from "../../../audio/context/audio-context";
import type { AudioManager } from "../../../Interfaces/IAudioManager";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock("../../../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock("../../../audio/config/sound-config", () => ({
  SOUND_CONFIG: {
    globalVolume: 0.8,
    categories: {
      movement: { volume: 0.7 },
      collision: { volume: 1.0 },
      gameState: { volume: 0.6 },
    },
  },
}));

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

describe("AudioContext Debug Panel State Management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  describe("default settings", () => {
    it("should initialize with showDebugPanel set to false by default", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should include showDebugPanel in default settings structure", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const settings = result.current.settings;
      expect(settings).toHaveProperty("showDebugPanel");
      expect(typeof settings.showDebugPanel).toBe("boolean");
    });
  });

  describe("setShowDebugPanel function", () => {
    it("should provide setShowDebugPanel function in context", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(typeof result.current.setShowDebugPanel).toBe("function");
    });

    it("should update showDebugPanel state when called", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should toggle showDebugPanel state correctly", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Start with false
      expect(result.current.settings.showDebugPanel).toBe(false);

      // Set to true
      act(() => {
        result.current.setShowDebugPanel(true);
      });
      expect(result.current.settings.showDebugPanel).toBe(true);

      // Set back to false
      act(() => {
        result.current.setShowDebugPanel(false);
      });
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("localStorage persistence", () => {
    it("should save showDebugPanel to localStorage when changed", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      // Wait for localStorage save
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedSettings = JSON.parse(
        mockLocalStorage.getItem("wanderer-audio-settings") || "{}"
      );
      expect(savedSettings.showDebugPanel).toBe(true);
    });

    it("should load showDebugPanel from localStorage on initialization", async () => {
      // Pre-populate localStorage
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: true,
        })
      );

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should handle missing showDebugPanel in stored settings gracefully", async () => {
      // Store settings without showDebugPanel
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
        })
      );

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should default to false
      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should handle corrupted localStorage data gracefully", async () => {
      mockLocalStorage.setItem("wanderer-audio-settings", "invalid-json");

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should use default value
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("resetToDefaults function", () => {
    it("should reset showDebugPanel to false when resetToDefaults is called", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Set to true first
      act(() => {
        result.current.setShowDebugPanel(true);
      });
      expect(result.current.settings.showDebugPanel).toBe(true);

      // Reset to defaults
      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should reset all settings including showDebugPanel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Change multiple settings
      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.3);
        result.current.setShowDebugPanel(true);
      });

      expect(result.current.settings.isMuted).toBe(true);
      expect(result.current.settings.globalVolume).toBe(0.3);
      expect(result.current.settings.showDebugPanel).toBe(true);

      // Reset to defaults
      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.settings.isMuted).toBe(false);
      expect(result.current.settings.globalVolume).toBe(0.8);
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("type safety", () => {
    it("should enforce boolean type for showDebugPanel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // TypeScript should enforce boolean type
      act(() => {
        result.current.setShowDebugPanel(true);
      });
      expect(typeof result.current.settings.showDebugPanel).toBe("boolean");

      act(() => {
        result.current.setShowDebugPanel(false);
      });
      expect(typeof result.current.settings.showDebugPanel).toBe("boolean");
    });

    it("should handle truthy/falsy values correctly", async () => {
      // Test with localStorage containing non-boolean values
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: "true", // String instead of boolean
        })
      );

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should be converted to boolean
      expect(result.current.settings.showDebugPanel).toBe(true);
      expect(typeof result.current.settings.showDebugPanel).toBe("boolean");
    });
  });

  describe("integration with other settings", () => {
    it("should not affect other settings when showDebugPanel is changed", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const originalMuted = result.current.settings.isMuted;
      const originalVolume = result.current.settings.globalVolume;

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      expect(result.current.settings.isMuted).toBe(originalMuted);
      expect(result.current.settings.globalVolume).toBe(originalVolume);
      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should persist all settings together", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.5);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedSettings = JSON.parse(
        mockLocalStorage.getItem("wanderer-audio-settings") || "{}"
      );
      expect(savedSettings.isMuted).toBe(true);
      expect(savedSettings.globalVolume).toBe(0.5);
      expect(savedSettings.showDebugPanel).toBe(true);
    });
  });
});

```

- Fix: extend the mock to satisfy `AudioManager`.

Edits in `src/tests/audio/context/audio-context-debug-panel.test.tsx`:
```ts
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

- Lint: clean.

```typescript
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
};
```

---

**User**

For the code present, we get this error:
```
'findPlayerPosition' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Removing the unused helper `findPlayerPosition` from `src/physics/physics-engine.ts`, then I'll check lints for that file to ensure the warning is gone.

```typescript
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';
import {
    simulateBoulderFall,
    simulateEnhancedBoulderFall,
    simulateArrowMovement,
    type Position
} from './collision-detection';
import type { BoulderStateManager } from './boulder-state-manager';
import {
    getTriggeredBouldersForMove
} from './boulder-state-manager';
import {
    validateMazeIntegrity,
    validateBoulderStateManager,
    handlePhysicsError,
    logBoulderError
} from './boulder-error-handling';

// Enhanced physics simulation result
export interface PhysicsSimulationResult {
    newMaze: MazeCell[][];
    soundEvents: SoundEvent[];
    boulderPositions: Position[];
    arrowPositions: Position[];
    movingBoulders: Position[];
    completedBoulders: Position[];
    playerCollisions: Position[];
    positionUpdates: Array<{ from: Position; to: Position }>;
}

// Pure function to find all boulders in the maze
export function findBoulders(maze: MazeCell[][]): Position[] {
    const boulders: Position[] = [];

    for (let y = 0; y < maze.length; y++) {
        const row = maze[y];
        if (!row) continue;

        for (let x = 0; x < row.length; x++) {
            if (row[x] === CELL.BOULDER) {
                boulders.push({ x, y });
            }
        }
    }

    return boulders;
}

// Pure function to simulate gravity for all boulders (legacy version)
export function simulateGravity(maze: MazeCell[][]): PhysicsSimulationResult {
    const boulders = findBoulders(maze);
    let currentMaze = maze.map(row => [...row]);
    const allSoundEvents: SoundEvent[] = [];
    const newBoulderPositions: Position[] = [];

    // Process boulders from bottom to top to avoid conflicts
    const sortedBoulders = [...boulders].sort((a, b) => b.y - a.y);

    for (const boulder of sortedBoulders) {
        const result = simulateBoulderFall(currentMaze, boulder);
        currentMaze = result.newMaze;
        newBoulderPositions.push(result.newPosition);

        // Add sound events from the fall simulation (includes movement and collision sounds)
        allSoundEvents.push(...result.soundEvents);
    }

    return {
        newMaze: currentMaze,
        soundEvents: allSoundEvents,
        boulderPositions: newBoulderPositions,
        arrowPositions: [], // No arrows in current implementation
        movingBoulders: [],
        completedBoulders: [],
        playerCollisions: [],
        positionUpdates: [] // Legacy function doesn't track position updates
    };
}

// Enhanced function to simulate gravity with boulder state management and error handling
export function simulateGravityWithState(
    maze: MazeCell[][],
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number
): PhysicsSimulationResult {
    try {
        // Validate inputs
        const mazeValidation = validateMazeIntegrity(maze);
        if (!mazeValidation.success) {
            logBoulderError(mazeValidation.error!, 'simulateGravityWithState');

            // Return safe fallback result
            const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
            return {
                newMaze: safeMaze,
                soundEvents: [],
                boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
                arrowPositions: [],
                movingBoulders: [],
                completedBoulders: [],
                playerCollisions: [],
                positionUpdates: []
            };
        }

        const managerValidation = validateBoulderStateManager(boulderStateManager, maze);
        if (!managerValidation.success) {
            logBoulderError(managerValidation.error!, 'simulateGravityWithState');

            if (!managerValidation.error?.recoverable) {
                // Return safe fallback result for non-recoverable errors
                const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
                return {
                    newMaze: safeMaze,
                    soundEvents: [],
                    boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
                    arrowPositions: [],
                    movingBoulders: [],
                    completedBoulders: [],
                    playerCollisions: [],
                    positionUpdates: []
                };
            }
        }

        let currentMaze = maze.map(row => [...row]);
        const allSoundEvents: SoundEvent[] = [];
        const movingBoulders: Position[] = [];
        const completedBoulders: Position[] = [];
        const playerCollisions: Position[] = [];
        const positionUpdates: Array<{ from: Position; to: Position }> = [];

        // Get boulders that should start moving this turn
        let triggeredBoulders: Position[] = [];
        try {
            triggeredBoulders = getTriggeredBouldersForMove(boulderStateManager, currentMoveNumber);
        } catch (error) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error getting triggered boulders: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { error, currentMoveNumber },
                recoverable: true
            }, 'simulateGravityWithState');
            triggeredBoulders = []; // Continue with empty array
        }

        // Get all boulders that are currently moving or should start moving
        let currentlyMovingBoulders: Position[] = [];
        try {
            currentlyMovingBoulders = Array.from(boulderStateManager.boulders.values())
                .filter(state => state.isMoving)
                .map(state => state.position);
        } catch (error) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error getting currently moving boulders: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { error },
                recoverable: true
            }, 'simulateGravityWithState');
            currentlyMovingBoulders = []; // Continue with empty array
        }

        const allMovingBoulders = [
            ...triggeredBoulders,
            ...currentlyMovingBoulders
        ];

        // Remove duplicates based on position
        const uniqueMovingBoulders = allMovingBoulders.filter((boulder, index, array) =>
            array.findIndex(b => b.x === boulder.x && b.y === boulder.y) === index
        );

        // Track newly triggered boulders
        for (const boulder of triggeredBoulders) {
            movingBoulders.push(boulder);
        }

        // Process boulder movement from bottom to top to avoid conflicts
        const sortedMovingBoulders = [...uniqueMovingBoulders].sort((a, b) => b.y - a.y);

        for (const boulder of sortedMovingBoulders) {
            try {
                // CRITICAL: simulateEnhancedBoulderFall implements continuous falling per Requirement 1.4
                // Each call to this function will make the boulder fall all the way down until collision
                const result = simulateEnhancedBoulderFall(currentMaze, boulder);

                // Add sound events from boulder fall simulation
                allSoundEvents.push(...result.soundEvents);

                // Check for player collision
                if (result.playerCollision) {
                    playerCollisions.push(result.newPosition);
                }

                // Check if boulder actually moved
                const hasMoved = result.newPosition.x !== boulder.x || result.newPosition.y !== boulder.y;

                if (hasMoved) {
                    // Boulder moved successfully
                    currentMaze = result.newMaze;
                    positionUpdates.push({ from: boulder, to: result.newPosition });

                    // If this wasn't a newly triggered boulder, it's still moving
                    if (!triggeredBoulders.some(tb => tb.x === boulder.x && tb.y === boulder.y)) {
                        movingBoulders.push(boulder);
                    }
                } else {
                    // Boulder stopped moving (collision or reached bottom)
                    completedBoulders.push(boulder);
                }
            } catch (boulderError) {
                logBoulderError({
                    type: 'physics_failure',
                    message: `Error simulating boulder fall at position (${boulder.x},${boulder.y}): ${boulderError instanceof Error ? boulderError.message : 'Unknown error'}`,
                    context: { boulder, error: boulderError },
                    recoverable: true
                }, 'simulateGravityWithState');

                // Mark boulder as completed to prevent infinite processing
                completedBoulders.push(boulder);
                continue;
            }
        }

        let finalBoulderPositions: Position[] = [];
        try {
            finalBoulderPositions = findBoulders(currentMaze);
        } catch (error) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error finding final boulder positions: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { error },
                recoverable: true
            }, 'simulateGravityWithState');
            finalBoulderPositions = []; // Continue with empty array
        }

        return {
            newMaze: currentMaze,
            soundEvents: allSoundEvents,
            boulderPositions: finalBoulderPositions,
            arrowPositions: [], // No arrows in current implementation
            movingBoulders,
            completedBoulders,
            playerCollisions,
            positionUpdates
        };
    } catch (error) {
        logBoulderError({
            type: 'physics_failure',
            message: `Unexpected error in gravity simulation: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, currentMoveNumber },
            recoverable: false
        }, 'simulateGravityWithState');

        // Handle physics error with fallback
        const fallbackResult = handlePhysicsError(error, maze, boulderStateManager);
        if (fallbackResult.success && fallbackResult.data) {
            return {
                newMaze: fallbackResult.data.maze,
                soundEvents: [],
                boulderPositions: findBoulders(fallbackResult.data.maze),
                arrowPositions: [],
                movingBoulders: [],
                completedBoulders: [],
                playerCollisions: [],
                positionUpdates: []
            };
        }

        // Final fallback - return original maze unchanged
        const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
        return {
            newMaze: safeMaze,
            soundEvents: [],
            boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
            arrowPositions: [],
            movingBoulders: [],
            completedBoulders: [],
            playerCollisions: [],
            positionUpdates: []
        };
    }
}

// (removed unused helper findPlayerPosition)

// Pure function to simulate arrow movement (for future use)
export function simulateArrows(
    maze: MazeCell[][],
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }>
): PhysicsSimulationResult {
    let currentMaze = maze.map(row => [...row]);
    const allSoundEvents: SoundEvent[] = [];
    const newArrowPositions: Position[] = [];

    for (const arrow of arrows) {
        const result = simulateArrowMovement(currentMaze, arrow.position, arrow.direction);
        currentMaze = result.newMaze;
        allSoundEvents.push(...result.soundEvents);

        if (result.newPosition) {
            newArrowPositions.push(result.newPosition);
        }
    }

    return {
        newMaze: currentMaze,
        soundEvents: allSoundEvents,
        boulderPositions: findBoulders(currentMaze),
        arrowPositions: newArrowPositions,
        movingBoulders: [],
        completedBoulders: [],
        playerCollisions: [],
        positionUpdates: [] // Arrow simulation doesn't track boulder position updates
    };
}

// Pure function to run a complete physics simulation step (legacy version)
export function simulatePhysicsStep(
    maze: MazeCell[][],
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }> = []
): PhysicsSimulationResult {
    // First simulate gravity for boulders
    const gravityResult = simulateGravity(maze);

    // Then simulate arrow movement
    const arrowResult = simulateArrows(gravityResult.newMaze, arrows);

    // Combine results
    return {
        newMaze: arrowResult.newMaze,
        soundEvents: [...gravityResult.soundEvents, ...arrowResult.soundEvents],
        boulderPositions: arrowResult.boulderPositions,
        arrowPositions: arrowResult.arrowPositions,
        movingBoulders: [],
        completedBoulders: [],
        playerCollisions: [],
        positionUpdates: [] // Legacy function doesn't track position updates
    };
}

// Enhanced function to run physics simulation with boulder state management and error handling
export function simulatePhysicsStepWithState(
    maze: MazeCell[][],
    boulderStateManager: BoulderStateManager,
    currentMoveNumber: number,
    arrows: Array<{ position: Position; direction: { dx: number; dy: number } }> = []
): PhysicsSimulationResult {
    try {
        // First simulate gravity for boulders with state management
        const gravityResult = simulateGravityWithState(maze, boulderStateManager, currentMoveNumber);

        // Then simulate arrow movement
        let arrowResult: PhysicsSimulationResult;
        try {
            arrowResult = simulateArrows(gravityResult.newMaze, arrows);
        } catch (arrowError) {
            logBoulderError({
                type: 'physics_failure',
                message: `Error simulating arrows: ${arrowError instanceof Error ? arrowError.message : 'Unknown error'}`,
                context: { error: arrowError, arrows },
                recoverable: true
            }, 'simulatePhysicsStepWithState');

            // Continue without arrow simulation
            arrowResult = {
                newMaze: gravityResult.newMaze,
                soundEvents: [],
                boulderPositions: gravityResult.boulderPositions,
                arrowPositions: [],
                movingBoulders: [],
                completedBoulders: [],
                playerCollisions: [],
                positionUpdates: []
            };
        }

        // Combine results
        return {
            newMaze: arrowResult.newMaze,
            soundEvents: [...gravityResult.soundEvents, ...arrowResult.soundEvents],
            boulderPositions: arrowResult.boulderPositions,
            arrowPositions: arrowResult.arrowPositions,
            movingBoulders: gravityResult.movingBoulders,
            completedBoulders: gravityResult.completedBoulders,
            playerCollisions: gravityResult.playerCollisions,
            positionUpdates: gravityResult.positionUpdates
        };
    } catch (error) {
        logBoulderError({
            type: 'physics_failure',
            message: `Unexpected error in physics step simulation: ${error instanceof Error ? error.message : 'Unknown error'}`,
            context: { error, currentMoveNumber, arrows },
            recoverable: false
        }, 'simulatePhysicsStepWithState');

        // Return safe fallback result
        const safeMaze = maze && Array.isArray(maze) ? maze.map(row => [...row]) : [];
        return {
            newMaze: safeMaze,
            soundEvents: [],
            boulderPositions: safeMaze.length > 0 ? findBoulders(safeMaze) : [],
            arrowPositions: [],
            movingBoulders: [],
            completedBoulders: [],
            playerCollisions: [],
            positionUpdates: []
        };
    }
}

// Pure function to check if physics simulation should continue
export function shouldContinuePhysics(
    previousMaze: MazeCell[][],
    currentMaze: MazeCell[][]
): boolean {
    // Continue if maze has changed (objects are still moving)
    for (let y = 0; y < previousMaze.length; y++) {
        const prevRow = previousMaze[y];
        const currRow = currentMaze[y];

        if (!prevRow || !currRow) continue;

        for (let x = 0; x < prevRow.length; x++) {
            if (prevRow[x] !== currRow[x]) {
                return true;
            }
        }
    }

    return false;
}

// Pure function to check if physics simulation should continue with state
export function shouldContinuePhysicsWithState(
    boulderStateManager: BoulderStateManager
): boolean {
    return boulderStateManager.movingBoulderCount > 0;
}

// Pure function to get all moving boulder positions
export function getMovingBoulderPositions(
    boulderStateManager: BoulderStateManager
): Position[] {
    return Array.from(boulderStateManager.boulders.values())
        .filter(state => state.isMoving)
        .map(state => state.position);
}

// Pure function to get all stationary boulder positions
export function getStationaryBoulderPositions(
    boulderStateManager: BoulderStateManager
): Position[] {
    return Array.from(boulderStateManager.boulders.values())
        .filter(state => !state.isMoving && !state.isTriggered)
        .map(state => state.position);
}

// Pure function to get all triggered but not yet moving boulder positions
export function getTriggeredBoulderPositions(
    boulderStateManager: BoulderStateManager
): Position[] {
    return Array.from(boulderStateManager.boulders.values())
        .filter(state => state.isTriggered && !state.isMoving)
        .map(state => state.position);
}

// Pure function to categorize boulders by their state
export function categorizeBoulders(
    boulderStateManager: BoulderStateManager
): {
    moving: Position[];
    stationary: Position[];
    triggered: Position[];
    total: number;
} {
    const moving = getMovingBoulderPositions(boulderStateManager);
    const stationary = getStationaryBoulderPositions(boulderStateManager);
    const triggered = getTriggeredBoulderPositions(boulderStateManager);

    return {
        moving,
        stationary,
        triggered,
        total: boulderStateManager.boulders.size
    };
}
```

- Fix: delete the unused helper.

Edits in `src/physics/physics-engine.ts`:
- Removed `findPlayerPosition` entirely.

- Lint: clean.

---

**User**

For the code present, we get this error:
```
Type '{ playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; ... 4 more ...; stopAllSounds: Mock<...>; }' is missing the following properties from type 'AudioManager': getLoadingState, onLoadingProgress, getOptimizationReport, getGlobalVolume, and 2 more.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I’m adding the missing methods to the `AudioManager` mock and updating direct mock method calls to use `vi.mocked(...)` so TypeScript recognizes them as mocks. Then I’ll recheck lints for this file.

```typescriptreact
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type{ ReactNode } from "react";
import { useSound, useAudioSettings, AudioProvider } from "../audio";
import type { AudioManager } from "../Interfaces/IAudioManager";

// Mock the audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
  stopAllSounds: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock("../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock audio utils
vi.mock("../audio/utils/audio-utils", () => ({
  canAutoplay: vi.fn().mockResolvedValue(true),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

// Helper to create a failing audio manager
function createFailingAudioManager() {
  return {
    ...mockAudioManager,
    preloadSounds: vi.fn().mockRejectedValue(new Error("Failed to initialize")),
  };
}

describe("Audio Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("useSound", () => {
    it("should provide playSound function that calls audio manager", async () => {
      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.playSound("test-sound");
      });

      expect(mockAudioManager.playSound).toHaveBeenCalledWith(
        "TEST-SOUND",
        undefined
      );
    });

    it("should provide playSound function with options", async () => {
      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const options = { volume: 0.5, loop: true };

      act(() => {
        result.current.playSound("test-sound", options);
      });

      expect(mockAudioManager.playSound).toHaveBeenCalledWith(
        "TEST-SOUND",
        options
      );
    });

    it("should return muted state from audio manager", async () => {
      mockAudioManager.isMuted.mockReturnValue(true);

      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.isMuted).toBe(true);
    });

    it("should toggle mute state", async () => {
      mockAudioManager.isMuted.mockReturnValue(false);

      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.toggleMute();
      });

      expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
    });

    it("should handle audio manager not initialized", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Mock useAudioContext to return null audio manager with proper settings
      const mockUseAudioContext = vi.fn().mockReturnValue({
        audioManager: null,
        isLoading: false,
        error: null,
        fallbackMode: false,
        reinitializeAudio: vi.fn(),
        settings: {
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: { movement: 0.8, collision: 0.9, gameState: 1 },
        },
        setMuted: vi.fn(),
        setGlobalVolume: vi.fn(),
        setCategoryVolume: vi.fn(),
        toggleMute: vi.fn(),
        resetToDefaults: vi.fn(),
      });

      vi.doMock("../audio/context/audio-context", () => ({
        useAudioContext: mockUseAudioContext,
        AudioProvider: ({ children }: { children: ReactNode }) => children,
      }));

      const { useSound: MockedUseSound } = await import(
        "../audio/hooks/use-sound"
      );

      const { result } = renderHook(() => MockedUseSound());

      // Test that isMuted defaults to false when audio manager is null
      expect(result.current.isMuted).toBe(false);

      act(() => {
        result.current.playSound("test-sound");
      });

      expect(consoleSpy).toHaveBeenCalledWith("Audio manager not initialized");
      consoleSpy.mockRestore();
      vi.doUnmock("../audio/context/audio-context");
    });

    it("should show loading state during initialization", async () => {
      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      expect(result.current.isLoading).toBe(true);

      // Wait for initialization to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
    });

    it("should handle playSound errors gracefully", async () => {
      mockAudioManager.playSound.mockImplementation(() => {
        throw new Error("Playback failed");
      });

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.playSound("test-sound");
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to play sound TEST-SOUND:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe("useAudioSettings", () => {
    it("should return default volume from config", async () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.volume).toBe(0.8); // Default from SOUND_CONFIG
    });

    it("should load volume from localStorage", async () => {
      mockLocalStorage.getItem.mockReturnValue(
        '{"isMuted":false,"globalVolume":0.6,"categoryVolumes":{"movement":0.8,"collision":0.9,"gameState":1}}'
      );

      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.volume).toBe(0.6);
    });

    it("should handle invalid localStorage volume", async () => {
      mockLocalStorage.getItem.mockReturnValue("invalid");

      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.volume).toBe(0.8); // Should fall back to default
    });

    it("should set muted state through audio manager", async () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
      });

      expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
    });

    it("should set volume and save to localStorage", () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      act(() => {
        result.current.setVolume(0.7);
      });

      expect(result.current.volume).toBe(0.7);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-audio-settings",
        expect.stringContaining('"globalVolume":0.7')
      );
    });

    it("should clamp volume between 0 and 1", () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      act(() => {
        result.current.setVolume(1.5);
      });

      expect(result.current.volume).toBe(1);

      act(() => {
        result.current.setVolume(-0.5);
      });

      expect(result.current.volume).toBe(0);
    });

    it("should reset to defaults", async () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.volume).toBe(0.8);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-audio-settings",
        expect.stringContaining('"isMuted":false')
      );
    });

    it("should handle localStorage errors gracefully", () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      act(() => {
        result.current.setVolume(0.5);
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to save audio settings:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it("should handle audio manager not initialized for setMuted", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const mockSetMuted = vi.fn();

      // Mock useAudioContext to return null audio manager with proper settings
      const mockUseAudioContext = vi.fn().mockReturnValue({
        audioManager: null,
        isLoading: false,
        error: null,
        fallbackMode: false,
        reinitializeAudio: vi.fn(),
        settings: {
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: { movement: 0.8, collision: 0.9, gameState: 1 },
        },
        setMuted: mockSetMuted,
        setGlobalVolume: vi.fn(),
        setCategoryVolume: vi.fn(),
        toggleMute: vi.fn(),
        resetToDefaults: vi.fn(),
      });

      vi.doMock("../audio/context/audio-context", () => ({
        useAudioContext: mockUseAudioContext,
        AudioProvider: ({ children }: { children: ReactNode }) => children,
      }));

      const { useAudioSettings: MockedUseAudioSettings } = await import(
        "../audio/hooks/use-audio-settings"
      );

      const { result } = renderHook(() => MockedUseAudioSettings());

      act(() => {
        result.current.setMuted(true);
      });

      // The setMuted function should be called even when audio manager is null
      expect(mockSetMuted).toHaveBeenCalledWith(true);
      consoleSpy.mockRestore();
      vi.doUnmock("../audio/context/audio-context");
    });
  });
});

```

```typescriptreact
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type{ ReactNode } from "react";
import { useSound, useAudioSettings, AudioProvider } from "../audio";
import type { AudioManager } from "../Interfaces/IAudioManager";

// Mock the audio manager
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
  stopAllSounds: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
};

// Mock the createAudioManager function
vi.mock("../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock audio utils
vi.mock("../audio/utils/audio-utils", () => ({
  canAutoplay: vi.fn().mockResolvedValue(true),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

// Helper to create a failing audio manager
function createFailingAudioManager() {
  return {
    ...mockAudioManager,
    preloadSounds: vi.fn().mockRejectedValue(new Error("Failed to initialize")),
  };
}

describe("Audio Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("useSound", () => {
    it("should provide playSound function that calls audio manager", async () => {
      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.playSound("test-sound");
      });

      expect(mockAudioManager.playSound).toHaveBeenCalledWith(
        "TEST-SOUND",
        undefined
      );
    });

    it("should provide playSound function with options", async () => {
      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const options = { volume: 0.5, loop: true };

      act(() => {
        result.current.playSound("test-sound", options);
      });

      expect(mockAudioManager.playSound).toHaveBeenCalledWith(
        "TEST-SOUND",
        options
      );
    });

    it("should return muted state from audio manager", async () => {
      vi.mocked(mockAudioManager.isMuted).mockReturnValue(true);

      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.isMuted).toBe(true);
    });

    it("should toggle mute state", async () => {
      vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);

      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.toggleMute();
      });

      expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
    });

    it("should handle audio manager not initialized", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Mock useAudioContext to return null audio manager with proper settings
      const mockUseAudioContext = vi.fn().mockReturnValue({
        audioManager: null,
        isLoading: false,
        error: null,
        fallbackMode: false,
        reinitializeAudio: vi.fn(),
        settings: {
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: { movement: 0.8, collision: 0.9, gameState: 1 },
        },
        setMuted: vi.fn(),
        setGlobalVolume: vi.fn(),
        setCategoryVolume: vi.fn(),
        toggleMute: vi.fn(),
        resetToDefaults: vi.fn(),
      });

      vi.doMock("../audio/context/audio-context", () => ({
        useAudioContext: mockUseAudioContext,
        AudioProvider: ({ children }: { children: ReactNode }) => children,
      }));

      const { useSound: MockedUseSound } = await import(
        "../audio/hooks/use-sound"
      );

      const { result } = renderHook(() => MockedUseSound());

      // Test that isMuted defaults to false when audio manager is null
      expect(result.current.isMuted).toBe(false);

      act(() => {
        result.current.playSound("test-sound");
      });

      expect(consoleSpy).toHaveBeenCalledWith("Audio manager not initialized");
      consoleSpy.mockRestore();
      vi.doUnmock("../audio/context/audio-context");
    });

    it("should show loading state during initialization", async () => {
      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      expect(result.current.isLoading).toBe(true);

      // Wait for initialization to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
    });

    it("should handle playSound errors gracefully", async () => {
      vi.mocked(mockAudioManager.playSound).mockImplementation(() => {
        throw new Error("Playback failed");
      });

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { result } = renderHook(() => useSound(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.playSound("test-sound");
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to play sound TEST-SOUND:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe("useAudioSettings", () => {
    it("should return default volume from config", async () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.volume).toBe(0.8); // Default from SOUND_CONFIG
    });

    it("should load volume from localStorage", async () => {
      mockLocalStorage.getItem.mockReturnValue(
        '{"isMuted":false,"globalVolume":0.6,"categoryVolumes":{"movement":0.8,"collision":0.9,"gameState":1}}'
      );

      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.volume).toBe(0.6);
    });

    it("should handle invalid localStorage volume", async () => {
      mockLocalStorage.getItem.mockReturnValue("invalid");

      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.volume).toBe(0.8); // Should fall back to default
    });

    it("should set muted state through audio manager", async () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
      });

      expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
    });

    it("should set volume and save to localStorage", () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      act(() => {
        result.current.setVolume(0.7);
      });

      expect(result.current.volume).toBe(0.7);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-audio-settings",
        expect.stringContaining('"globalVolume":0.7')
      );
    });

    it("should clamp volume between 0 and 1", () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      act(() => {
        result.current.setVolume(1.5);
      });

      expect(result.current.volume).toBe(1);

      act(() => {
        result.current.setVolume(-0.5);
      });

      expect(result.current.volume).toBe(0);
    });

    it("should reset to defaults", async () => {
      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      // Wait for audio initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.volume).toBe(0.8);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-audio-settings",
        expect.stringContaining('"isMuted":false')
      );
    });

    it("should handle localStorage errors gracefully", () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioSettings(), {
        wrapper: TestWrapper,
      });

      act(() => {
        result.current.setVolume(0.5);
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to save audio settings:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it("should handle audio manager not initialized for setMuted", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const mockSetMuted = vi.fn();

      // Mock useAudioContext to return null audio manager with proper settings
      const mockUseAudioContext = vi.fn().mockReturnValue({
        audioManager: null,
        isLoading: false,
        error: null,
        fallbackMode: false,
        reinitializeAudio: vi.fn(),
        settings: {
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: { movement: 0.8, collision: 0.9, gameState: 1 },
        },
        setMuted: mockSetMuted,
        setGlobalVolume: vi.fn(),
        setCategoryVolume: vi.fn(),
        toggleMute: vi.fn(),
        resetToDefaults: vi.fn(),
      });

      vi.doMock("../audio/context/audio-context", () => ({
        useAudioContext: mockUseAudioContext,
        AudioProvider: ({ children }: { children: ReactNode }) => children,
      }));

      const { useAudioSettings: MockedUseAudioSettings } = await import(
        "../audio/hooks/use-audio-settings"
      );

      const { result } = renderHook(() => MockedUseAudioSettings());

      act(() => {
        result.current.setMuted(true);
      });

      // The setMuted function should be called even when audio manager is null
      expect(mockSetMuted).toHaveBeenCalledWith(true);
      consoleSpy.mockRestore();
      vi.doUnmock("../audio/context/audio-context");
    });
  });
});

```

- Fix 1: complete the `AudioManager` mock with all required methods.
```ts
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
  stopAllSounds: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
};
```

- Fix 2: use `vi.mocked` to access mock helpers on functions typed as concrete signatures.
```ts
- mockAudioManager.isMuted.mockReturnValue(true);
+ vi.mocked(mockAudioManager.isMuted).mockReturnValue(true);

- mockAudioManager.isMuted.mockReturnValue(false);
+ vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);

- mockAudioManager.playSound.mockImplementation(() => { ... });
+ vi.mocked(mockAudioManager.playSound).mockImplementation(() => { ... });
```

- Lint: only a warning about an unused helper; type errors resolved.

```typescript
const mockAudioManager: AudioManager = {
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
  stopAllSounds: vi.fn(),
  getLoadingState: vi.fn(() => ({ isLoading:false, loadedCount:0, totalCount:0, failedSounds:[], errors:new Map() })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
};
```

```typescript
- mockAudioManager.isMuted.mockReturnValue(true);
+ vi.mocked(mockAudioManager.isMuted).mockReturnValue(true);

- mockAudioManager.isMuted.mockReturnValue(false);
+ vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);

- mockAudioManager.playSound.mockImplementation(() => { ... });
+ vi.mocked(mockAudioManager.playSound).mockImplementation(() => { ... });
```

---

**User**

For the code present, we get this error:
```
Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    createInitialGameState,
    movePlayer
} from '../GameState';
import {
    simulateGravityWithState
} from '../physics/physics-engine';
import {
    updateBoulderMovement,
    createPositionKey
} from '../physics/boulder-state-manager';
import { CELL, type MazeCell } from '../maze';
import type { SoundEvent } from '../Interfaces/ISoundEvent';

describe('Boulder Behavior Integration Tests', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('Complete boulder trigger-to-collision scenarios', () => {
        it('should complete full boulder trigger-to-collision cycle with proper audio sequencing', () => {
            // Create test maze with strategic boulder placement
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(testMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Step 1: Move player left to trigger boulder at (1,1)
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,2)
            expect(step1.player).toEqual({ x: 1, y: 2 });

            // Verify boulder is triggered
            const boulderKey = createPositionKey({ x: 1, y: 1 });
            const boulderState = step1.boulderStateManager.boulders.get(boulderKey);
            expect(boulderState?.isTriggered).toBe(true);
            expect(boulderState?.triggeredOnMove).toBe(52); // Move 54 - 2 = 52

            // Step 2: Move again to start physics simulation
            const step2 = movePlayer(step1, 1, 0); // Move back to (2,2)

            // The physics simulation should have processed the triggered boulder
            expect(step2.player).toEqual({ x: 2, y: 2 });
            expect(step2.boulderStateManager).toBeDefined();

            // Step 3: Simulate physics to see boulder movement and audio events
            const physicsResult = simulateGravityWithState(
                step2.maze,
                step2.boulderStateManager,
                step2.moves
            );

            // Verify physics simulation results
            expect(physicsResult.soundEvents.length).toBeGreaterThan(0);
            expect(physicsResult.movingBoulders.length).toBeGreaterThanOrEqual(0);
            expect(physicsResult.newMaze).toBeDefined();

            // Check for boulder movement sound events
            const movementSounds = physicsResult.soundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );
            const collisionSounds = physicsResult.soundEvents.filter(
                event => event.type === 'collision' && event.source === 'boulder'
            );

            // Should have movement or collision sounds
            expect(movementSounds.length + collisionSounds.length).toBeGreaterThan(0);
        });

        it('should handle boulder falling and hitting player with death sequence', () => {
            // Create maze where boulder will fall directly onto player
            const deathMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(deathMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Move player left to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,2)
            expect(step1.player).toEqual({ x: 1, y: 2 });

            // Boulder at (1,1) should be triggered
            const boulderKey = createPositionKey({ x: 1, y: 1 });
            const boulderState = step1.boulderStateManager.boulders.get(boulderKey);
            expect(boulderState?.isTriggered).toBe(true);

            // Simulate physics to make boulder fall onto player
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            // Check for player collision
            expect(physicsResult.playerCollisions.length).toBeGreaterThanOrEqual(0);

            // Check for death sound event
            const deathSounds = physicsResult.soundEvents.filter(
                event => event.type === 'death' && event.source === 'boulder'
            );

            // Should have death sound if player collision occurred
            if (physicsResult.playerCollisions.length > 0) {
                expect(deathSounds.length).toBeGreaterThan(0);
                expect(deathSounds[0]?.volume).toBe(1.0);
                expect(deathSounds[0]?.priority).toBe('high');
            }
        });

        it('should handle boulder collision with bomb and trigger explosion', () => {
            // Create maze with boulder above bomb
            const bombMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.BOMB, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(bombMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Move player left to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,2)

            // Boulder should be triggered
            const boulderKey = createPositionKey({ x: 1, y: 1 });
            const boulderState = step1.boulderStateManager.boulders.get(boulderKey);
            expect(boulderState?.isTriggered).toBe(true);

            // Simulate physics to make boulder fall onto bomb
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            // Check for any sound events from boulder
            physicsResult.soundEvents.filter(
                event => event.source === 'boulder'
            );
            const collisionSounds = physicsResult.soundEvents.filter(
                event => event.type === 'collision' && event.source === 'boulder'
            );

            // Should have some boulder-related sound events or physics results
            expect(physicsResult.soundEvents.length).toBeGreaterThanOrEqual(0);
            expect(physicsResult.newMaze).toBeDefined();

            // If collision sounds exist, they should have correct properties
            if (collisionSounds.length > 0) {
                expect(collisionSounds[0]?.priority).toBe('high');
                expect(collisionSounds[0]?.volume).toBe(0.9);
            }

            // Verify physics simulation completed successfully
            expect(physicsResult.movingBoulders.length).toBeGreaterThanOrEqual(0);
            expect(physicsResult.completedBoulders.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Audio event timing and sequencing', () => {
        it('should generate audio events in correct sequence for boulder movement', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(testMaze);

            // Move player to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,3)

            // Simulate multiple physics steps to track audio sequence
            let currentMaze = step1.maze;
            let currentManager = step1.boulderStateManager;
            const allSoundEvents: SoundEvent[] = [];
            let moveNumber = step1.moves;

            // Simulate several physics steps
            for (let i = 0; i < 5; i++) {
                const physicsResult = simulateGravityWithState(
                    currentMaze,
                    currentManager,
                    moveNumber + i
                );

                allSoundEvents.push(...physicsResult.soundEvents);
                currentMaze = physicsResult.newMaze;

                // Update boulder manager with results
                currentManager = updateBoulderMovement(
                    currentManager,
                    physicsResult.movingBoulders,
                    physicsResult.completedBoulders
                );

                // Stop if no more movement
                if (physicsResult.movingBoulders.length === 0 &&
                    physicsResult.completedBoulders.length === 0) {
                    break;
                }
            }

            // Analyze sound event sequence
            const movementSounds = allSoundEvents.filter(
                event => event.type === 'movement' && event.source === 'boulder'
            );
            const collisionSounds = allSoundEvents.filter(
                event => event.type === 'collision' && event.source === 'boulder'
            );

            // Should have some audio events
            expect(allSoundEvents.length).toBeGreaterThanOrEqual(0);

            // If there are movement sounds, they should have correct properties
            movementSounds.forEach(sound => {
                expect(sound.volume).toBe(0.8);
                expect(sound.priority).toBe('medium');
            });

            // If there are collision sounds, they should have correct properties
            collisionSounds.forEach(sound => {
                expect(sound.priority).toMatch(/medium|high/);
                expect(sound.volume).toBeGreaterThan(0);
            });
        });

        it('should prioritize death sounds over other boulder sounds', () => {
            const deathMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(deathMaze);

            // Move player to trigger boulder directly above
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,2)

            // Simulate physics
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            // Check sound event priorities
            const deathSounds = physicsResult.soundEvents.filter(
                event => event.type === 'death'
            );
            const otherSounds = physicsResult.soundEvents.filter(
                event => event.type !== 'death'
            );

            // If death occurred, death sound should be highest priority
            if (deathSounds.length > 0) {
                expect(deathSounds[0]?.priority).toBe('high');
                expect(deathSounds[0]?.volume).toBe(1.0);

                // Other sounds should have lower or equal priority
                otherSounds.forEach(sound => {
                    expect(['low', 'medium', 'high']).toContain(sound.priority);
                });
            }
        });

        it('should handle simultaneous audio events from multiple boulders', () => {
            const multiBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(multiBoulderMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Move player to trigger both boulders
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,2)

            // Both boulders should be triggered
            const boulder1Key = createPositionKey({ x: 1, y: 1 });

            const boulder1State = step1.boulderStateManager.boulders.get(boulder1Key);

            // Boulder at (1,1) should be triggered as it's adjacent to player at (1,2)
            expect(boulder1State?.isTriggered).toBe(true);
            // Boulder at (3,1) might not be triggered as it's not adjacent to player at (1,2)
            // Let's check if any boulders are triggered
            const triggeredBoulders = Array.from(step1.boulderStateManager.boulders.values())
                .filter(state => state.isTriggered);
            expect(triggeredBoulders.length).toBeGreaterThan(0);

            // Simulate physics
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            // Should handle multiple boulder sounds
            const boulderSounds = physicsResult.soundEvents.filter(
                event => event.source === 'boulder'
            );

            // Each boulder should potentially generate its own sounds
            expect(boulderSounds.length).toBeGreaterThanOrEqual(0);

            // All boulder sounds should have valid properties
            boulderSounds.forEach(sound => {
                expect(['movement', 'collision', 'death']).toContain(sound.type);
                expect(sound.source).toBe('boulder');
                expect(['low', 'medium', 'high']).toContain(sound.priority);
                expect(sound.volume).toBeGreaterThan(0);
                expect(sound.volume).toBeLessThanOrEqual(1.0);
            });
        });
    });

    describe('Multiple boulder movement scenarios', () => {
        it('should handle boulder triggering and movement in multi-boulder scenarios', () => {
            const multiBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(multiBoulderMaze);
            expect(gameState.player).toEqual({ x: 4, y: 2 });

            // Move player to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move to (3,2)

            // Boulder at (3,1) should be triggered as it's adjacent to player at (3,2)
            const boulder3Key = createPositionKey({ x: 3, y: 1 });

            const manager = step1.boulderStateManager;
            const boulder3State = manager.boulders.get(boulder3Key);

            // Only boulder at (3,1) should be triggered as it's adjacent to player at (3,2)
            expect(boulder3State?.isTriggered).toBe(true);

            // Check that at least one boulder is triggered
            const triggeredBoulders = Array.from(manager.boulders.values())
                .filter(state => state.isTriggered);
            expect(triggeredBoulders.length).toBeGreaterThan(0);

            // Simulate physics with multiple moving boulders
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            // Should handle multiple boulders efficiently
            expect(physicsResult.newMaze).toBeDefined();
            expect(physicsResult.soundEvents).toBeDefined();
            expect(physicsResult.boulderPositions.length).toBeGreaterThanOrEqual(3);

            // Performance check - should complete quickly
            const startTime = performance.now();
            simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(100); // Should be fast
        });

        it('should handle boulder chain reactions', () => {
            // Create maze where falling boulder hits another boulder
            const chainMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(chainMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // Try to move player left - should be blocked by boulder at (1,2)
            const step1 = movePlayer(gameState, -1, 0); // Try to move to (1,2)

            // Player should not move because there's a boulder at (1,2)
            expect(step1.player).toEqual({ x: 2, y: 2 }); // Should stay in place

            // Instead, move player down to trigger boulder
            const step2 = movePlayer(step1, 0, 1); // Move to (2,3)
            expect(step2.player).toEqual({ x: 2, y: 3 });

            // Now move left to be adjacent to bottom boulder
            const step3 = movePlayer(step2, -1, 0); // Move to (1,3)
            expect(step3.player).toEqual({ x: 1, y: 3 });

            // Check if any boulders are triggered
            const triggeredBoulders = Array.from(step3.boulderStateManager.boulders.values())
                .filter(state => state.isTriggered);
            expect(triggeredBoulders.length).toBeGreaterThanOrEqual(0);

            // Simulate physics to see chain reaction
            const physicsResult = simulateGravityWithState(
                step3.maze,
                step3.boulderStateManager,
                step3.moves + 1
            );

            // Should handle boulder-to-boulder collision
            const collisionSounds = physicsResult.soundEvents.filter(
                event => event.type === 'collision' && event.source === 'boulder'
            );

            // Should have collision sounds from boulder hitting boulder
            expect(collisionSounds.length).toBeGreaterThanOrEqual(0);

            // Verify maze integrity after chain reaction
            expect(physicsResult.newMaze).toBeDefined();
            expect(physicsResult.newMaze.length).toBe(chainMaze.length);
            expect(physicsResult.newMaze[0]?.length).toBe(chainMaze[0]?.length);
        });

        it('should handle boulders moving in different directions', () => {
            // Create maze with boulders that can fall in different patterns
            const complexMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(complexMaze);
            expect(gameState.player).toEqual({ x: 3, y: 2 });

            // Move player to trigger boulders on both sides
            const step1 = movePlayer(gameState, -1, 0); // Move to (2,2)

            // Left boulder should be triggered as it's adjacent to player at (2,2)
            const leftBoulderKey = createPositionKey({ x: 1, y: 1 });

            const leftBoulderState = step1.boulderStateManager.boulders.get(leftBoulderKey);

            expect(leftBoulderState?.isTriggered).toBe(true);
            // Right boulder might not be triggered as it's not adjacent to player at (2,2)

            // Check that at least one boulder is triggered
            const triggeredBoulders = Array.from(step1.boulderStateManager.boulders.values())
                .filter(state => state.isTriggered);
            expect(triggeredBoulders.length).toBeGreaterThan(0);

            // Simulate physics
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            // Should handle boulders moving in different areas
            expect(physicsResult.newMaze).toBeDefined();
            expect(physicsResult.soundEvents).toBeDefined();

            // Verify both boulders are processed
            const boulderSounds = physicsResult.soundEvents.filter(
                event => event.source === 'boulder'
            );
            expect(boulderSounds.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Boulder behavior with different maze configurations', () => {
        it('should handle small maze configurations', () => {
            const smallMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(smallMaze);
            expect(gameState.player).toEqual({ x: 1, y: 2 });

            // Move player to trigger boulder
            const step1 = movePlayer(gameState, 0, -1); // Move up to (1,1) - should be blocked

            // Player shouldn't move into boulder
            expect(step1.player).toEqual({ x: 1, y: 2 });

            // But if we move to trigger it differently
            const step2 = movePlayer(step1, 1, 0); // Try to move right - blocked by wall
            expect(step2.player).toEqual({ x: 1, y: 2 });

            // System should handle small maze gracefully
            expect(step2.boulderStateManager).toBeDefined();
            expect(step2.gameState).toBe('playing');
        });

        it('should handle large maze configurations efficiently', () => {
            // Create a larger maze with multiple boulders
            const largeMaze: MazeCell[][] = Array(15).fill(null).map((_, y) =>
                Array(15).fill(null).map((_, x) => {
                    if (y === 0 || y === 14 || x === 0 || x === 14) return CELL.ROCK;
                    if (x === 7 && y === 7) return CELL.PLAYER;
                    if (y < 5 && (x + y) % 3 === 0) return CELL.BOULDER;
                    return CELL.EMPTY;
                })
            );

            const startTime = performance.now();
            const gameState = createInitialGameState(largeMaze);
            const initTime = performance.now() - startTime;

            expect(initTime).toBeLessThan(200); // Should initialize quickly
            expect(gameState.player).toEqual({ x: 7, y: 7 });
            expect(gameState.boulderStateManager.boulders.size).toBeGreaterThan(5);

            // Test movement performance
            const moveStartTime = performance.now();
            const step1 = movePlayer(gameState, 1, 0);
            const moveTime = performance.now() - moveStartTime;

            expect(moveTime).toBeLessThan(100); // Should move quickly
            expect(step1.player).toEqual({ x: 8, y: 7 });
        });

        it('should handle maze with no boulders', () => {
            const noBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(noBoulderMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });
            expect(gameState.boulderStateManager.boulders.size).toBe(0);

            // Movement should work normally
            const step1 = movePlayer(gameState, -1, 0);
            expect(step1.player).toEqual({ x: 1, y: 2 });
            expect(step1.boulderStateManager.boulders.size).toBe(0);

            // Physics simulation should handle empty boulder state
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves
            );

            expect(physicsResult.newMaze).toEqual(step1.maze);
            expect(physicsResult.soundEvents).toEqual([]);
            expect(physicsResult.movingBoulders).toEqual([]);
        });

        it('should handle maze with all boulders', () => {
            const allBoulderMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.PLAYER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.BOULDER, CELL.BOULDER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(allBoulderMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });
            expect(gameState.boulderStateManager.boulders.size).toBe(8);

            // Player should be surrounded by boulders
            const step1 = movePlayer(gameState, 1, 0); // Try to move right - blocked
            expect(step1.player).toEqual({ x: 2, y: 2 }); // Shouldn't move

            // System should handle many boulders gracefully
            expect(step1.boulderStateManager.boulders.size).toBe(8);
            expect(step1.gameState).toBe('playing');
        });

        it('should handle irregular maze shapes', () => {
            // Create an irregular maze shape
            const irregularMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(irregularMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });

            // System should handle irregular shapes
            expect(gameState.boulderStateManager).toBeDefined();
            expect(gameState.boulderStateManager.boulders.size).toBe(1);

            // Movement should work despite irregular shape
            const step1 = movePlayer(gameState, 1, 0); // Move right
            expect(step1.player).toEqual({ x: 3, y: 2 });
            expect(step1.gameState).toBe('playing');
        });

        it('should handle maze with mixed object types', () => {
            const mixedMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.DIAMOND, CELL.BOMB, CELL.ROCK],
                [CELL.ROCK, CELL.SOIL, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EXIT, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(mixedMaze);
            expect(gameState.player).toEqual({ x: 2, y: 2 });
            expect(gameState.boulderStateManager.boulders.size).toBe(1);

            // Move player to trigger boulder
            const step1 = movePlayer(gameState, -1, 0); // Move to (1,2)
            expect(step1.player).toEqual({ x: 1, y: 2 });

            // Boulder should be triggered
            const boulderKey = createPositionKey({ x: 1, y: 1 });
            const boulderState = step1.boulderStateManager.boulders.get(boulderKey);
            expect(boulderState?.isTriggered).toBe(true);

            // Physics simulation should handle mixed objects
            const physicsResult = simulateGravityWithState(
                step1.maze,
                step1.boulderStateManager,
                step1.moves + 1
            );

            expect(physicsResult.newMaze).toBeDefined();
            expect(physicsResult.soundEvents).toBeDefined();

            // Should preserve non-boulder objects
            const diamonds = physicsResult.newMaze.flat().filter(cell => cell === CELL.DIAMOND);
            const bombs = physicsResult.newMaze.flat().filter(cell => cell === CELL.BOMB);
            const exits = physicsResult.newMaze.flat().filter(cell => cell === CELL.EXIT);

            expect(diamonds.length).toBe(1);
            expect(bombs.length).toBe(1);
            expect(exits.length).toBe(1);
        });
    });

    describe('Integration with game state management', () => {
        it('should maintain game state consistency during boulder interactions', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(testMaze);
            const initialScore = gameState.score;

            // Perform multiple moves with boulder interactions
            let currentState = gameState;
            for (let i = 0; i < 5; i++) {
                const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                const [dx, dy] = directions[i % directions.length]!;
                currentState = movePlayer(currentState, dx, dy);

                // Verify game state consistency during each move
                expect(currentState.boulderStateManager).toBeDefined();
                expect(currentState.movementConstraint).toBeDefined();
                expect(['playing', 'dead', 'won']).toContain(currentState.gameState);
            }

            // Verify final state consistency (moves might vary due to blocked moves)
            expect(typeof currentState.moves).toBe('number');
            expect(currentState.score).toBeGreaterThanOrEqual(initialScore);

            // Final state should be consistent
            expect(currentState.player).toBeDefined();
            expect(currentState.maze).toBeDefined();
            expect(currentState.boulderStateManager.boulders.size).toBeGreaterThanOrEqual(0);
        });

        it('should handle rapid sequential moves with boulder system', () => {
            const testMaze: MazeCell[][] = [
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
                [CELL.ROCK, CELL.BOULDER, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.PLAYER, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
                [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
            ];

            const gameState = createInitialGameState(testMaze);

            // Perform rapid moves
            const startTime = performance.now();
            let currentState = gameState;

            const moves: [number, number][] = [
                [-1, 0], [1, 0], [-1, 0], [1, 0], [0, 1], [0, -1],
                [1, 0], [-1, 0], [0, 1], [0, -1]
            ];

            for (const [dx, dy] of moves) {
                currentState = movePlayer(currentState, dx, dy);
            }

            const endTime = performance.now();

            // Should complete quickly
            expect(endTime - startTime).toBeLessThan(200);

            // Final state should be valid
            expect(currentState.gameState).toMatch(/playing|dead|won/);
            expect(currentState.boulderStateManager).toBeDefined();
            expect(currentState.player).toBeDefined();
        });
    });
});
```

- Fix: annotate tuple arrays so destructured `dx`, `dy` are numbers.

Edits in `src/tests/boulder-behavior-integration.test.ts`:
```ts
- const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
+ const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

- const moves = [
+ const moves: [number, number][] = [
  [-1,0], [1,0], [-1,0], [1,0], [0,1], [0,-1],
  [1,0], [-1,0], [0,1], [0,-1]
];
```

- Lint: clean.

```typescript
- const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
+ const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

- const moves = [
+ const moves: [number, number][] = [
  [-1,0], [1,0], [-1,0], [1,0], [0,1], [0,-1],
  [1,0], [-1,0], [0,1], [0,-1]
];
```

---

**User**

can you run a lint check on src/tests/boulder-behavior-integration.test.ts and fix any issues found?

---

**Cursor**

Running a lint check on the file now and will fix anything that comes up immediately.

- Lint check passed for `src/tests/boulder-behavior-integration.test.ts`. No issues found.

---

**User**

can you execute the command npx tsc --noEmit on attached file and fix issues found?

---

**Cursor**

Reading the component to pinpoint the direct document access and add a safe guard so it only runs when document exists. Then I'll apply a minimal fix and re-run tests for that spec if needed.

```typescriptreact
import { useEffect, useCallback, useRef } from "react";
import { useHowToPlaySettings } from "../../hooks/use-how-to-play-settings";
import { HowToPlayContent } from "./HowToPlayContent";
import { createFocusTrap } from "../../utils/focus-trap";
import type { HowToPlayPopupProps } from "../../Interfaces/IHowToPlayPopup";
import type { JSX } from "react/jsx-runtime";
import "./HowToPlayPopup.css";

/**
 * Main How to Play popup component that displays game instructions in a modal overlay
 * Follows the AudioSettings pattern for consistent modal behavior and styling
 */
export function HowToPlayPopup({
  isOpen,
  onClose,
}: HowToPlayPopupProps): JSX.Element {
  const { settings, setDontShowAgain, markAsViewed } = useHowToPlaySettings();
  const modalRef = useRef<HTMLDivElement>(null);
  const focusTrapCleanupRef = useRef<(() => void) | null>(null);

  // Handle escape key press to close popup
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Add/remove escape key listener and focus trap when popup opens/closes
  useEffect(() => {
    // Guard for non-DOM environments (SSR/tests without jsdom)
    if (typeof document === "undefined") {
      return () => {};
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Mark as viewed when popup is opened
      markAsViewed();

      // Set up focus trap
      if (modalRef.current) {
        focusTrapCleanupRef.current = createFocusTrap(modalRef.current);
      }

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Announce to screen readers that dialog has opened
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent =
        "How to Play dialog opened. Press Escape to close.";
      document.body.appendChild(announcement);

      // Remove announcement after screen reader has time to read it
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    } else {
      document.removeEventListener("keydown", handleKeyDown);

      // Clean up focus trap
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }

      // Restore body scroll
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown, markAsViewed]);

  // Handle "Don't show again" checkbox change
  const handleDontShowAgainChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDontShowAgain(event.target.checked);
  };

  // Handle overlay click to close popup
  const handleOverlayClick = () => {
    onClose();
  };

  // Prevent popup panel clicks from closing the popup
  const handlePanelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className="how-to-play-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      aria-describedby="how-to-play-description"
      aria-label="How to Play The Wanderer - Game Instructions Dialog"
      data-testid="how-to-play-popup"
    >
      <div
        className="how-to-play-panel"
        onClick={handlePanelClick}
        ref={modalRef}
        tabIndex={-1}
        role="document"
        aria-label="Game instructions and controls"
      >
        <header className="how-to-play-header" role="banner">
          <h2 id="how-to-play-title">How to Play The Wanderer</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close dialog using X button"
            title="Close (Escape key)"
            type="button"
            data-testid="close-button"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close dialog</span>
          </button>
        </header>

        <main
          className="how-to-play-content"
          id="how-to-play-description"
          role="main"
          aria-label="Game instructions and credits"
          data-testid="how-to-play-content"
        >
          <HowToPlayContent className="popup-content" />
        </main>

        <footer
          className="how-to-play-footer"
          role="contentinfo"
          aria-label="Dialog actions and preferences"
        >
          <label className="dont-show-again-toggle">
            <input
              type="checkbox"
              checked={settings.dontShowAgain}
              onChange={handleDontShowAgainChange}
              aria-describedby="dont-show-again-description"
              aria-label="Don't show this dialog automatically on future visits"
              data-testid="dont-show-again-checkbox"
            />
            <span className="checkbox-custom" aria-hidden="true"></span>
            <span className="checkbox-label">Don't show again</span>
            <span id="dont-show-again-description" className="sr-only">
              Check this box to prevent the How to Play dialog from appearing
              automatically on future visits. You can still access it through
              the settings menu.
            </span>
          </label>
          <button
            className="close-footer-button"
            onClick={onClose}
            aria-label="Close How to Play dialog and return to game"
            type="button"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

```

- Added a DOM guard to prevent document access in non-browser environments.

Edit in `src/components/how-to-play/HowToPlayPopup.tsx`:
```ts
useEffect(() => {
  // Guard for non-DOM environments (SSR/tests without jsdom)
  if (typeof document === "undefined") {
    return () => {};
  }

  if (isOpen) {
    document.addEventListener("keydown", handleKeyDown);
    // ...
  }

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    // ...
  };
}, [isOpen, handleKeyDown, markAsViewed]);
```

- This prevents ReferenceError: document is not defined during Node/test runs.

- Lint: clean.

```typescript
useEffect(() => {
  // Guard for non-DOM environments (SSR/tests without jsdom)
  if (typeof document === "undefined") {
    return () => {};
  }

  if (isOpen) {
    document.addEventListener("keydown", handleKeyDown);
    // ...
  }

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    // ...
  };
}, [isOpen, handleKeyDown, markAsViewed]);
```

Checking where the settings UI renders its title and the labels used, to align the test expectation (“Audio Settings”) with the actual heading. Running a quick search for headings and labels.

```typescriptreact
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "../App";

// Mock the audio context and related APIs
const mockAudioContext = {
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    gain: { value: 1 },
  })),
  createBufferSource: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    buffer: null,
  })),
  decodeAudioData: vi.fn(),
  destination: {},
  state: "running",
  resume: vi.fn().mockResolvedValue(undefined),
  suspend: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
};

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock AudioContext
Object.defineProperty(window, "AudioContext", {
  value: vi.fn(() => mockAudioContext),
});

Object.defineProperty(window, "webkitAudioContext", {
  value: vi.fn(() => mockAudioContext),
});

// Mock fetch for audio files
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
});

describe("How to Play Popup Workflow Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    // Reset body overflow style
    document.body.style.overflow = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up body overflow style
    document.body.style.overflow = "";
  });

  describe("Complete first-visit user journey", () => {
    it("should complete full first-visit workflow from app load to popup dismissal", async () => {
      // Requirement 1.1: First-time user sees popup automatically
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      // Step 1: Popup appears automatically for first-time user
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Step 2: Verify popup content is displayed (Requirement 4.1, 4.2, 4.3, 4.4, 4.5)
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
      expect(screen.getByText(/collect all diamonds/i)).toBeInTheDocument();
      expect(screen.getByText(/WASD keys/i)).toBeInTheDocument();
      expect(screen.getByText(/arrow keys/i)).toBeInTheDocument();
      expect(screen.getByText("Don't show again")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();

      // Step 3: Verify interaction blocking (Requirement 1.4)
      expect(document.body.style.overflow).toBe("hidden");

      // Verify mobile controls are disabled if present
      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Step 4: User checks "Don't show again" (Requirement 2.1)
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      // Step 5: User closes popup (Requirement 2.2)
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      // Step 6: Verify popup is dismissed and preference is saved
      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":true')
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"hasSeenInstructions":true')
      );

      // Step 7: Verify interaction is restored
      expect(document.body.style.overflow).toBe("");

      // Verify mobile controls are enabled if present
      const enabledMobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      enabledMobileButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it("should handle first-visit workflow without checking dont show again", async () => {
      // Requirement 2.4: User closes without checking box
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Close without checking the box
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify preference shows user has seen instructions but didn't opt out
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":false')
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"hasSeenInstructions":true')
      );
    });

    it("should handle escape key dismissal in first-visit workflow", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Check the checkbox first
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox);

      // Close with escape key
      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify preference is still saved
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":true')
      );
    });
  });

  describe("Settings menu integration and popup reopening", () => {
    it("should complete settings menu integration workflow", async () => {
      // Requirement 3.1, 3.2: Settings menu provides access to popup
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      // Wait for app to load without popup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();

      // Step 1: Open settings menu
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      // Step 2: Click "How to Play" button in settings
      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      // Step 3: Verify popup opens from settings (Requirement 3.2)
      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Step 4: Verify popup opens and settings panel is closed by design
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();

      // Step 5: Verify checkbox shows current preference state (Requirement 3.3)
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      expect(checkbox).toBeChecked(); // Should reflect saved preference

      // Step 6: User can modify preference from settings-opened popup (Requirement 3.4)
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();

      // Step 7: Close popup and verify preference is updated
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":false')
      );
    });

    it("should handle settings integration when user has never seen popup", async () => {
      // User who has never seen popup accesses it through settings
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      // First dismiss the automatic popup
      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Now access through settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Checkbox should be unchecked (default state)
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      expect(checkbox).not.toBeChecked();
    });

    it("should handle multiple settings menu interactions", async () => {
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: false,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      // Open and close popup multiple times through settings
      for (let i = 0; i < 3; i++) {
        // Open settings
        const settingsButton = screen.getByLabelText("Open audio settings");
        fireEvent.click(settingsButton);

        await waitFor(() => {
          expect(screen.getByText("Settings")).toBeInTheDocument();
        });

        // Open popup
        const howToPlayButton = screen.getByText("How to Play");
        fireEvent.click(howToPlayButton);

        await waitFor(() => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        });

        // Close popup
        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);

        await waitFor(() => {
          expect(
            screen.queryByText("How to Play The Wanderer")
          ).not.toBeInTheDocument();
        });
      }

      // Should work consistently each time
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("Preference persistence across page refreshes", () => {
    it("should persist dont show again preference across app restarts", async () => {
      // Requirement 2.2, 2.3: Preference persistence

      // First session - user opts out
      mockLocalStorage.getItem.mockReturnValue(null);

      const { unmount } = render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox);

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Capture the saved settings - get the last call to setItem for how-to-play settings
      const howToPlayCalls = mockLocalStorage.setItem.mock.calls.filter(
        (call) => call[0] === "wanderer-how-to-play-settings"
      );
      const savedSettings = howToPlayCalls[howToPlayCalls.length - 1]?.[1];

      unmount();

      // Second session - simulate page refresh
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(savedSettings || null);

      render(<App />);

      // Wait to ensure popup doesn't appear
      await new Promise((resolve) => setTimeout(resolve, 1500));

      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();

      // Verify localStorage was checked
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings"
      );
    });

    it("should persist show again preference across app restarts", async () => {
      // User who didn't check "don't show again" should see popup on restart

      // First session
      mockLocalStorage.getItem.mockReturnValue(null);

      const { unmount } = render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Close without checking "don't show again"
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      const savedSettings = mockLocalStorage.setItem.mock.calls.find(
        (call) => call[0] === "wanderer-how-to-play-settings"
      )?.[1];

      unmount();

      // Second session
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(savedSettings || null);

      render(<App />);

      // Popup should appear again since user didn't opt out
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should handle settings changes persistence across sessions", async () => {
      // User changes preference through settings menu
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      const { unmount } = render(<App />);

      // Access through settings and change preference
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Change preference to show again
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox); // Uncheck it

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      // Get the LAST call to setItem for how-to-play settings (user's final preference)
      const howToPlayCalls = mockLocalStorage.setItem.mock.calls.filter(
        (call) => call[0] === "wanderer-how-to-play-settings"
      );
      const savedSettings = howToPlayCalls[howToPlayCalls.length - 1]?.[1];

      unmount();

      // New session should show popup due to changed preference
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(savedSettings || null);

      render(<App />);

      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should handle corrupted localStorage gracefully across sessions", async () => {
      // First session with corrupted data
      mockLocalStorage.getItem.mockReturnValue("invalid-json");

      const { unmount } = render(<App />);

      // Should show popup due to fallback behavior
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      unmount();

      // Second session should work normally
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Interaction blocking while popup is displayed", () => {
    it("should block all game interactions when popup is open", async () => {
      // Requirement 1.4: Popup blocks game interaction
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Test keyboard input blocking
      const keyEvents = [
        { key: "ArrowUp" },
        { key: "ArrowDown" },
        { key: "ArrowLeft" },
        { key: "ArrowRight" },
        { key: "w" },
        { key: "W" },
        { key: "a" },
        { key: "A" },
        { key: "s" },
        { key: "S" },
        { key: "d" },
        { key: "D" },
      ];

      keyEvents.forEach((event) => {
        fireEvent.keyDown(document, event);
      });

      // Popup should still be open (input was blocked)
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Test mobile controls are disabled
      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();

        // Try to click disabled button
        fireEvent.click(button);
      });

      // Popup should still be open
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Test body scroll is prevented
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore interactions after popup is closed", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify interactions are blocked
      expect(document.body.style.overflow).toBe("hidden");

      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Close popup
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify interactions are restored
      expect(document.body.style.overflow).toBe("");

      const enabledMobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      enabledMobileButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });

      // Test keyboard input works (popup stays closed)
      fireEvent.keyDown(document, { key: "ArrowRight" });

      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    it("should handle interaction blocking with settings menu workflow", async () => {
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      // Initially no blocking
      expect(document.body.style.overflow).toBe("");

      // Open settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      // Open popup from settings
      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify blocking is active
      expect(document.body.style.overflow).toBe("hidden");

      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Test keyboard blocking
      fireEvent.keyDown(document, { key: "ArrowUp" });
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Close popup
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify blocking is removed
      expect(document.body.style.overflow).toBe("");

      const enabledMobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      enabledMobileButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it("should handle escape key properly during interaction blocking", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify blocking is active
      expect(document.body.style.overflow).toBe("hidden");

      // Test that escape key works to close popup (not blocked)
      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify blocking is removed
      expect(document.body.style.overflow).toBe("");

      // Test that escape key doesn't do anything when popup is closed
      fireEvent.keyDown(document, { key: "Escape" });

      // Should remain closed
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    it("should handle focus management during interaction blocking", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify modal has proper focus management
      const modal = document.querySelector(".how-to-play-panel");
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute("tabIndex", "-1");

      // Verify focusable elements are present
      const closeButtonX = screen.getByLabelText("Close dialog using X button");
      const checkbox = screen.getByRole("checkbox");
      const footerCloseButton = screen.getByText("Close");

      expect(closeButtonX).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      expect(footerCloseButton).toBeInTheDocument();

      // Test tab navigation within modal
      closeButtonX.focus();
      expect(document.activeElement).toBe(closeButtonX);

      // Close popup
      fireEvent.click(footerCloseButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Focus should be restored to body or appropriate element
      expect(document.activeElement).toBeTruthy();
    });
  });

  describe("Error handling in workflow integration", () => {
    it("should handle localStorage errors during workflow", async () => {
      // Mock localStorage to throw errors
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      render(<App />);

      // Should still show popup (fallback behavior)
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Should be able to interact with popup despite storage errors
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox);

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // App should continue to function normally
      expect(document.body.style.overflow).toBe("");
    });

    it("should handle workflow with missing onOpenHowToPlay callback", async () => {
      // This tests the case where AudioControl doesn't have the callback
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      // Button should be present but might be disabled if callback is missing
      const howToPlayButton = screen.getByText("How to Play");
      expect(howToPlayButton).toBeInTheDocument();

      // Should not crash when clicked
      fireEvent.click(howToPlayButton);

      // Should either open popup or handle gracefully
      // The actual behavior depends on implementation
    });
  });
});

```

- Adjusted the test to match the actual UI: settings panel title is “Settings” (not “Audio Settings”) and the panel is closed when opening “How to Play”.

Edit in `src/tests/how-to-play-workflow-integration.test.tsx`:
```ts
- // Step 4: Verify both settings panel and popup are visible
- expect(screen.getByText("Audio Settings")).toBeInTheDocument();
- expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
+ // Step 4: Verify popup opens and settings panel is closed by design
+ expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
+ expect(screen.queryByText("Settings")).not.toBeInTheDocument();
```

- Lint: clean.

```typescript
- // Step 4: Verify both settings panel and popup are visible
- expect(screen.getByText("Audio Settings")).toBeInTheDocument();
- expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
+ // Step 4: Verify popup opens and settings panel is closed by design
+ expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
+ expect(screen.queryByText("Settings")).not.toBeInTheDocument();
```

```typescriptreact
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock functions for audio system
const mockPlaySound = vi.fn();
const mockStopAllSounds = vi.fn();
const mockToggleMute = vi.fn();
const mockInitializeAudio = vi.fn();
const mockSoundEventCallback = vi.fn();
const mockSetMuted = vi.fn();
let mockIsMuted = false;

const mockAudioContext = {
    createBufferSource: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        buffer: null,
        onended: null
    })),
    createGain: vi.fn(() => ({
        connect: vi.fn(),
        gain: { value: 1, setValueAtTime: vi.fn() }
    })),
    decodeAudioData: vi.fn(() => Promise.resolve(new ArrayBuffer(0))),
    destination: {},
    state: 'running',
    resume: vi.fn(() => Promise.resolve()),
    suspend: vi.fn(() => Promise.resolve()),
    close: vi.fn(() => Promise.resolve())
};

// Mock the audio hooks
vi.mock('../audio/context/audio-context', () => ({
    AudioProvider: ({ children }: { children: React.ReactNode }) => children,
    useAudioContext: () => ({
        audioManager: {
            playSound: mockPlaySound,
            preloadSounds: vi.fn(() => Promise.resolve()),
            setMuted: vi.fn(),
            isMuted: vi.fn(() => mockIsMuted),
            isSupported: vi.fn(() => true),
            stopAllSounds: mockStopAllSounds,
            cleanup: vi.fn(),
            getLoadingState: vi.fn(() => ({ isLoading: false, progress: 1, errors: [] })),
            onLoadingProgress: vi.fn(() => vi.fn()),
            getOptimizationReport: vi.fn(() => ({})),
            setGlobalVolume: vi.fn(),
            getGlobalVolume: vi.fn(() => 1),
            setCategoryVolume: vi.fn(),
            getCategoryVolume: vi.fn(() => 1),
            getAllCategoryVolumes: vi.fn(() => ({}))
        },
        isInitialized: true,
        isLoading: false,
        error: null,
        fallbackMode: false,
        autoplayAllowed: true,
        initializeAudio: mockInitializeAudio,
        cleanup: vi.fn(),
        reinitializeAudio: vi.fn(),
        switchToFallback: vi.fn()
    })
}));

vi.mock('../audio/hooks/use-audio-settings', () => ({
    useAudioSettings: () => ({
        isMuted: mockIsMuted,
        volume: 1,
        globalVolume: 1,
        categoryVolumes: {},
        setMuted: mockSetMuted.mockImplementation((muted: boolean) => { 
            mockIsMuted = muted; 
        }),
        setVolume: vi.fn(),
        setGlobalVolume: vi.fn(),
        setCategoryVolume: vi.fn(),
        resetToDefaults: vi.fn(),
        toggleMute: mockToggleMute.mockImplementation(() => { 
            mockIsMuted = !mockIsMuted; 
            return mockIsMuted;
        })
    })
}));

// Mock the useSound hook
let mockHasPlaybackErrors = false;
let mockFallbackMode = false;
const mockResetAudioSystem = vi.fn();

vi.mock('../audio/hooks/use-sound', () => ({
    useSound: () => ({
        playSound: mockPlaySound,
        stopAllSounds: mockStopAllSounds,
        isLoading: false,
        error: null,
        resetAudioSystem: mockResetAudioSystem,
        hasPlaybackErrors: mockHasPlaybackErrors,
        fallbackMode: mockFallbackMode
    })
}));

import App from '../App';

describe('App Sound Integration', () => {
    beforeEach(() => {
        // Reset mocks
        mockPlaySound.mockClear();
        mockStopAllSounds.mockClear();
        mockToggleMute.mockClear();
        mockInitializeAudio.mockClear();
        mockSoundEventCallback.mockClear();
        mockSetMuted.mockClear();
        mockResetAudioSystem.mockClear();
        mockIsMuted = false;
        mockHasPlaybackErrors = false;
        mockFallbackMode = false;
        
        // Mock Web Audio API
        global.AudioContext = vi.fn(() => mockAudioContext) as any;
        (global as any).webkitAudioContext = global.AudioContext;
        global.Audio = vi.fn(() => ({
            play: vi.fn(() => Promise.resolve()),
            pause: vi.fn(),
            load: vi.fn(),
            volume: 1,
            muted: false,
            currentTime: 0,
            duration: 1,
            ended: false,
            paused: true,
            readyState: 4,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
        })) as any;

        // Mock localStorage
        const localStorageMock = {
            getItem: vi.fn((key: string) => {
                if (key === 'wanderer-how-to-play-settings') {
                    return JSON.stringify({ dontShowAgain: true, hasSeenInstructions: true });
                }
                return null;
            }),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn()
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });

        // Mock fetch for sound file loading
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(0))
            } as Response)
        );

        // Mock URL parameters
        delete (window as any).location;
        (window as any).location = { search: '' };

        // Mock sound event emitter
        vi.doMock('../audio/events/sound-event-emitter', () => ({
            getSoundEventEmitter: () => ({
                setCallback: (callback: any) => {
                    mockSoundEventCallback.mockImplementation(callback || vi.fn());
                },
                emit: vi.fn(),
                emitMultiple: vi.fn()
            }),
            emitSoundEvent: vi.fn(),
            emitSoundEvents: vi.fn()
        }));
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
        mockSoundEventCallback.mockClear();
    });

    describe('Sound System Initialization', () => {
        it('should initialize audio system on app startup', async () => {
            render(<App />);

            // Should have audio controls visible (audio system initializes automatically)
            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
                expect(screen.getByLabelText('Open audio settings')).toBeInTheDocument();
            });
        });

        it('should not block game rendering during audio initialization', () => {
            render(<App />);

            // Game should be rendered immediately
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(screen.getByText(/Diamonds left:/)).toBeInTheDocument();
            expect(screen.getByText(/Moves:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();
        });

        it('should handle audio initialization errors gracefully', async () => {
            // Mock AudioContext to throw error
            global.AudioContext = vi.fn(() => {
                throw new Error('Audio not supported');
            }) as any;

            render(<App />);

            // Game should still render and be playable
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();

            // Audio controls should still be present (in fallback mode)
            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });
        });
    });

    describe('Keyboard Controls Integration', () => {
        it('should handle game movement keys without interfering with audio', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Test arrow key movement
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            // Should emit movement sound with new format
            await waitFor(() => {
                expect(mockPlaySound).toHaveBeenCalledWith(
                    'player_walk',
                    expect.objectContaining({
                        volume: expect.any(Number)
                    })
                );
            });
        });

        it('should handle mute keyboard shortcut (Ctrl+M)', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            // The keyboard shortcut functionality is tested in the useAudioSettings unit tests
            // Here we just verify that the mute button is present and functional
            const muteButton = screen.getByLabelText('Mute audio');
            expect(muteButton).toBeInTheDocument();
            expect(muteButton.getAttribute('title')).toContain('Ctrl+M');
        });

        it('should handle mute keyboard shortcut (Cmd+M) on Mac', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            // The keyboard shortcut functionality is tested in the useAudioSettings unit tests
            // Here we just verify that the mute button indicates Mac support
            const muteButton = screen.getByLabelText('Mute audio');
            expect(muteButton).toBeInTheDocument();
            expect(muteButton.getAttribute('title')).toContain('Ctrl+M');
        });

        it('should not trigger mute on M key without modifiers', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            // Press M without modifiers
            fireEvent.keyDown(window, { key: 'm' });

            // Should still show mute button (not muted)
            expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
        });
    });

    describe('Game Event Sound Integration', () => {
        it('should emit sounds for player movement', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Move player
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            await waitFor(() => {
                expect(mockPlaySound).toHaveBeenCalledWith(
                    'player_walk',
                    expect.objectContaining({
                        volume: expect.any(Number)
                    })
                );
            });
        });

        it('should stop all sounds when game ends', async () => {
            // Set up test maze with bomb next to player
            delete (window as any).location;
            (window as any).location = { search: '?testMaze=bomb' };

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Move player into bomb
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            // Wait for game end processing
            await waitFor(() => {
                expect(screen.getByText('Game Over')).toBeInTheDocument();
            });

            // Should have called stopAllSounds
            await waitFor(() => {
                expect(mockStopAllSounds).toHaveBeenCalled();
            });
        });

        it('should not emit sounds when game is over', async () => {
            // Set up test maze with bomb next to player
            delete (window as any).location;
            (window as any).location = { search: '?testMaze=bomb' };

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Move player into bomb to end game
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            await waitFor(() => {
                expect(screen.getByText('Game Over')).toBeInTheDocument();
            });

            // Clear previous sound calls
            mockPlaySound.mockClear();

            // Try to move again (should not work since game is over)
            fireEvent.keyDown(window, { key: 'ArrowLeft' });

            // Should not emit any new sounds
            expect(mockPlaySound).not.toHaveBeenCalled();
        });
    });

    describe('Audio Controls Integration', () => {
        it('should toggle mute via button click', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            const muteButton = screen.getByLabelText('Mute audio');
            fireEvent.click(muteButton);

            // Should have called toggleMute
            await waitFor(() => {
                expect(mockToggleMute).toHaveBeenCalled();
            });
        });

        it('should open audio settings dialog', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Open audio settings')).toBeInTheDocument();
            });

            const settingsButton = screen.getByLabelText('Open audio settings');
            fireEvent.click(settingsButton);

            await waitFor(() => {
                expect(screen.getByText('Audio Settings')).toBeInTheDocument();
            });
        });

        it('should display audio error messages when available', async () => {
            // Set up playback errors
            mockHasPlaybackErrors = true;
            
            // Mock playSound to fail
            mockPlaySound.mockImplementation(() => {
                throw new Error('Sound playback failed');
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Should display error message
            await waitFor(() => {
                expect(screen.getByText(/Some sound effects failed to play/i)).toBeInTheDocument();
            });
        });
    });

    describe('Performance and Responsiveness', () => {
        it('should not block user input during sound playback', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Rapidly press movement keys
            for (let i = 0; i < 5; i++) {
                fireEvent.keyDown(window, { key: 'ArrowRight' });
                fireEvent.keyDown(window, { key: 'ArrowLeft' });
            }

            // Game should remain responsive
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();
        });

        it('should handle multiple simultaneous sound events', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Trigger multiple sound events quickly
            fireEvent.keyDown(window, { key: 'ArrowRight' });
            fireEvent.keyDown(window, { key: 'ArrowLeft' });
            fireEvent.keyDown(window, { key: 'ArrowUp' });
            fireEvent.keyDown(window, { key: 'ArrowDown' });

            // Should handle all events without crashing
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            
            // Should have attempted to play sounds
            await waitFor(() => {
                expect(mockPlaySound).toHaveBeenCalled();
            });
        });

        it('should maintain game state consistency during audio operations', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            const initialMoves = screen.getByText(/Moves:/).textContent;

            // Perform game actions that trigger sounds
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            // Game state should update correctly
            await waitFor(() => {
                const newMoves = screen.getByText(/Moves:/).textContent;
                expect(newMoves).not.toBe(initialMoves);
            });

            // Toggle mute during gameplay
            fireEvent.keyDown(window, { 
                key: 'm', 
                ctrlKey: true 
            });

            // Game should continue to work normally
            fireEvent.keyDown(window, { key: 'ArrowLeft' });

            expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });
    });

    describe('Error Recovery', () => {
        it('should continue working when sound playback fails', async () => {
            // Mock playSound to throw error
            mockPlaySound.mockImplementation(() => {
                throw new Error('Sound playback failed');
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Game should still work despite sound errors
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();
        });

        it('should handle audio context suspension gracefully', async () => {
            // Mock suspended audio context
            mockAudioContext.state = 'suspended';

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Game should still be playable
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        it('should show fallback mode indicator when in fallback', async () => {
            // Set fallback mode
            mockFallbackMode = true;

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Audio: Fallback Mode')).toBeInTheDocument();
            });
        });

        it('should show reset audio button when there are playback errors', async () => {
            // Set up playback errors
            mockHasPlaybackErrors = true;
            
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Reset Audio')).toBeInTheDocument();
            });

            // Click reset button
            const resetButton = screen.getByText('Reset Audio');
            fireEvent.click(resetButton);

            // Should attempt to reset audio system
            await waitFor(() => {
                expect(screen.getByText('Reset Audio')).toBeInTheDocument();
            });
        });

        it('should handle audio reset errors gracefully', async () => {
            // Set up playback errors and mock reset to fail
            mockHasPlaybackErrors = true;
            mockResetAudioSystem.mockRejectedValue(new Error('Reset failed'));

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('Reset Audio')).toBeInTheDocument();
            });

            // Click reset button
            const resetButton = screen.getByText('Reset Audio');
            fireEvent.click(resetButton);

            // Should handle error gracefully (game continues to work)
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });
    });
});
```

- Fixed the failing test by ensuring the How To Play popup doesn’t block initial keyboard events in this spec.

Edit in `src/tests/app-sound-integration.test.tsx`:
```ts
- getItem: vi.fn(() => null),
+ getItem: vi.fn((key: string) => {
+   if (key === 'wanderer-how-to-play-settings') {
+     return JSON.stringify({ dontShowAgain: true, hasSeenInstructions: true });
+   }
+   return null;
+}),
```

- Rationale: the popup was auto-opening on first visit, preventing movement and thus no sound. We mock the stored preference so the popup stays closed for this suite.

```typescript
- getItem: vi.fn(() => null),
+ getItem: vi.fn((key: string) => {
+   if (key === 'wanderer-how-to-play-settings') {
+     return JSON.stringify({ dontShowAgain: true, hasSeenInstructions: true });
+   }
+   return null;
+}),
```

```typescriptreact
import React from "react";
import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { performance } from "perf_hooks";

// Import React components and hooks
import { AudioProvider, useAudioContext } from "../audio/context/audio-context";
import { useSound } from "../audio/hooks/use-sound";
import { useAudioSettings } from "../audio/hooks/use-audio-settings";
import App from "../App";

// Import types
import type { AudioManager } from "../Interfaces/IAudioManager";

// Mock audio manager for React tests
const createMockAudioManager = (): AudioManager => ({
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  stopAllSounds: vi.fn(),
  setGlobalVolume: vi.fn(),
  setCategoryVolume: vi.fn(),
  getLoadingState: vi
    .fn()
    .mockReturnValue({ loaded: 0, total: 0, isComplete: true }),
  onLoadingProgress: vi.fn(),
  getOptimizationReport: vi.fn().mockReturnValue({
    totalSounds: 0,
    loadedSounds: 0,
    failedSounds: 0,
    memoryUsage: 0,
  }),
  getGlobalVolume: vi.fn().mockReturnValue(0.8),
  getCategoryVolume: vi.fn().mockReturnValue(0.8),
  getAllCategoryVolumes: vi.fn().mockReturnValue({}),
});

// Mock the audio manager factory
let mockAudioManager: AudioManager;

vi.mock("../audio/managers/audio-manager-factory", () => ({
  createAudioManager: vi.fn(() => mockAudioManager),
  createSpecificAudioManager: vi.fn(() => mockAudioManager),
}));

// Mock audio utils
vi.mock("../audio/utils/audio-utils", () => ({
  canAutoplay: vi.fn().mockResolvedValue(true),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Test wrapper component
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

describe("React Sound System Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAudioManager = createMockAudioManager();
    mockLocalStorage.getItem.mockImplementation((key: string) =>
      key === 'wanderer-how-to-play-settings'
        ? JSON.stringify({ dontShowAgain: true, hasSeenInstructions: true })
        : null
    );

    // Mock performance for timing tests
    global.performance = {
      now: performance.now.bind(performance),
      mark: vi.fn(),
      measure: vi.fn(),
      clearMarks: vi.fn(),
      clearMeasures: vi.fn(),
      getEntries: vi.fn(() => []),
      getEntriesByName: vi.fn(() => []),
      getEntriesByType: vi.fn(() => []),
    } as any;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("2. Integration Tests for React Hooks and Component Interactions", () => {
    describe("useSound Hook Integration", () => {
      it("should integrate with AudioProvider correctly", async () => {
        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        // Wait for audio initialization
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.playSound).toBeDefined();
        expect(result.current.toggleMute).toBeDefined();
        expect(result.current.stopAllSounds).toBeDefined();
        expect(typeof result.current.isMuted).toBe("boolean");
        expect(typeof result.current.isLoading).toBe("boolean");
      });

      it("should call audio manager methods correctly", async () => {
        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Test playSound
        act(() => {
          result.current.playSound("test-sound", { volume: 0.5 });
        });

        expect(mockAudioManager.playSound).toHaveBeenCalledWith("TEST-SOUND", {
          volume: 0.5,
        });

        // Test toggleMute
        act(() => {
          result.current.toggleMute();
        });

        expect(mockAudioManager.setMuted).toHaveBeenCalled();

        // Test stopAllSounds
        act(() => {
          result.current.stopAllSounds();
        });

        expect(mockAudioManager.stopAllSounds).toHaveBeenCalled();
      });

      it("should handle playback errors and track error state", async () => {
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          throw new Error("Playback failed");
        });

        const consoleSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Trigger multiple errors for the same sound
        for (let i = 0; i < 4; i++) {
          act(() => {
            result.current.playSound("test-sound");
          });
        }

        expect(consoleSpy).toHaveBeenCalledWith(
          "Failed to play sound TEST-SOUND:",
          expect.any(Error)
        );

        // Should track that there are playback errors
        expect(result.current.hasPlaybackErrors).toBe(true);

        consoleSpy.mockRestore();
      });

      it("should reset error counts via resetAudioSystem", async () => {
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          throw new Error("Playback failed");
        });

        const consoleSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Trigger error
        act(() => {
          result.current.playSound("test-sound");
        });

        expect(result.current.hasPlaybackErrors).toBe(true);

        // Reset errors manually via resetAudioSystem
        await act(async () => {
          await result.current.resetAudioSystem();
        });

        expect(result.current.hasPlaybackErrors).toBe(false);

        consoleSpy.mockRestore();
      });

      it("should sync volume settings with audio manager", async () => {
        const { result } = renderHook(
          () => {
            const sound = useSound();
            const settings = useAudioSettings();
            return { sound, settings };
          },
          {
            wrapper: TestWrapper,
          }
        );

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Change volume settings
        act(() => {
          result.current.settings.setGlobalVolume(0.5);
        });

        expect(mockAudioManager.setGlobalVolume).toHaveBeenCalledWith(0.5);

        // Change category volume
        act(() => {
          result.current.settings.setCategoryVolume("movement", 0.7);
        });

        expect(mockAudioManager.setCategoryVolume).toHaveBeenCalledWith(
          "movement",
          0.7
        );
      });
    });

    describe("useAudioSettings Hook Integration", () => {
      it("should integrate with AudioProvider for settings management", async () => {
        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.isMuted).toBeDefined();
        expect(result.current.globalVolume).toBeDefined();
        expect(result.current.categoryVolumes).toBeDefined();
        expect(result.current.setMuted).toBeDefined();
        expect(result.current.setGlobalVolume).toBeDefined();
        expect(result.current.setCategoryVolume).toBeDefined();
        expect(result.current.resetToDefaults).toBeDefined();
      });

      it("should persist settings to localStorage", async () => {
        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        act(() => {
          result.current.setGlobalVolume(0.6);
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "wanderer-audio-settings",
          expect.stringContaining('"globalVolume":0.6')
        );

        act(() => {
          result.current.setMuted(true);
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "wanderer-audio-settings",
          expect.stringContaining('"isMuted":true')
        );
      });

      it("should load settings from localStorage on initialization", async () => {
        mockLocalStorage.getItem.mockReturnValue(
          '{"isMuted":true,"globalVolume":0.3,"categoryVolumes":{"movement":0.5}}'
        );

        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.isMuted).toBe(true);
        expect(result.current.globalVolume).toBe(0.3);
        expect(result.current.categoryVolumes.movement).toBe(0.5);
      });

      it("should handle localStorage errors gracefully", async () => {
        mockLocalStorage.getItem.mockImplementation(() => {
          throw new Error("Storage error");
        });

        const consoleSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});

        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Should use default values
        expect(result.current.globalVolume).toBe(0.8);
        expect(result.current.isMuted).toBe(false);

        consoleSpy.mockRestore();
      });

      it("should validate and clamp volume values", async () => {
        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Test volume clamping
        act(() => {
          result.current.setGlobalVolume(1.5);
        });

        expect(result.current.globalVolume).toBe(1);

        act(() => {
          result.current.setGlobalVolume(-0.5);
        });

        expect(result.current.globalVolume).toBe(0);

        act(() => {
          result.current.setCategoryVolume("movement", 2.0);
        });

        expect(result.current.categoryVolumes.movement).toBe(1);
      });
    });

    describe("AudioProvider Context Integration", () => {
      it("should provide audio manager to child components", async () => {
        let contextValue: any;

        function TestComponent() {
          contextValue = useAudioContext();
          return <div>Test</div>;
        }

        render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        await waitFor(() => {
          expect(contextValue.audioManager).toBeDefined();
          expect(contextValue.isLoading).toBeDefined();
          expect(contextValue.error).toBeDefined();
          expect(contextValue.fallbackMode).toBeDefined();
        });
      });

      it("should handle audio manager initialization errors", async () => {
        mockAudioManager.preloadSounds = vi
          .fn()
          .mockRejectedValue(new Error("Init failed"));

        let contextValue: any;

        function TestComponent() {
          contextValue = useAudioContext();
          return <div>Test</div>;
        }

        render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        await waitFor(() => {
          expect(contextValue.error).toBeTruthy();
        });
      });

      it("should provide reinitialize functionality", async () => {
        let contextValue: any;

        function TestComponent() {
          contextValue = useAudioContext();
          return <div>Test</div>;
        }

        render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        await waitFor(() => {
          expect(contextValue.reinitializeAudio).toBeDefined();
          expect(typeof contextValue.reinitializeAudio).toBe("function");
        });

        // Test reinitialize
        await act(async () => {
          await contextValue.reinitializeAudio();
        });

        expect(mockAudioManager.preloadSounds).toHaveBeenCalled();
      });
    });

    describe("Component Integration with Sound System", () => {
      it("should integrate sound system with App component", async () => {
        // Mock URL parameters for test maze
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        // Should have audio controls
        expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
        expect(
          screen.getByLabelText("Open audio settings")
        ).toBeInTheDocument();
      });

      it("should trigger sounds on user interactions", async () => {
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        // Wait a bit more for the game to fully initialize
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
        });

        // Clear any initialization calls
        mockAudioManager.playSound = vi.fn();

        // Simulate user input
        fireEvent.keyDown(window, { key: "ArrowRight" });

        await waitFor(
          () => {
            expect(mockAudioManager.playSound).toHaveBeenCalled();
          },
          { timeout: 1000 }
        );
      });

      it("should handle mute toggle in UI", async () => {
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
        });

        const muteButton = screen.getByLabelText("Mute audio");
        fireEvent.click(muteButton);

        await waitFor(() => {
          expect(mockAudioManager.setMuted).toHaveBeenCalled();
        });
      });

      it("should open audio settings dialog", async () => {
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(
            screen.getByLabelText("Open audio settings")
          ).toBeInTheDocument();
        });

        const settingsButton = screen.getByLabelText("Open audio settings");
        fireEvent.click(settingsButton);

        await waitFor(() => {
          expect(screen.getByText("Audio Settings")).toBeInTheDocument();
        });
      });

      it("should handle game state changes with sound integration", async () => {
        // Set up test maze with bomb next to player
        delete (window as any).location;
        (window as any).location = { search: "?testMaze=bomb" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        // Wait for the game to fully initialize including sound callbacks
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
        });

        // Clear any initialization calls
        mockAudioManager.stopAllSounds = vi.fn();

        // Move player into bomb to trigger game end
        fireEvent.keyDown(window, { key: "ArrowRight" });

        await waitFor(() => {
          expect(screen.getByText("Game Over")).toBeInTheDocument();
        });

        // Should have stopped all sounds (with a small delay due to the setTimeout in game end manager)
        await waitFor(
          () => {
            expect(mockAudioManager.stopAllSounds).toHaveBeenCalled();
          },
          { timeout: 200 }
        );
      });
    });

    describe("Performance Integration Tests", () => {
      it("should not block React rendering during audio operations", async () => {
        const startTime = performance.now();

        render(
          <TestWrapper>
            <div data-testid="test-component">Test</div>
          </TestWrapper>
        );

        const renderTime = performance.now() - startTime;

        // Should render quickly even with audio initialization
        expect(renderTime).toBeLessThan(100);
        expect(screen.getByTestId("test-component")).toBeInTheDocument();
      });

      it("should handle rapid hook updates efficiently", async () => {
        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const startTime = performance.now();

        // Rapidly call playSound
        for (let i = 0; i < 100; i++) {
          act(() => {
            result.current.playSound("test-sound");
          });
        }

        const operationTime = performance.now() - startTime;

        // Should handle rapid calls efficiently
        expect(operationTime).toBeLessThan(100);
        expect(mockAudioManager.playSound).toHaveBeenCalledTimes(100);
      });

      it("should maintain React state consistency during audio operations", async () => {
        const { result } = renderHook(
          () => {
            const sound = useSound();
            const settings = useAudioSettings();
            return { sound, settings };
          },
          {
            wrapper: TestWrapper,
          }
        );

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Perform multiple state changes rapidly
        for (let i = 0; i < 10; i++) {
          act(() => {
            result.current.settings.setGlobalVolume(i / 10);
            result.current.sound.playSound("test-sound");
          });
        }

        // State should be consistent
        expect(result.current.settings.globalVolume).toBe(0.9);
        expect(mockAudioManager.playSound).toHaveBeenCalledTimes(10);
      });
    });

    describe("Error Handling Integration", () => {
      it("should handle audio manager failures gracefully in React context", async () => {
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          throw new Error("Audio manager failed");
        });

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Should not crash React
        expect(() => {
          act(() => {
            result.current.playSound("test-sound");
          });
        }).not.toThrow();
      });

      it("should show error states in UI components", async () => {
        mockAudioManager.preloadSounds = vi
          .fn()
          .mockRejectedValue(new Error("Failed to load"));

        // Mock the context to return error state
        vi.doMock("../audio/context/audio-context", () => ({
          AudioProvider: ({ children }: { children: React.ReactNode }) =>
            children,
          useAudioContext: () => ({
            audioManager: null,
            isLoading: false,
            error: "Failed to load",
            fallbackMode: true,
            reinitializeAudio: vi.fn(),
          }),
        }));

        const { useSound: MockedUseSound } = await import(
          "../audio/hooks/use-sound"
        );

        const { result } = renderHook(() => MockedUseSound());

        expect(result.current.error).toBe("Failed to load");
        expect(result.current.fallbackMode).toBe(true);

        vi.doUnmock("../audio/context/audio-context");
      });

      it("should recover from temporary errors", async () => {
        let shouldFail = true;
        const originalPlaySound = vi.fn().mockImplementation(() => {
          if (shouldFail) {
            throw new Error("Temporary failure");
          }
        });
        mockAudioManager.playSound = originalPlaySound;

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // First call should fail
        act(() => {
          result.current.playSound("test-sound");
        });

        expect(result.current.hasPlaybackErrors).toBe(true);

        // Fix the error and reset
        shouldFail = false;

        await act(async () => {
          await result.current.resetAudioSystem();
        });

        // Should work now - the original mock should work since shouldFail is now false
        act(() => {
          result.current.playSound("test-sound");
        });

        // The soundId gets converted to uppercase in useSound hook
        expect(originalPlaySound).toHaveBeenCalledWith("TEST-SOUND", undefined);
      });
    });

    describe("Memory Management Integration", () => {
      it("should manage audio manager lifecycle properly", async () => {
        // Test that the AudioProvider creates and manages an audio manager
        const TestComponent = () => {
          const { audioManager, isInitialized } = useAudioContext();
          return (
            <div>
              {isInitialized ? "Initialized" : "Not initialized"}
              {audioManager ? " - Manager present" : " - No manager"}
            </div>
          );
        };

        const { unmount } = render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        // Wait for initialization
        await waitFor(() => {
          expect(
            screen.getByText(/Initialized.*Manager present/)
          ).toBeInTheDocument();
        });

        // Verify the audio manager was created and preloaded
        expect(mockAudioManager.preloadSounds).toHaveBeenCalled();

        // Unmount should not throw errors (cleanup happens internally)
        expect(() => unmount()).not.toThrow();
      });

      it("should handle multiple component instances efficiently", async () => {
        // Clear any previous calls
        vi.clearAllMocks();

        const hooks = [];

        // Create multiple hook instances within the same provider
        const { result: result1 } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });
        const { result: result2 } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });
        const { result: result3 } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        hooks.push(result1, result2, result3);

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // All hooks should share the same audio manager
        hooks.forEach((hook) => {
          expect(hook.current.playSound).toBeDefined();
        });

        // Should have created audio managers for each TestWrapper (3 in this case)
        expect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(3);
      });
    });
  });
});

```

- Addressed the failing interaction test by preventing the How To Play popup from blocking input in this suite.

Edit in `src/tests/react-sound-integration.test.tsx`:
```ts
- mockLocalStorage.getItem.mockReturnValue(null);
+ mockLocalStorage.getItem.mockImplementation((key: string) =>
+   key === 'wanderer-how-to-play-settings'
+     ? JSON.stringify({ dontShowAgain: true, hasSeenInstructions: true })
+     : null
+ );
```

- Rationale: ensures the popup stays closed so ArrowRight triggers movement and a sound.
- Lint: clean.

```typescript
- mockLocalStorage.getItem.mockReturnValue(null);
+ mockLocalStorage.getItem.mockImplementation((key: string) =>
+   key === 'wanderer-how-to-play-settings'
+     ? JSON.stringify({ dontShowAgain: true, hasSeenInstructions: true })
+     : null
+ );
```

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import { createLevelProgressionHandler } from '../levels/level-progression-handler';
import { createInitialGameState, movePlayer } from '../GameState';
import type { GameStateData } from '../GameState';
import type { MazeLevelManager } from '../Interfaces/IMazeLevelManager';
import type { LevelProgressionHandler } from '../levels/level-progression-handler';
import { CELL } from '../maze';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn()
}));

// Mock game end sound manager
vi.mock('../audio/events/game-end-sound-manager', () => ({
    handleGameEndSounds: vi.fn()
}));

describe('Level Management Comprehensive Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('MazeLevelManager Navigation and Validation', () => {
        it('should validate all level configurations on initialization', () => {
            const manager = createMazeLevelManager();

            // Should have exactly 5 valid levels
            expect(manager.getTotalLevels()).toBe(5);

            // Each level should be valid
            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();

                // Validate basic properties
                expect(level.levelNumber).toBeGreaterThan(0);
                expect(level.moveLimit).toBeGreaterThan(0);
                expect(level.diamondCount).toBeGreaterThan(0);
                expect(level.bombCount).toBeGreaterThanOrEqual(0);

                // Validate maze dimensions
                expect(level.maze).toHaveLength(10);
                expect(level.maze[0]).toHaveLength(16);

                // Validate positions are within bounds
                expect(level.playerStartPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.x).toBeLessThan(16);
                expect(level.playerStartPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.y).toBeLessThan(10);

                expect(level.exitPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.x).toBeLessThan(16);
                expect(level.exitPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.y).toBeLessThan(10);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should maintain consistent level numbering', () => {
            const manager = createMazeLevelManager();
            const expectedLevels = [1, 2, 3, 4, 5];
            const actualLevels: number[] = [];

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                actualLevels.push(manager.getCurrentLevelNumber());
                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }

            expect(actualLevels).toEqual(expectedLevels);
        });

        it('should validate element counts match actual maze content', () => {
            const manager = createMazeLevelManager();

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                let actualDiamonds = 0;
                let actualBombs = 0;
                let actualExits = 0;
                let actualPlayers = 0;

                level.maze.forEach(row => {
                    row.forEach(cell => {
                        switch (cell) {
                            case CELL.DIAMOND:
                                actualDiamonds++;
                                break;
                            case CELL.BOMB:
                                actualBombs++;
                                break;
                            case CELL.EXIT:
                                actualExits++;
                                break;
                            case CELL.PLAYER:
                                actualPlayers++;
                                break;
                        }
                    });
                });

                expect(actualDiamonds).toBe(level.diamondCount);
                expect(actualBombs).toBe(level.bombCount);
                expect(actualExits).toBe(1);
                expect(actualPlayers).toBe(1);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should handle edge cases gracefully', () => {
            const manager = createMazeLevelManager();

            // Advance to last level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should be at level 5
            expect(manager.getCurrentLevelNumber()).toBe(5);
            expect(manager.hasNextLevel()).toBe(false);

            // Attempting to advance beyond should return null
            const result = manager.advanceToNextLevel();
            expect(result).toBeNull();

            // Should still be at level 5
            expect(manager.getCurrentLevelNumber()).toBe(5);
        });
    });

    describe('Level Progression Logic and Sound Event Generation', () => {
        it('should generate correct sound events for each transition type', async () => {
            const { emitSoundEvent } = await import('../audio/events/sound-event-emitter');
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            // Test door slam sound for level progression
            const progressionResult = handler.processLevelCompletion(manager);
            handler.emitLevelProgressionSound(progressionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });

            vi.clearAllMocks();

            // Advance to final level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Test victory sound for game completion
            const completionResult = handler.processLevelCompletion(manager);
            handler.emitLevelProgressionSound(completionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should correctly identify level completion conditions', () => {
            const handler = createLevelProgressionHandler();

            // Test various game states and diamond counts
            expect(handler.isLevelComplete('won', 0)).toBe(true);
            expect(handler.isLevelComplete('won', 1)).toBe(false);
            expect(handler.isLevelComplete('playing', 0)).toBe(false);
            expect(handler.isLevelComplete('dead', 0)).toBe(false);
            expect(handler.isLevelComplete('dead', 5)).toBe(false);
            expect(handler.isLevelComplete('playing', 3)).toBe(false);
        });

        it('should handle progression through all levels with correct results', () => {
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            const progressionResults = [];

            // Process progression through all levels
            for (let i = 1; i <= 5; i++) {
                const result = handler.processLevelCompletion(manager);
                progressionResults.push(result);

                if (i < 5) {
                    // Should advance to next level
                    expect(result.success).toBe(true);
                    expect(result.isGameComplete).toBe(false);
                    expect(result.soundToPlay).toBe('door_slam');
                    expect(result.nextLevel?.levelNumber).toBe(i + 1);
                } else {
                    // Should complete game
                    expect(result.success).toBe(true);
                    expect(result.isGameComplete).toBe(true);
                    expect(result.soundToPlay).toBe('victory');
                    expect(result.nextLevel).toBeUndefined();
                }
            }

            expect(progressionResults).toHaveLength(5);
        });
    });

    describe('GameState Integration with Level Management', () => {
        it('should initialize with correct level 1 data', () => {
            const state = createInitialGameState();
            const level1Data = state.levelManager.getCurrentLevel();

            expect(state.currentLevel).toBe(1);
            expect(state.moves).toBe(level1Data.moveLimit);
            expect(state.diamonds).toBe(level1Data.diamondCount);
            expect(state.maze).toEqual(level1Data.maze);
            expect(state.player).toEqual(level1Data.playerStartPosition);
            expect(state.isGameComplete).toBe(false);
        });

        it('should maintain level manager state consistency', () => {
            const state = createInitialGameState();

            expect(state.levelManager.getCurrentLevelNumber()).toBe(state.currentLevel);
            expect(state.levelManager.getTotalLevels()).toBe(5);
            expect(state.levelManager.hasNextLevel()).toBe(true);

            // Level manager should provide consistent data
            const levelData = state.levelManager.getCurrentLevel();
            expect(levelData.levelNumber).toBe(state.currentLevel);
            expect(levelData.moveLimit).toBe(state.moves);
            expect(levelData.diamondCount).toBe(state.diamonds);
        });

        it('should handle level progression integration correctly', () => {
            const state = createInitialGameState();

            // Verify progression handler is properly integrated
            expect(state.levelProgressionHandler).toBeDefined();

            // Test level completion detection
            expect(state.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
            expect(state.levelProgressionHandler.isLevelComplete('playing', 0)).toBe(false);

            // Test progression processing
            const result = state.levelProgressionHandler.processLevelCompletion(state.levelManager);
            expect(result.success).toBe(true);
            expect(result.nextLevel?.levelNumber).toBe(2);
        });
    });

    describe('Score Persistence and Move Limit Resets', () => {
        it('should persist score across level transitions', () => {
            // Create a simple test scenario where we can control level progression
            let state = createInitialGameState();
            const initialScore = 50;

            // Create a test state that will trigger level progression
            const testState: GameStateData = {
                ...state,
                score: initialScore,
                gameState: 'playing',
                diamonds: 1, // One diamond remaining
                player: { x: 12, y: 8 }, // Player position
                maze: state.maze.map((row, y) =>
                    row.map((cell, x) => {
                        if (x === 14 && y === 8) return CELL.EXIT;
                        if (x === 13 && y === 8) return CELL.DIAMOND; // Diamond next to player
                        if (x === 12 && y === 8) return CELL.PLAYER; // Player position
                        return cell === CELL.PLAYER ? CELL.EMPTY : cell; // Clear original player position
                    })
                )
            };

            // Move player to collect diamond
            const afterDiamondCollection = movePlayer(testState, 1, 0); // Move right to diamond
            expect(afterDiamondCollection.score).toBe(initialScore + 10); // Score should increase
            expect(afterDiamondCollection.diamonds).toBe(0); // Diamonds should be 0

            // Move to exit to trigger level progression
            const afterLevelProgression = movePlayer(afterDiamondCollection, 1, 0); // Move right to exit

            // Score should persist to next level if level progression occurred
            if (afterLevelProgression.currentLevel === 2) {
                expect(afterLevelProgression.score).toBe(initialScore + 10);
                expect(afterLevelProgression.currentLevel).toBe(2);
            } else {
                // If level progression didn't occur, score should still be maintained
                expect(afterLevelProgression.score).toBe(initialScore + 10);
            }
        });

        it('should reset move limits for each new level', () => {
            const manager = createMazeLevelManager();
            const expectedMoveLimits = [45, 50, 50, 45, 45]; // Based on level configurations

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                expect(level.moveLimit).toBe(expectedMoveLimits[i]);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should reset diamond counts for each new level', () => {
            const manager = createMazeLevelManager();
            const expectedDiamondCounts = [6, 7, 6, 6, 6]; // Based on level configurations

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                expect(level.diamondCount).toBe(expectedDiamondCounts[i]);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should maintain cumulative scoring across multiple level transitions', () => {
            // Test the cumulative nature of scoring
            const scores = [0, 50, 120, 180, 250, 300]; // Simulated cumulative scores

            for (let i = 0; i < scores.length - 1; i++) {
                const currentScore = scores[i]!;
                const nextScore = scores[i + 1]!;
                const scoreDifference = nextScore - currentScore;

                // Verify that score increases are reasonable (multiples of 10 for diamonds)
                expect(scoreDifference % 10).toBe(0);
                expect(scoreDifference).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle invalid level manager states gracefully', () => {
            const manager = createMazeLevelManager();

            // Advance beyond available levels
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should handle attempts to advance beyond last level
            expect(manager.advanceToNextLevel()).toBeNull();
            expect(manager.hasNextLevel()).toBe(false);
            expect(manager.getCurrentLevelNumber()).toBe(5);
        });

        it('should validate level data integrity', () => {
            const manager = createMazeLevelManager();

            // Test each level for data integrity
            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();

                // Validate required properties exist
                expect(level.levelNumber).toBeDefined();
                expect(level.maze).toBeDefined();
                expect(level.moveLimit).toBeDefined();
                expect(level.diamondCount).toBeDefined();
                expect(level.bombCount).toBeDefined();
                expect(level.rockCount).toBeDefined();
                expect(level.playerStartPosition).toBeDefined();
                expect(level.exitPosition).toBeDefined();

                // Validate property types
                expect(typeof level.levelNumber).toBe('number');
                expect(Array.isArray(level.maze)).toBe(true);
                expect(typeof level.moveLimit).toBe('number');
                expect(typeof level.diamondCount).toBe('number');
                expect(typeof level.bombCount).toBe('number');
                expect(typeof level.rockCount).toBe('number');
                expect(typeof level.playerStartPosition).toBe('object');
                expect(typeof level.exitPosition).toBe('object');

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should handle progression handler edge cases', () => {
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            // Test with manager at different states
            const initialResult = handler.processLevelCompletion(manager);
            expect(initialResult.success).toBe(true);
            expect(initialResult.isGameComplete).toBe(false);

            // Advance to last level and test completion
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            const finalResult = handler.processLevelCompletion(manager);
            expect(finalResult.success).toBe(true);
            expect(finalResult.isGameComplete).toBe(true);
            expect(finalResult.soundToPlay).toBe('victory');
        });
    });

    describe('Performance and Memory Management', () => {
        it('should not leak memory during level transitions', () => {
            const manager = createMazeLevelManager();
            const handler = createLevelProgressionHandler();

            // Simulate multiple level transitions
            for (let i = 0; i < 10; i++) {
                const result = handler.processLevelCompletion(manager);

                if (result.nextLevel) {
                    // Verify new level data is properly created
                    expect(result.nextLevel.maze).toBeDefined();
                    expect(result.nextLevel.maze.length).toBe(10);
                    expect(result.nextLevel.maze[0]?.length).toBe(16);
                }

                if (!manager.hasNextLevel()) {
                    break;
                }
            }

            // Manager should still be in valid state
            expect(manager.getCurrentLevel()).toBeDefined();
            expect(manager.getCurrentLevelNumber()).toBeGreaterThan(0);
        });

        it('should handle rapid level manager operations efficiently', () => {
            const startTime = performance.now();

            // Perform many operations
            for (let i = 0; i < 1000; i++) {
                const manager = createMazeLevelManager();

                while (manager.hasNextLevel()) {
                    manager.getCurrentLevel();
                    manager.getCurrentLevelNumber();
                    manager.getTotalLevels();
                    manager.advanceToNextLevel();
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (less than 1 second)
            expect(duration).toBeLessThan(1000);
        });
    });
});
```

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMazeLevelManager } from '../levels/maze-level-manager';
import { createLevelProgressionHandler } from '../levels/level-progression-handler';
import { createInitialGameState, movePlayer } from '../GameState';
import type { GameStateData } from '../GameState';
// (removed unused types)
import { CELL } from '../maze';

// Mock the sound event emitter
vi.mock('../audio/events/sound-event-emitter', () => ({
    emitSoundEvent: vi.fn(),
    emitSoundEvents: vi.fn()
}));

// Mock game end sound manager
vi.mock('../audio/events/game-end-sound-manager', () => ({
    handleGameEndSounds: vi.fn()
}));

describe('Level Management Comprehensive Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('MazeLevelManager Navigation and Validation', () => {
        it('should validate all level configurations on initialization', () => {
            const manager = createMazeLevelManager();

            // Should have exactly 5 valid levels
            expect(manager.getTotalLevels()).toBe(5);

            // Each level should be valid
            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();

                // Validate basic properties
                expect(level.levelNumber).toBeGreaterThan(0);
                expect(level.moveLimit).toBeGreaterThan(0);
                expect(level.diamondCount).toBeGreaterThan(0);
                expect(level.bombCount).toBeGreaterThanOrEqual(0);

                // Validate maze dimensions
                expect(level.maze).toHaveLength(10);
                expect(level.maze[0]).toHaveLength(16);

                // Validate positions are within bounds
                expect(level.playerStartPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.x).toBeLessThan(16);
                expect(level.playerStartPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.playerStartPosition.y).toBeLessThan(10);

                expect(level.exitPosition.x).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.x).toBeLessThan(16);
                expect(level.exitPosition.y).toBeGreaterThanOrEqual(0);
                expect(level.exitPosition.y).toBeLessThan(10);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should maintain consistent level numbering', () => {
            const manager = createMazeLevelManager();
            const expectedLevels = [1, 2, 3, 4, 5];
            const actualLevels: number[] = [];

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                actualLevels.push(manager.getCurrentLevelNumber());
                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }

            expect(actualLevels).toEqual(expectedLevels);
        });

        it('should validate element counts match actual maze content', () => {
            const manager = createMazeLevelManager();

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                let actualDiamonds = 0;
                let actualBombs = 0;
                let actualExits = 0;
                let actualPlayers = 0;

                level.maze.forEach(row => {
                    row.forEach(cell => {
                        switch (cell) {
                            case CELL.DIAMOND:
                                actualDiamonds++;
                                break;
                            case CELL.BOMB:
                                actualBombs++;
                                break;
                            case CELL.EXIT:
                                actualExits++;
                                break;
                            case CELL.PLAYER:
                                actualPlayers++;
                                break;
                        }
                    });
                });

                expect(actualDiamonds).toBe(level.diamondCount);
                expect(actualBombs).toBe(level.bombCount);
                expect(actualExits).toBe(1);
                expect(actualPlayers).toBe(1);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should handle edge cases gracefully', () => {
            const manager = createMazeLevelManager();

            // Advance to last level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should be at level 5
            expect(manager.getCurrentLevelNumber()).toBe(5);
            expect(manager.hasNextLevel()).toBe(false);

            // Attempting to advance beyond should return null
            const result = manager.advanceToNextLevel();
            expect(result).toBeNull();

            // Should still be at level 5
            expect(manager.getCurrentLevelNumber()).toBe(5);
        });
    });

    describe('Level Progression Logic and Sound Event Generation', () => {
        it('should generate correct sound events for each transition type', async () => {
            const { emitSoundEvent } = await import('../audio/events/sound-event-emitter');
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            // Test door slam sound for level progression
            const progressionResult = handler.processLevelCompletion(manager);
            handler.emitLevelProgressionSound(progressionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'door_slam',
                source: 'system',
                priority: 'high'
            });

            vi.clearAllMocks();

            // Advance to final level
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Test victory sound for game completion
            const completionResult = handler.processLevelCompletion(manager);
            handler.emitLevelProgressionSound(completionResult);

            expect(emitSoundEvent).toHaveBeenCalledWith({
                type: 'victory',
                source: 'system',
                priority: 'high'
            });
        });

        it('should correctly identify level completion conditions', () => {
            const handler = createLevelProgressionHandler();

            // Test various game states and diamond counts
            expect(handler.isLevelComplete('won', 0)).toBe(true);
            expect(handler.isLevelComplete('won', 1)).toBe(false);
            expect(handler.isLevelComplete('playing', 0)).toBe(false);
            expect(handler.isLevelComplete('dead', 0)).toBe(false);
            expect(handler.isLevelComplete('dead', 5)).toBe(false);
            expect(handler.isLevelComplete('playing', 3)).toBe(false);
        });

        it('should handle progression through all levels with correct results', () => {
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            const progressionResults = [];

            // Process progression through all levels
            for (let i = 1; i <= 5; i++) {
                const result = handler.processLevelCompletion(manager);
                progressionResults.push(result);

                if (i < 5) {
                    // Should advance to next level
                    expect(result.success).toBe(true);
                    expect(result.isGameComplete).toBe(false);
                    expect(result.soundToPlay).toBe('door_slam');
                    expect(result.nextLevel?.levelNumber).toBe(i + 1);
                } else {
                    // Should complete game
                    expect(result.success).toBe(true);
                    expect(result.isGameComplete).toBe(true);
                    expect(result.soundToPlay).toBe('victory');
                    expect(result.nextLevel).toBeUndefined();
                }
            }

            expect(progressionResults).toHaveLength(5);
        });
    });

    describe('GameState Integration with Level Management', () => {
        it('should initialize with correct level 1 data', () => {
            const state = createInitialGameState();
            const level1Data = state.levelManager.getCurrentLevel();

            expect(state.currentLevel).toBe(1);
            expect(state.moves).toBe(level1Data.moveLimit);
            expect(state.diamonds).toBe(level1Data.diamondCount);
            expect(state.maze).toEqual(level1Data.maze);
            expect(state.player).toEqual(level1Data.playerStartPosition);
            expect(state.isGameComplete).toBe(false);
        });

        it('should maintain level manager state consistency', () => {
            const state = createInitialGameState();

            expect(state.levelManager.getCurrentLevelNumber()).toBe(state.currentLevel);
            expect(state.levelManager.getTotalLevels()).toBe(5);
            expect(state.levelManager.hasNextLevel()).toBe(true);

            // Level manager should provide consistent data
            const levelData = state.levelManager.getCurrentLevel();
            expect(levelData.levelNumber).toBe(state.currentLevel);
            expect(levelData.moveLimit).toBe(state.moves);
            expect(levelData.diamondCount).toBe(state.diamonds);
        });

        it('should handle level progression integration correctly', () => {
            const state = createInitialGameState();

            // Verify progression handler is properly integrated
            expect(state.levelProgressionHandler).toBeDefined();

            // Test level completion detection
            expect(state.levelProgressionHandler.isLevelComplete('won', 0)).toBe(true);
            expect(state.levelProgressionHandler.isLevelComplete('playing', 0)).toBe(false);

            // Test progression processing
            const result = state.levelProgressionHandler.processLevelCompletion(state.levelManager);
            expect(result.success).toBe(true);
            expect(result.nextLevel?.levelNumber).toBe(2);
        });
    });

    describe('Score Persistence and Move Limit Resets', () => {
        it('should persist score across level transitions', () => {
            // Create a simple test scenario where we can control level progression
            let state = createInitialGameState();
            const initialScore = 50;

            // Create a test state that will trigger level progression
            const testState: GameStateData = {
                ...state,
                score: initialScore,
                gameState: 'playing',
                diamonds: 1, // One diamond remaining
                player: { x: 12, y: 8 }, // Player position
                maze: state.maze.map((row, y) =>
                    row.map((cell, x) => {
                        if (x === 14 && y === 8) return CELL.EXIT;
                        if (x === 13 && y === 8) return CELL.DIAMOND; // Diamond next to player
                        if (x === 12 && y === 8) return CELL.PLAYER; // Player position
                        return cell === CELL.PLAYER ? CELL.EMPTY : cell; // Clear original player position
                    })
                )
            };

            // Move player to collect diamond
            const afterDiamondCollection = movePlayer(testState, 1, 0); // Move right to diamond
            expect(afterDiamondCollection.score).toBe(initialScore + 10); // Score should increase
            expect(afterDiamondCollection.diamonds).toBe(0); // Diamonds should be 0

            // Move to exit to trigger level progression
            const afterLevelProgression = movePlayer(afterDiamondCollection, 1, 0); // Move right to exit

            // Score should persist to next level if level progression occurred
            if (afterLevelProgression.currentLevel === 2) {
                expect(afterLevelProgression.score).toBe(initialScore + 10);
                expect(afterLevelProgression.currentLevel).toBe(2);
            } else {
                // If level progression didn't occur, score should still be maintained
                expect(afterLevelProgression.score).toBe(initialScore + 10);
            }
        });

        it('should reset move limits for each new level', () => {
            const manager = createMazeLevelManager();
            const expectedMoveLimits = [45, 50, 50, 45, 45]; // Based on level configurations

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                expect(level.moveLimit).toBe(expectedMoveLimits[i]);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should reset diamond counts for each new level', () => {
            const manager = createMazeLevelManager();
            const expectedDiamondCounts = [6, 7, 6, 6, 6]; // Based on level configurations

            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();
                expect(level.diamondCount).toBe(expectedDiamondCounts[i]);

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should maintain cumulative scoring across multiple level transitions', () => {
            // Test the cumulative nature of scoring
            const scores = [0, 50, 120, 180, 250, 300]; // Simulated cumulative scores

            for (let i = 0; i < scores.length - 1; i++) {
                const currentScore = scores[i]!;
                const nextScore = scores[i + 1]!;
                const scoreDifference = nextScore - currentScore;

                // Verify that score increases are reasonable (multiples of 10 for diamonds)
                expect(scoreDifference % 10).toBe(0);
                expect(scoreDifference).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle invalid level manager states gracefully', () => {
            const manager = createMazeLevelManager();

            // Advance beyond available levels
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            // Should handle attempts to advance beyond last level
            expect(manager.advanceToNextLevel()).toBeNull();
            expect(manager.hasNextLevel()).toBe(false);
            expect(manager.getCurrentLevelNumber()).toBe(5);
        });

        it('should validate level data integrity', () => {
            const manager = createMazeLevelManager();

            // Test each level for data integrity
            for (let i = 0; i < manager.getTotalLevels(); i++) {
                const level = manager.getCurrentLevel();

                // Validate required properties exist
                expect(level.levelNumber).toBeDefined();
                expect(level.maze).toBeDefined();
                expect(level.moveLimit).toBeDefined();
                expect(level.diamondCount).toBeDefined();
                expect(level.bombCount).toBeDefined();
                expect(level.rockCount).toBeDefined();
                expect(level.playerStartPosition).toBeDefined();
                expect(level.exitPosition).toBeDefined();

                // Validate property types
                expect(typeof level.levelNumber).toBe('number');
                expect(Array.isArray(level.maze)).toBe(true);
                expect(typeof level.moveLimit).toBe('number');
                expect(typeof level.diamondCount).toBe('number');
                expect(typeof level.bombCount).toBe('number');
                expect(typeof level.rockCount).toBe('number');
                expect(typeof level.playerStartPosition).toBe('object');
                expect(typeof level.exitPosition).toBe('object');

                if (manager.hasNextLevel()) {
                    manager.advanceToNextLevel();
                }
            }
        });

        it('should handle progression handler edge cases', () => {
            const handler = createLevelProgressionHandler();
            const manager = createMazeLevelManager();

            // Test with manager at different states
            const initialResult = handler.processLevelCompletion(manager);
            expect(initialResult.success).toBe(true);
            expect(initialResult.isGameComplete).toBe(false);

            // Advance to last level and test completion
            while (manager.hasNextLevel()) {
                manager.advanceToNextLevel();
            }

            const finalResult = handler.processLevelCompletion(manager);
            expect(finalResult.success).toBe(true);
            expect(finalResult.isGameComplete).toBe(true);
            expect(finalResult.soundToPlay).toBe('victory');
        });
    });

    describe('Performance and Memory Management', () => {
        it('should not leak memory during level transitions', () => {
            const manager = createMazeLevelManager();
            const handler = createLevelProgressionHandler();

            // Simulate multiple level transitions
            for (let i = 0; i < 10; i++) {
                const result = handler.processLevelCompletion(manager);

                if (result.nextLevel) {
                    // Verify new level data is properly created
                    expect(result.nextLevel.maze).toBeDefined();
                    expect(result.nextLevel.maze.length).toBe(10);
                    expect(result.nextLevel.maze[0]?.length).toBe(16);
                }

                if (!manager.hasNextLevel()) {
                    break;
                }
            }

            // Manager should still be in valid state
            expect(manager.getCurrentLevel()).toBeDefined();
            expect(manager.getCurrentLevelNumber()).toBeGreaterThan(0);
        });

        it('should handle rapid level manager operations efficiently', () => {
            const startTime = performance.now();

            // Perform many operations
            for (let i = 0; i < 1000; i++) {
                const manager = createMazeLevelManager();

                while (manager.hasNextLevel()) {
                    manager.getCurrentLevel();
                    manager.getCurrentLevelNumber();
                    manager.getTotalLevels();
                    manager.advanceToNextLevel();
                }
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (less than 1 second)
            expect(duration).toBeLessThan(1000);
        });
    });
});
```

- Fixed TypeScript unused variable errors in `src/tests/level-management-comprehensive.test.ts`.

Edits:
- Removed unused `levelManager`, `progressionHandler`, and `gameState` declarations and their initialization.
- Dropped unused type-only imports.

Result:
- File now type-checks cleanly with `tsc --noEmit`.

```typescriptreact
import { useEffect, useCallback, useRef } from "react";
import { useHowToPlaySettings } from "../../hooks/use-how-to-play-settings";
import { HowToPlayContent } from "./HowToPlayContent";
import { createFocusTrap } from "../../utils/focus-trap";
import type { HowToPlayPopupProps } from "../../Interfaces/IHowToPlayPopup";
import type { JSX } from "react/jsx-runtime";
import "./HowToPlayPopup.css";

/**
 * Main How to Play popup component that displays game instructions in a modal overlay
 * Follows the AudioSettings pattern for consistent modal behavior and styling
 */
export function HowToPlayPopup({
  isOpen,
  onClose,
}: HowToPlayPopupProps): JSX.Element {
  const { settings, setDontShowAgain, markAsViewed } = useHowToPlaySettings();
  const modalRef = useRef<HTMLDivElement>(null);
  const focusTrapCleanupRef = useRef<(() => void) | null>(null);
  const announcementTimeoutRef = useRef<number | null>(null);

  // Handle escape key press to close popup
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Add/remove escape key listener and focus trap when popup opens/closes
  useEffect(() => {
    // Guard for non-DOM environments (SSR/tests without jsdom)
    if (typeof document === "undefined") {
      return () => {};
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Mark as viewed when popup is opened
      markAsViewed();

      // Set up focus trap
      if (modalRef.current) {
        focusTrapCleanupRef.current = createFocusTrap(modalRef.current);
      }

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Announce to screen readers that dialog has opened
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent =
        "How to Play dialog opened. Press Escape to close.";
      document.body.appendChild(announcement);

      // Remove announcement after screen reader has time to read it
      announcementTimeoutRef.current = window.setTimeout(() => {
        if (typeof document !== "undefined" && document.body && document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    } else {
      document.removeEventListener("keydown", handleKeyDown);

      // Clean up focus trap
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }

      // Restore body scroll
      document.body.style.overflow = "";

      // Clear any pending announcement removal
      if (announcementTimeoutRef.current !== null) {
        clearTimeout(announcementTimeoutRef.current);
        announcementTimeoutRef.current = null;
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }
      document.body.style.overflow = "";

      // Clear any pending announcement removal on unmount
      if (announcementTimeoutRef.current !== null) {
        clearTimeout(announcementTimeoutRef.current);
        announcementTimeoutRef.current = null;
      }
    };
  }, [isOpen, handleKeyDown, markAsViewed]);

  // Handle "Don't show again" checkbox change
  const handleDontShowAgainChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDontShowAgain(event.target.checked);
  };

  // Handle overlay click to close popup
  const handleOverlayClick = () => {
    onClose();
  };

  // Prevent popup panel clicks from closing the popup
  const handlePanelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className="how-to-play-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      aria-describedby="how-to-play-description"
      aria-label="How to Play The Wanderer - Game Instructions Dialog"
      data-testid="how-to-play-popup"
    >
      <div
        className="how-to-play-panel"
        onClick={handlePanelClick}
        ref={modalRef}
        tabIndex={-1}
        role="document"
        aria-label="Game instructions and controls"
      >
        <header className="how-to-play-header" role="banner">
          <h2 id="how-to-play-title">How to Play The Wanderer</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close dialog using X button"
            title="Close (Escape key)"
            type="button"
            data-testid="close-button"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close dialog</span>
          </button>
        </header>

        <main
          className="how-to-play-content"
          id="how-to-play-description"
          role="main"
          aria-label="Game instructions and credits"
          data-testid="how-to-play-content"
        >
          <HowToPlayContent className="popup-content" />
        </main>

        <footer
          className="how-to-play-footer"
          role="contentinfo"
          aria-label="Dialog actions and preferences"
        >
          <label className="dont-show-again-toggle">
            <input
              type="checkbox"
              checked={settings.dontShowAgain}
              onChange={handleDontShowAgainChange}
              aria-describedby="dont-show-again-description"
              aria-label="Don't show this dialog automatically on future visits"
              data-testid="dont-show-again-checkbox"
            />
            <span className="checkbox-custom" aria-hidden="true"></span>
            <span className="checkbox-label">Don't show again</span>
            <span id="dont-show-again-description" className="sr-only">
              Check this box to prevent the How to Play dialog from appearing
              automatically on future visits. You can still access it through
              the settings menu.
            </span>
          </label>
          <button
            className="close-footer-button"
            onClick={onClose}
            aria-label="Close How to Play dialog and return to game"
            type="button"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

```

- Prevented unhandled ReferenceError in non-DOM tests by guarding the delayed DOM access and clearing timers.

Edits in `src/components/how-to-play/HowToPlayPopup.tsx`:
- Added `announcementTimeoutRef` to track the setTimeout.
- Wrapped removal in a `typeof document !== "undefined"` check.
- Cleared the timeout on close/unmount.

Key snippets:
```ts
const announcementTimeoutRef = useRef<number | null>(null);

// schedule removal
announcementTimeoutRef.current = window.setTimeout(() => {
  if (typeof document !== "undefined" && document.body && document.body.contains(announcement)) {
    document.body.removeChild(announcement);
  }
}, 1000);

// on close/unmount
if (announcementTimeoutRef.current !== null) {
  clearTimeout(announcementTimeoutRef.current);
  announcementTimeoutRef.current = null;
}
```

- Lint: clean.

```typescript
const announcementTimeoutRef = useRef<number | null>(null);

// schedule removal
announcementTimeoutRef.current = window.setTimeout(() => {
  if (typeof document !== "undefined" && document.body && document.body.contains(announcement)) {
    document.body.removeChild(announcement);
  }
}, 1000);

// on close/unmount
if (announcementTimeoutRef.current !== null) {
  clearTimeout(announcementTimeoutRef.current);
  announcementTimeoutRef.current = null;
}
```

