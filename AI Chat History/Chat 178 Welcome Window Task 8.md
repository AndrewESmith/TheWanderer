Execute Task: 6. Int...

Execute Task: 7. Add...

New Session





Execute Task: 8. Implement keyboard navigation and accessibility 8. Implement keyboard navigation and accessibility

Kiro
Including Steering Documents

typescript-standards.md
I'll implement task 8 which focuses on keyboard navigation and accessibility for the HowToPlayPopup component. Let me first examine the current implementation to understand what needs to be enhanced.

Task: 8. Implement keyboard navigation and accessibility from 
tasks.md
Status: In Progress
Searched workspace
Finding the HowToPlayPopup component files to understand current implementation
Read file(s)

HowToPlayPopup.tsx

IHowToPlayPopup.ts

HowToPlayPopup.css
Now let me check the HowToPlayContent component to understand its structure:

Read file(s)

HowToPlayContent.tsx
Now I need to implement the accessibility improvements. Based on the requirements and current implementation, I need to:

Add proper ARIA labels and roles for screen readers
Implement focus trapping within modal when open
Add keyboard shortcuts (escape to close) - already implemented
Ensure tab order follows logical flow
Let me create a focus trap utility first:

Created

focus-trap.ts


Now I'll update the HowToPlayPopup component to include all the accessibility improvements:


4 edits to file

HowToPlayPopup.tsx


Now I need to add the screen reader only class to the CSS file:

Accepted edits to

HowToPlayPopup.css


Now I need to update the HowToPlayContent component to include proper ARIA labels and semantic structure:

Accepted edits to

HowToPlayContent.tsx


Now let me run the tests to make sure the implementation works correctly:

Command
npm test -- --run --reporter=verbose
npm test -- --run --reporter=verbose
:\Windows\System32\cmd.exe - npm  test -- --run --reporter=verbosepm test --run --reporter=verbose
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 --run --reporter=verbose    

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 2)ode (vitest 4)ode (vitest 5)ode (vitest 6)ode (vitest 7)ode (vitest 8)ode (vitest 11)ode (vitest 14)ode (vitest 12)ode (vitest 15)
 Test Files 0 passed (70)
      Tests 0 passed (0)
   Start at 13:01:28
   Duration 976ms

 Test Files 0 passed (70)
      Tests 0 passed (0)
   Start at 13:01:28
   Duration 1.97s

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    

 Test Files 0 passed (70)
      Tests 0 passed (0)
   Start at 13:01:28
   Duration 2.52s
(node:32476) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:41412) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]

 Test Files 0 passed (70)
      Tests 0 passed (0)
   Start at 13:01:28
   Duration 2.64s
(node:44320) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:3132) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:5432) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was crea
ated)
(node:66800) [DEP0040] DeprecationWarning: The `punycode` module is de
eprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was crea
ated)
(node:74328) [DEP0040] DeprecationWarning: The `punycode` module is de
eprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was crea
ated)
(node:40628) [DEP0040] DeprecationWarning: The `punycode` module is de
eprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was crea
ated)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/build-system-validation.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (0)
   Start at 13:01:28
   Duration 2.86s
(node:16016) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:16680) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:72280) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:47428) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (0)
   Start at 13:01:28
   Duration 2.96s
(node:56044) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:59592) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:6492) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (16)
   Start at 13:01:28
   Duration 3.51s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source     
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source     
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (98)
   Start at 13:01:28
   Duration 3.61s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Error loading sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (98)
   Start at 13:01:28
   Duration 3.61s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (98)
   Start at 13:01:28
   Duration 3.61s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (98)
   Start at 13:01:28
   Duration 3.61s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/ogg' }       

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (98)
   Start at 13:01:28
   Duration 3.61s

















stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:13
38:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx [queued]
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (70)
      Tests 0 passed (98)
   Start at 13:01:28
   Duration 3.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should preload so
ounds with progress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should preload so
ounds with progress tracking
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should preload so
ounds with progress tracking
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudi
ioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Error loading sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:15
55:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle muted state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should load muted preference from localStorage
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle localStorage errors gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefine
ed
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undef
fined
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefine
ed
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefin
ned
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined 
 undefined
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefine
ed undefined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined unde
efined
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined und
defined

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Initialization Performance > should initialize
e WebAudioManager within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Initialization Performance > should initialize
e HTML5AudioManager within performance budget
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefine
ed


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should handle multiple manager instances efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should initialize with mocked Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: suspended
Audio context state changed to: running


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Audio context suspended - attempting to resume on next user interaction


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create and m
manage gain nodes correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 1/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx [queu
ued]
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 0/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (70)
      Tests 12 passed (185)
   Start at 13:01:28
   Duration 3.81s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should preload sounds
s within performance budget
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should create buffe
er sources for sound playback
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefine
ed


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s

















stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudi
ioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudi
ioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:15
55:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:15
55:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should apply opti
imization during preloading
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should handle concurr
rent preloading efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudi
ioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudi
ioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:15
55:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
                                                                      
                                                                      
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }       


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudi
ioBuffer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio d
data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:20
07:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Preloading Performance > should optimize netwo
ork requests during preloading
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should apply opti
imization during preloading
Preloaded 10 sounds


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 0/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (70)
      Tests 40 passed (202)
   Start at 13:01:28
   Duration 4.06s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should play sound
