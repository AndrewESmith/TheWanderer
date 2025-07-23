302| ...

270|

New Session (Continu...

183| ).r...

at Proxy.overwriting...

New Session





stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors

Failed to load sound DIAMOND_COLLECT: Error: Decode error

    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69

    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11

    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26

    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20

    at new Promise (<anonymous>)

    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)

    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)

    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

Kiro
Including Steering Documents

typescript-standards.md
I can see you're getting an error in your audio manager tests where the audio decoding is failing. Let me take a look at the test file to understand what's happening.

Read file(s)

audio-manager.test.ts
Now let me look at the specific line that's causing the error (line 429) and understand the context better:

Read file(s)

audio-manager.test.ts 420 - 441
I can see the issue. The test is designed to handle audio decoding errors, but the actual audio manager implementation is throwing an error that's not being caught properly. Let me check the actual audio manager implementation to see how it handles decoding errors:

Read file(s)

audio-manager.ts
Now I need to check the AssetLoader implementation to see where the actual error is being thrown:

Read file(s)

asset-loader.ts
Now I can see the issue! The problem is in the test setup. The test is mocking decodeAudioData to reject with an error, but the actual implementation in the AssetLoader is calling audioContext.decodeAudioData(arrayBuffer) and when it fails, it throws the error up through the promise chain. However, the test expects this error to be caught and handled gracefully.

Looking at the error message, it's happening at line 429 in the test, but the actual error is being thrown from the AssetLoader's loadAudioFile method when decodeAudioData fails.

The issue is that the test is expecting the preloadSounds() method to resolve without throwing, but the current implementation doesn't properly catch and handle decoding errors in all cases.

Let me fix the test by making the mock more realistic and ensuring the error handling works correctly:

Accepted edits to

audio-manager.test.ts


Now I need to also check if there are any issues with the actual audio manager implementation. The error suggests that the decoding error is not being properly caught. Let me check the sound config to see what sounds are being loaded:

Read file(s)

sound-config.ts
I can see that the error is specifically mentioning "DIAMOND_COLLECT" sound. The issue is that the test is trying to load actual sound files, but the mock is set up to fail the decoding. However, the error is being thrown from the AssetLoader and not being properly caught by the WebAudioManager.

Let me check if there's a better way to handle this in the WebAudioManager's preloadSounds method. The issue is that the AssetLoader is throwing errors that aren't being caught properly. Let me fix the WebAudioManager to handle these errors better:

Accepted edits to

audio-manager.ts


Now I need to also fix the AssetLoader to ensure it doesn't throw errors that bubble up and cause the test to fail. The AssetLoader's loadAssets method should handle individual sound failures gracefully:

Accepted edits to

asset-loader.ts


Now let's run the test to see if the error handling improvements fix the issue:

Command
npm test -- --run src/tests/audio-manager.test.ts
npm test -- --run src/tests/audio-manager.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audio-manager.test.tspm test --run src/tests/audio-manager.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/audio-manager.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 5)ode (vitest 6)ode (vitest 9)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:31:47
   Duration 927ms
(node:52420) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:31:47
   Duration 1.14s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Loading PLAYER_WALK: 100% (loaded)
Loading PLAYER_DIG: 100% (loaded)
Loading BOULDER_MOVE: 100% (loaded)
Loading ARROW_MOVE: 100% (loaded)
Loading COLLISION_THUD: 100% (loaded)
Loading DEATH_SOUND: 100% (loaded)
Loading VICTORY_SOUND: 100% (loaded)
Loading DOOR_SLAM: 100% (loaded)
Loading DIAMOND_COLLECT: 100% (loaded)

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:31:47
   Duration 1.25s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                                       
Failed to optimize sound PLAYER_WALK: TypeError: audioContext.createBuffer is not a function                                                                          
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)                                                     
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)                                                             
    at processTicksAndRejections (node:internal/process/task_queues:105:5)                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20                                                                         
