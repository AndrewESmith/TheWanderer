New Session





This test npm test -- src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads" is failing with the following details:

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads

ed 9 times, but got 24 times

 ❯ src/tests/audio/enhanced-audio-manager.test.ts:230:35

    228|                 // Note: With URL caching, duplicate URLs (VICTORY…    229|                 // So we expect 8 unique URLs + 1 retry = 9 total …    230|                 expect(mockFetch).toHaveBeenCalledTimes(9); // 8 u…       |                                   ^

    231|             });

    232|

Kiro
Including Steering Documents

typescript-standards.md
I need to look at the failing test to understand what's happening with the fetch call count. Let me examine the test file first.

Read file(s)

enhanced-audio-manager.test.ts 220 - 241
Let me see more context around this test to understand the setup:

Read file(s)

enhanced-audio-manager.test.ts 200 - 236
Let me look at the test setup to understand what sounds are being loaded:

Read file(s)

enhanced-audio-manager.test.ts 1 - 101
Let me find where the manager is initialized and what sounds are being loaded:

Searched workspace
Looking for the WebAudioManager initialization in the test setup
Searched workspace
Looking for where the manager is created in the test file
Let me look at the WebAudioManager constructor to understand what sounds are being loaded:

Read file(s)

audio-manager.ts 1 - 101
Let me look at the SOUND_ASSETS to understand how many sounds are being loaded:

Read file(s)

sound-config.ts
Now I can see there are 9 sounds total, but the test comment mentions that VICTORY_SOUND and DOOR_SLAM share the same URL (/sounds/environment/door-slam.mp3), so there should be 8 unique URLs. Let me look at the preloadSounds method to understand how it handles URL caching:

Searched workspace
Looking for the preloadSounds method implementation
Read file(s)

audio-manager.ts 870 - 921
Now let me look at the AssetLoader's loadAssets method to understand how it handles URL caching:

Read file(s)

asset-loader.ts
Now I understand the issue! Looking at the AssetLoader code, I can see that:

There are 9 sounds total in SOUND_ASSETS
VICTORY_SOUND and DOOR_SLAM both use the same URL: /sounds/environment/door-slam.mp3
The AssetLoader uses URL caching (urlBufferCache) to avoid duplicate fetches for the same URL
However, the test is expecting only 9 fetch calls (8 unique URLs + 1 retry), but it's getting 24 calls
The problem is likely that the URL cache is being cleared or not working properly. Let me look at the test setup more carefully to see if there's something causing the cache to not work:

Read file(s)

enhanced-audio-manager.test.ts 210 - 241
The issue is in the test logic. The test is using mockRejectedValueOnce which means only the first fetch call will fail, but the AssetLoader's retry logic and URL caching behavior is more complex than the test expects.

Looking at the AssetLoader code:

When a fetch fails, the failed promise is removed from the cache: this.urlBufferCache.delete(url);
The retry happens within the same loadAudioFile call
But each sound asset calls loadAudioBuffer independently
The URL cache is cleared at the start of loadAssets: this.urlBufferCache.clear();
The problem is that the test expectation doesn't account for the actual behavior. Let me check what the actual fetch calls are by running the test to see the pattern:

Command
npm test -- src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads" --reporter=verbose
npm test -- src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads" --reporter=verbose
:\Windows\System32\cmd.exe - npm  test -- src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads"npm test -- src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads" --reporter=verbosepm test src/tests/audio/enhanced-audio-manager.test.ts -t should retry failed loadsnpm test -- src/tests/audio/enhanced-audio-manager.test.ts -t should retry failed loads --reporter=verbose
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts src/tests/audio/enhanced-audio-m
manager.test.ts -t should retry failed loadsnpm test -- src/tests/
/audio/enhanced-audio-manager.test.ts -t should retry failed loads
s --reporter=verbose

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 4)ode (vitest 6)ode (vitest 7)ode (vitest 8)ode (vitest 9)ode (vitest 13)ode (vitest 14)ode (vitest 12)
 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 13:05:20
   Duration 926ms

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 13:05:20
   Duration 1.95s

 ❯ src/tests/comprehensive-sound-system.test.ts [queued]

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 13:05:20
   Duration 2.17s
(node:50144) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:26784) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:33308) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:34412) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:55748) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)

 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]       
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 13:05:20
   Duration 2.28s
(node:40184) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:2804) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:16928) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:38040) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:41520) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:23200) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:5860) [DEP0040] DeprecationWarning: The `punycode` module i
is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:12788) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:43668) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)
(node:28248) [DEP0040] DeprecationWarning: The `punycode` module 
 is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was
s created)

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queue
ed]
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued
d]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]       
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]       
 ❯ src/tests/GameState-sound-integration.test.ts [queued]        
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (26)
      Tests 0 passed (16)
   Start at 13:05:20
   Duration 2.82s
 ↓ src/tests/audio/asset-loader.test.ts (16 tests | 16 skipped)  
 ↓ src/tests/audio-manager.test.ts (27 tests | 27 skipped)       
 ↓ src/audio/__tests__/error-handling.test.ts (23 tests | 23 skipped)
 ↓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 23 skipped)

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]       
 ❯ src/tests/GameState-sound-integration.test.ts [queued]        
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed | 4 skipped (26)
      Tests 0 passed | 89 skipped (106)
   Start at 13:05:20
   Duration 2.92s
ode (vitest 6) ↓ src/tests/comprehensive-sound-system.test.ts (36 tests | 36 skipped)
 ↓ src/tests/sound-system-performance.test.ts (20 tests | 20 skipped)
 ↓ src/tests/sound-system-e2e.test.ts (17 tests | 17 skipped)    

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]       
 ❯ src/tests/GameState-sound-integration.test.ts [queued]        
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 0 passed | 7 skipped (26)
      Tests 0 passed | 162 skipped (169)
   Start at 13:05:20
   Duration 3.07s
 ↓ src/tests/game-state-sound-transitions.test.ts (7 tests | 7 skipped)
 ↓ src/tests/GameState-sound-integration.test.ts (9 tests | 9 skipped)
 ↓ src/tests/audio-context.test.tsx (7 tests | 7 skipped)        

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 27/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 23/23
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 17/17
 ❯ src/tests/sound-system-performance.test.ts 20/20
ode (vitest 2)
 Test Files 0 passed | 10 skipped (26)
      Tests 0 passed | 185 skipped (201)
   Start at 13:05:20
   Duration 3.17s
ode (vitest 4)ode (vitest 8)ode (vitest 5)ode (vitest 7)ode (vitest 13)ode (vitest 15)ode (vitest 9)ode (vitest 12)ode (vitest 10)











 ↓ src/tests/audio-hooks.test.tsx (16 tests | 16 skipped)        
 ↓ src/audio/__tests__/audio-settings-integration.test.tsx (6 tests | 6 skipped)
 ↓ src/tests/app-sound-integration.test.tsx (21 tests | 21 skipped)
 ↓ src/tests/react-sound-integration.test.tsx (26 tests | 26 skipped)
 ↓ src/tests/app-sound-integration-comprehensive.test.tsx (20 tests | 20 skipped)

 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9 Test Files 0 passed | 15 skipped (26)
      Tests 0 passed | 274 skipped (274)
   Start at 13:05:20
   Duration 4.07s











 ❯ src/tests/audio/audio-optimization.test.ts [queued]

 Test Files 0 passed | 15 skipped (26)
      Tests 0 passed | 274 skipped (274)
   Start at 13:05:20
   Duration 4.72s