ds with minimal latency
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound1.mp3       
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3       
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      
[AssetLoader] Response for sounds/sound2.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAsse
ets > should handle partial failures
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound1.mp3       
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3       
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:29
97:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle rap
pid sequential playback efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAsse
ets > should handle partial failures
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3       


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:203:30

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\ma
anagers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:203:
:30


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:35
57:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Sound Playback Performance > should handle con
ncurrent sound playback efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

pm run build
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 484ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 317ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 7/17 
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
 ❯ src/tests/maze-rendering-integration.test.tsx 0/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 300ms
 ❯ src/tests/sound-system-performance.test.ts 7/20

 Test Files 0 passed (70)
      Tests 57 passed (222)
   Start at 13:01:28
   Duration 4.28s
:\Windows\system32\cmd.exe stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should manage memory effi
iciently during intensive use
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 702ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 536ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 317ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 10/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 481ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
   └── should handle rapid sequential image requests efficiently 482ms
 ❯ src/tests/maze-rendering-integration.test.tsx 1/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 519ms
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 1 passed (70)
      Tests 69 passed (222)
   Start at 13:01:28
   Duration 4.49s
stderr | src/tests/audio/settings/audio-settings-localstorage.test.tsx > Audio Settings localStorage Persistence - Debug Panel > loading debug panel visibility preference > should handle completely corrupted localStorage data
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid-json-data" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:67:27)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:122:15)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:23863:20)        
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-d
dom\cjs\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\react-d
dom\cjs\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-dom\cj
js\react-dom-client.development.js:14956:41)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 702ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 536ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 317ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 10/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 481ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
   └── should handle rapid sequential image requests efficiently 482ms
 ❯ src/tests/maze-rendering-integration.test.tsx 1/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 519ms
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 1 passed (70)
      Tests 69 passed (222)
   Start at 13:01:28
   Duration 4.49s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 702ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 536ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 317ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 10/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 481ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
   └── should handle rapid sequential image requests efficiently 482ms
 ❯ src/tests/maze-rendering-integration.test.tsx 1/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 519ms
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 1 passed (70)
      Tests 69 passed (222)
   Start at 13:01:28
   Duration 4.49s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress
s tracking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:35
57:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 702ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 536ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 317ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 10/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 481ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
   └── should handle rapid sequential image requests efficiently 482ms
 ❯ src/tests/maze-rendering-integration.test.tsx 1/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 519ms
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 1 passed (70)
      Tests 69 passed (222)
   Start at 13:01:28
   Duration 4.49s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
Preloaded 10 sounds

 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 735ms
   ✓ AssetLoader (16)
     ✓ constructor (2)
       ✓ should initialize with default options 5ms
       ✓ should accept custom options 1ms
     ✓ loadAudioBuffer (7)
       ✓ should successfully load audio buffer from first source 12ms 
       ✓ should fallback to second source if first fails 29ms
       ✓ should retry failed requests 115ms
       ✓ should throw error if all sources fail 232ms
       ✓ should handle HTTP errors 5ms
       ✓ should handle audio decoding errors 3ms
       ✓ should respect timeout 110ms
     ✓ loadAssets (2)
       ✓ should load all preload assets 3ms
       ✓ should handle partial failures 106ms
     ✓ progress tracking (2)
       ✓ should emit progress events 2ms
       ✓ should emit error events on failure 105ms
     ✓ format optimization (2)
       ✓ should prefer supported formats 3ms
       ✓ should filter unsupported formats 1ms
     ✓ cleanup (1)
       ✓ should clear all state and callbacks 1ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Memory Performance > should prevent memory lea
aks during long-running sessions
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 702ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]    
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 536ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 317ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 10/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 481ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx [queued]
 ❯ src/tests/image-loading-performance.test.tsx 3/14
   └── should handle rapid sequential image requests efficiently 482ms
 ❯ src/tests/maze-rendering-integration.test.tsx 1/20
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 519ms
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 1 passed (70)
      Tests 69 passed (222)
   Start at 13:01:28
   Duration 4.49s
ode (vitest 14)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
Preloaded 10 sounds

stdout | src/tests/maze-rendering-integration.test.tsx > Maze Rendering Integration Tests > Complete maze rendering with all cell types > should render all cell types present in the test maze
Successfully preloaded image: /Empty.png
Successfully preloaded image: /player.png
Successfully preloaded image: /rock.png
Successfully preloaded image: /soil.png
Successfully preloaded image: /diamond.png
Successfully preloaded image: /boulder.png
Successfully preloaded image: /bomb.png
Successfully preloaded image: /exit.png

stdout | src/tests/maze-rendering-integration.test.tsx > Maze Renderin
ng Integration Tests > Complete maze rendering with all cell types > sh
hould render all cell types present in the test maze
Successfully preloaded 8 images

 ✓ src/tests/audio/settings/audio-settings-localstorage.test.tsx (17 t
tests) 570ms
   ✓ Audio Settings localStorage Persistence - Debug Panel (17)       
     ✓ saving debug panel visibility preference (4)
       ✓ should save showDebugPanel to localStorage when set to true 5
52ms
       ✓ should save showDebugPanel to localStorage when set to false 
 40ms
       ✓ should persist debug panel preference alongside other setting
gs 30ms
       ✓ should update localStorage on each debug panel change 30ms   
     ✓ loading debug panel visibility preference (5)
       ✓ should restore showDebugPanel from localStorage on initializa
