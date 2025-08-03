New Session





Execute Task: 5. Implement level progression logic 5. Implement level progression logic

Kiro
Session Too Long
Continue
Summarize and continue in a new session.

Including Steering Documents

typescript-standards.md
I'll implement task 5: "Implement level progression logic". Let me start by updating the task status and then examining the current codebase to understand the existing structure.

Task: 5. Implement level progression logic from 
tasks.md
Status: In Progress
Now let me examine the existing codebase to understand the current structure and interfaces:

Read file(s)

GameState.ts

maze.ts
Searched workspace
Listing interfaces directory to see available interface files
Read file(s)

ILevelProgressionResult.ts

IMazeLevelManager.ts

IMazeLevelData.ts

IGameState.ts
Now let me check if there are any existing level progression related files:

Searched workspace
Searching for existing level progression files
Searched workspace
Searching for existing maze level manager files
Read file(s)

maze-level-manager.ts
Now let me check the audio system to understand how sounds are handled:

Searched workspace
Searching for door slam and victory sound references
Now let me check the sound event emitter to understand how sounds are triggered:

Read file(s)

sound-event-emitter.ts
Now I have a good understanding of the existing structure. Let me create the LevelProgressionHandler class. Based on the requirements and existing code, I need to:

Create a LevelProgressionHandler class to manage level transitions
Add level completion detection when player reaches exit
Implement logic to determine next level or game completion
Add sound event generation for door slam vs victory sounds
Created

level-progression-handler.ts


Now I need to integrate the level progression logic into the GameState. Let me modify the GameState to use the level progression handler when the player reaches the exit:

Read file(s)

GameState.ts 80 - 121
Read file(s)

GameState.ts 120 - 161
Now I need to modify the GameState to integrate level progression. I'll add the level progression handler import and modify the exit handling logic:

Accepted edits to

GameState.ts


Now I need to add the level progression handler to the GameStateData interface:

Accepted edits to

GameState.ts


Now I need to update the createInitialGameState function to include the level progression handler:

Accepted edits to

GameState.ts


Now I need to modify the exit handling logic to use the level progression handler. Let me find the exact location where the exit is handled:

Accepted edits to

GameState.ts


Now I need to add level progression logic after the game state is determined. Let me find where the function returns and add the level progression logic before that:

Read file(s)

GameState.ts 240 - 281
I see the issue - the return statement is missing some properties. Let me add the level progression logic before the return statement and also fix the return to include all properties:

Accepted edits to

GameState.ts


Now I need to update the IGameState interface to include the levelProgressionHandler:


2 edits to file

IGameState.ts


Now I need to update the createGameState function to expose the levelProgressionHandler property:

Read file(s)

GameState.ts 290 - 321
Read file(s)

GameState.ts 320 - 351
I need to add the levelProgressionHandler getter:

Accepted edits to

GameState.ts


Now let me run the tests to see if there are any compilation errors:

Command
npm run test -- --run --reporter=verbose
npm run test -- --run --reporter=verb
bose
:\Windows\System32\cmd.exe - npm  run test -- --run --reporter=verbosepm run test --run --reporter=verbose
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 --run --reporter=ve
erbose

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 4)ode (vitest 6)ode (vitest 7)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 14)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (49)
      Tests 0 passed (0)
   Start at 10:47:08
   Duration 915ms

 Test Files 0 passed (49)
      Tests 0 passed (0)
   Start at 10:47:08
   Duration 1.90s
(node:61720) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:37240) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:14980) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)

 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    

 Test Files 0 passed (49)
      Tests 0 passed (0)
   Start at 10:47:08
   Duration 2.10s
(node:6944) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:5380) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:75120) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:66164) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:59860) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:52480) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:63732) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:16216) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:32608) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:20560) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/audio/audio-optimization.test.ts [queued]       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 0 passed (0)
   Start at 10:47:08
   Duration 2.20s
(node:47628) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:52228) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 0 passed (16)
   Start at 10:47:08
   Duration 2.51s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAudioBuffer > should successfully load audio buffer from
m first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAudioBuffer > should fallback to second source if first 
 fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 1 passed (44)
   Start at 10:47:08
   Duration 2.61s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 1 passed (44)
   Start at 10:47:08
   Duration 2.61s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 1 passed (44)
   Start at 10:47:08
   Duration 2.61s








stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 1 passed (44)
   Start at 10:47:08
   Duration 2.61s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/ogg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 1 passed (44)
   Start at 10:47:08
   Duration 2.61s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:138:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued] 
 ❯ src/audio/__tests__/error-handling.test.ts [queued]       
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts [queued]
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 0 passed (49)
      Tests 1 passed (44)
   Start at 10:47:08
   Duration 2.61s
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 61ms
   ✓ AudioFormatUtils (14)
     ✓ isFormatSupported (3)
       ✓ should return true for supported formats 3ms        
       ✓ should return false for unsupported formats 0ms     
       ✓ should be case insensitive 0ms
     ✓ getBestSupportedFormat (3)
       ✓ should return mp3 as preferred format 0ms
       ✓ should return ogg if mp3 not available 0ms
       ✓ should return null if no formats supported 0ms      
     ✓ getFormatFromUrl (3)
       ✓ should extract format from URL 0ms
       ✓ should handle URLs with query parameters 0ms        
       ✓ should return empty string for URLs without extensio
on 0ms
     ✓ validateAudioHeader (5)
       ✓ should validate MP3 header with ID3 tag 0ms
       ✓ should validate MP3 header with frame sync 0ms      
       ✓ should validate OGG header 0ms
       ✓ should validate WAV header 0ms
       ✓ should reject invalid headers 0ms
   ✓ AudioOptimizer (11)
     ✓ analyzeAudioBuffer (5)
       ✓ should analyze audio buffer metrics 1ms
       ✓ should provide sample rate recommendations 0ms      
       ✓ should provide channel recommendations for stereo 0m
ms
       ✓ should provide duration recommendations for long cli
ips 0ms
       ✓ should provide file size recommendations 0ms        
     ✓ normalizeAudioBuffer (2)
       ✓ should normalize audio buffer 21ms
       ✓ should skip normalization when disabled 0ms
     ✓ applyFadeInOut (2)
       ✓ should apply fade in and out 11ms
       ✓ should use default fade times 14ms
     ✓ getOptimizationReport (2)
       ✓ should generate optimization report for multiple fil
les 2ms
       ✓ should provide global recommendations 1ms
   ✓ AudioUtils (3)
     ✓ formatFileSize (1)
       ✓ should format bytes correctly 0ms
     ✓ formatDuration (1)
       ✓ should format seconds correctly 0ms
     ✓ formatCompressionRatio (1)
       ✓ should format compression ratio as percentage 0ms   
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/boulder-state-manager.test.ts > Boulder St
tate Manager > Boulder movement updates > should not allow neg
gative moving boulder count
[Boulder System - updateBoulderMovement] INVALID_STATE: Attem
mpted to stop boulder at position (1,1) but it was not moving 
[Boulder System - updateBoulderMovement] Context: {
  position: { x: 1, y: 1 },
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: false,
    triggeredOnMove: -1
  }
}
[Boulder System - updateBoulderMovement] Recoverable: true   


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support 
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle muted state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should load muted preference from localStorag
ge
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle localStorage errors gracefully 
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/w
walk.mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/d
dig.mp3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/
/Whoosh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/tw
wang.mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/th
hud.mp3
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/d
death.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory
y.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-sl
lam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/
/collect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp
p3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/bomb.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: undefined
d
 undefined
[AssetLoader] Response for /sounds/player/dig.mp3: undefined 
 undefined
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefi
ined undefined
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined
d
 undefined
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined 
 undefined
[AssetLoader] Response for /sounds/player/death.mp3: undefine
ed undefined
[AssetLoader] Response for /sounds/environment/victory.mp3: u
undefined undefined
[AssetLoader] Response for /sounds/environment/door-slam.mp3:
:
 undefined undefined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undef
fined undefined
[AssetLoader] Response for /sounds/environment/bomb.mp3: unde
efined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/player/death.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/environment/victory.mp3: 
 TypeError: Cannot read properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3
3: TypeError: Cannot read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Type
eError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Typ
peError: Cannot read properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
 ✓ src/tests/boulder-state-manager.test.ts (40 tests) 27ms   
   ✓ Boulder State Manager (40)
     ✓ Position utilities (3)
       ✓ should create position key correctly 2ms
       ✓ should parse position key correctly 1ms
       ✓ should handle zero coordinates 0ms
     ✓ Boulder position detection (3)
       ✓ should find all boulder positions in maze 2ms       
       ✓ should return empty array for maze with no boulders 
 0ms
       ✓ should handle empty maze 0ms
     ✓ Boulder state manager creation (2)
       ✓ should create initial boulder state manager correctl
ly 1ms
       ✓ should handle maze with no boulders 0ms
     ✓ Position adjacency detection (4)
       ✓ should detect orthogonal adjacency 0ms
       ✓ should detect diagonal adjacency 0ms
       ✓ should not detect non-adjacent positions 0ms        
       ✓ should not consider same position as adjacent 0ms   
     ✓ Adjacent boulder detection (5)
       ✓ should detect boulders adjacent to player 0ms       
       ✓ should return empty array when no boulders are adjac
cent 0ms
       ✓ should handle boundary edge cases correctly 1ms     
       ✓ should handle all 8 adjacent positions correctly 1ms
       ✓ should handle negative coordinates correctly 0ms    
     ✓ Triggered boulder identification (5)
       ✓ should identify newly triggered boulders when player
r moves 1ms
       ✓ should not trigger boulders that were already adjace
ent 0ms
       ✓ should trigger all adjacent boulders when no previou
us position 0ms
       ✓ should handle boundary edge cases for triggered boul
lder identification 0ms
       ✓ should handle player movement across maze boundaries
s correctly 0ms
     ✓ Boulder trigger updates (2)
       ✓ should update boulder states when triggered 1ms     
       ✓ should not re-trigger already triggered boulders 0ms
     ✓ Boulder movement updates (3)
       ✓ should update moving boulder states correctly 1ms   
       ✓ should update stopped boulder states correctly 0ms  
       ✓ should not allow negative moving boulder count 3ms  
     ✓ Boulder position updates (2)
       ✓ should update boulder positions correctly 1ms       
       ✓ should preserve boulder state data when updating pos
sitions 0ms
     ✓ Moving boulder detection (2)
       ✓ should detect when boulders are moving 0ms
       ✓ should detect when no boulders are moving 0ms       
     ✓ Triggered boulders for move (3)
       ✓ should return boulders triggered on previous move 1m
ms
       ✓ should not return boulders already moving 0ms       
       ✓ should not return boulders triggered on different mo
oves 0ms
     ✓ Player position tracking (2)
       ✓ should update player position correctly 0ms
       ✓ should handle null to position update 0ms
     ✓ Proximity result creation (2)
       ✓ should create proximity result with adjacent and new
wly triggered boulders 1ms
       ✓ should handle null previous position 0ms
     ✓ Movement constraint creation (2)
       ✓ should create constraint with no blocking when no bo
oulders are moving 0ms
       ✓ should create constraint with blocking when boulders
s are moving 0ms
 ✓ src/tests/boulder-error-handling.test.ts (29 tests) 27ms  
   ✓ Boulder Error Handling (29)
     ✓ Error Result Creation (2)
       ✓ should create error result correctly 4ms
       ✓ should create success result correctly 1ms
     ✓ Position Validation (4)
       ✓ should validate valid position 1ms
       ✓ should reject position with negative coordinates 1ms
       ✓ should reject position outside maze bounds 1ms      
       ✓ should reject position with empty maze 1ms
     ✓ Boulder State Validation (5)
       ✓ should validate valid boulder state 1ms
       ✓ should reject boulder state with invalid position 0m
ms
       ✓ should reject boulder state with position mismatch 1
1ms
       ✓ should reject boulder state with inconsistent logic 
 1ms
       ✓ should reject boulder state with invalid triggeredOn
nMove 0ms
     ✓ Boulder State Manager Validation (5)
       ✓ should validate valid boulder state manager 1ms     
       ✓ should reject null boulder state manager 0ms        
       ✓ should reject manager with null boulders map 0ms    
       ✓ should reject manager with incorrect moving boulder 
 count 0ms
       ✓ should reject manager with mismatched position keys 
 0ms
     ✓ Boulder State Recovery (2)
       ✓ should recover boulder state with out-of-bounds posi
ition 1ms
       ✓ should handle recovery failure gracefully 0ms       
     ✓ Boulder State Manager Recovery (1)
       ✓ should recover boulder state manager 1ms
     ✓ Fallback Boulder State Manager (2)
       ✓ should create fallback manager for maze with boulder
rs 1ms
       ✓ should create empty fallback manager for maze withou
ut boulders 0ms
     ✓ Physics Error Handling (2)
       ✓ should handle physics error with fallback 1ms       
       ✓ should handle fallback creation failure 1ms
     ✓ Maze Integrity Validation (4)
       ✓ should validate valid maze 0ms
       ✓ should reject empty maze 0ms
       ✓ should reject maze with null rows 0ms
       ✓ should reject maze with inconsistent row lengths 0ms
     ✓ Error Logging (2)
       ✓ should log error with context 3ms
       ✓ should log error without context 1ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10     
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued] 
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts [queued]
 ❯ src/tests/boulder-performance.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 3 passed (49)
      Tests 101 passed (173)
   Start at 10:47:08
   Duration 2.73s
ode (vitest 13)ode (vitest 14)stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAudioBuffer > should throw error if all sources fail    
Failed to load test_sound from sounds/test.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should create WebAudioManager when Web Audio API is supported 
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > s
should fall back to HTML5AudioManager when Web Audio API is no
ot supported
Web Audio API not supported, falling back to HTML5 Audio     
HTML5 Audio initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > Audio Manager Factory > s
should fall back to SilentAudioManager when no audio is suppor
rted
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > Audio Manager Factory > s
should create specific audio manager when requested
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > SilentAudioManager > shou
uld implement all AudioManager methods without errors
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > SilentAudioManager > shou
uld handle loading progress callbacks
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > Error Recovery > should h
handle errors during audio context creation
Using Web Audio API
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > Error Recovery > should h
handle errors during sound playback
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > Error Recovery > should h
handle errors during preloading
Silent Audio Manager initialized - no audio will be played   

stdout | src/audio/__tests__/audio-error-handling.test.ts > A
Audio Error Handling and Fallbacks > Autoplay Policy Handling 
 > should detect autoplay restrictions
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/boulder-performance.test.ts > Boulder Performance Optimizations > Batch Processing > should handle errors in batch processing
Error processing boulder at (1,1): Error: Test error
    at operation (D:\FizzBash\TheWanderer\src\tests\boulder-performance.test.ts:209:27)
    at processBouldersBatch (D:\FizzBash\TheWanderer\src\physics\boulder-performance-optimizations.ts:229:30)
    at D:\FizzBash\TheWanderer\src\tests\boulder-performance.