(node:36208) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)






 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     

 Test Files 0 passed | 15 skipped (26)
      Tests 0 passed | 274 skipped (274)
   Start at 13:05:20
   Duration 4.94s
(node:6928) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:22028) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:40200) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]     
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     
 ❯ src/tests/collision-sound-integration.test.ts [queued]        
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]

 Test Files 0 passed | 16 skipped (26)
      Tests 0 passed | 302 skipped (302)
   Start at 13:05:20
   Duration 5.04s
 ↓ src/tests/audio/audio-optimization.test.ts (28 tests | 28 skipped)                                                             
                                                                 
 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]     
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     
 ❯ src/tests/collision-sound-integration.test.ts [queued]        
 ❯ src/tests/LargerMaze.test.ts [queued]                         
 ❯ src/tests/sound-event-integration.test.ts [queued]            
                                                                 
 Test Files 0 passed | 16 skipped (26)                           
      Tests 0 passed | 302 skipped (302)                         
   Start at 13:05:20
   Duration 5.04s
(node:21972) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)                                                        
(node:54460) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)                                                        
                                                                 
 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]     
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     
 ❯ src/tests/collision-sound-integration.test.ts [queued]        
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]

 Test Files 0 passed | 16 skipped (26)
      Tests 0 passed | 302 skipped (302)
   Start at 13:05:20
   Duration 5.04s
(node:14056) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:564) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:4264) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]     
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     
 ❯ src/tests/collision-sound-integration.test.ts [queued]        
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]        

 Test Files 0 passed | 16 skipped (26)
      Tests 0 passed | 302 skipped (302)
   Start at 13:05:20
   Duration 5.14s
ode (vitest 6)(node:9864) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:39972) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]        

 Test Files 0 passed | 20 skipped (26)
      Tests 0 passed | 378 skipped (388)
   Start at 13:05:20
   Duration 5.34s
 ↓ src/tests/sound-event-integration.test.ts (37 tests | 37 skipped)                                                              
 ↓ src/audio/__tests__/audio-error-handling.test.ts (10 tests | 10 skipped)                                                       
 ↓ src/tests/LargerMaze.test.ts (8 tests | 8 skipped)            
 ↓ src/tests/collision-sound-integration.test.ts (21 tests | 21 skipped)                                                          
                                                                 
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]     
 ❯ src/tests/GameState.test.ts 0/10                              
 ❯ src/tests/LargerMazeGameState.test.ts [queued]                
 ❯ src/tests/LargerMazeUI.test.ts [queued]                       
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]        

 Test Files 0 passed | 20 skipped (26)
      Tests 0 passed | 378 skipped (388)
   Start at 13:05:20
   Duration 5.34s
 ↓ src/tests/GameState.test.ts (10 tests | 10 skipped)
 ↓ src/tests/audio/hooks/use-audio-settings.test.ts (14 tests | 14 skipped)
 ↓ src/tests/sound-system-infrastructure.test.ts (5 tests | 5 skipped)
 ↓ src/tests/physics-integration-demo.test.ts (4 tests | 4 skipped)

 ❯ src/tests/LargerMazeGameState.test.ts 0/9
 ❯ src/tests/LargerMazeUI.test.ts [queued]

 Test Files 0 passed | 24 skipped (26)
      Tests 0 passed | 411 skipped (420)
   Start at 13:05:20
   Duration 5.44s
ode (vitest 3) ↓ src/tests/LargerMazeUI.test.ts (12 tests | 12 skipped)        
 ↓ src/tests/LargerMazeGameState.test.ts (9 tests | 9 skipped)   

 Test Files  26 skipped (26)
      Tests  432 skipped (432)
   Start at  13:05:20
   Duration  5.59s (transform 2.72s, setup 5.91s, collect 8.62s, tests 0ms, environment 39.97s, prepare 7.91s)
ode (vitest 2)
ode (vitest 4)ode (vitest 8)ode (vitest 7)ode (vitest 14)ode (vitest 5)ode (vitest 15):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
The test didn't run because it was skipped. Let me try a different approach to run just that specific test:

Command
npx vitest run src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads"
npx vitest run src/tests/audio/enhanced-a
audio-manager.test.ts -t "should retry failed loads"
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads"pm exec vitest run src/tests/audio/enhanced-audio-manager.test.ts -t should retry failed loads:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 5)ode (vitest 7)ode (vitest 9)ode (vitest 10)ode (vitest 11)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:05:43
   Duration 950ms
(node:4116) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23

 Test Files 0 passed (1)
      Tests 0 passed (23)
   Start at 13:05:43
   Duration 1.17s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.m
mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for /sounds/player/dig.mp3: undefined unde
efined
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined 
 undefined
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined und
defined
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined unde
efined
[AssetLoader] Response for /sounds/player/death.mp3: undefined un
ndefined
[AssetLoader] Response for /sounds/environment/door-slam.mp3: und
defined undefined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined
d
 undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 1/23

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (23)
   Start at 13:05:43
   Duration 1.37s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:218:44                                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-man
nager.test.ts:218:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Ty
ypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 1/23

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (23)
   Start at 13:05:43
   Duration 1.37s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 1.91s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/walk.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/player/dig.mp3         
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/dig.mp3: undefined unde
efined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3     
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined 
 undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3        
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3         
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined unde
efined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/player/death.mp3       
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/death.mp3: undefined un
ndefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3                                                               
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/environment/door-slam.mp3: und
defined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3    
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined
d
 undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/walk.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeErro
or: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound PLAYER_WALK: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/player/dig.mp3         
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/dig.mp3: undefined unde
efined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound PLAYER_DIG: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3     
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined 
 undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Type
eError: Cannot read properties of undefined (reading 'entries')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound BOULDER_MOVE: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3        
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound ARROW_MOVE: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3         
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined unde
efined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeEr
rror: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound COLLISION_THUD: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/player/death.mp3       
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/death.mp3: undefined un
ndefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound DEATH_SOUND: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3                                                               
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/environment/door-slam.mp3: und
defined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.m
mp3: TypeError: Cannot read properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: 
 TypeError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)     
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3    
[AssetLoader] Current location: http://localhost:3000/           
[AssetLoader] Base URL: http://localhost:3000                    
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined
d
 undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                         

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: 
 TypeError: Cannot read properties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts
s:174:104


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
Asset loading complete: 0/9 loaded, 9 failed                     
                                                                 
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Preloaded 0 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 9 skipped (23)
   Start at 13:05:43
   Duration 3.22s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 1 failed | 22 skipped) 2038ms
   ↓ Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
   ↓ Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloadi
