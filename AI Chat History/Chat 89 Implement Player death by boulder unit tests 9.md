hello

❯ src/tests/boulder-...

New Session





 FAIL  src/tests/boulder-audio-events.test.ts > Boulder Audio Events > BOULDER_MOVE Sound Events > should generate BOULDER_MOVE sound when boulder starts moving

AssertionError: expected [] to have a length of 1 but got +0

- Expected

+ Received

- 1

+ 0

 ❯ src/tests/boulder-audio-events.test.ts:60:36

Kiro
Including Steering Documents

typescript-standards.md
I can see there's a failing test for boulder audio events. Let me examine the test file and the related code to understand what's happening.

Read file(s)

boulder-audio-events.test.ts
Now let me check the physics engine to see how it generates sound events:

Read file(s)

physics-engine.ts
Now let me check the collision detection to see how sound events are generated:

Read file(s)

collision-detection.ts
Now let me check the boulder state manager to understand how boulders are triggered and managed:

Read file(s)

boulder-state-manager.ts
Now I understand the issue. Looking at the failing test, it's expecting a boulder to generate a movement sound when it starts moving, but the test is failing because no sound events are being generated.

Let me trace through the logic:

The test creates a boulder state manager and triggers a boulder on move 1
It then calls simulateGravityWithState with move 2
In getTriggeredBouldersForMove, it looks for boulders that were triggered on currentMoveNumber + 1 (which would be move 3)
But the boulder was triggered on move 1, so it should start moving on move 2
The issue is in the logic of getTriggeredBouldersForMove. Let me check the current logic:

Read file(s)

boulder-state-manager.ts 200 - 221
Let me get the correct function:

Searched workspace
Finding the function that determines when triggered boulders should start moving
Now let me look at the actual function:

Read file(s)

boulder-state-manager.ts 248 - 271
Now I understand the issue! The test is:

Creating a boulder state manager with move 1
Triggering a boulder on move 1 (so triggeredOnMove = 1)
Calling simulateGravityWithState with move 2
The function getTriggeredBouldersForMove looks for boulders where triggeredOnMove === currentMoveNumber + 1
So it's looking for triggeredOnMove === 2 + 1 = 3, but the boulder was triggered on move 1
The logic is backwards. If a boulder is triggered on move 1, it should start moving on move 2. So the condition should be triggeredOnMove === currentMoveNumber - 1, not currentMoveNumber + 1.

Let me fix this:

Accepted edits to

boulder-state-manager.ts


Now let's run the failing test to see if this fixes it:

Command
npm test -- --run src/tests/boulder-audio-events.test.ts
npm test -- --run src/tests/boulder-audio-events.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/boulder-audio-events.test.tspm test --run src/tests/boulder-audio-events.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 --run src/tests/boulder-audio-events.test.ts:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 5)ode (vitest 4)ode (vitest 7)ode (vitest 6)ode (vitest 9)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 10:15:38
   Duration 939ms

 ❯ src/tests/boulder-audio-events.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 10:15:38
   Duration 1.05s
(node:36364) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/boulder-audio-events.test.ts 0/18

 Test Files 0 passed (1)
      Tests 0 passed (18)
   Start at 10:15:38
   Duration 1.35s
 ✓ src/tests/boulder-audio-events.test.ts (18 tests) 16ms
   ✓ Boulder Audio Events > BOULDER_MOVE Sound Events > should generate BOULDER_MOVE sound when boulder starts moving 4ms
   ✓ Boulder Audio Events > BOULDER_MOVE Sound Events > should generate BOULDER_MOVE sound for multiple boulders starting to move 1ms
   ✓ Boulder Audio Events > BOULDER_MOVE Sound Events > should map BOULDER_MOVE sound event to correct sound ID 0ms
   ✓ Boulder Audio Events > BOULDER_MOVE Sound Events > should not
t generate BOULDER_MOVE sound for stationary boulders 0ms
   ✓ Boulder Audio Events > COLLISION_THUD Sound Events > should g
generate COLLISION_THUD sound when boulder collides with rock 1ms  
   ✓ Boulder Audio Events > COLLISION_THUD Sound Events > should g