Failed to optimize sound PLAYER_DIG: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound BOULDER_MOVE: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound ARROW_MOVE: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound COLLISION_THUD: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound DEATH_SOUND: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound VICTORY_SOUND: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound DOOR_SLAM: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
Failed to optimize sound DIAMOND_COLLECT: TypeError: audioContext.createBuffer is not a function
    at AudioOptimizer.normalizeAudioBuffer (D:\FizzBash\TheWanderer\src\audio\utils\audio-optimization.ts:259:47)
    at WebAudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:262:40)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:186:13
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:31:47
   Duration 1.25s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                                       
Optimization recommendations for PLAYER_WALK: [                                                                                                                       
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',                                                                                     
  'Convert to mono for game sound effects to reduce file size'                                                                                                        
]                                                                                                                                                                     
Optimization recommendations for PLAYER_DIG: [                                                                                                                        
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',                                                                                     
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for BOULDER_MOVE: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for ARROW_MOVE: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for COLLISION_THUD: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for DEATH_SOUND: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for VICTORY_SOUND: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for DOOR_SLAM: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for DIAMOND_COLLECT: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Preloading complete: 9/9 sounds loaded

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:31:47
   Duration 1.25s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:31:47
   Duration 1.25s

 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 2.01s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 2.97s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading VICTORY_SOUND: 50% (loading)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/door-slam.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 5/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 3.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 5/27

 Test Files 0 passed (1)
      Tests 5 passed (27)
   Start at 14:31:47
   Duration 5.02s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading COLLISION_THUD: 0% (failed)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:193:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle missing sound buffer gracefully
Sound buffer not found for ID: nonexistent_sound

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure
Failed to initialize audio context: Error: AudioContext creation failed
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:265:27)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:67:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:51:14)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:269:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio                                                
HTML5 Audio: Preloaded 9 sounds                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported            
Web Audio API not supported, using HTML5 Audio fallback                                                                                                               
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available           
No audio support detected, using silent mode                                                                                                                          
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
   at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 6/27

 Test Files 0 passed (1)
      Tests 6 passed (27)
   Start at 14:31:47
   Duration 5.35s

 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 6.00s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 6.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading VICTORY_SOUND: 50% (loading)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Retry 1/3 for sounds/environment/door-slam.ogg: Error: Network error                                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 8.04s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:31:47
   Duration 9.00s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load sound PLAYER_DIG: Error: Network error                                                                                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading COLLISION_THUD: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:406:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Retry 1/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found                                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Retry 1/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found                                                                                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: HTTP 404: Not Found                                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Retry 1/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/player/whaaa.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/victory.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/collect.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.43s

 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 9.97s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/whaaa.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/victory.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/collect.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 11.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: HTTP 404: Not Found                                                                                    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/walk.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: HTTP 404: Not Found                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/dig.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: HTTP 404: Not Found                                                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: HTTP 404: Not Found                                                                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/arrow/twang.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/environment/thud.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: HTTP 404: Not Found                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/whaaa.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading VICTORY_SOUND: 50% (loading)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: HTTP 404: Not Found                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/environment/victory.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/environment/door-slam.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: HTTP 404: Not Found                                                                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Retry 1/3 for sounds/environment/collect.ogg: Error: HTTP 404: Not Found                                                                                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 12.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/walk.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/dig.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/twang.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/thud.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/whaaa.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/victory.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/collect.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:31:47
   Duration 13.01s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: HTTP 404: Not Found                                                                                    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound PLAYER_WALK: Error: HTTP 404: Not Found                                                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound PLAYER_WALK: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: HTTP 404: Not Found                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound PLAYER_DIG: Error: HTTP 404: Not Found                                                                                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound PLAYER_DIG: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: HTTP 404: Not Found                                                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound BOULDER_MOVE: Error: HTTP 404: Not Found                                                                                                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound BOULDER_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: HTTP 404: Not Found                                                                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound ARROW_MOVE: Error: HTTP 404: Not Found                                                                                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound ARROW_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound COLLISION_THUD: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading COLLISION_THUD: 0% (failed)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load sound COLLISION_THUD: Error: HTTP 404: Not Found                                                                                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      

 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: HTTP 404: Not Found                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound DEATH_SOUND: Error: HTTP 404: Not Found                                                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound DEATH_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: HTTP 404: Not Found                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound VICTORY_SOUND: Error: HTTP 404: Not Found                                                                                                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound VICTORY_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound DOOR_SLAM: Error: HTTP 404: Not Found                                                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound DOOR_SLAM: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: HTTP 404: Not Found                                                                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Failed to load sound DIAMOND_COLLECT: Error: HTTP 404: Not Found                                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load sound DIAMOND_COLLECT: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Retry 1/3 for sounds/player/walk.mp3: Error: Decode error                                                                                                             
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/thud.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/whaaa.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/victory.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/collect.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.45s

 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 13.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/walk.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/dig.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/arrow/twang.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/thud.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/whaaa.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/victory.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/collect.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 15.07s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Decode error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/player/walk.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Decode error                                                                                             
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/player/dig.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Decode error                                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Decode error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/arrow/twang.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/thud.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Decode error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/player/whaaa.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading VICTORY_SOUND: 50% (loading)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Decode error                                                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/victory.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/door-slam.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Decode error                                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/collect.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 16.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/walk.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/dig.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/arrow/twang.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/thud.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/whaaa.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/victory.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/door-slam.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/collect.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:31:47
   Duration 17.03s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Decode error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Decode error                                                                                             
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Decode error                                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Decode error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading COLLISION_THUD: 0% (failed)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Decode error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Decode error                                                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Decode error                                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:429:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:31:47
   Duration 17.36s
 ✓ src/tests/audio-manager.test.ts (27 tests) 16196ms
   ✓ Audio Manager > WebAudioManager > should initialize with Web Audio API support 2ms
   ✓ Audio Manager > WebAudioManager > should handle muted state correctly 2ms
   ✓ Audio Manager > WebAudioManager > should load muted preference from localStorage 0ms
   ✓ Audio Manager > WebAudioManager > should handle localStorage errors gracefully 0ms
   ✓ Audio Manager > WebAudioManager > should preload sounds successfully 12ms
   ✓ Audio Manager > WebAudioManager > should handle preload errors gracefully  4036ms
   ✓ Audio Manager > WebAudioManager > should play sound with default options 1ms
   ✓ Audio Manager > WebAudioManager > should play sound with custom options 0ms
   ✓ Audio Manager > WebAudioManager > should not play sound when muted 0ms
   ✓ Audio Manager > WebAudioManager > should handle missing sound buffer gracefully 0ms
   ✓ Audio Manager > WebAudioManager > should cleanup resources properly 0ms
   ✓ Audio Manager > WebAudioManager > should handle audio context creation failure 1ms
   ✓ Audio Manager > HTML5AudioManager > should initialize with HTML5 Audio support 0ms
   ✓ Audio Manager > HTML5AudioManager > should handle muted state correctly 0ms
   ✓ Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio 9ms
   ✓ Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio 0ms
   ✓ Audio Manager > HTML5AudioManager > should not play sound when muted 0ms
   ✓ Audio Manager > HTML5AudioManager > should cleanup audio elements 0ms
   ✓ Audio Manager > SilentAudioManager > should initialize in silent mode 0ms
   ✓ Audio Manager > SilentAudioManager > should handle all operations silently 0ms
   ✓ Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported 0ms
   ✓ Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported 0ms
   ✓ Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available 0ms
   ✓ Audio Manager > Error Handling > should handle fetch errors during preloading  4038ms
   ✓ Audio Manager > Error Handling > should handle HTTP errors during preloading  4048ms
   ✓ Audio Manager > Error Handling > should handle audio decoding errors  4038ms
   ✓ Audio Manager > Error Handling > should handle playback errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  27 passed (27)
   Start at  14:31:47
   Duration  17.48s (transform 95ms, setup 26ms, collect 75ms, tests 16.20s, environment 602ms, prepare 228ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Great! The tests are now passing. The error handling improvements I made have fixed the issue. Let me also need to fix the MockAudioContext to include the missing createBuffer method that the AudioOptimizer is trying to use:

Accepted edits to

audio-manager.test.ts


Now let's run the tests one more time to make sure everything is working correctly:

Command
npm test -- --run src/tests/audio-manager.test.ts
npm test -- --run src/tests/audio-manager.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audio-manager.test.tspm test --run src/tests/audio-manager.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/audio-manager.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 7)ode (vitest 5)ode (vitest 9)ode (vitest 12)ode (vitest 14)ode (vitest 15)
 ❯ src/tests/audio-manager.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:32:45
   Duration 893ms