.test.ts:214:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_
_queues:105:5)

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > COLLISION_THUD Sound Events > should generate COL
LLISION_THUD sound when boulder collides with rock
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > COLLISION_THUD Sound Events > should generate COL
LLISION_THUD sound when boulder hits another boulder
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > COLLISION_THUD Sound Events > should detect playe
er collision when boulder hits player
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > COLLISION_THUD Sound Events > should generate COL
LLISION_THUD sound when boulder hits solid objects
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > Audio Event Integration > should generate both mo
ovement and collision sounds in sequence
[Boulder System - updateBoulderMovement] POSITION_MISMATCH: A
Attempted to mark boulder as moving at position (1,2) but no b
boulder state exists
[Boulder System - updateBoulderMovement] Context: { position:
: { x: 1, y: 2 }, availableKeys: [ '1,1' ] }
[Boulder System - updateBoulderMovement] Recoverable: true   
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder state position (1,1)
) does not contain boulder in maze (found: empty)
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: true,
    isMoving: false,
    triggeredOnMove: 1
  },
  originalError: {
    type: 'position_mismatch',
    message: 'Boulder state position (1,1) does not contain b
boulder in maze (found: empty)',
    context: { state: [Object], actualCell: 'empty' },       
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > Sound Event Properties > should generate COLLISIO
ON_THUD sound with correct properties
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,1: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,1',
  state: {
    position: { x: 1, y: 1 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true

stderr | src/tests/boulder-audio-events.test.ts > Boulder Aud
dio Events > Edge Cases > should handle boulder at maze bounda
ary without generating invalid sounds
[Boulder System - simulateGravityWithState] INVALID_STATE: In
nvalid boulder state for key 1,2: Boulder cannot be moving wit
thout being triggered first
[Boulder System - simulateGravityWithState] Context: {       
  key: '1,2',
  state: {
    position: { x: 1, y: 2 },
    isTriggered: false,
    isMoving: true,
    triggeredOnMove: -1
  },
  originalError: {
    type: 'invalid_state',
    message: 'Boulder cannot be moving without being triggere
ed first',
    context: { state: [Object] },
    recoverable: true
  }
}
[Boulder System - simulateGravityWithState] Recoverable: true


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail    
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/rode (vitest 6)
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAudioBuffer > should throw error if all sources fail    
Failed to load test_sound from sounds/test.ogg: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found    
[AssetLoader] Response headers: { 'content-type': 'text/html'
' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:178:31


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors       
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors       
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors       
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAudioBuffer > should handle audio decoding errors       
Failed to load test_sound from sounds/test.mp3: Error: Invali
id audio data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:207:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

ode (vitest 15)
 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

 ✓ src/audio/__tests__/audio-error-handling.test.ts (10 tests) 39ms
   ✓ Audio Error Handling and Fallbacks (10)
     ✓ Audio Manager Factory (4)
       ✓ should create WebAudioManager when Web Audio API is 
 supported 9ms
       ✓ should fall back to HTML5AudioManager when Web Audio
o API is not supported 2ms
       ✓ should fall back to SilentAudioManager when no audio
o is supported 1ms
       ✓ should create specific audio manager when requested 
 1ms
     ✓ SilentAudioManager (2)
       ✓ should implement all AudioManager methods without er
rrors 7ms
       ✓ should handle loading progress callbacks 6ms        
     ✓ Error Recovery (3)
       ✓ should handle errors during audio context creation 3
3ms
       ✓ should handle errors during sound playback 2ms      
       ✓ should handle errors during preloading 2ms
     ✓ Autoplay Policy Handling (1)
       ✓ should detect autoplay restrictions 3ms
 ✓ src/tests/boulder-performance.test.ts (27 tests) 43ms     
   ✓ Boulder Performance Optimizations (27)
     ✓ Spatial Index (3)
       ✓ should create spatial index for boulder positions 3m
ms
       ✓ should handle empty positions array 1ms
       ✓ should group nearby positions in same grid cell 1ms 
     ✓ Optimized Proximity Detection (2)
       ✓ should detect adjacent boulders efficiently 3ms     
       ✓ should perform better than naive approach with many 
 boulders 2ms
     ✓ OptimizedBoulderStateManager (4)
       ✓ should cache boulder positions by state 2ms
       ✓ should invalidate cache when state updates 1ms      
       ✓ should provide performance statistics 1ms
       ✓ should detect adjacent boulders efficiently 1ms     
     ✓ Batch Processing (2)
       ✓ should process boulders in batches 1ms
       ✓ should handle errors in batch processing 13ms       
     ✓ BoulderPositionTracker (5)
       ✓ should track boulder positions efficiently 1ms      
       ✓ should not add duplicate positions 0ms
       ✓ should remove positions 0ms
       ✓ should return position array 1ms
       ✓ should cache position array until dirty 0ms
     ✓ Optimized Maze Scanning (3)
       ✓ should find boulder positions efficiently 1ms       
       ✓ should handle empty maze 0ms
       ✓ should handle maze with no boulders 0ms
     ✓ Utility Functions (5)
       ✓ should remove duplicate positions 1ms
       ✓ should calculate Manhattan distance 0ms
       ✓ should calculate Chebyshev distance 0ms
       ✓ should filter positions by distance 1ms
       ✓ should filter positions by Manhattan distance 1ms   
     ✓ Performance Monitoring (1)
       ✓ should track performance metrics 0ms
     ✓ Large Scale Performance (2)
       ✓ should handle large mazes efficiently 3ms
       ✓ should handle many proximity checks efficiently 1ms 
 ✓ src/tests/boulder-audio-events.test.ts (18 tests) 43ms    
   ✓ Boulder Audio Events (18)
     ✓ BOULDER_MOVE Sound Events (4)
       ✓ should generate BOULDER_MOVE sound when boulder star
rts moving 8ms
       ✓ should generate BOULDER_MOVE sound for multiple boul
lders starting to move 2ms
       ✓ should map BOULDER_MOVE sound event to correct sound
d ID 1ms
       ✓ should not generate BOULDER_MOVE sound for stationar
ry boulders 1ms
     ✓ COLLISION_THUD Sound Events (5)
       ✓ should generate COLLISION_THUD sound when boulder co
ollides with rock 7ms
       ✓ should generate COLLISION_THUD sound when boulder hi
its another boulder 2ms
       ✓ should detect player collision when boulder hits pla
ayer 2ms
       ✓ should map COLLISION_THUD sound event to correct sou
und ID 0ms
       ✓ should generate COLLISION_THUD sound when boulder hi
its solid objects 6ms
     ✓ Audio Event Integration (3)
       ✓ should emit boulder sound events through the sound s
system 1ms
       ✓ should handle simultaneous boulder movements with in
ndependent sound events 1ms
       ✓ should generate both movement and collision sounds i
in sequence 2ms
     ✓ Sound Event Properties (3)
       ✓ should generate BOULDER_MOVE sound with correct prop
perties 1ms
       ✓ should generate COLLISION_THUD sound with correct pr
roperties 1ms
       ✓ should maintain consistent sound event structure 2ms
     ✓ Edge Cases (3)
       ✓ should handle boulder at maze boundary without gener
rating invalid sounds 2ms
       ✓ should handle empty maze without errors 1ms
       ✓ should handle multiple rapid boulder state changes 1
1ms
 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (14 tests
s) 72ms
   ✓ useAudioSettings (14)
     ✓ initialization (3)
       ✓ should initialize with default settings when no stor
red settings exist 25ms
       ✓ should load settings from localStorage when availabl
le 3ms
       ✓ should handle corrupted localStorage data gracefully
y 4ms
     ✓ mute functionality (2)
       ✓ should toggle mute state 7ms
       ✓ should persist mute state to localStorage 3ms       
     ✓ volume controls (3)
       ✓ should set global volume and clamp values 4ms       
       ✓ should set category volume and clamp values 4ms     
       ✓ should persist volume changes to localStorage 4ms   
     ✓ reset functionality (1)
       ✓ should reset all settings to defaults 5ms
     ✓ hook functionality (3)
       ✓ should provide toggleMute function 2ms
       ✓ should provide all required functions 2ms
       ✓ should provide volume alias for setGlobalVolume 1ms 
     ✓ localStorage error handling (2)
       ✓ should handle localStorage save errors gracefully 2m
ms
       ✓ should handle undefined settings gracefully 2ms     

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
stderr | src/tests/boulder-performance-integration.test.ts > Boulder Performance Integration > Stress Testing > should handle rapid state updates
[Boulder System - updateBoulderMovement] INVALID_STATE: Attempted to stop boulder at position (1,1) but it was not moving 
[Boulder System - updateBoulderMovement] Context: {
  position: { x: 1, y: 1 },
  state: {
    position: { x: 1, y: 1 },
    isTriggered: true,
    isMoving: false,
    triggeredOnMove: 2
  }
}
[Boulder System - updateBoulderMovement] Recoverable: true   
[Boulder System - updateBoulderMovement] INVALID_STATE: Attem
mpted to stop boulder at position (3,1) but it was not moving 
[Boulder System - updateBoulderMovement] Context: {
  position: { x: 3, y: 1 },
  state: {
    position: { x: 3, y: 1 },
    isTriggered: true,
    isMoving: false,
    triggeredOnMove: 3
  }
}
[Boulder System - updateBoulderMovement] Recoverable: true   
[Boulder System - updateBoulderMovement] INVALID_STATE: Attem
mpted to stop boulder at position (1,3) but it was not moving 
[Boulder System - updateBoulderMovement] Context: {
  position: { x: 1, y: 3 },
  state: {
    position: { x: 1, y: 3 },
    isTriggered: true,
    isMoving: false,
    triggeredOnMove: 4
  }
}
[Boulder System - updateBoulderMovement] Recoverable: true   
[Boulder System - updateBoulderMovement] INVALID_STATE: Attem
mpted to stop boulder at position (3,3) but it was not moving 
[Boulder System - updateBoulderMovement] Context: {
  position: { x: 3, y: 3 },
  state: {
    position: { x: 3, y: 3 },
    isTriggered: true,
    isMoving: false,
    triggeredOnMove: 5
  }
}
[Boulder System - updateBoulderMovement] Recoverable: true   


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 1/22    
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 7 passed (49)
      Tests 183 passed (254)
   Start at 10:47:08
   Duration 2.85s
ode (vitest 12)stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound1.mp3
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.m
mp3
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }
[AssetLoader] Response for sounds/sound2.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAssets > should handle partial failures
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound1.m
mp3
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.m
mp3
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/sound2.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:297:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
 ✓ src/tests/boulder-performance-integration.test.ts (22 tests) 102ms
   ✓ Boulder Performance Integration (22)
     ✓ Initialization (2)
       ✓ should initialize with maze and track boulder positions 4ms
       ✓ should provide performance statistics 1ms
     ✓ Optimized Proximity Detection (3)
       ✓ should detect adjacent boulders efficiently 3ms     
       ✓ should identify triggered boulders efficiently 1ms  
       ✓ should handle no previous position 1ms
     ✓ State Management (3)
       ✓ should update boulder state efficiently 1ms
       ✓ should handle position updates 1ms
       ✓ should get boulders by state with caching 2ms       
     ✓ Batch Processing (1)
       ✓ should process boulder operations in batches 2ms    
     ✓ Performance Monitoring (3)
       ✓ should track performance metrics 1ms
       ✓ should provide memory usage estimates 1ms
       ✓ should reset performance tracking 1ms
     ✓ Maze Change Detection (2)
       ✓ should detect maze changes 1ms
       ✓ should update position tracker when maze changes 0ms
     ✓ Large Maze Optimization (1)
       ✓ should optimize for large mazes 47ms
     ✓ Optimization Recommendations (2)
       ✓ should provide optimization recommendations 1ms     
       ✓ should recommend optimizations for poor performance 
 20ms
     ✓ Edge Cases (3)
       ✓ should handle empty maze 1ms
       ✓ should handle maze with no boulders 1ms
       ✓ should handle single boulder maze 1ms
     ✓ Stress Testing (2)
       ✓ should handle rapid state updates 9ms
       ✓ should handle many proximity checks 1ms
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAssets > should handle partial failures
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.m
mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:203:30

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader >
> loadAssets > should handle partial failures
Failed to load sound sound2: TypeError: Cannot read propertie
es of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:171:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:203:30


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> progress tracking > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader >
> progress tracking > should emit error events on failure     
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure     
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
   └── should retry failed sound loads 306ms
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 307ms
 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-error-handling.test.ts 29/29
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 8 passed (49)
      Tests 210 passed (254)
   Start at 10:47:08
   Duration 3.15s
ode (vitest 8)ode (vitest 11)ode (vitest 5)ode (vitest 4)stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure     
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure     
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader >
> progress tracking > should emit error events on failure     
Failed to load test_sound from sounds/test.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.t
test.ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats       
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats       
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg
g' }

 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 683ms     
   ✓ AssetLoader (16)
     ✓ constructor (2)
       ✓ should initialize with default options 3ms
       ✓ should accept custom options 1ms
     ✓ loadAudioBuffer (7)
       ✓ should successfully load audio buffer from first sou
urce 7ms
       ✓ should fallback to second source if first fails 9ms 
       ✓ should retry failed requests 110ms
       ✓ should throw error if all sources fail 218ms        
       ✓ should handle HTTP errors 4ms
       ✓ should handle audio decoding errors 3ms
       ✓ should respect timeout 103ms
     ✓ loadAssets (2)
       ✓ should load all preload assets 3ms
       ✓ should handle partial failures 105ms
     ✓ progress tracking (2)
       ✓ should emit progress events 2ms
       ✓ should emit error events on failure 109ms
     ✓ format optimization (2)
       ✓ should prefer supported formats 2ms
       ✓ should filter unsupported formats 1ms
     ✓ cleanup (1)
       ✓ should clear all state and callbacks 1ms
stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/w
walk.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined
d
 undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined 
 undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefi
ined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined
d
 undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
                                                             
                                                             
                                                             
                                                             
                                                             
                                                             
                                                             
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined 
 undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/death.mp3: undefine
ed undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/victory.mp3: u
undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/door-slam.mp3:
:
 undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/diamond/collect.mp3: undef
fined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/bomb.mp3: unde
efined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 950ms
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14    
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-performance.test.ts 27/27
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 9 passed (49)
      Tests 216 passed (254)
   Start at 10:47:08
   Duration 3.80s








 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1225ms
   ✓ Audio Error Handling and Fallbacks (23)
     ✓ Web Audio API Unavailable (3)
       ✓ should gracefully degrade when Web Audio API is not supported 5ms
       ✓ should fall back to silent mode when no audio support exists 1ms
       ✓ should handle AudioContext creation failure 3ms
     ✓ Audio Context Suspension Handling (3)
       ✓ should handle suspended audio context due to autopla
ay policies 18ms
       ✓ should handle audio context resume failure 16ms     
       ✓ should set up multiple event listeners for context r
resume 2ms
     ✓ Sound File Loading Errors (3)
       ✓ should handle failed sound file loads gracefully 6ms
       ✓ should retry failed sound loads  1008ms
       ✓ should fall back to HTML5 audio when Web Audio loadi
ing fails completely 72ms
     ✓ HTML5 Audio Fallback (3)
       ✓ should handle HTML5 audio playback errors 3ms       
       ✓ should handle autoplay blocked errors 17ms
       ✓ should handle unsupported audio formats 3ms
     ✓ Silent Mode Fallback (2)
       ✓ should provide silent implementations for all method
ds 4ms
       ✓ should return empty loading state 3ms
     ✓ Error Recovery Mechanisms (3)
       ✓ should attempt on-demand loading when buffer not fou
und 9ms
       ✓ should validate audio buffers before playback 4ms   
       ✓ should handle audio context interruption on iOS Safa
ari 5ms
     ✓ Browser-Specific Error Handling (2)
       ✓ should handle Safari-specific audio context issues 1
10ms
       ✓ should handle Chrome-specific audio context issues 3
3ms
     ✓ Error Event Emission (2)
       ✓ should emit error events for external handling 10ms 
       ✓ should emit fallback events when switching audio man
nagers 4ms
     ✓ Memory Management and Cleanup (2)
       ✓ should clean up resources on audio manager cleanup 5
5ms
       ✓ should handle cleanup errors gracefully 8ms

 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.18s
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-performance-integration.test.ts 22/22   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.03s
ode (vitest 3)

 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.76s
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.60s
(node:60896) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:4216) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined
d
 undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Type
eError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound PLAYER_WALK: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined 
 undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeEr
rror: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound PLAYER_DIG: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefi
ined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: 
 TypeError: Cannot read properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound BOULDER_MOVE: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined
d
 undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound ARROW_MOVE: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined 
 undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound COLLISION_THUD: TypeError: Cannot read p
properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/death.mp3: undefine
ed undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Typ
peError: Cannot read properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound DEATH_SOUND: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/victory.mp3: u
undefined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load VICTORY_SOUND from /sounds/environment/victory
y.mp3: TypeError: Cannot read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound VICTORY_SOUND: TypeError: Cannot read pr
roperties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/door-slam.mp3:
:
 undefined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.m
mp3: TypeError: Cannot read properties of undefined (reading '
'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound DOOR_SLAM: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/diamond/collect.mp3: undef
fined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.m
mp3: TypeError: Cannot read properties of undefined (reading '
'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/bomb.mp3: unde
efined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: 
 TypeError: Cannot read properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should preload sounds successfully
Failed to load sound BOMB_SOUND: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loade
er.ts:175:104


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Preloaded 0 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/w
walk.mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/d
dig.mp3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/
/Whoosh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/tw
wang.mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/th
hud.mp3
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/d
death.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory
y.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-sl
lam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/
/collect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp
p3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/bomb.mp3


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: N
Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/victory.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3
3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 4/27
   └── should preload sounds successfully 1.86s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts [queued
d]
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 231 passed (254)
   Start at 10:47:08
   Duration 4.70s
(node:75948) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:59700) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:30144) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:55188) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)
(node:24244) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/boulder-system-error-integration.test.ts 0/19   
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]        

 Test Files 10 passed (49)
      Tests 232 passed (273)
   Start at 10:47:08
   Duration 4.97s