ation 6ms
       ✓ should default to false when no preference exists in localSto
orage 9ms
       ✓ should default to false when showDebugPanel is missing from s
stored settings 15ms
       ✓ should handle corrupted showDebugPanel values gracefully 126m
ms
       ✓ should handle completely corrupted localStorage data 18ms    
     ✓ cross-session persistence (2)
       ✓ should persist debug panel preference across browser sessions
s 42ms
       ✓ should maintain preference through multiple setting changes 6
60ms
     ✓ localStorage error handling (2)
       ✓ should handle localStorage save errors gracefully 17ms       
       ✓ should handle localStorage load errors gracefully 15ms       
     ✓ storage key consistency (2)
       ✓ should use the correct storage key for debug panel settings 3
32ms
       ✓ should not create separate storage entries for debug panel 16
6ms
     ✓ data integrity (2)
       ✓ should maintain data type consistency in localStorage 14ms   
       ✓ should preserve other settings when updating debug panel 45ms

 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 804ms
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 637ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 418ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 583ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 4/14
 ❯ src/tests/maze-rendering-integration.test.tsx 2/20
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 620ms
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 2 passed (70)
      Tests 78 passed (296)
   Start at 13:01:28
   Duration 4.60s
 ❯ src/tests/image-loading-performance.test.tsx (14 tests | 1 failed) 876ms
   ❯ 8. Performance Tests for Image Loading (14)
     ✓ Image Loading Performance (4)
       ✓ should load individual images within performance budget 106ms
       ✓ should handle concurrent image loading efficiently 13ms      
       ✓ should preload all images within performance budget 17ms     
       ✓ should handle rapid sequential image requests efficiently  705ms
     ❯ Memory Usage Performance (3)
       × should manage memory efficiently during image loading 28ms   
       · should prevent memory leaks during repeated loading
       · should handle large-scale image operations without memory exhaustion
     ↓ Rendering Performance (3)
       · should render cells with images without delays
       · should handle multiple cell rendering efficiently
       · should maintain performance during rapid re-renders
     ↓ Performance Under Load (2)
       · should handle high-frequency image loading without performanc
ce degradation
       · should maintain performance with mixed success/failure scenar
rios
     ↓ Performance Regression Detection (2)
       · should detect performance regressions in image loading       
       · should provide detailed performance metrics for analysis     
 ✓ src/tests/react-sound-integration.test.tsx (26 tests) 98ms
   ✓ React Sound System Integration Tests (26)
     ✓ 2. Integration Tests for React Hooks and Component Interactions
s
 (26)
       ✓ useSound Hook Integration (5)
✓ should integrate with AudioProvider correctly 32ms
✓ should call audio manager methods correctly 15ms
✓ should handle playback errors and track error state 18ms   
✓ should reset error counts via resetAudioSystem 10ms        
✓ should sync volume settings with audio manager 19ms        
       ↓ useAudioSettings Hook Integration (5)
· should integrate with AudioProvider for settings management
· should persist settings to localStorage
· should load settings from localStorage on initialization   
· should handle localStorage errors gracefully
· should validate and clamp volume values
       ↓ AudioProvider Context Integration (3)
· should provide audio manager to child components
· should handle audio manager initialization errors
· should provide reinitialize functionality
       ↓ Component Integration with Sound System (5)
· should integrate sound system with App component
· should trigger sounds on user interactions
· should handle mute toggle in UI
· should open audio settings dialog
· should handle game state changes with sound integration    
       ↓ Performance Integration Tests (3)
· should not block React rendering during audio operations   
· should handle rapid hook updates efficiently
         · should maintain React state consistency during audio operat
tions
       ↓ Error Handling Integration (3)
         · should handle audio manager failures gracefully in React co
ontext
· should show error states in UI components
· should recover from temporary errors
       ↓ Memory Management Integration (2)
· should manage audio manager lifecycle properly
· should handle multiple component instances efficiently     
stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/maze-rendering-integration.test.tsx > Maze Renderin
ng Integration Tests > Complete maze rendering with all cell types > sh
hould apply correct CSS classes to each cell type
Successfully preloaded image: /Empty.png
Successfully preloaded image: /player.png
Successfully preloaded image: /rock.png
Successfully preloaded image: /soil.png
Successfully preloaded image: /diamond.png
Successfully preloaded image: /boulder.png
Successfully preloaded image: /bomb.png
Successfully preloaded image: /exit.png

stdout | src/tests/maze-rendering-integration.test.tsx > Maze Renderin
ng Integration Tests > Complete maze rendering with all cell types > sh
hould apply correct CSS classes to each cell type
Successfully preloaded 8 images

 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1095ms       
   ✓ Audio Error Handling and Fallbacks (23)
     ✓ Web Audio API Unavailable (3)
       ✓ should gracefully degrade when Web Audio API is not supported
d 8ms
       ✓ should fall back to silent mode when no audio support exists 
 2ms
       ✓ should handle AudioContext creation failure 5ms
     ✓ Audio Context Suspension Handling (3)
       ✓ should handle suspended audio context due to autoplay policie