ing > should apply optimization during preloading
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloadi
ing > should handle loading failures gracefully
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloadi
ing > should skip preloading in fallback mode
   ↓ Enhanced Audio Manager > WebAudioManager > optimization repo
orting > should provide optimization report
   ↓ Enhanced Audio Manager > WebAudioManager > optimization repo
orting > should handle empty buffer set
   ↓ Enhanced Audio Manager > WebAudioManager > loading state man
nagement > should track loading state correctly
   × Enhanced Audio Manager > WebAudioManager > error recovery > 
 should retry failed loads 2037ms
     → expected "spy" to be called 9 times, but got 24 times     
   ↓ Enhanced Audio Manager > WebAudioManager > error recovery > 
 should handle decode errors
   ↓ Enhanced Audio Manager > WebAudioManager > format fallback >
>
 should try multiple formats
   ↓ Enhanced Audio Manager > HTML5AudioManager > initialization 
 > should initialize with HTML5 Audio support
   ↓ Enhanced Audio Manager > HTML5AudioManager > preloading with
h format optimization > should preload sounds with format filterin
ng
   ↓ Enhanced Audio Manager > HTML5AudioManager > preloading with
h format optimization > should handle unsupported formats
   ↓ Enhanced Audio Manager > HTML5AudioManager > loading state >
>
 should provide loading state
   ↓ Enhanced Audio Manager > HTML5AudioManager > loading state >
>
 should provide optimization report
   ↓ Enhanced Audio Manager > createAudioManager factory > should
d create WebAudioManager when Web Audio API is available
   ↓ Enhanced Audio Manager > createAudioManager factory > should
d create HTML5AudioManager when only HTML5 Audio is available     
   ↓ Enhanced Audio Manager > createAudioManager factory > should
d create SilentAudioManager when no audio support
   ↓ Enhanced Audio Manager > integration with existing functiona
ality > should maintain existing playSound functionality
   ↓ Enhanced Audio Manager > integration with existing functiona
ality > should maintain existing mute functionality
   ↓ Enhanced Audio Manager > integration with existing functiona
ality > should maintain existing cleanup functionality

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced 
 Audio Manager > WebAudioManager > error recovery > should retry f
failed loads
AssertionError: expected "spy" to be called 9 times, but got 24 t
times
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:230:35

    228|X// Note: With URL caching, duplicate UR…
    229|X// So we expect 8 unique URLs + 1 retry…
    230|Xexpect(mockFetch).toHaveBeenCalledTimes…
       |X^
    231|X});
    232|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 22 skipped (23)
   Start at  13:05:43
   Duration  3.38s (transform 136ms, setup 105ms, collect 115ms, 
 tests 2.04s, environment 618ms, prepare 188ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Perfect! Now I can see exactly what's happening. The test is getting 24 fetch calls instead of 9. Looking at the output, I can see the pattern:

First, all 9 sounds try to load (8 unique URLs + 1 duplicate for door-slam.mp3)
The first call to /sounds/player/walk.mp3 fails with "Network error" (as expected from mockRejectedValueOnce)
All other calls fail with "Cannot read properties of undefined (reading 'entries')" because the mock response is undefined
Then each sound retries 3 times (maxRetries = 3)
So the calculation is:

9 initial attempts (1 fails with Network error, 8 fail with undefined response)
9 × 3 = 27 retry attempts
Total: 9 + 27 = 36 attempts
But the test shows 24, which suggests some optimization is happening. Let me look at the issue in the asset-loader at line 174:

Read file(s)

asset-loader.ts 170 - 181
The issue is that the mock is not properly set up. The test uses mockRejectedValueOnce for the first call, but then mockResolvedValue for all subsequent calls. However, the mock response doesn't have a proper headers property with an entries() method.

Let me fix the test by updating the mock setup:

Accepted edits to

enhanced-audio-manager.test.ts


Now let's run the test again to see if this fixes the issue:

Command
npx vitest run src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads"
npx vitest run src/tests/audio/enhanced-a
audio-manager.test.ts -t "should retry failed loads"
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/enhanced-audio-manager.test.ts -t "should retry failed loads"pm exec vitest run src/tests/audio/enhanced-audio-manager.test.ts -t should retry failed loads:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 4)ode (vitest 6)ode (vitest 9)ode (vitest 10)ode (vitest 15)ode (vitest 14)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:06:34
   Duration 966ms
(node:46044) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.        
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23

 Test Files 0 passed (1)
      Tests 0 passed (23)
   Start at 13:06:34
   Duration 1.17s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3     
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.m
mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3    
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200
0 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' } 
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' } 


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 1/23

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (23)
   Start at 13:06:34
   Duration 1.37s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                    
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:218:44                                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-man
nager.test.ts:218:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queu
ues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 1/23

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (23)
   Start at 13:06:34
   Duration 1.37s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 0 passed | 9 skipped (23)
   Start at 13:06:34
   Duration 1.92s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' } 

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhance
ed Audio Manager > WebAudioManager > error recovery > should retry
y failed loads
Preloaded 9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 1 passed | 9 skipped (23)
   Start at 13:06:34
   Duration 2.35s
 ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 22 skipped) 1090ms
   ↓ Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
   ↓ Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloadi
ing > should apply optimization during preloading
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloadi
ing > should handle loading failures gracefully
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloadi
ing > should skip preloading in fallback mode
   ↓ Enhanced Audio Manager > WebAudioManager > optimization repo
orting > should provide optimization report
   ↓ Enhanced Audio Manager > WebAudioManager > optimization repo
orting > should handle empty buffer set
   ↓ Enhanced Audio Manager > WebAudioManager > loading state man
nagement > should track loading state correctly
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > 
 should retry failed loads  1089ms
   ↓ Enhanced Audio Manager > WebAudioManager > error recovery > 
 should handle decode errors
   ↓ Enhanced Audio Manager > WebAudioManager > format fallback >
>
 should try multiple formats
   ↓ Enhanced Audio Manager > HTML5AudioManager > initialization 
 > should initialize with HTML5 Audio support
   ↓ Enhanced Audio Manager > HTML5AudioManager > preloading with
h format optimization > should preload sounds with format filterin
ng
   ↓ Enhanced Audio Manager > HTML5AudioManager > preloading with
h format optimization > should handle unsupported formats
   ↓ Enhanced Audio Manager > HTML5AudioManager > loading state >
>
 should provide loading state
   ↓ Enhanced Audio Manager > HTML5AudioManager > loading state >
>
 should provide optimization report
   ↓ Enhanced Audio Manager > createAudioManager factory > should
d create WebAudioManager when Web Audio API is available
   ↓ Enhanced Audio Manager > createAudioManager factory > should
d create HTML5AudioManager when only HTML5 Audio is available     
   ↓ Enhanced Audio Manager > createAudioManager factory > should
d create SilentAudioManager when no audio support
   ↓ Enhanced Audio Manager > integration with existing functiona
ality > should maintain existing playSound functionality
   ↓ Enhanced Audio Manager > integration with existing functiona