generate COLLISION_THUD sound when boulder hits another boulder 1ms
   ✓ Boulder Audio Events > COLLISION_THUD Sound Events > should d
detect player collision when boulder hits player 1ms
   ✓ Boulder Audio Events > COLLISION_THUD Sound Events > should m
map COLLISION_THUD sound event to correct sound ID 0ms
   ✓ Boulder Audio Events > COLLISION_THUD Sound Events > should g
generate COLLISION_THUD sound when boulder hits solid objects 2ms  
   ✓ Boulder Audio Events > Audio Event Integration > should emit 
 boulder sound events through the sound system 1ms
   ✓ Boulder Audio Events > Audio Event Integration > should handl
le simultaneous boulder movements with independent sound events 1ms
   ✓ Boulder Audio Events > Audio Event Integration > should gener
rate both movement and collision sounds in sequence 0ms
   ✓ Boulder Audio Events > Sound Event Properties > should genera
ate BOULDER_MOVE sound with correct properties 0ms
   ✓ Boulder Audio Events > Sound Event Properties > should genera
ate COLLISION_THUD sound with correct properties 0ms
   ✓ Boulder Audio Events > Sound Event Properties > should mainta
ain consistent sound event structure 1ms
   ✓ Boulder Audio Events > Edge Cases > should handle boulder at 
 maze boundary without generating invalid sounds 0ms
   ✓ Boulder Audio Events > Edge Cases > should handle empty maze 
 without errors 0ms
   ✓ Boulder Audio Events > Edge Cases > should handle multiple ra
apid boulder state changes 0ms

 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  10:15:38
   Duration  1.51s (transform 177ms, setup 135ms, collect 172ms, t
tests 16ms, environment 651ms, prepare 172ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Great! The test is now passing. Let me run all the tests to make sure I didn't break anything else:

Command
npm test
npm test
:\Windows\System32\cmd.exe - npm  testpm test
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 4)ode (vitest 2)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 12)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 10:15:54
   Duration 897ms

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 10:15:54
   Duration 1.90s

 ❯ src/tests/comprehensive-sound-system.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 10:15:54
   Duration 2.25s
(node:22996) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:72504) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:61192) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:38820) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:73980) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:2356) [DEP0040] DeprecationWarning: The `punycode` module is
s deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:45484) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:14504) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)

 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 10:15:54
   Duration 2.35s
(node:69124) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:61656) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:47544) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:33092) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:40408) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 10:15:54
   Duration 2.45s
(node:69628) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:54840) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (16)
   Start at 10:15:54
   Duration 2.78s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 1 passed (16)
   Start at 10:15:54
   Duration 2.92s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 1 passed (16)
   Start at 10:15:54
   Duration 2.92s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails     
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg     


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 1 passed (16)
   Start at 10:15:54
   Duration 2.92s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 1 passed (16)
   Start at 10:15:54
   Duration 2.92s
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
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 1 passed (16)
   Start at 10:15:54
   Duration 2.92s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:138:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]        
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 1 passed (16)
   Start at 10:15:54
   Duration 2.92s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
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
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle 
 audio context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should pr