(node:54132) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 1.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Loading PLAYER_WALK: 100% (loaded)
Loading PLAYER_DIG: 100% (loaded)
Loading BOULDER_MOVE: 100% (loaded)
Loading ARROW_MOVE: 100% (loaded)
Loading COLLISION_THUD: 100% (loaded)
Loading DEATH_SOUND: 100% (loaded)
Loading VICTORY_SOUND: 100% (loaded)
Loading DOOR_SLAM: 100% (loaded)
Loading DIAMOND_COLLECT: 100% (loaded)

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Optimization recommendations for PLAYER_WALK: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for PLAYER_DIG: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for BOULDER_MOVE: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for ARROW_MOVE: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for COLLISION_THUD: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for DEATH_SOUND: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for VICTORY_SOUND: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for DOOR_SLAM: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Optimization recommendations for DIAMOND_COLLECT: [
  'Consider reducing sample rate from 44100Hz to 22050Hz for better performance',
  'Convert to mono for game sound effects to reduce file size'
]
Preloading complete: 9/9 sounds loaded

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 1.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 1.94s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.01s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading VICTORY_SOUND: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/door-slam.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 0/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 3.98s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:32:45
   Duration 4.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading COLLISION_THUD: 0% (failed)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27                                                                                                                               
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:209:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                  
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 1/27

 Test Files 0 passed (1)
      Tests 1 passed (27)
   Start at 14:32:45
   Duration 5.06s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle missing sound buffer gracefully