ality > should maintain existing mute functionality
   ↓ Enhanced Audio Manager > integration with existing functiona
ality > should maintain existing cleanup functionality

 Test Files  1 passed (1)
      Tests  1 passed | 22 skipped (23)
   Start at  13:06:34
   Duration  2.42s (transform 131ms, setup 110ms, collect 117ms, 
 tests 1.09s, environment 627ms, prepare 195ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Excellent! The test is now passing. The fix was to properly mock the response object with all the required properties:

status: 200 and statusText: 'OK' for the response logging
headers: new Map([['content-type', 'audio/mpeg']]) with a proper entries() method
arrayBuffer: () => Promise.resolve(mockArrayBuffer) for the actual data
The test now correctly shows:

8 initial fetch calls (7 unique URLs + 1 for the shared door-slam.mp3)
1 retry for the walk.mp3 that initially failed
Total: 9 fetch calls as expected
The URL caching is working correctly - VICTORY_SOUND and DOOR_SLAM both use /sounds/environment/door-slam.mp3, so only one fetch is made for that URL, and both sounds get the same cached result.

Let's run all the tests to make sure we didn't break anything else:

Command
npm test
Can you copy all the text in this session to a file called "Chat 29 Fixing Sound at run time part 7.md" and put the file "Chat 28 Fixing Sound at run time part 7.md" in to the folder "AI Chat History"

 

Kiro
I'll create the file with all the text from this session. Let me save it to the AI Chat History folder.

Accepted edits to

Chat 29 Fixing Sound at run time part 7.md


Perfect! I've created the file "Chat 29 Fixing Sound at run time part 7.md" in the "AI Chat History" folder with all the content from this session. The file includes:

The original problem description
My analysis of the failing test
The investigation process I followed
The root cause identification
The fix I implemented
The successful test results
The file is now saved and ready for reference.

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking

AssertionError: expected false to be true // Object.is equality  

- Expected

+ Received

- true

+ false

 ❯ src/tests/audio/enhanced-audio-manager.test.ts:143:73

Kiro
I need to look at the failing test to understand what's expected to be true but is false. Let me examine the test around line 143.

Read file(s)

enhanced-audio-manager.test.ts 135 - 151
Let me see more context around this test to understand what it's testing:

Read file(s)

enhanced-audio-manager.test.ts 125 - 156
Let me see the full test name and setup:

Read file(s)

enhanced-audio-manager.test.ts 110 - 151
The issue is that the mock fetch response is missing the headers property that the AssetLoader expects. Based on the previous fix, I need to update this mock as well. Let me check what the onLoadingProgress method expects and fix the mock:

Accepted edits to

enhanced-audio-manager.test.ts


Now let's run the test to see if this fixes the issue:

Command
npx vitest run src/tests/audio/enhanced-audio-manager.test.ts -t "should preload sounds with progress tracking"
npx vitest run src/tests/audio/enhanced-audi
io-manager.test.ts -t "should preload sounds with progress tracking"
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/enhanced-audio-manager.test.ts -t "should preload sounds with progress tracking"pm exec vitest run src/tests/audio/enhanced-audio-manager.test.ts -t should preload sounds with progress tracking:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 4)ode (vitest 5)ode (vitest 9)ode (vitest 10)ode (vitest 12)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:12:12
   Duration 924ms
(node:29428) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23

 Test Files 0 passed (1)
      Tests 0 passed (23)
   Start at 13:12:12
   Duration 1.24s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
Preloaded 9 sounds

 ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 22 ski
ipped) 87ms
   ↓ Enhanced Audio Manager > WebAudioManager > initialization > sho
ould initialize with Web Audio API support
   ↓ Enhanced Audio Manager > WebAudioManager > initialization > sho
ould handle audio context suspension
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should preload sounds with progress tracking 85ms
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should apply optimization during preloading
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should handle loading failures gracefully
   ↓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should skip preloading in fallback mode
   ↓ Enhanced Audio Manager > WebAudioManager > optimization reporti
ing > should provide optimization report
   ↓ Enhanced Audio Manager > WebAudioManager > optimization reporti
ing > should handle empty buffer set
   ↓ Enhanced Audio Manager > WebAudioManager > loading state manage
ement > should track loading state correctly
   ↓ Enhanced Audio Manager > WebAudioManager > error recovery > sho
ould retry failed loads
   ↓ Enhanced Audio Manager > WebAudioManager > error recovery > sho
ould handle decode errors
   ↓ Enhanced Audio Manager > WebAudioManager > format fallback > sh
hould try multiple formats
   ↓ Enhanced Audio Manager > HTML5AudioManager > initialization > s
should initialize with HTML5 Audio support
   ↓ Enhanced Audio Manager > HTML5AudioManager > preloading with fo
ormat optimization > should preload sounds with format filtering     
   ↓ Enhanced Audio Manager > HTML5AudioManager > preloading with fo
ormat optimization > should handle unsupported formats
   ↓ Enhanced Audio Manager > HTML5AudioManager > loading state > sh
hould provide loading state
   ↓ Enhanced Audio Manager > HTML5AudioManager > loading state > sh
hould provide optimization report
   ↓ Enhanced Audio Manager > createAudioManager factory > should cr
reate WebAudioManager when Web Audio API is available
   ↓ Enhanced Audio Manager > createAudioManager factory > should cr
reate HTML5AudioManager when only HTML5 Audio is available
   ↓ Enhanced Audio Manager > createAudioManager factory > should cr
reate SilentAudioManager when no audio support
   ↓ Enhanced Audio Manager > integration with existing functionalit
ty > should maintain existing playSound functionality
   ↓ Enhanced Audio Manager > integration with existing functionalit
ty > should maintain existing mute functionality
   ↓ Enhanced Audio Manager > integration with existing functionalit
ty > should maintain existing cleanup functionality

 Test Files  1 passed (1)
      Tests  1 passed | 22 skipped (23)
   Start at  13:12:11
   Duration  1.43s (transform 143ms, setup 117ms, collect 130ms, tes
sts 87ms, environment 617ms, prepare 186ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Perfect! The test is now passing. The issue was the same as the previous one - the mock fetch response was missing the proper headers property that the AssetLoader expects.

Let me check if there are any other similar mock issues in the test file by looking for other fetch mocks that might need the same fix:

Searched workspace
Looking for other fetch mock implementations that might need the same fix
I need to fix the default mock in the beforeEach as well:

Read file(s)

enhanced-audio-manager.test.ts 80 - 91
Accepted edits to

enhanced-audio-manager.test.ts


Now let's run all the tests in this file to make sure everything is working:

Command
npx vitest run src/tests/audio/enhanced-audio-manager.test.ts
npx vitest run src/tests/audio/enhanced-audi
io-manager.test.ts
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/enhanced-audio-manager.test.tspm exec vitest run src/tests/audio/enhanced-audio-manager.test.ts:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 4)ode (vitest 5)ode (vitest 7)ode (vitest 9)ode (vitest 10)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:12:48
   Duration 929ms
(node:27432) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23

 Test Files 0 passed (1)
      Tests 0 passed (23)
   Start at 13:12:48
   Duration 1.25s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audi