reload sounds with progress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle muted state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should load muted preference from localStorage
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle localStorage errors gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [q
queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 4 passed (180)
   Start at 10:15:54
   Duration 3.12s
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
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should pr
reload sounds with progress tracking
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should pr
reload sounds with progress tracking
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio 
 Error Handling and Fallbacks > Audio Manager Factory > should crea
ate WebAudioManager when Web Audio API is supported
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio 
 Error Handling and Fallbacks > Audio Manager Factory > should fall
l back to HTML5AudioManager when Web Audio API is not supported    
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio 
 Error Handling and Fallbacks > Audio Manager Factory > should fall
l back to SilentAudioManager when no audio is supported
Silent Audio Manager initialized - no audio will be played        

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio 
 Error Handling and Fallbacks > Audio Manager Factory > should crea
ate specific audio manager when requested
Silent Audio Manager initialized - no audio will be played        

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio 
 Error Handling and Fallbacks > SilentAudioManager > should impleme
ent all AudioManager methods without errors
Silent Audio Manager initialized - no audio will be played        

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio 
 Error Handling and Fallbacks > SilentAudioManager > should handle 
 loading progress callbacks
Silent Audio Manager initialized - no audio will be played        

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undef
fined
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined u
undefined
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined unde
efined
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undef
fined
[AssetLoader] Response for /sounds/player/death.mp3: undefined und
defined
[AssetLoader] Response for /sounds/environment/victory.mp3: undefi
ined undefined
[AssetLoader] Response for /sounds/environment/door-slam.mp3: unde
efined undefined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined 
 undefined
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined
d
 undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Typ
peError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > load
dAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during audio context creation
Using Web Audio API
Silent Audio Manager initialized - no audio will be played        

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during sound playback
Silent Audio Manager initialized - no audio will be played        

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during preloading
Silent Audio Manager initialized - no audio will be played        


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Autoplay Policy Handling > should detect autoplay restrictions
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined

 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 96ms     

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
 ✓ src/audio/__tests__/audio-error-handling.test.ts (10 tests) 47ms
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5AudioManager within performance budget
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should initialize with mocked Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: suspended
Audio context state changed to: running


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Audio context suspended - attempting to resume on next user interaction


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create and manage gain nodes correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should preloa
ad sounds within performance budget
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > load
dAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > load
dAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:155:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }   


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > load
dAudioBuffer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid aud
dio data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:207:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [que
eued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]        
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 2 passed (40)
      Tests 54 passed (220)
   Start at 10:15:54
   Duration 3.24s
ode (vitest 13)ode (vitest 15)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should handle
e concurrent preloading efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 create buffer sources for sound playback
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should pr
reload sounds with progress tracking
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ap
pply optimization during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ap
pply optimization during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ap
pply optimization during preloading
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > load
dAssets > should handle partial failures
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:297:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > load
dAssets > should handle partial failures
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3   


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
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
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audi
io\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:203:30


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: N
Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Preloading Performance > should optimi
ize network requests during preloading
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 10/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/
/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 1/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 2 passed (40)
      Tests 81 passed (272)
   Start at 10:15:54
   Duration 3.41s
 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (14 tests) 86ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should pl
lay sounds with minimal latency
Preloaded 10 sounds

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > prog
gress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
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
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > prog
gress tracking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.t
ts:357:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3     

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
Failed to initialize audio: Error: Initialization failed
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:87:23
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1787:3)

stderr | src/tests/audio-context.test.tsx > AudioContext > should 
 handle initialization errors
Failed to initialize audio: Error: Initialization failed
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:87
7:23
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1787:3)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
 ✓ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts (20 tests) 103ms
 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 716ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
stderr | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/tests/audio/context/audio-context-debug-panel.test.tsx > AudioContext Debug Panel State Management > localStorage persi
istence > should handle corrupted localStorage data gracefully     
Failed to load audio settings: SyntaxError: Unexpected token 'i', 
 "invalid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\contex
xt\audio-context.tsx:67:27)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\au
udio-context.tsx:122:15)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\no
ode_modules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react
t-dom\cjs\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modul
les\react-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\c
cjs\react-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\rea
act-dom\cjs\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\rea
act-dom\cjs\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-do
om\cjs\react-dom-client.development.js:14956:41)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
Failed to initialize audio: String error

stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
Failed to initialize audio: String error


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Asset loading complete: 10/10 loaded, 0 failed

 ✓ src/tests/audio-context.test.tsx (7 tests) 231ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Preloaded 10 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 13/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 148 passed (272)
   Start at 10:15:54
   Duration 3.73s
ode (vitest 12)ode (vitest 14) ✓ src/tests/audio/context/audio-context-debug-panel.test.tsx (15 tests) 259ms
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
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
Asset loading complete: 10/10 loaded, 0 failed

 ✓ src/tests/GameState-sound-integration.test.ts (9 tests) 347ms  
 ✓ src/tests/game-state-sound-transitions.test.ts (7 tests) 342ms 
stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Sound Playback Performance > should ha
andle concurrent sound playback efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should manage mem
mory efficiently during intensive use
Preloaded 10 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 9 passed (40)
      Tests 164 passed (272)
   Start at 10:15:54
   Duration 3.94s
