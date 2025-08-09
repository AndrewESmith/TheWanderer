# Resolve unused variable warning
_Exported on 8/9/2025 at 17:15:22 GMT+10 from Cursor (1.4.3)_

---

**User**

For the code present, we get this error:
```
'loadImageWithRetryMemo' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```typescript
// Memoized image loading function to prevent recreation
const loadImageWithRetryMemo = React.useCallback(loadImageWithRetry, []);
```

Delete the unused memoized var. In `src/App.tsx`, remove these lines:

```ts
// Memoized image loading function to prevent recreation
const loadImageWithRetryMemo = React.useCallback(loadImageWithRetry, []);
```

If you actually plan to use it later, keep the function `loadImageWithRetry` and wire it into the `Cell` image-loading effect; otherwise just remove the memoized reference.

- Removed unused `loadImageWithRetryMemo` declaration to fix TS6133 warning.

```typescript
// Memoized image loading function to prevent recreation
const loadImageWithRetryMemo = React.useCallback(loadImageWithRetry, []);
```

---

**User**

For the code present, we get this error:
```
'colorsLoading' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Remove the unused binding from the destructure.

Change:
```ts
const { dominantColors, isLoading: colorsLoading } = useDominantColors();
```

To:
```ts
const { dominantColors } = useDominantColors();
```

- Fixes TS6133 by not declaring `colorsLoading`.

```typescript
const { dominantColors, isLoading: colorsLoading } = useDominantColors();
```

```typescript
const { dominantColors } = useDominantColors();
```

---

**User**

For the code present, we get this error:
```
'imageLoadingState' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```javascript
const [imageLoadingState, setImageLoadingState] = React.useState<ImageLoadingState>({ ... });
```

```javascript
const [, setImageLoadingState] = React.useState<ImageLoadingState>({ ... });
```

Drop the unused state binding.

Change:
```ts
const [imageLoadingState, setImageLoadingState] =
  React.useState<ImageLoadingState>({ /* ... */ });
```

To:
```ts
const [, setImageLoadingState] =
  React.useState<ImageLoadingState>({ /* ... */ });
```

If you don’t need re-renders from this, replace both with a ref:
```ts
const imageLoadingStateRef = React.useRef<ImageLoadingState>({ /* ... */ });
// in effect:
imageLoadingStateRef.current = loadingState;
``` 

- Fixes TS6133 by not declaring an unused variable.

```typescript
const [imageLoadingState, setImageLoadingState] =
  React.useState<ImageLoadingState>({ /* ... */ });
```

```typescript
const [, setImageLoadingState] =
  React.useState<ImageLoadingState>({ /* ... */ });
```

```typescript
const imageLoadingStateRef = React.useRef<ImageLoadingState>({ /* ... */ });
// in effect:
imageLoadingStateRef.current = loadingState;
```

---

**User**

For the code present, we get this error:
```
'loadImageWithRetry' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```typescript
// Utility function to handle image loading with retry logic
function loadImageWithRetry(imagePath: string, maxRetries: number = 2): Promise<boolean> {
  ...
}
```

Delete the unused function.

Remove this block from `src/App.tsx`:
```ts
// Utility function to handle image loading with retry logic
function loadImageWithRetry(
  imagePath: string,
  maxRetries: number = 2
): Promise<boolean> {
  return new Promise((resolve) => {
    let retryCount = 0;
    const attemptLoad = () => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        retryCount++;
        if (retryCount <= maxRetries) {
          setTimeout(attemptLoad, 1000 * retryCount);
        } else {
          resolve(false);
        }
      };
      img.src = imagePath;
    };
    attemptLoad();
  });
}
```

If you need to keep it, actually use it in the `Cell` effect; otherwise, removing it clears TS6133.

- Removed unused `loadImageWithRetry` to silence the warning.

```typescript
// Utility function to handle image loading with retry logic
function loadImageWithRetry(
  imagePath: string,
  maxRetries: number = 2
): Promise<boolean> {
  return new Promise((resolve) => {
    let retryCount = 0;
    const attemptLoad = () => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        retryCount++;
        if (retryCount <= maxRetries) {
          setTimeout(attemptLoad, 1000 * retryCount);
        } else {
          resolve(false);
        }
      };
      img.src = imagePath;
    };
    attemptLoad();
  });
}
```

---

**User**

For the code present, we get this error:
```
'manager' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Scanning the test file to find unused `manager` declarations so I can replace them with side-effect-only instantiations.

Replace unused test instantiations with side-effect-only calls.

Do this in `src/audio/__tests__/error-handling.test.ts` where the variable isn’t used afterward:

- Line 157: change `const manager = new WebAudioManager();` to `new WebAudioManager();`
- Line 197: change `const manager = new WebAudioManager();` to `new WebAudioManager();`
- Line 462: change `const manager = new WebAudioManager();` to `new WebAudioManager();`

If you use `manager` later in a test, keep it as-is.

- Fixed TS6133 by removing unused `manager` bindings in tests while preserving side effects.

---

**User**

For the code present, we get this error:
```
'reinitializeAudio' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Remove the unused binding from the destructure.

Change in `src/audio/components/audio-error-display.tsx`:
```ts
- const { error, fallbackMode, autoplayAllowed, reinitializeAudio } = useAudioContext();
+ const { error, fallbackMode, autoplayAllowed } = useAudioContext();
```

- Eliminates TS6133 for `reinitializeAudio`.

```typescript
- const { error, fallbackMode, autoplayAllowed, reinitializeAudio } = useAudioContext();
+ const { error, fallbackMode, autoplayAllowed } = useAudioContext();
```

---

**User**