Sound buffer not found for ID: nonexistent_sound

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure
Failed to initialize audio context: Error: AudioContext creation failed
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:281:27)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:67:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:51:14)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:285:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 5.93s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio                                                
HTML5 Audio: Preloaded 9 sounds                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 5.93s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported            
Web Audio API not supported, using HTML5 Audio fallback                                                                                                               
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available           
No audio support detected, using silent mode                                                                                                                          
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 5.93s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 5.93s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 5.93s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.01s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Network error                                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading VICTORY_SOUND: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Retry 1/3 for sounds/environment/door-slam.ogg: Error: Network error                                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 23/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 7.99s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/dig.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/twang.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/thud.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/victory.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/collect.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27

 Test Files 0 passed (1)
      Tests 23 passed (27)
   Start at 14:32:45
   Duration 8.96s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Network error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Network error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Network error                                                                                      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Network error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading COLLISION_THUD: 0% (failed)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Network error                                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Network error                                                                                  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Network error                                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:422:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                              
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Retry 1/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found                                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Retry 1/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found                                                                                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: HTTP 404: Not Found                                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Retry 1/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/player/whaaa.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/victory.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/collect.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 9.28s

 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 10.03s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/whaaa.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/victory.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/collect.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 10.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: HTTP 404: Not Found                                                                                    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/walk.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: HTTP 404: Not Found                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/dig.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: HTTP 404: Not Found                                                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: HTTP 404: Not Found                                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: HTTP 404: Not Found                                                                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/arrow/twang.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/environment/thud.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: HTTP 404: Not Found                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/whaaa.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading VICTORY_SOUND: 50% (loading)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: HTTP 404: Not Found                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/environment/victory.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DOOR_SLAM: 50% (loading)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 24/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/environment/door-slam.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Loading DIAMOND_COLLECT: 50% (loading) ❯ src/tests/audio-manager.test.ts 24/27 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: HTTP 404: Not Found                                                                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Retry 1/3 for sounds/environment/collect.ogg: Error: HTTP 404: Not Found                                                                                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 11.95s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/walk.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/dig.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/twang.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/thud.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/whaaa.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/victory.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/collect.ogg: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 24/27

 Test Files 0 passed (1)
      Tests 24 passed (27)
   Start at 14:32:45
   Duration 13.04s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: HTTP 404: Not Found                                                                                    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound PLAYER_WALK: Error: HTTP 404: Not Found                                                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound PLAYER_WALK: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: HTTP 404: Not Found                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound PLAYER_DIG: Error: HTTP 404: Not Found                                                                                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound PLAYER_DIG: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: HTTP 404: Not Found                                                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound BOULDER_MOVE: Error: HTTP 404: Not Found                                                                                                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound BOULDER_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: HTTP 404: Not Found                                                                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound ARROW_MOVE: Error: HTTP 404: Not Found                                                                                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound ARROW_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading COLLISION_THUD: 0% (failed)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound COLLISION_THUD: Error: HTTP 404: Not Found                                                                                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound COLLISION_THUD: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: HTTP 404: Not Found                                                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound DEATH_SOUND: Error: HTTP 404: Not Found                                                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound DEATH_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: HTTP 404: Not Found                                                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound VICTORY_SOUND: Error: HTTP 404: Not Found                                                                                                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound VICTORY_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: HTTP 404: Not Found                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
    at runNextTicks (node:internal/process/task_queues:65:5)                                                                                                          
    at listOnTimeout (node:internal/timers:555:9)                                                                                                                     
    at processTimers (node:internal/timers:529:7)                                                                                                                     