ode (vitest 10)ode (vitest 9)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
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
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Memory Performance > should prevent me
emory leaks during long-running sessions
Preloaded 10 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s


















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
    at processTimers (node:internal/timers:529:7) ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s


















stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
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
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
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
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
                                                                  
                                                                  
                                                                  
                                                                  
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
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 166 passed (272)
   Start at 10:15:54
   Duration 4.26s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should hand
dle sound event emission efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > WebAudioManager with Comprehensive Mocks > should 
 handle audio decoding with mocked decodeAudioData
Preloaded 10 sounds


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
                                                                  
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle mocked audio context errors gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:565:27)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:568:33
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should create audio elements for each sound
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should create audio elements for each sound
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > HTML5AudioManager with Comprehensive Mocks > shoul
ld handle audio loading events
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > HTML5AudioManager with Comprehensive Mocks > shoul
ld handle audio loading events
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > HTML5AudioManager with Comprehensive Mocks > shoul
ld handle audio playback with mocked play method
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > HTML5AudioManager with Comprehensive Mocks > shoul
ld handle audio playback with mocked play method
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network
k error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Net
twork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network
k error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Netwo
ork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error      
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error
r: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Err
ror: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network erro    r
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: N
Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1224ms   
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should retry failed sound loads  1016ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Event System Performance > should main
ntain performance under event system stress
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s


















stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/1
15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20
0/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
Preloaded 10 sounds


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 10 passed (40)
      Tests 190 passed (272)
   Start at 10:15:54
   Duration 4.56s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should cleanup r
resources efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 10:15:54
   Duration 4.79s
ode (vitest 6)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 10:15:54
   Duration 5.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Cleanup Performance > should handle cl
leanup of multiple managers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Regression Detection > sho
ould maintain consistent performance across operations
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound PLAYER_WALK: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3                                                                 
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined                                                              


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3                                                             
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined                                                          


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3                                                                 
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined                                                              


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound COLLISION_THUD: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3                                                               
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined                                                            


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound DEATH_SOUND: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3                                                        
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                     


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3:
: TypeError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound VICTORY_SOUND: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3                                                                 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                      
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
                                                                  
 ❯ src/audio/__tests__/error-handling.test.ts 23/23               
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations             
Preloaded 10 sounds                                               
                                                                  
                                                                  
 ❯ src/audio/__tests__/error-handling.test.ts 23/23               
 ❯ src/tests/audio-manager.test.ts 4/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/sound-system-e2e.test.ts 0/17                        
 ❯ src/tests/sound-system-performance.test.ts 16/20               

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3                                                            
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined                                                         


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: T
TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3                                                           
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined                                                        


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should preload sounds successfully
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Asset loading complete: 0/10 loaded, 10 failed                    
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                     
Preloaded 0 sounds                                                
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
Initialized gain node pool with 5 nodes                           
Web Audio API initialized successfully                            
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 10:15:54
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: N
Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3                                                                
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined                                                              
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined                                                          
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined                                                             
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined                                                              
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined                                                            
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                     
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3:
: TypeError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                   
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: T
TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined                                                         
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: T
TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined                                                        
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete player movement workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
Asset loading complete: 0/10 loaded, 10 failed                    
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
Preloaded 0 sounds                                                
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context state changed to: closed


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                       
Audio context closed unexpectedly                                 
Audio context closed unexpectedly, attempting to reinitialize     
                                                                  
(node:57216) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.          
(Use `node --trace-deprecation ...` to show where the warning was created)                                                          
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
Initialized gain node pool with 5 nodes                           
Web Audio API initialized successfully                            
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3                                                                
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should provide performance metrics for monitoring
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined                                                              
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined                                                          
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined                                                             
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined                                                              
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined                                                            
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                     
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                   
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined                                                         
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)                 
    at processTimers (node:internal/timers:529:7)                 
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
                                                                  

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring                  
Asset loading complete: 10/10 loaded, 0 failed                    
                                                                  
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring                  
Preloaded 10 sounds                                               
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 10 passed (40)
      Tests 197 passed (272)
   Start at 10:15:54
   Duration 5.37s