For the code present, we get this error:
```
Cannot find namespace 'JSX'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Change the return type to avoid the global JSX namespace.

Replace:
```ts
}: AudioControlProps = {}): JSX.Element {
```
with:
```ts
}: AudioControlProps = {}): React.ReactElement {
```

Alternatively, keep `JSX.Element` by adding:
```ts
import type { JSX } from "react";
```

```typescript
}: AudioControlProps = {}): JSX.Element {
```

```typescript
}: AudioControlProps = {}): React.ReactElement {
```

```typescript
import type { JSX } from "react";
```

---

**User**

For the code present, we get this error:
```
'fromCell' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I'll scan for all usages of `mapPlayerMovementToSound` to see if it's safe to drop the unused `fromCell` parameter or if we should mark it as used.

```typescript
export function mapPlayerMovementToSound(
    _fromCell: MazeCell,
    toCell: MazeCell
): SoundEvent | null {
```

```typescript
export function mapPlayerMovementToSound(toCell: MazeCell): SoundEvent | null { ... }
```

Rename the unused param to be ignored by lint.

Change in `src/audio/events/sound-event-mapper.ts`:
```ts
- export function mapPlayerMovementToSound(
-     fromCell: MazeCell,
-     toCell: MazeCell
- ): SoundEvent | null {
+ export function mapPlayerMovementToSound(
+     _fromCell: MazeCell,
+     toCell: MazeCell
+ ): SoundEvent | null {
```

Alternative: remove it entirely:
```ts
export function mapPlayerMovementToSound(toCell: MazeCell): SoundEvent | null { ... }
```

- Keeps API calls working; silences TS/ESLint unused param.

```typescript
- export function mapPlayerMovementToSound(
-     fromCell: MazeCell,
-     toCell: MazeCell
- ): SoundEvent | null {
+ export function mapPlayerMovementToSound(
+     _fromCell: MazeCell,
+     toCell: MazeCell
+ ): SoundEvent | null {
```

```typescript
export function mapPlayerMovementToSound(toCell: MazeCell): SoundEvent | null { ... }
```

---

**User**

For the code present, we get this error:
```
Expected 1 arguments, but got 0.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Use a no-op implementation.

In `src/audio/hooks/__tests__/use-audio-settings.test.ts`, change:
```ts
const consoleSpy = vi.spyOn(console, 'warn').mockImplementation();
```
to:
```ts
const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
```

- Satisfies the required function argument; keeps the spy silenced.

```typescript
const consoleSpy = vi.spyOn(console, 'warn').mockImplementation();
```

```typescript
const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
```

---

**User**

For the code present, we get this error:
```
'error' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Remove the unused property from the destructure.

In `src/audio/hooks/use-sound.ts`, change:
```ts
const { type, error, details } = event.detail;
```
to:
```ts
const { type, details } = event.detail;
```
(or rename to `_error` if you want to keep it).

```typescript
const { type, error, details } = event.detail;
```

```typescript
const { type, details } = event.detail;
```

---

**User**

For the code present, we get this error:
```
Module './managers/audio-manager' has already exported a member named 'createAudioManager'. Consider explicitly re-exporting to resolve the ambiguity.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

I'll check which modules export the conflicting names so I can make `src/audio/index.ts` re-export only one of them or alias appropriately.

Making a small edit to `src/audio/index.ts` to switch from wildcard re-exports to explicit named re-exports, avoiding duplicate `createAudioManager` and `SilentAudioManager` symbols.

```typescript
// Audio system exports
export * from './config/sound-config';

// Avoid duplicate exports by explicitly selecting symbols
export { WebAudioManager } from './managers/audio-manager';
export { createAudioManager, createSpecificAudioManager } from './managers/audio-manager-factory';
export { HTML5AudioManager } from './managers/html5-audio-manager';
export { SilentAudioManager } from './managers/silent-audio-manager';

export * from './hooks/use-sound';
export * from './hooks/use-audio-settings';
export * from './context/audio-context';
export * from './utils/audio-utils';
export * from './components/audio-error-display';
```

Ran a quick explicit re-export edit in `src/audio/index.ts` to avoid duplicate named exports by selecting symbols, exposing `createAudioManager` only from the factory module. I'll verify there are no new linter issues in that file.

- In `src/audio/index.ts`, replace wildcard exports causing conflicts with explicit re-exports:
```ts
export { WebAudioManager } from './managers/audio-manager';
export { createAudioManager, createSpecificAudioManager } from './managers/audio-manager-factory';
export { HTML5AudioManager } from './managers/html5-audio-manager';
export { SilentAudioManager } from './managers/silent-audio-manager';
```
- Keeps a single `createAudioManager` source and resolves the ambiguity.

- Explicit re-exports added; linter clean.

```typescript
export { WebAudioManager } from './managers/audio-manager';
export { createAudioManager, createSpecificAudioManager } from './managers/audio-manager-factory';
export { HTML5AudioManager } from './managers/html5-audio-manager';
export { SilentAudioManager } from './managers/silent-audio-manager';
```

---

**User**

For the code present, we get this error:
```
This comparison appears to be unintentional because the types '"suspended" | "closed"' and '"running"' have no overlap.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Making a minimal type-safe change to avoid comparing against a value excluded by TypeScript's narrowed union after the earlier check. I'll adjust the comparison to check for non-suspended and non-closed states.

```typescript
// Audio utility functions for browser compatibility and format detection

/**
 * Check if Web Audio API is supported by the browser
 * Performs a more thorough check than just checking for AudioContext existence
 */
export function isWebAudioSupported(): boolean {
    try {
        // Check for AudioContext constructor
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
            return false;
        }

        // Try to create an audio context
        const context = new AudioContextClass();
        if (!context) {
            return false;
        }

        // Check for essential methods
        if (!context.createGain || !context.createBufferSource || !context.createBuffer) {
            context.close();
            return false;
        }

        // Check if we can create and connect nodes
        try {
            const gain = context.createGain();
            const source = context.createBufferSource();
            source.connect(gain);
            gain.connect(context.destination);
            context.close();
            return true;
        } catch (e) {
            context.close();
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * Check if HTML5 Audio is supported by the browser
 * Performs a more thorough check than just checking for Audio constructor
 */
export function isHTML5AudioSupported(): boolean {
    try {
        // Check for Audio constructor
        if (!window.Audio) {
            return false;
        }

        // Try to create an audio element
        const audio = new Audio();

        // Check for essential properties and methods
        if (typeof audio.canPlayType !== 'function') {
            return false;
        }

        // Check if we can set source and control playback
        try {
            audio.volume = 0;
            return true;
        } catch (e) {
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * Get the first supported audio format from a list of formats
 * @param formats List of file extensions (e.g., ['mp3', 'ogg'])
 * @returns The first supported format or null if none are supported
 */
export function getSupportedAudioFormat(formats: string[]): string | null {
    if (!isHTML5AudioSupported()) {
        return null;
    }

    try {
        const audio = new Audio();

        for (const format of formats) {
            const mimeType = getMimeTypeFromExtension(format);
            if (mimeType) {
                const support = audio.canPlayType(mimeType);
                if (support === 'probably' || support === 'maybe') {
                    return format;
                }
            }
        }
    } catch (e) {
        // Format support check failed
    }

    return null;
}

/**
 * Get MIME type from file extension
 * @param filePath File path or extension
 * @returns MIME type or null if unknown extension
 */
function getMimeTypeFromExtension(filePath: string): string | null {
    const extension = filePath.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'mp3':
            return 'audio/mpeg';
        case 'ogg':
            return 'audio/ogg';
        case 'wav':
            return 'audio/wav';
        case 'm4a':
            return 'audio/mp4';
        case 'aac':
            return 'audio/aac';
        case 'flac':
            return 'audio/flac';
        default:
            return null;
    }
}

/**
 * Create an AudioContext with error handling
 * @returns AudioContext instance or null if creation fails
 */
export function createAudioContext(): AudioContext | null {
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
            return null;
        }

        return new AudioContextClass();
    } catch (error) {
        console.warn('Failed to create AudioContext:', error);
        return null;
    }
}

/**
 * Check if the browser has autoplay restrictions
 * @returns Promise that resolves to true if autoplay is allowed, false otherwise
 */
export async function canAutoplay(): Promise<boolean> {
    try {
        // Create a test audio context
        const audioContext = createAudioContext();
        if (!audioContext) {
            return false;
        }

        // Check initial state
        if (audioContext.state === 'running') {
            audioContext.close();
            return true;
        }

        // Try to resume and see if it works
        try {
            await audioContext.resume();
            const result = audioContext.state !== 'suspended' && audioContext.state !== 'closed';
            audioContext.close();
            return result;
        } catch (e) {
            audioContext.close();
            return false;
        }
    } catch (e) {
        console.warn('Autoplay check failed:', e);
        return false;
    }
}

/**
 * Detect browser type for browser-specific audio handling
 * @returns Object with browser detection flags
 */
export function detectBrowser(): {
    isSafari: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isIOS: boolean;
    isMobile: boolean;
} {
    const ua = navigator.userAgent.toLowerCase();

    return {
        isSafari: /^((?!chrome|android).)*safari/i.test(ua),
        isChrome: /chrome/.test(ua) && !/edge|edg/.test(ua),
        isFirefox: /firefox/.test(ua),
        isIOS: /iphone|ipad|ipod/.test(ua) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
        isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
    };
}
```

- In `src/audio/utils/audio-utils.ts`, change the state check after `resume()`:
```ts
- const result = audioContext.state === 'running';
+ const result = audioContext.state !== 'suspended' && audioContext.state !== 'closed';
```
- Avoids comparing to a value excluded by the narrowed union and satisfies TS.

- Linter clean on that file.

```typescript
- const result = audioContext.state === 'running';
+ const result = audioContext.state !== 'suspended' && audioContext.state !== 'closed';
```

---

**User**

For the code present, we get this error:
```
'error' is declared but its value is never read.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Rename the unused param to be ignored.

In `src/audio/utils/error-handling.ts`:
```ts
- private async handleContextCreationFailure(error: AudioError): Promise<boolean> {
+ private async handleContextCreationFailure(_error: AudioError): Promise<boolean> {
```

- Silences TS/ESLint unused parameter without changing behavior.

```typescript
- private async handleContextCreationFailure(error: AudioError): Promise<boolean> {
+ private async handleContextCreationFailure(_error: AudioError): Promise<boolean> {
```

---

**User**

For the code present, we get this error:
```
Duplicate function implementation.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

```typescript
export {};
```

Add a module marker so this file doesn’t pollute the global scope.

At the top of `src/debug-all-levels.ts`, insert:
```ts
export {};
```

If you truly have two `countElements` in this same file, delete/rename one; otherwise this fixes the cross-file “duplicate implementation” caused by global script scope.

```typescript
export {};
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

Use non-null assertions (you have noUncheckedIndexedAccess on).

Change:
```ts
for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    const cell = maze[y][x];
```
to:
```ts
for (let y = 0; y < maze.length; y++) {
  const row = maze[y]!;
  for (let x = 0; x < row.length; x++) {
    const cell = row[x]!;
```

Alternative: add guards:
```ts
const row = maze[y];
if (!row) continue;
const cell = row[x];
if (cell == null) continue;
```

```typescript
for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    const cell = maze[y][x];
```

```typescript
for (let y = 0; y < maze.length; y++) {
  const row = maze[y]!;
  for (let x = 0; x < row.length; x++) {
    const cell = row[x]!;
```

```typescript
const row = maze[y];
if (!row) continue;
const cell = row[x];
if (cell == null) continue;
```

---

**User**

For the code present, we get this error:
```
Cannot find name 'simulatePhysicsStepWithState'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Looking for where the physics simulation function is defined to import it correctly, or to replace it with the appropriate existing function.

Import it from the physics engine.

At the top of `src/GameState.ts`, add:
```ts
import { simulatePhysicsStepWithState } from "./physics/physics-engine";
```

- This resolves the missing name by referencing the exported function.

```typescript
import { simulatePhysicsStepWithState } from "./physics/physics-engine";
```

---

**User**

For the code present, we get this error:
```
Object literal may only specify known properties, and 'context' does not exist in type '{ levelNumber?: number | undefined; operationName?: string | undefined; }'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Remove the unsupported `context` property from the options.

Change in `src/levels/level-progression-handler.ts`:
```ts
-         }, 'level_progression_failed', {
-             operationName: 'Emit level progression sound',
-             context: { soundType: result.soundToPlay, isGameComplete: result.isGameComplete }
-         });
+         }, 'level_progression_failed', {
+             operationName: `Emit level progression sound (${result.soundToPlay}, isGameComplete=${result.isGameComplete})`
+         });
```

- Keeps types happy without modifying the helper’s type.

```typescript
-         }, 'level_progression_failed', {
-             operationName: 'Emit level progression sound',
-             context: { soundType: result.soundToPlay, isGameComplete: result.isGameComplete }
-         });
+         }, 'level_progression_failed', {
+             operationName: `Emit level progression sound (${result.soundToPlay}, isGameComplete=${result.isGameComplete})`
+         });
```

---

**User**

For the code present, we get this error:
```
'actualCounts.diamonds' is possibly 'undefined'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Define a concrete return type for `countMazeElements` so its keys aren’t optional.

In `src/levels/level-validation.ts`:

- Add a type:
```ts
type MazeElementCounts = {
  diamonds: number; bombs: number; exits: number; players: number;
  rocks: number; boulders: number; empty: number; soil: number;
};
```

- Change the function signature and annotation:
```ts
- function countMazeElements(maze: unknown[][]): Record<string, number> {
-   const counts = {
+ function countMazeElements(maze: unknown[][]): MazeElementCounts {
+   const counts: MazeElementCounts = {
      diamonds: 0, bombs: 0, exits: 0, players: 0,
      rocks: 0, boulders: 0, empty: 0, soil: 0
   };
```

Alternative quick fix: use `const diamonds = actualCounts.diamonds ?? 0;` and compare `diamonds`.

```typescript
type MazeElementCounts = {
  diamonds: number; bombs: number; exits: number; players: number;
  rocks: number; boulders: number; empty: number; soil: number;
};
```

```typescript
- function countMazeElements(maze: unknown[][]): Record<string, number> {
-   const counts = {
+ function countMazeElements(maze: unknown[][]): MazeElementCounts {
+   const counts: MazeElementCounts = {
      diamonds: 0, bombs: 0, exits: 0, players: 0,
      rocks: 0, boulders: 0, empty: 0, soil: 0
   };
```

---

**User**

can you apply the changes?

---

**Cursor**

Applying a concrete type to `countMazeElements` in `src/levels/level-validation.ts` and updating its return and local variable types to eliminate the optionality that caused the "possibly 'undefined'" errors.

```typescript
*** Begin Patch
*** Update File: src/levels/level-validation.ts
@@
 export interface LevelValidationResult {
     isValid: boolean;
     errors: LevelValidationError[];
     warnings: LevelValidationError[];
 }
@@
 export interface LevelValidationResult {
     isValid: boolean;
     errors: LevelValidationError[];
     warnings: LevelValidationError[];
 }
+
+// Concrete counts type to avoid optional keys
+type MazeElementCounts = {
+    diamonds: number;
+    bombs: number;
+    exits: number;
+    players: number;
+    rocks: number;
+    boulders: number;
+    empty: number;
+    soil: number;
+};
@@
-/**
- * Counts elements in the maze
- */
-function countMazeElements(maze: unknown[][]): Record<string, number> {
-    const counts = {
-        diamonds: 0,
-        bombs: 0,
-        exits: 0,
-        players: 0,
-        rocks: 0,
-        boulders: 0,
-        empty: 0,
-        soil: 0
-    };
+/**
+ * Counts elements in the maze
+ */
+function countMazeElements(maze: unknown[][]): MazeElementCounts {
+    const counts: MazeElementCounts = {
+        diamonds: 0,
+        bombs: 0,
+        exits: 0,
+        players: 0,
+        rocks: 0,
+        boulders: 0,
+        empty: 0,
+        soil: 0
+    };
*** End Patch
```

```typescript
import type { MazeLevelData } from "../Interfaces/IMazeLevelData";
import { CELL } from "../maze";

/**
 * Validation error types for level data
 */
export interface LevelValidationError {
    type: 'dimension' | 'element_count' | 'position' | 'structure' | 'data_integrity';
    message: string;
    levelNumber?: number;
    details?: Record<string, unknown>;
}

/**
 * Validation result containing errors and warnings
 */
export interface LevelValidationResult {
    isValid: boolean;
    errors: LevelValidationError[];
    warnings: LevelValidationError[];
}

// Concrete counts type to avoid optional keys
type MazeElementCounts = {
    diamonds: number;
    bombs: number;
    exits: number;
    players: number;
    rocks: number;
    boulders: number;
    empty: number;
    soil: number;
};

/**
 * Element count constraints for validation
 */
const ELEMENT_CONSTRAINTS = {
    diamonds: { min: 1, max: 10 },
    bombs: { min: 1, max: 3 },
    rocks: { min: 1, max: 6 },
    exits: { exact: 1 },
    players: { exact: 1 }
} as const;

/**
 * Maze dimension constraints
 */
const MAZE_DIMENSIONS = {
    width: 16,
    height: 10
} as const;

/**
 * Validates maze dimensions
 */
function validateMazeDimensions(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    if (!level.maze || !Array.isArray(level.maze)) {
        errors.push({
            type: 'structure',
            message: 'Maze data is missing or not an array',
            levelNumber: level.levelNumber
        });
        return errors;
    }

    if (level.maze.length !== MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'dimension',
            message: `Invalid maze height: expected ${MAZE_DIMENSIONS.height}, got ${level.maze.length}`,
            levelNumber: level.levelNumber,
            details: { expected: MAZE_DIMENSIONS.height, actual: level.maze.length }
        });
    }

    // Check each row
    for (let y = 0; y < level.maze.length; y++) {
        const row = level.maze[y];
        if (!Array.isArray(row)) {
            errors.push({
                type: 'structure',
                message: `Maze row ${y} is not an array`,
                levelNumber: level.levelNumber,
                details: { row: y }
            });
            continue;
        }

        if (row.length !== MAZE_DIMENSIONS.width) {
            errors.push({
                type: 'dimension',
                message: `Invalid maze width at row ${y}: expected ${MAZE_DIMENSIONS.width}, got ${row.length}`,
                levelNumber: level.levelNumber,
                details: { row: y, expected: MAZE_DIMENSIONS.width, actual: row.length }
            });
        }
    }

    return errors;
}

/**
 * Counts elements in the maze
 */
function countMazeElements(maze: unknown[][]): MazeElementCounts {
    const counts: MazeElementCounts = {
        diamonds: 0,
        bombs: 0,
        exits: 0,
        players: 0,
        rocks: 0,
        boulders: 0,
        empty: 0,
        soil: 0
    };

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y]!.length; x++) {
            const cell = maze[y]![x];
            switch (cell) {
                case CELL.DIAMOND:
                    counts.diamonds++;
                    break;
                case CELL.BOMB:
                    counts.bombs++;
                    break;
                case CELL.EXIT:
                    counts.exits++;
                    break;
                case CELL.PLAYER:
                    counts.players++;
                    break;
                case CELL.ROCK:
                    counts.rocks++;
                    break;
                case CELL.BOULDER:
                    counts.boulders++;
                    break;
                case CELL.EMPTY:
                    counts.empty++;
                    break;
                case CELL.SOIL:
                    counts.soil++;
                    break;
            }
        }
    }

    return counts;
}

/**
 * Validates element counts in the maze
 */
function validateElementCounts(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];
    const actualCounts = countMazeElements(level.maze);

    // Validate diamonds
    if (actualCounts.diamonds !== level.diamondCount) {
        errors.push({
            type: 'element_count',
            message: `Diamond count mismatch: expected ${level.diamondCount}, found ${actualCounts.diamonds}`,
            levelNumber: level.levelNumber,
            details: { expected: level.diamondCount, actual: actualCounts.diamonds }
        });
    }

    if (actualCounts.diamonds < ELEMENT_CONSTRAINTS.diamonds.min ||
        actualCounts.diamonds > ELEMENT_CONSTRAINTS.diamonds.max) {
        errors.push({
            type: 'element_count',
            message: `Diamond count out of range: expected ${ELEMENT_CONSTRAINTS.diamonds.min}-${ELEMENT_CONSTRAINTS.diamonds.max}, got ${actualCounts.diamonds}`,
            levelNumber: level.levelNumber,
            details: {
                min: ELEMENT_CONSTRAINTS.diamonds.min,
                max: ELEMENT_CONSTRAINTS.diamonds.max,
                actual: actualCounts.diamonds
            }
        });
    }

    // Validate bombs
    if (actualCounts.bombs !== level.bombCount) {
        errors.push({
            type: 'element_count',
            message: `Bomb count mismatch: expected ${level.bombCount}, found ${actualCounts.bombs}`,
            levelNumber: level.levelNumber,
            details: { expected: level.bombCount, actual: actualCounts.bombs }
        });
    }

    if (actualCounts.bombs < ELEMENT_CONSTRAINTS.bombs.min ||
        actualCounts.bombs > ELEMENT_CONSTRAINTS.bombs.max) {
        errors.push({
            type: 'element_count',
            message: `Bomb count out of range: expected ${ELEMENT_CONSTRAINTS.bombs.min}-${ELEMENT_CONSTRAINTS.bombs.max}, got ${actualCounts.bombs}`,
            levelNumber: level.levelNumber,
            details: {
                min: ELEMENT_CONSTRAINTS.bombs.min,
                max: ELEMENT_CONSTRAINTS.bombs.max,
                actual: actualCounts.bombs
            }
        });
    }

    // Validate exits
    if (actualCounts.exits !== ELEMENT_CONSTRAINTS.exits.exact) {
        errors.push({
            type: 'element_count',
            message: `Exit count invalid: expected exactly ${ELEMENT_CONSTRAINTS.exits.exact}, found ${actualCounts.exits}`,
            levelNumber: level.levelNumber,
            details: { expected: ELEMENT_CONSTRAINTS.exits.exact, actual: actualCounts.exits }
        });
    }

    // Validate players
    if (actualCounts.players !== ELEMENT_CONSTRAINTS.players.exact) {
        errors.push({
            type: 'element_count',
            message: `Player count invalid: expected exactly ${ELEMENT_CONSTRAINTS.players.exact}, found ${actualCounts.players}`,
            levelNumber: level.levelNumber,
            details: { expected: ELEMENT_CONSTRAINTS.players.exact, actual: actualCounts.players }
        });
    }

    return errors;
}

/**
 * Validates player and exit positions
 */
function validatePositions(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    // Validate player start position
    const { x: playerX, y: playerY } = level.playerStartPosition;

    if (playerX < 0 || playerX >= MAZE_DIMENSIONS.width ||
        playerY < 0 || playerY >= MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'position',
            message: `Player start position out of bounds: (${playerX}, ${playerY})`,
            levelNumber: level.levelNumber,
            details: { position: { x: playerX, y: playerY }, bounds: MAZE_DIMENSIONS }
        });
    } else {
        // Check if player is actually at the specified position
        const cellAtPlayerPos = level.maze[playerY]?.[playerX];
        if (cellAtPlayerPos !== CELL.PLAYER) {
            errors.push({
                type: 'position',
                message: `Player not found at specified start position (${playerX}, ${playerY}), found: ${cellAtPlayerPos}`,
                levelNumber: level.levelNumber,
                details: { position: { x: playerX, y: playerY }, foundCell: cellAtPlayerPos }
            });
        }
    }

    // Validate exit position
    const { x: exitX, y: exitY } = level.exitPosition;

    if (exitX < 0 || exitX >= MAZE_DIMENSIONS.width ||
        exitY < 0 || exitY >= MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'position',
            message: `Exit position out of bounds: (${exitX}, ${exitY})`,
            levelNumber: level.levelNumber,
            details: { position: { x: exitX, y: exitY }, bounds: MAZE_DIMENSIONS }
        });
    } else {
        // Check if exit is actually at the specified position
        const cellAtExitPos = level.maze[exitY]?.[exitX];
        if (cellAtExitPos !== CELL.EXIT) {
            errors.push({
                type: 'position',
                message: `Exit not found at specified position (${exitX}, ${exitY}), found: ${cellAtExitPos}`,
                levelNumber: level.levelNumber,
                details: { position: { x: exitX, y: exitY }, foundCell: cellAtExitPos }
            });
        }
    }

    return errors;
}

/**
 * Validates basic data integrity
 */
function validateDataIntegrity(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    // Check level number
    if (typeof level.levelNumber !== 'number' || level.levelNumber < 1) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid level number: ${level.levelNumber}`,
            levelNumber: level.levelNumber,
            details: { levelNumber: level.levelNumber }
        });
    }

    // Check move limit
    if (typeof level.moveLimit !== 'number' || level.moveLimit < 1) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid move limit: ${level.moveLimit}`,
            levelNumber: level.levelNumber,
            details: { moveLimit: level.moveLimit }
        });
    }

    // Check counts are non-negative
    if (typeof level.diamondCount !== 'number' || level.diamondCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid diamond count: ${level.diamondCount}`,
            levelNumber: level.levelNumber,
            details: { diamondCount: level.diamondCount }
        });
    }

    if (typeof level.bombCount !== 'number' || level.bombCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid bomb count: ${level.bombCount}`,
            levelNumber: level.levelNumber,
            details: { bombCount: level.bombCount }
        });
    }

    if (typeof level.rockCount !== 'number' || level.rockCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid rock count: ${level.rockCount}`,
            levelNumber: level.levelNumber,
            details: { rockCount: level.rockCount }
        });
    }

    return errors;
}