es 24ms
       ✓ should handle audio context resume failure 19ms
       ✓ should set up multiple event listeners for context resume 4ms
     ✓ Sound File Loading Errors (3)
       ✓ should handle failed sound file loads gracefully 7ms
       ✓ should retry failed sound loads  1022ms
       · should fall back to HTML5 audio when Web Audio loading fails 
 completely
     ↓ HTML5 Audio Fallback (3)
       · should handle HTML5 audio playback errors
       · should handle autoplay blocked errors
       · should handle unsupported audio formats
     ↓ Silent Mode Fallback (2)
       · should provide silent implementations for all methods        
       · should return empty loading state
     ↓ Error Recovery Mechanisms (3)
       · should attempt on-demand loading when buffer not found       
       · should validate audio buffers before playback
       · should handle audio context interruption on iOS Safari       
     ↓ Browser-Specific Error Handling (2)
       · should handle Safari-specific audio context issues
       · should handle Chrome-specific audio context issues
     ↓ Error Event Emission (2)
       · should emit error events for external handling
       · should emit fallback events when switching audio managers    
     ↓ Memory Management and Cleanup (2)
       · should clean up resources on audio manager cleanup
       · should handle cleanup errors gracefully
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefine
ed

 ✓ src/tests/maze-rendering-integration.test.tsx (20 tests) 540ms     
   ✓ Maze Rendering Integration Tests (20)
     ✓ Complete maze rendering with all cell types (4)
       ✓ should render the complete maze grid with correct structure 1
140ms
       ✓ should render all cell types present in the test maze 169ms  
       ✓ should render the correct number of cells based on maze dimen
nsions 60ms
       ✓ should apply correct CSS classes to each cell type 168ms     
     ↓ Image display verification in grid layout (4)
       · should apply background images to cells when images load succ
cessfully
       · should display correct images for each cell type
       · should maintain proper grid layout with images
       · should handle image loading failures gracefully in grid layou
ut
     ↓ Responsive behavior with image assets (4)
       · should maintain grid layout on smaller screens
       · should show mobile controls on touch devices
       · should adapt HUD layout for smaller screens
       · should maintain image quality across different viewport sizes
     ↓ Dynamic maze rendering (2)
       · should update grid layout when maze dimensions change        
       · should handle maze updates without breaking image rendering  
     ↓ Performance and loading states (3)
       · should show loading states during image loading
       · should not block rendering while images are loading
       · should handle mixed loading states (some success, some failur
re)
     ↓ Accessibility and user experience (3)
       · should provide appropriate titles for cells with image errors
       · should maintain keyboard navigation functionality with images
       · should provide visual feedback for different cell states     

 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s

















stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
                                                                      
                                                                      
                                                                      













stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s

















stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performance T
Tests for Audio System > Event System Performance > should handle sound
d event emission efficiently
Preloaded 10 sounds

stdout | src/tests/how-to-play-popup-integration.test.tsx > How to Pla
ay Popup Integration > should show popup automatically for first-time u
users
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully

ode (vitest 15)
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/how-to-play-popup-integration.test.tsx > How to Play Popup Integration > should show popup automatically for first-time users
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulder_move
No supported audio format found for arrow_move
Failed to create audio element for arrow_move
No supported audio format found for collision_thud
Failed to create audio element for collision_thud
No supported audio format found for death_sound
Failed to create audio element for death_sound
No supported audio format found for victory_sound
Failed to create audio element for victory_sound
No supported audio format found for door_slamode (vitest 1)
Failed to create audio element for door_slam
No supported audio format found for diamond_collect
Failed to create audio element for diamond_collect
No supported audio format found for bomb_sound
Failed to create audio element for bomb_sound


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/how-to-play-popup-integration.test.tsx > How to Play Popup Integration > should show popup automatically for first-time users
HTML5 Audio preloaded 0/10 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s











stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)ode (vitest 8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s











ode (vitest 13)stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
ode (vitest 11)

 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s

















stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20        
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 844ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 625ms
 ❯ src/tests/audio/settings/audio-settings-localstorage.test.tsx 17/17
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
   └── should handle audio decoding with mocked decodeAudioData 789ms 
 ❯ src/tests/how-to-play-popup-integration.test.tsx 0/7
 ❯ src/tests/image-loading-performance.test.tsx 14/14
 ❯ src/tests/maze-rendering-integration.test.tsx 20/20
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 827ms
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 1 failed | 5 passed (70)
      Tests 1 failed | 87 passed (296)
   Start at 13:01:28
   Duration 4.80s
ode (vitest 9) ✓ src/tests/app-sound-integration.test.tsx (21 tests) 303ms
   ✓ App Sound Integration (21)
     ✓ Sound System Initialization (3)
       ✓ should initialize audio system on app startup 299ms
       · should not block game rendering during audio initialization  
       · should handle audio initialization errors gracefully
     ↓ Keyboard Controls Integration (4)
       · should handle game movement keys without interfering with audio
       · should handle mute keyboard shortcut (Ctrl+M)
       · should handle mute keyboard shortcut (Cmd+M) on Mac
       · should not trigger mute on M key without modifiers
     ↓ Game Event Sound Integration (3)
       · should emit sounds for player movement
       · should stop all sounds when game ends
       · should not emit sounds when game is over
     ↓ Audio Controls Integration (3)
       · should toggle mute via button click
       · should open audio settings dialog
       · should display audio error messages when available
     ↓ Performance and Responsiveness (3)
       · should not block user input during sound playback
       · should handle multiple simultaneous sound events
       · should maintain game state consistency during audio operation
ns
     ↓ Error Recovery (5)
       · should continue working when sound playback fails
       · should handle audio context suspension gracefully
       · should show fallback mode indicator when in fallback
       · should show reset audio button when there are playback errors
       · should handle audio reset errors gracefully
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }      

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive 
 Sound System Test Suite > 3. Mock Implementations for Web Audio API Te