(node:27116) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                          
Initialized gain node pool with 5 nodes                           
Web Audio API initialized successfully                            
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3                                                                
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK     
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performan
nce Tests for Audio System > Performance Monitoring and Metrics > s
should track performance trends over time
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                           
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                             
    at listOnTimeout (node:internal/timers:594:17)                
    at processTimers (node:internal/timers:529:7)                 
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                             
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network
k error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Net
twork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network
k error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Netwo
ork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error      
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error
r: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Err
ror: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: N
Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3                                                                
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3                                                                 
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3                                                                
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3                                                                 
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3                                                               
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: N
Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
 ✓ src/tests/sound-system-performance.test.ts (20 tests) 2363ms
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently  394ms ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
Failed to load sound DEATH_SOUND: Error: Network error            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3                                                        
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3:
: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3                                                                 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                      
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3                                                            
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3                                                           
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > enhanced preloading > should ha
andle loading failures gracefully
Failed to load sound BOMB_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queue
es:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode                                    
Audio manager in fallback mode, skipping preload                  
                                                                  
                                                                  
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47              
 ❯ src/tests/physics-integration-demo.test.ts [queued]            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
 ❯ src/tests/sound-system-performance.test.ts 20/20               

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                      
Initialized gain node pool with 5 nodes                           
Web Audio API initialized successfully                            
                                                                  
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                      
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > optimization reporting > should
d provide optimization report
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 1/47
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 11 passed (40)
      Tests 200 passed (319)
   Start at 10:15:54
   Duration 5.61s
 ✓ src/tests/enhanced-boulder-collision.test.ts (47 tests) 37ms   
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should handle empty buffer set
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > shou
uld track loading state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > loading state management > shou
uld track loading state correctly
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > loading state management > shou
uld track loading state correctly
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/physics-integration-demo.test.ts > Physics Inte
egration Demo > should demonstrate boulder falling with sound event
ts
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (
(3,3)
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event    

stdout | src/tests/physics-integration-demo.test.ts > Physics Inte
egration Demo > should demonstrate boulder collision with sound eve
ents
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated  

stdout | src/tests/physics-integration-demo.test.ts > Physics Inte
egration Demo > should demonstrate game integration with physics an
nd sound
Game integration test:
Player moves right to trigger boulder, then moves again to make bo
oulder fall
Initial state:
Player position: { x: 1, y: 1 }
Moves: 55
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: false,
      isMoving: false,
      triggeredOnMove: -1
    }
  ]
]
After move 1 (trigger):
Player position: { x: 2, y: 1 }
Moves: 54
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 54
    }
  ]
]
After move 2 (boulder falls):
Player position: { x: 3, y: 1 }
Moves: 53
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 54
    }
  ]
]


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/physics-integration-demo.test.ts 1/4
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 12 passed (40)
      Tests 249 passed (323)
   Start at 10:15:54
   Duration 5.86s
ode (vitest 5) ❯ src/tests/physics-integration-demo.test.ts (4 tests | 1 failed) 41ms
   ✓ Physics Integration Demo > should demonstrate boulder falling with sound events 11ms
   ✓ Physics Integration Demo > should demonstrate boulder collision with sound events 3ms
   × Physics Integration Demo > should demonstrate game integration with physics and sound 24ms
     → expected 'boulder' to be 'empty' // Object.is equality     
   · Physics Integration Demo > should demonstrate multiple boulder physics
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > error recovery > should retry f
failed loads
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > error recovery > should retry f
failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.m
mp3
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 
 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK    
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed (40)
      Tests 1 failed | 252 passed (323)
   Start at 10:15:54
   Duration 5.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:226:44                                                
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-mana
ager.test.ts:226:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed (40)
      Tests 1 failed | 252 passed (323)
   Start at 10:15:54
   Duration 5.98s
ode (vitest 13)(node:57512) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:58232) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:69380) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:14604) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.ode (vitest 15)
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:29524) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)
(node:57748) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was 
 created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed (40)
      Tests 1 failed | 253 passed (323)
   Start at 10:15:54
   Duration 6.08s