io context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > initialization > should handle audi
io context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should preloa
ad sounds with progress tracking
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should apply 
 optimization during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should apply 
 optimization during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should apply 
 optimization during preloading
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should apply 
 optimization during preloading
Preloaded 9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 1/23

 Test Files 0 passed (1)
      Tests 1 passed (23)
   Start at 13:12:48
   Duration 1.35s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 1.55s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 1.55s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 1.99s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/player/dig.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/player/death.mp3          
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 0 passed (1)
      Tests 4 passed (23)
   Start at 13:12:48
   Duration 2.96s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/player/dig.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/player/death.mp3          
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3:
: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should handle
e loading failures gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:
:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                        
Asset loading complete: 0/9 loaded, 9 failed                        
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > enhanced preloading > should skip p
preloading in fallback mode
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode                                          
Audio manager in fallback mode, skipping preload                    
                                                                    
                                                                    
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23              

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                            
Initialized gain node pool with 5 nodes                             
Web Audio API initialized successfully                              
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should pro
ovide optimization report
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > optimization reporting > should pro
ovide optimization report
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > optimization reporting > should pro
ovide optimization report
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > optimization reporting > should han
ndle empty buffer set
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > loading state management > should t
track loading state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > loading state management > should t
track loading state correctly
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > loading state management > should t
track loading state correctly
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > loading state management > should t
track loading state correctly
Preloaded 9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 0 passed (1)
      Tests 5 passed (23)
   Start at 13:12:48
   Duration 3.51s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry faile
ed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 9 passed (23)
   Start at 13:12:48
   Duration 3.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                                             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:44                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:223:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 0 passed (1)
      Tests 9 passed (23)
   Start at 13:12:48
   Duration 3.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should retry faile
ed loads
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should retry faile
ed loads
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should retry faile
ed loads
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 4.71s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Invalid audio                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Invalid a
audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Invalid audio      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Invalid 
 audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Invalid a
audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Invalid
d audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Invalid audio        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error
r: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Inva
alid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Invalid audio     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 4.71s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Invalid audio                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/player/dig.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Invalid audio                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Invalid audio                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Invalid audio      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Invalid audio                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Invalid audio                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Invalid audio                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Invalid audio        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Invalid audio                                                     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Invalid audio                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Invalid audio     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 0 passed (1)
      Tests 10 passed (23)
   Start at 13:12:48
   Duration 6.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Audio context suspended for 5 seconds. Click anywhere to enable audio.

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Invalid audio                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Inva
alid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound PLAYER_WALK: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/player/dig.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Invalid audio                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Invali
id audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound PLAYER_DIG: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Invalid audio                                                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: 
 Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound BOULDER_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Invalid audio                                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound ARROW_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Invalid audio                                                                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: In
nvalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound COLLISION_THUD: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/player/death.mp3          
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Invalid audio                                                              
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Inv
valid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound DEATH_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Invalid audio                                                     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3:
: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Err
ror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Invalid audio                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Err
ror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > error recovery > should handle deco
ode errors
Failed to load sound DIAMOND_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                                           
Asset loading complete: 0/9 loaded, 9 failed                        
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefin
ned
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined und
defined
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefi
ined
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefin
ned
[AssetLoader] Response for /sounds/player/death.mp3: undefined undef
fined
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefi
ined undefined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined un
ndefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: 404     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:257:44                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: 404
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:257:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeE
Error: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.77s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 6.99s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefi
ined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/player/dig.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefin
ned


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefi
ined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefin
ned


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/player/death.mp3          
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/player/death.mp3: undefined undef
fined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read prope
erties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefi
ined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined un
ndefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 0 passed (1)
      Tests 11 passed (23)
   Start at 13:12:48
   Duration 7.97s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefi
ined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/player/dig.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefin
ned


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefi
ined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3            
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefin
ned


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound COLLISION_THUD: TypeError: Cannot read properti
ies of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/player/death.mp3          
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/player/death.mp3: undefined undef
fined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefi
ined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3:
: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Typ
peError: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104
    at runNextTicks (node:internal/process/task_queues:65:5)        
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000                       
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined un
ndefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104                                                               

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Typ
peError: Cannot read properties of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > WebAudioManager > format fallback > should try multip
ple formats
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read propert
ties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:17
74:104


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                                          
Asset loading complete: 0/9 loaded, 9 failed                        
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > HTML5AudioManager > initialization > should initializ
ze with HTML5 Audio support
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > HTML5AudioManager > preloading with format optimizati
ion > should preload sounds with format filtering
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > HTML5AudioManager > preloading with format optimizati
ion > should preload sounds with format filtering
HTML5 Audio preloaded 9/9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering                    
Error cleaning up audio element: TypeError: audio.load is not a function                                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:431:23                                                         
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a func
ction
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manage
er.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\
\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manage
er.test.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/d
dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/
/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@
@vitest/runner/dist/chunk-hooks.js:1442:25)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                              
HTML5 Audio initialized successfully                                
                                                                    
                                                                    
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23             

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                              
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


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                              
HTML5 Audio preloaded 0/9 sounds                                    
                                                                    
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > loading state > should provide loading state
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > HTML5AudioManager > loading state > should provide op
ptimization report
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > HTML5AudioManager > loading state > should provide op
ptimization report
HTML5AudioManager report: {
  "optimized": 0,
  "skipped": 0,
  "totalSavings": 0,
  "details": [],
  "globalRecommendations": [
    "Consider using Web Audio API for better performance",
    "HTML5 Audio has limited optimization capabilities"
  ]
}

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > createAudioManager factory > should create WebAudioMa
anager when Web Audio API is available
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > createAudioManager factory > should create HTML5Audio
oManager when only HTML5 Audio is available
HTML5 Audio initialized successfully


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available                          
Web Audio API not supported, using HTML5 Audio fallback             
                                                                    
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality                               
Initialized gain node pool with 5 nodes                             
Web Audio API initialized successfully                              
[AssetLoader] Attempting to load: /sounds/player/walk.mp3           
[AssetLoader] Current location: http://localhost:3000/              
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing playSound functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing playSound functionality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing mute functionality
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing mute functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing mute functionality
Preloaded 9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 0 passed (1)
      Tests 12 passed (23)
   Start at 13:12:48
   Duration 8.72s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3 
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3       
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
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
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK      
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }    

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing cleanup functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced A
Audio Manager > integration with existing functionality > should main
ntain existing cleanup functionality
Preloaded 9 sounds

 ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 7604ms 
   ✓ Enhanced Audio Manager > WebAudioManager > initialization > sho
ould initialize with Web Audio API support 4ms
   ✓ Enhanced Audio Manager > WebAudioManager > initialization > sho
ould handle audio context suspension 2ms
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should preload sounds with progress tracking 85ms
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should apply optimization during preloading 67ms
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should handle loading failures gracefully  2024ms
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading 
 > should skip preloading in fallback mode 1ms
   ✓ Enhanced Audio Manager > WebAudioManager > optimization reporti