(node:66804) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 310ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]    

 Test Files 12 passed (49)
      Tests 289 passed (311)
   Start at 10:47:08
   Duration 5.18s
 ✓ src/tests/boulder-system-error-integration.test.ts (19 tests) 36ms
   ✓ Boulder System Error Integration (19)
     ✓ Boulder State Manager Error Handling (5)
       ✓ should handle invalid maze in createBoulderStateManager 6ms
       ✓ should handle corrupted boulder positions in updateBoulderTriggers 3ms
       ✓ should handle invalid positions in updateBoulderMove
ement 2ms
       ✓ should handle position conflicts in updateBoulderPos
sitions 1ms
       ✓ should recover from corrupted moving boulder count 1
1ms
     ✓ Physics Engine Error Handling (5)
       ✓ should handle invalid maze in simulateGravityWithSta
ate 3ms
       ✓ should handle corrupted boulder state manager in phy
ysics simulation 1ms
       ✓ should handle errors in boulder fall simulation 1ms 
       ✓ should handle arrow simulation errors in simulatePhy
ysicsStepWithState 4ms
       ✓ should provide fallback when physics simulation comp
pletely fails 1ms
     ✓ Movement Constraint Error Handling (4)
       ✓ should handle corrupted boulder state manager in sho
ouldBlockPlayerMovement 0ms
       ✓ should handle errors in updateMovementConstraints 1m
ms
       ✓ should validate constraint state consistency 1ms    
       ✓ should handle null constraint in validateConstraintS
State 0ms
     ✓ Error Recovery Scenarios (3)
       ✓ should recover from maze-boulder state mismatch 1ms 
       ✓ should handle gradual system degradation 1ms        
       ✓ should maintain system stability under stress 4ms   
     ✓ Error Logging and Debugging (2)
       ✓ should provide detailed error context for debugging 
 1ms
       ✓ should distinguish between recoverable and non-recov
verable errors 1ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 310ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]    

 Test Files 12 passed (49)
      Tests 289 passed (311)
   Start at 10:47:08
   Duration 5.18s
(node:42368) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 310ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]    

 Test Files 12 passed (49)
      Tests 289 passed (311)
   Start at 10:47:08
   Duration 5.18s
 ✓ src/tests/sound-event-integration.test.ts (38 tests) 32ms 
   ✓ Sound Event Mapper (31)
     ✓ mapPlayerMovementToSound (6)
       ✓ should return dig sound event when player enters soil 4ms
       ✓ should return walk sound event when player moves to empty cell 1ms
       ✓ should return walk sound event when player moves to diamond 0ms
       ✓ should return walk sound event when player moves to 
 exit 1ms
       ✓ should return bomb explosion sound event when player
r moves to bomb 0ms
       ✓ should return null for blocked movement 0ms
     ✓ mapGameStateChangeToSound (4)
       ✓ should return death sound event when player dies 0ms
       ✓ should return victory sound event when player wins 0
0ms
       ✓ should return null when game state does not change 1
1ms
       ✓ should return null for invalid state transitions 0ms
     ✓ mapDiamondCollectionToSound (2)
       ✓ should return collection sound event when collecting
g diamond 0ms
       ✓ should return null for non-diamond cells 0ms        
     ✓ mapExitInteractionToSound (3)
       ✓ should return door slam sound event when player can 
 exit 2ms
       ✓ should return empty array when player cannot exit 0m
ms
       ✓ should return empty array for non-exit cells 0ms    
     ✓ mapSoundEventToId (11)
       ✓ should map player dig movement to dig sound ID 1ms  
       ✓ should map player walk movement to walk sound ID 0ms
       ✓ should map boulder movement to boulder sound ID 0ms 
       ✓ should map arrow movement to arrow sound ID 0ms     
       ✓ should map collision event to thud sound ID 0ms     
       ✓ should map collection event to diamond collect sound
d ID 0ms
       ✓ should map death event to death sound ID 0ms        
       ✓ should map victory event to victory sound ID 0ms    
       ✓ should map door_slam event to door slam sound ID 0ms
       ✓ should map bomb_explode event to bomb sound ID 0ms  
       ✓ should throw error for unknown event type 1ms       
     ✓ generatePlayerMoveEvents (5)
       ✓ should generate movement and collection events for d
diamond collection 1ms
       ✓ should generate movement and death events when playe
er dies 1ms
       ✓ should generate movement, door slam, and victory eve
ents when player wins 1ms
       ✓ should generate dig sound when entering soil 1ms    
       ✓ should generate only movement event for regular move
ement 1ms
   ✓ Sound Event Emitter (7)
     ✓ createSoundEventEmitter (4)
       ✓ should create emitter with working emit function 3ms
       ✓ should emit multiple events 1ms
       ✓ should not emit when no callback is set 1ms
       ✓ should handle errors gracefully 3ms
     ✓ getSoundEventEmitter (1)
       ✓ should return the same instance on multiple calls 1m
ms
     ✓ emitSoundEvent (1)
       ✓ should emit single event using global emitter 1ms   
     ✓ emitSoundEvents (1)
       ✓ should emit multiple events using global emitter 1ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 310ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]    

 Test Files 12 passed (49)
      Tests 289 passed (311)
   Start at 10:47:08
   Duration 5.18s
(node:75960) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 310ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]    

 Test Files 12 passed (49)
      Tests 289 passed (311)
   Start at 10:47:08
   Duration 5.18s
(node:59552) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:65200) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 419ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]    

 Test Files 12 passed (49)
      Tests 289 passed (311)
   Start at 10:47:08
   Duration 5.29s
ode (vitest 9)ode (vitest 14)(node:34580) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 623ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts 5/5

 Test Files 13 passed (49)
      Tests 294 passed (316)
   Start at 10:47:08
   Duration 5.49s
 ✓ src/tests/sound-system-infrastructure.test.ts (5 tests) 17ms
   ✓ Sound System Infrastructure (5)
     ✓ Sound Configuration (4)
       ✓ should have all required sound assets defined 7ms   
       ✓ should have proper sound asset structure 1ms        
       ✓ should have sound configuration with categories 1ms 
       ✓ should have sound ID constants 0ms
     ✓ Audio Utilities (1)
       ✓ should detect browser audio support 6ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 623ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts 5/5

 Test Files 13 passed (49)
      Tests 294 passed (316)
   Start at 10:47:08
   Duration 5.49s
ode (vitest 15)ode (vitest 12)ode (vitest 6)ode (vitest 11) ✓ src/tests/maze-level-manager.test.ts (12 tests) 20ms      
   ✓ MazeLevelManager (12)
     ✓ should initialize with level 1 6ms
     ✓ should return correct total levels count 1ms
     ✓ should return current level number 1ms
     ✓ should detect if next level exists 1ms
     ✓ should advance to next level correctly 1ms
     ✓ should return null when trying to advance beyond last level 1ms
     ✓ should validate maze dimensions are 16x10 3ms
     ✓ should have exactly one exit per level 1ms
     ✓ should have correct diamond counts per level 1ms      
     ✓ should have correct bomb counts per level 1ms
     ✓ should have player at correct start position 1ms      
     ✓ should have exit at correct position 1ms
ode (vitest 7)
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 826ms
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12
 ❯ src/tests/sound-system-infrastructure.test.ts 5/5

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.69s
ode (vitest 8)ode (vitest 10)stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.04s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (328)
   Start at 10:47:08
   Duration 5.91s
ode (vitest 5)ode (vitest 4)(node:27944) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.59s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/maze-level-manager.test.ts 12/12

 Test Files 14 passed (49)
      Tests 306 passed (335)
   Start at 10:47:08
   Duration 6.46s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
Failed to initialize audio: Error: Initialization failed     
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:87:23
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1787:3)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.70s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 14 passed (49)
      Tests 307 passed (335)
   Start at 10:47:08
   Duration 6.56s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
Failed to initialize audio: Error: Initialization failed     
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:87:23
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1787:3)

stderr | src/tests/audio-context.test.tsx > AudioContext > sh
hould allow manual cleanup
An update to AudioProvider inside a test was not wrapped in a
act(...).

When testing, code that causes React state updates should be 
 wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would 
 see in the browser. Learn more at https://react.dev/link/wrap
p-tests-with-act

stderr | src/tests/audio-context.test.tsx > AudioContext > sh
hould handle non-Error exceptions during initialization       
Failed to initialize audio: String error


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 2/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.80s
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 14 passed (49)
      Tests 308 passed (335)
   Start at 10:47:08
   Duration 6.67s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization       
Failed to initialize audio: String error


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
 ✓ src/tests/audio-context.test.tsx (7 tests) 219ms
   ✓ AudioContext (7)
     ✓ should provide audio context to children 78ms
     ✓ should handle initialization errors 31ms
     ✓ should call preloadSounds during initialization 21ms  
     ✓ should allow manual cleanup 28ms
     ✓ should prevent multiple simultaneous initializations 21ms
     ✓ should throw error when useAudioContext is used outsid
de provider 19ms
     ✓ should handle non-Error exceptions during initializati
ion 17ms
stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/w
walk.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound PLAYER_WALK: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error:
: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound PLAYER_DIG: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound BOULDER_MOVE: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound ARROW_MOVE: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound COLLISION_THUD: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound DEATH_SOUND: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s








stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load VICTORY_SOUND from /sounds/environment/victory
y.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound VICTORY_SOUND: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load DOOR_SLAM from /sounds/environment/door-slam.m
mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.m
mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound DIAMOND_COLLECT: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle preload errors gracefully      
Failed to load sound BOMB_SOUND: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules
s/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully      
Preloaded 0 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should play sound with default options       
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should play sound with custom options        
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should not play sound when muted
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should handle missing sound buffer gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > We
ebAudioManager > should cleanup resources properly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure 
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:300:27)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:96:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio
o\managers\audio-manager.ts:79:14)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:304:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should initialize with HTML5 Audio support 
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should handle muted state correctly        
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HT
TML5AudioManager > should preload sounds using HTML5 Audio    
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HT
TML5AudioManager > should preload sounds using HTML5 Audio    
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > HT
TML5AudioManager > should play sound with HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio
Sound asset not found for ID: test_sound


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should not play sound when muted
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should cleanup audio elements
HTML5 Audio initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should cleanup audio elements
Error cleaning up audio element: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:448:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:444:28)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:384:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Si
ilentAudioManager > should initialize in silent mode
No audio support detected, using silent mode

stderr | src/tests/audio-manager.test.ts > Audio Manager > Si
ilentAudioManager > should handle all operations silently     
No audio support detected, using silent mode


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
HTML5 Audio initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
Web Audio API not supported, using HTML5 Audio fallback      

stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/d
dig.mp3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/
/Whoosh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/tw
wang.mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/th
hud.mp3
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/d
death.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory
y.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-sl
lam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/
/collect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp
p3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environm
ment/bomb.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: N
Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/environment/victory.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3
3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 314 passed (335)
   Start at 10:47:08
   Duration 6.88s