(node:44352) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3                                                                
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3                                                                 
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3                                                             
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3                                                                
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3                                                                 
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3                                                               
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3                                                        
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3                                                                 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                      
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3                                                            
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3                                                           
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 1 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.19s
 ↓ src/tests/boulder-state-manager.test.ts (40 tests)             
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-state-manager.test.ts 40/40                  
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 0/10                               
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                        
                                                                  
 Test Files 1 failed | 12 passed | 1 skipped (40)                 
      Tests 1 failed | 253 passed (373)                           
   Start at 10:15:54                                              
   Duration 6.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

 ↓ src/tests/GameState.test.ts (10 tests)
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined                                                              
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined                                                          
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined                                                             
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined                                                            
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                     
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                   
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined                                                         
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts [queued]                
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36             
 ❯ src/tests/GameState.test.ts 10/10                              
 ❯ src/tests/LargerMaze.test.ts [queued]                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
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


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                 
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104                                                           
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
[AssetLoader] Attempting to load: /sounds/player/walk.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3                                                                
                                                                  
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                           
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                             
    at listOnTimeout (node:internal/timers:594:17)                
    at processTimers (node:internal/timers:529:7)                 
                                                                  
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network error                                                       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound PLAYER_WALK: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network
k error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound PLAYER_DIG: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Net
twork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error
r: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound BOULDER_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Net
twork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound ARROW_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network
k error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: 
 Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound COLLISION_THUD: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Netwo
ork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: N
Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound DEATH_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error
r: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3:
: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound VICTORY_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Err
ror: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: E
Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound DOOR_SLAM: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: E
Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound DIAMOND_COLLECT: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: N
Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error
r: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehens
sive Sound System Test Suite > 3. Mock Implementations for Web Audi
io API Testing > Mock Error Scenarios > should handle mocked networ
rk failures during preloading
Failed to load sound BOMB_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\compr
rehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
Asset loading complete: 0/10 loaded, 10 failed                    
                                                                  
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading                                      
Preloaded 0 sounds                                                
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 12 passed | 2 skipped (40)
      Tests 1 failed | 253 passed (373)
   Start at 10:15:54
   Duration 6.42s
ode (vitest 12)ode (vitest 14)(node:46288) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 13 passed | 4 skipped (40)
      Tests 1 failed | 254 passed (408)
   Start at 10:15:54
   Duration 6.73s
 ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 3266ms 
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData  1068ms                                                            
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  2035ms               
 ↓ src/tests/LargerMaze.test.ts (8 tests)                         
 ↓ src/tests/boulder-audio-events.test.ts (18 tests)              
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]              
 ❯ src/tests/audio-hooks.test.tsx [queued]                        
 ❯ src/tests/audio-manager.test.ts 5/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 0/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 13 passed | 4 skipped (40)
      Tests 1 failed | 254 passed (408)
   Start at 10:15:54
   Duration 6.73s
ode (vitest 1)ode (vitest 7)ode (vitest 11)ode (vitest 6)ode (vitest 9) ↓ src/tests/boulder-audio-mute-integration.test.ts (9 tests)     
 ↓ src/tests/audio-hooks.test.tsx (16 tests)
 ↓ src/tests/app-sound-integration.test.tsx (21 tests)
 ↓ src/tests/app-sound-integration-comprehensive.test.tsx (20 tests)
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK        ode (vitest 8)
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > error recovery > should retry f
failed loads
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced
d Audio Manager > WebAudioManager > error recovery > should retry f
failed loads
Preloaded 10 sounds

ode (vitest 10)
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 13 passed | 8 skipped (40)
      Tests 1 failed | 255 passed (465)
   Start at 10:15:54
   Duration 6.94s