esting > WebAudioManager with Comprehensive Mocks > should handle audio
o decoding with mocked decodeAudioData
Preloaded 10 sounds

 ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 1232ms     
   ✓ Comprehensive Sound System Test Suite (36)
     ✓ 1. Unit Tests for Pure Functions and Sound Event Generation (9)
       ✓ Sound Event Mapping Functions (3)
✓ should correctly map all player movement scenarios 10ms    
✓ should correctly map all game state changes 2ms
✓ should generate complex event sequences correctly 3ms      
       ✓ Sound Event Emitter Pure Functions (3)
✓ should create emitter with correct interface 2ms
         ✓ should handle event emission without callback gracefully 4m
ms
✓ should correctly map all sound event types to IDs 5ms      
       ✓ Sound Configuration Validation (3)
✓ should have valid sound asset configuration 7ms
✓ should have consistent sound IDs across configuration 2ms  
✓ should have valid category configuration 3ms
     ✓ 2. Integration Tests for React Hooks and Component Interactions
s
 (1)
       ✓ should be covered by React-specific integration tests 1ms    
     ✓ 3. Mock Implementations for Web Audio API Testing (13)
       ✓ WebAudioManager with Comprehensive Mocks (6)
✓ should initialize with mocked Web Audio API 6ms
✓ should handle audio context state changes 4ms
✓ should create and manage gain nodes correctly 5ms
✓ should create buffer sources for sound playback 91ms       
         ✓ should handle audio decoding with mocked decodeAudioData  1
1084ms
· should handle mocked audio context errors gracefully       
       ↓ HTML5AudioManager with Comprehensive Mocks (4)
· should initialize with mocked HTML5 Audio
· should create audio elements for each sound
· should handle audio loading events
· should handle audio playback with mocked play method       
       ↓ Mock Error Scenarios (3)
· should handle mocked network failures during preloading    
· should handle mocked audio decoding failures
· should handle mocked localStorage failures
     ↓ 4. End-to-End Tests for Complete Sound Workflows (3)
       · should complete full sound system lifecycle
       · should handle complex game scenario end-to-end
       · should handle fallback scenarios end-to-end
     ↓ 5. Performance Tests for Audio System (7)
       · should initialize quickly without blocking
       · should handle rapid sound playback without performance degrad
dation
       · should preload sounds efficiently
       · should handle memory management efficiently
       · should not impact game responsiveness during audio operations
       · should handle concurrent audio operations efficiently        
       · should maintain consistent performance under stress
     ↓ Error Handling and Edge Cases (3)
       · should handle all error scenarios gracefully
       · should handle invalid sound IDs gracefully
       · should handle invalid play options gracefully
stdout | src/tests/how-to-play-popup-integration.test.tsx > How to Pla
ay Popup Integration > should not show popup for returning users who op
pted out
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/how-to-play-popup-integration.test.tsx > How to Play Popup Integration > should not show popup for returning users who opted out
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulder_move
No supported audio format found for arrow_move
Failed to create audio element for arrow_move
No supported audio format found for collision_thud
Failed to create audio element for collision_thud
No supported audio format found for death_sound
Failed to create audio element for death_sound
No supported audio format found for victory_sound
Failed to create audio element for victory_sound
No supported audio format found for door_slam
Failed to create audio element for door_slam
No supported audio format found for diamond_collect
Failed to create audio element for diamond_collect
No supported audio format found for bomb_sound
Failed to create audio element for bomb_sound
An update to AudioProvider inside a test was not wrapped in act(...). 

When testing, code that causes React state updates should be wrapped i
into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in th
he browser. Learn more at https://react.dev/link/wrap-tests-with-act   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/how-to-play-popup-integration.test.tsx > How to Play Popup Integration > should not show popup for returning users who opted out
HTML5 Audio preloaded 0/10 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/how-to-play-popup-integration.test.tsx > How to Play Popup Integration > should not show popup for returning users who opted out
An update to AudioProvider inside a test was not wrapped in act(...). 

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act   

stderr | src/tests/how-to-play-popup-integration.test.tsx > How to Play Popup Integration > should not show popup for returning users who op
pted out
An update to AudioDebug inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped i
into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in th
he browser. Learn more at https://react.dev/link/wrap-tests-with-act   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
 ✓ src/tests/sound-system-performance.test.ts (20 tests) 1104ms       
   ✓ 5. Performance Tests for Audio System (20)
     ✓ Initialization Performance (3)
       ✓ should initialize WebAudioManager within performance budget 15ms
       ✓ should initialize HTML5AudioManager within performance budget 3ms
       ✓ should handle multiple manager instances efficiently 23ms    
     ✓ Preloading Performance (3)
       ✓ should preload sounds within performance budget 109ms        
       ✓ should handle concurrent preloading efficiently 100ms        
       ✓ should optimize network requests during preloading 65ms      
     ✓ Sound Playback Performance (3)
       ✓ should play sounds with minimal latency 80ms
       ✓ should handle rapid sequential playback efficiently 92ms     
       ✓ should handle concurrent sound playback efficiently 112ms    
     ✓ Memory Performance (2)
       ✓ should manage memory efficiently during intensive use 95ms   
       ✓ should prevent memory leaks during long-running sessions 239m