/**
 * Validates maze structure for basic playability
 */
function validateMazeStructure(level: MazeLevelData): LevelValidationError[] {
    const warnings: LevelValidationError[] = [];

    // Check if maze has proper borders (all edges should be rocks)
    const maze = level.maze;

    // Check top and bottom borders
    for (let x = 0; x < MAZE_DIMENSIONS.width; x++) {
        if (maze[0]?.[x] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Top border not properly sealed at column ${x}`,
                levelNumber: level.levelNumber,
                details: { position: { x, y: 0 }, cell: maze[0]?.[x] }
            });
        }

        if (maze[MAZE_DIMENSIONS.height - 1]?.[x] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Bottom border not properly sealed at column ${x}`,
                levelNumber: level.levelNumber,
                details: { position: { x, y: MAZE_DIMENSIONS.height - 1 }, cell: maze[MAZE_DIMENSIONS.height - 1]?.[x] }
            });
        }
    }

    // Check left and right borders
    for (let y = 0; y < MAZE_DIMENSIONS.height; y++) {
        if (maze[y]?.[0] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Left border not properly sealed at row ${y}`,
                levelNumber: level.levelNumber,
                details: { position: { x: 0, y }, cell: maze[y]?.[0] }
            });
        }

        if (maze[y]?.[MAZE_DIMENSIONS.width - 1] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Right border not properly sealed at row ${y}`,
                levelNumber: level.levelNumber,
                details: { position: { x: MAZE_DIMENSIONS.width - 1, y }, cell: maze[y]?.[MAZE_DIMENSIONS.width - 1] }
            });
        }
    }

    return warnings;
}