ode (vitest 4) ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 3917ms
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully  2071ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads  1097ms
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/player/dig.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3                                                                 
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3                                                             
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3         
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3                                                                
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3          
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3                                                                 
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3                                                               
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: N
Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3                                                        
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3:
: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3                                                                 
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                      
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3                                                            
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/            
[AssetLoader] Base URL: http://localhost:3000                     
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3                                                           
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41                                                               
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                      
    at new Promise (<anonymous>)                                  
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                     
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                            
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudi
ioManager > should handle preload errors gracefully
Failed to load sound BOMB_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222
2:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_module
es/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
Asset loading complete: 0/10 loaded, 10 failed                    
                                                                  
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                
Preloaded 0 sounds                                                
                                                                  
                                                                  
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 20/20   
 ❯ src/tests/app-sound-integration.test.tsx 21/21                 
 ❯ src/tests/audio-hooks.test.tsx 16/16                           
 ❯ src/tests/audio-manager.test.ts 6/27                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23           
 ❯ src/tests/boulder-audio-events.test.ts 18/18                   
 ❯ src/tests/boulder-audio-mute-integration.test.ts 9/9           
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36             
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed | 8 skipped (40)
      Tests 1 failed | 256 passed (465)
   Start at 10:15:54
   Duration 7.15s
 ✓ src/tests/audio-manager.test.ts (27 tests) 4124ms
   ✓ Audio Manager > WebAudioManager > should preload sounds successfully  2074ms
   ✓ Audio Manager > WebAudioManager > should handle preload errors gracefully  2029ms
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3      
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoos
sh.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp
p3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.
.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/v
victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp
p3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/d
door-slam.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/colle
ect.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/b
bomb.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined unde
efined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undef
fined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined u
undefined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined unde
efined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undef
fined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined und
defined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefi
ined undefined


stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3:
: TypeError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: unde
efined undefined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Typ
peError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: T
TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined 
 undefined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: T
TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)      
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined
d
 undefined

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:
:175:104

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Audio context state changed to: closed
Audio context state changed to: closed

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests 
 for Complete Sound Workflows > Complete Game Sound Workflow > shou
uld handle complete game state transition workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize     
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize     

 ✓ src/tests/sound-system-e2e.test.ts (17 tests) 4226ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete G
Game Sound Workflow > should handle complete player movement workfl
low  2145ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete G
Game Sound Workflow > should handle complete game state transition 
 workflow  2078ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 FAIL  src/tests/physics-integration-demo.test.ts > Physics Integr
ration Demo > should demonstrate game integration with physics and 
 sound
AssertionError: expected 'boulder' to be 'empty' // Object.is equa
ality