ms
     ✓ Event System Performance (3)
       ✓ should handle sound event generation efficiently 38ms        
       ✓ should handle sound event emission efficiently 131ms
       · should maintain performance under event system stress        
     ↓ Cleanup Performance (2)
       · should cleanup resources efficiently
       · should handle cleanup of multiple managers efficiently       
     ↓ Performance Regression Detection (2)
       · should maintain consistent performance across operations     
       · should detect performance bottlenecks in audio operations    
     ↓ Performance Monitoring and Metrics (2)
       · should provide performance metrics for monitoring
       · should track performance trends over time
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefine
ed


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMan
nager > should preload sounds successfully
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 32
20ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Preloaded 0 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 320ms
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.56s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/how-to-play-popup-integration.test.tsx 1/7
   └── should not show popup for returning users who opted out 315ms  
 ❯ src/tests/sound-system-e2e.test.ts 0/17
   └── should handle complete player movement workflow 1.76s
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 8 passed (70)
      Tests 1 failed | 94 passed (296)
   Start at 13:01:28
   Duration 5.74s
 ✓ src/tests/audio-manager.test.ts (27 tests) 2087ms
   ✓ Audio Manager (27)
     ✓ WebAudioManager (12)
       ✓ should initialize with Web Audio API support 14ms
       ✓ should handle muted state correctly 6ms
       ✓ should load muted preference from localStorage 3ms
       ✓ should handle localStorage errors gracefully 4ms
       ✓ should preload sounds successfully  2057ms
       · should handle preload errors gracefully
       · should play sound with default options
       · should play sound with custom options
       · should not play sound when muted
       · should handle missing sound buffer gracefully
       · should cleanup resources properly
       · should handle audio context creation failure
     ↓ HTML5AudioManager (6)
       · should initialize with HTML5 Audio support
       · should handle muted state correctly
       · should preload sounds using HTML5 Audio
       · should play sound with HTML5 Audio
       · should not play sound when muted
       · should cleanup audio elements
     ↓ SilentAudioManager (2)
       · should initialize in silent mode
       · should handle all operations silently
     ↓ createAudioManager factory (3)
       · should create WebAudioManager when Web Audio API is supported
       · should create HTML5AudioManager when only HTML5 Audio is supp
ported
       · should create SilentAudioManager when no audio support is ava
ailable
     ↓ Error Handling (4)
       · should handle fetch errors during preloading
       · should handle HTTP errors during preloading
       · should handle audio decoding errors
       · should handle playback errors gracefully
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victo
ory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-
-slam.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.
.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefine
ed


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17ode (vitest 5)
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104ode (vitest 6)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for 
 Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handl
le complete player movement workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:
:104


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context state changed to: closed


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
 ✓ src/tests/sound-system-e2e.test.ts (17 tests) 2117ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows (17)
     ✓ Complete Game Sound Workflow (3)
       ✓ should handle complete player movement workflow  2115ms      
       · should handle complete game state transition workflow        
       · should handle death scenario workflow
     ↓ Audio Manager Fallback Workflow (2)
       · should gracefully fallback from WebAudio to HTML5 to Silent  
       · should handle audio context suspension and recovery workflow 
     ↓ Settings Persistence Workflow (2)
       · should persist and restore audio settings across sessions    
       · should handle settings corruption gracefully
     ↓ Performance Under Load Workflow (2)
       · should handle intensive sound event workflow efficiently     
       · should maintain performance during concurrent operations     
     ↓ Error Recovery Workflow (3)
       · should recover from network failures during preloading       
       · should handle audio decoding failures and continue operation 
       · should handle localStorage failures and continue operation   
     ↓ Memory Management Workflow (2)
       · should properly cleanup resources in complete workflow       
       · should handle memory pressure gracefully
     ↓ Cross-Browser Compatibility Workflow (2)
       · should handle webkit prefixed AudioContext
       · should handle different audio format support
     ↓ Integration with Game Events Workflow (1)
       · should integrate with complete game event sequence
 ✓ src/tests/how-to-play-popup-integration.test.tsx (7 tests) 1415ms  
   ✓ How to Play Popup Integration (7)
     ✓ should show popup automatically for first-time users  308ms    
     ✓ should not show popup for returning users who opted out  1104ms
     · should block keyboard input when popup is open
     · should allow keyboard input after popup is closed
     · should disable mobile controls when popup is open
     · should enable mobile controls after popup is closed
     · should save "don't show again" preference when checkbox is chec
cked
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3  


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36ode (vitest 12)
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3  


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3   
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 629ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20        
   └── should provide playSound functionality through useSound hook 62
29ms
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.87s
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 11 passed (70)
      Tests 1 failed | 96 passed (296)
   Start at 13:01:28
   Duration 6.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20       
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 2 failed | 12 passed (70)
      Tests 2 failed | 97 passed (296)
   Start at 13:01:28
   Duration 6.36s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                              
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                        
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                              
    at new Promise (<anonymous>)                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Aud