(node:69580) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]     
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 331 passed (335)
   Start at 10:47:08
   Duration 7.15s
ode (vitest 3)(node:41624) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:21228) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:66844) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]     
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]     
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 15 passed (49)
      Tests 331 passed (335)
   Start at 10:47:08
   Duration 7.25s
(node:73376) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:45944) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:73720) [DEP0040] DeprecationWarning: The `punycode` mod
dule is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning
g was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 310ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]     
 ❯ src/tests/enhanced-boulder-collision.test.ts 0/47
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]     
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]        

 Test Files 15 passed (49)
      Tests 331 passed (382)
   Start at 10:47:08
   Duration 7.36s
(node:14556) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 511ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]     
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       

 Test Files 1 failed | 15 passed | 1 skipped (49)
      Tests 1 failed | 341 passed (418)
   Start at 10:47:08
   Duration 7.56s
 ❯ src/tests/enhanced-boulder-collision.test.ts (47 tests | 1 failed) 46ms
   ❯ Enhanced Boulder Collision Detection (21)
     ✓ detectBoulderCollision (9)
       ✓ should detect no collision with empty space 5ms     
       ✓ should detect collision with rock 1ms
       ✓ should detect collision with another boulder 1ms    
       ✓ should detect ground collision with soil 1ms        
       ✓ should detect collision with diamond 1ms
       ✓ should detect collision with bomb and trigger explos
sion 1ms
       ✓ should detect player collision and trigger death 1ms
       ✓ should detect collision with exit 1ms
       ✓ should detect wall collision when out of bounds 1ms 
     ❯ simulateEnhancedBoulderFall (5)
       ✓ should move boulder to empty space with movement sou
und 4ms
       × should stop boulder when hitting rock with collision
n sound 19ms
       · should handle player collision with death sound     
       · should handle bomb collision with explosion
       · should not move boulder when blocked
     ↓ canBoulderFall (7)
       · should return true when space below is empty        
       · should return false when space below is blocked     
       · should return false when at bottom boundary
       · should return true when player is below (allows boul
lder to fall and kill player)
       · should return true when bomb is below (allows boulde
er to fall and trigger explosion)
       · should return false when diamond is below
       · should return false when exit is below
   ↓ Enhanced Collision Sound Mapping (18)
     · mapBoulderObjectCollisionToSound (8)
       · should map rock collision to high priority sound    
       · should map boulder collision to high priority sound 
       · should map soil collision to medium priority sound  
       · should map diamond collision to medium priority soun
nd
       · should map bomb collision to high priority sound    
       · should map player collision to death sound
       · should map exit collision to medium priority sound  
       · should return null for empty space
     · generateBoulderPlayerCollisionSound (1)
       · should generate death sound for player collision    
     · generateBoulderBombCollisionSound (1)
       · should generate high priority collision sound for bo
omb
     · categorizeBoulderCollision (8)
       · should categorize rock as solid collision
       · should categorize boulder as solid collision        
       · should categorize soil as soft collision
       · should categorize diamond as solid collision        
       · should categorize bomb as special collision
       · should categorize player as special collision       
       · should categorize exit as solid collision
       · should categorize empty as no collision
   ↓ Enhanced Boulder Collision Integration Tests (8)        
     · Multiple object collision scenarios (3)
       · should handle boulder falling through multiple empty
y spaces
       · should handle boulder collision with diamond after f
falling
       · should handle complex maze with multiple collision t
types
     · Sound event generation for different collision types (
(2)
       · should generate appropriate sound events for each co
ollision type
       · should generate death sound for player collision    
     · Boundary and edge case handling (3)
       · should handle boulder at maze edge correctly        
       · should handle out of bounds collision detection     
       · should handle negative coordinates

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 511ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]     
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       

 Test Files 1 failed | 15 passed | 1 skipped (49)
      Tests 1 failed | 341 passed (418)
   Start at 10:47:08
   Duration 7.56s
(node:56844) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 511ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]     
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       

 Test Files 1 failed | 15 passed | 1 skipped (49)
      Tests 1 failed | 341 passed (418)
   Start at 10:47:08
   Duration 7.56s








 ↓ src/tests/comprehensive-sound-system.test.ts (36 tests)   
   · Comprehensive Sound System Test Suite (36)
     · 1. Unit Tests for Pure Functions and Sound Event Generation (9)
       · Sound Event Mapping Functions (3)
X· should correctly map all player movement scenarios
X· should correctly map all game state changes
X· should generate complex event sequences correctly
       · Sound Event Emitter Pure Functions (3)
· should create emitter with correct interface      
         · should handle event emission without callback grac
cefully
· should correctly map all sound event types to IDs 
       · Sound Configuration Validation (3)
· should have valid sound asset configuration       
         · should have consistent sound IDs across configurat
tion
· should have valid category configuration
     · 2. Integration Tests for React Hooks and Component Int
teractions (1)
       · should be covered by React-specific integration test
ts
     · 3. Mock Implementations for Web Audio API Testing (13)
       · WebAudioManager with Comprehensive Mocks (6)        
· should initialize with mocked Web Audio API       
· should handle audio context state changes
· should create and manage gain nodes correctly     
· should create buffer sources for sound playback   
         · should handle audio decoding with mocked decodeAud
dioData
         · should handle mocked audio context errors graceful
lly
       · HTML5AudioManager with Comprehensive Mocks (4)      
· should initialize with mocked HTML5 Audio
· should create audio elements for each sound       
· should handle audio loading events
         · should handle audio playback with mocked play meth
hod
       · Mock Error Scenarios (3)
         · should handle mocked network failures during prelo
oading
· should handle mocked audio decoding failures      
· should handle mocked localStorage failures        
     · 4. End-to-End Tests for Complete Sound Workflows (3)  
       · should complete full sound system lifecycle
       · should handle complex game scenario end-to-end      
       · should handle fallback scenarios end-to-end
     · 5. Performance Tests for Audio System (7)
       · should initialize quickly without blocking
       · should handle rapid sound playback without performan
nce degradation
       · should preload sounds efficiently
       · should handle memory management efficiently
       · should not impact game responsiveness during audio o
operations
       · should handle concurrent audio operations efficientl
ly
       · should maintain consistent performance under stress 
     · Error Handling and Edge Cases (3)
       · should handle all error scenarios gracefully        
       · should handle invalid sound IDs gracefully
       · should handle invalid play options gracefully       

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 511ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]     
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       

 Test Files 1 failed | 15 passed | 1 skipped (49)
      Tests 1 failed | 341 passed (418)
   Start at 10:47:08
   Duration 7.56s
(node:67076) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:53860) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 613ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]     
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts [queued]

 Test Files 1 failed | 15 passed | 1 skipped (49)
      Tests 1 failed | 341 passed (434)
   Start at 10:47:08
   Duration 7.66s
ode (vitest 15)ode (vitest 14)ode (vitest 12) ↓ src/tests/physics-engine-enhanced.test.ts (13 tests)      
   · Enhanced Physics Engine (13)
     · simulateGravityWithState (4)
       · should handle triggered boulders starting to move   
       · should handle boulder collision with COLLISION_THUD sound
       · should detect player collision with moving boulder  
       · should handle multiple moving boulders
     · simulatePhysicsStepWithState (2)
       · should integrate boulder state management with physi
ics simulation
       · should handle arrows alongside boulder state managem
ment
     · Boulder State Tracking Functions (4)
       · should correctly identify moving boulder positions  
       · should correctly identify triggered boulder position
ns
       · should categorize boulders correctly
       · should determine if physics should continue based on
n state
     · Edge Cases (3)
       · should handle empty maze
       · should handle boulder at maze boundary
       · should handle duplicate boulder positions in moving 
 list
 ↓ src/tests/audio-hooks.test.tsx (16 tests)
   · Audio Hooks (16)
     · useSound (7)
       · should provide playSound function that calls audio m
manager
       · should provide playSound function with options      
       · should return muted state from audio manager        
       · should toggle mute state
       · should handle audio manager not initialized
       · should show loading state during initialization     
       · should handle playSound errors gracefully
     · useAudioSettings (9)
       · should return default volume from config
       · should load volume from localStorage
       · should handle invalid localStorage volume
       · should set muted state through audio manager        
       · should set volume and save to localStorage
       · should clamp volume between 0 and 1
       · should reset to defaults
       · should handle localStorage errors gracefully        
       · should handle audio manager not initialized for setM
Muted
 ↓ src/tests/movement-constraint-system.test.ts (33 tests)   
   · Movement Constraint System (33)
     · shouldBlockPlayerMovement (4)
       · should not block movement when no boulders are movin
ng
       · should block movement when boulders are moving      
       · should block movement when multiple boulders are mov
ving
       · should not block movement after all boulders stop   
     · updateMovementConstraints (3)
       · should create constraint with no blocking when no bo
oulders are moving
       · should create constraint with blocking when boulders
s are moving
       · should update constraint when boulder states change 
     · getConstraintReason (4)
       · should return no constraints message when no boulder
rs are moving
       · should return single boulder message when one boulde
er is moving
       · should return multiple boulders message when multipl
le boulders are moving
       · should handle edge case of two boulders moving      
     · hasBouldersInMotion (3)
       · should return false when no boulders are moving     
       · should return true when boulders are moving
       · should return false after all boulders stop moving  
     · getMovingBoulderCount (3)
       · should return 0 when no boulders are moving
       · should return correct count when boulders are moving
       · should update count when boulders stop moving       
     · validateConstraintState (2)
       · should validate consistent constraint states        
       · should invalidate inconsistent constraint states    
     · createMovementConstraintSystem (2)
       · should create a valid movement constraint system    
       · should have working methods in the created system   
     · createEnhancedMovementConstraint (2)
       · should create enhanced constraint with additional me
etadata
       · should create enhanced constraint with moving boulde
ers
     · isMovementAllowed (2)
       · should allow movement when no boulders are moving   
       · should not allow movement when boulders are moving  
     · getMovementStatus (3)
       · should return correct status when movement is allowe
ed
       · should return correct status when movement is blocke
ed
       · should update status when boulder states change     
     · Edge cases and error handling (3)
       · should handle empty boulder state manager
       · should handle boulder state manager with zero moving
g count but inconsistent state
       · should handle boundary conditions for boulder counts
     · Integration with boulder state changes (2)
       · should maintain constraint consistency through bould
der lifecycle
       · should handle rapid boulder state changes
ode (vitest 13)
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
(node:70296) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:21624) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3

ode (vitest 9)
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
ode (vitest 11)stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s








stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

ode (vitest 6)
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

ode (vitest 7)
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [q
queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 923ms    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]       

 Test Files 1 failed | 15 passed | 4 skipped (49)
      Tests 1 failed | 341 passed (497)
   Start at 10:47:08
   Duration 7.97s
 ↓ src/tests/sound-system-e2e.test.ts (17 tests)
   · 4. End-to-End Tests for Complete Sound Workflows (17)   
     · Complete Game Sound Workflow (3)
       · should handle complete player movement workflow     
       · should handle complete game state transition workflow
       · should handle death scenario workflow
     · Audio Manager Fallback Workflow (2)
       · should gracefully fallback from WebAudio to HTML5 toode (vitest 10)
o Silent
       · should handle audio context suspension and recovery 
 workflow
     · Settings Persistence Workflow (2)
       · should persist and restore audio settings across ses
ssions
       · should handle settings corruption gracefully        
     · Performance Under Load Workflow (2)
       · should handle intensive sound event workflow efficie
ently
       · should maintain performance during concurrent operat
tions
     · Error Recovery Workflow (3)
       · should recover from network failures during preloadi
ing
       · should handle audio decoding failures and continue o
operation
       · should handle localStorage failures and continue ope
eration
     · Memory Management Workflow (2)
       · should properly cleanup resources in complete workfl
low
       · should handle memory pressure gracefully
     · Cross-Browser Compatibility Workflow (2)
       · should handle webkit prefixed AudioContext
       · should handle different audio format support        
     · Integration with Game Events Workflow (1)
       · should integrate with complete game event sequence  
 ↓ src/tests/sound-system-performance.test.ts (20 tests)     
   · 5. Performance Tests for Audio System (20)
     · Initialization Performance (3)
       · should initialize WebAudioManager within performance
e budget
       · should initialize HTML5AudioManager within performan
nce budget
       · should handle multiple manager instances efficiently
     · Preloading Performance (3)
       · should preload sounds within performance budget     
       · should handle concurrent preloading efficiently     
       · should optimize network requests during preloading  
     · Sound Playback Performance (3)
       · should play sounds with minimal latency
       · should handle rapid sequential playback efficiently 
       · should handle concurrent sound playback efficiently 
     · Memory Performance (2)
       · should manage memory efficiently during intensive us
se
       · should prevent memory leaks during long-running sess
sions
     · Event System Performance (3)
       · should handle sound event generation efficiently    
       · should handle sound event emission efficiently      
       · should maintain performance under event system stres
ss
     · Cleanup Performance (2)
       · should cleanup resources efficiently
       · should handle cleanup of multiple managers efficient
tly
     · Performance Regression Detection (2)
       · should maintain consistent performance across operat
tions
       · should detect performance bottlenecks in audio opera
ations
     · Performance Monitoring and Metrics (2)
       · should provide performance metrics for monitoring   
       · should track performance trends over time

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 1.15s    
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33        
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 6 skipped (49)
      Tests 1 failed | 341 passed (523)
   Start at 10:47:08
   Duration 8.19s
ode (vitest 8)ode (vitest 5)ode (vitest 4) ↓ src/audio/__tests__/audio-settings-integration.test.tsx (6 tests)
   · Audio Settings Integration (6)
     · complete audio settings workflow (4)
       · should allow user to control audio settings end-to-end
       · should handle keyboard shortcuts
       · should reset settings to defaults
       · should disable volume controls when muted
     · persistence across sessions (2)
       · should load saved settings on initialization        
       · should handle corrupted localStorage gracefully     

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 1.45s    
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23       
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 7 skipped (49)
      Tests 1 failed | 341 passed (546)
   Start at 10:47:08
   Duration 8.50s
(node:55504) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 1.45s    
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23       
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 7 skipped (49)
      Tests 1 failed | 341 passed (546)
   Start at 10:47:08
   Duration 8.50s
ode (vitest 3) ↓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 
   · Enhanced Audio Manager (23)
     · WebAudioManager (12)
       · initialization (2)
X· should initialize with Web Audio API support      
X· should handle audio context suspension
       · enhanced preloading (4)
X· should preload sounds with progress tracking      
X· should apply optimization during preloading       
· should handle loading failures gracefully
· should skip preloading in fallback mode
       · optimization reporting (2)