Expected: "empty"
Received: "boulder"

 ❯ src/tests/physics-integration-demo.test.ts:119:49
    117|
    118|         // Verify boulder fell due to physics simulation 
    119|Xexpect(gameStateAfterMove2.maze[2]![2]).toBe(CEL…
       |X^        
    120|Xexpect(gameStateAfterMove2.maze[3]![2]).toBe(CEL…
    121|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯



 Test Files  1 failed | 16 passed | 8 skipped (40)
      Tests  1 failed | 257 passed (465)
   Start at  10:15:54
   Duration  7.43s (transform 3.22s, setup 7.35s, collect 9.01s, t
tests 21.42s, environment 40.82s, prepare 7.88s)

ode (vitest 3)ode (vitest 2):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run a more focused test to check if the boulder state manager tests still pass:

Command
npm test -- --run src/tests/boulder-state-manager.test.ts
npm test -- --run src/tests/boulder-state-
-manager.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/boulder-state-manager.test.tspm test --run src/tests/boulder-state-manager.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 --run src/tests/boulder-
-state-manager.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 5)ode (vitest 8)ode (vitest 9)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 10:16:19
   Duration 909ms
(node:40996) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/boulder-state-manager.test.ts 0/40

 Test Files 0 passed (1)
      Tests 0 passed (40)
   Start at 10:16:19
   Duration 1.22s
 ❯ src/tests/boulder-state-manager.test.ts (40 tests | 1 failed) 28ms
   ✓ Boulder State Manager > Position utilities > should create position key correctly 2ms
   ✓ Boulder State Manager > Position utilities > should parse position key correctly 1ms
   ✓ Boulder State Manager > Position utilities > should handle zero coordinates 0ms
   ✓ Boulder State Manager > Boulder position detection > should f
find all boulder positions in maze 2ms
   ✓ Boulder State Manager > Boulder position detection > should r
return empty array for maze with no boulders 0ms
   ✓ Boulder State Manager > Boulder position detection > should h
handle empty maze 0ms
   ✓ Boulder State Manager > Boulder state manager creation > shou
uld create initial boulder state manager correctly 0ms
   ✓ Boulder State Manager > Boulder state manager creation > shou
uld handle maze with no boulders 0ms
   ✓ Boulder State Manager > Position adjacency detection > should
d detect orthogonal adjacency 0ms
   ✓ Boulder State Manager > Position adjacency detection > should
d detect diagonal adjacency 0ms
   ✓ Boulder State Manager > Position adjacency detection > should
d not detect non-adjacent positions 0ms
   ✓ Boulder State Manager > Position adjacency detection > should
d not consider same position as adjacent 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should d
detect boulders adjacent to player 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should r
return empty array when no boulders are adjacent 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should h
handle boundary edge cases correctly 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should h
handle all 8 adjacent positions correctly 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should h
handle negative coordinates correctly 0ms
   ✓ Boulder State Manager > Triggered boulder identification > sh
hould identify newly triggered boulders when player moves 0ms      
   ✓ Boulder State Manager > Triggered boulder identification > sh
hould not trigger boulders that were already adjacent 0ms
   ✓ Boulder State Manager > Triggered boulder identification > sh
hould trigger all adjacent boulders when no previous position 0ms  
   ✓ Boulder State Manager > Triggered boulder identification > sh
hould handle boundary edge cases for triggered boulder identificati
ion 0ms
   ✓ Boulder State Manager > Triggered boulder identification > sh
hould handle player movement across maze boundaries correctly 0ms  
   ✓ Boulder State Manager > Boulder trigger updates > should upda
ate boulder states when triggered 0ms
   ✓ Boulder State Manager > Boulder trigger updates > should not 
 re-trigger already triggered boulders 0ms
   ✓ Boulder State Manager > Boulder movement updates > should upd
date moving boulder states correctly 0ms
   ✓ Boulder State Manager > Boulder movement updates > should upd
date stopped boulder states correctly 0ms
   ✓ Boulder State Manager > Boulder movement updates > should not
t allow negative moving boulder count 0ms
   ✓ Boulder State Manager > Boulder position updates > should upd
date boulder positions correctly 1ms
   ✓ Boulder State Manager > Boulder position updates > should pre
eserve boulder state data when updating positions 0ms
   ✓ Boulder State Manager > Moving boulder detection > should det
tect when boulders are moving 0ms
   ✓ Boulder State Manager > Moving boulder detection > should det
tect when no boulders are moving 0ms
   × Boulder State Manager > Triggered boulders for move > should 
 return boulders triggered on previous move 10ms
     → expected [] to have a length of 2 but got +0
   · Boulder State Manager > Triggered boulders for move > should 
 not return boulders already moving
   · Boulder State Manager > Triggered boulders for move > should 
 not return boulders triggered on different moves
   · Boulder State Manager > Player position tracking > should upd
date player position correctly
   · Boulder State Manager > Player position tracking > should han
ndle null to position update
   · Boulder State Manager > Proximity result creation > should cr
reate proximity result with adjacent and newly triggered boulders  
   · Boulder State Manager > Proximity result creation > should ha
andle null previous position
   · Boulder State Manager > Movement constraint creation > should
d create constraint with no blocking when no boulders are moving   
   · Boulder State Manager > Movement constraint creation > should
d create constraint with blocking when boulders are moving

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/boulder-state-manager.test.ts > Boulder State Man
nager > Triggered boulders for move > should return boulders trigge
ered on previous move
AssertionError: expected [] to have a length of 2 but got +0      

- Expected
+ Received

- 2
+ 0

 ❯ src/tests/boulder-state-manager.test.ts:456:36
    454|X// Check for move 4 (countdown system: shoul…
    455|Xconst bouldersToMove = getTriggeredBouldersF…
    456|Xexpect(bouldersToMove).toHaveLength(2);      
       |X^
    457|Xexpect(bouldersToMove).toContainEqual({ x: 1…
    458|Xexpect(bouldersToMove).toContainEqual({ x: 1…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 31 passed (40)
   Start at  10:16:19
   Duration  1.38s (transform 99ms, setup 121ms, collect 76ms, tes
sts 28ms, environment 645ms, prepare 203ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.







Claude Sonnet 4.0
Autopilot