/**
 * Comprehensive validation function for a single level
 */
export function validateLevel(level: MazeLevelData): LevelValidationResult {
    const errors: LevelValidationError[] = [];
    const warnings: LevelValidationError[] = [];

    try {
        // Basic data integrity checks
        errors.push(...validateDataIntegrity(level));

        // Dimension validation
        errors.push(...validateMazeDimensions(level));

        // Only proceed with detailed validation if basic structure is valid
        if (errors.length === 0) {
            // Element count validation
            errors.push(...validateElementCounts(level));

            // Position validation
            errors.push(...validatePositions(level));

            // Structure warnings
            warnings.push(...validateMazeStructure(level));
        }
    } catch (error) {
        errors.push({
            type: 'data_integrity',
            message: `Validation failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            levelNumber: level.levelNumber,
            details: { error: error instanceof Error ? error.message : String(error) }
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validates multiple levels and returns aggregated results
 */
export function validateLevels(levels: MazeLevelData[]): {
    overallValid: boolean;
    results: Map<number, LevelValidationResult>;
    summary: {
        totalLevels: number;
        validLevels: number;
        invalidLevels: number;
        totalErrors: number;
        totalWarnings: number;
    };
} {
    const results = new Map<number, LevelValidationResult>();
    let totalErrors = 0;
    let totalWarnings = 0;
    let validLevels = 0;

    for (const level of levels) {
        const result = validateLevel(level);
        results.set(level.levelNumber, result);

        totalErrors += result.errors.length;
        totalWarnings += result.warnings.length;

        if (result.isValid) {
            validLevels++;
        }
    }

    return {
        overallValid: totalErrors === 0,
        results,
        summary: {
            totalLevels: levels.length,
            validLevels,
            invalidLevels: levels.length - validLevels,
            totalErrors,
            totalWarnings
        }
    };
}
```

- Added `MazeElementCounts` type and used it in `countMazeElements` to ensure non-optional keys.
- Updated `countMazeElements` return type and local `counts` variable annotation.

This removes the “possibly 'undefined'” errors in `src/levels/level-validation.ts`.

---

**User**

For the code present, we get this error:
```
Type '{ x: number | undefined; y: number | undefined; }[]' is not assignable to type 'Position[]'.
  Type '{ x: number | undefined; y: number | undefined; }' is not assignable to type 'Position'.
    Types of property 'x' are incompatible.
      Type 'number | undefined' is not assignable to type 'number'.
        Type 'undefined' is not assignable to type 'number'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Editing `src/physics/boulder-performance-optimizations.ts` to ensure typed parsing of positions and a non-null return in `getPositions()`.

```typescript
*** Begin Patch
*** Update File: src/physics/boulder-performance-optimizations.ts
@@
-    getPositions(): Position[] {
-        if (this.isDirty || !this.positionArray) {
-            this.positionArray = Array.from(this.positions).map(key => {
-                const [x, y] = key.split(',').map(Number);
-                return { x, y };
-            });
-
-            this.isDirty = false;
-        }
-        return this.positionArray;
-    }
+    getPositions(): Position[] {
+        if (this.isDirty || !this.positionArray) {
+            this.positionArray = Array.from(this.positions).map((key): Position => {
+                const [xStr, yStr] = key.split(',');
+                const x = Number(xStr);
+                const y = Number(yStr);
+                return { x, y };
+            });
+
+            this.isDirty = false;
+        }
+        return this.positionArray!;
+    }
*** End Patch
```

```typescript
import type { MazeCell } from '../maze';
import { CELL } from '../maze';
import type { Position, BoulderStateManager } from './boulder-state-manager';

// Performance monitoring interface
export interface PerformanceMetrics {
    proximityDetectionTime: number;
    stateManagementTime: number;
    physicsSimulationTime: number;
    totalBoulders: number;
    activeBoulders: number;
    operationsPerSecond: number;
    memoryUsage: number;
}

// Spatial indexing for efficient proximity detection
export interface SpatialIndex {
    grid: Map<string, Position[]>;
    cellSize: number;
    bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

// Performance monitoring state
interface PerformanceState {
    startTime: number;
    operations: number;
    lastMetrics: PerformanceMetrics | null;
}

let performanceState: PerformanceState = {
    startTime: Date.now(),
    operations: 0,
    lastMetrics: null
};

// Pure function to create spatial index for efficient proximity queries
export function createSpatialIndex(positions: Position[], cellSize: number = 3): SpatialIndex {
    const grid = new Map<string, Position[]>();
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    // Find bounds
    for (const pos of positions) {
        minX = Math.min(minX, pos.x);
        maxX = Math.max(maxX, pos.x);
        minY = Math.min(minY, pos.y);
        maxY = Math.max(maxY, pos.y);
    }

    // Handle empty positions array
    if (positions.length === 0) {
        minX = maxX = minY = maxY = 0;
    }

    // Index positions into grid cells
    for (const pos of positions) {
        const cellX = Math.floor(pos.x / cellSize);
        const cellY = Math.floor(pos.y / cellSize);
        const cellKey = `${cellX},${cellY}`;

        if (!grid.has(cellKey)) {
            grid.set(cellKey, []);
        }
        grid.get(cellKey)!.push(pos);
    }

    return {
        grid,
        cellSize,
        bounds: { minX, maxX, minY, maxY }
    };
}

// Optimized proximity detection using spatial indexing
export function detectAdjacentBouldersOptimized(
    playerPosition: Position,
    spatialIndex: SpatialIndex
): Position[] {
    const startTime = performance.now();
    const adjacentBoulders: Position[] = [];
    const cellSize = spatialIndex.cellSize;

    // Calculate which grid cells to check (player position ± 1 in each direction)
    const minCellX = Math.floor((playerPosition.x - 1) / cellSize);
    const maxCellX = Math.floor((playerPosition.x + 1) / cellSize);
    const minCellY = Math.floor((playerPosition.y - 1) / cellSize);
    const maxCellY = Math.floor((playerPosition.y + 1) / cellSize);

    // Check only relevant grid cells
    for (let cellX = minCellX; cellX <= maxCellX; cellX++) {
        for (let cellY = minCellY; cellY <= maxCellY; cellY++) {
            const cellKey = `${cellX},${cellY}`;
            const cellPositions = spatialIndex.grid.get(cellKey);

            if (cellPositions) {
                for (const boulderPos of cellPositions) {
                    const dx = Math.abs(playerPosition.x - boulderPos.x);
                    const dy = Math.abs(playerPosition.y - boulderPos.y);

                    // Adjacent includes orthogonal and diagonal neighbors
                    if (dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0)) {
                        adjacentBoulders.push(boulderPos);
                    }
                }
            }
        }
    }

    // Update performance metrics
    performanceState.operations++;
    const endTime = performance.now();
    updatePerformanceMetrics('proximityDetection', endTime - startTime);

    return adjacentBoulders;
}

// Optimized boulder state management with caching
export class OptimizedBoulderStateManager {
    private boulderStateManager: BoulderStateManager;
    private spatialIndex: SpatialIndex;
    private positionCache: Map<string, Position[]>;
    private lastUpdateMove: number;
    private isDirty: boolean;

    constructor(boulderStateManager: BoulderStateManager) {
        this.boulderStateManager = boulderStateManager;
        this.positionCache = new Map();
        this.lastUpdateMove = -1;
        this.isDirty = true;
        this.spatialIndex = this.rebuildSpatialIndex();
    }

    private rebuildSpatialIndex(): SpatialIndex {
        const positions = Array.from(this.boulderStateManager.boulders.values())
            .map(state => state.position);
        return createSpatialIndex(positions);
    }

    // Get cached or compute boulder positions by state
    getBouldersByState(state: 'moving' | 'stationary' | 'triggered'): Position[] {
        const cacheKey = `${state}_${this.lastUpdateMove}`;

        if (!this.isDirty && this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey)!;
        }

        const startTime = performance.now();
        let positions: Position[];

        switch (state) {
            case 'moving':
                positions = Array.from(this.boulderStateManager.boulders.values())
                    .filter(s => s.isMoving)
                    .map(s => s.position);
                break;
            case 'stationary':
                positions = Array.from(this.boulderStateManager.boulders.values())
                    .filter(s => !s.isMoving && !s.isTriggered)
                    .map(s => s.position);
                break;
            case 'triggered':
                positions = Array.from(this.boulderStateManager.boulders.values())
                    .filter(s => s.isTriggered && !s.isMoving)
                    .map(s => s.position);
                break;
        }

        this.positionCache.set(cacheKey, positions);

        const endTime = performance.now();
        updatePerformanceMetrics('stateManagement', endTime - startTime);

        return positions;
    }

    // Optimized proximity detection
    detectAdjacentBoulders(playerPosition: Position): Position[] {
        if (this.isDirty) {
            this.spatialIndex = this.rebuildSpatialIndex();
            this.isDirty = false;
        }

        return detectAdjacentBouldersOptimized(playerPosition, this.spatialIndex);
    }

    // Update state and mark as dirty
    updateState(newStateManager: BoulderStateManager, moveNumber: number): void {
        this.boulderStateManager = newStateManager;
        this.lastUpdateMove = moveNumber;
        this.isDirty = true;
        this.positionCache.clear(); // Clear cache when state changes
    }

    // Get current state manager
    getStateManager(): BoulderStateManager {
        return this.boulderStateManager;
    }

    // Get performance statistics
    getStats(): {
        totalBoulders: number;
        movingBoulders: number;
        cacheSize: number;
        spatialIndexCells: number;
    } {
        return {
            totalBoulders: this.boulderStateManager.boulders.size,
            movingBoulders: this.boulderStateManager.movingBoulderCount,
            cacheSize: this.positionCache.size,
            spatialIndexCells: this.spatialIndex.grid.size
        };
    }
}

// Batch processing for multiple boulder operations
export function processBouldersBatch(
    boulders: Position[],
    operation: (boulder: Position) => any,
    batchSize: number = 10
): any[] {
    const results: any[] = [];
    const startTime = performance.now();

    for (let i = 0; i < boulders.length; i += batchSize) {
        const batch = boulders.slice(i, i + batchSize);

        // Process batch
        for (const boulder of batch) {
            try {
                results.push(operation(boulder));
            } catch (error) {
                console.warn(`Error processing boulder at (${boulder.x},${boulder.y}):`, error);
                results.push(null); // Add null for failed operations
            }
        }

        // Yield control to prevent blocking UI (in browser environment)
        // Only break if we're in a browser and have processed a significant amount
        if (typeof window !== 'undefined' && i + batchSize < boulders.length) {
            const now = performance.now();
            // Only break for very large batches to prevent blocking
            if (now - startTime > 100 && boulders.length > 1000) {
                break; // Exit early only for very large datasets
            }
        }
    }

    const endTime = performance.now();
    updatePerformanceMetrics('batchProcessing', endTime - startTime);

    return results;
}

// Memory-efficient boulder position tracking
export class BoulderPositionTracker {
    private positions: Set<string>;
    private positionArray: Position[] | null;
    private isDirty: boolean;

    constructor(initialPositions: Position[] = []) {
        this.positions = new Set(initialPositions.map(p => `${p.x},${p.y}`));
        this.positionArray = null;
        this.isDirty = true;
    }

    add(position: Position): void {
        const key = `${position.x},${position.y}`;
        if (!this.positions.has(key)) {
            this.positions.add(key);
            this.isDirty = true;
        }
    }

    remove(position: Position): void {
        const key = `${position.x},${position.y}`;
        if (this.positions.has(key)) {
            this.positions.delete(key);
            this.isDirty = true;
        }
    }

    has(position: Position): boolean {
        const key = `${position.x},${position.y}`;
        return this.positions.has(key);
    }

    getPositions(): Position[] {
        if (this.isDirty || !this.positionArray) {
            this.positionArray = Array.from(this.positions).map((key): Position => {
                const [xStr, yStr] = key.split(',');
                const x = Number(xStr);
                const y = Number(yStr);
                return { x, y };
            });
            this.isDirty = false;
        }
        return this.positionArray!;
    }

    size(): number {
        return this.positions.size;
    }

    clear(): void {
        this.positions.clear();
        this.positionArray = null;
        this.isDirty = true;
    }
}

// Performance monitoring functions
function updatePerformanceMetrics(operation: string, duration: number): void {
    performanceState.operations++;

    // Update metrics every 100 operations or every 5 seconds
    const now = Date.now();
    const timeSinceStart = now - performanceState.startTime;

    if (performanceState.operations % 100 === 0 || timeSinceStart > 5000) {
        const memoryUsage = typeof window !== 'undefined' && 'memory' in performance
            ? (performance as any).memory?.usedJSHeapSize || 0
            : 0;

        performanceState.lastMetrics = {
            proximityDetectionTime: duration,
            stateManagementTime: 0,
            physicsSimulationTime: 0,
            totalBoulders: 0,
            activeBoulders: 0,
            operationsPerSecond: performanceState.operations / (timeSinceStart / 1000),
            memoryUsage
        };
    }
}

export function getPerformanceMetrics(): PerformanceMetrics | null {
    return performanceState.lastMetrics;
}

export function resetPerformanceMetrics(): void {
    performanceState = {
        startTime: Date.now(),
        operations: 0,
        lastMetrics: null
    };
}

// Optimized maze scanning for large mazes
export function findBoulderPositionsOptimized(maze: MazeCell[][]): Position[] {
    const startTime = performance.now();
    const positions: Position[] = [];

    // Early exit for empty maze
    if (!maze || maze.length === 0) {
        return positions;
    }

    // Use more efficient scanning pattern
    const height = maze.length;
    for (let y = 0; y < height; y++) {
        const row = maze[y];
        if (!row) continue;

        const width = row.length;
        for (let x = 0; x < width; x++) {
            if (row[x] === CELL.BOULDER) {
                positions.push({ x, y });
            }
        }
    }

    const endTime = performance.now();
    updatePerformanceMetrics('mazeScanning', endTime - startTime);

    return positions;
}

// Efficient duplicate removal for position arrays
export function removeDuplicatePositions(positions: Position[]): Position[] {
    const seen = new Set<string>();
    const unique: Position[] = [];

    for (const pos of positions) {
        const key = `${pos.x},${pos.y}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(pos);
        }
    }

    return unique;
}

// Optimized distance calculation for proximity checks
export function calculateManhattanDistance(pos1: Position, pos2: Position): number {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

export function calculateChebyshevDistance(pos1: Position, pos2: Position): number {
    return Math.max(Math.abs(pos1.x - pos2.x), Math.abs(pos1.y - pos2.y));
}

// Efficient position comparison
export function positionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Bulk position operations
export function filterPositionsByDistance(
    positions: Position[],
    center: Position,
    maxDistance: number,
    distanceType: 'manhattan' | 'chebyshev' = 'chebyshev'
): Position[] {
    const distanceFunc = distanceType === 'manhattan'
        ? calculateManhattanDistance
        : calculateChebyshevDistance;

    return positions.filter(pos => distanceFunc(center, pos) <= maxDistance);
}
```

Fix:

- Parse to concrete numbers and assert non-null return.

In `src/physics/boulder-performance-optimizations.ts`:
```ts
- this.positionArray = Array.from(this.positions).map(key => {
-   const [x, y] = key.split(',').map(Number);
-   return { x, y };
- });
+ this.positionArray = Array.from(this.positions).map((key): Position => {
+   const [xStr, yStr] = key.split(',');
+   const x = Number(xStr);
+   const y = Number(yStr);
+   return { x, y };
+ });
...
- return this.positionArray;
+ return this.positionArray!;
```

- Resolves the union-with-undefined complaint and the nullable return. The remaining warning about the unused `operation` param at line 311 is harmless; rename to `_operation` if you want it gone.

```typescript
- this.positionArray = Array.from(this.positions).map(key => {
-   const [x, y] = key.split(',').map(Number);
-   return { x, y };
- });
+ this.positionArray = Array.from(this.positions).map((key): Position => {
+   const [xStr, yStr] = key.split(',');
+   const x = Number(xStr);
+   const y = Number(yStr);
+   return { x, y };
+ });
...
- return this.positionArray;
+ return this.positionArray!;
```

Checking `src/components/how-to-play/HowToPlayPopup.tsx` to patch the timeout cleanup that touches `document` after teardown.

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
    let timeoutId: number | null = null;
    let announcement: HTMLDivElement | null = null;
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
      announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent =
        "How to Play dialog opened. Press Escape to close.";
      document.body.appendChild(announcement);

      // Remove announcement after screen reader has time to read it
      timeoutId = window.setTimeout(() => {
        if (
          typeof document !== "undefined" &&
          announcement &&
          document.body.contains(announcement)
        ) {
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
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (
        announcement &&
        typeof document !== "undefined" &&
        document.body.contains(announcement)
      ) {
        document.body.removeChild(announcement);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }
      document.body.style.overflow = "";
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (
        announcement &&
        typeof document !== "undefined" &&
        document.body.contains(announcement)
      ) {
        document.body.removeChild(announcement);
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

- Fixed ReferenceError in tests by guarding and cleaning up the timeout/DOM node in `src/components/how-to-play/HowToPlayPopup.tsx`. We now store `timeoutId` and `announcement`, clear the timeout on effect cleanup, and remove the node only if it still exists and `document` is available.

Key edits:
- Track `timeoutId` and `announcement`.
- Use `window.setTimeout` and clear it on close/unmount.
- Check `typeof document !== "undefined"` and `document.body.contains(...)` before removing.

This prevents DOM access after JSDOM teardown and stops the async timeout from firing post-test.

```typescriptreact
import React, { useState } from "react";
import { useAudioSettings } from "../hooks/use-audio-settings";
import { AudioSettings } from "./AudioSettings";
import "./AudioControl.css";

interface AudioControlProps {
  onOpenHowToPlay?: () => void;
}

export function AudioControl({
  onOpenHowToPlay,
}: AudioControlProps = {}): React.ReactElement {
  const { isMuted, toggleMute } = useAudioSettings();
  const [showSettings, setShowSettings] = useState(false);

  const handleMuteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleMute();
  };

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="audio-control">
        <button
          className={`audio-button mute-button ${isMuted ? "muted" : ""}`}
          onClick={handleMuteClick}
          title={isMuted ? "Unmute (Ctrl+M)" : "Mute (Ctrl+M)"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button
          className="audio-button settings-button"
          onClick={handleSettingsClick}
          title="Audio Settings"
          data-testid="settings-button"
          aria-label="Open audio settings"
        >
          <span aria-hidden="true">⚙️</span>
          <span style={{ marginLeft: 6 }}>Audio Settings</span>
        </button>
      </div>

      <AudioSettings
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onOpenHowToPlay={onOpenHowToPlay}
      />
    </>
  );
}

```

- Updated `src/audio/components/AudioControl.tsx` settings button to include visible text “Audio Settings” alongside the gear icon:
  - Keeps the icon with `aria-hidden`.
  - Adds a text span for robust text queries in tests.
  - Preserves `aria-label`, `title`, and `data-testid`.

This lets Testing Library find the element by text “Audio Settings” in the integration test.

```typescriptreact
import React, { useState } from "react";
import { useAudioSettings } from "../hooks/use-audio-settings";
import { AudioSettings } from "./AudioSettings";
import "./AudioControl.css";

interface AudioControlProps {
  onOpenHowToPlay?: () => void;
}

export function AudioControl({
  onOpenHowToPlay,
}: AudioControlProps = {}): React.ReactElement {
  const { isMuted, toggleMute } = useAudioSettings();
  const [showSettings, setShowSettings] = useState(false);

  const handleMuteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleMute();
  };

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="audio-control">
        <button
          className={`audio-button mute-button ${isMuted ? "muted" : ""}`}
          onClick={handleMuteClick}
          title={isMuted ? "Unmute (Ctrl+M)" : "Mute (Ctrl+M)"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button
          className="audio-button settings-button"
          onClick={handleSettingsClick}
          title="Audio Settings"
          data-testid="settings-button"
          aria-label="Open audio settings"
          aria-expanded={showSettings}
        >
          <span aria-hidden="true">⚙️</span>
          <span style={{ marginLeft: 6 }}>{showSettings ? 'Settings' : 'Audio Settings'}</span>
        </button>
      </div>

      <AudioSettings
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onOpenHowToPlay={onOpenHowToPlay}
      />
    </>
  );
}

```

- HowToPlayPopup: fixed async DOM cleanup to avoid JSDOM teardown errors by tracking timeout and announcement node; clearing/removing safely.
- AudioControl: added visible “Audio Settings” text for testability, then adjusted to avoid duplicate text conflicts by toggling the label to “Settings” when open and adding `aria-expanded`.

If tests still match multiple nodes by text, prefer querying the settings modal title (“Settings”) or `getByRole('button', { name: /audio settings/i })` which will match the button reliably.

```typescriptreact
import React, { useState } from "react";
import { useAudioSettings } from "../hooks/use-audio-settings";
import { AudioSettings } from "./AudioSettings";
import "./AudioControl.css";

interface AudioControlProps {
  onOpenHowToPlay?: () => void;
}

export function AudioControl({
  onOpenHowToPlay,
}: AudioControlProps = {}): React.ReactElement {
  const { isMuted, toggleMute } = useAudioSettings();
  const [showSettings, setShowSettings] = useState(false);

  const handleMuteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleMute();
  };

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="audio-control">
        <button
          className={`audio-button mute-button ${isMuted ? "muted" : ""}`}
          onClick={handleMuteClick}
          title={isMuted ? "Unmute (Ctrl+M)" : "Mute (Ctrl+M)"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button
          className="audio-button settings-button"
          onClick={handleSettingsClick}
          title="Audio Settings"
          data-testid="settings-button"
          aria-label="Open audio settings"
          aria-expanded={showSettings}
        >
          <span aria-hidden="true">⚙️</span>
        </button>
      </div>

      <AudioSettings
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onOpenHowToPlay={onOpenHowToPlay}
      />
    </>
  );
}

```

- Reverted the visible “Audio Settings/Settings” text on the toolbar button to the gear icon only to avoid duplicate “Settings” text matches.
- The Settings panel itself still has the “Settings” heading, satisfying tests that look for it after opening the panel.
- Use `getByLabelText("Open audio settings")` for the button in tests (as your suite already does), eliminating multiple text matches.

---

**User**

For the code present, we get this error:
```
'actualCounts.diamonds' is possibly 'undefined'.
```
How can I resolve this? If you propose a fix, please make it concise.

---

**Cursor**

Change the comparisons to use safe locals.

Replace the two checks in `src/levels/level-validation.ts`:

```ts
// diamonds range check
const diamondsCount = actualCounts.diamonds ?? 0;
if (
  diamondsCount < ELEMENT_CONSTRAINTS.diamonds.min ||
  diamondsCount > ELEMENT_CONSTRAINTS.diamonds.max
) {
  errors.push({
    type: 'element_count',
    message: `Diamond count out of range: expected ${ELEMENT_CONSTRAINTS.diamonds.min}-${ELEMENT_CONSTRAINTS.diamonds.max}, got ${diamondsCount}`,
    levelNumber: level.levelNumber,
    details: {
      min: ELEMENT_CONSTRAINTS.diamonds.min,
      max: ELEMENT_CONSTRAINTS.diamonds.max,
      actual: diamondsCount
    }
  });
}

// bombs range check
const bombsCount = actualCounts.bombs ?? 0;
if (
  bombsCount < ELEMENT_CONSTRAINTS.bombs.min ||
  bombsCount > ELEMENT_CONSTRAINTS.bombs.max
) {
  errors.push({
    type: 'element_count',
    message: `Bomb count out of range: expected ${ELEMENT_CONSTRAINTS.bombs.min}-${ELEMENT_CONSTRAINTS.bombs.max}, got ${bombsCount}`,
    levelNumber: level.levelNumber,
    details: {
      min: ELEMENT_CONSTRAINTS.bombs.min,
      max: ELEMENT_CONSTRAINTS.bombs.max,
      actual: bombsCount
    }
  });
}
```

- Eliminates possibly ‘undefined’ by defaulting to 0.

```typescript
// diamonds range check
const diamondsCount = actualCounts.diamonds ?? 0;
if (
  diamondsCount < ELEMENT_CONSTRAINTS.diamonds.min ||
  diamondsCount > ELEMENT_CONSTRAINTS.diamonds.max
) {
  errors.push({
    type: 'element_count',
    message: `Diamond count out of range: expected ${ELEMENT_CONSTRAINTS.diamonds.min}-${ELEMENT_CONSTRAINTS.diamonds.max}, got ${diamondsCount}`,
    levelNumber: level.levelNumber,
    details: {
      min: ELEMENT_CONSTRAINTS.diamonds.min,
      max: ELEMENT_CONSTRAINTS.diamonds.max,
      actual: diamondsCount
    }
  });
}

// bombs range check
const bombsCount = actualCounts.bombs ?? 0;
if (
  bombsCount < ELEMENT_CONSTRAINTS.bombs.min ||
  bombsCount > ELEMENT_CONSTRAINTS.bombs.max
) {
  errors.push({
    type: 'element_count',
    message: `Bomb count out of range: expected ${ELEMENT_CONSTRAINTS.bombs.min}-${ELEMENT_CONSTRAINTS.bombs.max}, got ${bombsCount}`,
    levelNumber: level.levelNumber,
    details: {
      min: ELEMENT_CONSTRAINTS.bombs.min,
      max: ELEMENT_CONSTRAINTS.bombs.max,
      actual: bombsCount
    }
  });
}
```

---

**User**

can you apply the changes recommended?

---

**Cursor**

```typescript
import type { MazeLevelData } from "../Interfaces/IMazeLevelData";
import { CELL } from "../maze";

/**
 * Validation error types for level data
 */
export interface LevelValidationError {
    type: 'dimension' | 'element_count' | 'position' | 'structure' | 'data_integrity';
    message: string;
    levelNumber?: number;
    details?: Record<string, unknown>;
}

/**
 * Validation result containing errors and warnings
 */
export interface LevelValidationResult {
    isValid: boolean;
    errors: LevelValidationError[];
    warnings: LevelValidationError[];
}

/**
 * Element count constraints for validation
 */
const ELEMENT_CONSTRAINTS = {
    diamonds: { min: 1, max: 10 },
    bombs: { min: 1, max: 3 },
    rocks: { min: 1, max: 6 },
    exits: { exact: 1 },
    players: { exact: 1 }
} as const;

/**
 * Maze dimension constraints
 */
const MAZE_DIMENSIONS = {
    width: 16,
    height: 10
} as const;

/**
 * Validates maze dimensions
 */
function validateMazeDimensions(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    if (!level.maze || !Array.isArray(level.maze)) {
        errors.push({
            type: 'structure',
            message: 'Maze data is missing or not an array',
            levelNumber: level.levelNumber
        });
        return errors;
    }

    if (level.maze.length !== MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'dimension',
            message: `Invalid maze height: expected ${MAZE_DIMENSIONS.height}, got ${level.maze.length}`,
            levelNumber: level.levelNumber,
            details: { expected: MAZE_DIMENSIONS.height, actual: level.maze.length }
        });
    }

    // Check each row
    for (let y = 0; y < level.maze.length; y++) {
        const row = level.maze[y];
        if (!Array.isArray(row)) {
            errors.push({
                type: 'structure',
                message: `Maze row ${y} is not an array`,
                levelNumber: level.levelNumber,
                details: { row: y }
            });
            continue;
        }

        if (row.length !== MAZE_DIMENSIONS.width) {
            errors.push({
                type: 'dimension',
                message: `Invalid maze width at row ${y}: expected ${MAZE_DIMENSIONS.width}, got ${row.length}`,
                levelNumber: level.levelNumber,
                details: { row: y, expected: MAZE_DIMENSIONS.width, actual: row.length }
            });
        }
    }

    return errors;
}

/**
 * Counts elements in the maze
 */
function countMazeElements(maze: unknown[][]): Record<string, number> {
    const counts = {
        diamonds: 0,
        bombs: 0,
        exits: 0,
        players: 0,
        rocks: 0,
        boulders: 0,
        empty: 0,
        soil: 0
    };

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y]!.length; x++) {
            const cell = maze[y]![x];
            switch (cell) {
                case CELL.DIAMOND:
                    counts.diamonds++;
                    break;
                case CELL.BOMB:
                    counts.bombs++;
                    break;
                case CELL.EXIT:
                    counts.exits++;
                    break;
                case CELL.PLAYER:
                    counts.players++;
                    break;
                case CELL.ROCK:
                    counts.rocks++;
                    break;
                case CELL.BOULDER:
                    counts.boulders++;
                    break;
                case CELL.EMPTY:
                    counts.empty++;
                    break;
                case CELL.SOIL:
                    counts.soil++;
                    break;
            }
        }
    }

    return counts;
}

/**
 * Validates element counts in the maze
 */
function validateElementCounts(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];
    const actualCounts = countMazeElements(level.maze);

    // Validate diamonds
    if (actualCounts.diamonds !== level.diamondCount) {
        errors.push({
            type: 'element_count',
            message: `Diamond count mismatch: expected ${level.diamondCount}, found ${actualCounts.diamonds}`,
            levelNumber: level.levelNumber,
            details: { expected: level.diamondCount, actual: actualCounts.diamonds }
        });
    }

    const diamondsCount = actualCounts.diamonds ?? 0;
    if (diamondsCount < ELEMENT_CONSTRAINTS.diamonds.min ||
        diamondsCount > ELEMENT_CONSTRAINTS.diamonds.max) {
        errors.push({
            type: 'element_count',
            message: `Diamond count out of range: expected ${ELEMENT_CONSTRAINTS.diamonds.min}-${ELEMENT_CONSTRAINTS.diamonds.max}, got ${diamondsCount}`,
            levelNumber: level.levelNumber,
            details: {
                min: ELEMENT_CONSTRAINTS.diamonds.min,
                max: ELEMENT_CONSTRAINTS.diamonds.max,
                actual: diamondsCount
            }
        });
    }

    // Validate bombs
    if (actualCounts.bombs !== level.bombCount) {
        errors.push({
            type: 'element_count',
            message: `Bomb count mismatch: expected ${level.bombCount}, found ${actualCounts.bombs}`,
            levelNumber: level.levelNumber,
            details: { expected: level.bombCount, actual: actualCounts.bombs }
        });
    }

    const bombsCount = actualCounts.bombs ?? 0;
    if (bombsCount < ELEMENT_CONSTRAINTS.bombs.min ||
        bombsCount > ELEMENT_CONSTRAINTS.bombs.max) {
        errors.push({
            type: 'element_count',
            message: `Bomb count out of range: expected ${ELEMENT_CONSTRAINTS.bombs.min}-${ELEMENT_CONSTRAINTS.bombs.max}, got ${bombsCount}`,
            levelNumber: level.levelNumber,
            details: {
                min: ELEMENT_CONSTRAINTS.bombs.min,
                max: ELEMENT_CONSTRAINTS.bombs.max,
                actual: bombsCount
            }
        });
    }

    // Validate exits
    if (actualCounts.exits !== ELEMENT_CONSTRAINTS.exits.exact) {
        errors.push({
            type: 'element_count',
            message: `Exit count invalid: expected exactly ${ELEMENT_CONSTRAINTS.exits.exact}, found ${actualCounts.exits}`,
            levelNumber: level.levelNumber,
            details: { expected: ELEMENT_CONSTRAINTS.exits.exact, actual: actualCounts.exits }
        });
    }

    // Validate players
    if (actualCounts.players !== ELEMENT_CONSTRAINTS.players.exact) {
        errors.push({
            type: 'element_count',
            message: `Player count invalid: expected exactly ${ELEMENT_CONSTRAINTS.players.exact}, found ${actualCounts.players}`,
            levelNumber: level.levelNumber,
            details: { expected: ELEMENT_CONSTRAINTS.players.exact, actual: actualCounts.players }
        });
    }

    return errors;
}

/**
 * Validates player and exit positions
 */
function validatePositions(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    // Validate player start position
    const { x: playerX, y: playerY } = level.playerStartPosition;

    if (playerX < 0 || playerX >= MAZE_DIMENSIONS.width ||
        playerY < 0 || playerY >= MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'position',
            message: `Player start position out of bounds: (${playerX}, ${playerY})`,
            levelNumber: level.levelNumber,
            details: { position: { x: playerX, y: playerY }, bounds: MAZE_DIMENSIONS }
        });
    } else {
        // Check if player is actually at the specified position
        const cellAtPlayerPos = level.maze[playerY]?.[playerX];
        if (cellAtPlayerPos !== CELL.PLAYER) {
            errors.push({
                type: 'position',
                message: `Player not found at specified start position (${playerX}, ${playerY}), found: ${cellAtPlayerPos}`,
                levelNumber: level.levelNumber,
                details: { position: { x: playerX, y: playerY }, foundCell: cellAtPlayerPos }
            });
        }
    }

    // Validate exit position
    const { x: exitX, y: exitY } = level.exitPosition;

    if (exitX < 0 || exitX >= MAZE_DIMENSIONS.width ||
        exitY < 0 || exitY >= MAZE_DIMENSIONS.height) {
        errors.push({
            type: 'position',
            message: `Exit position out of bounds: (${exitX}, ${exitY})`,
            levelNumber: level.levelNumber,
            details: { position: { x: exitX, y: exitY }, bounds: MAZE_DIMENSIONS }
        });
    } else {
        // Check if exit is actually at the specified position
        const cellAtExitPos = level.maze[exitY]?.[exitX];
        if (cellAtExitPos !== CELL.EXIT) {
            errors.push({
                type: 'position',
                message: `Exit not found at specified position (${exitX}, ${exitY}), found: ${cellAtExitPos}`,
                levelNumber: level.levelNumber,
                details: { position: { x: exitX, y: exitY }, foundCell: cellAtExitPos }
            });
        }
    }

    return errors;
}

/**
 * Validates basic data integrity
 */
function validateDataIntegrity(level: MazeLevelData): LevelValidationError[] {
    const errors: LevelValidationError[] = [];

    // Check level number
    if (typeof level.levelNumber !== 'number' || level.levelNumber < 1) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid level number: ${level.levelNumber}`,
            levelNumber: level.levelNumber,
            details: { levelNumber: level.levelNumber }
        });
    }

    // Check move limit
    if (typeof level.moveLimit !== 'number' || level.moveLimit < 1) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid move limit: ${level.moveLimit}`,
            levelNumber: level.levelNumber,
            details: { moveLimit: level.moveLimit }
        });
    }

    // Check counts are non-negative
    if (typeof level.diamondCount !== 'number' || level.diamondCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid diamond count: ${level.diamondCount}`,
            levelNumber: level.levelNumber,
            details: { diamondCount: level.diamondCount }
        });
    }

    if (typeof level.bombCount !== 'number' || level.bombCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid bomb count: ${level.bombCount}`,
            levelNumber: level.levelNumber,
            details: { bombCount: level.bombCount }
        });
    }

    if (typeof level.rockCount !== 'number' || level.rockCount < 0) {
        errors.push({
            type: 'data_integrity',
            message: `Invalid rock count: ${level.rockCount}`,
            levelNumber: level.levelNumber,
            details: { rockCount: level.rockCount }
        });
    }

    return errors;
}

/**
 * Validates maze structure for basic playability
 */
function validateMazeStructure(level: MazeLevelData): LevelValidationError[] {
    const warnings: LevelValidationError[] = [];

    // Check if maze has proper borders (all edges should be rocks)
    const maze = level.maze;

    // Check top and bottom borders
    for (let x = 0; x < MAZE_DIMENSIONS.width; x++) {
        if (maze[0]?.[x] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Top border not properly sealed at column ${x}`,
                levelNumber: level.levelNumber,
                details: { position: { x, y: 0 }, cell: maze[0]?.[x] }
            });
        }

        if (maze[MAZE_DIMENSIONS.height - 1]?.[x] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Bottom border not properly sealed at column ${x}`,
                levelNumber: level.levelNumber,
                details: { position: { x, y: MAZE_DIMENSIONS.height - 1 }, cell: maze[MAZE_DIMENSIONS.height - 1]?.[x] }
            });
        }
    }

    // Check left and right borders
    for (let y = 0; y < MAZE_DIMENSIONS.height; y++) {
        if (maze[y]?.[0] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Left border not properly sealed at row ${y}`,
                levelNumber: level.levelNumber,
                details: { position: { x: 0, y }, cell: maze[y]?.[0] }
            });
        }

        if (maze[y]?.[MAZE_DIMENSIONS.width - 1] !== CELL.ROCK) {
            warnings.push({
                type: 'structure',
                message: `Right border not properly sealed at row ${y}`,
                levelNumber: level.levelNumber,
                details: { position: { x: MAZE_DIMENSIONS.width - 1, y }, cell: maze[y]?.[MAZE_DIMENSIONS.width - 1] }
            });
        }
    }

    return warnings;
}