· should provide optimization report
· should handle empty buffer set
       · loading state management (1)
· should track loading state correctly
       · error recovery (2)
· should retry failed loads
· should handle decode errors
       · format fallback (1)
· should try multiple formats
     · HTML5AudioManager (5)
       · initialization (1)
· should initialize with HTML5 Audio support        
       · preloading with format optimization (2)
· should preload sounds with format filtering       
· should handle unsupported formats
       · loading state (2)
· should provide loading state
· should provide optimization report
     · createAudioManager factory (3)
       · should create WebAudioManager when Web Audio API is 
 available
       · should create HTML5AudioManager when only HTML5 Audi
io is available
       · should create SilentAudioManager when no audio suppo
ort
     · integration with existing functionality (3)
       · should maintain existing playSound functionality    
       · should maintain existing mute functionality
       · should maintain existing cleanup functionality      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3    
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/w
walk.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound PLAYER_WALK: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error:
: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound PLAYER_DIG: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3 
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound BOULDER_MOVE: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s








stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound ARROW_MOVE: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3     
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound COLLISION_THUD: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3   
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound DEATH_SOUND: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load VICTORY_SOUND from /sounds/environment/victory
y.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound VICTORY_SOUND: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load DOOR_SLAM from /sounds/environment/door-slam.m
mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.m
mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound DIAMOND_COLLECT: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/       
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Er
rror Handling > should handle fetch errors during preloading  
Failed to load sound BOMB_SOUND: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.t
ts:441:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_m
modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5) 
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading  
Preloaded 0 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/
/6
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [qu
ueued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23      
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued] 
 ❯ src/tests/boulder-behavior-integration.test.ts [queued]   
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-player-experience-e2e.test.ts [queued]  
 ❯ src/tests/collision-sound-integration.test.ts [queued]    
 ❯ src/tests/game-state-boulder-integration.test.ts [queued] 
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]   
 ❯ src/tests/gamestate-level-integration.test.ts [queued]    
 ❯ src/tests/GameState-sound-integration.test.ts [queued]    
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]       
 ❯ src/tests/react-sound-integration.test.tsx [queued]       
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 1 failed | 15 passed | 8 skipped (49)
      Tests 1 failed | 342 passed (546)
   Start at 10:47:08
   Duration 8.83s
 ✓ src/tests/audio-manager.test.ts (27 tests) 6183ms
   ✓ Audio Manager (27)
     ✓ WebAudioManager (12)
       ✓ should initialize with Web Audio API support 5ms    
       ✓ should handle muted state correctly 4ms
       ✓ should load muted preference from localStorage 1ms  
       ✓ should handle localStorage errors gracefully 1ms    
       ✓ should preload sounds successfully  2055ms
       ✓ should handle preload errors gracefully  2044ms     
       ✓ should play sound with default options 4ms
       ✓ should play sound with custom options 2ms
       ✓ should not play sound when muted 3ms
       ✓ should handle missing sound buffer gracefully 3ms   
       ✓ should cleanup resources properly 3ms
       ✓ should handle audio context creation failure 5ms    
     ✓ HTML5AudioManager (6)
       ✓ should initialize with HTML5 Audio support 1ms      
       ✓ should handle muted state correctly 1ms
       ✓ should preload sounds using HTML5 Audio 3ms
       ✓ should play sound with HTML5 Audio 1ms
       ✓ should not play sound when muted 1ms
       ✓ should cleanup audio elements 3ms
     ✓ SilentAudioManager (2)
       ✓ should initialize in silent mode 1ms
       ✓ should handle all operations silently 2ms
     ✓ createAudioManager factory (3)
       ✓ should create WebAudioManager when Web Audio API is 
 supported 2ms
       ✓ should create HTML5AudioManager when only HTML5 Audi
io is supported 1ms
       ✓ should create SilentAudioManager when no audio suppo
ort is available 1ms
     ✓ Error Handling (4)
       ✓ should handle fetch errors during preloading  2031ms
       · should handle HTTP errors during preloading
       · should handle audio decoding errors
       · should handle playback errors gracefully

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 18 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/app-sound-integration-comprehensive.test.tsx
x [ src/tests/app-sound-integration-comprehensive.test.tsx ]  
 FAIL  src/tests/app-sound-integration.test.tsx [ src/tests/a
app-sound-integration.test.tsx ]
 FAIL  src/tests/boulder-audio-mute-integration.test.ts [ src
c/tests/boulder-audio-mute-integration.test.ts ]
 FAIL  src/tests/boulder-behavior-integration.test.ts [ src/t
tests/boulder-behavior-integration.test.ts ]
 FAIL  src/tests/boulder-player-death.test.ts [ src/tests/bou
ulder-player-death.test.ts ]
 FAIL  src/tests/boulder-player-experience-e2e.test.ts [ src/
/tests/boulder-player-experience-e2e.test.ts ]
 FAIL  src/tests/collision-sound-integration.test.ts [ src/te
ests/collision-sound-integration.test.ts ]
 FAIL  src/tests/game-state-boulder-integration.test.ts [ src
c/tests/game-state-boulder-integration.test.ts ]
 FAIL  src/tests/game-state-movement-constraints.test.ts [ sr
rc/tests/game-state-movement-constraints.test.ts ]
 FAIL  src/tests/game-state-sound-transitions.test.ts [ src/t
tests/game-state-sound-transitions.test.ts ]
 FAIL  src/tests/gamestate-level-integration.test.ts [ src/te
ests/gamestate-level-integration.test.ts ]
 FAIL  src/tests/GameState-sound-integration.test.ts [ src/te
ests/GameState-sound-integration.test.ts ]
 FAIL  src/tests/GameState.test.ts [ src/tests/GameState.test
t.ts ]
 FAIL  src/tests/LargerMaze.test.ts [ src/tests/LargerMaze.te
est.ts ]
 FAIL  src/tests/LargerMazeGameState.test.ts [ src/tests/Larg
gerMazeGameState.test.ts ]
 FAIL  src/tests/LargerMazeUI.test.ts [ src/tests/LargerMazeU
UI.test.ts ]
 FAIL  src/tests/physics-integration-demo.test.ts [ src/tests
s/physics-integration-demo.test.ts ]
 FAIL  src/tests/react-sound-integration.test.tsx [ src/tests
s/react-sound-integration.test.tsx ]
Error: Transform failed with 1 error:
D:/FizzBash/TheWanderer/src/GameState.ts:254:6: ERROR: The sy
ymbol "updatedBoulderStateManager" has already been declared  
  Plugin: vite:esbuild
  File: D:/FizzBash/TheWanderer/src/GameState.ts:254:6       

  The symbol "updatedBoulderStateManager" has already been de
eclared
  252|    let updatedDiamonds = newDiamonds;
  253|    let updatedGameState = newGameState;
  254|    let updatedBoulderStateManager = updatedBoulderStat
teManager;
     |        ^
  255|
  256|    // Check if level is complete and handle progressio
on

 ❯ failureErrorWithLog node_modules/esbuild/lib/main.js:1465:
:15
 ❯ node_modules/esbuild/lib/main.js:734:50
 ❯ responseCallbacks.<computed> node_modules/esbuild/lib/main
n.js:601:9
 ❯ handleIncomingPacket node_modules/esbuild/lib/main.js:656:
:12
 ❯ Socket.readFromStdout node_modules/esbuild/lib/main.js:579
9:7

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/19]⎯


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/enhanced-boulder-collision.test.ts > Enhance
ed Boulder Collision Detection > simulateEnhancedBoulderFall >
>
 should stop boulder when hitting rock with collision sound  
AssertionError: expected [ { type: 'movement', …(3) }, …(1) ]
] to have a length of 1 but got 2

- Expected
+ Received