ing > should provide optimization report 71ms
   ✓ Enhanced Audio Manager > WebAudioManager > optimization reporti
ing > should handle empty buffer set 2ms
   ✓ Enhanced Audio Manager > WebAudioManager > loading state manage
ement > should track loading state correctly 55ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > sho
ould retry failed loads  1066ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > sho
ould handle decode errors  2022ms
   ✓ Enhanced Audio Manager > WebAudioManager > format fallback > sh
hould try multiple formats  2013ms
   ✓ Enhanced Audio Manager > HTML5AudioManager > initialization > s
should initialize with HTML5 Audio support 1ms
   ✓ Enhanced Audio Manager > HTML5AudioManager > preloading with fo
ormat optimization > should preload sounds with format filtering 4ms 
   ✓ Enhanced Audio Manager > HTML5AudioManager > preloading with fo
ormat optimization > should handle unsupported formats 1ms
   ✓ Enhanced Audio Manager > HTML5AudioManager > loading state > sh
hould provide loading state 1ms
   ✓ Enhanced Audio Manager > HTML5AudioManager > loading state > sh
hould provide optimization report 1ms
   ✓ Enhanced Audio Manager > createAudioManager factory > should cr
reate WebAudioManager when Web Audio API is available 1ms
   ✓ Enhanced Audio Manager > createAudioManager factory > should cr
reate HTML5AudioManager when only HTML5 Audio is available 1ms       
   ✓ Enhanced Audio Manager > createAudioManager factory > should cr
reate SilentAudioManager when no audio support 1ms
   ✓ Enhanced Audio Manager > integration with existing functionalit
ty > should maintain existing playSound functionality 53ms
   ✓ Enhanced Audio Manager > integration with existing functionalit
ty > should maintain existing mute functionality 59ms
   ✓ Enhanced Audio Manager > integration with existing functionalit
ty > should maintain existing cleanup functionality 69ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:12:48
   Duration  8.95s (transform 130ms, setup 109ms, collect 117ms, tes
sts 7.60s, environment 630ms, prepare 184ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Great! All tests are now passing. The issue was indeed with the mock setup - I needed to add the proper headers property with an entries() method to all the fetch mocks.

Summary
I successfully fixed the failing test by updating the mock fetch responses to include the proper structure that the AssetLoader expects:

Fixed the "should retry failed loads" test - Updated the mock to include proper status, statusText, and headers properties
Fixed the "should preload sounds with progress tracking" test - Updated the mock implementation to include the same proper response structure
Fixed the default mock in beforeEach - Updated the default mock setup to prevent similar issues in other tests
The key issue was that the AssetLoader code expects the fetch response to have a headers property with an entries() method (like a real fetch Response object), but the mocks were missing this. This caused the error "Cannot read properties of undefined (reading 'entries')" which led to excessive retries and incorrect fetch call counts.

All 23 tests in the enhanced-audio-manager.test.ts file are now passing!

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats

Error: Network error

 ❯ src/tests/audio/asset-loader.test.ts:335:41

    333|             };

Kiro
I need to look at the failing test in the asset-loader.test.ts file to understand what's causing the "Network error" issue.

Read file(s)

asset-loader.test.ts 325 - 346
Let me see more context around this test to understand the full test case:

Read file(s)

asset-loader.test.ts 310 - 351
Let me see the actual failing test:

Read file(s)

asset-loader.test.ts 345 - 371
I can see the issue! The mock in the "should prefer supported formats" test is missing the headers property that the AssetLoader expects. Let me check the test setup to see how the mocks are configured:

Read file(s)

asset-loader.test.ts 1 - 51
Let me see the beforeEach setup:

Read file(s)

asset-loader.test.ts 40 - 81
I can see that there's no default mock setup for fetch in the beforeEach. The issue is that the "should prefer supported formats" test is using a mock that doesn't have the proper headers property. Let me fix this:

Accepted edits to

asset-loader.test.ts


Now let me check if there are other similar mock issues in this test file:

Searched workspace
Looking for other fetch mock setups that might need the same fix
I need to fix all the other fetch mocks that are missing the headers property. Let me check each one:

Read file(s)

asset-loader.test.ts 95 - 111
Let me fix all the fetch mocks that are missing the headers property:

Accepted edits to

asset-loader.test.ts


Read file(s)

asset-loader.test.ts 160 - 176
This one is for a 404 error test, so it should be ok: false, but I still need to add headers:

Accepted edits to

asset-loader.test.ts


Read file(s)

asset-loader.test.ts 185 - 201
Error(s) while editing

asset-loader.test.ts

Unable to replace text, trying a different approach...
Let me be more specific with the context:

Accepted edits to

asset-loader.test.ts


Read file(s)

asset-loader.test.ts 245 - 261
Accepted edits to

asset-loader.test.ts


Read file(s)

asset-loader.test.ts 300 - 316
Read file(s)

asset-loader.test.ts 315 - 326
Accepted edits to

asset-loader.test.ts


Now let me run the test to see if it passes:

Command
npx vitest run src/tests/audio/asset-loader.test.ts -t "should prefer supported formats"
npx vitest run src/tests/audio/asset-loader.test.t
t
s -t "should prefer supported formats"
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/asset-loader.test.ts -t "should prefer supported formats"pm exec vitest run src/tests/audio/asset-loader.test.ts -t should prefer supported formats:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 4)ode (vitest 3)ode (vitest 5)ode (vitest 6)ode (vitest 7)ode (vitest 8)ode (vitest 13)ode (vitest 11)ode (vitest 14)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:17:12
   Duration 922ms

 ❯ src/tests/audio/asset-loader.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:17:12
   Duration 1.25s
(node:52592) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/asset-loader.test.ts 0/16

 Test Files 0 passed (1)
      Tests 0 passed (16)
   Start at 13:17:12
   Duration 1.46s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optim
mization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ✓ src/tests/audio/asset-loader.test.ts (16 tests | 15 skipped) 10ms      
   ↓ AssetLoader > constructor > should initialize with default options   
   ↓ AssetLoader > constructor > should accept custom options
   ↓ AssetLoader > loadAudioBuffer > should successfully load audio buffer
r from first source
   ↓ AssetLoader > loadAudioBuffer > should fallback to second source if f
first fails
   ↓ AssetLoader > loadAudioBuffer > should retry failed requests
   ↓ AssetLoader > loadAudioBuffer > should throw error if all sources fai
il
   ↓ AssetLoader > loadAudioBuffer > should handle HTTP errors
   ↓ AssetLoader > loadAudioBuffer > should handle audio decoding errors  
   ↓ AssetLoader > loadAudioBuffer > should respect timeout
   ↓ AssetLoader > loadAssets > should load all preload assets
   ↓ AssetLoader > loadAssets > should handle partial failures
   ↓ AssetLoader > progress tracking > should emit progress events        
   ↓ AssetLoader > progress tracking > should emit error events on failure
   ✓ AssetLoader > format optimization > should prefer supported formats 9