dio Manager > WebAudioManager > enhanced preloading > should handle loa
ading failures gracefully
Failed to load sound BOMB_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.
.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dis
st/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:10
05:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20       
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 2 failed | 12 passed (70)
      Tests 2 failed | 97 passed (296)
   Start at 13:01:28
   Duration 6.36s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                              
Asset loading complete: 0/10 loaded, 10 failed                        
                                                                      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                              
Preloaded 0 sounds                                                    
                                                                      
 ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 2453ms   
   ✓ Enhanced Audio Manager (23)                                      
     ✓ WebAudioManager (12)                                           
       ✓ initialization (2)                                           
         ✓ should initialize with Web Audio API support 10ms          
✓ should handle audio context suspension 4ms
       ✓ enhanced preloading (4)
✓ should preload sounds with progress tracking 212ms
✓ should apply optimization during preloading 167ms
✓ should handle loading failures gracefully  2057ms
· should skip preloading in fallback mode
       ↓ optimization reporting (2)
· should provide optimization report
· should handle empty buffer set
       ↓ loading state management (1)
· should track loading state correctly
       ↓ error recovery (2)
· should retry failed loads
· should handle decode errors
       ↓ format fallback (1)
· should try multiple formats
     ↓ HTML5AudioManager (5)
       · initialization (1)
· should initialize with HTML5 Audio support
       · preloading with format optimization (2)
· should preload sounds with format filtering
· should handle unsupported formats
       · loading state (2)
· should provide loading state
· should provide optimization report
     ↓ createAudioManager factory (3)
       · should create WebAudioManager when Web Audio API is available
       · should create HTML5AudioManager when only HTML5 Audio is avai
ilable
       · should create SilentAudioManager when no audio support       
     ↓ integration with existing functionality (3)
       · should maintain existing playSound functionality
       · should maintain existing mute functionality
       · should maintain existing cleanup functionality

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20       
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 2 failed | 12 passed (70)
      Tests 2 failed | 97 passed (296)
   Start at 13:01:28
   Duration 6.36s
(node:49908) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                  
(Use `node --trace-deprecation ...` to show where the warning was created)                                                                  
                                                                      
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20       
 ❯ src/tests/audio-manager.test.ts 27/27                              
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23               
 ❯ src/tests/build-system-validation.test.ts 0/9                      
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                 
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]            
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7               
 ❯ src/tests/sound-system-e2e.test.ts 17/17                           
 ❯ src/tests/sound-system-performance.test.ts 20/20                   
                                                                      
 Test Files 2 failed | 12 passed (70)
      Tests 2 failed | 97 passed (296)
   Start at 13:01:28
   Duration 6.36s
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx (20 tests | 1 failed) 1672ms                                                      
   ❯ App Sound Integration - Comprehensive Task 10 Tests (20)         
     ❯ Task 10.1: Add sound hooks to App.tsx for global audio management (4)                                                                
       ✓ should integrate useSound hook for global audio management  341ms                                                                  
       × should provide playSound functionality through useSound hook 1246ms                                                                
       · should provide stopAllSounds functionality through useSound hook                                                                   
       · should handle audio system reset through useSound hook       
     ↓ Task 10.2: Connect keyboard event handlers to trigger appropriate sounds (4)                                                         
       · should connect arrow key handlers to sound system            
       · should connect WASD key handlers to sound system
       · should not trigger sounds when game is not in playing state  
       · should handle rapid keyboard input without blocking
     ↓ Task 10.3: Implement sound initialization during app startup (4
4)
       · should initialize sound system during app startup without blo
ocking rendering
       · should set up sound event callbacks during initialization    
       · should handle sound initialization errors gracefully
       · should initialize audio context and preload sounds
     ↓ Task 10.4: Ensure sound system doesn't block game rendering or 
 input (4)
       · should not block game rendering during sound operations      
       · should not block user input during sound playback
       · should handle sound errors without blocking gameplay
       · should maintain consistent frame rate during audio operations
     ↓ Task 10.5: Write integration tests for complete sound system fu
unctionality (4)
       · should integrate all sound system components correctly       
       · should handle complete game lifecycle with sound integration 
       · should integrate error handling across all sound system compo
onents
       · should maintain performance under stress conditions

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20       
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/how-to-play-popup-integration.test.tsx 7/7
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 2 failed | 12 passed (70)
      Tests 2 failed | 97 passed (296)
   Start at 13:01:28
   Duration 6.36s
ode (vitest 3)ode (vitest 14) ↓ src/tests/game-state-sound-transitions.test.ts (7 tests)
   · Game State Sound Transitions (7)
     · Death sound transitions (2)
       · should stop all sounds and play death sound when player hits bomb
       · should stop all sounds and play death sound when running out of moves
     · Victory sound transitions (2)
       · should stop all sounds and play victory sound when player exits successfully
       · should not allow exit when diamonds remain
     · Door slam sound for exit interaction (1)
       · should play door slam sound when player successfully exits   
     · Sound stopping behavior (2)
       · should not stop sounds during normal gameplay
       · should filter out death/victory sounds from regular emission 
 when game ends

 ❯ src/tests/build-system-validation.test.ts 0/9
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7

 Test Files 2 failed | 12 passed | 1 skipped (70)
      Tests 2 failed | 97 passed (303)
   Start at 13:01:28
   Duration 7.32s