- 1
+ 2

 ❯ src/tests/enhanced-boulder-collision.test.ts:222:40       

    220|Xexpect(result.newMaze[0]![0]).toBe(CELL…
    221|Xexpect(result.newMaze[1]![0]).toBe(CELL…
    222|Xexpect(result.soundEvents).toHaveLength…
       |X^
    223|Xexpect(result.soundEvents[0]?.type).toB…
    224|Xexpect(result.soundEvents[0]?.source).t…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/19]⎯


 Test Files  19 failed | 16 passed | 8 skipped (49)
      Tests  1 failed | 342 passed (546)
   Start at  10:47:08
   Duration  9.00s (transform 3.58s, setup 10.23s, collect 5.
.74s, tests 8.87s, environment 65.15s, prepare 10.16s)        

ode (vitest 2):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run a more focused test to check for compilation errors:

Command
npx tsc --noEmit
npx tsc --noEmit
:\Windows\System32\cmd.exe - npx  tsc --noEmitpm exec tsc --noEmit:\Windows\system32\cmd.exe src/audio/__tests__/error-handling.test.ts:157:19 - error TS6
6133: 'manager' is declared but its value is never read.      

157             const manager = new WebAudioManager();       
   X~~~~~~~

src/audio/__tests__/error-handling.test.ts:197:19 - error TS6
6133: 'manager' is declared but its value is never read.      

197             const manager = new WebAudioManager();       
   X~~~~~~~

src/audio/__tests__/error-handling.test.ts:462:19 - error TS6
6133: 'manager' is declared but its value is never read.      

462             const manager = new WebAudioManager();       
   X~~~~~~~

src/audio/components/audio-error-display.tsx:13:51 - error TS
S6133: 'reinitializeAudio' is declared but its value is never 
 read.

13     const { error, fallbackMode, autoplayAllowed, reinitia
alizeAudio } = useAudioContext();
                                                     ~~~~~~~~
~~~~~~~~~~

src/audio/components/audio-error-display.tsx:15:39 - error TS
S2304: Cannot find name 'useState'.

15     const [dismissed, setDismissed] = useState(false);    
  X~~~~~~~~

src/audio/components/audio-error-display.tsx:16:37 - error TS
S2304: Cannot find name 'useState'.

16     const [showHelp, setShowHelp] = useState(false);      
  X~~~~~~~~

src/audio/components/audio-error-display.tsx:17:37 - error TS
S2304: Cannot find name 'useState'.

17     const [isMobile, setIsMobile] = useState(false);      
  X~~~~~~~~

src/audio/components/audio-error-display.tsx:20:5 - error TS2
2304: Cannot find name 'useEffect'.

20     useEffect(() => {
       ~~~~~~~~~

src/audio/components/audio-error-display.tsx:33:5 - error TS2
2304: Cannot find name 'useEffect'.

33     useEffect(() => {
       ~~~~~~~~~

src/audio/components/AudioControl.tsx:6:33 - error TS2503: Ca
annot find namespace 'JSX'.

6 export function AudioControl(): JSX.Element {
 X~~~

src/audio/events/sound-event-mapper.ts:8:5 - error TS6133: 'f
fromCell' is declared but its value is never read.

8     fromCell: MazeCell,
      ~~~~~~~~

src/audio/events/sound-event-mapper.ts:48:5 - error TS6133: '
'targetCell' is declared but its value is never read.

48     targetCell?: MazeCell
       ~~~~~~~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:28:15 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

28     setMuted: jest.fn(),
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:29:14 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

29     isMuted: jest.fn(() => false),
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:30:22 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

30     setGlobalVolume: jest.fn(),
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:31:22 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

31     getGlobalVolume: jest.fn(() => 0.8),
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:32:24 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

32     setCategoryVolume: jest.fn(),
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:33:24 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

33     getCategoryVolume: jest.fn(() => 1.0),
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:34:28 - 
 error TS2708: Cannot use namespace 'jest' as a value.        

34     getAllCategoryVolumes: jest.fn(() => ({}))
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:38:1 - e
error TS2708: Cannot use namespace 'jest' as a value.

38 jest.mock('../../context/audio-context', () => ({
   ~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:49:9 - e
error TS2708: Cannot use namespace 'jest' as a value.

49         jest.clearAllMocks();
  X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:265:40 -
-
 error TS2708: Cannot use namespace 'jest' as a value.       

265             mockLocalStorage.setItem = jest.fn(() => {   
   X~~~~

src/audio/hooks/__tests__/use-audio-settings.test.ts:269:32 -
-
 error TS2708: Cannot use namespace 'jest' as a value.       

269             const consoleSpy = jest.spyOn(console, 'warn'
').mockImplementation();
   X~~~~

src/audio/hooks/use-sound.ts:30:27 - error TS6133: 'error' is
s declared but its value is never read.

30             const { type, error, details } = event.detail;
  X~~~~~

src/audio/index.ts:4:1 - error TS2308: Module './managers/aud
dio-manager' has already exported a member named 'createAudioM
Manager'. Consider explicitly re-exporting to resolve the ambi
iguity.

4 export * from './managers/audio-manager-factory';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/audio/index.ts:6:1 - error TS2308: Module './managers/aud
dio-manager' has already exported a member named 'SilentAudioM
Manager'. Consider explicitly re-exporting to resolve the ambi
iguity.

6 export * from './managers/silent-audio-manager';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/audio/managers/asset-loader.ts:348:19 - error TS6133: 'co
ontentType' is declared but its value is never read.

348             const contentType = response.headers.get('con
ntent-type') || '';
   X~~~~~~~~~~~

src/audio/utils/asset-resolver.ts:6:7 - error TS6133: 'isDeve
elopment' is declared but its value is never read.

6 const isDevelopment = import.meta.env.DEV;
        ~~~~~~~~~~~~~

src/audio/utils/audio-optimization.ts:27:29 - error TS6133: '
'SUPPORTED_FORMATS' is declared but its value is never read.  

27     private static readonly SUPPORTED_FORMATS = ['mp3', 'o
ogg', 'wav', 'm4a', 'aac'];
  X~~~~~~~~~~~~~~~~~

src/audio/utils/audio-utils.ts:169:28 - error TS2367: This co
omparison appears to be unintentional because the types '"clos
sed" | "suspended"' and '"running"' have no overlap.

169             const result = audioContext.state === 'runnin
ng';
                               X~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~

src/audio/utils/error-handling.ts:178:48 - error TS6133: 'err
ror' is declared but its value is never read.

178     private async handleContextCreationFailure(error: Aud
dioError): Promise<boolean> {
   X~~~~~     

src/audio/utils/error-handling.ts:205:43 - error TS6133: 'err
ror' is declared but its value is never read.

205     private async handleContextSuspension(error: AudioErr
ror): Promise<boolean> {
   X~~~~~

src/audio/utils/error-handling.ts:288:38 - error TS6133: 'err
ror' is declared but its value is never read.

288     private async handleNetworkError(error: AudioError): 
 Promise<boolean> {
   X~~~~~

src/debug-all-levels.ts:2:7 - error TS2451: Cannot redeclare 
 block-scoped variable 'CELL'.

2 const CELL = {
        ~~~~

  src/debug-maze-counts.ts:2:7
    2 const CELL = {
            ~~~~
    'CELL' was also declared here.

src/debug-all-levels.ts:13:10 - error TS2393: Duplicate funct
tion implementation.

13 function countElements(maze: any[][]) {
  X~~~~~~~~~~~~~

src/debug-all-levels.ts:21:29 - error TS2532: Object is possi
ibly 'undefined'.

21         for (let x = 0; x < maze[y].length; x++) {        
  X~~~~~~~

src/debug-all-levels.ts:22:26 - error TS2532: Object is possi
ibly 'undefined'.

22             const cell = maze[y][x];
  X~~~~~~~

src/debug-maze-counts.ts:2:7 - error TS2451: Cannot redeclare
e block-scoped variable 'CELL'.

2 const CELL = {
        ~~~~

  src/debug-all-levels.ts:2:7
    2 const CELL = {
            ~~~~
    'CELL' was also declared here.

src/debug-maze-counts.ts:37:10 - error TS2393: Duplicate func
ction implementation.

37 function countElements(maze: any[][]) {
  X~~~~~~~~~~~~~

src/debug-maze-counts.ts:45:29 - error TS2532: Object is poss
sibly 'undefined'.

45         for (let x = 0; x < maze[y].length; x++) {        
  X~~~~~~~

src/debug-maze-counts.ts:46:26 - error TS2532: Object is poss
sibly 'undefined'.

46             const cell = maze[y][x];
  X~~~~~~~

src/GameState.ts:2:16 - error TS6133: 'initialMaze' is declar
red but its value is never read.

2 import { CELL, initialMaze, getPlayerPosition } from "./maz
ze";
 X~~~~~~~~~~~

src/GameState.ts:7:10 - error TS6133: 'simulatePhysicsStep' i
is declared but its value is never read.

7 import { simulatePhysicsStep, simulatePhysicsStepWithState 
 } from "./physics/physics-engine";
 X~~~~~~~~~~~~~~~~~~~

src/GameState.ts:207:7 - error TS2451: Cannot redeclare block
k-scoped variable 'updatedBoulderStateManager'.

207   let updatedBoulderStateManager = updatePlayerPosition( 
          ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/GameState.ts:254:7 - error TS2451: Cannot redeclare block
k-scoped variable 'updatedBoulderStateManager'.

254   let updatedBoulderStateManager = updatedBoulderStateMan
nager;
          ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/index.tsx:5:1 - error TS6133: 'reportWebVitals' is declar
red but its value is never read.

5 import reportWebVitals from "./reportWebVitals";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/levels/level-progression-handler.ts:79:13 - error TS2322:
: Type '"door_slam" | "victory_sound"' is not assignable to ty
ype '"door_slam" | "movement" | "collision" | "collection" | "
"death" | "victory" | "bomb_explode"'.
  Type '"victory_sound"' is not assignable to type '"door_sla
am" | "movement" | "collision" | "collection" | "death" | "vic
ctory" | "bomb_explode"'.

79             type: result.soundToPlay,
  X~~~~

  src/Interfaces/ISoundEvent.ts:2:5
    2     type: 'movement' | 'collision' | 'collection' | 'de
eath' | 'victory' | 'door_slam' | 'bomb_explode';
          ~~~~
    The expected type comes from property 'type' which is dec
clared here on type 'SoundEvent'

src/physics/boulder-error-handling.ts:4:29 - error TS6133: 'p
parsePositionKey' is declared but its value is never read.    

4 import { createPositionKey, parsePositionKey, findBoulderPo
ositions } from './boulder-state-manager';
 X~~~~~~~~~~~~~~~~

src/physics/boulder-error-handling.ts:338:5 - error TS6133: '
'boulderStateManager' is declared but its value is never read.

338     boulderStateManager: BoulderStateManager
        ~~~~~~~~~~~~~~~~~~~

src/physics/boulder-performance-integration.ts:5:5 - error TS
S6133: 'identifyTriggeredBoulders' is declared but its value i
is never read.

5     identifyTriggeredBoulders,
      ~~~~~~~~~~~~~~~~~~~~~~~~~

src/physics/boulder-performance-integration.ts:12:5 - error T
TS6133: 'createSpatialIndex' is declared but its value is neve
er read.

12     createSpatialIndex,
       ~~~~~~~~~~~~~~~~~~

src/physics/boulder-performance-integration.ts:13:5 - error T
TS6133: 'detectAdjacentBouldersOptimized' is declared but its 
 value is never read.

13     detectAdjacentBouldersOptimized,
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/physics/boulder-performance-integration.ts:233:19 - error
r TS6133: 'positions' is declared but its value is never read.

233             const positions = findBoulderPositionsOptimiz
zed(maze);
   X~~~~~~~~~

src/physics/boulder-performance-integration.ts:234:19 - error
r TS6133: 'largeCellSize' is declared but its value is never r
read.

234             const largeCellSize = Math.max(5, Math.floor(
(Math.sqrt(mazeSize) / 20));
   X~~~~~~~~~~~~~

src/physics/boulder-performance-optimizations.ts:3:25 - error
r TS6196: 'BoulderState' is declared but never used.

3 import type { Position, BoulderState, BoulderStateManager }
} from './boulder-state-manager';
 X~~~~~~~~~~~~

src/physics/boulder-performance-optimizations.ts:287:13 - err
ror TS2322: Type '{ x: number | undefined; y: number | undefin
ned; }[]' is not assignable to type 'Position[]'.
  Type '{ x: number | undefined; y: number | undefined; }' is
s not assignable to type 'Position'.
    Types of property 'x' are incompatible.
      Type 'number | undefined' is not assignable to type 'nu
umber'.
        Type 'undefined' is not assignable to type 'number'. 

287             this.positionArray = Array.from(this.position
ns).map(key => {
   X~~~~~~~~~~~~~~~~~~

src/physics/boulder-performance-optimizations.ts:293:9 - erro
or TS2322: Type 'Position[] | null' is not assignable to type 
 'Position[]'.
  Type 'null' is not assignable to type 'Position[]'.        

293         return this.positionArray;
   X~~~~~~

src/physics/boulder-performance-optimizations.ts:308:35 - err
ror TS6133: 'operation' is declared but its value is never rea
ad.

308 function updatePerformanceMetrics(operation: string, dura
ation: number): void {
   X~~~~~~~~~

src/physics/boulder-state-manager.ts:6:5 - error TS6133: 'rec
coverBoulderStateManager' is declared but its value is never r
read.

6     recoverBoulderStateManager,
      ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/physics/boulder-state-manager.ts:9:10 - error TS6133: 'Er
rrorResult' is declared but its value is never read.

9     type ErrorResult
 X~~~~~~~~~~~

src/physics/collision-detection.ts:327:9 - error TS6133: 'has
sMoved' is declared but its value is never read.

327     let hasMoved = false;
   X~~~~~~~~

src/physics/movement-constraint-system.ts:4:5 - error TS6133:
: 'validateBoulderStateManager' is declared but its value is n
never read.

4     validateBoulderStateManager,
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/physics/movement-constraint-system.ts:6:10 - error TS6133
3: 'ErrorResult' is declared but its value is never read.     

6     type ErrorResult
 X~~~~~~~~~~~

src/physics/physics-engine.ts:8:5 - error TS6133: 'canBoulder
rFall' is declared but its value is never read.

8     canBoulderFall,
      ~~~~~~~~~~~~~~

src/physics/physics-engine.ts:14:5 - error TS6133: 'updateBou
ulderMovement' is declared but its value is never read.       

14     updateBoulderMovement,
       ~~~~~~~~~~~~~~~~~~~~~

src/physics/physics-engine.ts:15:5 - error TS6133: 'updateBou
ulderPositions' is declared but its value is never read.      

15     updateBoulderPositions,
       ~~~~~~~~~~~~~~~~~~~~~~

src/physics/physics-engine.ts:16:5 - error TS6133: 'createPos
sitionKey' is declared but its value is never read.

16     createPositionKey
       ~~~~~~~~~~~~~~~~~

src/physics/physics-engine.ts:22:5 - error TS6133: 'createFal
llbackBoulderStateManager' is declared but its value is never 
 read.

22     createFallbackBoulderStateManager,
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/physics/physics-engine.ts:24:10 - error TS6133: 'ErrorRes
sult' is declared but its value is never read.

24     type ErrorResult
  X~~~~~~~~~~~

src/physics/physics-engine.ts:293:10 - error TS6133: 'findPla
ayerPosition' is declared but its value is never read.        

293 function findPlayerPosition(maze: MazeCell[][]): Position
n | null {
   X~~~~~~~~~~~~~~~~~~

src/tests/app-sound-integration-comprehensive.test.tsx:7:3 - 
 error TS6133: 'act' is declared but its value is never read. 

7   act,
    ~~~

src/tests/app-sound-integration-comprehensive.test.tsx:302:13
3 - error TS6133: 'initialMoves' is declared but its value is 
 never read.

302       const initialMoves = parseInt(
   X~~~~~~~~~~~~

src/tests/app-sound-integration-comprehensive.test.tsx:444:13
3 - error TS6133: 'initialScore' is declared but its value is 
 never read.

444       const initialScore = screen.getByText(/Score:/).tex
xtContent;
   X~~~~~~~~~~~~

src/tests/audio-context.test.tsx:3:1 - error TS6133: 'ReactNo
ode' is declared but its value is never read.

3 import { ReactNode } from "react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/audio-context.test.tsx:3:10 - error TS1484: 'ReactN
Node' is a type and must be imported using a type-only import 
 when 'verbatimModuleSyntax' is enabled.

3 import { ReactNode } from "react";
 X~~~~~~~~~

src/tests/audio-context.test.tsx:8:7 - error TS2740: Type '{ 
 playSound: Mock<Procedure>; preloadSounds: Mock<Procedure>; s
setMuted: Mock<Procedure>; isMuted: Mock<Procedure>; isSupport
ted: Mock<...>; cleanup: Mock<...>; }' is missing the followin
ng properties from type 'AudioManager': stopAllSounds, getLoad
dingState, onLoadingProgress, getOptimizationReport, and 5 mor
re.

8 const mockAudioManager: AudioManager = {
        ~~~~~~~~~~~~~~~~

src/tests/audio-hooks.test.tsx:3:10 - error TS1484: 'ReactNod
de' is a type and must be imported using a type-only import wh
hen 'verbatimModuleSyntax' is enabled.

3 import { ReactNode } from "react";
 X~~~~~~~~~

src/tests/audio-hooks.test.tsx:8:7 - error TS2740: Type '{ pl
laySound: Mock<Procedure>; preloadSounds: Mock<Procedure>; set
tMuted: Mock<Procedure>; isMuted: Mock<Procedure>; ... 4 more 
 ...; stopAllSounds: Mock<...>; }' is missing the following pr
roperties from type 'AudioManager': getLoadingState, onLoading
gProgress, getOptimizationReport, getGlobalVolume, and 2 more.

8 const mockAudioManager: AudioManager = {
        ~~~~~~~~~~~~~~~~

src/tests/audio-hooks.test.tsx:48:10 - error TS6133: 'createF
FailingAudioManager' is declared but its value is never read. 

48 function createFailingAudioManager() {
  X~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/audio-hooks.test.tsx:109:32 - error TS2339: Propert
ty 'mockReturnValue' does not exist on type '() => boolean'.  

109       mockAudioManager.isMuted.mockReturnValue(true);    
   X~~~~~~~~~~~~~~~

src/tests/audio-hooks.test.tsx:124:32 - error TS2339: Propert
ty 'mockReturnValue' does not exist on type '() => boolean'.  

124       mockAudioManager.isMuted.mockReturnValue(false);   
   X~~~~~~~~~~~~~~~

src/tests/audio-hooks.test.tsx:201:34 - error TS2339: Propert
ty 'mockImplementation' does not exist on type '(soundId: stri
ing, options?: PlaySoundOptions | undefined) => void'.        

201       mockAudioManager.playSound.mockImplementation(() =>
> {
   X~~~~~~~~~~~~~~~~~~      

src/tests/audio-manager.test.ts:1:64 - error TS6133: 'MockedF
Function' is declared but its value is never read.

1 import { describe, it, expect, beforeEach, afterEach, vi, t
type MockedFunction } from 'vitest';
                                                             
    ~~~~~~~~~~~~~~

src/tests/audio-manager.test.ts:44:21 - error TS6133: 'arrayB
Buffer' is declared but its value is never read.

44     decodeAudioData(arrayBuffer: ArrayBuffer) {
  X~~~~~~~~~~~

src/tests/audio/audio-optimization.test.ts:10:7 - error TS613
33: 'mockAudioBuffer' is declared but its value is never read.

10 const mockAudioBuffer = {
         ~~~~~~~~~~~~~~~

src/tests/audio/context/audio-context-debug-panel.test.tsx:3:
:10 - error TS1484: 'ReactNode' is a type and must be imported
d using a type-only import when 'verbatimModuleSyntax' is enab
bled.

3 import { ReactNode } from "react";
 X~~~~~~~~~

src/tests/audio/context/audio-context-debug-panel.test.tsx:32
2:7 - error TS2740: Type '{ playSound: Mock<Procedure>; preloa
adSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted:
: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<...>;
; }' is missing the following properties from type 'AudioManag
ger': stopAllSounds, getLoadingState, onLoadingProgress, getOp
ptimizationReport, and 5 more.

32 const mockAudioManager: AudioManager = {
         ~~~~~~~~~~~~~~~~

src/tests/audio/enhanced-audio-manager.test.ts:132:47 - error
r TS6133: 'url' is declared but its value is never read.      

132                 mockFetch.mockImplementation((url: string
g) => {
   X~~~        

src/tests/audio/settings/audio-settings-interface.test.tsx:3:
:10 - error TS1484: 'ReactNode' is a type and must be imported
d using a type-only import when 'verbatimModuleSyntax' is enab
bled.

3 import { ReactNode } from 'react';
 X~~~~~~~~~

src/tests/audio/settings/audio-settings-interface.test.tsx:33
3:7 - error TS2740: Type '{ playSound: Mock<Procedure>; preloa
adSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMuted:
: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<...>;
; }' is missing the following properties from type 'AudioManag
ger': stopAllSounds, getLoadingState, onLoadingProgress, getOp
ptimizationReport, and 5 more.

33 const mockAudioManager: AudioManager = {
         ~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:3:10 - error TS1484: 'ReactNode' is a type and must be impor
rted using a type-only import when 'verbatimModuleSyntax' is e
enabled.

3 import { ReactNode } from "react";
 X~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:48:7 - error TS2740: Type '{ playSound: Mock<Procedure>; pre
eloadSounds: Mock<Procedure>; setMuted: Mock<Procedure>; isMut
ted: Mock<Procedure>; isSupported: Mock<...>; cleanup: Mock<..
..>; }' is missing the following properties from type 'AudioMa
anager': stopAllSounds, getLoadingState, onLoadingProgress, ge
etOptimizationReport, and 5 more.

48 const mockAudioManager: AudioManager = {
         ~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:129:36 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

129       const savedData = JSON.parse(mockLocalStorage._getS
Store()[STORAGE_KEY]);
                                       ~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:159:36 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

159       const savedData = JSON.parse(mockLocalStorage._getS
Store()[STORAGE_KEY]);
                                       ~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:182:36 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

182       const savedData = JSON.parse(mockLocalStorage._getS
Store()[STORAGE_KEY]);
                                       ~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:392:38 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

392         const savedData = JSON.parse(mockLocalStorage._ge
etStore()[STORAGE_KEY]);
                                         ~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:502:36 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

502       const savedData = JSON.parse(store[STORAGE_KEY]);  
   X~~~~~~~~~~~~~~~~~~    

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:526:36 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

526       const savedData = JSON.parse(mockLocalStorage._getS
Store()[STORAGE_KEY]);
                                       ~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~

src/tests/audio/settings/audio-settings-localstorage.test.tsx
x:560:36 - error TS2345: Argument of type 'string | undefined'
' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.       

560       const savedData = JSON.parse(mockLocalStorage._getS
Store()[STORAGE_KEY]);
                                       ~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-audio-events.test.ts:13:10 - error TS6133: 
 'BoulderStateManager' is declared but its value is never read
d.

13     type BoulderStateManager
  X~~~~~~~~~~~~~~~~~~~

src/tests/boulder-audio-events.test.ts:15:1 - error TS6192: A
All imports in import declaration are unused.

15 import { emitSoundEvents, getSoundEventEmitter } from '../
/audio/events/sound-event-emitter';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-audio-events.test.ts:239:45 - error TS6133:
:
 'description' is declared but its value is never read.      

239             solidTestCases.forEach(({ cell, description }
}) => {
   X~~~~~~~~~~~  

src/tests/boulder-audio-events.test.ts:296:51 - error TS6133:
:
 'description' is declared but its value is never read.      

296             solidObjectTestCases.forEach(({ cell, descrip
ption, expectedSoundType }) => {
                                                      ~~~~~~~
~~~~~

src/tests/boulder-audio-events.test.ts:327:56 - error TS6133:
:
 'description' is declared but its value is never read.      

327             specialCollisionTestCases.forEach(({ cell, de
escription, expectedSoundType }) => {
                                                           ~~
~~~~~~~~~~

src/tests/boulder-audio-mute-integration.test.ts:13:10 - erro
or TS6133: 'BoulderStateManager' is declared but its value is 
 never read.

13     type BoulderStateManager
  X~~~~~~~~~~~~~~~~~~~

src/tests/boulder-audio-mute-integration.test.ts:15:27 - erro
or TS6133: 'getSoundEventEmitter' is declared but its value is
s never read.

15 import { emitSoundEvents, getSoundEventEmitter } from '../
/audio/events/sound-event-emitter';
  X~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-audio-mute-integration.test.ts:16:1 - error
r TS6192: All imports in import declaration are unused.       

16 import { createInitialGameState, movePlayer } from '../Gam
meState';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:5:10 - error T
TS6133: 'GameStateData' is declared but its value is never rea
ad.

5     type GameStateData,
 X~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:8:5 - error TS
S6133: 'simulatePhysicsStepWithState' is declared but its valu
ue is never read.

8     simulatePhysicsStepWithState,
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:10:10 - error 
 TS6133: 'PhysicsSimulationResult' is declared but its value i
is never read.

10     type PhysicsSimulationResult
  X~~~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:13:5 - error T
TS6133: 'createBoulderStateManager' is declared but its value 
 is never read.

13     createBoulderStateManager,
       ~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:14:5 - error T
TS6133: 'updateBoulderTriggers' is declared but its value is n
never read.

14     updateBoulderTriggers,
       ~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:17:10 - error 
 TS6133: 'BoulderStateManager' is declared but its value is ne
ever read.

17     type BoulderStateManager
  X~~~~~~~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:160:19 - error
r TS6133: 'boulderSounds' is declared but its value is never r
read.

160             const boulderSounds = physicsResult.soundEven
nts.filter(
   X~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:313:19 - error
r TS6133: 'boulder2State' is declared but its value is never r
read.

313             const boulder2State = step1.boulderStateManag
ger.boulders.get(boulder2Key);
   X~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:371:19 - error
r TS6133: 'boulder1State' is declared but its value is never r
read.

371             const boulder1State = manager.boulders.get(bo
oulder1Key);
   X~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:372:19 - error
r TS6133: 'boulder2State' is declared but its value is never r
read.

372             const boulder2State = manager.boulders.get(bo
oulder2Key);
   X~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:481:19 - error
r TS6133: 'rightBoulderState' is declared but its value is nev
ver read.

481             const rightBoulderState = step1.boulderStateM
Manager.boulders.get(rightBoulderKey);
   X~~~~~~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:691:19 - error
r TS6133: 'initialMoves' is declared but its value is never re
ead.

691             const initialMoves = gameState.moves;        
   X~~~~~~~~~~~~

src/tests/boulder-behavior-integration.test.ts:699:57 - error
r TS2345: Argument of type 'number | undefined' is not assigna
able to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.       

699                 currentState = movePlayer(currentState, d
dx, dy);
                                                            ~
~~

src/tests/boulder-behavior-integration.test.ts:738:57 - error
r TS2345: Argument of type 'number | undefined' is not assigna
able to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.       

738                 currentState = movePlayer(currentState, d
dx, dy);
                                                            ~
~~

src/tests/boulder-performance-integration.test.ts:192:13 - er
rror TS2532: Object is possibly 'undefined'.

192             modifiedMaze[1][1] = CELL.SOIL; // Remove a b
boulder
   X~~~~~~~~~~~~~~~

src/tests/boulder-performance-integration.test.ts:204:13 - er
rror TS2532: Object is possibly 'undefined'.

204             modifiedMaze[1][1] = CELL.SOIL;
   X~~~~~~~~~~~~~~~

src/tests/boulder-performance-integration.test.ts:322:59 - er
rror TS2322: Type 'Position | undefined' is not assignable to 
 type 'Position'.
  Type 'undefined' is not assignable to type 'Position'.     

322                     performanceSystem.updateBoulderState(
([boulders[0]], [], [], [], i + 2);
                                                             
 ~~~~~~~~~~~

src/tests/boulder-performance-integration.test.ts:323:67 - er
rror TS2322: Type 'Position | undefined' is not assignable to 
 type 'Position'.
  Type 'undefined' is not assignable to type 'Position'.     

323                     performanceSystem.updateBoulderState(
([], [], [boulders[0]], [], i + 3);
                                                             
         ~~~~~~~~~~~

src/tests/boulder-player-death.test.ts:7:1 - error TS6133: 'e
emitSoundEvents' is declared but its value is never read.     

7 import { emitSoundEvents } from '../audio/events/sound-even
nt-emitter';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~

src/tests/boulder-player-death.test.ts:86:13 - error TS2739: 
 Type '{ maze: ("empty" | "player" | "rock" | "soil" | "diamon
nd" | "boulder" | "bomb" | "exit")[][]; player: { x: number; y
y: number; }; score: number; moves: number; diamonds: number; 
 gameState: "playing" | "dead" | "won"; boulderStateManager: B
BoulderStateManager; movementConstraint: { ...; }; }' is missi
ing the following properties from type 'GameStateData': curren
ntLevel, levelManager, levelProgressionHandler, isGameComplete

86             return {
  X~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:5:10 - error 
 TS6133: 'GameStateData' is declared but its value is never re
ead.

5     type GameStateData,
 X~~~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:9:10 - error 
 TS6133: 'PhysicsSimulationResult' is declared but its value i
is never read.

9     type PhysicsSimulationResult
 X~~~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:12:5 - error 
 TS6133: 'createBoulderStateManager' is declared but its value
e is never read.

12     createBoulderStateManager,
       ~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:14:10 - error
r TS6133: 'BoulderStateManager' is declared but its value is n
never read.

14     type BoulderStateManager
  X~~~~~~~~~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:80:19 - error
r TS6133: 'isBlocked' is declared but its value is never read.

80             const isBlocked = shouldBlockPlayerMovement(st
tep2.boulderStateManager);
  X~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:103:19 - erro
or TS6133: 'actualStep4Position' is declared but its value is 
 never read.

103             const actualStep4Position = step4.player;    
   X~~~~~~~~~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:416:19 - erro
or TS6133: 'leftBoulder' is declared but its value is never re
ead.

416             const leftBoulder = step1.boulderStateManager
r.boulders.get(leftBoulderKey);
   X~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:417:19 - erro
or TS6133: 'rightBoulder' is declared but its value is never r
read.

417             const rightBoulder = step1.boulderStateManage
er.boulders.get(rightBoulderKey);
   X~~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:735:19 - erro
or TS6133: 'boulder1Key' is declared but its value is never re
ead.

735             const boulder1Key = createPositionKey({ x: 1,
, y: 1 });
   X~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:736:19 - erro
or TS6133: 'boulder2Key' is declared but its value is never re
ead.

736             const boulder2Key = createPositionKey({ x: 3,
, y: 1 });
   X~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:737:19 - erro
or TS6133: 'boulder3Key' is declared but its value is never re
ead.

737             const boulder3Key = createPositionKey({ x: 5,
, y: 1 });
   X~~~~~~~~~~~

src/tests/boulder-player-experience-e2e.test.ts:848:42 - erro
or TS6133: 'index' is declared but its value is never read.   

848             moveResults.forEach((result, index) => {     
   X~~~~~

src/tests/boulder-state-manager.test.ts:20:10 - error TS6133:
:
 'ProximityResult' is declared but its value is never read.  

20     type ProximityResult,
  X~~~~~~~~~~~~~~~

src/tests/boulder-state-manager.test.ts:21:10 - error TS6133:
: 'MovementConstraint' is declared but its value is never read
d.

21     type MovementConstraint,
  X~~~~~~~~~~~~~~~~~~

src/tests/collision-sound-integration.test.ts:344:19 - error 
 TS6133: 'newGameState' is declared but its value is never rea
ad.

344             const newGameState = movePlayer(gameState, 1,
, 0); // Move player right
   X~~~~~~~~~~~~

src/tests/comprehensive-sound-system.test.ts:5:46 - error TS6
6133: 'SilentAudioManager' is declared but its value is never 
 read.

5 import { WebAudioManager, HTML5AudioManager, SilentAudioMan
nager } from '../audio/managers/audio-manager';
                                               ~~~~~~~~~~~~~~
~~~~~

src/tests/comprehensive-sound-system.test.ts:10:27 - error TS
S6196: 'PlaySoundOptions' is declared but never used.

10 import type { SoundEvent, PlaySoundOptions } from '../Inte
erfaces/ISoundEvent';
  X~~~~~~~~~~~~~~~~

src/tests/comprehensive-sound-system.test.ts:11:1 - error TS6
6133: 'AudioManager' is declared but its value is never read. 

11 import type { AudioManager } from '../Interfaces/IAudioMan
nager';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~

src/tests/comprehensive-sound-system.test.ts:72:30 - error TS
S6133: 'arrayBuffer' is declared but its value is never read. 

72     decodeAudioData = vi.fn((arrayBuffer: ArrayBuffer) => 
 {
  X~~~~~~~~~~~

src/tests/comprehensive-sound-system.test.ts:196:45 - error T
TS6133: 'init' is declared but its value is never read.       

196     return vi.fn((input: RequestInfo | URL, init?: Reques
stInit): Promise<Response> => {
   X~~~~

src/tests/comprehensive-sound-system.test.ts:433:56 - error T
TS6133: 'key' is declared but its value is never read.        

433                 Object.entries(SOUND_ASSETS).forEach(([ke
ey, asset]) => {
                                                           ~~
~~

src/tests/comprehensive-sound-system.test.ts:476:67 - error T
TS6133: 'key' is declared but its value is never read.        

476                 Object.entries(SOUND_CONFIG.categories).f
forEach(([key, category]) => {
                                                             
         ~~~

src/tests/comprehensive-sound-system.test.ts:510:23 - error T
TS6133: 'manager' is declared but its value is never read.    

510                 const manager = new WebAudioManager();   
   X~~~~~~~

src/tests/comprehensive-sound-system.test.ts:522:23 - error T
TS6133: 'manager' is declared but its value is never read.    

522                 const manager = new WebAudioManager();   
   X~~~~~~~

src/tests/enhanced-boulder-collision.test.ts:1:32 - error TS6
6133: 'beforeEach' is declared but its value is never read.   

1 import { describe, it, expect, beforeEach, vi } from 'vites
st';
 X~~~~~~~~~~

src/tests/enhanced-boulder-collision.test.ts:1:44 - error TS6
6133: 'vi' is declared but its value is never read.

1 import { describe, it, expect, beforeEach, vi } from 'vites
st';
 X~~

src/tests/enhanced-boulder-collision.test.ts:9:10 - error TS6
6133: 'BoulderCollisionResult' is declared but its value is ne
ever read.

9     type BoulderCollisionResult,
 X~~~~~~~~~~~~~~~~~~~~~~

src/tests/enhanced-boulder-collision.test.ts:10:10 - error TS
S6133: 'BoulderFallResult' is declared but its value is never 
 read.

10     type BoulderFallResult
  X~~~~~~~~~~~~~~~~~

src/tests/game-state-boulder-integration.test.ts:8:5 - error 
 TS6133: 'updateBoulderTriggers' is declared but its value is 
 never read.

8     updateBoulderTriggers,
      ~~~~~~~~~~~~~~~~~~~~~

src/tests/game-state-boulder-integration.test.ts:339:57 - err
ror TS2345: Argument of type 'number | undefined' is not assig
gnable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.       

339                 currentState = movePlayer(currentState, d
dx, dy);
                                                            ~
~~

src/tests/game-state-movement-constraints.test.ts:144:70 - er
rror TS2345: Argument of type 'number | undefined' is not assi
ignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.       

144                 const newState = movePlayer(stateWithMovi
ingBoulders, dx, dy);
                                                             
            ~~

src/tests/game-state-movement-constraints.test.ts:265:19 - er
rror TS6133: 'initialState' is declared but its value is never
r read.

265             const initialState = createInitialGameState(t
testMaze);
   X~~~~~~~~~~~~

src/tests/game-state-movement-constraints.test.ts:401:57 - er
rror TS2345: Argument of type 'number | undefined' is not assi
ignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.       

401                 currentState = movePlayer(currentState, d
dx, dy);
                                                            ~
~~

src/tests/game-state-sound-transitions.test.ts:8:1 - error TS
S6133: 'SoundEvent' is declared but its value is never read.  

8 import type { SoundEvent } from '../Interfaces/ISoundEvent'
';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~

src/tests/GameState.test.ts:2:39 - error TS6133: 'createIniti
ialGameState' is declared but its value is never read.        

2 import { createGameState, movePlayer, createInitialGameStat
te, type GameStateData } from "../GameState";
                                        ~~~~~~~~~~~~~~~~~~~~~
~~

src/tests/GameState.test.ts:21:5 - error TS2739: Type '{ maze
e: ("empty" | "player" | "rock" | "soil" | "diamond" | "boulde
er" | "bomb" | "exit")[][]; player: IPlayerPos; score: number;
; moves: number; diamonds: number; gameState: "playing" | "dea
ad" | "won"; boulderStateManager: BoulderStateManager; movemen
ntConstraint: MovementConstraint; }' is missing the following 
 properties from type 'GameStateData': currentLevel, levelMana
ager, levelProgressionHandler, isGameComplete

21     return {
       ~~~~~~

src/tests/LargerMaze.test.ts:44:5 - error TS2739: Type '{ maz
ze: ("empty" | "player" | "rock" | "soil" | "diamond" | "bould
der" | "bomb" | "exit")[][]; player: IPlayerPos; score: number
r; moves: number; diamonds: number; gameState: "playing" | "de
ead" | "won"; boulderStateManager: BoulderStateManager; moveme
entConstraint: MovementConstraint; }' is missing the following
g properties from type 'GameStateData': currentLevel, levelMan
nager, levelProgressionHandler, isGameComplete

44     return {
       ~~~~~~

src/tests/LargerMazeGameState.test.ts:44:5 - error TS2739: Ty
ype '{ maze: ("empty" | "player" | "rock" | "soil" | "diamond"
" | "boulder" | "bomb" | "exit")[][]; player: IPlayerPos; scor
re: number; moves: number; diamonds: number; gameState: "playi
ing" | "dead" | "won"; boulderStateManager: BoulderStateManage
er; movementConstraint: MovementConstraint; }' is missing the 
 following properties from type 'GameStateData': currentLevel,
, levelManager, levelProgressionHandler, isGameComplete       

44     return {
       ~~~~~~

src/tests/LargerMazeUI.test.ts:73:39 - error TS6133: 'index' 
 is declared but its value is never read.

73             initialMaze.forEach((row, index) => {
  X~~~~~

src/tests/LargerMazeUI.test.ts:125:19 - error TS6133: 'unique
eIcons' is declared but its value is never read.

125             const uniqueIcons = new Set(iconValues);     
   X~~~~~~~~~~~

src/tests/mocks/web-audio-mocks.ts:90:11 - error TS6133: 'whe
en' is declared but its value is never read.

90     start(when?: number): void {
  X~~~~

src/tests/mocks/web-audio-mocks.ts:107:10 - error TS6133: 'wh
hen' is declared but its value is never read.

107     stop(when?: number): void {
   X~~~~

src/tests/mocks/web-audio-mocks.ts:605:5 - error TS6133: 'nam
me' is declared but its value is never read.

605     name: string
        ~~~~

src/tests/mocks/web-audio-mocks.ts:616:5 - error TS6133: 'nam
me' is declared but its value is never read.

616     name: string
        ~~~~

src/tests/movement-constraint-system.test.ts:13:10 - error TS
S6133: 'MovementConstraintSystem' is declared but its value is
s never read.

13     type MovementConstraintSystem,
  X~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/movement-constraint-system.test.ts:14:10 - error TS
S6133: 'EnhancedMovementConstraint' is declared but its value 
 is never read.

14     type EnhancedMovementConstraint,
  X~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/movement-constraint-system.test.ts:466:13 - error T
TS2532: Object is possibly 'undefined'.

466             largeMaze[5][5] = CELL.PLAYER;
   X~~~~~~~~~~~~

src/tests/movement-constraint-system.test.ts:480:17 - error T
TS2345: Argument of type '{ x: number | undefined; y: number |
| undefined; }[]' is not assignable to parameter of type 'Posi
ition[]'.
  Type '{ x: number | undefined; y: number | undefined; }' is
s not assignable to type 'Position'.
    Types of property 'x' are incompatible.
      Type 'number | undefined' is not assignable to type 'nu
umber'.
        Type 'undefined' is not assignable to type 'number'. 

480                 manyBoulders,
   X~~~~~~~~~~~~

src/tests/physics-engine-enhanced.test.ts:17:10 - error TS613
33: 'BoulderStateManager' is declared but its value is never r
read.

17     type BoulderStateManager
  X~~~~~~~~~~~~~~~~~~~

src/tests/setup.ts:5:8 - error TS2339: Property 'expect' does
s not exist on type 'typeof globalThis'.

5 global.expect = expect;
         ~~~~~~

src/tests/setup.ts:6:8 - error TS2339: Property 'vi' does not
t exist on type 'typeof globalThis'.

6 global.vi = vi;
         ~~

src/tests/setup.ts:7:8 - error TS2339: Property 'beforeEach' 
 does not exist on type 'typeof globalThis'.

7 global.beforeEach = beforeEach;
         ~~~~~~~~~~

src/tests/setup.ts:8:8 - error TS2339: Property 'afterEach' d
does not exist on type 'typeof globalThis'.

8 global.afterEach = afterEach;
         ~~~~~~~~~

src/tests/sound-system-e2e.test.ts:6:24 - error TS6133: 'SOUN
ND_CONFIG' is declared but its value is never read.

6 import { SOUND_ASSETS, SOUND_CONFIG, SOUND_IDS } from '../a
audio/config/sound-config';
 X~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:8:5 - error TS6133: 'mapPl
layerMovementToSound' is declared but its value is never read.

8     mapPlayerMovementToSound,
      ~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:9:5 - error TS6133: 'mapGa
ameStateChangeToSound' is declared but its value is never read
d.

9     mapGameStateChangeToSound,
      ~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:11:5 - error TS6133: 'mapS
SoundEventToId' is declared but its value is never read.      

11     mapSoundEventToId
       ~~~~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:14:5 - error TS6133: 'crea
ateSoundEventEmitter' is declared but its value is never read.

14     createSoundEventEmitter,
       ~~~~~~~~~~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:16:5 - error TS6133: 'emit
tSoundEvent' is declared but its value is never read.

16     emitSoundEvent,
       ~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:17:5 - error TS6133: 'emit
tSoundEvents' is declared but its value is never read.        

17     emitSoundEvents
       ~~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:20:27 - error TS6196: 'Pla
aySoundOptions' is declared but never used.

20 import type { SoundEvent, PlaySoundOptions } from '../Inte
erfaces/ISoundEvent';
  X~~~~~~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:21:1 - error TS6133: 'Audi
ioManager' is declared but its value is never read.

21 import type { AudioManager } from '../Interfaces/IAudioMan
nager';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~

src/tests/sound-system-e2e.test.ts:33:13 - error TS6133: 'buf
ffers' is declared but its value is never read.

33     private buffers: Map<string, any> = new Map();        
  X~~~~~~~

src/tests/sound-system-e2e.test.ts:87:21 - error TS6133: 'arr
rayBuffer' is declared but its value is never read.

87     decodeAudioData(arrayBuffer: ArrayBuffer) {
  X~~~~~~~~~~~

src/tests/sound-system-e2e.test.ts:220:45 - error TS6133: 'in
nit' is declared but its value is never read.

220     return vi.fn((input: RequestInfo | URL, init?: Reques
stInit): Promise<Response> => {
   X~~~~

src/tests/sound-system-e2e.test.ts:610:58 - error TS6133: 'ke
ey' is declared but its value is never read.

610             mockLocalStorage.setItem.mockImplementation((
(key: string, value: string) => {
                                                             
~~~

src/tests/sound-system-e2e.test.ts:610:71 - error TS6133: 'va
alue' is declared but its value is never read.

610             mockLocalStorage.setItem.mockImplementation((
(key: string, value: string) => {
                                                             
             ~~~~~

src/tests/sound-system-infrastructure.test.ts:26:20 - error T
TS18048: 'playerWalk' is possibly 'undefined'.

26             expect(playerWalk.id).toBe('player_walk');    
  X~~~~~~~~~~

src/tests/sound-system-infrastructure.test.ts:27:20 - error T
TS18048: 'playerWalk' is possibly 'undefined'.

27             expect(playerWalk.src).toBeInstanceOf(Array); 
  X~~~~~~~~~~

src/tests/sound-system-infrastructure.test.ts:28:20 - error T
TS18048: 'playerWalk' is possibly 'undefined'.

28             expect(playerWalk.src.length).toBeGreaterThan(
(0);
  X~~~~~~~~~~

src/tests/sound-system-infrastructure.test.ts:29:27 - error T
TS18048: 'playerWalk' is possibly 'undefined'.

29             expect(typeof playerWalk.volume).toBe('number'
');
  X~~~~~~~~~~

src/tests/sound-system-infrastructure.test.ts:30:27 - error T
TS18048: 'playerWalk' is possibly 'undefined'.

30             expect(typeof playerWalk.loop).toBe('boolean')
);
  X~~~~~~~~~~

src/tests/sound-system-infrastructure.test.ts:31:27 - error T
TS18048: 'playerWalk' is possibly 'undefined'.

31             expect(typeof playerWalk.preload).toBe('boolea
an');
  X~~~~~~~~~~

src/tests/sound-system-performance.test.ts:5:46 - error TS613
33: 'createAudioManager' is declared but its value is never re
ead.

5 import { WebAudioManager, HTML5AudioManager, createAudioMan
nager } from '../audio/managers/audio-manager';
                                               ~~~~~~~~~~~~~~
~~~~~

src/tests/sound-system-performance.test.ts:74:21 - error TS61
133: 'arrayBuffer' is declared but its value is never read.   

74     decodeAudioData(arrayBuffer: ArrayBuffer) {
  X~~~~~~~~~~~

src/tests/sound-system-performance.test.ts:201:19 - error TS6
6133: 'input' is declared but its value is never read.        

201     return vi.fn((input: RequestInfo | URL, init?: Reques
stInit) => {
   X~~~~~

src/tests/sound-system-performance.test.ts:201:45 - error TS6
6133: 'init' is declared but its value is never read.

201     return vi.fn((input: RequestInfo | URL, init?: Reques
stInit) => {
   X~~~~

src/tests/sound-system-performance.test.ts:215:31 - error TS6
6133: 'bufferStart' is declared but its value is never read.  

215                         const bufferStart = performance.n
now();
   X~~~~~~~~~~~

src/tests/sound-system-performance.test.ts:564:19 - error TS6
6133: 'initialBufferSources' is declared but its value is neve
er read.

564             const initialBufferSources = mockAudioContext
t.getBufferSourceCount();
   X~~~~~~~~~~~~~~~~~~~~


Found 206 errors in 57 files.

Errors  Files
     3  src/audio/__tests__/error-handling.test.ts:157       
     6  src/audio/components/audio-error-display.tsx:13      
     1  src/audio/components/AudioControl.tsx:6
     2  src/audio/events/sound-event-mapper.ts:8
    11  src/audio/hooks/__tests__/use-audio-settings.test.ts:
:28
     1  src/audio/hooks/use-sound.ts:30
     2  src/audio/index.ts:4
     1  src/audio/managers/asset-loader.ts:348
     1  src/audio/utils/asset-resolver.ts:6
     1  src/audio/utils/audio-optimization.ts:27
     1  src/audio/utils/audio-utils.ts:169
     3  src/audio/utils/error-handling.ts:178
     4  src/debug-all-levels.ts:2
     4  src/debug-maze-counts.ts:2
     4  src/GameState.ts:2
     1  src/index.tsx:5
     1  src/levels/level-progression-handler.ts:79
     2  src/physics/boulder-error-handling.ts:4
     5  src/physics/boulder-performance-integration.ts:5     
     4  src/physics/boulder-performance-optimizations.ts:3   
     2  src/physics/boulder-state-manager.ts:6
     1  src/physics/collision-detection.ts:327
     2  src/physics/movement-constraint-system.ts:4
     7  src/physics/physics-engine.ts:8
     3  src/tests/app-sound-integration-comprehensive.test.ts
sx:7
     3  src/tests/audio-context.test.tsx:3
     6  src/tests/audio-hooks.test.tsx:3
     2  src/tests/audio-manager.test.ts:1
     1  src/tests/audio/audio-optimization.test.ts:10        
     2  src/tests/audio/context/audio-context-debug-panel.tes
st.tsx:3
     1  src/tests/audio/enhanced-audio-manager.test.ts:132   
     2  src/tests/audio/settings/audio-settings-interface.tes
st.tsx:3
     9  src/tests/audio/settings/audio-settings-localstorage.
.test.tsx:3
     5  src/tests/boulder-audio-events.test.ts:13
     3  src/tests/boulder-audio-mute-integration.test.ts:13  
    14  src/tests/boulder-behavior-integration.test.ts:5     
     4  src/tests/boulder-performance-integration.test.ts:192
     2  src/tests/boulder-player-death.test.ts:7
    12  src/tests/boulder-player-experience-e2e.test.ts:5    
     2  src/tests/boulder-state-manager.test.ts:20
     1  src/tests/collision-sound-integration.test.ts:344    
     9  src/tests/comprehensive-sound-system.test.ts:5       
     4  src/tests/enhanced-boulder-collision.test.ts:1       
     2  src/tests/game-state-boulder-integration.test.ts:8   
     3  src/tests/game-state-movement-constraints.test.ts:144
     1  src/tests/game-state-sound-transitions.test.ts:8     
     2  src/tests/GameState.test.ts:2
     1  src/tests/LargerMaze.test.ts:44
     1  src/tests/LargerMazeGameState.test.ts:44
     2  src/tests/LargerMazeUI.test.ts:73
     4  src/tests/mocks/web-audio-mocks.ts:90
     4  src/tests/movement-constraint-system.test.ts:13      
     1  src/tests/physics-engine-enhanced.test.ts:17
     4  src/tests/setup.ts:5
    14  src/tests/sound-system-e2e.test.ts:6
     6  src/tests/sound-system-infrastructure.test.ts:26     
     6  src/tests/sound-system-performance.test.ts:5
:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer

Revert


level-progression-handler.ts

GameState.ts

IGameState.ts






Claude Sonnet 4.0
Autopilot