9ms
   ↓ AssetLoader > format optimization > should filter unsupported formats
   ↓ AssetLoader > cleanup > should clear all state and callbacks

 Test Files  1 passed (1)
      Tests  1 passed | 15 skipped (16)
   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms
s, environment 724ms, prepare 250ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer>   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>
   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>

   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>


   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>




   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>






   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>







   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>








   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>









   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>










   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer>











   Start at  13:17:12
   Duration  1.54s (transform 101ms, setup 121ms, collect 52ms, tests 10ms, environment 724ms, prepare 250ms)


D:\FizzBash\TheWanderer
Great! The test is now passing. Let me run all the tests in the asset-loader.test.ts file to make sure I haven't broken anything else:

Command
npx vitest run src/tests/audio/asset-loader.test.ts
npx vitest run src/tests/audio/asset-loader.test.ts
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/asset-loader.test.tspm exec vitest run src/tests/audio/asset-loader.test.ts:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWandererode (vitest 1)ode (vitest 3)ode (vitest 5)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 12)ode (vitest 13)ode (vitest 15) Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:17:34
   Duration 936ms(node:61880) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/asset-loader.test.ts 0/16

 Test Files 0 passed (1)
      Tests 0 passed (16)
   Start at 13:17:34
   Duration 1.15s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Response for sounds/test.ogg: undefined undefined           
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 1/16                              
                                                                          
 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Error loading sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
                                                                          
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.ogg: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 
    at processTicksAndRejections (node:internal/process/task_queues:105:5)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:135:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:135:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:17:34
   Duration 1.37s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:136:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:136:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Response for sounds/test.ogg: undefined undefined           
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16                              
                                                                          
 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Error loading sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 
Retry 1/2 for sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
Failed to load test_sound from sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'then')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)                                          
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 2 failed | 3 passed (16)
   Start at 13:17:34
   Duration 1.59s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Error loading sounds/test.ogg: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:149:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                           
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                           
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31  
                                                                          
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                           
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31  


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                 
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                 
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data    
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:201:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data 
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:201:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout                                              
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 2 failed | 4 passed (16)
   Start at 13:17:34
   Duration 1.80s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets                                           