Failed to load sound DOOR_SLAM: Error: HTTP 404: Not Found                                                                                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound DOOR_SLAM: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Loading DIAMOND_COLLECT: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: HTTP 404: Not Found                                                                        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
Failed to load sound DIAMOND_COLLECT: Error: HTTP 404: Not Found                                                                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                                                                                              
                                                                                                                                                                      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load sound DIAMOND_COLLECT: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                               
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_WALK: 0% (loading)                                                                                                                                     
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading PLAYER_DIG: 0% (loading)                                                                                                                                      
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading BOULDER_MOVE: 0% (loading)                                                                                                                                    
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (loading)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Retry 1/3 for sounds/player/walk.mp3: Error: Decode error                                                                                                             
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/whoosh.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/thud.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/whaaa.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/victory.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/collect.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 13.36s

 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 14.01s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/walk.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/dig.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/boulder/whoosh.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/arrow/twang.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/thud.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/whaaa.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/victory.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/collect.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 14.99s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Decode error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/player/walk.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading PLAYER_DIG: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Decode error                                                                                             
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/player/dig.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading BOULDER_MOVE: 50% (loading)                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Retry 1/3 for sounds/boulder/whoosh.ogg: Error: Decode error                                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading ARROW_MOVE: 50% (loading)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Decode error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/arrow/twang.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading COLLISION_THUD: 50% (loading)                                                                                                                                 
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/thud.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DEATH_SOUND: 50% (loading)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Decode error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/player/whaaa.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading VICTORY_SOUND: 50% (loading)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Decode error                                                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/victory.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading DOOR_SLAM: 50% (loading)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/door-slam.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DIAMOND_COLLECT: 50% (loading)                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 25/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Decode error                                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 1/3 for sounds/environment/collect.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 16.05s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/walk.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/dig.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/boulder/whoosh.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/arrow/twang.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/thud.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/player/whaaa.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/victory.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/door-slam.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Retry 2/3 for sounds/environment/collect.ogg: Error: Decode error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 0 passed (1)
      Tests 25 passed (27)
   Start at 14:32:45
   Duration 17.02s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Decode error                                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading PLAYER_DIG: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Decode error                                                                                             
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading BOULDER_MOVE: 0% (failed)                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Decode error                                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading ARROW_MOVE: 0% (failed)                                                                                                                                       
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Decode error                                                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading COLLISION_THUD: 0% (failed)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DEATH_SOUND: 0% (failed)                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Decode error                                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading VICTORY_SOUND: 0% (failed)                                                                                                                                    
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Decode error                                                                                 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DOOR_SLAM: 0% (failed)                                                                                                                                        
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Decode error                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Loading DIAMOND_COLLECT: 0% (failed)                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27                                                                                                                              
                                                                                                                                                                      
 Test Files 0 passed (1)                                                                                                                                              
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Decode error                                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:445:69                                                                                                 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                                        
    at new Promise (<anonymous>)                                                                                                                                      
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Asset loading complete: 0/9 loaded, 9 failed                                                                                                                          
                                                                                                                                                                      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Preloading complete: 0/9 sounds loaded                                                                                                                                
                                                                                                                                                                      
                                                                                                                                                                      
 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors                                                       