stdout | src/tests/build-system-validation.test.ts > Build System Asset Integration
Building production bundle...
Production build completed successfully


 ❯ src/tests/build-system-validation.test.ts 1/9

 Test Files 2 failed | 12 passed | 1 skipped (70)
      Tests 2 failed | 98 passed (303)
   Start at 13:01:28
   Duration 7.65s
 ✓ src/tests/build-system-validation.test.ts (9 tests) 4077ms
   ✓ Build System Asset Integration (9)
     ✓ Production Build Asset Inclusion (4)
       ✓ should complete production build successfully 2ms
       ✓ should include all PNG images in production build 1ms        
       ✓ should preserve image file integrity in build 1ms
       ✓ should generate index.html with correct asset references 1ms 
     ✓ Asset Path Resolution (2)
       ✓ should resolve image paths correctly in development mode 1ms 
       ✓ should have consistent path format across all icons 1ms      
     ✓ Vite Asset Optimization (3)
       ✓ should maintain asset directory structure in build 0ms       
       ✓ should preserve PNG file format and quality 2ms
       ✓ should not modify image files during build process 2ms       

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/app-sound-integration-comprehensive.test.tsx > App So
ound Integration - Comprehensive Task 10 Tests > Task 10.1: Add sound h
hooks to App.tsx for global audio management > should provide playSound
d functionality through useSound hook
AssertionError: expected "spy" to be called with arguments: [ 'player_
_walk', ObjectContaining{…} ]

Number of calls: 0


Ignored nodes: comments, script, style
<html
  style="--maze-width: calc(16 * 32px + 20px); --maze-pixel-width: 532
2px; --maze-pixel-height: 340px; --maze-columns: repeat(16, 32px); --ma
aze-rows: repeat(10, 32px);"
>
  <head />
  <body
    style="overflow: hidden;"
  >
    <div>
      <div
        class="game-wrapper"
      >
        <div
class="maze-container"
style="position: relative;"
        >
<div
class="maze-grid"
            style="--maze-pixel-width: 532px; --maze-pixel-height: 340
0px;"
>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell rock"
              style="background-image: url(/rock.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(121, 85, 72);"
/>
<div
class="cell soil"
              style="background-image: url(/soil.png); background-size
e: cover; background-position: center; background-repeat: no-repeat; ba
ackground-color: rgb(161, 136, 127);"
/>
<div
class="cell diamond"
              style="background-image: url(/diamond.png); background-s
size: cover; background-position: center; background-repeat: no-repeat;
;"
/>
<div
class="cell empty"
              style="background-image: url(/Empty.png); background-siz
ze: cover; background-position: center; background-repeat: no-repeat;" 
/>
<div
class="cell boulder"
              style="background-image: url(/boulder.png); background-s
size: cover; background-position: center; background-repeat: no-repeat;
;"
/>
<div
             ...
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx:217:31      
    215|
    216|       await waitFor(() => {
    217|Xexpect(mockPlaySound).toHaveBeenCalledWith(
       |X^
    218|X"player_walk",
    219|Xexpect.objectContaining({
 ❯ runWithExpensiveErrorDiagnosticsDisabled node_modules/@testing-libr
rary/dom/dist/config.js:47:12
 ❯ checkCallback node_modules/@testing-library/dom/dist/wait-for.js:12
24:77
 ❯ Timeout.checkRealTimersCallback node_modules/@testing-library/dom/d
dist/wait-for.js:118:16

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/tests/image-loading-performance.test.tsx > 8. Performance T
Tests for Image Loading > Memory Usage Performance > should manage memo
ory efficiently during image loading
AssertionError: expected 5084577.153725998 to be less than 5000000    
 ❯ src/tests/image-loading-performance.test.tsx:510:32

    508|Xconst memoryPerImage =
    509|XtotalGrowth.usedJSHeapGrowth / Object.values(ICONS…
    510|Xexpect(memoryPerImage).toBeLessThan(5000000); // Les…
       |X^
    511|       }
    512|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


 Test Files  2 failed | 13 passed | 1 skipped (70)
      Tests  2 failed | 106 passed (303)
   Start at  13:01:28
   Duration  7.73s (transform 3.40s, setup 5.20s, collect 11.87s, test
ts 20.37s, environment 32.21s, prepare 5.54s)

ode (vitest 4):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run a more focused test to check if the component compiles correctly:

Command
npm run build
npm run build
:\Windows\System32\cmd.exe - npm  run buildpm run build
> thewanderer@0.1.0 build
> vite build --mode production

:\Windows\system32\cmd.exe vite v6.3.5 building for production...
transforming (1) src\index.tsx
transforming (10) node_modules\web-vitals\dist\web-vitals.js
transforming (51) src\utils\focus-trap.ts
✓ 74 modules transformed.
rendering chunks (1)...
dist/index.htmlX  0.83 kB │ gzip:  0.45 kB
dist/assets/main-C1-oEWzx.css   20.70 kB │ gzip:  4.49 kB
dist/assets/main-DRBaUkMh.js   307.15 kB │ gzip: 88.60 kB │ map: 1,396
6.43 kB
✓ built in 1.26s
:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


focus-trap.ts

HowToPlayPopup.tsx

HowToPlayPopup.css

HowToPlayContent.tsx






Claude Sonnet 4.0
Autopilot

Hold ⇧ to drop image
New session