[AssetLoader] Attempting to load: sounds/sound1.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
[AssetLoader] Attempting to load: sounds/sound2.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for sounds/sound2.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should handle partial failures
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for sounds/sound1.mp3: undefined undefined


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
[AssetLoader] Error loading sounds/sound1.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 
Retry 1/2 for sounds/sound1.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:288:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:288:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
[AssetLoader] Attempting to load: sounds/sound1.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
Failed to load sound1 from sounds/sound1.mp3: TypeError: Cannot read properties of undefined (reading 'then')                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)                                          
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should handle partial failures
Failed to load sound sound1: TypeError: Cannot read properties of undefine
ed (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\manage
ers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
[AssetLoader] Attempting to load: sounds/sound2.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)                                          
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefine
ed (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\manage
ers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
Asset loading complete: 0/2 loaded, 2 failed                              
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events                                       
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tra
acking > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tra
acking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure                               
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:348:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:348:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 10/16

 Test Files 0 passed (1)
      Tests 2 failed | 8 passed (16)
   Start at 13:17:34
   Duration 1.91s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:348:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tra
acking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:348:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optim
mization > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optim
mization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ❯ src/tests/audio/asset-loader.test.ts (16 tests | 3 failed) 774ms       
   ✓ AssetLoader > constructor > should initialize with default options 3m
ms
   ✓ AssetLoader > constructor > should accept custom options 0ms
   ✓ AssetLoader > loadAudioBuffer > should successfully load audio buffer
r from first source 6ms
   × AssetLoader > loadAudioBuffer > should fallback to second source if f
first fails 10ms
     → Cannot read properties of undefined (reading 'entries')
   × AssetLoader > loadAudioBuffer > should retry failed requests 213ms   
     → Cannot read properties of undefined (reading 'then')
   ✓ AssetLoader > loadAudioBuffer > should throw error if all sources fai
il 215ms
   ✓ AssetLoader > loadAudioBuffer > should handle HTTP errors 1ms        
   ✓ AssetLoader > loadAudioBuffer > should handle audio decoding errors 1
1ms
   ✓ AssetLoader > loadAudioBuffer > should respect timeout 105ms
   ✓ AssetLoader > loadAssets > should load all preload assets 1ms        
   × AssetLoader > loadAssets > should handle partial failures 110ms      
     → expected +0 to be 1 // Object.is equality
   ✓ AssetLoader > progress tracking > should emit progress events 1ms    
   ✓ AssetLoader > progress tracking > should emit error events on failure
e 104ms
   ✓ AssetLoader > format optimization > should prefer supported formats 1
1ms
   ✓ AssetLoader > format optimization > should filter unsupported formats
s 0ms
   ✓ AssetLoader > cleanup > should clear all state and callbacks 0ms     

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should fallback to second source if first fails

TypeError: Cannot read properties of undefined (reading 'entries')
 ❯ src/audio/managers/asset-loader.ts:174:104
    172|XclearTimeout(timeoutId);
    173|Xconsole.log(`[AssetLoader] Response for ${ur…
    174|Xconsole.log(`[AssetLoader] Response headers:…
       |                                                                  
^
    175|
    176|Xif (!response || !response.ok) {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should retry failed requests
TypeError: Cannot read properties of undefined (reading 'then')
 ❯ src/audio/managers/asset-loader.ts:170:53
    168|Xconsole.log(`[AssetLoader] Base URL: ${window.locati…
    169|
    170|Xfetch(url, { signal: controller.signal })
       |X^
    171|X.then(response => {
    172|XclearTimeout(timeoutId);
 ❯ AssetLoader.loadAudioFile src/audio/managers/asset-loader.ts:159:16    
 ❯ src/audio/managers/asset-loader.ts:202:55

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should handle partial failures
AssertionError: expected +0 to be 1 // Object.is equality

- Expected
+ Received

- 1
+ 0

 ❯ src/tests/audio/asset-loader.test.ts:292:34
    290|Xconst buffers = await assetLoader.loadAssets(mockAss…
    291|
    292|Xexpect(buffers.size).toBe(1);
       |X^
    293|Xexpect(buffers.has('sound1')).toBe(true);
    294|Xexpect(buffers.has('sound2')).toBe(false);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯



 Test Files  1 failed (1)
      Tests  3 failed | 13 passed (16)
   Start at  13:17:34
   Duration  2.09s (transform 77ms, setup 110ms, collect 46ms, tests 774ms
s, environment 648ms, prepare 192ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
I can see there are still some tests failing because they have mocks that don't include the proper headers. Let me look at the specific failing tests and fix them. The issue is that some tests are using different mock setups that still don't have the headers property.

Let me look at the "should fallback to second source if first fails" test:

Read file(s)

asset-loader.test.ts 110 - 131
I need to fix this mock:

Accepted edits to

asset-loader.test.ts


Now let me look at the "should handle partial failures" test:

Read file(s)

asset-loader.test.ts 275 - 296
I need to fix this mock too:

Accepted edits to

asset-loader.test.ts


Now let me run the tests again to see if they pass:

Command
npx vitest run src/tests/audio/asset-loader.test.ts
npx vitest run src/tests/audio/asset-loader.test.t
t
s
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/asset-loader.test.tspm exec vitest run src/tests/audio/asset-loader.test.ts:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 2)ode (vitest 6)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 11)ode (vitest 14)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:18:28
   Duration 914ms
(node:47184) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/asset-loader.test.ts 0/16

 Test Files 0 passed (1)
      Tests 0 passed (16)
   Start at 13:18:28
   Duration 1.13s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:18:28
   Duration 1.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:18:28
   Duration 1.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:18:28
   Duration 1.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:18:28
   Duration 1.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                     
[AssetLoader] Response for sounds/test.ogg: 200 OK                        
[AssetLoader] Response headers: { 'content-type': 'audio/ogg' }           
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:18:28
   Duration 1.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:18:28
   Duration 1.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Response for sounds/test.ogg: undefined undefined           
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16                              
                                                                          
 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Error loading sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 
Retry 1/2 for sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104 


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                        
Failed to load test_sound from sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'then')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)                                          
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:18:28
   Duration 1.46s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Attempting to load: sounds/test.ogg                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                              
[AssetLoader] Error loading sounds/test.ogg: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                           
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                           
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31  
                                                                          
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                           
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31  


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                 
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                 
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data    
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:204:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data 
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:204:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
                                                                          
                                                                          
                                                                          
                                                                          
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:18:28
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets                                           
[AssetLoader] Attempting to load: sounds/sound1.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
[AssetLoader] Attempting to load: sounds/sound2.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for sounds/sound2.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should handle partial failures
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:294:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:294:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
[AssetLoader] Attempting to load: sounds/sound2.mp3                       
[AssetLoader] Current location: http://localhost:3000/                    
[AssetLoader] Base URL: http://localhost:3000                             
                                                                          
                                                                          
 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)                                          
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets >
> should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefine
ed (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53  
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\manage
ers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:55  


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                           
Asset loading complete: 1/2 loaded, 1 failed                              
                                                                          
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events                                       
[AssetLoader] Attempting to load: sounds/test.mp3                         
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tra
acking > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tra
acking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure                               
[AssetLoader] Error loading sounds/test.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:18:28
   Duration 1.89s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tra
acking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optim
mization > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optim
mization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ❯ src/tests/audio/asset-loader.test.ts (16 tests | 1 failed) 779ms       
   ✓ AssetLoader > constructor > should initialize with default options 2m
ms
   ✓ AssetLoader > constructor > should accept custom options 0ms
   ✓ AssetLoader > loadAudioBuffer > should successfully load audio buffer
r from first source 5ms
   ✓ AssetLoader > loadAudioBuffer > should fallback to second source if f
first fails 6ms
   × AssetLoader > loadAudioBuffer > should retry failed requests 222ms   
     → Cannot read properties of undefined (reading 'then')
   ✓ AssetLoader > loadAudioBuffer > should throw error if all sources fai
il 218ms
   ✓ AssetLoader > loadAudioBuffer > should handle HTTP errors 1ms        
   ✓ AssetLoader > loadAudioBuffer > should handle audio decoding errors 1
1ms
   ✓ AssetLoader > loadAudioBuffer > should respect timeout 107ms
   ✓ AssetLoader > loadAssets > should load all preload assets 1ms        
   ✓ AssetLoader > loadAssets > should handle partial failures 106ms      
   ✓ AssetLoader > progress tracking > should emit progress events 1ms    
   ✓ AssetLoader > progress tracking > should emit error events on failure
e 105ms
   ✓ AssetLoader > format optimization > should prefer supported formats 1
1ms
   ✓ AssetLoader > format optimization > should filter unsupported formats
s 0ms
   ✓ AssetLoader > cleanup > should clear all state and callbacks 0ms     

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should retry failed requests
TypeError: Cannot read properties of undefined (reading 'then')
 ❯ src/audio/managers/asset-loader.ts:170:53
    168|Xconsole.log(`[AssetLoader] Base URL: ${window.locati…
    169|
    170|Xfetch(url, { signal: controller.signal })
       |X^
    171|X.then(response => {
    172|XclearTimeout(timeoutId);
 ❯ AssetLoader.loadAudioFile src/audio/managers/asset-loader.ts:159:16    
 ❯ src/audio/managers/asset-loader.ts:202:55

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 15 passed (16)
   Start at  13:18:28
   Duration  2.02s (transform 78ms, setup 111ms, collect 48ms, tests 779ms
s, environment 619ms, prepare 190ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run just the specific failing tests to check if they're fixed:

Command
npx vitest run src/tests/audio/asset-loader.test.ts -t "should fallback to second source if first fails"
npx vitest run src/tests/audio/asset-loader.test.t
t
s -t "should fallback to second source if first fails"
:\Windows\System32\cmd.exe - npx  vitest run src/tests/audio/asset-loader.test.ts -t "should fallback to second source if first fails"pm exec vitest run src/tests/audio/asset-loader.test.ts -t should fallback to second source if first fails:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 4)ode (vitest 7)ode (vitest 11)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:18:48
   Duration 911ms
(node:62712) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/asset-loader.test.ts 0/16

 Test Files 0 passed (1)
      Tests 0 passed (16)
   Start at 13:18:48
   Duration 1.12s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/ch
hunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1729:8)

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuf
ffer > should fallback to second source if first fails
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/ogg' }

 ✓ src/tests/audio/asset-loader.test.ts (16 tests | 15 skipped) 15ms      
   ↓ AssetLoader > constructor > should initialize with default options   
   ↓ AssetLoader > constructor > should accept custom options
   ↓ AssetLoader > loadAudioBuffer > should successfully load audio buffer
r from first source
   ✓ AssetLoader > loadAudioBuffer > should fallback to second source if f
first fails 14ms
   ↓ AssetLoader > loadAudioBuffer > should retry failed requests
   ↓ AssetLoader > loadAudioBuffer > should throw error if all sources fai
il
   ↓ AssetLoader > loadAudioBuffer > should handle HTTP errors
   ↓ AssetLoader > loadAudioBuffer > should handle audio decoding errors  
   ↓ AssetLoader > loadAudioBuffer > should respect timeout
   ↓ AssetLoader > loadAssets > should load all preload assets
   ↓ AssetLoader > loadAssets > should handle partial failures
   ↓ AssetLoader > progress tracking > should emit progress events        
   ↓ AssetLoader > progress tracking > should emit error events on failure
   ↓ AssetLoader > format optimization > should prefer supported formats  
   ↓ AssetLoader > format optimization > should filter unsupported formats
   ↓ AssetLoader > cleanup > should clear all state and callbacks

 Test Files  1 passed (1)
      Tests  1 passed | 15 skipped (16)
   Start at  13:18:48
   Duration  1.21s (transform 84ms, setup 100ms, collect 51ms, tests 15ms,
, environment 588ms, prepare 195ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


asset-loader.test.ts






Claude Sonnet 4.0
Autopilot