Failed to load sounds: [                                                                                                                                              
  'PLAYER_WALK',                                                                                                                                                      
  'PLAYER_DIG',                                                                                                                                                       
  'BOULDER_MOVE',                                                                                                                                                     
  'ARROW_MOVE',                                                                                                                                                       
  'COLLISION_THUD',                                                                                                                                                   
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 0 passed (1)
      Tests 26 passed (27)
   Start at 14:32:45
   Duration 17.24s
 ✓ src/tests/audio-manager.test.ts (27 tests) 16184ms
   ✓ Audio Manager > WebAudioManager > should initialize with Web Audio API support 2ms
   ✓ Audio Manager > WebAudioManager > should handle muted state correctly 2ms
   ✓ Audio Manager > WebAudioManager > should load muted preference from localStorage 0ms
   ✓ Audio Manager > WebAudioManager > should handle localStorage errors gracefully 0ms
   ✓ Audio Manager > WebAudioManager > should preload sounds successfully 10ms
   ✓ Audio Manager > WebAudioManager > should handle preload errors gracefully  4036ms
   ✓ Audio Manager > WebAudioManager > should play sound with default options 2ms
   ✓ Audio Manager > WebAudioManager > should play sound with custom options 1ms
   ✓ Audio Manager > WebAudioManager > should not play sound when muted 1ms
   ✓ Audio Manager > WebAudioManager > should handle missing sound buffer gracefully 1ms
   ✓ Audio Manager > WebAudioManager > should cleanup resources properly 1ms
   ✓ Audio Manager > WebAudioManager > should handle audio context creation failure 1ms
   ✓ Audio Manager > HTML5AudioManager > should initialize with HTML5 Audio support 1ms
   ✓ Audio Manager > HTML5AudioManager > should handle muted state correctly 1ms
   ✓ Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio 5ms
   ✓ Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio 0ms
   ✓ Audio Manager > HTML5AudioManager > should not play sound when muted 1ms
   ✓ Audio Manager > HTML5AudioManager > should cleanup audio elements 0ms
   ✓ Audio Manager > SilentAudioManager > should initialize in silent mode 0ms
   ✓ Audio Manager > SilentAudioManager > should handle all operations silently 1ms
   ✓ Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported 1ms
   ✓ Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported 0ms
   ✓ Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available 0ms
   ✓ Audio Manager > Error Handling > should handle fetch errors during preloading  4051ms
   ✓ Audio Manager > Error Handling > should handle HTTP errors during preloading  4035ms
   ✓ Audio Manager > Error Handling > should handle audio decoding errors  4028ms
   ✓ Audio Manager > Error Handling > should handle playback errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  27 passed (27)
   Start at  14:32:45
   Duration  17.36s (transform 101ms, setup 27ms, collect 88ms, tests 16.18s, environment 570ms, prepare 156ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run just the specific test that was failing to see if it's fixed:

Command
npm test -- --run src/tests/audio-manager.test.ts -t "should handle audio decoding errors"
npm test -- --run src/tests/audio-manager.test.ts -t "should handle audio decoding errors"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audio-manager.test.ts -t "should handle audio decoding errors"pm test --run src/tests/audio-manager.test.ts -t should handle audio decoding errors
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/audio-manager.test.ts -t should handle audio decoding errors

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 4)ode (vitest 6)ode (vitest 5)ode (vitest 7)ode (vitest 9)ode (vitest 10)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:33:20
   Duration 958ms
(node:37444) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio-manager.test.ts 0/27

 Test Files 0 passed (1)
      Tests 0 passed (27)
   Start at 14:33:20
   Duration 1.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (failed)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (failed)
Loading BOULDER_MOVE: 0% (loading)
Loading BOULDER_MOVE: 0% (failed)
Loading ARROW_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (failed)
Loading COLLISION_THUD: 0% (loading)
Loading COLLISION_THUD: 0% (failed)
Loading DEATH_SOUND: 0% (loading)
Loading DEATH_SOUND: 0% (failed)
Loading VICTORY_SOUND: 0% (loading)
Loading VICTORY_SOUND: 0% (failed)
Loading DOOR_SLAM: 0% (loading)
Loading DOOR_SLAM: 0% (failed)
Loading DIAMOND_COLLECT: 0% (loading)
Loading DIAMOND_COLLECT: 0% (failed)

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Asset loading complete: 0/9 loaded, 9 failed

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Failed to load sounds: [
  'PLAYER_WALK',
  'PLAYER_DIG',
  'BOULDER_MOVE',
  'ARROW_MOVE',
  'COLLISION_THUD',
  'DEATH_SOUND',
  'VICTORY_SOUND',
  'DOOR_SLAM',
  'DIAMOND_COLLECT'
]

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors
Preloading complete: 0/9 sounds loaded

 ✓ src/tests/audio-manager.test.ts (27 tests | 26 skipped) 14ms
   ↓ Audio Manager > WebAudioManager > should initialize with Web Audio API support
   ↓ Audio Manager > WebAudioManager > should handle muted state correctly
   ↓ Audio Manager > WebAudioManager > should load muted preference from localStorage
   ↓ Audio Manager > WebAudioManager > should handle localStorage errors gracefully
   ↓ Audio Manager > WebAudioManager > should preload sounds successfully
   ↓ Audio Manager > WebAudioManager > should handle preload errors gracefully
   ↓ Audio Manager > WebAudioManager > should play sound with default options
   ↓ Audio Manager > WebAudioManager > should play sound with custom options
   ↓ Audio Manager > WebAudioManager > should not play sound when muted
   ↓ Audio Manager > WebAudioManager > should handle missing sound buffer gracefully
   ↓ Audio Manager > WebAudioManager > should cleanup resources properly
   ↓ Audio Manager > WebAudioManager > should handle audio context creation failure
   ↓ Audio Manager > HTML5AudioManager > should initialize with HTML5 Audio support
   ↓ Audio Manager > HTML5AudioManager > should handle muted state correctly
   ↓ Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio
   ↓ Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio
   ↓ Audio Manager > HTML5AudioManager > should not play sound when muted
   ↓ Audio Manager > HTML5AudioManager > should cleanup audio elements
   ↓ Audio Manager > SilentAudioManager > should initialize in silent mode
   ↓ Audio Manager > SilentAudioManager > should handle all operations silently
   ↓ Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported
   ↓ Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
   ↓ Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available
   ↓ Audio Manager > Error Handling > should handle fetch errors during preloading
   ↓ Audio Manager > Error Handling > should handle HTTP errors during preloading
   ✓ Audio Manager > Error Handling > should handle audio decoding errors 12ms
   ↓ Audio Manager > Error Handling > should handle playback errors gracefully

 Test Files  1 passed (1)
      Tests  1 passed | 26 skipped (27)
   Start at  14:33:20
   Duration  1.23s (transform 109ms, setup 30ms, collect 90ms, tests 14ms, environment 592ms, prepare 180ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


audio-manager.test.ts

audio-manager.ts

asset-loader.ts






Claude Sonnet 4.0
Autopilot