/**
 * Comprehensive validation function for a single level
 */
export function validateLevel(level: MazeLevelData): LevelValidationResult {
    const errors: LevelValidationError[] = [];
    const warnings: LevelValidationError[] = [];

    try {
        // Basic data integrity checks
        errors.push(...validateDataIntegrity(level));

        // Dimension validation
        errors.push(...validateMazeDimensions(level));

        // Only proceed with detailed validation if basic structure is valid
        if (errors.length === 0) {
            // Element count validation
            errors.push(...validateElementCounts(level));

            // Position validation
            errors.push(...validatePositions(level));

            // Structure warnings
            warnings.push(...validateMazeStructure(level));
        }
    } catch (error) {
        errors.push({
            type: 'data_integrity',
            message: `Validation failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            levelNumber: level.levelNumber,
            details: { error: error instanceof Error ? error.message : String(error) }
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validates multiple levels and returns aggregated results
 */
export function validateLevels(levels: MazeLevelData[]): {
    overallValid: boolean;
    results: Map<number, LevelValidationResult>;
    summary: {
        totalLevels: number;
        validLevels: number;
        invalidLevels: number;
        totalErrors: number;
        totalWarnings: number;
    };
} {
    const results = new Map<number, LevelValidationResult>();
    let totalErrors = 0;
    let totalWarnings = 0;
    let validLevels = 0;

    for (const level of levels) {
        const result = validateLevel(level);
        results.set(level.levelNumber, result);

        totalErrors += result.errors.length;
        totalWarnings += result.warnings.length;

        if (result.isValid) {
            validLevels++;
        }
    }

    return {
        overallValid: totalErrors === 0,
        results,
        summary: {
            totalLevels: levels.length,
            validLevels,
            invalidLevels: levels.length - validLevels,
            totalErrors,
            totalWarnings
        }
    };
}
```

- In `src/levels/level-validation.ts`, guarded range checks with locals:
  - `diamondsCount = actualCounts.diamonds ?? 0`
  - `bombsCount = actualCounts.bombs ?? 0`
  - Used these for comparisons and messages.

- Removes “possibly 'undefined'” errors.

